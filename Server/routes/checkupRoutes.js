import express from 'express';
import { protect, dentistOnly, patientOnly } from '../middleware/auth.js';
import Checkup from '../models/Checkup.js';
import { v2 as cloudinary } from 'cloudinary';
import multer  from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import dotenv from 'dotenv';

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder:"DentalCheck"
    }
})

const upload = multer({storage})

const router = express.Router();

// @route   POST /api/checkups
// @desc    Create a new checkup request
// @access  Private/Patient
router.post('/', protect, patientOnly, async (req, res) => {
  try {
    const { dentistId } = req.body;

    // Create new checkup
    const checkup = await Checkup.create({
      patient: req.user._id,
      dentist: dentistId,
      status: 'pending'
    });

    // Notify dentist via socket.io
    const io = req.app.get('io');
    io.to(dentistId).emit('new_checkup_request', { checkupId: checkup._id });

    res.status(201).json({
      success: true,
      checkup
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/checkups
// @desc    Get all checkups for the current user (different behavior for patient/dentist)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let checkups;
    
    if (req.user.role === 'patient') {
      // If user is a patient, get all their checkups
      checkups = await Checkup.find({ patient: req.user._id })
        .populate('dentist', 'name email specialization')
        .sort({ createdAt: -1 });
    } else {
      // If user is a dentist, get all checkups assigned to them
      checkups = await Checkup.find({ dentist: req.user._id })
        .populate('patient', 'name email')
        .sort({ createdAt: -1 });
    }

    res.json({
      success: true,
      count: checkups.length,
      checkups
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/checkups/:id
// @desc    Get checkup by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const checkup = await Checkup.findById(req.params.id)
      .populate('patient', 'name email')
      .populate('dentist', 'name email specialization');

    if (!checkup) {
      return res.status(404).json({
        success: false,
        message: 'Checkup not found'
      });
    }

    // Check if the user is authorized to view this checkup
    if (
      req.user.role === 'patient' && 
      checkup.patient._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this checkup'
      });
    }

    if (
      req.user.role === 'dentist' && 
      checkup.dentist._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this checkup'
      });
    }

    res.json({
      success: true,
      checkup
    });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Checkup not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/checkups/:id/status
// @desc    Update checkup status
// @access  Private/Dentist
router.put('/:id/status', protect, dentistOnly, async (req, res) => {
  try {
    const { status } = req.body;
    
    const checkup = await Checkup.findById(req.params.id);
    
    if (!checkup) {
      return res.status(404).json({
        success: false,
        message: 'Checkup not found'
      });
    }
    
    // Check if the dentist is authorized to update this checkup
    if (checkup.dentist.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this checkup'
      });
    }
    
    checkup.status = status;
    
    if (status === 'completed') {
      checkup.completionDate = Date.now();
    }
    
    await checkup.save();
    
    // Notify patient via socket.io
    const io = req.app.get('io');
    io.to(checkup.patient.toString()).emit('checkup_status_updated', { 
      checkupId: checkup._id,
      status
    });
    
    res.json({
      success: true,
      checkup
    });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Checkup not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/checkups/:id/images
// @desc    Upload checkup images with notes
// @access  Private/Dentist
router.post('/:id/images', protect, dentistOnly, upload.single('image'), async (req, res) => {
  try {
    const { notes } = req.body;
    const checkup = await Checkup.findById(req.params.id);
    
    if (!checkup) {
      return res.status(404).json({
        success: false,
        message: 'Checkup not found'
      });
    }

    if (checkup.dentist.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this checkup'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image uploaded'
      });
    }

    

  

    
    const imageObject = {
      url: req.file.path,
      notes: notes || ''
    };

    checkup.images.push(imageObject);

    if (checkup.status === 'pending') {
      checkup.status = 'in-progress';
    }

    await checkup.save();

    // Notify via socket
    const io = req.app.get('io');
    io.to(checkup.patient.toString()).emit('checkup_updated', {
      checkupId: checkup._id,
      status: checkup.status
    });

    res.json({ success: true, checkup });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// @route   PUT /api/checkups/:id/notes
// @desc    Update checkup notes
// @access  Private/Dentist
router.put('/:id/notes', protect, dentistOnly, async (req, res) => {
  try {
    const { notes } = req.body;
    
    const checkup = await Checkup.findById(req.params.id);
    
    if (!checkup) {
      return res.status(404).json({
        success: false,
        message: 'Checkup not found'
      });
    }
    
    // Check if the dentist is authorized to update this checkup
    if (checkup.dentist.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this checkup'
      });
    }
    
    checkup.notes = notes;
    await checkup.save();
    
    // Notify patient via socket.io
    const io = req.app.get('io');
    io.to(checkup.patient.toString()).emit('checkup_updated', { 
      checkupId: checkup._id
    });
    
    res.json({
      success: true,
      checkup
    });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Checkup not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
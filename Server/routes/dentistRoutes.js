import express from 'express';
import User from '../models/User.js';
import { protect, patientOnly } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/dentists
// @desc    Get all dentists
// @access  Public
router.get('/', async (req, res) => {
  try {
    const dentists = await User.find({ role: 'dentist' })
      .select('-password')
      .sort({ name: 1 });

    res.json({
      success: true,
      count: dentists.length,
      dentists
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/dentists/:id
// @desc    Get dentist by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const dentist = await User.findById(req.params.id).select('-password');

    if (!dentist || dentist.role !== 'dentist') {
      return res.status(404).json({
        success: false,
        message: 'Dentist not found'
      });
    }

    res.json({
      success: true,
      dentist
    });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Dentist not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
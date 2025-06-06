import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }
};

export const dentistOnly = (req, res, next) => {
  if (req.user && req.user.role === 'dentist') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Not authorized, dentist only'
    });
  }
};

export const patientOnly = (req, res, next) => {
  if (req.user && req.user.role === 'patient') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Not authorized, patient only'
    });
  }
};
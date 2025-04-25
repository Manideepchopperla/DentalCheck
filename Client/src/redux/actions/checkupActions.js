import axios from './axiosConfig'
import { toast } from 'react-toastify';
import {
  getCheckupsSuccess,
  getCheckupSuccess,
  createCheckupSuccess,
  updateCheckupSuccess,
  uploadImagesSuccess,
  checkupError,
  clearCheckup as clearCheckupAction
} from '../slices/checkupSlice';
import { setError } from '../slices/errorSlice';



// Get all checkups
export const getCheckups = () => async dispatch => {
  try {
    const res = await axios.get("/checkups");
    dispatch(getCheckupsSuccess(res.data.checkups));
  } catch (err) {
    const message =   err.response?.data?.message || err.message || 'Unknown error';
    const status =   err.response?.status || 500;

    dispatch(checkupError({ msg: message, status }));
    dispatch(setError({ message, status, id: 'CHECKUPS_ERROR' }));
  }
};

// Get checkup by ID
export const getCheckupById = (id) => async dispatch => {
  try {
    const res = await axios.get(`/checkups/${id}`);
    dispatch(getCheckupSuccess(res.data.checkup));
  } catch (err) {
    dispatch(checkupError({ msg:    err.response?.data?.message, status:  err.response?.status }));
    dispatch(setError({ 
      message:    err.response?.data?.message,
      status:  err.response?.status,
      id: 'CHECKUP_ERROR'
    }));
  }
};

// Create checkup
export const createCheckup = (dentistId, navigate) => async dispatch => {
  try {
    const res = await axios.post(`/checkups`, { dentistId });
    dispatch(createCheckupSuccess(res.data.checkup));
    toast.success('Checkup request sent successfully');
    navigate('/patient/dashboard');
  } catch (err) {
    dispatch(checkupError({ msg:    err.response?.data?.message, status:  err.response?.status }));
    toast.error('Failed to send checkup request');
    dispatch(setError({ 
      message:    err.response?.data?.message,
      status:  err.response?.status,
      id: 'CREATE_CHECKUP_ERROR'
    }));
  }
};

// Update checkup status
export const updateCheckupStatus = (id, status) => async dispatch => {
  try {
    const res = await axios.put(`/checkups/${id}/status`, { status });
    dispatch(updateCheckupSuccess(res.data.checkup));
    toast.success(`Checkup marked as ${status}`);
  } catch (err) {
    dispatch(checkupError({ msg:    err.response?.data?.message, status:  err.response?.status }));
    toast.error('Failed to update checkup status');
    dispatch(setError({ 
      message:    err.response?.data?.message,
      status:  err.response?.status,
      id: 'UPDATE_CHECKUP_ERROR'
    }));
  }
};

// Update checkup notes
export const updateCheckupNotes = (id, notes) => async dispatch => {
  try {
    const res = await axios.put(`/checkups/${id}/notes`, { notes });
    dispatch(updateCheckupSuccess(res.data.checkup));
    toast.success('Notes updated successfully');
  } catch (err) {
    dispatch(checkupError({ msg:    err.response?.data?.message, status:  err.response?.status }));
    toast.error('Failed to update notes');
    dispatch(setError({ 
      message:    err.response?.data?.message,
      status:  err.response?.status,
      id: 'UPDATE_NOTES_ERROR'
    }));
  }
};

// Upload images with notes
export const uploadImages = (id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const res = await axios.post(`/checkups/${id}/images`, formData, config);
    dispatch(uploadImagesSuccess(res.data.checkup));
    toast.success('Images uploaded successfully');
  } catch (err) {
    dispatch(checkupError({ msg:    err.response?.data?.message, status:  err.response?.status }));
    toast.error('Failed to upload images');
    dispatch(setError({ 
      message:    err.response?.data?.message,
      status:  err.response?.status,
      id: 'UPLOAD_IMAGES_ERROR'
    }));
  }
};

// Clear current checkup
export const clearCheckup = () => dispatch => {
  dispatch(clearCheckupAction());
};
import axios from './axiosConfig';
import {
  getDentistsSuccess,
  getDentistSuccess,
  dentistError
} from '../slices/dentistSlice';
import { setError } from '../slices/errorSlice';

// Get all dentists
export const getDentists = () => async dispatch => {
  try {
    const res = await axios.get(`/dentists`);
    dispatch(getDentistsSuccess(res.data.dentists));
  } catch (err) {
    dispatch(dentistError({ msg:    err.response?.data?.message, status:  err.response?.status }));
    dispatch(setError({ 
      message:    err.response?.data?.message,
      status:  err.response?.status,
      id: 'DENTISTS_ERROR'
    }));
  }
};

// Get dentist by ID
export const getDentistById = (id) => async dispatch => {
  try {
    const res = await axios.get(`/dentists/${id}`);
    dispatch(getDentistSuccess(res.data.dentist));
  } catch (err) {
    dispatch(dentistError({ msg:    err.response?.data?.message, status:  err.response?.status }));
    dispatch(setError({ 
      message:    err.response?.data?.message,
      status:  err.response?.status,
      id: 'DENTIST_ERROR'
    }));
  }
};
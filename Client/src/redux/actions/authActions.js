import axios from 'axios';
import { toast } from 'react-toastify';
import {
  userLoaded,
  registerSuccess,
  loginSuccess,
  updateProfileSuccess,
  authError,
  logout as logoutAction
} from '../slices/authSlice';
import { setError } from '../slices/errorSlice';
import { setAuthToken } from '../../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/users/profile`);
    dispatch(userLoaded(res.data.user));
  } catch (err) {
    dispatch(authError());
  }
};

// Register User
export const register = (formData) => async dispatch => {
  try {
    const res = await axios.post(`/api/auth/register`, formData);
    dispatch(registerSuccess(res.data.user));
    dispatch(loadUser());
    toast.success('Registration successful!');
  } catch (err) {
    const errors =    err.response?.data?.message;
    
    if (errors) {
      toast.error(errors);
    }

    dispatch(authError());
    dispatch(setError({ 
      message: errors,
      status:  err.response?.status,
      id: 'REGISTER_FAIL'
    }));
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`/api/auth/login`, body, config);
    dispatch(loginSuccess(res.data.user));
    dispatch(loadUser());
    toast.success('Login successful!');
  } catch (err) {
    const errors =    err.response?.data?.message;
    
    if (errors) {
      toast.error(errors);
    }

    dispatch(authError());
    dispatch(setError({ 
      message: errors,
      status:  err.response?.status,
      id: 'LOGIN_FAIL'
    }));
  }
};

// Update profile
export const updateProfile = (formData) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/profile`, formData);
    dispatch(updateProfileSuccess(res.data.user));
    toast.success('Profile updated successfully');
  } catch (err) {
    const errors =    err.response?.data?.message;
    
    if (errors) {
      toast.error(errors);
    }

    dispatch(authError());
    dispatch(setError({ 
      message: errors,
      status:  err.response?.status,
      id: 'UPDATE_PROFILE_FAIL'
    }));
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch(logoutAction());
  toast.info('Logged out successfully');
};
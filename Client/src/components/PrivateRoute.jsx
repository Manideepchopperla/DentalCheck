import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, loading, user } = useSelector(state => state.auth);
  
  if (loading) {
    return <Spinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If role is specified, check user role
  if (role && user && user.role !== role) {
    // Redirect to the appropriate dashboard
    if (user.role === 'patient') {
      return <Navigate to="/patient/dashboard" />;
    } else if (user.role === 'dentist') {
      return <Navigate to="/dentist/dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }
  
  return children;
};

export default PrivateRoute;
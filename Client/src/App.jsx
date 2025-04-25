import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/patient/Dashboard';
import DentistsList from './pages/patient/DentistsList';
import CheckupRequest from './pages/patient/CheckupRequest';
import CheckupDetails from './pages/patient/CheckupDetails';
import DentistDashboard from './pages/dentist/Dashboard';
import PatientList from './pages/dentist/PatientList';
import ManageCheckup from './pages/dentist/ManageCheckup';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <main className="pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Patient Routes */}
            <Route 
              path="/patient/dashboard" 
              element={
                <PrivateRoute role="patient">
                  <PatientDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/patient/dentists" 
              element={
                <PrivateRoute role="patient">
                  <DentistsList />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/patient/request-checkup/:id" 
              element={
                <PrivateRoute role="patient">
                  <CheckupRequest />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/patient/checkup/:id" 
              element={
                <PrivateRoute role="patient">
                  <CheckupDetails />
                </PrivateRoute>
              } 
            />
            
            {/* Dentist Routes */}
            <Route 
              path="/dentist/dashboard" 
              element={
                <PrivateRoute role="dentist">
                  <DentistDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dentist/patients" 
              element={
                <PrivateRoute role="dentist">
                  <PatientList />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dentist/checkup/:id" 
              element={
                <PrivateRoute role="dentist">
                  <ManageCheckup />
                </PrivateRoute>
              } 
            />
            
            {/* Common Routes */}
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
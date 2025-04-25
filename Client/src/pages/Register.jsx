import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: ''
  });
  
  const { name, email, password, password2, role } = formData;
  const [passwordError, setPasswordError] = useState('');
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If already authenticated, redirect to appropriate dashboard
    if (isAuthenticated) {
      if (user && user.role === 'patient') {
        navigate('/patient/dashboard');
      } else if (user && user.role === 'dentist') {
        navigate('/dentist/dashboard');
      }
    }
  }, [isAuthenticated, navigate, user]);
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear password error when either password field changes
    if (e.target.name === 'password' || e.target.name === 'password2') {
      setPasswordError('');
    }
  };
  
  const onSubmit = e => {
    e.preventDefault();
    
    if (password !== password2) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    dispatch(register(formData));
    navigate('/profile');
  };
  
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="mt-2 text-gray-600">Sign up for a new account</p>
          </div>
          
          <form onSubmit={onSubmit}>
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={name}
              onChange={onChange}
              placeholder="Enter your full name"
              required
            />
            
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
            
            <Select
              label="Account Type"
              name="role"
              value={role}
              onChange={onChange}
              options={[
                { value: 'patient', label: 'Patient' },
                { value: 'dentist', label: 'Dentist' }
              ]}
              placeholder="Select account type"
              required
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
            
            <Input
              label="Confirm Password"
              name="password2"
              type="password"
              value={password2}
              onChange={onChange}
              placeholder="Confirm your password"
              error={passwordError}
              required
            />
            
            <div className="mb-6">
              <Button type="submit" variant="primary" fullWidth>
                Register
              </Button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-primary-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { email, password } = formData;
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
  };
  
  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>
          
          <form onSubmit={onSubmit}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
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
            
            <div className="mb-6">
              <Button type="submit" variant="primary" fullWidth>
                Sign In
              </Button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-primary-700 font-medium">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/actions/authActions';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import Card from '../components/Card';
import Spinner from '../components/Spinner';

const Profile = () => {
  const { user, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    specialization: '',
    experience: ''
  });
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        bio: user.bio || '',
        specialization: user.specialization || '',
        experience: user.experience || ''
      });
    }
  }, [user]);
  
  const { name, email, password, bio, specialization, experience } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = e => {
    e.preventDefault();
    
    const profileData = {
      name,
      email,
      bio
    };
    
    if (password) {
      profileData.password = password;
    }
    
    if (user && user.role === 'dentist') {
      profileData.specialization = specialization;
      profileData.experience = experience;
    }
    
    dispatch(updateProfile(profileData));
  };
  
  if (loading || !user) {
    return <Spinner />;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600 mt-2">
          Update your personal information and account settings
        </p>
      </div>
      
      <Card>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            
            <Textarea
              label="Bio"
              name="bio"
              value={bio}
              onChange={onChange}
              placeholder="Tell us a bit about yourself"
            />
          </div>
          
          {user.role === 'dentist' && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Professional Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Specialization"
                  name="specialization"
                  type="text"
                  value={specialization}
                  onChange={onChange}
                  placeholder="e.g., Orthodontist, Periodontist"
                />
                
                <Input
                  label="Years of Experience"
                  name="experience"
                  type="number"
                  value={experience}
                  onChange={onChange}
                  placeholder="Years of professional experience"
                />
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Update Password
            </h2>
            
            <Input
              label="New Password"
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              placeholder="Enter new password (leave blank to keep current)"
            />
            <p className="text-sm text-gray-500 mb-4">
              Leave blank if you don't want to change your password
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
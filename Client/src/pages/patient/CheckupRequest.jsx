import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDentistById } from '../../redux/actions/dentistActions';
import { createCheckup } from '../../redux/actions/checkupActions';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import { User, Award, Clock, Mail, ChevronLeft } from 'lucide-react';

const CheckupRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dentist, loading } = useSelector(state => state.dentists);
  
  useEffect(() => {
    dispatch(getDentistById(id));
  }, [dispatch, id]);
  
  const handleRequestCheckup = () => {
    dispatch(createCheckup(id, navigate));
  };
  
  if (loading || !dentist) {
    return <Spinner />;
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link to="/patient/dentists" className="text-blue-600 hover:text-primary-700 flex items-center mr-4">
            <ChevronLeft size={16} /> Back to Dentists
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Request a Checkup</h1>
        <p className="text-gray-600 mt-2">
          Review the dentist details and confirm your checkup request
        </p>
      </div>
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Dentist Information</h2>
        
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 md:mr-8 mb-6 md:mb-0">
            <div className="bg-primary-100 text-blue-600 rounded-full p-6 inline-flex">
              <User size={48} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Dr. {dentist.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
              <div className="flex items-center">
                <Mail size={16} className="text-gray-500 mr-2" />
                <span className="text-gray-700">{dentist.email}</span>
              </div>
              
              {dentist.specialization && (
                <div className="flex items-center">
                  <Award size={16} className="text-blue-600 mr-2" />
                  <span className="text-gray-700">{dentist.specialization}</span>
                </div>
              )}
              
              {dentist.experience > 0 && (
                <div className="flex items-center">
                  <Clock size={16} className="text-gray-500 mr-2" />
                  <span className="text-gray-700">
                    {dentist.experience} {dentist.experience === 1 ? 'year' : 'years'} of experience
                  </span>
                </div>
              )}
            </div>
            
            {dentist.bio && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">About</h4>
                <p className="text-gray-600">{dentist.bio}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirm Checkup Request</h2>
        <p className="text-gray-600 mb-6">
          By confirming, you will send a checkup request to Dr. {dentist.name}. 
          Once they approve your request, they will be able to upload checkup images and notes.
        </p>
        
        <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
          <Button 
            variant="outline"
            onClick={() => navigate('/patient/dentists')}
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            onClick={handleRequestCheckup}
          >
            Confirm Request
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CheckupRequest;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDentists } from '../../redux/actions/dentistActions';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import { User, Award, Clock, ChevronLeft } from 'lucide-react';

const DentistsList = () => {
  const { dentists, loading } = useSelector(state => state.dentists);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getDentists());
  }, [dispatch]);
  
  if (loading) {
    return <Spinner />;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link to="/patient/dashboard" className="text-blue-600 hover:text-primary-700 flex items-center mr-4">
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Find a Dentist</h1>
        <p className="text-gray-600 mt-2">
          Choose a dentist from our list of professionals to request a checkup
        </p>
      </div>
      
      {dentists.length === 0 ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <User size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Dentists Available</h2>
            <p className="text-gray-600 mb-6">
              There are currently no dentists registered in our system. Please check back later.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dentists.map(dentist => (
            <Card key={dentist._id} className="flex flex-col" hover>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Dr. {dentist.name}
                </h2>
                {dentist.specialization && (
                  <div className="flex items-center mb-2">
                    <Award size={16} className="text-blue-600 mr-2" />
                    <span className="text-gray-700">{dentist.specialization}</span>
                  </div>
                )}
                {dentist.experience > 0 && (
                  <div className="flex items-center mb-2">
                    <Clock size={16} className="text-gray-500 mr-2" />
                    <span className="text-gray-700">
                      {dentist.experience} {dentist.experience === 1 ? 'year' : 'years'} of experience
                    </span>
                  </div>
                )}
              </div>
              
              {dentist.bio && (
                <p className="text-gray-600 mb-4 flex-grow">
                  {dentist.bio.length > 120 ? `${dentist.bio.substring(0, 120)}...` : dentist.bio}
                </p>
              )}
              
              <div className="mt-auto">
                <Link to={`/patient/request-checkup/${dentist._id}`}>
                  <Button variant="primary" fullWidth>
                    Request Checkup
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DentistsList;
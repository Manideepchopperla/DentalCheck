import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckups } from '../../redux/actions/checkupActions';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Spinner from '../../components/Spinner';
import { User, Calendar, PlusCircle, FileText } from 'lucide-react';

const Dashboard = () => {
  const { checkups=[], loading } = useSelector(state => state.checkups);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCheckups());
  }, [dispatch, user]);


  
  if (loading) {
    return <Spinner />;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name}! Manage your dental checkups here.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/patient/dentists">
            <Button variant="primary">
              <PlusCircle size={16} className="mr-2" /> New Checkup Request
            </Button>
          </Link>
        </div>
      </div>
      
      {checkups.length === 0 ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Checkups Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't requested any dental checkups yet. Start by finding a dentist and requesting a checkup.
            </p>
            <Link to="/patient/dentists">
              <Button variant="primary">
                Find a Dentist
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          { checkups && checkups.map(checkup => (
            <Card key={checkup._id} className="flex flex-col" hover>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Checkup #{checkup._id.slice(-4)}
                </h2>
                <Badge>{checkup.status}</Badge>
              </div>
              
              <div className="flex items-center mb-3">
                <User size={16} className="text-gray-500 mr-2" />
                <span className="text-gray-700">
                  Dr. {checkup.dentist.name}
                </span>
              </div>
              
              <div className="flex items-center mb-4">
                <Calendar size={16} className="text-gray-500 mr-2" />
                <span className="text-gray-700">
                  {new Date(checkup.requestDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="mt-auto">
                <Link to={`/patient/checkup/${checkup._id}`}>
                  <Button variant="outline" fullWidth>
                    View Details
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

export default Dashboard;
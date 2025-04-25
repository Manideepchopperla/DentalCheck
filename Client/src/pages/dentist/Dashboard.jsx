import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckups } from '../../redux/actions/checkupActions';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Spinner from '../../components/Spinner';
import { User, Calendar, FileText } from 'lucide-react';

const Dashboard = () => {
  const { checkups, loading } = useSelector(state => state.checkups);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCheckups());
  }, [dispatch, user]);

  
  if (loading) {
    return <Spinner />;
  }
  
  const pendingCheckups = checkups && checkups.filter(checkup => checkup.status === 'pending');
  const activeCheckups = checkups && checkups.filter(checkup => checkup.status === 'in-progress');
  const completedCheckups = checkups && checkups.filter(checkup => ['completed', 'cancelled'].includes(checkup.status));
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dentist Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, Dr. {user?.name}! Manage your patient checkups here.
        </p>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-primary-50 border-primary-200">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">Pending Requests</h3>
          <p className="text-3xl font-bold text-primary-700">{pendingCheckups && pendingCheckups.length}</p>
        </Card>
        
        <Card className="bg-secondary-50 border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Active Checkups</h3>
          <p className="text-3xl font-bold text-secondary-700">{activeCheckups &&  activeCheckups.length}</p>
        </Card>
        
        <Card className="bg-success-50 border-success-200">
          <h3 className="text-lg font-semibold text-success-900 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-success-700">{completedCheckups && completedCheckups.length}</p>
        </Card>
      </div>
      
      {checkups && checkups.length === 0 ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Checkups Yet</h2>
            <p className="text-gray-600 mb-6">
              You don't have any patient checkup requests yet. They will appear here when patients request a checkup with you.
            </p>
          </div>
        </Card>
      ) : (
        <>
          {pendingCheckups && pendingCheckups.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Requests</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pendingCheckups.map(checkup => (
                  <CheckupCard key={checkup._id} checkup={checkup} />
                ))}
              </div>
            </div>
          )}
          
          {activeCheckups && activeCheckups.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Checkups</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activeCheckups.map(checkup => (
                  <CheckupCard key={checkup._id} checkup={checkup} />
                ))}
              </div>
            </div>
          )}
          
          {completedCheckups && completedCheckups.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Checkups</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {completedCheckups.map(checkup => (
                  <CheckupCard key={checkup._id} checkup={checkup} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const CheckupCard = ({ checkup }) => {
  return (
    <Card className="flex flex-col" hover>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Checkup #{checkup._id.slice(-4)}
        </h3>
        <Badge>{checkup.status}</Badge>
      </div>
      
      <div className="flex items-center mb-3">
        <User size={16} className="text-gray-500 mr-2" />
        <span className="text-gray-700">
          {checkup.patient.name}
        </span>
      </div>
      
      <div className="flex items-center mb-4">
        <Calendar size={16} className="text-gray-500 mr-2" />
        <span className="text-gray-700">
          {new Date(checkup.requestDate).toLocaleDateString()}
        </span>
      </div>
      
      <div className="mt-auto">
        <Link to={`/dentist/checkup/${checkup._id}`}>
          <Button 
            variant={checkup.status === 'pending' ? 'primary' : 'outline'} 
            fullWidth
          >
            {checkup.status === 'pending' ? 'Manage Request' : 'View Details'}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckups } from '../../redux/actions/checkupActions';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import { User, Mail, Calendar, Search, ChevronLeft } from 'lucide-react';

const PatientList = () => {
  const { checkups, loading } = useSelector(state => state.checkups);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    dispatch(getCheckups());
  }, [dispatch]);
  
  if (loading) {
    return <Spinner />;
  }
  
  // Get unique patients
  const uniquePatients = [];
  const patientIds = new Set();
  
  checkups.forEach(checkup => {
    if (!patientIds.has(checkup.patient._id)) {
      patientIds.add(checkup.patient._id);
      uniquePatients.push({
        _id: checkup.patient._id,
        name: checkup.patient.name,
        email: checkup.patient.email,
        checkups: []
      });
    }
  });
  
  // Add checkups to each patient
  checkups.forEach(checkup => {
    const patient = uniquePatients.find(p => p._id === checkup.patient._id);
    if (patient) {
      patient.checkups.push(checkup);
    }
  });
  
  // Filter patients by search term
  const filteredPatients = searchTerm
    ? uniquePatients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : uniquePatients;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link to="/dentist/dashboard" className="text-blue-600 hover:text-primary-700 flex items-center mr-4">
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Your Patients</h1>
        <p className="text-gray-600 mt-2">
          View all patients who have requested checkups with you
        </p>
      </div>
      
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search patients by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredPatients.length === 0 ? (
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <User size={48} className="mx-auto text-gray-400 mb-4" />
            {searchTerm ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No Matching Patients</h2>
                <p className="text-gray-600 mb-6">
                  No patients match your search criteria. Try a different search term.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No Patients Yet</h2>
                <p className="text-gray-600 mb-6">
                  You don't have any patients yet. They will appear here when they request a checkup with you.
                </p>
              </>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map(patient => (
            <Card key={patient._id} className="flex flex-col" hover>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {patient.name}
                </h2>
                <div className="flex items-center mb-3">
                  <Mail size={16} className="text-gray-500 mr-2" />
                  <span className="text-gray-700">{patient.email}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-500 mr-2" />
                  <span className="text-gray-700">
                    {patient.checkups.length} checkup{patient.checkups.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              <div className="mt-auto">
                {patient.checkups.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Checkups</h3>
                    <ul className="mb-4">
                      {patient.checkups.slice(0, 2).map(checkup => (
                        <li key={checkup._id} className="mb-2">
                          <Link 
                            to={`/dentist/checkup/${checkup._id}`}
                            className="text-sm text-blue-600 hover:text-primary-700 flex items-center"
                          >
                            Checkup #{checkup._id.slice(-4)} - {new Date(checkup.requestDate).toLocaleDateString()}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Button variant="outline" fullWidth>
                  View Patient
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;
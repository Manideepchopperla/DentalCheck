import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckupById, clearCheckup } from '../../redux/actions/checkupActions';
import { generatePDF } from '../../utils/pdfGenerator';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Spinner from '../../components/Spinner';
import { User, Calendar, FileText, Download, ChevronLeft, Image, AlertTriangle } from 'lucide-react';

const CheckupDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { checkup, loading } = useSelector(state => state.checkups);
  
  useEffect(() => {
    dispatch(getCheckupById(id));
    
    return () => {
      dispatch(clearCheckup());
    };
  }, [dispatch, id]);
  
  const handleExportPDF = () => {
    generatePDF(checkup);
  };
  
  if (loading || !checkup) {
    return <Spinner />;
  }
  
  const hasResults = checkup.status !== 'pending' && (checkup.images.length > 0 || checkup.notes);
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link to="/patient/dashboard" className="text-blue-600 hover:text-primary-700 flex items-center mr-4">
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Checkup Details</h1>
            <p className="text-gray-600 mt-2">
              Checkup #{checkup._id.slice(-4)} with Dr. {checkup.dentist.name}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge size="lg">{checkup.status}</Badge>
          </div>
        </div>
      </div>
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Checkup Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Dentist</h3>
            <div className="flex items-center">
              <User size={16} className="text-gray-500 mr-2" />
              <span className="text-gray-900">Dr. {checkup.dentist.name}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Request Date</h3>
            <div className="flex items-center">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <span className="text-gray-900">
                {new Date(checkup.requestDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          {checkup.completionDate && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Completion Date</h3>
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-500 mr-2" />
                <span className="text-gray-900">
                  {new Date(checkup.completionDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {checkup.notes && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Dentist Notes</h3>
            <p className="text-gray-900 p-3 bg-gray-50 rounded-md">{checkup.notes}</p>
          </div>
        )}
        
        {hasResults && (
          <div className="flex justify-end">
            <Button variant="primary" onClick={handleExportPDF}>
              <Download size={16} className="mr-2" /> Export to PDF
            </Button>
          </div>
        )}
      </Card>
      
      {checkup.images.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Checkup Images</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {checkup.images.map((image, index) => (
              <Card key={index} noPadding className="overflow-hidden">
                <div className="aspect-video bg-gray-100">
                  <img 
                    src={image.url} 
                    alt={`Checkup image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Image {index + 1}</h3>
                  {image.notes ? (
                    <p className="text-gray-700">{image.notes}</p>
                  ) : (
                    <p className="text-gray-500 italic">No notes for this image</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Uploaded: {new Date(image.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : checkup.status === 'pending' ? (
        <Card className="text-center py-8">
          <AlertTriangle size={40} className="mx-auto text-warning-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Checkup Pending</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Your checkup request is pending. Once the dentist accepts and completes
            your checkup, you'll be able to see the results here.
          </p>
        </Card>
      ) : (
        <Card className="text-center py-8">
          <Image size={40} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Images Yet</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The dentist hasn't uploaded any images for this checkup yet.
            Check back later for updates.
          </p>
        </Card>
      )}
    </div>
  );
};

export default CheckupDetails;
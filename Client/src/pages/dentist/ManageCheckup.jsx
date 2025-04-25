import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getCheckupById, 
  clearCheckup, 
  updateCheckupStatus,
  updateCheckupNotes,
  uploadImages
} from '../../redux/actions/checkupActions';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Spinner from '../../components/Spinner';
import { User, Calendar, FileText, Image, ChevronLeft, X, Upload, Save } from 'lucide-react';

const ManageCheckup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { checkup, loading } = useSelector(state => state.checkups);
  
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState([]);
  const [imageNotes, setImageNotes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    dispatch(getCheckupById(id));
    
    return () => {
      dispatch(clearCheckup());
    };
  }, [dispatch, id]);
  
  useEffect(() => {
    if (checkup) {
      setStatus(checkup.status);
      setNotes(checkup.notes || '');
    }
  }, [checkup]);
  
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    dispatch(updateCheckupStatus(id, e.target.value));
  };
  
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  
  const handleSaveNotes = () => {
    dispatch(updateCheckupNotes(id, notes));
  };
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    setImageNotes(Array(selectedFiles.length).fill(''));
  };
  
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    const newImageNotes = [...imageNotes];
    newImages.splice(index, 1);
    newImageNotes.splice(index, 1);
    setImages(newImages);
    setImageNotes(newImageNotes);
  };
  
  const handleImageNotesChange = (index, value) => {
    const newImageNotes = [...imageNotes];
    newImageNotes[index] = value;
    setImageNotes(newImageNotes);
  };
  
  const handleUploadImages = async () => {
    setUploading(true);
    
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('image', image);
      formData.append('notes', imageNotes[index] || '');
    });
    
    await dispatch(uploadImages(id, formData));
    
    setImages([]);
    setImageNotes([]);
    setUploading(false);
  };
  
  if (loading || !checkup) {
    return <Spinner />;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link to="/dentist/dashboard" className="text-blue-600 hover:text-primary-700 flex items-center mr-4">
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Checkup</h1>
            <p className="text-gray-600 mt-2">
              Checkup #{checkup._id.slice(-4)} for {checkup.patient.name}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge size="lg">{checkup.status}</Badge>
          </div>
        </div>
      </div>
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Patient Name</h3>
            <div className="flex items-center">
              <User size={16} className="text-gray-500 mr-2" />
              <span className="text-gray-900">{checkup.patient.name}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
            <span className="text-gray-900">{checkup.patient.email}</span>
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
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
            <Select
              name="status"
              value={status}
              onChange={handleStatusChange}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' }
              ]}
            />
          </div>
        </div>
      </Card>
      
      <Card className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Notes</h2>
          <Button variant="outline" size="sm" onClick={handleSaveNotes}>
            <Save size={16} className="mr-2" /> Save Notes
          </Button>
        </div>
        
        <Textarea
          name="notes"
          value={notes}
          onChange={handleNotesChange}
          placeholder="Add your notes about this checkup here..."
          rows={6}
        />
      </Card>
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Images</h2>
        
        <div className="mb-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            onClick={() => fileInputRef.current.click()}
            variant="outline"
            fullWidth
          >
            <Image size={16} className="mr-2" /> Select Images
          </Button>
        </div>
        
        {images.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Selected Images</h3>
            
            {images.map((image, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {image.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="text-gray-500 hover:text-error-600"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <Textarea
                  placeholder="Add notes for this image..."
                  value={imageNotes[index] || ''}
                  onChange={(e) => handleImageNotesChange(index, e.target.value)}
                  rows={3}
                />
              </div>
            ))}
            
            <Button
              onClick={handleUploadImages}
              variant="primary"
              disabled={uploading}
              fullWidth
            >
              <Upload size={16} className="mr-2" />
              {uploading ? 'Uploading...' : 'Upload Images'}
            </Button>
          </div>
        )}
      </Card>
      
      {checkup.images.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Images</h2>
          
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
      )}
    </div>
  );
};

export default ManageCheckup;
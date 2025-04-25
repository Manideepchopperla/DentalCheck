import multer from 'multer';
import cloudinary from './cloudinary.js';
import { Readable } from 'stream';

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const uploadToCloudinary = async (buffer, filename, folder = 'DentalCheck') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder, // 🔥 This creates or uses the folder
        public_id: filename, // Optional: keep original name without extension
        resource_type: 'image'
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

export default upload;

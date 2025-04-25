import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dentistRoutes from './routes/dentistRoutes.js';
import checkupRoutes from './routes/checkupRoutes.js';
import path from "path";
import { fileURLToPath } from 'url';



const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));



// Middleware
// app.cors(
//   {origin: process.env.CLIENT_URL || 'http://localhost:5173',}
// )
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join_room', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dentists', dentistRoutes);
app.use('/api/checkups', checkupRoutes);
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    success: false,
    message: 'An error occurred',
    error: err.message
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dental-checkup');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Make io accessible in request object
app.set('io', io);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
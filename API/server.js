import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import Database from './config/dbConnect.js'; 
import authRoute from './routes/authRoutes.js';
import adminRoute from './routes/adminRoutes.js';
import userRoute from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/auth/v1',authRoute)
app.use('/api/admin/v1',adminRoute)
app.use('/api/user/v1',userRoute)


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});


const PORT = process.env.PORT || 5000;


Database.connect()
  .then(() => {
    console.log('🚀 Database connection established');
  })
  .catch(error => {
    console.warn('⚠️ Database connection failed, running without database:', error.message);
  });


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}`);
});
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import Database from './config/dbConnect.js'; 
import authRoute from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    process.env.CORS_ORIGIN
  ].filter(Boolean),
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});


const PORT = process.env.PORT || 5000;

// محاولة الاتصال بقاعدة البيانات، ولكن تشغيل الخادم حتى لو فشل الاتصال
Database.connect()
  .then(() => {
    console.log('🚀 Database connection established');
  })
  .catch(error => {
    console.warn('⚠️ Database connection failed, running without database:', error.message);
  });

// تشغيل الخادم بغض النظر عن حالة قاعدة البيانات
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}`);
});
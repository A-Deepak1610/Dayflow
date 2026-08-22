import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import attendanceRoutes from './attendance.routes';
import salaryRoutes from './salary.routes';

const router = Router();

// API Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dayflow API is running' });
});

// Auth Routes
router.use('/auth', authRoutes);

// Attendance Routes
router.use('/attendance', attendanceRoutes);

// Salary Routes
router.use('/salary', salaryRoutes);

export default router;

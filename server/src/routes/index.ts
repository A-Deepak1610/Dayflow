import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import domainRoutes from './domain.routes';
import attendanceRoutes from './attendance.routes';
import salaryRoutes from './salary.routes';
import aiRoutes from './ai.routes';

const router = Router();

// API Health Check
router.use('/health', healthRoutes);

// Auth Routes
router.use('/auth', authRoutes);

// AI Chatbot Routes (Publicly accessible for landing page & portal)
router.use('/ai', aiRoutes);

// Domain Routes (Protected HR & Employee domain endpoints)
router.use('/', domainRoutes);

// Attendance Routes
router.use('/attendance', attendanceRoutes);

// Salary Routes
router.use('/salary', salaryRoutes);

export default router;

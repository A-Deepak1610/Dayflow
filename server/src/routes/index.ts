import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import dashboardRoutes from './dashboard.routes';
import attendanceRoutes from './attendance.routes';
import leaveRoutes from './leave.routes';
import employeeRoutes from './employee.routes';
import payrollRoutes from './payroll.routes';
import performanceRoutes from './performance.routes';
import helpdeskRoutes from './helpdesk.routes';
import salaryRoutes from './salary.routes';
import domainRoutes from './domain.routes';

const router = Router();

// API Health Check
router.use('/health', healthRoutes);

// Auth Routes
router.use('/auth', authRoutes);

// Dashboard Analytics
router.use('/dashboard', dashboardRoutes);

// Attendance & Biometrics
router.use('/attendance', attendanceRoutes);

// Leave Management (handles /leaves and /leave)
router.use('/leaves', leaveRoutes);
router.use('/leave', leaveRoutes);

// Employee Registry & Directory
router.use('/employees', employeeRoutes);

// Payroll & Compensation
router.use('/payroll', payrollRoutes);

// Performance Reviews
router.use('/performance', performanceRoutes);

// Helpdesk & Support Tickets
router.use('/helpdesk', helpdeskRoutes);

// Salary
router.use('/salary', salaryRoutes);

// Fallback Domain Routes
router.use('/', domainRoutes);

export default router;

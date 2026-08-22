import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import attendanceRoutes from './attendance.routes';
import leaveRoutes from './leave.routes';
import payrollRoutes from './payroll.routes';
import employeeRoutes from './employee.routes';
import dashboardRoutes from './dashboard.routes';
import helpdeskRoutes from './helpdesk.routes';
import performanceRoutes from './performance.routes';
import domainRoutes from './domain.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/leaves', leaveRoutes);
router.use('/payroll', payrollRoutes);
router.use('/employees', employeeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/helpdesk', helpdeskRoutes);
router.use('/performance', performanceRoutes);
router.use('/', domainRoutes);

export default router;

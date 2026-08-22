import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import {
  getEmployeeDashboardStats,
  getHrDashboardStats,
} from '../controllers/dashboard.controller';

const router = Router();
router.use(authenticate);

router.get('/employee', getEmployeeDashboardStats);
router.get('/hr', requireRole(['ADMIN', 'HR']), getHrDashboardStats);

export default router;

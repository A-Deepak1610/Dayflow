import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import {
  getMyPayrollDetails,
  getPayslipById,
  getAllPayrollRecords,
  getAllSalaryStructures,
  createSalaryRevision,
} from '../controllers/payroll.controller';

const router = Router();
router.use(authenticate);

// Employee routes
router.get('/me', getMyPayrollDetails);
router.get('/me/payslips', getMyPayrollDetails);
router.get('/payslips/:id', getPayslipById);

// HR / Admin routes
router.get('/records', requireRole(['ADMIN', 'HR']), getAllPayrollRecords);
router.get('/analytics/summary', requireRole(['ADMIN', 'HR']), getAllPayrollRecords);
router.get('/structures', requireRole(['ADMIN', 'HR']), getAllSalaryStructures);
router.post('/revisions', requireRole(['ADMIN', 'HR']), createSalaryRevision);

export default router;

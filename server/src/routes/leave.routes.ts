import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import {
  getLeaveTypes,
  getMyLeaveBalances,
  getMyLeaveRequests,
  applyLeave,
  cancelMyLeave,
  getAllLeaveRequests,
  reviewLeaveRequest,
  getCompanyHolidays,
} from '../controllers/leave.controller';

const router = Router();
router.use(authenticate);

// Employee routes
router.get('/types', getLeaveTypes);
router.get('/balances/me', getMyLeaveBalances);
router.get('/me', getMyLeaveRequests);
router.post('/apply', applyLeave);
router.patch('/:id/cancel', cancelMyLeave);
router.get('/holidays', getCompanyHolidays);

// HR / Admin routes
router.get('/all', requireRole(['ADMIN', 'HR']), getAllLeaveRequests);
router.patch('/:id/review', requireRole(['ADMIN', 'HR']), reviewLeaveRequest);

export default router;

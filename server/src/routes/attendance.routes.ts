import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import {
  getMyAttendance,
  clockIn,
  clockOut,
  getMyRegularizations,
  submitRegularization,
  getAllAttendance,
  getAllRegularizations,
  reviewRegularization,
} from '../controllers/attendance.controller';

const router = Router();
router.use(authenticate);

// Employee routes
router.get('/me', getMyAttendance);
router.post('/clock-in', clockIn);
router.post('/clock-out', clockOut);
router.get('/regularizations/me', getMyRegularizations);
router.post('/regularizations', submitRegularization);

// HR / Admin routes
router.get('/all', requireRole(['ADMIN', 'HR']), getAllAttendance);
router.get('/regularizations/all', requireRole(['ADMIN', 'HR']), getAllRegularizations);
router.patch('/regularizations/:id/review', requireRole(['ADMIN', 'HR']), reviewRegularization);

export default router;

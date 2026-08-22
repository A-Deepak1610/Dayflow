import { Router } from 'express';
import {
  clockIn,
  clockOut,
  getMyAttendance,
  getMyRegularizations,
  submitRegularization,
  getAllAttendance,
  getAllRegularizations,
  reviewRegularization
} from '../controllers/attendance.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();
router.use(authenticate);

// Employee routes
router.post('/clock-in', clockIn);
router.post('/clock-out', clockOut);
router.get('/me', getMyAttendance);
router.get('/me/regularizations', getMyRegularizations);
router.post('/regularize', submitRegularization);

// HR / Admin routes
router.get('/all', requireRole(['ADMIN', 'HR']), getAllAttendance);
router.get('/regularizations/all', requireRole(['ADMIN', 'HR']), getAllRegularizations);
router.patch('/regularize/:id/review', requireRole(['ADMIN', 'HR']), reviewRegularization);

export default router;

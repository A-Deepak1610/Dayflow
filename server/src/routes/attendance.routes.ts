import { Router } from 'express';
import { clockIn, clockOut, getMyAttendance } from '../controllers/attendance.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/clock-in', authenticate, clockIn);
router.post('/clock-out', authenticate, clockOut);
router.get('/me', authenticate, getMyAttendance);

export default router;

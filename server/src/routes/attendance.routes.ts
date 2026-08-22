import { Router } from 'express';
import {
  checkIn,
  checkOut,
  getTodayStatus,
  getAttendanceHistory,
} from '../controllers/attendance.controller';

const router = Router();

router.post('/check-in', checkIn);
router.post('/check-out', checkOut);
router.get('/today', getTodayStatus);
router.get('/history', getAttendanceHistory);

export default router;

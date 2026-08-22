import { Router } from 'express';
import { registerCompany, createEmployee, login, logout, sendOtp, verifyOtp } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// Public routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register-company', upload.single('logo'), registerCompany);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes (Admin & HR only)
router.post(
  '/create-employee',
  authenticate,
  requireRole(['ADMIN', 'HR']),
  createEmployee
);

export default router;

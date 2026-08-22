import { Router } from 'express';
import { getMySalary } from '../controllers/salary.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', authenticate, getMySalary);

export default router;

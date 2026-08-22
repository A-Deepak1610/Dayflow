import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getPerformanceReviews } from '../controllers/helpdesk-performance.controller';

const router = Router();
router.use(authenticate);

router.get('/', getPerformanceReviews);

export default router;

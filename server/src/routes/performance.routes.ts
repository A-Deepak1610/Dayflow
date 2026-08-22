import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getPerformanceReviews } from '../controllers/helpdesk-performance.controller';

const router = Router();
router.use(authenticate);

router.get('/', getPerformanceReviews);
router.get('/reviews', getPerformanceReviews);
router.get('/all', getPerformanceReviews);

export default router;

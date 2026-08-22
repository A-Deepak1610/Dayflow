import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import {
  getHelpdeskTickets,
  createHelpdeskTicket,
  updateHelpdeskTicket,
} from '../controllers/helpdesk-performance.controller';

const router = Router();
router.use(authenticate);

router.get('/', getHelpdeskTickets);
router.post('/', createHelpdeskTicket);
router.patch('/:id', requireRole(['ADMIN', 'HR']), updateHelpdeskTicket);

export default router;

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

// Support both /helpdesk and /helpdesk/tickets paths
router.get('/', getHelpdeskTickets);
router.get('/tickets', getHelpdeskTickets);
router.post('/', createHelpdeskTicket);
router.post('/tickets', createHelpdeskTicket);
router.patch('/:id', requireRole(['ADMIN', 'HR']), updateHelpdeskTicket);
router.patch('/tickets/:id', requireRole(['ADMIN', 'HR']), updateHelpdeskTicket);

export default router;

import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import {
  getColleagueDirectory,
  getMyProfile,
  updateMyProfile,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeByAdmin,
} from '../controllers/employee.controller';

const router = Router();
router.use(authenticate);

// Employee routes
router.get('/directory', getColleagueDirectory);
router.get('/me', getMyProfile);
router.patch('/me', updateMyProfile);

// HR / Admin routes
router.get('/', requireRole(['ADMIN', 'HR']), getAllEmployees);
router.get('/:id', requireRole(['ADMIN', 'HR']), getEmployeeById);
router.patch('/:id', requireRole(['ADMIN', 'HR']), updateEmployeeByAdmin);

export default router;

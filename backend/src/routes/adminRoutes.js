import { Router } from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { listUsers } from '../controllers/userController.js';
import { createTask } from '../controllers/taskController.js';

const router = Router();
router.use(protect, authorize('ADMIN'));
router.get('/users', listUsers);
router.post('/tasks', createTask);
export default router;
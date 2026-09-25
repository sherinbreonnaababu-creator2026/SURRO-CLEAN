import { Router } from 'express';
import { createTask, listTasks, updateTask } from '../controllers/taskController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();
router.get('/', protect, authorize('ADMIN', 'CLEANING_STAFF'), listTasks);
router.post('/', protect, authorize('ADMIN'), createTask);
router.patch('/:id', protect, authorize('ADMIN', 'CLEANING_STAFF'), updateTask);
export default router;
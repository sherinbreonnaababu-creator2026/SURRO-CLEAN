import { Router } from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { listTasks, updateTask } from '../controllers/taskController.js';

const router = Router();
router.use(protect, authorize('CLEANING_STAFF'));
router.get('/tasks', listTasks);
router.patch('/tasks/:id', updateTask);
export default router;
import { Router } from 'express';
import { createReport, listReports, updateReport, upvoteReport } from '../controllers/reportController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();
router.get('/', protect, listReports);
router.post('/', protect, authorize('STUDENT'), createReport);
router.patch('/:id', protect, authorize('ADMIN'), updateReport);
router.post('/:id/upvote', protect, upvoteReport);
export default router;
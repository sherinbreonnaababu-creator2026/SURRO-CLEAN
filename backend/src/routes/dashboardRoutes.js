import { Router } from 'express';
import { analytics, overview } from '../controllers/dashboardController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();
router.get('/overview', protect, overview);
router.get('/analytics', protect, authorize('ADMIN'), analytics);
export default router;
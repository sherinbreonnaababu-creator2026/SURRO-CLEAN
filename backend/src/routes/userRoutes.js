import { Router } from 'express';
import { leaderboard, listUsers, myPoints } from '../controllers/userController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();
router.get('/leaderboard', leaderboard);
router.get('/me/points', protect, myPoints);
router.get('/', protect, authorize('ADMIN'), listUsers);
export default router;
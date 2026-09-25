import { Router } from 'express';
import { disinfectFacility, listBins, listFacilities, updateBin } from '../controllers/operationsController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();
router.get('/bins', listBins);
router.patch('/bins/:id', protect, authorize('ADMIN', 'CLEANING_STAFF'), updateBin);
router.get('/facilities', listFacilities);
router.post('/facilities/:id/disinfect', protect, authorize('ADMIN', 'CLEANING_STAFF'), disinfectFacility);
export default router;
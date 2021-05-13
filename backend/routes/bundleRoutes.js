import express from 'express';
import { getBundles, getBundleById } from '../controllers/bundleController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBundles);
router.route('/:id').get(getBundleById);

export default router;

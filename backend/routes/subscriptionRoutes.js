import express from 'express';
import { getMySubscriptions, cancelSubscription } from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getMySubscriptions);
// .post(
//   protect
//    createSubscription
// );

router.route('/:id').delete(protect, cancelSubscription);

export default router;

import express from 'express';
import getLatestBundles from '../controllers/bundleController.js';

const router = express.Router();

router.get('/latest', getLatestBundles);

export default router;

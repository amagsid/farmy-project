import express from 'express';
import getBundles from '../controllers/bundlesControler.js';

const router = express.Router();

router.route('/').get(getBundles);

export default router;

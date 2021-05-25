import express from 'express';
import getFarms from '../controllers/farmController.js';

const router = express.Router();

router.route('/').get(getFarms);

export default router;

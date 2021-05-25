import asyncHandler from 'express-async-handler';
import Farm from '../models/farmModel.js';

// @desc    Fetch all farms
// @route   GET /api/farms
// @access  Public
const getFarms = asyncHandler(async (req, res) => {
  const farms = await Farm.find({});

  res.json(farms);
});

export default getFarms;

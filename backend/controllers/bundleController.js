import asyncHandler from 'express-async-handler';
import Bundle from '../models/bundleModel.js';

// @desc    Get latest bundles
// @route   GET /api/bundles/latest
// @access  Public
const getLatestBundles = asyncHandler(async (req, res) => {
  const bundles = await Bundle.find({}).sort({ createdAt: 'desc' }).limit(3);

  res.json(bundles);
});

export default getLatestBundles;

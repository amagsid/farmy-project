import asyncHandler from 'express-async-handler';

const Bundles = require('../models/bundleModel');

// @desc    Fetch all bundles
// @route   GET /api/bundles
// @access  Public
const getBundles = asyncHandler(async (req, res) => {
  const bundles = await Bundles.find();
  res.json({ bundles });
});

export default getBundles;

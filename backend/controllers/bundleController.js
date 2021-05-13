import asyncHandler from 'express-async-handler';
import Bundle from '../models/bundleModel.js';

// @desc    Fetch all bundles
// @route   GET /api/bundles
// @access  Public
const getBundles = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Bundle.countDocuments({ ...keyword });
  const bundles = await Bundle.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ bundles, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/bundles/:id
// @access  Public
const getBundleById = asyncHandler(async (req, res) => {
  const bundle = await Bundle.findById(req.params.id);

  if (bundle) {
    res.json(bundle);
  } else {
    res.status(404);
    throw new Error('Bundle not found');
  }
});

export { getBundles, getBundleById };

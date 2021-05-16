import asyncHandler from 'express-async-handler';
import Bundle from '../models/bundleModel.js';
import Ingredient from '../models/ingredientModel.js';

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

  const price = {
    price: {
      $gte: Number(req.query.minPrice) || 0,
      $lt: Number(req.query.maxPrice) || 99999999,
    },
  };

  const ratingQuery = Number(req.query.rating);
  const rating = ratingQuery
    ? {
        rating: {
          $gte: ratingQuery,
          $lt: ratingQuery + 1,
        },
      }
    : {};

  const category = req.query.category
    ? {
        category: req.query.category,
      }
    : {};

  const count = await Bundle.countDocuments({ ...keyword });
  const bundles = await Bundle.find({
 ...keyword, ...rating, ...price, ...category,
})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (req.query.sortBy === 'highestPrice') {
    bundles.sort((high, low) => low.price - high.price);
  } else if (req.query.sortBy === 'lowestPrice') {
    bundles.sort((high, low) => high.price - low.price);
  } else if (req.query.sortBy === 'rating') {
    bundles.sort((high, low) => low.rating - high.rating);
  } else if (req.query.sortBy === 'newest') {
    bundles.sort((newer, older) => older.createdAt - newer.createdAt);
  }

  res.json({ bundles, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single bundle
// @route   GET /api/bundles/:id
// @access  Public
const getBundleById = asyncHandler(async (req, res) => {
  const bundle = await Bundle.findById(req.params.id).populate({
    path: 'ingredients',
    model: Ingredient,
  });

  if (bundle) {
    res.json(bundle);
  } else {
    res.status(404);
    throw new Error('Bundle not found');
  }
});

export { getBundles, getBundleById };

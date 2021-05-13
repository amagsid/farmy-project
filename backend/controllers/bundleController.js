/* eslint-disable operator-linebreak */
import asyncHandler from 'express-async-handler';
import Bundle from '../models/bundleModel.js';

// @desc    Fetch all products
// @route   GET /api/products
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

// @desc    Fetch all products for new User
// @route   GET /api/products
// @access  Private
const getBundlesNewUser = asyncHandler(async (req, res) => {
  const bundles = await Bundle.find({});

  res.json(bundles);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getBundleById = asyncHandler(async (req, res) => {
  const bundle = await Bundle.findById(req.params.id);

  if (bundle) {
    res.json(bundle);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteBundle = asyncHandler(async (req, res) => {
  const bundle = await Bundle.findById(req.params.id);

  if (bundle) {
    await bundle.remove();
    res.json({ message: 'bundle removed' });
  } else {
    res.status(404);
    throw new Error('bundle not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createBundle = asyncHandler(async (req, res) => {
  const bundle = new Bundle({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdBundle = await bundle.save();
  res.status(201).json(createdBundle);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateBundle = asyncHandler(async (req, res) => {
  const {
 name, price, description, image, brand, category, countInStock,
} = req.body;

  const bundle = await Bundle.findById(req.params.id);

  if (bundle) {
    bundle.name = name;
    bundle.price = price;
    bundle.description = description;
    bundle.image = image;
    bundle.brand = brand;
    bundle.category = category;
    bundle.countInStock = countInStock;

    const updatedBundle = await bundle.save();
    res.json(updatedBundle);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createBundleReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const bundle = await Bundle.findById(req.params.id);

  if (bundle) {
    const alreadyReviewed = bundle.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('bundle already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    bundle.reviews.push(review);

    bundle.numReviews = bundle.reviews.length;

    bundle.rating =
      bundle.reviews.reduce((acc, item) => item.rating + acc, 0) / bundle.reviews.length;

    await bundle.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('bundle not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopBundle = asyncHandler(async (req, res) => {
  const bundles = await Bundle.find({}).sort({ rating: -1 }).limit(3);

  res.json(bundles);
});

export {
  getBundles,
  getBundleById,
  deleteBundle,
  createBundle,
  updateBundle,
  createBundleReview,
  getTopBundle,
  getBundlesNewUser,
};

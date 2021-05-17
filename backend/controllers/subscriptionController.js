import asyncHandler from 'express-async-handler';
import Subscription from '../models/subscriptionModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addSubscriptionItems = asyncHandler(async (req, res) => {
  const {
 bundles, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice,
} = req.body;

  if (bundles && bundles.length === 0) {
    res.status(400);
    throw new Error('No bundle items');
  } else {
    const subscription = new Subscription({
      bundles,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      // itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdSubscription = await subscription.save();

    res.status(201).json(createdSubscription);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getSubscriptionById = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findById(req.params.id).populate('user', 'name email');

  if (subscription) {
    res.json(subscription);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateSubscriptionToPaid = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);

  if (subscription) {
    subscription.isPaid = true;
    subscription.paidAt = Date.now();
    subscription.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedSubscription = await subscription.save();

    res.json(updatedSubscription);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateSubscriptionToDelivered = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);

  if (subscription) {
    subscription.isDelivered = true;
    subscription.deliveredAt = Date.now();

    const updatedSubscription = await subscription.save();

    res.json(updatedSubscription);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMySubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.find({ user: req.user._id });
  res.json(subscription);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.find({}).populate('user', 'id name');
  res.json(subscription);
});

// @desc    Update subscription
// @route   PUT /api/subscriptions/:id
// @access  Private
const updateSubscriptionById = asyncHandler(async (req, res) => {
  const {
 address, city, postalCode, country,
} = req.body;

  const subscription = await Subscription.findById(req.params.id);

  const { shippingAddress } = subscription;

  if (subscription) {
    shippingAddress.address = address;
    shippingAddress.city = city;
    shippingAddress.postalCode = postalCode;
    shippingAddress.country = country;

    const updatedSubscription = await subscription.save();
    res.json(updatedSubscription);
  } else {
    res.status(404);
    throw new Error('Subscription not found');
  }
});

// @desc    Cancel subscription
// @route   DELETE /api/subscriptions/:id
// @access  Private/
const cancelSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);

  if (subscription) {
    await subscription.remove();
    res.json({ message: 'Subscription canceled' });
  } else {
    res.status(404);
    throw new Error('Subscription not found');
  }
});

export {
  addSubscriptionItems,
  getSubscriptionById,
  updateSubscriptionToPaid,
  updateSubscriptionToDelivered,
  getMySubscription,
  getSubscription,
  updateSubscriptionById,
  cancelSubscription,
};

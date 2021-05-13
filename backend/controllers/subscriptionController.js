import asyncHandler from 'express-async-handler';
// import Product from '../models/productModel.js';

const subscriptionMockUpData = [
  {
    _id: 1,
    bundleName: 'Healthy',
    date: '01/05/2021',
    size: 2,
    qty: '/week',
    price: 20,
    preference: 'edit preferences',
    address: 'address',
  },
  {
    _id: 2,
    bundleName: 'weekend',
    date: '20/04/2021',
    size: 4,

    qty: '/week',
    price: 30,
    preference: 'edit preferences',
    address: 'address',
  },
  {
    _id: 3,
    bundleName: 'dinner',
    date: '01/03/2021',
    size: 5,
    qty: '/week',
    price: 40,
    preference: 'edit preferences',
    address: 'address',
  },
];

// @desc    Fetch all subscriptions
// @route   GET /api/subscriptions
// @access  private
const getMySubscriptions = asyncHandler(async (req, res) => {
  res.json(subscriptionMockUpData);

  // here we need to to populate the subscriptions with the model/data

  //   const subscriptions = await Order.find({ user: req.user._id });
  //   res.json(subscriptions);
});

// @desc    cancel a bundle
// @route   DELETE /api/subscriptions/:id
// @access  Private
const cancelSubscription = asyncHandler(async (req, res) => {
  // test for mockup

  const subscriptionsToKeep = subscriptionMockUpData.filter(
    (sub) => Number(req.params.id) !== sub._id,
  );

  if (subscriptionsToKeep) {
    res.json(subscriptionsToKeep);
  } else {
    res.status(404);
    throw new Error('Subscription not found');
  }

  //   if (subscription) {
  //     await subscriptionMockUpData.remove();
  //     res.json({ message: 'Subscription canceled' });
  //   } else {
  //     res.status(404);
  //     throw new Error('Subscription not found');
  //   }
});

export { getMySubscriptions, cancelSubscription };

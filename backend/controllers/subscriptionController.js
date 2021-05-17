/* eslint-disable no-undef */
import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
// import Subscription from '../models/subscriptionModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addSubscriptionItems = asyncHandler(async (req, res) => {
  const {
    subscriptionItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (subscriptionItems && subscriptionItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }
  const subscription = new Subscription({
    subscriptionItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdSubscription = await subscription.save();

  res.status(201).json(createdSubscription);
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

    // a transporter object
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // sends email to a specific user's email
    const info = await transporter.sendMail({
      from: `"Farmy" <${process.env.GMAIL_ACCOUNT}>`,
      to: `${req.user.email}`,
      subject: 'You are subscribed',
      html: `<h1>Hi, ${req.user.name}!</h1>
          <p>You have subscribed to the bundle of ${updatedSubscription.subscriptionItems[0].name}!
          <br>
          You will receive your bundle ${updatedSubscription.subscriptionItems[0].orderFrq} ${
        updatedSubscription.subscriptionItems[0].orderFrq === 1 ? 'time' : 'times'
      } per ${updatedSubscription.subscriptionItems[0].orderPer}.
          The subscription has been paid by ${updatedSubscription.paymentMethod} payment method.</p>
          <small>If you want to unsubscribe from a product, you can do it on your profile page. 
          Login to your account. 
          Go to your profile page.
          Choose the product that you want to unsubscribe from and click on the Unsubscribe button.</small>`,
    });
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

export {
  addSubscriptionItems,
  getSubscriptionById,
  updateSubscriptionToPaid,
  updateSubscriptionToDelivered,
  getMySubscription,
  getSubscription,
};

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import { createRequire } from 'module'; // Bring in the ability to create the 'require' method
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
import Bundle from './models/bundleModel.js';

const require = createRequire(import.meta.url); // construct the require method
const bundles = require('./data/bundles.json'); // use the require

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Bundle.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({ ...product, user: adminUser }));
    const sampleBundles = bundles.map((bundle) => ({ ...bundle, user: adminUser })); // Later I'll Add Ingredient Ref

    await Product.insertMany(sampleProducts);
    await Bundle.insertMany(sampleBundles);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Bundle.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

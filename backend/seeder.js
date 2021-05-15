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
import Ingredient from './models/ingredientModel.js';
import Subscription from './models/subscriptionModel.js';

const require = createRequire(import.meta.url); // construct the require method
const bundles = require('./data/bundles.json'); // use the require
const firstIngredients = require('./data/ingredientsFirstBundle.json'); // use the require
const secondIngredients = require('./data/ingredientsSecondBundle.json'); // use the require
const thirdIngredients = require('./data/ingredientsThirdBundle.json'); // use the require

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Bundle.deleteMany();
    await Ingredient.deleteMany();
    await Subscription.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({ ...product, user: adminUser }));
    const sampleBundles = bundles.map((bundle) => ({
      ...bundle,
      createdByUser: adminUser,
      // ingredients: [...ingredients, firstIngredientId[index]._id],
    })); // Later I'll Add Ingredients Ref

    const bundleId = await Bundle.insertMany(sampleBundles);
    const firstBundle = bundleId[0]._id;
    const secondBundle = bundleId[1]._id;
    const thirdBundle = bundleId[2]._id;

    const firstIngredient = firstIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: firstBundle,
    }));
    const secondIngredient = secondIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: secondBundle,
    }));
    const thirdIngredient = thirdIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: thirdBundle,
    }));

    await Product.insertMany(sampleProducts);

    const firstIngredientId = await Ingredient.insertMany(firstIngredient);
    const secondIngredientId = await Ingredient.insertMany(secondIngredient);
    const thirdIngredientId = await Ingredient.insertMany(thirdIngredient);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Bundle.deleteMany();
    await Ingredient.deleteMany();
    await Subscription.deleteMany();

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

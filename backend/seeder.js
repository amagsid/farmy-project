import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import ingredients from './data/ingredients.js';
import bundles from './data/bundles.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Bundle from './models/bundleModel.js';
import Ingredient from './models/ingredientModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Bundle.deleteMany();
    await Ingredient.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({ ...product, user: adminUser }));
    const sampleIngredients = ingredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
    }));

    const bundleIngredients = await Ingredient.insertMany(sampleIngredients);

    const sampleBundles = bundles.map((bundle) => ({
      ...bundle,
      createdByUser: adminUser,
      ingredient: bundleIngredients,
    }));

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

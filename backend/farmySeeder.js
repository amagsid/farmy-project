import dotenv from 'dotenv';
import colors from 'colors';
import mongoose from 'mongoose';
import { createRequire } from 'module'; // Bring in the ability to create the 'require' method
import connectDB from './config/db.js';

import Farm from './models/farmModel.js';
import User from './models/userModel.js';
import Bundle from './models/bundleModel.js';
import Ingredient from './models/ingredientModel.js';
import Subscription from './models/subscriptionModel.js';

import users from './data/users.js';
import bundles from './data/bundles.js';
import soupIngredients from './data/soupIngredients.js';
import fridayIngredients from './data/fridayIngredients.js';
import veggiesIngredients from './data/veggiesIngredients.js';
import berriesIngredients from './data/berriesIngredients.js';
import chefsTableIngredients from './data/chefsTableIngredients.js';
import vitaminBoostIngredients from './data/vitaminBoostIngredients.js';

const require = createRequire(import.meta.url); // construct the require method
const farms = require('./data/farms.json');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Farm.deleteMany();
    await User.deleteMany();
    await Bundle.deleteMany();
    await Ingredient.deleteMany();
    await Subscription.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleBundles = bundles.map((bundle) => ({
      ...bundle,
      createdByUser: adminUser,
    }));

    const sampleFarms = farms.map((farm) => ({
      ...farm,
    }));
    const farmInfo = await Farm.insertMany(sampleFarms);

    const bundleId = await Bundle.insertMany(sampleBundles);
    const vitaminBoostBundle = bundleId[0]._id;
    const chefsTableBundle = bundleId[1]._id;
    const fridayBundle = bundleId[2]._id;
    const berriesBundle = bundleId[3]._id;
    const veggiesBundle = bundleId[4]._id;
    const soupBundle = bundleId[5]._id;

    // VITAMIN BOOST BUNDLE
    const vitaminBoostBundleIngredients = vitaminBoostIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: vitaminBoostBundle,
    }));
    const vitaminBoostInsert = await Ingredient.insertMany(vitaminBoostBundleIngredients);

    await Bundle.updateOne(
      { _id: vitaminBoostBundle },
      {
        $set: {
          ingredients: [...vitaminBoostInsert],
        },
      },
      { upsert: true },
    );

    // CHEFS TABLE BUNDLE
    const chefsTableBundleIngredients = chefsTableIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: chefsTableBundle,
    }));
    const chefsTableInsert = await Ingredient.insertMany(chefsTableBundleIngredients);
    await Bundle.updateOne(
      { _id: chefsTableBundle },
      {
        $set: {
          ingredients: [...chefsTableInsert],
        },
      },
      { upsert: true },
    );

    // ITS FRIDAY BUNDLE
    const fridayBundleIngredients = fridayIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: fridayBundle,
    }));
    const fridayBundleInsert = await Ingredient.insertMany(fridayBundleIngredients);
    await Bundle.updateOne(
      { _id: fridayBundle },
      {
        $set: {
          ingredients: [...fridayBundleInsert],
        },
      },
      { upsert: true },
    );

    // BERRIES BUNDLE
    const berriesBundleIngredients = berriesIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: berriesBundle,
    }));
    const berriesBundleInsert = await Ingredient.insertMany(berriesBundleIngredients);
    await Bundle.updateOne(
      { _id: berriesBundle },
      {
        $set: {
          ingredients: [...berriesBundleInsert],
        },
      },
      { upsert: true },
    );

    // VEGGIES BUNDLE
    const veggiesBundleIngredients = veggiesIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: veggiesBundle,
    }));
    const veggiesBundleInsert = await Ingredient.insertMany(veggiesBundleIngredients);
    await Bundle.updateOne(
      { _id: veggiesBundle },
      {
        $set: {
          ingredients: [...veggiesBundleInsert],
        },
      },
      { upsert: true },
    );

    // SOUP BUNDLE
    const soupBundleIngredients = soupIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: soupBundle,
    }));
    const soupBundleInsert = await Ingredient.insertMany(soupBundleIngredients);
    await Bundle.updateOne(
      { _id: soupBundle },
      {
        $set: {
          ingredients: [...soupBundleInsert],
        },
      },
      { upsert: true },
    );

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Farm.deleteMany();
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

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import { createRequire } from 'module'; // Bring in the ability to create the 'require' method
import users from './data/users.js';
import User from './models/userModel.js';
import Ingredient from './models/ingredientModel.js';
import connectDB from './config/db.js';
import Bundle from './models/bundleModel.js';
import Subscription from './models/subscriptionModel.js';
import Farm from './models/farmModel.js';
import bundles from './data/bundles.js';
import berriesIngredients from './data/berriesIngredients.js';
import chefsTableIngredients from './data/chefsTableIngredients.js';
import veggiesIngredients from './data/veggiesIngredients.js';
import soupIngredients from './data/soupIngredients.js';
import fridayIngredients from './data/fridayIngredients.js';
import vitaminBoostIngredients from './data/vitaminBoostIngredients.js';

const require = createRequire(import.meta.url); // construct the require method
// const bundles = require('./data/bundles.json'); // use the require
const firstIngredients = require('./data/ingredientsFirstBundle.json'); // use the require
const secondIngredients = require('./data/ingredientsSecondBundle.json'); // use the require
const thirdIngredients = require('./data/ingredientsThirdBundle.json'); // use the require
const farms = require('./data/farms.json');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Subscription.deleteMany();
    await Bundle.deleteMany();
    await User.deleteMany();
    await Ingredient.deleteMany();
    await Farm.deleteMany();

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

    // DATA FOR SCRAPPING
    // const firstBundle = bundleId[0]._id;
    // const secondBundle = bundleId[1]._id;
    // const thirdBundle = bundleId[2]._id;
    // const firstIngredient = firstIngredients.map((ingredient) => ({
    //   ...ingredient,
    //   createdByUser: adminUser,
    //   bundles: firstBundle,
    // }));
    // const secondIngredient = secondIngredients.map((ingredient) => ({
    //   ...ingredient,
    //   createdByUser: adminUser,
    //   bundles: secondBundle,
    // }));
    // const thirdIngredient = thirdIngredients.map((ingredient) => ({
    //   ...ingredient,
    //   createdByUser: adminUser,
    //   bundles: thirdBundle,
    // }));

    // const firstIngredientId = await Ingredient.insertMany(firstIngredient);
    // const secondIngredientId = await Ingredient.insertMany(secondIngredient);
    // const thirdIngredientId = await Ingredient.insertMany(thirdIngredient);

    // const firstIngredientIds = firstIngredientId.map((item) => item._id);
    // const secondIngredientIds = secondIngredientId.map((item) => item._id);
    // const thirdIngredientIds = thirdIngredientId.map((item) => item._id);

    // await Bundle.updateOne(
    //   { _id: firstBundle },
    //   {
    //     $set: {
    //       ingredients: [...firstIngredientIds],
    //     },
    //   },
    //   { upsert: true }
    // );
    // await Bundle.updateOne(
    //   { _id: secondBundle },
    //   {
    //     $set: {
    //       ingredients: [...secondIngredientIds],
    //     },
    //   },
    //   { upsert: true }
    // );
    // await Bundle.updateOne(
    //   { _id: thirdBundle },
    //   {
    //     $set: {
    //       ingredients: [...thirdIngredientIds],
    //     },
    //   },
    //   { upsert: true }
    // );
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Bundle.deleteMany();
    await Subscription.deleteMany();
    await Farm.deleteMany();

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

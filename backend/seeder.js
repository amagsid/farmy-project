import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import { createRequire } from 'module'; // Bring in the ability to create the 'require' method
import users from './data/users.js';
import User from './models/userModel.js';
// import Product from './models/productModel.js';
import Ingredient from './models/ingredientModel.js';
import connectDB from './config/db.js';
import Bundle from './models/bundleModel.js';
import Subscription from './models/subscriptionModel.js';
import Farm from './models/farmModel.js';

const require = createRequire(import.meta.url); // construct the require method
const bundles = require('./data/bundles.json'); // use the require
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

    const bundleId = await Bundle.insertMany(sampleBundles);
    const firstBundle = bundleId[0]._id;
    const secondBundle = bundleId[1]._id;
    const thirdBundle = bundleId[2]._id;

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

    const farmInfo = await Farm.insertMany(sampleFarms);

    const firstFarmId = farmInfo[0]._id;
    const secondFarmId = farmInfo[1]._id;
    const thirdFarmId = farmInfo[2]._id;
    const fourthFarmId = farmInfo[3]._id;
    const fifthFarmId = farmInfo[4]._id;
    const sixthFarmId = farmInfo[5]._id;

    const firstIngredient = firstIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: firstBundle,
      farms: [firstFarmId, secondFarmId],
    }));
    const secondIngredient = secondIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: secondBundle,
      farms: [thirdFarmId, fourthFarmId],
    }));
    const thirdIngredient = thirdIngredients.map((ingredient) => ({
      ...ingredient,
      createdByUser: adminUser,
      bundles: thirdBundle,
      farms: [fifthFarmId, sixthFarmId],
    }));

    const firstIngredientId = await Ingredient.insertMany(firstIngredient);
    const secondIngredientId = await Ingredient.insertMany(secondIngredient);
    const thirdIngredientId = await Ingredient.insertMany(thirdIngredient);

    const firstIngredientIds = firstIngredientId.map((item) => item._id);
    const secondIngredientIds = secondIngredientId.map((item) => item._id);
    const thirdIngredientIds = thirdIngredientId.map((item) => item._id);

    await Bundle.updateOne(
      { _id: firstBundle },
      {
        $set: {
          ingredients: [...firstIngredientIds],
        },
      },
      { upsert: true },
    );
    await Bundle.updateOne(
      { _id: secondBundle },
      {
        $set: {
          ingredients: [...secondIngredientIds],
        },
      },
      { upsert: true },
    );
    await Bundle.updateOne(
      { _id: thirdBundle },
      {
        $set: {
          ingredients: [...thirdIngredientIds],
        },
      },
      { upsert: true },
    );

    await Farm.updateOne(
      { _id: firstFarmId },
      {
        $set: {
          ingredients: [...firstIngredientIds],
        },
      },
      { upsert: true },
    );

    await Farm.updateOne(
      { _id: secondFarmId },
      {
        $set: {
          ingredients: [...firstIngredientIds],
        },
      },
      { upsert: true },
    );

    await Farm.updateOne(
      { _id: thirdFarmId },
      {
        $set: {
          ingredients: [...secondIngredientIds],
        },
      },
      { upsert: true },
    );

    await Farm.updateOne(
      { _id: fourthFarmId },
      {
        $set: {
          ingredients: [...secondIngredientIds],
        },
      },
      { upsert: true },
    );

    await Farm.updateOne(
      { _id: fifthFarmId },
      {
        $set: {
          ingredients: [...thirdIngredientIds],
        },
      },
      { upsert: true },
    );

    await Farm.updateOne(
      { _id: sixthFarmId },
      {
        $set: {
          ingredients: [...thirdIngredientIds],
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
    await User.deleteMany();
    await Bundle.deleteMany();
    await Subscription.deleteMany();
    await Farm.deleteMany();
    await Ingredient.deleteMany();

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

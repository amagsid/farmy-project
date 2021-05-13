import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';
import Bundle from './models/bundleModel.js';
import Subscription from './models/subscriptionModel.js';
import bundles from './data/bundles.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Subscription.deleteMany();
    await Bundle.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleBundles = bundles.map((bundle) => ({ ...bundle, createdByUser: adminUser })); // Later I'll Add Ingredient Ref

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
    await Subscription.deleteMany();
    await Bundle.deleteMany();
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

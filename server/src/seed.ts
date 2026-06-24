import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

const MONGO_URI = (process.env.MONGO_URI || '')
  .trim()
  .replace(/[^\x20-\x7E]/g, '');

// غيّر القيم دي قبل التشغيل
const USERNAME = 'khaledfawzi';
const PASSWORD = 'ChangeThisPassword123'; // غيّرها لباسورد قوي

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    const existingUser = await User.findOne({ username: USERNAME });
    if (existingUser) {
      console.log('⚠️  User already exists. Skipping creation.');
      process.exit(0);
    }

    const user = new User({
      username: USERNAME,
      password: PASSWORD, // هيتشفر تلقائياً بسبب pre('save') hook
    });

    await user.save();
    console.log('✅ Admin user created successfully!');
    console.log(`Username: ${USERNAME}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
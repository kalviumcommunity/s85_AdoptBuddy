const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' }); // Load .env from config folder

const dbURL = process.env.DB_URL; // Fetch DB_URL from .env

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;

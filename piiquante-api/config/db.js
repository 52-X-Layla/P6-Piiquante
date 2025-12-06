const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  console.log('DEBUG MONGO_URI =', uri);
  
  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;

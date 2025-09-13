import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Only throw error if we're trying to actually connect (not during build)
async function dbConnect() {
  try {
    // If no MongoDB URI is provided, return early (useful for build time)
    if (!MONGODB_URI) {
      console.warn('MONGODB_URI not provided - database operations will be skipped');
      return null;
    }

    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    return await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default dbConnect;

import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
  mongoose.set('strictQuery', true);

  try {
    if (mongoose.connection.readyState === 1) {
      console.log(`MongoDB connected: ${mongoose.connection.name}`);
      return true;
    }

    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
    return true;
  } catch (error) {
    const message = error?.message || 'Unknown database connection error';
    console.error(`MongoDB connection failed: ${message}`);

    try {
      await mongoose.disconnect();
    } catch {
      // ignore disconnect errors while clearing stale connection state
    }

    throw new Error(`Unable to connect to MongoDB. Check MONGODB_URI, Atlas network access, and database credentials. ${message}`, { cause: error });
  }
}
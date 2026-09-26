import mongoose from 'mongoose';
import { env } from './env.js';

let connectionPromise;

export async function connectDatabase() {
  mongoose.set('strictQuery', true);

  if (mongoose.connection.readyState === 1) return true;
  if (connectionPromise) return connectionPromise;

  connectionPromise = mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      console.log(`MongoDB connected: ${mongoose.connection.name}`);
      return true;
    })
    .catch(async (error) => {
      connectionPromise = undefined;
      const message = error?.message || 'Unknown database connection error';
      console.error(`MongoDB connection failed: ${message}`);

      try {
        await mongoose.disconnect();
      } catch {
        // ignore disconnect errors while clearing stale connection state
      }

      throw new Error(`Unable to connect to MongoDB. Check MONGODB_URI, Atlas network access, and database credentials. ${message}`, { cause: error });
    });

  try {
    return await connectionPromise;
  } finally {
    if (mongoose.connection.readyState === 1) connectionPromise = undefined;
  }
}
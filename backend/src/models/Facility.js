import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, name: String, location: String, overallScore: Number,
  hygieneStatus: String, lastDisinfected: String, nextCycle: String, uvcStatus: String, odorPpm: Number,
  waterTankPercent: Number, soapDispenserPercent: Number, touchlessFixturesActive: Boolean, footfallToday: Number, userRating: Number
}, { timestamps: true });

export default mongoose.model('Facility', facilitySchema);
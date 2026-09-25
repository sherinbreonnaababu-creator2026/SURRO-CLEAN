import mongoose from 'mongoose';

const binSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, location: String, zone: String, fillLevel: Number,
  type: String, status: String, weightKg: Number, gasPpm: Number, tempC: Number, battery: Number,
  lastEmptied: String, lidStatus: String, compactorActive: Boolean, lat: Number, lng: Number
}, { timestamps: true });

export default mongoose.model('Bin', binSchema);
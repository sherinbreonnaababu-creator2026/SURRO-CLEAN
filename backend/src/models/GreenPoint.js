import mongoose from 'mongoose';

const greenPointSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  reason: { type: String, required: true },
  report: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' }
}, { timestamps: true });

export default mongoose.model('GreenPoint', greenPointSchema);
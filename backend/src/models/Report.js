import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  citizenName: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  severity: { type: String, enum: ['Critical (Hazardous)', 'Critical', 'High', 'Medium', 'Low'], default: 'Medium' },
  status: { type: String, enum: ['Reported', 'Dispatched', 'In Progress', 'Resolved', 'Rejected'], default: 'Reported' },
  assignedTeam: String,
  image: String,
  upvotes: { type: Number, default: 0 },
  ecoRewardAllocated: { type: Number, default: 50 },
  timeline: [{ status: String, time: String, done: Boolean }]
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);
import mongoose from 'mongoose';

const cleaningTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  taskType: { type: String, enum: ['REPORT', 'BIN_COLLECTION', 'SANITIZATION'], default: 'REPORT' },
  report: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTeam: String,
  priority: { type: String, enum: ['Critical', 'High', 'Medium', 'Low'], default: 'Medium' },
  status: { type: String, enum: ['ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], default: 'ASSIGNED' },
  notes: String,
  completedAt: Date
}, { timestamps: true });

export default mongoose.model('CleaningTask', cleaningTaskSchema);
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  emailOnlyDemo: { type: Boolean, default: false },
  role: { type: String, enum: ['STUDENT', 'ADMIN', 'CLEANING_STAFF'], default: 'STUDENT' },
  phone: String,
  ward: String,
  greenPoints: { type: Number, default: 0 },
  streakDays: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true, toJSON: { transform: (_, value) => { delete value.password; return value; } } });

export default mongoose.model('User', userSchema);
import User from '../models/User.js';
import GreenPoint from '../models/GreenPoint.js';

export async function listUsers(req, res) {
  res.json({ users: await User.find().sort({ createdAt: -1 }) });
}

export async function leaderboard(req, res) {
  const users = await User.find({ role: 'STUDENT' }).sort({ greenPoints: -1 }).limit(20).select('name greenPoints streakDays ward');
  res.json({ leaderboard: users.map((user, index) => ({ rank: index + 1, ...user.toObject() })) });
}

export async function myPoints(req, res) {
  const transactions = await GreenPoint.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ points: req.user.greenPoints, streakDays: req.user.streakDays, transactions });
}
import Report from '../models/Report.js';
import GreenPoint from '../models/GreenPoint.js';
import User from '../models/User.js';

const defaultTimeline = () => [
  { status: 'Reported with Geo-Tag', time: 'Just now', done: true },
  { status: 'AI Severity Verified', time: 'Just now', done: true },
  { status: 'Crew Assigned & Dispatched', time: 'Pending', done: false },
  { status: 'Sanitized & Verified Resolution', time: 'Pending', done: false }
];

export async function listReports(req, res) {
  const filter = req.user?.role === 'STUDENT' ? { reporter: req.user._id } : {};
  res.json({ reports: await Report.find(filter).sort({ createdAt: -1 }).populate('reporter', 'name email') });
}

export async function createReport(req, res) {
  const reward = 50;
  const report = await Report.create({ ...req.body, reporter: req.user._id, citizenName: req.user.name, ecoRewardAllocated: reward, timeline: defaultTimeline(), status: 'Dispatched' });
  await User.findByIdAndUpdate(req.user._id, { $inc: { greenPoints: reward } });
  await GreenPoint.create({ user: req.user._id, points: reward, reason: 'Sanitation report submitted', report: report._id });
  res.status(201).json({ report, pointsAwarded: reward });
}

export async function updateReport(req, res) {
  const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!report) return res.status(404).json({ message: 'Report not found' });
  res.json({ report });
}

export async function upvoteReport(req, res) {
  const report = await Report.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true });
  if (!report) return res.status(404).json({ message: 'Report not found' });
  res.json({ report });
}
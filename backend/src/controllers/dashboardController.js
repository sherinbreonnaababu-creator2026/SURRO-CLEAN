import Bin from '../models/Bin.js';
import Facility from '../models/Facility.js';
import Report from '../models/Report.js';
import CleaningTask from '../models/CleaningTask.js';
import User from '../models/User.js';
import { fleet } from '../data/operationalData.js';

export async function overview(req, res) {
  const [bins, facilities, grievances, tasks, users] = await Promise.all([
    Bin.find().lean(), Facility.find().lean(), Report.find().sort({ createdAt: -1 }).limit(50).lean(),
    CleaningTask.find().populate('assignedTo', 'name email').lean(), User.countDocuments()
  ]);
  const criticalBins = bins.filter((bin) => bin.status === 'Critical' || bin.fillLevel > 85).length;
  res.json({ bins, facilities, grievances, tasks, trucks: fleet, stats: { users, bins: bins.length, criticalBins, activeTasks: tasks.filter((task) => task.status !== 'COMPLETED').length, reports: grievances.length } });
}

export async function analytics(req, res) {
  const [reportsByStatus, reportsByCategory] = await Promise.all([
    Report.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Report.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }])
  ]);
  res.json({ reportsByStatus, reportsByCategory });
}
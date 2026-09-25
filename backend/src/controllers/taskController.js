import CleaningTask from '../models/CleaningTask.js';
import Report from '../models/Report.js';

export async function listTasks(req, res) {
  const filter = req.user.role === 'CLEANING_STAFF' ? { assignedTo: req.user._id } : {};
  res.json({ tasks: await CleaningTask.find(filter).populate('assignedTo', 'name email').populate('report') });
}

export async function createTask(req, res) {
  const task = await CleaningTask.create(req.body);
  if (task.report) await Report.findByIdAndUpdate(task.report, { status: 'Dispatched', assignedTeam: task.assignedTeam });
  res.status(201).json({ task });
}

export async function updateTask(req, res) {
  const changes = { ...req.body };
  if (changes.status === 'COMPLETED') changes.completedAt = new Date();
  const task = await CleaningTask.findByIdAndUpdate(req.params.id, changes, { new: true, runValidators: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.report && changes.status === 'COMPLETED') await Report.findByIdAndUpdate(task.report, { status: 'Resolved' });
  res.json({ task });
}
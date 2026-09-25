import React, { useEffect, useState } from 'react';
import { ClipboardList, Plus, RefreshCw, CheckCircle2, Clock3 } from 'lucide-react';
import { createTask, getTasks, getUsers, updateTask } from '../lib/api';

const EMPTY_FORM = {
  title: '',
  location: '',
  taskType: 'REPORT',
  priority: 'Medium',
  assignedTeam: '',
  assignedTo: ''
};

export default function TaskOperations({ user, tasks, setTasks, onNotification }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [staffUsers, setStaffUsers] = useState([]);
  const [error, setError] = useState('');
  const isAdmin = user.role === 'ADMIN';

  async function refreshTasks() {
    setIsLoading(true);
    setError('');
    try {
      const result = await getTasks(user.role);
      setTasks(result.tasks || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshTasks();
    if (isAdmin) getUsers().then(({ users }) => setStaffUsers((users || []).filter((candidate) => candidate.role === 'CLEANING_STAFF'))).catch(() => {});
  }, [user.role]);

  async function handleCreate(event) {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      const payload = { ...form };
      if (!payload.assignedTo) delete payload.assignedTo;
      const result = await createTask(payload);
      setTasks((currentTasks) => [result.task, ...currentTasks]);
      setForm(EMPTY_FORM);
      onNotification?.('Task created in the municipal operations queue.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleStatusChange(task, status) {
    setError('');
    try {
      const result = await updateTask(task._id, { status });
      setTasks((currentTasks) => currentTasks.map((item) => item._id === task._id ? result.task : item));
      onNotification?.(`Task marked ${status.toLowerCase().replace('_', ' ')}.`);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 mb-2">
            <ClipboardList className="w-3.5 h-3.5" /> Protected Operations Queue
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Cleaning Task Operations</h2>
          <p className="text-xs sm:text-sm text-slate-400">Live assignments from the SurroClean database.</p>
        </div>
        <button onClick={refreshTasks} disabled={isLoading} className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 disabled:opacity-50">
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {error && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">{error}</p>}

      {isAdmin && (
        <form onSubmit={handleCreate} className="glass-panel p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Task title" className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2.5 text-xs text-white" />
          <input required value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Location" className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2.5 text-xs text-white" />
          <select value={form.taskType} onChange={(event) => setForm({ ...form, taskType: event.target.value })} className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2.5 text-xs text-white">
            <option value="REPORT">Report response</option>
            <option value="BIN_COLLECTION">Bin collection</option>
            <option value="SANITIZATION">Sanitization</option>
          </select>
          <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2.5 text-xs text-white">
            <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
          </select>
          <select value={form.assignedTo} onChange={(event) => setForm({ ...form, assignedTo: event.target.value })} className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2.5 text-xs text-white">
            <option value="">Unassigned</option>
            {staffUsers.map((staff) => <option key={staff._id} value={staff._id}>{staff.name}</option>)}
          </select>
          <button disabled={isSaving} className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50">
            <Plus className="w-4 h-4" /> {isSaving ? 'Creating...' : 'Create Task'}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {tasks.length === 0 && <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center text-sm text-slate-400">No tasks are currently assigned.</div>}
        {tasks.map((task) => (
          <article key={task._id} className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-white">{task.title}</h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300">{task.priority}</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-[10px] text-cyan-300">{task.taskType}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{task.location}</p>
              {task.assignedTo?.name && <p className="text-[11px] text-slate-500 mt-1">Assigned to {task.assignedTo.name}</p>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1"><Clock3 className="w-3.5 h-3.5" /> {task.status}</span>
              {task.status !== 'IN_PROGRESS' && task.status !== 'COMPLETED' && (
                <button onClick={() => handleStatusChange(task, 'IN_PROGRESS')} className="px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-bold">Start</button>
              )}
              {task.status !== 'COMPLETED' && (
                <button onClick={() => handleStatusChange(task, 'COMPLETED')} className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Complete</button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

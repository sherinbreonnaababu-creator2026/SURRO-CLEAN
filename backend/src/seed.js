import bcrypt from 'bcrypt';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import User from './models/User.js';
import Report from './models/Report.js';
import Bin from './models/Bin.js';
import Facility from './models/Facility.js';
import CleaningTask from './models/CleaningTask.js';
import { INITIAL_BINS, CITIZEN_GRIEVANCES, SANITATION_FACILITIES } from '../../src/data/mockData.js';

const timeline = (resolved = false) => [
  { status: 'Reported with Geo-Tag', time: '10:15 AM', done: true },
  { status: 'AI Severity Verified', time: '10:18 AM', done: true },
  { status: 'Crew Assigned & Dispatched', time: '10:24 AM', done: resolved },
  { status: 'Sanitized & Verified Resolution', time: resolved ? '11:00 AM' : 'Pending', done: resolved }
];

async function seed() {
  await connectDatabase();
  const password = await bcrypt.hash(env.adminPassword, 12);
  const admin = await User.findOneAndUpdate(
    { email: env.adminEmail },
    { name: 'SurroClean Administrator', email: env.adminEmail, password, role: 'ADMIN', greenPoints: 0 },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  await User.findOneAndUpdate(
    { email: 'staff@surroclean.local' },
    { name: 'Cleaning Staff Demo', email: 'staff@surroclean.local', password: await bcrypt.hash(env.staffPassword, 12), role: 'CLEANING_STAFF' },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  await User.findOneAndUpdate(
    { email: 'student@surroclean.local' },
    { name: 'Student Demo', email: 'student@surroclean.local', password: await bcrypt.hash(env.studentPassword, 12), role: 'STUDENT', greenPoints: 1420, streakDays: 18 },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  for (const bin of INITIAL_BINS) await Bin.findOneAndUpdate({ id: bin.id }, bin, { upsert: true, new: true, setDefaultsOnInsert: true });
  for (const facility of SANITATION_FACILITIES) await Facility.findOneAndUpdate({ id: facility.id }, facility, { upsert: true, new: true, setDefaultsOnInsert: true });
  await Report.deleteMany({ reporter: { $exists: false } });
  for (const item of CITIZEN_GRIEVANCES) await Report.findOneAndUpdate({ title: item.title }, { ...item, timeline: timeline(item.status === 'Resolved'), reporter: undefined }, { upsert: true, new: true, setDefaultsOnInsert: true });
  await CleaningTask.findOneAndUpdate({ title: 'Rapid sanitation response: Community Park' }, { title: 'Rapid sanitation response: Community Park', location: 'Lane 4, Green Avenue, Sector 12', priority: 'High', status: 'ASSIGNED', assignedTeam: 'Rapid Sanitation Crew #4' }, { upsert: true, new: true, setDefaultsOnInsert: true });
  console.log(`Seed complete. Admin login: ${admin.email} / ${env.adminPassword}`);
  process.exit(0);
}

seed().catch((error) => { console.error(error); process.exit(1); });
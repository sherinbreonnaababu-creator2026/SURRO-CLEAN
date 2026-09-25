import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BellRing,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';

const DEPENDENT_SUPPORT_QUEUE = [
  {
    id: 'D-204',
    name: 'Aarav Sharma',
    age: 72,
    ward: 'Ward 12',
    lastCheckIn: '12 mins ago',
    nextVisit: 'Today · 4:30 PM',
    need: 'Mobility + Medication Support',
    severity: 'High Risk',
    status: 'Follow-up pending',
    healthScore: 81,
    caregiver: 'Priya Nair',
    location: 'Sector 12, Old City',
    goals: ['Morning medicine reminder', 'Wheelchair pickup coordination', 'Family health call'],
  },
  {
    id: 'D-118',
    name: 'Meera Iyer',
    age: 61,
    ward: 'Ward 9',
    lastCheckIn: '35 mins ago',
    nextVisit: 'Tomorrow · 9:00 AM',
    need: 'Post-surgery recovery',
    severity: 'Moderate',
    status: 'Monitoring active',
    healthScore: 88,
    caregiver: 'Mohit Singh',
    location: 'Green Park Apartments',
    goals: ['Vitals review', 'Diet chart follow-up', 'Daily wound care check'],
  },
  {
    id: 'D-463',
    name: 'Rohan Verma',
    age: 48,
    ward: 'Ward 4',
    lastCheckIn: '1 hour ago',
    nextVisit: 'Today · 7:15 PM',
    need: 'Mental wellness & mobility',
    severity: 'Low Risk',
    status: 'Stable',
    healthScore: 93,
    caregiver: 'Anita Dutta',
    location: 'Nagar Colony',
    goals: ['Therapy check-in', 'Transport assistance', 'Family support call'],
  },
  {
    id: 'D-507',
    name: 'Sonia Patel',
    age: 27,
    ward: 'Ward 3',
    lastCheckIn: '2 hours ago',
    nextVisit: 'Friday · 11:30 AM',
    need: 'Prenatal care coordination',
    severity: 'Moderate',
    status: 'Schedule approved',
    healthScore: 90,
    caregiver: 'Dr. Kavya Rao',
    location: 'Sanjay Vihar',
    goals: ['Consultation booking', 'Nutrition plan', 'Community support referral'],
  },
];

const getRiskClasses = (severity) => {
  if (severity === 'High Risk') return 'bg-rose-500/15 text-rose-300 border border-rose-500/30';
  if (severity === 'Moderate') return 'bg-amber-500/15 text-amber-300 border border-amber-500/30';
  return 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30';
};

export default function DependentSupport() {
  const [selectedId, setSelectedId] = useState(DEPENDENT_SUPPORT_QUEUE[0].id);

  const selectedDependent = useMemo(
    () => DEPENDENT_SUPPORT_QUEUE.find((person) => person.id === selectedId) ?? DEPENDENT_SUPPORT_QUEUE[0],
    [selectedId]
  );

  const highRiskCount = DEPENDENT_SUPPORT_QUEUE.filter((person) => person.severity === 'High Risk').length;
  const activePlans = DEPENDENT_SUPPORT_QUEUE.length;
  const visitsDue = DEPENDENT_SUPPORT_QUEUE.filter((person) => person.status !== 'Stable').length;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-pink-500/25 bg-gradient-to-r from-slate-900 via-pink-950/30 to-slate-900 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pink-500/15 text-pink-300 border border-pink-500/30">
              <HeartPulse className="w-3.5 h-3.5" /> Inclusive Support Network
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dependent Care & Family Assistance
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Monitor vulnerable residents, route care visits, and coordinate follow-ups across wards without compromising the city’s live operational dashboard.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full max-w-md">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-pink-500/25 text-center">
              <div className="flex items-center justify-center gap-1 text-[10px] uppercase text-slate-400 font-bold">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Risk
              </div>
              <p className="mt-2 text-xl font-extrabold text-rose-300 font-mono">{highRiskCount}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/25 text-center">
              <div className="flex items-center justify-center gap-1 text-[10px] uppercase text-slate-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Active
              </div>
              <p className="mt-2 text-xl font-extrabold text-cyan-300 font-mono">{activePlans}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/25 text-center">
              <div className="flex items-center justify-center gap-1 text-[10px] uppercase text-slate-400 font-bold">
                <BellRing className="w-3.5 h-3.5 text-amber-400" /> Due
              </div>
              <p className="mt-2 text-xl font-extrabold text-amber-300 font-mono">{visitsDue}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-6">
        <div className="space-y-4">
          {DEPENDENT_SUPPORT_QUEUE.map((person) => (
            <button
              key={person.id}
              onClick={() => setSelectedId(person.id)}
              className={`w-full text-left rounded-2xl border p-4 transition-all ${
                selectedDependent.id === person.id
                  ? 'border-pink-500/50 bg-pink-500/10 shadow-lg shadow-pink-500/10'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500/20 to-cyan-500/20 border border-pink-500/30 flex items-center justify-center text-pink-200">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-white">{person.name}</h3>
                      <span className="text-[10px] uppercase tracking-wide text-slate-400">{person.id}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-400 flex flex-wrap items-center gap-3">
                      <span>{person.age} yrs</span>
                      <span>{person.ward}</span>
                      <span>{person.lastCheckIn}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${getRiskClasses(person.severity)}`}>
                    {person.severity}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">{person.status}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="rounded-xl bg-slate-950/50 border border-slate-800 p-2.5">
                  <div className="flex items-center gap-1.5 text-slate-400"><Stethoscope className="w-3.5 h-3.5" /> Need</div>
                  <p className="mt-2 font-semibold text-slate-100">{person.need}</p>
                </div>
                <div className="rounded-xl bg-slate-950/50 border border-slate-800 p-2.5">
                  <div className="flex items-center gap-1.5 text-slate-400"><CalendarDays className="w-3.5 h-3.5" /> Next Visit</div>
                  <p className="mt-2 font-semibold text-slate-100">{person.nextVisit}</p>
                </div>
                <div className="rounded-xl bg-slate-950/50 border border-slate-800 p-2.5">
                  <div className="flex items-center gap-1.5 text-slate-400"><Activity className="w-3.5 h-3.5" /> Health</div>
                  <p className="mt-2 font-semibold text-emerald-300">{person.healthScore}/100</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <aside className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.18em] text-slate-400">Selected dependent</p>
              <h3 className="mt-2 text-xl font-extrabold text-white">{selectedDependent.name}</h3>
            </div>
            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${getRiskClasses(selectedDependent.severity)}`}>
              {selectedDependent.severity}
            </span>
          </div>

          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{selectedDependent.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock3 className="w-4 h-4 text-amber-400" />
              <span>Last check-in: {selectedDependent.lastCheckIn}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Assigned caregiver: {selectedDependent.caregiver}</span>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-950/70 p-4 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Care plan</span>
              <span className="text-xs font-bold text-emerald-400">{selectedDependent.healthScore}% stable</span>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-slate-200">
              {selectedDependent.goals.map((goal) => (
                <li key={goal} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <button className="w-full rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs py-2.5 hover:bg-emerald-400 transition-colors">
              Schedule Visit
            </button>
            <button className="w-full rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs py-2.5 hover:bg-slate-700 transition-colors">
              Notify Care Team
            </button>
            <button className="w-full rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 font-semibold text-xs py-2.5 hover:bg-amber-500/15 transition-colors">
              Escalate Follow-up
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

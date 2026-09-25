import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Users, 
  Award, 
  Flame, 
  MapPin, 
  Camera, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Gift, 
  ShoppingBag, 
  Home, 
  Train, 
  Sprout,
  ThumbsUp
} from 'lucide-react';
import { VOUCHERS } from '../data/mockData';
import { createReport, getLeaderboard, getMyPoints, getReports, upvoteReport } from '../lib/api';

export default function CitizenPortal({ onEarnPoints }) {
  const [grievances, setGrievances] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [citizenPoints, setCitizenPoints] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [requestError, setRequestError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('report'); // 'report' | 'rewards' | 'leaderboard'
  
  // New grievance form state
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState('Illegal Garbage Dumping');
  const [newSeverity, setNewSeverity] = useState('High');
  const [submittedMessage, setSubmittedMessage] = useState('');

  useEffect(() => {
    Promise.all([getReports(), getMyPoints(), getLeaderboard()])
      .then(([reportResult, pointsResult, leaderboardResult]) => {
        setGrievances(reportResult.reports || []);
        setCitizenPoints(pointsResult.points || 0);
        setStreakDays(pointsResult.streakDays || 0);
        setLeaderboard(leaderboardResult.leaderboard || []);
      })
      .catch((error) => setRequestError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreateReport = async (e) => {
    e.preventDefault();
    if (!newTitle || !newLocation) return;
    setIsSubmitting(true);
    setRequestError('');
    try {
      const result = await createReport({ title: newTitle, location: newLocation, category: newCategory, severity: newSeverity });
      setGrievances((currentGrievances) => [result.report, ...currentGrievances]);
      setCitizenPoints((points) => points + (result.pointsAwarded || 0));
      if (onEarnPoints && result.pointsAwarded) onEarnPoints(result.pointsAwarded);
    } catch (error) {
      setRequestError(error.message);
      return;
    } finally {
      setIsSubmitting(false);
    }

    setNewTitle('');
    setNewLocation('');
    setSubmittedMessage('Report successfully geo-tagged & verified! +50 GreenPoints credited.');

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setTimeout(() => setSubmittedMessage(''), 4000);
  };

  const handleUpvote = async (id) => {
    try {
      const result = await upvoteReport(id);
      setGrievances((currentGrievances) => currentGrievances.map((grievance) => grievance._id === id ? result.report : grievance));
    } catch (error) {
      setRequestError(error.message);
    }
  };

  const handleRedeemVoucher = (voucher) => {
    if (citizenPoints < voucher.pointsRequired) {
      alert(`Insufficient GreenPoints! You need ${voucher.pointsRequired} points to redeem this voucher.`);
      return;
    }
    setCitizenPoints(prev => prev - voucher.pointsRequired);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch (err) {}
    alert(`Congratulations! You redeemed "${voucher.title}". Your discount code has been generated: ECO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Citizen Gamified Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Users className="w-3.5 h-3.5" /> Swachh Citizen Engagement Hub
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Spot & Report Grievance & EcoRewards
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Report unsanitary blackspots, earn GreenPoints for verified waste segregation, and redeem vouchers for public transit and tax rebates.
            </p>
          </div>

          {/* Citizen Wallet Widget */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-center min-w-[130px]">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 uppercase font-bold">
                <Award className="w-4 h-4 text-emerald-400" /> GreenPoints
              </div>
              <p className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{citizenPoints}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-center min-w-[130px]">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 uppercase font-bold">
                <Flame className="w-4 h-4 text-amber-400" /> Streak
              </div>
              <p className="text-2xl font-extrabold text-amber-400 font-mono mt-1">{streakDays} Days</p>
            </div>
          </div>

        </div>

        {/* Sub-nav Tabs */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'report' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            Spot & Report Portal
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'rewards' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            Rewards Marketplace
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'leaderboard' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            Ward Leaderboard
          </button>
        </div>

      </div>

      {/* Tab 1: Spot & Report Grievance View */}
      {activeTab === 'report' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 5 Cols: File a New Report Form */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                Report Sanitation Blackspot
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                +50 Pts
              </span>
            </div>

            {requestError && <p role="alert" className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs">{requestError}</p>}
            {submittedMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{submittedMessage}</span>
              </div>
            )}

            <form onSubmit={handleCreateReport} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Issue Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Overflowing dump near bus terminal"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Geo-Location / Street Address</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Sector 14, Main Market Road"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 pr-16"
                  />
                  <span className="absolute right-2 top-2 px-2 py-1 rounded bg-slate-800 text-[10px] text-emerald-400 font-mono font-bold">
                    GPS ON
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option>Illegal Garbage Dumping</option>
                    <option>Broken Sensor Bin</option>
                    <option>Sanitation & Hygiene</option>
                    <option>Stagnant Wastewater</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Urgency</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option>Critical (Hazardous)</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload Simulator Box */}
              <div className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 transition-colors text-center cursor-pointer">
                <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <p className="text-xs text-slate-300 font-semibold">Photo Proof Attached</p>
                <span className="text-[10px] text-slate-500">AI automatically detects waste density & severity</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Report & Earn GreenPoints
              </button>
            </form>
          </div>

          {/* Right 7 Cols: Live Grievance Timeline Feed */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Active Public Grievances & Resolution Trackers
              </span>
              <span className="text-xs text-slate-500">{grievances.length} Reports Tracked</span>
            </div>

            <div className="space-y-4">
              {grievances.map((grv) => (
                <div key={grv._id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
                  
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-white font-mono">{grv._id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                          {grv.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{grv.timestamp}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100 mt-1">{grv.title}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{grv.location}</span>
                      </p>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      grv.status === 'Resolved' 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                        : grv.status === 'Dispatched' 
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                        : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                    }`}>
                      {grv.status}
                    </span>
                  </div>

                  {/* Resolution Stepper Timeline */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-2">
                      Real-Time Resolution Progress ({grv.assignedTeam})
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {grv.timeline.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                            step.done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                          }`}>
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                          <span className={`truncate ${step.done ? 'text-slate-200 font-semibold' : 'text-slate-500'}`}>
                            {step.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upvote & Reward Bar */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      onClick={() => handleUpvote(grv._id)}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{grv.upvotes} Citizens Confirmed</span>
                    </button>

                    <span className="text-emerald-400 font-bold font-mono text-xs">
                      +{grv.ecoRewardAllocated} GreenPoints Earned
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: EcoRewards Marketplace */}
      {activeTab === 'rewards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">GreenPoints Voucher Marketplace</h3>
              <p className="text-xs text-slate-400">Convert your correct waste sorting and reporting points into real monetary savings.</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
              Your Balance: {citizenPoints} Pts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VOUCHERS.map((voucher) => {
              const canAfford = citizenPoints >= voucher.pointsRequired;
              return (
                <div 
                  key={voucher.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
                      <Gift className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">{voucher.category}</span>
                    <h4 className="text-base font-extrabold text-white mt-0.5">{voucher.title}</h4>
                    <p className="text-xs font-bold text-emerald-400 mt-1">{voucher.discount}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {voucher.pointsRequired} Pts
                    </span>
                    <button
                      onClick={() => handleRedeemVoucher(voucher)}
                            disabled={!canAfford}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        canAfford 
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md' 
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem Voucher' : 'Need More Pts'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Ward Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Community Swachh Leaderboard (Ward 4)
            </h3>
            <span className="text-xs text-slate-400">Weekly Refresh in 2 Days</span>
          </div>

          <div className="space-y-2.5">
            {leaderboard.map((user) => (
              <div 
                key={user._id || user.rank}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs font-mono ${
                    user.rank === 1 
                      ? 'bg-amber-400 text-slate-950' 
                      : user.rank === 2 
                      ? 'bg-slate-300 text-slate-950' 
                      : user.rank === 3 
                      ? 'bg-amber-700 text-white' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {user.rank}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                    {user.avatar}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white">{user.name}</h4>
                    <span className="text-[10px] text-emerald-400 font-semibold">{user.badge}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-slate-400 hidden sm:inline">
                    🔥 {user.streakDays}d Streak
                  </span>
                  <span className="font-extrabold text-emerald-400">
                    {user.greenPoints} Pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

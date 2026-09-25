import React, { useState } from 'react';
import { 
  Sparkles, 
  Droplets, 
  Wind, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Star, 
  Zap, 
  RotateCw, 
  Activity,
  Send,
  Users
} from 'lucide-react';
import { SANITATION_FACILITIES } from '../data/mockData';

export default function SanitizationMonitor({ onNotification }) {
  const [facilities, setFacilities] = useState(SANITATION_FACILITIES);
  const [selectedFacilityId, setSelectedFacilityId] = useState(SANITATION_FACILITIES[0].id);
  const [sanitizingId, setSanitizingId] = useState(null);
  
  // Feedback Kiosk State
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const selectedFacility = facilities.find(f => f.id === selectedFacilityId) || facilities[0];

  const triggerDisinfectionCycle = (facilityId) => {
    setSanitizingId(facilityId);
    if (onNotification) {
      onNotification(`Automated UV-C & Bio-Enzyme Disinfection triggered for ${facilityId}!`);
    }

    setTimeout(() => {
      setFacilities(prev => prev.map(f => {
        if (f.id === facilityId) {
          return {
            ...f,
            overallScore: 98,
            hygieneStatus: "Optimal",
            lastDisinfected: "Just now",
            nextCycle: "In 60 mins",
            uvcStatus: "Completed (Cycle 4)",
            odorPpm: 0.05,
            soapDispenserPercent: 100,
            waterTankPercent: 95
          };
        }
        return f;
      }));
      setSanitizingId(null);
    }, 2000);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSuccess(true);
    setTimeout(() => setFeedbackSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Urban Sanitization Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Public Sanitization & Restroom Hygiene Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time IoT air odor indices, touchless fixture telemetry, UV-C germicidal disinfection triggers, and digital cleanliness feedback.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            96.4% Compliance
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Monitored Facility Hubs */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Public Sanitation Complexes
          </span>

          <div className="space-y-4">
            {facilities.map((facility) => {
              const isSelected = selectedFacilityId === facility.id;
              const isUrgent = facility.hygieneStatus.includes('Needs') || facility.overallScore < 80;
              const isRunning = sanitizingId === facility.id;

              return (
                <div
                  key={facility.id}
                  onClick={() => setSelectedFacilityId(facility.id)}
                  className={`glass-panel p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected 
                      ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-xl' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Active Cycle Overlay */}
                  {isRunning && (
                    <div className="absolute inset-0 bg-purple-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-4">
                      <Zap className="w-8 h-8 text-purple-400 animate-bounce mb-2" />
                      <p className="font-extrabold text-white text-sm">UV-C & Enzyme Disinfection Active</p>
                      <span className="text-xs text-purple-300">Sterilizing contact surfaces & neutralizing odors...</span>
                    </div>
                  )}

                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-white font-mono">{facility.id}</span>
                        <span className="text-xs font-bold text-slate-300">{facility.name}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{facility.location}</p>
                    </div>

                    <div className="text-right">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                        isUrgent 
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      }`}>
                        {facility.hygieneStatus}
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">Score: {facility.overallScore}/100</p>
                    </div>
                  </div>

                  {/* Telemetry Sensor Badges Grid */}
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                        <Wind className="w-3 h-3 text-cyan-400" /> Odor Index
                      </div>
                      <span className={`font-bold font-mono ${facility.odorPpm > 0.3 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {facility.odorPpm} ppm
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                        <Droplets className="w-3 h-3 text-blue-400" /> Water Tank
                      </div>
                      <span className="font-bold font-mono text-slate-200">
                        {facility.waterTankPercent}%
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                        <Sparkles className="w-3 h-3 text-purple-400" /> Soap Level
                      </div>
                      <span className={`font-bold font-mono ${facility.soapDispenserPercent < 30 ? 'text-amber-400' : 'text-slate-200'}`}>
                        {facility.soapDispenserPercent}%
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                        <Users className="w-3 h-3 text-emerald-400" /> Footfall
                      </div>
                      <span className="font-bold font-mono text-emerald-400">
                        {facility.footfallToday}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> Last Cleaned: {facility.lastDisinfected}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerDisinfectionCycle(facility.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20"
                    >
                      <Zap className="w-3.5 h-3.5" /> Trigger UV-C Cycle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: Hygiene Intelligence & Citizen Feedback Kiosk */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active Facility Deep Diagnostics */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Hygiene Diagnostics ({selectedFacility.id})
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <span>UV-C Sterilization Grid</span>
                <span className="font-bold text-purple-400 font-mono">{selectedFacility.uvcStatus}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <span>Touchless Sensor Fixtures</span>
                <span className="font-bold text-emerald-400">100% Operational</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <span>Citizen Cleanliness Rating</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {selectedFacility.userRating} / 5.0
                </span>
              </div>
            </div>
          </div>

          {/* Citizen Digital Cleanliness Feedback Kiosk */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Live Citizen Feedback Kiosk
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Touchless QR</span>
            </div>

            {feedbackSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you! Your feedback will help improve sanitation schedules.</span>
              </div>
            )}

            <form onSubmit={handleFeedbackSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Rate Cleanliness Quality</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackRating(star)}
                      className={`p-2 rounded-xl transition-all ${
                        feedbackRating >= star 
                          ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' 
                          : 'bg-slate-900 text-slate-600 border border-slate-800'
                      }`}
                    >
                      <Star className={`w-5 h-5 ${feedbackRating >= star ? 'fill-amber-400' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Quick Tags</label>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-[11px] border border-slate-800 cursor-pointer hover:border-emerald-500">
                    Clean & Odor Free
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-[11px] border border-slate-800 cursor-pointer hover:border-emerald-500">
                    Soap Available
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-[11px] border border-slate-800 cursor-pointer hover:border-red-500">
                    Needs Water Refill
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all border border-slate-700 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Submit Public Rating
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}

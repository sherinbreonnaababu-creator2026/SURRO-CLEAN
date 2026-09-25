import React from 'react';
import { 
  Sparkles, 
  ScanLine, 
  Radio, 
  Truck, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Leaf, 
  TrendingUp, 
  CheckCircle2, 
  MapPin, 
  ArrowUpRight,
  Flame,
  Droplets,
  Wind,
  Activity
} from 'lucide-react';

export default function CommandCenter({ 
  onNavigate, 
  bins, 
  trucks, 
  grievances, 
  facilities,
  onOpenInfoModal
}) {
  const criticalBins = bins.filter(b => b.status === 'Critical' || b.fillLevel > 85);
  const activeTrucks = trucks.filter(t => t.status.includes('Active') || t.status.includes('En Route'));
  const pendingGrievances = grievances.filter(g => g.status !== 'Resolved');

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Hero Banner with SIH Problem Statement Spotlight */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-emerald-500/20 p-6 md:p-10 shadow-2xl">
        {/* Background glow orb */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" /> SIH Problem ID 26195: Clean & Green Technology
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Next-Gen AI Waste Segregation & Autonomous Sanitization
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Empowering urban municipalities, citizens, and sanitation personnel with computer vision waste sorting, real-time IoT hazard telemetry, AI-optimized fleet dispatch, and automated hygiene tracking.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('ai-classifier')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 group"
              >
                <ScanLine className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Launch AI Waste Scanner
              </button>

              <button
                onClick={() => onNavigate('smart-bins')}
                className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Radio className="w-4 h-4 text-emerald-400" />
                Live IoT Telemetry
              </button>

              <button
                onClick={onOpenInfoModal}
                className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-emerald-300 text-xs font-semibold underline underline-offset-4"
              >
                View Problem Statement Spec
              </button>
            </div>
          </div>

          {/* Cleanliness Index Gauge Widget */}
          <div className="w-full lg:w-72 p-5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 backdrop-blur-md shadow-xl flex flex-col items-center text-center">
            <div className="relative flex items-center justify-center mb-3">
              {/* Circular Gauge Ring */}
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  className="stroke-emerald-500"
                  strokeWidth="8"
                  strokeDasharray="289"
                  strokeDashoffset="18"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-extrabold text-white font-mono">94.2%</span>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase">Grade A+</span>
              </div>
            </div>

            <h3 className="font-bold text-sm text-slate-200">Urban Cleanliness Index</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Real-time aggregate across 6 smart wards</p>

            <div className="mt-3 w-full grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-left">
              <div>
                <span className="text-[10px] text-slate-400">Segregation</span>
                <p className="text-xs font-bold text-emerald-400">88.4%</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">CO2 Cut</span>
                <p className="text-xs font-bold text-cyan-400">-4.2 Tons</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Smart Bins Status */}
        <div 
          onClick={() => onNavigate('smart-bins')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">IoT Smart Bins</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-white font-mono">{bins.length}</span>
              <span className="text-xs text-slate-400 ml-1.5 font-medium">Active Units</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${criticalBins.length > 0 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400'}`}>
              {criticalBins.length} Critical
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Methane/H2S sensors online</span>
          </p>
        </div>

        {/* KPI 2: AI Classification Rate */}
        <div 
          onClick={() => onNavigate('ai-classifier')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Segregation Accuracy</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
              <ScanLine className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-cyan-400 font-mono">98.6%</span>
              <span className="text-xs text-slate-400 ml-1.5 font-medium">Confidence</span>
            </div>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +4.2%
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">Zero mixed-waste landfill contamination</p>
        </div>

        {/* KPI 3: Green Fleet Logistics */}
        <div 
          onClick={() => onNavigate('routes')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Smart Fleet Routes</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-white font-mono">{activeTrucks.length}</span>
              <span className="text-xs text-slate-400 ml-1.5 font-medium">Active Trucks</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              94.8% Opt.
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">Dynamic TSP routing saves 48L fuel/day</p>
        </div>

        {/* KPI 4: Public Sanitization Matrix */}
        <div 
          onClick={() => onNavigate('sanitization')}
          className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Public Hygiene Hubs</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-white font-mono">{facilities.length}</span>
              <span className="text-xs text-slate-400 ml-1.5 font-medium">IoT Hubs</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              UV-C Ready
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">Touchless dispensers & odor index active</p>
        </div>

      </div>

      {/* Main Grid: Interactive City Overview & Real-Time Incident Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Smart City Geospatial Simulation Map */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Live Ward Geospatial Telemetry
              </h3>
              <p className="text-xs text-slate-400">Simulated IoT Bin sensors, Sanitation units, and Collection routes</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              STREAMING
            </span>
          </div>

          {/* Map Graphic Canvas / Simulation Grid */}
          <div className="relative w-full h-80 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden bg-tech-grid flex items-center justify-center">
            
            {/* Visual Route Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 120 180 Q 240 80 420 120 T 640 220"
                fill="transparent"
                stroke="rgba(16, 185, 129, 0.4)"
                strokeWidth="3"
                strokeDasharray="6,6"
                className="animate-pulse"
              />
              <path
                d="M 220 250 Q 380 280 580 180"
                fill="transparent"
                stroke="rgba(6, 182, 212, 0.3)"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            </svg>

            {/* Smart Bins on Map */}
            {bins.map((b, idx) => {
              const isCritical = b.status === 'Critical' || b.fillLevel > 85;
              // Coordinates distribution for visual map simulation
              const positions = [
                { top: '25%', left: '22%' },
                { top: '65%', left: '30%' },
                { top: '35%', left: '60%' },
                { top: '75%', left: '70%' },
                { top: '45%', left: '82%' },
                { top: '20%', left: '45%' },
              ];
              const pos = positions[idx % positions.length];

              return (
                <div
                  key={b.id}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  onClick={() => onNavigate('smart-bins')}
                >
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                    isCritical 
                      ? 'bg-red-500/20 border-red-500 text-red-400 animate-bounce shadow-lg shadow-red-500/30' 
                      : 'bg-emerald-500/20 border-emerald-500 text-emerald-400 group-hover:scale-125 shadow-lg shadow-emerald-500/20'
                  }`}>
                    <Radio className="w-4 h-4" />
                    {isCritical && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-slate-900 animate-ping"></span>
                    )}
                  </div>

                  {/* Hover Tooltip Card */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 w-48 p-2.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-[11px] pointer-events-none">
                    <p className="font-bold text-white">{b.id}: {b.type}</p>
                    <p className="text-slate-400">{b.location}</p>
                    <div className="mt-1 flex justify-between font-mono">
                      <span>Fill: <strong className={isCritical ? 'text-red-400' : 'text-emerald-400'}>{b.fillLevel}%</strong></span>
                      <span>Gas: {b.gasPpm} ppm</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Collection Trucks on Map */}
            <div 
              style={{ top: '38%', left: '50%' }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              onClick={() => onNavigate('routes')}
            >
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border-2 border-amber-500 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
                <Truck className="w-4 h-4" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block z-30 w-40 p-2 rounded-lg bg-slate-900 border border-slate-700 text-[10px] text-center">
                <span className="font-bold text-amber-400">TRK-01 (Eco-Compactor)</span>
                <p className="text-slate-300">En route to BIN-105</p>
              </div>
            </div>

            {/* Map Legend Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] backdrop-blur-md">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Normal Bin (&lt;80%)
                </span>
                <span className="flex items-center gap-1 text-red-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Overflow / Gas Alert
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Green Fleet Truck
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[10px]">Zone A-E GPS Mesh</span>
            </div>

          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => onNavigate('ai-classifier')}
              className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-1">
                <span>AI Vision Scan</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-400">Sort trash with image recognition</p>
            </button>

            <button
              onClick={() => onNavigate('routes')}
              className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-cyan-400 mb-1">
                <span>Fleet Optimization</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-400">Dispatch collection for full bins</p>
            </button>

            <button
              onClick={() => onNavigate('citizen')}
              className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-purple-400 mb-1">
                <span>Spot & Report</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-400">Citizen grievance & GreenPoints</p>
            </button>
          </div>

        </div>

        {/* Right 1 Col: Live Alert & Action Log Feed */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                Live Incident Stream
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {criticalBins.length + pendingGrievances.length} Active
              </span>
            </div>

            {/* List of alerts */}
            <div className="space-y-3">
              {criticalBins.map((bin) => (
                <div 
                  key={bin.id}
                  onClick={() => onNavigate('smart-bins')}
                  className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 hover:border-red-500/60 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{bin.id} Capacity Warning ({bin.fillLevel}%)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Just Now</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">{bin.location}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-red-300/80">
                    <span>Methane: {bin.gasPpm} ppm</span>
                    <span className="font-bold underline">Auto-Dispatch Sent →</span>
                  </div>
                </div>
              ))}

              {pendingGrievances.slice(0, 2).map((grv) => (
                <div 
                  key={grv.id}
                  onClick={() => onNavigate('citizen')}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span>{grv.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{grv.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">{grv.location}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Status: <strong className="text-amber-400">{grv.status}</strong></span>
                    <span className="font-bold text-emerald-400">+{grv.ecoRewardAllocated} Pts Reward</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-slate-300">
            <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Bio-Methanation Facility Online</span>
            </div>
            <p className="text-[11px] text-slate-400">
              14.2 tons of wet waste diverted today into 810 m³ green CNG fuel for municipal buses.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

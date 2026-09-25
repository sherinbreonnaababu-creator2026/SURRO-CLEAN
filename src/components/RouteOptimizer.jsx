import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  Fuel, 
  Leaf, 
  Clock, 
  Battery, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { FLEET_TRUCKS } from '../data/mockData';

export default function RouteOptimizer({ bins, setBins, onNotification }) {
  const [trucks, setTrucks] = useState(FLEET_TRUCKS);
  const [selectedTruckId, setSelectedTruckId] = useState(FLEET_TRUCKS[0].id);

  const selectedTruck = trucks.find(t => t.id === selectedTruckId) || trucks[0];

  // Critical bins to collect
  const criticalBins = bins.filter(b => b.fillLevel > 75);

  const handleMarkBinCollected = (binId) => {
    // 1. Reset the bin in state to empty
    setBins(prev => prev.map(b => {
      if (b.id === binId) {
        return {
          ...b,
          fillLevel: 5,
          weightKg: 2.0,
          gasPpm: 4,
          status: 'Normal',
          lastEmptied: 'Just now'
        };
      }
      return b;
    }));

    // 2. Update truck payload
    setTrucks(prev => prev.map(t => {
      if (t.id === selectedTruckId) {
        return {
          ...t,
          currentPayloadKg: Math.min(t.maxPayloadKg, t.currentPayloadKg + 650),
          fuelSavedLiters: +(t.fuelSavedLiters + 2.4).toFixed(1)
        };
      }
      return b;
    }));

    if (onNotification) {
      onNotification(`Collection confirmed for ${binId}! Bin emptied & payload recorded.`);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 mb-2">
            <Truck className="w-3.5 h-3.5" /> Dynamic Green TSP Route Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Waste Collection & Fleet Route Dispatcher
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Algorithmic shortest-path route sequencing prioritizing overflowing smart bins, eliminating deadhead miles and reducing diesel emissions.
          </p>
        </div>

        {/* Fleet KPI Highlights */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Fuel Saved</span>
              <p className="text-xs font-bold text-emerald-400 font-mono">145.7 Liters/wk</p>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">CO2 Reduced</span>
              <p className="text-xs font-bold text-cyan-400 font-mono">382 kg CO2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 4 Cols: Fleet Vehicle Selector */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Municipal Collection Fleet
          </span>

          <div className="space-y-3">
            {trucks.map((truck) => {
              const isSelected = selectedTruckId === truck.id;
              const payloadPercent = Math.round((truck.currentPayloadKg / truck.maxPayloadKg) * 100);

              return (
                <div
                  key={truck.id}
                  onClick={() => setSelectedTruckId(truck.id)}
                  className={`glass-panel p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-lg' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-white font-mono">{truck.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                          {truck.vehicleType.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-semibold mt-1">Driver: {truck.driver}</p>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {truck.status}
                    </span>
                  </div>

                  {/* Payload progress */}
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Payload ({payloadPercent}%)</span>
                      <span className="font-mono text-slate-200">{truck.currentPayloadKg} / {truck.maxPayloadKg} kg</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${payloadPercent}%` }}
                        className={`h-full rounded-full ${payloadPercent > 80 ? 'bg-amber-500' : 'bg-emerald-400'}`}
                      />
                    </div>
                  </div>

                  {/* Stats footer */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Battery className="w-3 h-3 text-emerald-400" /> {truck.batteryPercent}% Charge
                    </span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {truck.routeEfficiency} Opt.
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Info Box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Fleet Dispatch Logic
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Bins reaching &gt;80% capacity automatically insert into active truck driver manifolds. Non-critical bins (&lt;40%) are bypassed to avoid wasted fuel.
            </p>
          </div>
        </div>

        {/* Right 8 Cols: Live Interactive Route Map & Driver Manifest */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Active Route Visualizer */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  Active Manifest: {selectedTruck.id} ({selectedTruck.driver})
                </h3>
                <p className="text-xs text-slate-400">
                  Next Destination: <strong className="text-emerald-400">{selectedTruck.nextStop}</strong> (ETA: {selectedTruck.etaMinutes} mins)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  3 Priority Stops
                </span>
              </div>
            </div>

            {/* Simulated Route Waypoint Steps */}
            <div className="space-y-3 pt-2">
              {bins.map((bin, idx) => {
                const isUrgent = bin.fillLevel > 75;
                const isCleaned = bin.fillLevel <= 10;

                return (
                  <div
                    key={bin.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCleaned 
                        ? 'bg-slate-950/40 border-slate-800/80 opacity-70' 
                        : isUrgent 
                        ? 'bg-red-950/20 border-red-500/30 shadow-md' 
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5 ${
                        isCleaned 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                          : isUrgent 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {idx + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white font-mono">{bin.id}</span>
                          <span className="text-[10px] text-slate-400">({bin.type})</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">{bin.location}</p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono">
                          <span>Fill: <strong className={isUrgent ? 'text-red-400 font-bold' : 'text-emerald-400'}>{bin.fillLevel}%</strong></span>
                          <span>Gas: {bin.gasPpm} ppm</span>
                          <span>Weight: {bin.weightKg} kg</span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {isCleaned ? (
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Collected
                        </span>
                      ) : (
                        <button
                          onClick={() => handleMarkBinCollected(bin.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Mark Collected
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Route Summary */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Estimated Complete Shift Time: <strong className="text-white">42 mins</strong></span>
              </div>
              <div className="text-slate-400 font-mono">
                Total Path Distance: <strong className="text-emerald-400">14.8 km</strong>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

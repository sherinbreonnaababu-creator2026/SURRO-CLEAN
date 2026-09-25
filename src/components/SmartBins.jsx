import React, { useState } from 'react';
import { 
  Radio, 
  Flame, 
  Droplets, 
  Wind, 
  Battery, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  RotateCw, 
  Minimize2, 
  Truck, 
  Sliders,
  BellRing
} from 'lucide-react';

export default function SmartBins({ bins, setBins, onDispatchBin }) {
  const [selectedBinId, setSelectedBinId] = useState(bins[0].id);
  const [simulationMessage, setSimulationMessage] = useState('');

  const selectedBin = bins.find(b => b.id === selectedBinId) || bins[0];

  const updateBinField = (field, value) => {
    setBins(prev => prev.map(b => {
      if (b.id === selectedBinId) {
        const updated = { ...b, [field]: value };
        // Auto update status based on thresholds
        if (updated.fillLevel > 85 || updated.gasPpm > 80 || updated.tempC > 45) {
          updated.status = 'Critical';
        } else if (updated.fillLevel > 70 || updated.gasPpm > 40) {
          updated.status = 'Warning';
        } else {
          updated.status = 'Normal';
        }
        return updated;
      }
      return b;
    }));
  };

  const triggerCompactor = (binId) => {
    setSimulationMessage(`Hydraulic compaction sequence running on ${binId}...`);
    setBins(prev => prev.map(b => {
      if (b.id === binId) {
        return {
          ...b,
          compactorActive: true,
        };
      }
      return b;
    }));

    setTimeout(() => {
      setBins(prev => prev.map(b => {
        if (b.id === binId) {
          const compactedFill = Math.max(15, Math.round(b.fillLevel * 0.55));
          return {
            ...b,
            fillLevel: compactedFill,
            compactorActive: false,
            status: compactedFill > 80 ? 'Critical' : compactedFill > 65 ? 'Warning' : 'Normal',
          };
        }
        return b;
      }));
      setSimulationMessage(`Compaction complete on ${binId}: Volume reduced by 45%!`);
    }, 1500);
  };

  const toggleLidLock = (binId) => {
    setBins(prev => prev.map(b => {
      if (b.id === binId) {
        const newStatus = b.lidStatus === 'Secured Lock' ? 'Closed' : 'Secured Lock';
        return { ...b, lidStatus: newStatus };
      }
      return b;
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
            <Radio className="w-3.5 h-3.5" /> Multi-Sensor IoT Telemetry Grid
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Smart Bin Telemetry & Hazard Prevention
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time ultrasonic fill monitoring, Methane/H2S toxic gas sensors, temperature hazard alerts, and automated volume compaction.
          </p>
        </div>

        {/* Live Simulation Alert Banner if active */}
        {simulationMessage && (
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2 animate-fadeIn shadow-lg">
            <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
            <span>{simulationMessage}</span>
          </div>
        )}
      </div>

      {/* Interactive IoT Sensor Simulation Controller Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              IoT Sensor Simulation Lab
            </span>
            <span className="text-xs text-slate-400 font-mono">
              (Testing Bin: <strong className="text-emerald-400">{selectedBin.id}</strong>)
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerCompactor(selectedBin.id)}
              disabled={selectedBin.compactorActive}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md disabled:opacity-50"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              {selectedBin.compactorActive ? 'Compacting...' : 'Trigger Hydraulic Compactor'}
            </button>

            <button
              onClick={() => toggleLidLock(selectedBin.id)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition-all"
            >
              {selectedBin.lidStatus === 'Secured Lock' ? <Unlock className="w-3.5 h-3.5 text-amber-400" /> : <Lock className="w-3.5 h-3.5 text-red-400" />}
              {selectedBin.lidStatus === 'Secured Lock' ? 'Unlock Lid' : 'Emergency Lock'}
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {/* Slider 1: Fill Level */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Fill Capacity %</span>
              <span className={`font-bold font-mono ${selectedBin.fillLevel > 80 ? 'text-red-400' : 'text-emerald-400'}`}>
                {selectedBin.fillLevel}%
              </span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="100" 
              value={selectedBin.fillLevel}
              onChange={(e) => updateBinField('fillLevel', Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <p className="text-[10px] text-slate-500">Triggers route alert when &gt; 80%</p>
          </div>

          {/* Slider 2: Gas PPM (Methane / H2S) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Methane / H2S Odor (PPM)</span>
              <span className={`font-bold font-mono ${selectedBin.gasPpm > 80 ? 'text-red-400' : 'text-amber-400'}`}>
                {selectedBin.gasPpm} ppm
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="150" 
              value={selectedBin.gasPpm}
              onChange={(e) => updateBinField('gasPpm', Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <p className="text-[10px] text-slate-500">Spikes trigger auto-exhaust vent & alert</p>
          </div>

          {/* Slider 3: Internal Temperature */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Internal Temp (°C)</span>
              <span className={`font-bold font-mono ${selectedBin.tempC > 40 ? 'text-red-400' : 'text-cyan-400'}`}>
                {selectedBin.tempC}°C
              </span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="65" 
              value={selectedBin.tempC}
              onChange={(e) => updateBinField('tempC', Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <p className="text-[10px] text-slate-500">&gt; 45°C indicates spontaneous heat / fire risk</p>
          </div>
        </div>
      </div>

      {/* Smart Bins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bins.map((bin) => {
          const isSelected = selectedBinId === bin.id;
          const isCritical = bin.status === 'Critical';
          const isWarning = bin.status === 'Warning';

          return (
            <div
              key={bin.id}
              onClick={() => setSelectedBinId(bin.id)}
              className={`glass-panel p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                isSelected 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Compactor active overlay */}
              {bin.compactorActive && (
                <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-4">
                  <RotateCw className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
                  <p className="font-extrabold text-white text-sm">Compaction in Progress</p>
                  <span className="text-xs text-emerald-300">Reducing waste density...</span>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-white font-mono">{bin.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                      {bin.zone.split('-')[0]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{bin.location}</p>
                </div>

                <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold border ${
                  isCritical 
                    ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                    : isWarning 
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}>
                  {bin.status}
                </span>
              </div>

              {/* Bin Type Badge */}
              <div className="mt-4 p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Category Stream</span>
                <span className="font-bold text-slate-200">{bin.type}</span>
              </div>

              {/* Fill Progress Bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Fill Level</span>
                  <span className={bin.fillLevel > 80 ? 'text-red-400 font-mono font-bold' : 'text-emerald-400 font-mono font-bold'}>
                    {bin.fillLevel}% ({bin.weightKg} kg)
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div 
                    style={{ width: `${bin.fillLevel}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      bin.fillLevel > 85 
                        ? 'bg-gradient-to-r from-red-500 to-amber-500 animate-pulse' 
                        : bin.fillLevel > 70 
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    }`}
                  />
                </div>
              </div>

              {/* Telemetry Sensor Badges Grid */}
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                    <Wind className="w-3 h-3 text-amber-400" /> Gas
                  </div>
                  <span className={`text-xs font-bold font-mono ${bin.gasPpm > 80 ? 'text-red-400' : 'text-slate-200'}`}>
                    {bin.gasPpm} ppm
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                    <Flame className="w-3 h-3 text-cyan-400" /> Temp
                  </div>
                  <span className={`text-xs font-bold font-mono ${bin.tempC > 40 ? 'text-red-400' : 'text-slate-200'}`}>
                    {bin.tempC}°C
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                    <Battery className="w-3 h-3 text-emerald-400" /> Solar
                  </div>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    {bin.battery}%
                  </span>
                </div>
              </div>

              {/* Card Footer: Quick Actions */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400">Lid: <strong className="text-slate-200">{bin.lidStatus}</strong></span>

                {bin.fillLevel > 80 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDispatchBin) onDispatchBin(bin.id);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-bold text-[10px] flex items-center gap-1 transition-all"
                  >
                    <Truck className="w-3 h-3" /> Auto-Dispatch
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

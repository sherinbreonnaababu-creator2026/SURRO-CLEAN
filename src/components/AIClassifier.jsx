import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ScanLine, 
  Sparkles, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Leaf, 
  Award, 
  RotateCcw, 
  ShieldCheck, 
  Flame, 
  HelpCircle,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';
import { AI_WASTE_SAMPLES } from '../data/mockData';

export default function AIClassifier({ onEarnPoints }) {
  const [selectedSample, setSelectedSample] = useState(AI_WASTE_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);
  const [customImage, setCustomImage] = useState(null);
  const [totalPointsEarned, setTotalPointsEarned] = useState(0);
  const [simulationBinState, setSimulationBinState] = useState('Lid Unlocked - Deposit Authorized');

  const handleSelectSample = (sample) => {
    setSelectedSample(sample);
    setCustomImage(null);
    runScanSimulation(sample);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      const randomSample = AI_WASTE_SAMPLES[Math.floor(Math.random() * AI_WASTE_SAMPLES.length)];
      setSelectedSample({
        ...randomSample,
        name: `Uploaded Item: ${file.name.split('.')[0]}`,
        image: url
      });
      runScanSimulation(randomSample);
    }
  };

  const runScanSimulation = (sample) => {
    setIsScanning(true);
    setScanComplete(false);
    setSimulationBinState('AI Vision Analyzing...');

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setTotalPointsEarned(prev => prev + sample.pointsReward);
      if (onEarnPoints) onEarnPoints(sample.pointsReward);

      // Trigger Confetti Celebration for correct segregation
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {
        // fallback
      }

      // Update bin mechanical lock state
      if (sample.category.includes('Biohazard')) {
        setSimulationBinState('Red Sharps Flap Active | UV-C Sterilization Armed');
      } else if (sample.category.includes('Wet')) {
        setSimulationBinState('Green Organic Chute Opened | Odor Shutter Active');
      } else if (sample.category.includes('E-Waste')) {
        setSimulationBinState('Yellow Battery Vault Unlocked | Fire Suppression Ready');
      } else {
        setSimulationBinState('Blue Recyclable Compactor Vault Opened');
      }
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> YOLOv8 / Edge Vision Model Integration
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Automated Waste Vision Segregator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time material detection, hazardous contamination prevention, and instant citizen rewards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Reward Points</span>
              <p className="text-sm font-extrabold text-emerald-400 font-mono">+{totalPointsEarned} GreenPts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Scanner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Camera Scanner Viewport & Presets */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Viewport Frame */}
          <div className="relative aspect-video sm:aspect-[4/3] rounded-2xl bg-slate-950 border-2 border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group">
            
            {/* Background Image / Stream */}
            <img 
              src={selectedSample.image} 
              alt={selectedSample.name} 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Simulated AI Laser Scanner Line */}
            {isScanning && (
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-bounce" />
            )}

            {/* Bounding Box HUD */}
            <div className="absolute inset-8 sm:inset-12 border-2 border-dashed border-emerald-400/80 rounded-xl pointer-events-none flex flex-col justify-between p-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/40 text-xs font-mono text-emerald-400 shadow-md">
                  <ScanLine className="w-3.5 h-3.5 animate-pulse" />
                  <span>AI TRACK: {isScanning ? 'DETECTING...' : selectedSample.category}</span>
                </div>
                <div className="bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-xs font-mono text-white">
                  FPS: 30 | 720p
                </div>
              </div>

              {/* Center Target Crosshair */}
              <div className="self-center flex items-center justify-center w-12 h-12 rounded-full border border-emerald-400/30">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
              </div>

              <div className="flex justify-between items-end">
                <div className="bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] font-mono text-slate-300">
                  CONFIDENCE: <strong className="text-emerald-400 font-bold">{selectedSample.confidence}%</strong>
                </div>
                <div className="bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] font-mono text-cyan-300">
                  AICTE-SIH 26195
                </div>
              </div>
            </div>

            {/* Bottom Status Ticker on Viewport */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between p-2.5 rounded-xl bg-slate-900/95 border border-slate-800 backdrop-blur-md text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isScanning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
                <span className="font-semibold text-slate-200">{simulationBinState}</span>
              </div>

              <button
                onClick={() => runScanSimulation(selectedSample)}
                className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center gap-1 transition-all"
              >
                <RotateCcw className="w-3 h-3" /> Rescan Item
              </button>
            </div>

          </div>

          {/* Test Dataset Samples Carousel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Test Waste Samples</span>
              
              {/* Custom Upload Trigger */}
              <label className="cursor-pointer text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" /> Upload Custom Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {AI_WASTE_SAMPLES.map((sample) => {
                const isSelected = selectedSample.id === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2.5 rounded-xl text-left border transition-all flex items-center gap-3 ${
                      isSelected 
                        ? 'bg-slate-800 border-emerald-500 shadow-md shadow-emerald-500/10' 
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img 
                      src={sample.image} 
                      alt={sample.name} 
                      className="w-10 h-10 rounded-lg object-cover shrink-0" 
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate">{sample.name}</p>
                      <span className="text-[10px] text-slate-400 font-medium block truncate">{sample.category}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right 5 Cols: AI Diagnostic Breakdown & Disposal Instructions */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Classification Result Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
            
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${selectedSample.categoryColor}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> {selectedSample.category}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-2">
                  {selectedSample.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-400 font-mono">+{selectedSample.pointsReward}</span>
                <span className="text-[10px] block text-slate-400 font-bold">POINTS REWARD</span>
              </div>
            </div>

            {/* Material & Impact Specs */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Chemical / Material</span>
                <p className="font-bold text-slate-200 mt-0.5">{selectedSample.material}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Decomposition Time</span>
                <p className="font-bold text-amber-400 mt-0.5">{selectedSample.decompositionYears}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Carbon Avoidance</span>
                <p className="font-bold text-cyan-400 mt-0.5">-{selectedSample.co2SavedKg} CO2e</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Hazard Risk Level</span>
                <p className={`font-bold mt-0.5 ${selectedSample.hazardLevel.includes('High') || selectedSample.hazardLevel.includes('Extreme') ? 'text-red-400' : 'text-emerald-400'}`}>
                  {selectedSample.hazardLevel}
                </p>
              </div>
            </div>

            {/* Step-by-Step Segregation Protocol */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                Segregation & Disposal Protocol
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedSample.guidelines.map((guide, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{guide}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Smart Chute Destination indicator */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Designated Smart Chute</span>
                <p className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <span className={`w-3 h-3 rounded-full ${selectedSample.binColor}`}></span>
                  {selectedSample.category} Chute
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 shadow-md">
                AUTO-SORT READY
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

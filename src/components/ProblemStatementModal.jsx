import React from 'react';
import { Award, CheckCircle2, Cpu, ShieldAlert, Sparkles, X, Target, Layers, ArrowRight } from 'lucide-react';

export default function ProblemStatementModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl p-6 md:p-8 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Award className="w-3.5 h-3.5" /> Smart India Hackathon
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Problem ID: 26195
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Theme: Clean & Green Technology
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Student Innovation: Smart Waste Segregation, Disposal & Sanitization System
        </h2>

        {/* Meta Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Organization</p>
            <p className="text-sm font-bold text-slate-200 mt-0.5">AICTE / Ministry of Education</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Department</p>
            <p className="text-sm font-bold text-slate-200 mt-0.5">MIC - Student Innovation</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Category</p>
            <p className="text-sm font-bold text-emerald-400 mt-0.5">Software + IoT CleanTech</p>
          </div>
        </div>

        {/* Core Solution Overview */}
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            <strong className="text-emerald-400">EcoSanctuary AI</strong> delivers a unified, closed-loop digital ecosystem tackling urban sanitation bottlenecks, source-level waste mixing, and hazardous contamination.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/40 transition-all">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base mb-1">1. AI Vision Segregator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Computer vision models classify items (Wet, Recyclable, Hazardous, E-Waste) in milliseconds, guiding citizens and unlocking instant gamified rewards.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-cyan-500/40 transition-all">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base mb-1">2. IoT Sensor Telemetry</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-time bin fill-level, Methane/H2S toxic gas monitoring, automatic compaction triggers, and flame/temperature hazard prevention.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-purple-500/40 transition-all">
              <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base mb-1">3. Automated Sanitization</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Smart public restroom & community hygiene monitoring with UV-C sterilization cycle scheduling and citizen grievance auto-dispatch.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
            <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2 mb-2">
              <Target className="w-4 h-4" /> Key Innovation Highlights
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Dynamic TSP Route Optimization for Fuel & CO2 Cuts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero-Touch Public Restroom IoT Health Matrix</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Circular Economy Material Flow & Carbon Offsets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Citizen "Spot & Fix" Geo-Grievance Redressal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            Explore Interactive System <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { Award, Recycle, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';

export default function Footer({ onOpenInfoModal }) {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & SIH */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Recycle className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">EcoSanctuary AI</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                SIH-26195
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              AI-driven Urban Waste Segregation, IoT Hazard Telemetry, Dynamic Clean Fleet Routing, and Automated Sanitization Infrastructure for Smart Cities.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-300">
                AICTE Clean & Green Tech
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-300">
                MIC-Student Innovation
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold">
                Problem ID: 26195
              </span>
            </div>
          </div>

          {/* Col 2: Architecture Layers */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase text-slate-200 tracking-wider">System Modules</h4>
            <ul className="space-y-1.5 text-xs">
              <li className="hover:text-emerald-400 transition-colors">AI Edge Vision Classifier</li>
              <li className="hover:text-emerald-400 transition-colors">Multi-Sensor Smart Bins</li>
              <li className="hover:text-emerald-400 transition-colors">Dynamic TSP Fleet Dispatch</li>
              <li className="hover:text-emerald-400 transition-colors">Citizen Spot-&-Fix Grievance</li>
              <li className="hover:text-emerald-400 transition-colors">IoT Public Restroom Matrix</li>
            </ul>
          </div>

          {/* Col 3: Hackathon Meta */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase text-slate-200 tracking-wider">SIH Project Details</h4>
            <div className="space-y-2 text-xs">
              <p><strong className="text-slate-300">Problem ID:</strong> 26195</p>
              <p><strong className="text-slate-300">Theme:</strong> Clean & Green Technology</p>
              <p><strong className="text-slate-300">Category:</strong> Software & Smart IoT</p>
              <button
                onClick={onOpenInfoModal}
                className="text-emerald-400 hover:text-emerald-300 text-xs font-bold flex items-center gap-1 mt-2"
              >
                View Problem Specs <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2024-2026 EcoSanctuary AI. Smart India Hackathon Student Innovation Project.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built for Clean India (Swachh Bharat) Mission</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

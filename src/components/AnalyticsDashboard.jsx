import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Leaf, 
  Download, 
  CheckCircle2, 
  DollarSign, 
  Flame, 
  Layers,
  Sparkles,
  PieChart as PieIcon
} from 'lucide-react';
import { DAILY_WASTE_TRENDS, REVENUE_CIRCULAR_ECONOMY } from '../data/mockData';
import { getAnalytics } from '../lib/api';

const PIE_DATA = [
  { name: 'Wet Organic (Bio-Methanation)', value: 52, color: '#10b981' },
  { name: 'Dry Recyclables (Plastic/Metal)', value: 34, color: '#06b6d4' },
  { name: 'E-Waste & Batteries', value: 8, color: '#f59e0b' },
  { name: 'Biomedical & Hazardous', value: 6, color: '#ef4444' },
];

export default function AnalyticsDashboard({ onNotification }) {
  const [downloading, setDownloading] = useState(false);
  const [pieData, setPieData] = useState(PIE_DATA);

  useEffect(() => {
    getAnalytics().then(({ reportsByCategory }) => {
      if (!reportsByCategory?.length) return;
      const colors = ['#10b981', '#06b6d4', '#f59e0b', '#ef4444', '#a855f7'];
      setPieData(reportsByCategory.map((item, index) => ({ name: item._id || 'Uncategorized', value: item.count, color: colors[index % colors.length] })));
    }).catch(() => {});
  }, []);

  const handleExportCSV = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      if (onNotification) {
        onNotification('Municipal ESG Circular Economy Report exported successfully!');
      }
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
            <BarChart3 className="w-3.5 h-3.5" /> Municipal Intelligence & Circular Economy
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Waste Material Flows & ESG Impact Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time tracking of circular economy revenue, bio-methanation energy generation, landfill diversion rates, and carbon offset credentials.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={downloading}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center gap-2 transition-all shadow-md self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          {downloading ? 'Compiling ESG Report...' : 'Export Municipal PDF/CSV'}
        </button>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Landfill Diversion Rate</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">88.4%</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12% YoY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Zero unsegregated dumps</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly MRF Revenue</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-cyan-400 font-mono">₹26.0 L</span>
            <span className="text-xs font-bold text-cyan-400">Recycled Sales</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">High-grade PET & Aluminium flakes</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Green Bio-CNG Generated</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-amber-400 font-mono">81,000</span>
            <span className="text-xs text-slate-400 font-mono">kWh Eqv.</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Powers 18 municipal garbage trucks</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Carbon Credits Earned</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-purple-400 font-mono">10.2 T</span>
            <span className="text-xs font-bold text-purple-400 font-mono">₹8.8 L Val.</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Verified Gold Standard ESG Offset</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: 24h Waste Generation Flow AreaChart (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                24-Hour Waste Inflow by Material Stream (Tons)
              </h3>
              <p className="text-xs text-slate-400">Comparing Wet Organic, Dry Recyclable, and Hazardous Streams</p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_WASTE_TRENDS}>
                <defs>
                  <linearGradient id="wetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="dryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" textAnchor="middle" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="wetOrganic" name="Wet / Organic" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#wetGrad)" />
                <Area type="monotone" dataKey="dryRecyclable" name="Dry Recyclables" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#dryGrad)" />
                <Area type="monotone" dataKey="hazardous" name="Hazardous / Medical" stroke="#ef4444" strokeWidth={2} fillOpacity={0.8} fill="#ef4444" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Waste Material Composition PieChart (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-cyan-400" />
                Material Recovery Distribution
              </h3>
              <p className="text-xs text-slate-400">Total 100% Segregated Breakdown</p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            {PIE_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-300 truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Chart 3: Monthly Revenue & Circular Economy Growth */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Circular Economy Monetization Growth (6 Months)
            </h3>
            <p className="text-xs text-slate-400">Monthly Plastic Sales Revenue & Organic Compost Yield (₹ Lakhs & Tons)</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            +110% MRF Revenue Growth
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={REVENUE_CIRCULAR_ECONOMY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="plasticSales" name="Plastic Resale (₹ Lakhs)" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="compostGenerated" name="Compost Yield (Tons)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="carbonCreditRevenue" name="Carbon Credits (₹ Lakhs)" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

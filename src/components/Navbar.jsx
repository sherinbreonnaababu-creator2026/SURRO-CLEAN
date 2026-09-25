import React, { useState } from 'react';
import { 
  Recycle, 
  ScanLine, 
  Radio, 
  Truck, 
  Users, 
  Sparkles, 
  BarChart3, 
  ShieldCheck, 
  Bell, 
  Info, 
  UserCheck,
  ChevronDown,
  Menu,
  X,
  Flame,
  HeartPulse,
  ClipboardList
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentRole, 
  setCurrentRole, 
  onOpenInfoModal,
  criticalAlertCount = 2,
  user,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles = [
    { id: 'admin', label: 'Municipal Admin Hub', icon: ShieldCheck, color: 'text-emerald-400' },
    { id: 'student', label: 'Student / Citizen Portal', icon: Users, color: 'text-cyan-400' },
    { id: 'cleaning_staff', label: 'Cleaning Staff Operations', icon: Truck, color: 'text-amber-400' },
  ];

  const navTabs = [
    { id: 'overview', label: 'Command Hub', icon: ShieldCheck },
    { id: 'ai-classifier', label: 'AI Segregator', icon: ScanLine, badge: 'AI Live' },
    { id: 'smart-bins', label: 'IoT Smart Bins', icon: Radio },
    { id: 'routes', label: 'Green Fleet & Routes', icon: Truck },
    { id: 'citizen', label: 'Citizen & Grievance', icon: Users },
    { id: 'dependent', label: 'Dependent Support', icon: HeartPulse },
    { id: 'sanitization', label: 'Public Sanitization', icon: Sparkles },
    { id: 'analytics', label: 'Circular Analytics', icon: BarChart3 },
    { id: 'tasks', label: 'Task Operations', icon: ClipboardList, roles: ['ADMIN', 'CLEANING_STAFF'] },
  ];
  const visibleNavTabs = navTabs.filter((tab) => !tab.roles || tab.roles.includes(user?.role));

  const currentRoleObj = roles.find(r => r.id === user?.role?.toLowerCase()) || roles[0];
  const CurrentRoleIcon = currentRoleObj.icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-xl">
      {/* Top Ticker / SIH Banner */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/90 border-b border-emerald-500/20 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">SIH ID 26195:</span>
            <span className="hidden sm:inline text-slate-300">AI Waste Segregation, Smart Disposal & Next-Gen Sanitization</span>
            <span className="sm:hidden text-slate-300">Smart Waste & Sanitization</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenInfoModal}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
            >
              <Info className="w-3.5 h-3.5" /> Problem Info
            </button>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>City Cleanliness Index: <strong className="text-emerald-400 font-mono">94.2%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Recycle className="w-5 h-5 text-emerald-400 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-white tracking-tight">EcoSanctuary</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">SMART INDIA HACKATHON 2024-26</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {visibleNavTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500 text-slate-950">
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Role Switcher & Alert Bell */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Role Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/70 hover:border-emerald-500/40 text-xs font-medium text-slate-200 transition-all shadow-sm"
              >
                <CurrentRoleIcon className={`w-4 h-4 ${currentRoleObj.color}`} />
                <span className="font-semibold">{user?.name || currentRoleObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div 
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 animate-fadeIn"
                >
                  <p className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Switch System Persona</p>
                  {roles.filter((role) => role.id === currentRoleObj.id).map((r) => {
                    const RoleIcon = r.icon;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          setCurrentRole(r.id);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          currentRole === r.id 
                            ? 'bg-emerald-500/15 text-emerald-400 font-bold' 
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <RoleIcon className={`w-4 h-4 ${r.color}`} />
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <button onClick={onLogout} className="text-xs font-semibold text-slate-400 hover:text-rose-300 transition-colors">Sign out</button>

            {/* Critical Alert Bell */}
            <button 
              onClick={() => setActiveTab('smart-bins')}
              title={`${criticalAlertCount} Active Smart Bin Alerts`}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {criticalAlertCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950">
                  {criticalAlertCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 p-4 space-y-2 animate-fadeIn">
          <p className="text-[10px] font-bold uppercase text-slate-500 px-2 tracking-wider">Navigation</p>
          <div className="grid grid-cols-1 gap-1">
            {visibleNavTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500 text-slate-950 font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800">
            <p className="text-[10px] font-bold uppercase text-slate-500 px-2 mb-2 tracking-wider">Persona Switcher</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setCurrentRole(r.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-2 rounded-lg text-xs text-left ${
                    currentRole === r.id ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

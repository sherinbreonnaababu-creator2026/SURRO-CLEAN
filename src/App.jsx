import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CommandCenter from './components/CommandCenter';
import AIClassifier from './components/AIClassifier';
import SmartBins from './components/SmartBins';
import RouteOptimizer from './components/RouteOptimizer';
import CitizenPortal from './components/CitizenPortal';
import SanitizationMonitor from './components/SanitizationMonitor';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import DependentSupport from './components/DependentSupport';
import ProblemStatementModal from './components/ProblemStatementModal';
import Footer from './components/Footer';
import TaskOperations from './components/TaskOperations';

import { 
  INITIAL_BINS, 
  FLEET_TRUCKS, 
  CITIZEN_GRIEVANCES, 
  SANITATION_FACILITIES 
} from './data/mockData';
import { Sparkles, X } from 'lucide-react';
import { apiFetch, clearSession, getCurrentUser } from './lib/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(undefined);
  const [currentRole, setCurrentRole] = useState('admin');
  const [bins, setBins] = useState(INITIAL_BINS);
  const [trucks, setTrucks] = useState(FLEET_TRUCKS);
  const [grievances, setGrievances] = useState(CITIZEN_GRIEVANCES);
  const [facilities, setFacilities] = useState(SANITATION_FACILITIES);
  const [tasks, setTasks] = useState([]);
  
  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);

  useEffect(() => {
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      if (currentUser) setCurrentRole(currentUser.role.toLowerCase());
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    apiFetch('/dashboard/overview').then((overview) => {
      if (overview.bins?.length) setBins(overview.bins);
      if (overview.trucks?.length) setTrucks(overview.trucks);
      if (overview.grievances?.length) setGrievances(overview.grievances);
      if (overview.facilities?.length) setFacilities(overview.facilities);
      if (overview.tasks) setTasks(overview.tasks);
    }).catch(() => {});
  }, [user]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleDispatchBin = (binId) => {
    showNotification(`Truck TRK-01 dispatched to empty ${binId}! Optimized route calculated.`);
    setActiveTab('routes');
  };

  const handleEarnPoints = (points) => {
    showNotification(`+${points} GreenPoints credited to Citizen Wallet! Streak protected.`);
  };

  const criticalCount = bins.filter(b => b.status === 'Critical' || b.fillLevel > 85).length;

  if (user === undefined) return null;
  if (!user) return <Login onLogin={(loggedInUser) => {
    setUser(loggedInUser);
    setCurrentRole(loggedInUser.role.toLowerCase());
  }} />;

  const handleLogout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* SIH Problem Statement Modal */}
      <ProblemStatementModal 
        isOpen={isProblemModalOpen} 
        onClose={() => setIsProblemModalOpen(false)} 
      />

      {/* Global Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-2xl bg-slate-900 border border-emerald-500/50 shadow-2xl shadow-emerald-500/20 text-slate-100 flex items-start gap-3 animate-fadeIn">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">Live Action Update</span>
            <p className="text-slate-200">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentRole={currentRole} 
        setCurrentRole={setCurrentRole} 
        onOpenInfoModal={() => setIsProblemModalOpen(true)}
        criticalAlertCount={criticalCount}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {activeTab === 'overview' && (
          <CommandCenter 
            onNavigate={setActiveTab}
            bins={bins}
            trucks={trucks}
            grievances={grievances}
            facilities={facilities}
            onOpenInfoModal={() => setIsProblemModalOpen(true)}
          />
        )}

        {activeTab === 'ai-classifier' && (
          <AIClassifier 
            onEarnPoints={handleEarnPoints} 
          />
        )}

        {activeTab === 'smart-bins' && (
          <SmartBins 
            bins={bins} 
            setBins={setBins} 
            onDispatchBin={handleDispatchBin} 
          />
        )}

        {activeTab === 'routes' && (
          <RouteOptimizer 
            bins={bins} 
            setBins={setBins} 
            onNotification={showNotification} 
          />
        )}

        {activeTab === 'citizen' && (
          <CitizenPortal 
            onEarnPoints={handleEarnPoints} 
          />
        )}

        {activeTab === 'dependent' && (
          <DependentSupport />
        )}

        {activeTab === 'sanitization' && (
          <SanitizationMonitor 
            onNotification={showNotification} 
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard 
            onNotification={showNotification} 
          />
        )}

        {activeTab === 'tasks' && (
          <TaskOperations
            user={user}
            tasks={tasks}
            setTasks={setTasks}
            onNotification={showNotification}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onOpenInfoModal={() => setIsProblemModalOpen(true)} />

    </div>
  );
}

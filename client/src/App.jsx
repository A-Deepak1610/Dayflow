import React, { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import EmployeeDashboard from './pages/EmployeeDashboard';

function App() {
  const [currentView, setCurrentView] = useState('employee-dashboard'); // 'home' | 'employee-dashboard' | 'leave' | 'attendance' | 'profile'

  const handleNavigate = (page) => {
    setCurrentView(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      {/* Quick View Switcher Bar (Demo) */}
      <div className="bg-[#1F2A52] text-white px-4 py-2 text-xs flex items-center justify-between border-b border-[#2A386C]">
        <div className="flex items-center gap-2 font-sora font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#FF5D7A]" />
          <span>Dayflow HRMS Demo Environment</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('employee-dashboard')}
            className={`px-3 py-1 rounded-md transition font-medium cursor-pointer ${
              currentView === 'employee-dashboard'
                ? 'bg-[#FF5D7A] text-white'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            Employee Dashboard View
          </button>
          <button
            onClick={() => setCurrentView('home')}
            className={`px-3 py-1 rounded-md transition font-medium cursor-pointer ${
              currentView === 'home'
                ? 'bg-[#FF5D7A] text-white'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            Landing Page View
          </button>
        </div>
      </div>

      {currentView === 'employee-dashboard' ? (
        <EmployeeDashboard onNavigate={handleNavigate} />
      ) : (
        <Home onNavigateToDashboard={() => setCurrentView('employee-dashboard')} />
      )}
    </MainLayout>
  );
}

export default App;

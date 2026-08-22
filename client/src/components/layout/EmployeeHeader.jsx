import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Clock, Moon, Settings, HelpCircle, Bell, Building, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const EmployeeHeader = ({ clockedIn, clockInTime, onToggleClock }) => {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split('/').pop();
  const pageTitleMap = {
    'dashboard': 'Dashboard',
    'attendance': 'My Attendance',
    'leaves': 'My Leaves & Applications',
    'payslips': 'My Payslips & Compensation'
  };

  const pageName = pageTitleMap[currentPath] || (currentPath ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1) : 'Dashboard');

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-3.5 flex items-center justify-between shadow-xs">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[13px] font-medium">
        <span className="text-[#888888] font-bold">Dayflow</span>
        <span className="text-[#888888]">&gt;</span>
        <span className="text-[#888888]">Employee Portal</span>
        <span className="text-[#888888]">&gt;</span>
        <span className="text-horilla-primary font-bold">{pageName}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Clock In / Out Toggle Button */}
        {onToggleClock && (
          <button
            onClick={onToggleClock}
            className={`px-4 py-1.5 font-semibold text-[13px] rounded-lg shadow-2xs cursor-pointer flex items-center gap-2 transition ${
              clockedIn
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{clockedIn ? `Checked In (${clockInTime || '08:58 AM'})` : 'Clock In Now'}</span>
          </button>
        )}

        {/* Header Icon Controls */}
        <div className="flex items-center gap-2.5">
          <button
            title="Toggle Dark Mode"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-horilla-primary-light hover:text-horilla-primary flex items-center justify-center cursor-pointer transition"
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            title="Settings"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-horilla-primary-light hover:text-horilla-primary flex items-center justify-center cursor-pointer transition"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            title="Help & Support"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-horilla-primary-light hover:text-horilla-primary flex items-center justify-center cursor-pointer transition"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
          <button
            title="Notifications"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-horilla-primary-light hover:text-horilla-primary flex items-center justify-center cursor-pointer transition relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 rounded-full bg-emerald-500 h-2 absolute top-0.5 right-0.5 border border-white" />
          </button>
        </div>

        {/* User Profile Summary */}
        <div className="flex items-center gap-3 ml-2 border-l border-slate-200 pl-4">
          <div className="w-9 h-9 rounded-full bg-[#1F2A52] text-white flex items-center justify-center font-bold text-xs shadow-sm relative">
            {user?.firstName?.[0] || 'E'}
            {user?.lastName?.[0] || 'M'}
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] font-bold text-[#333333] leading-tight">
              {user?.firstName || 'Jane'} {user?.lastName || 'Smith'}
            </p>
            <p className="text-[11px] text-[#888888] font-mono">{user?.loginId || 'DAY-EMP-2026'}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default EmployeeHeader;

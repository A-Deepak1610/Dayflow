import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const EmployeeHeader = ({ clockedIn, clockInTime, onToggleClock }) => {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split('/').pop();
  const pageTitleMap = {
    'dashboard': 'Dashboard Overview',
    'directory': 'Employee Directory',
    'attendance': 'My Attendance Records',
    'leaves': 'My Leaves & Applications',
    'payslips': 'My Payslips & Compensation'
  };

  const pageName = pageTitleMap[currentPath] || (currentPath ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1) : 'Dashboard');

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-6 py-3.5 flex items-center justify-between font-inter shadow-2xs">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="text-[#1F2A52] font-sora font-bold">Dayflow</span>
        <span>&gt;</span>
        <span className="text-[#E9573F] font-semibold">{pageName}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Clock In / Out Toggle Button */}
        {onToggleClock && (
          <button
            onClick={onToggleClock}
            className={`px-4 py-1.5 font-semibold text-xs rounded-xl shadow-2xs cursor-pointer flex items-center gap-2 transition ${
              clockedIn
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{clockedIn ? `Checked In (${clockInTime || '08:58 AM'})` : 'Clock In Now'}</span>
          </button>
        )}

        {/* Icon Group */}
        <div className="flex items-center gap-2">
          <button
            title="Notifications"
            className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:text-[#1F2A52] hover:bg-slate-200 flex items-center justify-center cursor-pointer transition relative"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1 right-1" />
          </button>
        </div>

        {/* User Profile Summary */}
        <div className="flex items-center gap-3 ml-2 border-l border-slate-200 pl-4">
          <div className="w-9 h-9 rounded-full bg-[#1F2A52] text-white flex items-center justify-center font-bold text-xs shadow-xs relative">
            {user?.firstName?.[0] || 'E'}
            {user?.lastName?.[0] || 'M'}
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-[#1F2A52] leading-tight">
              {user?.firstName || 'Jane'} {user?.lastName || 'Smith'}
            </p>
            <p className="text-[10px] text-slate-500 font-mono">{user?.loginId || 'DAY-EMP-2026'}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer ml-1"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default EmployeeHeader;

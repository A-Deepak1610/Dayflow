import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Moon, Settings, HelpCircle, Bell, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HrHeader = ({ onOpenAddModal }) => {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split('/').pop();
  const pageTitleMap = {
    'dashboard': 'Executive Overview',
    'employees': 'Employee Registry',
    'attendance': 'Attendance & Shifts',
    'leaves': 'Leave Approvals',
    'payroll': 'Payroll & Compensation',
    'performance': 'Performance Analytics',
    'helpdesk': 'Helpdesk & Support'
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
        <span className="text-[#888888]">HR Portal</span>
        <span className="text-[#888888]">&gt;</span>
        <span className="text-[#E9573F] font-bold">{pageName}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Onboarding Quick Action */}
        {onOpenAddModal && (
          <button
            onClick={onOpenAddModal}
            className="px-4 py-1.5 bg-[#E9573F] hover:bg-[#d64a32] text-white font-semibold text-[13px] rounded-lg shadow-2xs cursor-pointer flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Employee</span>
          </button>
        )}

        {/* Header Icon Controls */}
        <div className="flex items-center gap-2.5">
          <button
            title="Toggle Dark Mode"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition"
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            title="HR Settings"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            title="Help & Documentation"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
          <button
            title="Notifications"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 rounded-full bg-emerald-500 h-2 absolute top-0.5 right-0.5 border border-white" />
          </button>
        </div>

        {/* Admin User Profile Summary */}
        <div className="flex items-center gap-3 ml-2 border-l border-slate-200 pl-4">
          <div className="w-9 h-9 rounded-full bg-[#1F2A52] text-white flex items-center justify-center font-bold text-xs shadow-sm relative">
            {user?.firstName?.[0] || 'A'}
            {user?.lastName?.[0] || 'D'}
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] font-bold text-[#1F2A52] leading-tight">
              {user?.firstName || 'Alex'} {user?.lastName || 'Johnson'}
            </p>
            <p className="text-[11px] text-slate-400 font-mono">{user?.loginId || 'EMP1000'} • {user?.role || 'ADMIN'}</p>
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

export default HrHeader;

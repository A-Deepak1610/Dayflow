import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  HeadphonesIcon,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export const HrSidebar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/hr/dashboard', icon: LayoutDashboard },
    { label: 'Employees', path: '/hr/employees', icon: Users },
    { label: 'Attendance', path: '/hr/attendance', icon: Clock },
    { label: 'Leaves', path: '/hr/leaves', icon: Calendar },
    { label: 'Payroll', path: '/hr/payroll', icon: DollarSign },
    { label: 'Performance', path: '/hr/performance', icon: TrendingUp },
    { label: 'Helpdesk', path: '/hr/helpdesk', icon: HeadphonesIcon },
  ];

  if (!user) return null;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 z-30 flex flex-col font-inter shrink-0 justify-between">
      <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* Dayflow Brand Header */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-[#1F2A52] flex items-center justify-center font-sora font-bold text-[#E9573F] text-sm shadow-md">
            HR
          </div>
          <div>
            <h1 className="font-sora font-bold text-lg text-[#1F2A52] leading-tight">Dayflow</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-[#E9573F]" />
              <span className="text-[10px] font-bold text-[#E9573F] tracking-wider uppercase">HR Portal</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <div className="p-4 flex-1 overflow-y-auto space-y-1">
          <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider px-3 mt-2">
            HR Console
          </div>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E9573F]/10 text-[#E9573F] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#1F2A52]'
                  }`
                }
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer with User & Logout */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-3 mb-3 bg-slate-50 rounded-xl border border-slate-200">
          <div className="w-10 h-10 rounded-full bg-[#1F2A52] text-white flex items-center justify-center font-bold text-sm shadow-sm relative">
            {user?.firstName?.charAt(0) || 'A'}
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#1F2A52] truncate">
              {user?.firstName} {user?.lastName || ''}
            </p>
            <p className="text-[10px] text-slate-500 font-mono truncate">
              {user?.loginId || 'EMP1000'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default HrSidebar;

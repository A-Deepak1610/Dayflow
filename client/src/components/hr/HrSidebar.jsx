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
  Sparkles
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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 z-30 shrink-0 font-inter shadow-xs">
      <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* Brand Logo Header */}
        <div className="p-5 flex items-center gap-3 shrink-0 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#E9573F] text-white flex items-center justify-center font-sora font-extrabold text-sm shadow-md shadow-[#E9573F]/20">
            DF
          </div>
          <div>
            <p className="font-sora font-extrabold text-base text-[#1F2A52] leading-tight">Dayflow</p>
            <p className="text-[11px] text-[#E9573F] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> HR Admin Portal
            </p>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="p-4 flex-1 space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 mb-2 font-bold">Main Menu</p>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#E9573F] text-white shadow-sm font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#1F2A52]'
                  }`
                }
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer with User Profile & Logout */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="w-9 h-9 rounded-full bg-[#1F2A52] text-white flex items-center justify-center font-bold text-xs relative">
            {user?.firstName?.charAt(0) || 'A'}
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#1F2A52] truncate">
              {user?.firstName || 'Admin'} {user?.lastName || ''}
            </p>
            <p className="text-[10px] text-slate-500 font-mono truncate">
              {user?.loginId || 'EMP1000'} &bull; {user?.role || 'ADMIN'}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer border border-rose-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default HrSidebar;

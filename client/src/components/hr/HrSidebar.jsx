import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  CheckCircle2,
  XCircle,
  DollarSign,
  TrendingUp,
  HeadphonesIcon,
  LogOut,
  Sparkles
} from 'lucide-react';

export const HrSidebar = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/hr/dashboard', icon: LayoutDashboard },
    { label: 'Employee', path: '/hr/employees', icon: Users },
    { label: 'Attendance', path: '/hr/attendance', icon: CheckCircle2 },
    { label: 'Leave', path: '/hr/leaves', icon: XCircle },
    { label: 'Payroll', path: '/hr/payroll', icon: DollarSign },
    { label: 'Performance', path: '/hr/performance', icon: TrendingUp },
    { label: 'Helpdesk', path: '/hr/helpdesk', icon: HeadphonesIcon },
  ];

  return (
    <aside className="w-[260px] bg-[#0a0a0a] border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 z-30 shrink-0 font-inter">
      <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* Brand Logo Header */}
        <div className="px-6 py-5 flex items-center gap-3 shrink-0 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-[#FF5D7A] text-white flex items-center justify-center font-sora font-extrabold text-sm shadow-md shadow-[#FF5D7A]/20">
            DF
          </div>
          <div>
            <p className="font-sora font-extrabold text-base text-white leading-tight">Dayflow</p>
            <p className="text-[11px] text-[#FF5D7A] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> HR Admin Portal
            </p>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="px-3 py-6 flex-1 space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 mb-2">Main Menu</p>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#FF5D7A] text-white shadow-lg shadow-[#FF5D7A]/25'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer border border-rose-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Sidebar Footer with User & Logout */}
      <div className="p-4 border-t border-slate-100 shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-2 bg-slate-50 rounded-xl border border-slate-200">
          <div className="w-9 h-9 rounded-full bg-horilla-primary text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {user?.firstName?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#1F2A52] truncate">
              {user?.firstName || 'Admin'} {user?.lastName || ''}
            </p>
            <p className="text-[10px] text-slate-500 font-mono truncate">
              {user?.loginId || 'EMP1000'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-100 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default HrSidebar;

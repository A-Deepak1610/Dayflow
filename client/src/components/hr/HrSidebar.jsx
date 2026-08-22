import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarCheck,
  DollarSign,
  Building,
  LogOut,
  ChevronRight,
  ShieldCheck
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
    { label: 'Employees', path: '/hr/employees', icon: Users, badge: '48' },
    { label: 'Attendance', path: '/hr/attendance', icon: Clock, badge: 'Live' },
    { label: 'Leave Approvals', path: '/hr/leaves', icon: CalendarCheck, alert: '3' },
    { label: 'Payroll & Reports', path: '/hr/payroll', icon: DollarSign },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 z-30 shrink-0">
      
      <div>
        {/* Dayflow Logo Header */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1F2A52] flex items-center justify-center font-sora font-bold text-[#FF5D7A] text-base shadow-md">
            DF
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sora text-lg font-extrabold text-[#1F2A52] tracking-tight">
                Dayflow
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-[#FF5D7A] border border-rose-200">
                HR
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Enterprise HR Suite</p>
          </div>
        </div>

        {/* Workspace Pill */}
        <div className="mx-4 my-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <Building className="w-4 h-4 text-[#FF5D7A] shrink-0" />
            <div className="truncate">
              <p className="text-xs font-bold text-[#1F2A52] truncate">{user?.companyName || 'Dayflow Org'}</p>
              <p className="text-[10px] text-slate-500 font-mono">ID: DAY-ORG-2026</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="px-3 space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Main Management
          </p>

          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-sora text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1F2A52] text-white shadow-md shadow-[#1F2A52]/10'
                      : 'text-slate-600 hover:text-[#1F2A52] hover:bg-slate-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>

                {item.alert && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF5D7A] text-white">
                    {item.alert}
                  </span>
                )}
                {item.badge && !item.alert && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* HR Admin Bottom Profile Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#1F2A52] text-[#FF5D7A] font-bold text-xs flex items-center justify-center shrink-0">
              {user?.firstName?.[0] || 'H'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-[#1F2A52] truncate">{user?.firstName} {user?.lastName || 'Admin'}</p>
              <p className="text-[10px] text-slate-500 font-mono">{user?.loginId || 'DAY-HR-0001'}</p>
            </div>
          </div>
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-2 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 hover:text-rose-600 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
};

export default HrSidebar;

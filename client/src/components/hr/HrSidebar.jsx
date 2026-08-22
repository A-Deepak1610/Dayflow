import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  CheckCircle2,
  XCircle,
  DollarSign,
  Briefcase,
  UserPlus,
  UserMinus,
  TrendingUp,
  FolderKanban,
  MonitorSmartphone,
  HeadphonesIcon,
  Lock,
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
    { label: 'Employee', path: '/hr/employees', icon: Users },
    { label: 'Attendance', path: '/hr/attendance', icon: CheckCircle2 },
    { label: 'Leave', path: '/hr/leaves', icon: XCircle },
    { label: 'Payroll', path: '/hr/payroll', icon: DollarSign },
    // { label: 'Recruitment', path: '/hr/recruitment', icon: Briefcase },
    // { label: 'Onboarding', path: '/hr/onboarding', icon: UserPlus },
    // { label: 'Offboarding', path: '/hr/offboarding', icon: UserMinus },
    { label: 'Performance', path: '/hr/performance', icon: TrendingUp },
    // { label: 'Project', path: '/hr/project', icon: FolderKanban },
    // { label: 'Assets', path: '/hr/assets', icon: MonitorSmartphone },
    { label: 'Helpdesk', path: '/hr/helpdesk', icon: HeadphonesIcon },
  ];

  return (
    <aside className="w-[260px] bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 z-30 shrink-0">
      <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* Horilla Logo Header */}
        <div className="px-6 py-5 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center bg-slate-50 text-slate-700">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[15px] text-[#333333] leading-tight">Your Compa...</p>
            <p className="text-[11px] text-[#888888]">My Company</p>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="px-3 pb-6 flex-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 mb-1 rounded-xl text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'bg-horilla-primary text-white shadow-md shadow-red-500/20'
                      : 'text-[#666666] hover:bg-slate-50 hover:text-[#333333]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#888888]'}`} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default HrSidebar;

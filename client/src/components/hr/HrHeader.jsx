import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogIn, Moon, Settings, HelpCircle, Bell, Building, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HrHeader = () => {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split('/').pop();
  const pageName = currentPath ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1) : 'Dashboard';

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[14px] font-medium">
        <span className="text-[#888888] font-bold">Dayflow</span>
        <span className="text-[#888888]">&gt;</span>
        <span className="text-horilla-primary font-bold">{pageName}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Check In Button */}
        <button className="px-5 py-2 bg-[#E6F4EA] text-[#28A745] font-semibold text-[13px] rounded-lg shadow-sm cursor-pointer flex items-center gap-2 transition hover:bg-[#D4EDDA]">
          <LogIn className="w-4 h-4" />
          <span>Active Session</span>
        </button>

        {/* Icon Group */}
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-horilla-primary-light text-horilla-primary flex items-center justify-center cursor-pointer transition hover:bg-horilla-primary hover:text-white">
            <Moon className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-horilla-primary-light text-horilla-primary flex items-center justify-center cursor-pointer transition hover:bg-horilla-primary hover:text-white">
            <Settings className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-horilla-primary-light text-horilla-primary flex items-center justify-center cursor-pointer transition hover:bg-horilla-primary hover:text-white">
            <HelpCircle className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-horilla-primary-light text-horilla-primary flex items-center justify-center cursor-pointer transition hover:bg-horilla-primary hover:text-white relative">
            <Bell className="w-4 h-4" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28A745] absolute top-0 right-0 border-2 border-white" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 ml-2 border-l border-slate-200 pl-4">
          <div className="w-10 h-10 rounded-full bg-horilla-primary text-white flex items-center justify-center font-bold text-sm shadow-sm relative">
            {user?.firstName?.[0] || 'A'}
            {user?.lastName?.[0] || 'A'}
            <span className="w-3 h-3 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-white" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#333333] leading-tight">
              {user?.firstName || 'Adam'} {user?.lastName || 'Admin'}
            </p>
            <p className="text-[11px] text-[#888888] font-mono">{user?.loginId || 'EMP1000'}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HrHeader;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { LogIn, Moon, Settings, HelpCircle, Bell, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HrHeader = ({ onOpenAddModal }) => {
  const { user } = useAuth();
  const location = useLocation();

  const currentPath = location.pathname.split('/').pop();
  const pageName = currentPath ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1) : 'Dashboard';

  return (
    <header className="bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-20 px-6 py-3.5 flex items-center justify-between font-inter">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <span className="text-white font-sora font-bold">Dayflow HR</span>
        <span>&gt;</span>
        <span className="text-[#FF5D7A] font-semibold">{pageName}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Onboard Employee Button */}
        {onOpenAddModal && (
          <button
            onClick={onOpenAddModal}
            className="px-4 py-1.5 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-semibold text-xs rounded-xl shadow-md shadow-[#FF5D7A]/20 cursor-pointer flex items-center gap-2 transition"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Onboard Employee</span>
          </button>
        )}

        {/* Icon Group */}
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition">
            <Bell className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 ml-2 border-l border-white/10 pl-4">
          <div className="w-9 h-9 rounded-full bg-[#FF5D7A] text-white flex items-center justify-center font-bold text-xs shadow-sm relative">
            {user?.firstName?.[0] || 'A'}
            {user?.lastName?.[0] || 'A'}
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute bottom-0 right-0 border-2 border-[#0a0a0a]" />
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-tight">
              {user?.firstName || 'Adam'} {user?.lastName || 'Admin'}
            </p>
            <p className="text-[10px] text-slate-500 font-mono">HR Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HrHeader;

import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Bell, Activity, CheckCircle2 } from 'lucide-react';
import { checkServerHealth } from '../../services/api';

export const HrHeader = ({ title = 'HR Management Center', onOpenAddModal }) => {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      const res = await checkServerHealth();
      if (res.ok) setHealth(res.data);
    };
    fetchHealth();
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-3.5 flex items-center justify-between shadow-2xs">
      {/* Title & Page Header */}
      <div>
        <h2 className="font-sora text-xl font-extrabold text-[#1F2A52] tracking-tight">
          {title}
        </h2>
        <p className="text-xs text-slate-500">Dayflow HR Operations & Compliance</p>
      </div>

      {/* Center Global Search */}
      <div className="hidden md:flex items-center relative w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search employee, ID, department..."
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] placeholder-slate-400 focus:outline-none focus:border-[#FF5D7A] focus:bg-white transition"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Database Telemetry Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-mono text-slate-600">
          <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>DB:</span>
          <span className="font-semibold text-emerald-600">
            {health?.database?.status === 'connected' ? 'TiDB Connected' : 'Online'}
          </span>
        </div>

        {/* Quick Onboard Employee Action Button */}
        <button
          onClick={onOpenAddModal}
          className="px-4 py-2 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-bold text-xs rounded-xl shadow-md shadow-[#FF5D7A]/20 transition cursor-pointer flex items-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Onboard Employee</span>
        </button>

        {/* Notification Bell */}
        <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 relative cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-[#FF5D7A] absolute top-1.5 right-1.5 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
};

export default HrHeader;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  fetchEmployeeDashboardApi,
  clockInApi,
  clockOutApi,
  applyLeaveApi
} from '../../services/api';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import {
  Clock,
  Calendar,
  CheckCircle2,
  Plus,
  TrendingUp,
  FileText,
  Users,
  Sparkles,
  Award,
  Bell,
  X
} from 'lucide-react';

// Recharts Analytics
const WEEKLY_HOURS_DATA = [
  { day: 'Mon (17)', hours: 8.2, checkIn: '09:02 AM', checkOut: '05:44 PM', status: 'Present' },
  { day: 'Tue (18)', hours: 8.0, checkIn: '08:58 AM', checkOut: '05:30 PM', status: 'Present' },
  { day: 'Wed (19)', hours: 7.8, checkIn: '09:15 AM', checkOut: '05:33 PM', status: 'Present' },
  { day: 'Thu (20)', hours: 4.1, checkIn: '09:00 AM', checkOut: '01:06 PM', status: 'Half Day' },
  { day: 'Fri (21)', hours: 8.4, checkIn: '08:55 AM', checkOut: '06:05 PM', status: 'Present' },
  { day: 'Sat (22)', hours: 0.0, checkIn: '—', checkOut: '—', status: 'Weekend' },
  { day: 'Sun (23)', hours: 0.0, checkIn: '—', checkOut: '—', status: 'Weekend' }
];

const ATTENDANCE_DISTRIBUTION_DATA = [
  { name: 'Present', value: 18, color: '#10B981' },
  { name: 'Leave', value: 2, color: '#E9573F' },
  { name: 'Half Day', value: 1, color: '#3B82F6' },
  { name: 'Absent', value: 1, color: '#EF4444' }
];

const LEAVE_USAGE_DATA = [
  { name: 'Annual Leave', value: 8, color: '#E9573F' },
  { name: 'Sick Leave', value: 2, color: '#3B82F6' },
  { name: 'Casual Leave', value: 3, color: '#10B981' },
  { name: 'Comp Off', value: 1, color: '#8B5CF6' }
];

const WORKING_HOURS_TREND_DATA = [
  { date: '10 Aug', hours: 8.1 },
  { date: '11 Aug', hours: 8.4 },
  { date: '12 Aug', hours: 7.9 },
  { date: '13 Aug', hours: 8.0 },
  { date: '14 Aug', hours: 8.5 },
  { date: '17 Aug', hours: 8.2 },
  { date: '18 Aug', hours: 8.0 },
  { date: '19 Aug', hours: 7.8 },
  { date: '20 Aug', hours: 4.1 },
  { date: '21 Aug', hours: 8.4 },
  { date: '24 Aug', hours: 8.9 }
];

const CustomHoursTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white text-[#1F2A52] p-3 rounded-xl shadow-lg text-xs font-inter border border-slate-200 space-y-1">
        <p className="font-bold text-[#1F2A52]">{label}</p>
        <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100">
          <span className="text-slate-500">Status:</span>
          <span className={`font-bold ${data.status === 'Present' ? 'text-emerald-600' : 'text-amber-600'}`}>
            {data.status}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-500">Working Hours:</span>
          <span className="font-mono font-bold text-[#1F2A52]">{data.hours}h</span>
        </div>
      </div>
    );
  }
  return null;
};

export const EmployeeDashboard = () => {
  const { user } = useAuth();

  const employeeInfo = {
    fullName: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Jane Cooper',
    employeeId: user?.loginId || 'ACJS20260002',
    designation: 'Software Engineer',
    department: 'Engineering'
  };

  const [clockedIn, setClockedIn] = useState(true);
  const [clockInTime, setClockInTime] = useState('09:08 AM');
  const [elapsedSeconds, setElapsedSeconds] = useState(2 * 3600 + 15 * 60 + 20);
  const [toastMessage, setToastMessage] = useState(null);
  const [showQuickLeaveModal, setShowQuickLeaveModal] = useState(false);

  useEffect(() => {
    let timer;
    if (clockedIn) {
      timer = setInterval(() => setElapsedSeconds(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [clockedIn]);

  const formatElapsed = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins.toString().padStart(2, '0')}m`;
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleClock = async () => {
    if (clockedIn) {
      setClockedIn(false);
      showToast('Checked out successfully.');
    } else {
      const res = await clockInApi({ workMode: 'Office' });
      if (res.ok) {
        setClockedIn(true);
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setClockInTime(timeStr);
        setElapsedSeconds(0);
        showToast(`Checked in successfully at ${timeStr}.`);
      } else {
        showToast(res.data?.message || 'Failed to check in');
      }
    }
  };

  return (
    <div className="space-y-6 font-inter text-[#1F2A52] bg-[#F4F5F7] min-h-screen p-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-[#1F2A52] px-5 py-3 rounded-xl shadow-xl border border-slate-200 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F2A52] font-sora">
              Employee Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-200">
              Monday, 24 Aug 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {employeeInfo.fullName} • {employeeInfo.designation} • <span className="font-mono text-[#E9573F] font-semibold">{employeeInfo.employeeId}</span>
          </p>
        </div>

        {/* Compact Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowQuickLeaveModal(true)}
            className="px-4 py-2 bg-[#E9573F] hover:bg-[#d64a32] text-white text-xs font-sora font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Apply Leave</span>
          </button>

          <Link
            to="/employee/attendance"
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1.5 transition"
          >
            <Clock className="w-3.5 h-3.5 text-[#E9573F]" />
            <span>Attendance</span>
          </Link>

          <Link
            to="/employee/payslips"
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1.5 transition"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Payslip</span>
          </Link>
        </div>
      </div>

      {/* Top 5 Intelligent KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* KPI 1: Today's Attendance Session */}
        <div className="horilla-card p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Today's Session</span>
            <span className={`w-2 h-2 rounded-full ${clockedIn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-[#1F2A52] font-mono">
                {clockedIn ? formatElapsed(elapsedSeconds) : '00h 00m'}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">active</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {clockedIn ? `Checked In · ${clockInTime}` : 'Not Checked In'}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">09:00 – 18:00</span>
            <button
              onClick={handleToggleClock}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition ${
                clockedIn
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-[#E9573F] hover:bg-[#d64a32] text-white'
              }`}
            >
              {clockedIn ? 'Check Out' : 'Check In'}
            </button>
          </div>
        </div>

        {/* KPI 2: Attendance Rate */}
        <div className="horilla-card p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Attendance Rate</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              +3.2%
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-sora font-extrabold text-[#1F2A52]">92%</span>
              <span className="text-[10px] text-slate-500 font-semibold">This Month</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">18 present / 20 working days</p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-mono">Target: 90%</span>
            <Link to="/employee/attendance" className="font-bold text-[#E9573F] hover:underline">
              Logs &rarr;
            </Link>
          </div>
        </div>

        {/* KPI 3: Leave Balance */}
        <div className="horilla-card p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Leave Balance</span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              2 Pending
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-sora font-extrabold text-[#1F2A52]">12 days</span>
              <span className="text-[10px] text-slate-500 font-semibold">Available</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">14 of 28 allocated days used</p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-mono">Annual & Casual</span>
            <Link to="/employee/leaves" className="font-bold text-[#E9573F] hover:underline">
              Balances &rarr;
            </Link>
          </div>
        </div>

        {/* KPI 4: Current Net Pay */}
        <div className="horilla-card p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Current Net Pay</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Aug 2026
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold font-mono text-emerald-600">₹72,500</span>
              <span className="text-[10px] text-slate-500 font-semibold">Net Pay</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Gross: ₹80,000 • Deductions: -₹7,500</p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-mono">PDF Ready</span>
            <Link to="/employee/payslips" className="font-bold text-[#E9573F] hover:underline">
              View &rarr;
            </Link>
          </div>
        </div>

        {/* KPI 5: Upcoming Leave */}
        <div className="horilla-card p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Upcoming Leave</span>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
              Approved ✓
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-sora font-extrabold text-[#1F2A52]">25 Aug – 29 Aug</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">4 working days • Annual Leave</p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-mono">Holiday: 26 Aug</span>
            <Link to="/employee/leaves" className="font-bold text-[#E9573F] hover:underline">
              Calendar &rarr;
            </Link>
          </div>
        </div>

      </div>

      {/* Row 2: Attendance Overview & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Last 7 Days Working Hours Chart */}
        <div className="lg:col-span-2 horilla-card p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-sora font-bold text-[#1F2A52] text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E9573F]" />
                <span>Attendance Overview — Working Hours</span>
              </h3>
              <p className="text-xs text-slate-500">Last 7 days tracked shift duration against 8.0h threshold</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span>Avg: <strong className="text-[#1F2A52] font-mono">7h 42m</strong></span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                92% Attendance
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_HOURS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tickLine={false} />
                <Tooltip content={<CustomHoursTooltip />} />
                <ReferenceLine y={8} stroke="#E9573F" strokeDasharray="3 3" strokeWidth={1.5} />
                <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                  {WEEKLY_HOURS_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.hours >= 8 ? '#E9573F' : entry.hours > 0 ? '#3B82F6' : '#E2E8F0'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Attendance Distribution Donut Chart */}
        <div className="horilla-card p-5 flex flex-col justify-between space-y-3">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-sora font-bold text-[#1F2A52] text-sm">Attendance Distribution</h3>
            <p className="text-xs text-slate-500">August 2026 Monthly Breakdown (22 Days)</p>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ATTENDANCE_DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {ATTENDANCE_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-[#1F2A52] font-sora">92%</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Attendance</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            {ATTENDANCE_DISTRIBUTION_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </span>
                <span className="font-bold text-[#1F2A52] font-mono">{item.value}d</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 3: Leave Overview & Working Hours Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Leave Allocation Donut */}
        <div className="horilla-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-sora font-bold text-[#1F2A52] text-sm">Leave Overview & Balances</h3>
              <p className="text-xs text-slate-500">2026 Fiscal allocation vs availment</p>
            </div>
            <button
              onClick={() => setShowQuickLeaveModal(true)}
              className="text-xs font-bold text-[#E9573F] hover:underline cursor-pointer"
            >
              + Apply Leave
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="h-36 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={LEAVE_USAGE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={58}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {LEAVE_USAGE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-[#1F2A52]">14</span>
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Days Used</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between pb-1 border-b border-slate-100">
                <span className="text-slate-500">Total Allocated:</span>
                <span className="font-bold text-[#1F2A52]">28 days</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-100">
                <span className="text-slate-500">Used So Far:</span>
                <span className="font-bold text-slate-700">14 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Available Balance:</span>
                <span className="font-bold text-emerald-600">12 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Working Hours Trend Area Chart */}
        <div className="horilla-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-sora font-bold text-[#1F2A52] text-sm">Working Hours Trend</h3>
              <p className="text-xs text-slate-500">14-Day rolling time-log curve</p>
            </div>
            <span className="font-bold text-emerald-600 text-xs">+4.0% vs target</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WORKING_HOURS_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E9573F" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#E9573F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} domain={[0, 10]} ticks={[0, 4, 8, 10]} tickLine={false} />
                <Tooltip content={<CustomHoursTooltip />} />
                <Area type="monotone" dataKey="hours" stroke="#E9573F" strokeWidth={2} fillOpacity={1} fill="url(#hoursGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Quick Leave Modal */}
      {showQuickLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 font-inter">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-sora font-bold text-[#1F2A52] text-base">Quick Apply Leave</h3>
              <button onClick={() => setShowQuickLeaveModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); showToast('Leave request submitted.'); setShowQuickLeaveModal(false); }} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Leave Type</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[#1F2A52] focus:border-[#E9573F] outline-none">
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Start Date</label>
                  <input type="date" defaultValue="2026-09-02" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[#1F2A52] focus:border-[#E9573F] outline-none" />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">End Date</label>
                  <input type="date" defaultValue="2026-09-04" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[#1F2A52] focus:border-[#E9573F] outline-none" />
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-[#E9573F] hover:bg-[#d64a32] text-white font-sora font-bold rounded-xl transition cursor-pointer shadow-xs">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeDashboard;

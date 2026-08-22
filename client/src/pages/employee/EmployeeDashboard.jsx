import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import {
  Clock,
  Calendar,
  DollarSign,
  User,
  CheckCircle2,
  AlertCircle,
  Play,
  Square,
  Sparkles,
  Download,
  Building,
  ShieldCheck,
  Send,
  Plus,
  ArrowRight,
  TrendingUp,
  Briefcase,
  FileText,
  Activity,
  ChevronRight,
  X,
  Settings,
  RefreshCcw,
  CalendarDays,
  Bell,
  Check,
  CheckCheck,
  Users,
  Eye,
  Info,
  CalendarCheck,
  TrendingDown,
  ArrowUpRight,
  Sun,
  Flame,
  Award,
  Layers,
  Search
} from 'lucide-react';

// ============================================================================
// 1. RECHARTS DATASETS (MOCK ANALYTICS FOR JANE - ACJS20260002)
// ============================================================================

// Last 7 Days Working Hours Bar Data
const WEEKLY_HOURS_DATA = [
  { day: 'Mon (17)', hours: 8.2, checkIn: '09:02 AM', checkOut: '05:44 PM', status: 'Present', target: 8.0 },
  { day: 'Tue (18)', hours: 8.0, checkIn: '08:58 AM', checkOut: '05:30 PM', status: 'Present', target: 8.0 },
  { day: 'Wed (19)', hours: 7.8, checkIn: '09:15 AM', checkOut: '05:33 PM', status: 'Present', target: 8.0 },
  { day: 'Thu (20)', hours: 4.1, checkIn: '09:00 AM', checkOut: '01:06 PM', status: 'Half Day', target: 8.0 },
  { day: 'Fri (21)', hours: 8.4, checkIn: '08:55 AM', checkOut: '06:05 PM', status: 'Present', target: 8.0 },
  { day: 'Sat (22)', hours: 0.0, checkIn: '—', checkOut: '—', status: 'Weekend', target: 8.0 },
  { day: 'Sun (23)', hours: 0.0, checkIn: '—', checkOut: '—', status: 'Weekend', target: 8.0 }
];

// Attendance Distribution Donut Data
const ATTENDANCE_DISTRIBUTION_DATA = [
  { name: 'Present', value: 18, color: '#10B981' }, // Emerald
  { name: 'Leave', value: 2, color: '#4F46E5' },    // Indigo
  { name: 'Half Day', value: 1, color: '#3B82F6' }, // Blue
  { name: 'Absent', value: 1, color: '#EF4444' }    // Rose
];

// Leave Usage Donut Data
const LEAVE_USAGE_DATA = [
  { name: 'Annual Leave', value: 8, color: '#4F46E5', total: 20 },
  { name: 'Sick Leave', value: 2, color: '#3B82F6', total: 8 },
  { name: 'Casual Leave', value: 3, color: '#10B981', total: 7 },
  { name: 'Comp Off', value: 1, color: '#8B5CF6', total: 3 }
];

// 6-Month Net Pay Trend Data
const SALARY_TREND_DATA = [
  { month: 'Mar', gross: 75000, net: 68000 },
  { month: 'Apr', gross: 76000, net: 69000 },
  { month: 'May', gross: 78000, net: 70000 },
  { month: 'Jun', gross: 78000, net: 70000 },
  { month: 'Jul', gross: 80000, net: 72000 },
  { month: 'Aug', gross: 80000, net: 72500 }
];

// 14-Day Working Hours Trend (Area Chart)
const WORKING_HOURS_TREND_DATA = [
  { date: '10 Aug', hours: 8.1, target: 8.0 },
  { date: '11 Aug', hours: 8.4, target: 8.0 },
  { date: '12 Aug', hours: 7.9, target: 8.0 },
  { date: '13 Aug', hours: 8.0, target: 8.0 },
  { date: '14 Aug', hours: 8.5, target: 8.0 },
  { date: '17 Aug', hours: 8.2, target: 8.0 },
  { date: '18 Aug', hours: 8.0, target: 8.0 },
  { date: '19 Aug', hours: 7.8, target: 8.0 },
  { date: '20 Aug', hours: 4.1, target: 8.0 },
  { date: '21 Aug', hours: 8.4, target: 8.0 },
  { date: '24 Aug', hours: 8.9, target: 8.0 }
];

// Custom Tooltip for Weekly Hours Chart
const CustomHoursTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1F2A52] text-white p-3 rounded-xl shadow-xl text-xs font-inter border border-slate-700 space-y-1">
        <p className="font-bold text-slate-200">{label}</p>
        <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-600/60">
          <span className="text-slate-400">Status:</span>
          <span className={`font-bold ${data.status === 'Present' ? 'text-emerald-400' : data.status === 'Half Day' ? 'text-blue-400' : 'text-slate-300'}`}>
            {data.status}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Working Hours:</span>
          <span className="font-mono font-bold text-white">{data.hours > 0 ? `${data.hours}h` : '0h'}</span>
        </div>
        {data.hours > 0 && (
          <>
            <div className="flex items-center justify-between gap-4 text-[11px]">
              <span className="text-slate-400">Check-in:</span>
              <span className="font-mono text-slate-200">{data.checkIn}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[11px]">
              <span className="text-slate-400">Check-out:</span>
              <span className="font-mono text-slate-200">{data.checkOut}</span>
            </div>
          </>
        )}
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Salary Trend
const CustomSalaryTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const net = payload[0].value;
    return (
      <div className="bg-[#1F2A52] text-white p-2.5 rounded-xl shadow-xl text-xs font-inter border border-slate-700">
        <span className="text-slate-400 block">{label} 2026</span>
        <span className="font-bold text-emerald-400 font-mono text-sm">
          Net Pay: ₹{net.toLocaleString('en-IN')}
        </span>
      </div>
    );
  }
  return null;
};

export const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Employee Identity (Jane / ACJS20260002)
  const employeeInfo = {
    name: user?.firstName || 'Jane',
    fullName: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Jane Cooper',
    employeeId: user?.loginId || 'ACJS20260002',
    designation: 'Software Engineer',
    department: 'Engineering'
  };

  // Clock In / Out Live State
  const [clockedIn, setClockedIn] = useState(true);
  const [clockInTime, setClockInTime] = useState('09:08 AM');
  const [elapsedSeconds, setElapsedSeconds] = useState(2 * 3600 + 15 * 60 + 20); // 2h 15m
  const [toastMessage, setToastMessage] = useState(null);

  // Quick Apply Leave Modal State
  const [showQuickLeaveModal, setShowQuickLeaveModal] = useState(false);
  const [quickLeaveType, setQuickLeaveType] = useState('Annual Leave');
  const [quickStartDate, setQuickStartDate] = useState('2026-09-02');
  const [quickEndDate, setQuickEndDate] = useState('2026-09-04');
  const [quickReason, setQuickReason] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // Notifications State (Interactive Dismissal)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Leave Request Approved',
      description: 'Your annual leave request for 25 Aug – 29 Aug has been approved by Sarah Williams.',
      time: 'Today · 10:32 AM',
      unread: true,
      link: '/employee/leaves'
    },
    {
      id: 2,
      title: 'August Payslip Available',
      description: 'Your August 2026 salary slip (Net: ₹72,500) has been processed and is ready for download.',
      time: 'Yesterday',
      unread: true,
      link: '/employee/payslips'
    },
    {
      id: 3,
      title: 'Attendance Reminder',
      description: "Don't forget to check out before leaving. Target schedule: 09:00 AM – 06:00 PM.",
      time: 'Today · 09:08 AM',
      unread: false,
      link: '/employee/attendance'
    }
  ]);

  // Live Timer Effect
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

  // Check In / Check Out Handler
  const handleToggleClock = () => {
    if (clockedIn) {
      setClockedIn(false);
      showToast('Checked out successfully. Today’s attendance session recorded.');
    } else {
      setClockedIn(true);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setClockInTime(timeStr);
      showToast(`Checked in successfully at ${timeStr}.`);
    }
  };

  // Quick Apply Leave Submit
  const handleQuickLeaveSubmit = (e) => {
    e.preventDefault();
    setLeaveSubmitted(true);
    showToast('Leave request submitted to your manager.');
    setTimeout(() => {
      setLeaveSubmitted(false);
      setShowQuickLeaveModal(false);
      setQuickReason('');
    }, 1200);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('All notifications marked as read.');
  };

  return (
    <div className="space-y-6 font-inter text-slate-900 animate-fade-in">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2A52] text-white px-5 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 1. COMPACT TOP ACTION BAR (No Big Hero / Welcome Card)               */}
      {/* ==================================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-1 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F2A52] tracking-tight font-sora">
              Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200/80 text-slate-700">
              Monday, 24 August 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {employeeInfo.fullName} • {employeeInfo.designation} ({employeeInfo.department}) • <span className="font-mono text-indigo-600 font-semibold">{employeeInfo.employeeId}</span>
          </p>
        </div>

        {/* Compact Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowQuickLeaveModal(true)}
            className="px-3.5 py-1.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Apply Leave</span>
          </button>

          <Link
            to="/employee/attendance"
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 transition"
          >
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Attendance</span>
          </Link>

          <Link
            to="/employee/payslips"
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 transition"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Payslip</span>
          </Link>

          <Link
            to="/employee/directory"
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 transition"
          >
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>Directory</span>
          </Link>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. TOP 5 INTELLIGENT KPI CARDS ROW                                   */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* KPI 1: Today's Attendance Session */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-2 hover:border-slate-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Today's Attendance</span>
            <span className={`w-2 h-2 rounded-full ${clockedIn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-[#1F2A52] font-mono">
                {clockedIn ? formatElapsed(elapsedSeconds) : '00h 00m'}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">session</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {clockedIn ? `Checked In · ${clockInTime}` : 'Not Checked In'}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">09:00 – 18:00</span>
            <button
              onClick={handleToggleClock}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition ${
                clockedIn
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  : 'bg-horilla-primary hover:bg-horilla-primary-hover text-white'
              }`}
            >
              {clockedIn ? 'Check Out' : 'Check In'}
            </button>
          </div>
        </div>

        {/* KPI 2: Attendance Rate */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-2 hover:border-slate-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attendance Rate</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +3.2%
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-[#1F2A52]">92%</span>
              <span className="text-[10px] text-slate-400 font-semibold">This Month</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">18 present / 20 working days</p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Target: 90%</span>
            <Link to="/employee/attendance" className="font-bold text-horilla-primary hover:underline">
              Logs &rarr;
            </Link>
          </div>
        </div>

        {/* KPI 3: Leave Balance */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-2 hover:border-slate-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Leave Balance</span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              2 Pending
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-[#1F2A52]">12 days</span>
              <span className="text-[10px] text-slate-400 font-semibold">Available</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">14 of 28 allocated days used</p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Annual & Casual</span>
            <Link to="/employee/leaves" className="font-bold text-horilla-primary hover:underline">
              Balances &rarr;
            </Link>
          </div>
        </div>

        {/* KPI 4: Current Net Pay */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-2 hover:border-slate-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Net Pay</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              August 2026
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold font-mono text-emerald-700">₹72,500</span>
              <span className="text-[10px] text-slate-400 font-semibold">Net Pay</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Gross: ₹80,000 • Deductions: -₹7,500</p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Payslip Available</span>
            <Link to="/employee/payslips" className="font-bold text-horilla-primary hover:underline">
              View &rarr;
            </Link>
          </div>
        </div>

        {/* KPI 5: Upcoming Leave */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-2 hover:border-slate-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Upcoming Leave</span>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
              Approved ✓
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-[#1F2A52]">25 Aug – 29 Aug</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">4 working days • Annual Leave</p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Holiday: 26 Aug</span>
            <Link to="/employee/leaves" className="font-bold text-horilla-primary hover:underline">
              Calendar &rarr;
            </Link>
          </div>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* 3. ROW 2: ATTENDANCE ANALYTICS (BAR CHART & DONUT DISTRIBUTION)       */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Last 7 Days Working Hours Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-[#1F2A52] text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Attendance Overview — Working Hours</span>
              </h3>
              <p className="text-xs text-slate-500">Last 7 days tracked shift duration against 8.0h threshold</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span>Avg: <strong className="text-slate-900 font-mono">7h 42m</strong></span>
              <span>Target: <strong className="text-slate-900 font-mono">8.0h</strong></span>
              <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                92% Attendance
              </span>
            </div>
          </div>

          {/* Interactive Recharts Bar Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_HOURS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tickLine={false} />
                <Tooltip content={<CustomHoursTooltip />} />
                <ReferenceLine y={8} stroke="#4F46E5" strokeDasharray="3 3" strokeWidth={1.5} label={{ value: 'Target 8h', fill: '#4F46E5', fontSize: 10, position: 'right' }} />
                <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                  {WEEKLY_HOURS_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.hours >= 8 ? '#4F46E5' : entry.hours > 0 ? '#3B82F6' : '#CBD5E1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span className="text-[11px]">💡 Hover over any bar to view exact check-in, check-out, and duration logs.</span>
            <Link to="/employee/attendance" className="font-bold text-horilla-primary hover:underline">
              View Full Attendance &rarr;
            </Link>
          </div>
        </div>

        {/* Right: Attendance Distribution Donut Chart (1 Col) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-3">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-bold text-[#1F2A52] text-sm">Attendance Distribution</h3>
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
                  animationDuration={800}
                >
                  {ATTENDANCE_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-[#1F2A52] font-sora">92%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendance</span>
            </div>
          </div>

          {/* Clean Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            {ATTENDANCE_DISTRIBUTION_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100">
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

      {/* ==================================================================== */}
      {/* 4. ROW 3: HEATMAP ACTIVITY & WORKING HOURS TREND (AREA CHART)        */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Monthly Attendance Heatmap Activity */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-[#1F2A52] text-sm">Attendance Activity Heatmap</h3>
              <p className="text-xs text-slate-500">August 2026 daily presence matrix</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              August 2026
            </span>
          </div>

          {/* 31-Day Heatmap Grid */}
          <div className="space-y-2">
            <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold text-slate-400 uppercase py-1">
              <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {/* Pad Aug 1 start */}
              {[1, 2, 3, 4, 5].map(p => (
                <div key={`p-${p}`} className="h-9 rounded-lg bg-slate-50/50 border border-dashed border-slate-100" />
              ))}

              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isWeekend = (5 + day) % 7 === 5 || (5 + day) % 7 === 6;
                const isHoliday = day === 15 || day === 26 || day === 31;
                const isPendingLeave = day >= 25 && day <= 29;
                const isHalfDay = day === 20;
                const isAbsent = day === 6;
                const isPresent = !isWeekend && !isHoliday && !isPendingLeave && !isHalfDay && !isAbsent;

                return (
                  <div
                    key={day}
                    title={`${day} Aug 2026: ${isPresent ? 'Present (8.5h)' : isPendingLeave ? 'Approved Leave' : isHoliday ? 'Company Holiday' : isWeekend ? 'Weekend' : 'Half Day'}`}
                    className={`h-9 rounded-lg border flex flex-col items-center justify-center text-[11px] font-semibold transition cursor-pointer ${
                      day === 24
                        ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-300 font-bold'
                        : isPendingLeave
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : isHoliday
                        ? 'bg-purple-100 text-purple-800 border-purple-300'
                        : isHalfDay
                        ? 'bg-blue-100 text-blue-800 border-blue-300'
                        : isAbsent
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : isWeekend
                        ? 'bg-slate-100 text-slate-400 border-slate-200'
                        : 'bg-emerald-100/70 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                    }`}
                  >
                    <span>{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-400" /> Present</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-400" /> Half Day</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-400" /> Leave</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-purple-400" /> Holiday</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-300" /> Weekend</span>
          </div>
        </div>

        {/* Right: Working Hours Trend Area Chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-[#1F2A52] text-sm">Working Hours Trend</h3>
              <p className="text-xs text-slate-500">14-Day rolling time-log curve</p>
            </div>
            <div className="text-right text-xs">
              <span className="font-bold text-emerald-600 block">+4.0% vs target</span>
            </div>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WORKING_HOURS_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} domain={[0, 10]} ticks={[0, 4, 8, 10]} tickLine={false} />
                <Tooltip content={<CustomHoursTooltip />} />
                <ReferenceLine y={8} stroke="#10B981" strokeDasharray="2 2" strokeWidth={1} label={{ value: '8h Target', fill: '#10B981', fontSize: 9, position: 'right' }} />
                <Area type="monotone" dataKey="hours" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#hoursGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span><strong>Data Insight:</strong> Your average working hours (7h 42m) are 4% above your monthly target.</span>
          </div>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* 5. ROW 4: LEAVE ANALYTICS & PAYROLL 6-MONTH TREND                   */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Leave Analytics & Mini Cards */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-[#1F2A52] text-sm">Leave Overview & Balances</h3>
              <p className="text-xs text-slate-500">2026 Fiscal allocation vs availment</p>
            </div>
            <button
              onClick={() => setShowQuickLeaveModal(true)}
              className="text-xs font-bold text-horilla-primary hover:underline cursor-pointer"
            >
              + Apply Leave
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Leave Donut */}
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
                <span className="text-[9px] font-bold text-slate-400 uppercase">Days Used</span>
              </div>
            </div>

            {/* Leave Stats Summary */}
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between pb-1 border-b border-slate-100">
                <span className="text-slate-500">Total Allocated:</span>
                <span className="font-bold text-[#1F2A52]">28 days</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-100">
                <span className="text-slate-500">Used So Far:</span>
                <span className="font-bold text-slate-800">14 days</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-100">
                <span className="text-slate-500">Pending Approvals:</span>
                <span className="font-bold text-amber-600">2 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Available Balance:</span>
                <span className="font-bold text-emerald-700">12 days</span>
              </div>
            </div>
          </div>

          {/* Mini Cards Grid */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[9px] text-slate-400 font-bold block uppercase">Annual</span>
              <span className="font-bold text-indigo-700">12d avail</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[9px] text-slate-400 font-bold block uppercase">Sick</span>
              <span className="font-bold text-blue-700">6d avail</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[9px] text-slate-400 font-bold block uppercase">Casual</span>
              <span className="font-bold text-emerald-700">4d avail</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[9px] text-slate-400 font-bold block uppercase">Comp Off</span>
              <span className="font-bold text-purple-700">2d avail</span>
            </div>
          </div>
        </div>

        {/* Right: Payroll Snapshot & 6-Month Net Pay Trend */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-[#1F2A52] text-sm">Payroll Snapshot & Salary Trend</h3>
              <p className="text-xs text-slate-500">August 2026 Statement • 6-Month Net Trajectory</p>
            </div>
            <Link to="/employee/payslips" className="text-xs font-bold text-horilla-primary hover:underline">
              View Payslip &rarr;
            </Link>
          </div>

          {/* Statement Highlight Bar */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Gross Pay</span>
              <span className="font-mono font-bold text-[#1F2A52]">₹80,000</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Deductions</span>
              <span className="font-mono font-bold text-rose-600">-₹7,500</span>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="text-[10px] text-emerald-800 uppercase font-bold block">Net Take-Home</span>
              <span className="font-mono font-bold text-emerald-700">₹72,500</span>
            </div>
          </div>

          {/* 6-Month Salary Trend Line Chart */}
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SALARY_TREND_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} domain={[60000, 80000]} ticks={[65000, 70000, 75000]} tickLine={false} />
                <Tooltip content={<CustomSalaryTooltip />} />
                <Line type="monotone" dataKey="net" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-[11px]">Disbursed to HDFC Bank (•••• 8842)</span>
            <span className="text-[11px] font-bold text-emerald-600">✓ Status: Processed</span>
          </div>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* 6. ROW 5: RECENT ACTIVITY, NOTIFICATIONS & SMART INSIGHTS            */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Box 1: Recent Activity Timeline */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-[#1F2A52] text-sm flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-slate-400" />
              <span>Recent Activity</span>
            </h3>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Timeline</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { title: 'Leave request approved', desc: 'Annual Leave (25–29 Aug)', time: 'Today · 10:32 AM', color: 'bg-emerald-500' },
              { title: 'Payslip generated', desc: 'August 2026 Salary Slip', time: 'Yesterday', color: 'bg-blue-500' },
              { title: 'Attendance recorded', desc: 'Check-in verified at 09:08 AM', time: '24 Aug · 09:08 AM', color: 'bg-indigo-500' },
              { title: 'Leave request submitted', desc: 'Casual Leave (1 day)', time: '22 Aug', color: 'bg-slate-400' }
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${act.color}`} />
                <div className="flex-1">
                  <p className="font-bold text-slate-800 leading-tight">{act.title}</p>
                  <p className="text-[11px] text-slate-500">{act.desc}</p>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Box 2: Notifications & Alerts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-horilla-primary" />
                <h3 className="font-bold text-[#1F2A52] text-sm">Notifications</h3>
              </div>
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold text-horilla-primary hover:underline cursor-pointer"
              >
                Mark Read
              </button>
            </div>

            <div className="space-y-2 pt-2">
              {notifications.map(n => (
                <div
                  key={n.id}
                  className={`p-2.5 rounded-lg border text-xs space-y-0.5 transition ${
                    n.unread ? 'bg-indigo-50/40 border-indigo-200' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1F2A52]">{n.title}</span>
                    <span className="text-[9px] text-slate-400 font-mono">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{n.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-right">
            <Link to="/employee/leaves" className="text-xs font-bold text-horilla-primary hover:underline">
              View All Alerts &rarr;
            </Link>
          </div>
        </div>

        {/* Box 3: Smart Insights & Upcoming Holidays */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-[#1F2A52] text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Smart Work Insights</span>
            </h3>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Active</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Your attendance rate improved by <strong>3.2%</strong> this month.</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>Your average working time is <strong>7h 42m</strong> per shift.</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
              <span>You have <strong>12 days</strong> of paid leave balance remaining.</span>
            </div>

            <div className="p-2.5 bg-purple-50 rounded-lg border border-purple-200 flex items-start gap-2 text-purple-900">
              <Sun className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
              <span>Upcoming Holiday: <strong>26 Aug (Janmashtami)</strong> & <strong>31 Aug</strong>.</span>
            </div>
          </div>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* 7. QUICK APPLY LEAVE MODAL                                           */}
      {/* ==================================================================== */}
      {showQuickLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-[#1F2A52] text-[16px]">Quick Apply for Leave</h3>
              <button
                onClick={() => setShowQuickLeaveModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {leaveSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold text-center">
                ✓ Leave request submitted to your manager!
              </div>
            ) : (
              <form onSubmit={handleQuickLeaveSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Leave Category</label>
                  <select
                    value={quickLeaveType}
                    onChange={e => setQuickLeaveType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-horilla-primary"
                  >
                    <option>Annual Leave</option>
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Compensatory Off</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={quickStartDate}
                      onChange={e => setQuickStartDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-horilla-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={quickEndDate}
                      onChange={e => setQuickEndDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-horilla-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reason for Time-Off</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Brief explanation for your manager..."
                    value={quickReason}
                    onChange={e => setQuickReason(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-horilla-primary"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <Link
                    to="/employee/leaves"
                    onClick={() => setShowQuickLeaveModal(false)}
                    className="text-xs font-bold text-horilla-primary hover:underline"
                  >
                    Full Leave Form &rarr;
                  </Link>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowQuickLeaveModal(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeDashboard;

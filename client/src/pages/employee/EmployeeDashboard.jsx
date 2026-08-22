import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Calendar,
  DollarSign,
  User,
  LogOut,
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
  CalendarDays
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

export const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeDateFilter, setActiveDateFilter] = useState('This Month');

  // Clock In / Out Live State
  const [clockedIn, setClockedIn] = useState(true);
  const [clockInTime, setClockInTime] = useState('08:58 AM');
  const [elapsedSeconds, setElapsedSeconds] = useState(7 * 3600 + 14 * 60 + 22);

  // Leave Form Modal
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Annual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // My Leave Applications State
  const [myLeaves, setMyLeaves] = useState([
    { id: 1, type: 'Annual Leave', dates: 'Aug 28 - Aug 30, 2026', days: 3, status: 'Pending', reason: 'Family vacation travel' },
    { id: 2, type: 'Casual Leave', dates: 'Jul 14, 2026', days: 1, status: 'Approved', reason: 'Medical appointment' },
    { id: 3, type: 'Sick Leave', dates: 'Jun 02, 2026', days: 1, status: 'Approved', reason: 'High fever rest' }
  ]);

  // Attendance Chart Mock Data
  const weeklyAttendanceChart = [
    { day: 'Mon 17', hours: 8.9, status: 'Present' },
    { day: 'Tue 18', hours: 9.1, status: 'Present' },
    { day: 'Wed 19', hours: 8.8, status: 'Present' },
    { day: 'Thu 20', hours: 9.0, status: 'Present' },
    { day: 'Fri 21', hours: 8.9, status: 'Present' },
  ];

  // Timer Tick
  useEffect(() => {
    let timer;
    if (clockedIn) {
      timer = setInterval(() => setElapsedSeconds(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [clockedIn]);

  const formatElapsedTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleClock = () => {
    if (clockedIn) {
      setClockedIn(false);
    } else {
      setClockedIn(true);
      setClockInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleApplyLeaveSubmit = (e) => {
    e.preventDefault();
    const newReq = {
      id: Date.now(),
      type: leaveType,
      dates: `${startDate} to ${endDate}`,
      days: 2,
      status: 'Pending',
      reason: leaveReason || 'Personal request'
    };
    setMyLeaves([newReq, ...myLeaves]);
    setLeaveSubmitted(true);
    setTimeout(() => {
      setLeaveSubmitted(false);
      setShowLeaveModal(false);
      setStartDate('');
      setEndDate('');
      setLeaveReason('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls Bar matching HR Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">Employee Dashboard</h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Welcome back, <strong className="text-[#333333]">{user?.firstName || 'Jane'} {user?.lastName || 'Smith'}</strong> ({user?.loginId || 'DAY-EMP-2026-0042'})
          </p>
        </div>

        {/* Filter Pills & Date Range */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
            {['This Month', 'Last Month', 'Quarter'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveDateFilter(filter)}
                className={`px-3.5 py-1.5 text-[12px] font-medium transition cursor-pointer ${
                  activeDateFilter === filter
                    ? 'bg-horilla-primary text-white font-bold'
                    : 'bg-white text-[#666666] hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 hidden sm:flex">
            <input type="date" defaultValue="2026-08-01" className="px-2.5 py-1.5 text-[12px] border border-slate-200 rounded-lg text-[#666666] bg-white shadow-xs outline-none" />
            <span className="text-[#888888] text-xs">→</span>
            <input type="date" defaultValue="2026-08-31" className="px-2.5 py-1.5 text-[12px] border border-slate-200 rounded-lg text-[#666666] bg-white shadow-xs outline-none" />
          </div>

          <button
            onClick={() => setShowLeaveModal(true)}
            className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-[13px] font-semibold rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition"
          >
            <Plus className="w-4 h-4" />
            <span>Apply for Leave</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards (Matching Horilla HR Cards style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Present Days */}
        <div className="horilla-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#E6F4EA] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              100% On-time
            </span>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Days Present</p>
            <h3 className="text-[26px] font-extrabold text-[#333333] mt-1 leading-none">19 / 22</h3>
            <p className="text-[12px] text-[#A0A0A0] mt-2">August 2026 attendance</p>
          </div>
        </div>

        {/* KPI 2: Paid Leave Balance */}
        <div className="horilla-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              6 Sick Remaining
            </span>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Paid Leave Balance</p>
            <h3 className="text-[26px] font-extrabold text-[#333333] mt-1 leading-none">12 Days</h3>
            <p className="text-[12px] text-[#A0A0A0] mt-2">Available for 2026 policy</p>
          </div>
        </div>

        {/* KPI 3: Total Shift Hours */}
        <div className="horilla-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#FCECE9] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#E9573F]" />
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              +4.2 hrs OT
            </span>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Total Hours Logged</p>
            <h3 className="text-[26px] font-extrabold text-[#333333] mt-1 leading-none">154.5 hrs</h3>
            <p className="text-[12px] text-[#A0A0A0] mt-2">Avg 7h 42m shift duration</p>
          </div>
        </div>

        {/* KPI 4: Latest Net Salary */}
        <div className="horilla-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#9333EA]" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Paid Aug 25
            </span>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">August Net Salary</p>
            <h3 className="text-[26px] font-extrabold text-[#333333] mt-1 leading-none">$4,580.00</h3>
            <p className="text-[12px] text-[#A0A0A0] mt-2">PDF Payslip ready for download</p>
          </div>
        </div>

      </div>

      {/* Main Grid Content Split: Left (2 Cols) & Right Sidebar Widget (1 Col) */}
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Left Column (Main Charts & Data Tables) */}
        <div className="flex-1 space-y-6">
          
          {/* 1. Weekly Shift & Attendance Chart Card */}
          <div className="horilla-card horilla-card-gradient-top-orange-purple p-5 flex flex-col h-80">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-[15px] font-bold text-[#333333]">My Weekly Work Hours</h3>
                <p className="text-[12px] text-[#888888]">Shift log for current cycle (Mon 17 – Fri 21)</p>
              </div>
              <Link to="/employee/attendance" className="text-[12px] font-bold text-horilla-primary hover:underline flex items-center gap-1">
                <span>View Full Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex-1 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyAttendanceChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                  <Bar dataKey="hours" name="Shift Hours" fill="#9333EA" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. My Recent Leave Applications Card */}
          <div className="horilla-card horilla-card-gradient-top-red-orange p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[15px] font-bold text-[#333333]">My Leave Applications</h3>
                <p className="text-[12px] text-[#888888]">Track HR approval status for your time-off requests</p>
              </div>
              <button
                onClick={() => setShowLeaveModal(true)}
                className="text-[12px] font-bold text-horilla-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Request</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[#888888] font-bold bg-slate-50 uppercase text-[10px]">
                    <th className="py-2.5 px-3">LEAVE TYPE</th>
                    <th className="py-2.5 px-3">DATES</th>
                    <th className="py-2.5 px-3">DURATION</th>
                    <th className="py-2.5 px-3">REASON</th>
                    <th className="py-2.5 px-3 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myLeaves.map(leave => (
                    <tr key={leave.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3">
                        <span className="font-bold text-[#333333] block">{leave.type}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium text-[12px]">{leave.dates}</td>
                      <td className="py-3 px-3 font-mono font-semibold text-slate-700">{leave.days} day(s)</td>
                      <td className="py-3 px-3 text-slate-500 italic text-[12px]">{leave.reason}</td>
                      <td className="py-3 px-3 text-right">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-block border ${
                          leave.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : leave.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 border-t border-slate-100 text-right">
              <Link to="/employee/leaves" className="text-[12px] font-bold text-horilla-primary hover:underline inline-flex items-center gap-1">
                <span>View Complete Leave Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <h1 className="font-sora text-2xl sm:text-4xl font-extrabold tracking-tight">
              Hello, {user?.firstName || 'Team Member'}!
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Your Login ID: <span className="font-mono text-[#FF5D7A] font-bold">{user?.loginId || 'DAY-SJ-2026-0042'}</span>
            </p>

            {/* Quick Navigation Links */}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <Link
                to="/employee/attendance"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>My Attendance Timesheet &rarr;</span>
              </Link>
              <Link
                to="/employee/leaves"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>My Leaves &rarr;</span>
              </Link>
              <Link
                to="/employee/payslips"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition flex items-center gap-1.5"
              >
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>My Payslips &rarr;</span>
              </Link>
            </div>
          </div>

          {/* 3. Salary & Payslip Snapshot Card */}
          <div className="horilla-card horilla-card-gradient-top-purple-pink p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[15px] font-bold text-[#333333]">Salary & Compensation Breakdown</h3>
                <p className="text-[12px] text-[#888888]">Latest payroll record (August 2026)</p>
              </div>
              <Link to="/employee/payslips" className="text-[12px] font-bold text-horilla-primary hover:underline">
                All Payslips →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-[#888888] uppercase">Gross Salary</span>
                <p className="text-xl font-mono font-bold text-[#333333]">$5,200.00</p>
                <span className="text-[10px] text-slate-400 block">Base pay + allowances</span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-[#888888] uppercase">Deductions</span>
                <p className="text-xl font-mono font-bold text-rose-600">-$620.00</p>
                <span className="text-[10px] text-slate-400 block">Tax & Health Insurance</span>
              </div>

              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">Net Disbursed</span>
                <p className="text-xl font-mono font-extrabold text-emerald-700">$4,580.00</p>
                <span className="text-[10px] text-emerald-600 block">Direct bank deposit</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[12px] text-slate-500 font-medium">Payslip PDF generated & verified by HR</span>
              <button
                onClick={() => alert('Downloading official PDF Payslip for August 2026...')}
                className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-[12px] font-bold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Slip</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Sidebar Widgets Column */}
        <div className="w-full xl:w-[320px] shrink-0 space-y-6">
          
          {/* Live Punch Clock Widget Card */}
          <div className="horilla-card p-5 space-y-4 border-t-4 border-[#1F2A52]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-[15px] font-bold text-[#333333]">Shift Punch Control</h3>
              <span className={`w-2.5 h-2.5 rounded-full ${clockedIn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
            </div>

            <div className="p-4 bg-[#1F2A52] text-white rounded-xl text-center space-y-1 shadow-sm">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">Shift Elapsed Time</span>
              <div className="text-3xl font-mono font-extrabold text-white">
                {formatElapsedTime(elapsedSeconds)}
              </div>
              <p className="text-[11px] text-emerald-400 font-medium pt-1">
                {clockedIn ? `Checked In at ${clockInTime}` : 'Currently Checked Out'}
              </p>
            </div>

            <button
              onClick={handleToggleClock}
              className={`w-full py-2.5 rounded-xl font-sora font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                clockedIn
                  ? 'bg-slate-900 hover:bg-slate-800 text-white'
                  : 'bg-horilla-primary hover:bg-horilla-primary-hover text-white'
              }`}
            >
              {clockedIn ? (
                <>
                  <Square className="w-4 h-4" />
                  <span>Clock Out</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Clock In Now</span>
                </>
              )}
            </button>
          </div>

          {/* Leave Balance Summary */}
          <div className="horilla-card p-5 space-y-3">
            <h3 className="text-[15px] font-bold text-[#333333] border-b border-slate-100 pb-2">Leave Balances</h3>
            
            <div className="space-y-3 text-[12px]">
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Paid Leave</span>
                  <span className="text-horilla-primary">12 / 18 days</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-horilla-primary rounded-full" style={{ width: '66%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Sick Leave</span>
                  <span className="text-emerald-600">6 / 10 days</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="font-medium text-slate-600">Unpaid Allowance</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px] border border-emerald-200">
                  Available
                </span>
              </div>
            </div>
          </div>

          {/* Upcoming Holidays & Company Events */}
          <div className="horilla-card p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-[15px] font-bold text-[#333333]">Upcoming Events</h3>
              <span className="text-[11px] text-[#888888]">Calendar</span>
            </div>

            <div className="space-y-2 text-[12px]">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#333333] block">Aug 31, 2026</span>
                  <span className="text-[11px] text-[#888888]">Independence Day</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                  Holiday
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#333333] block">Sep 05, 2026</span>
                  <span className="text-[11px] text-[#888888]">Company All-Hands</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                  10:00 AM
                </span>
              </div>
            </div>
          </div>

          {/* Recent Employee Activity */}
          <div className="horilla-card p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-[15px] font-bold text-[#333333]">Recent Activity</h3>
              <Activity className="w-4 h-4 text-[#888888]" />
            </div>

            <div className="space-y-3 text-[12px]">
              {[
                { title: 'Checked in at 08:58 AM', date: 'Today', color: 'bg-emerald-500' },
                { title: 'Annual Leave request submitted', date: 'Aug 20, 2026', color: 'bg-amber-500' },
                { title: 'August Payslip generated', date: 'Aug 18, 2026', color: 'bg-blue-500' },
                { title: 'Casual Leave approved', date: 'Jul 14, 2026', color: 'bg-emerald-500' }
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${act.color}`} />
                  <div>
                    <p className="text-[#333333] font-semibold leading-tight">{act.title}</p>
                    <span className="text-[10px] text-[#888888] block mt-0.5">{act.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Apply Leave Modal matching HR EmployeeModal styling */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-modal-pop">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-sora text-base font-bold text-[#1F2A52]">Apply for Leave</h3>
              <button
                onClick={() => setShowLeaveModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {leaveSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold text-center">
                ✓ Leave request submitted successfully to HR!
              </div>
            ) : (
              <form onSubmit={handleApplyLeaveSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#333333] mb-1">Leave Type</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-horilla-primary"
                  >
                    <option>Annual Leave</option>
                    <option>Casual Leave</option>
                    <option>Sick Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#333333] mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-horilla-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#333333] mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-horilla-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#333333] mb-1">Reason for Leave</label>
                  <textarea
                    required
                    placeholder="Brief explanation for HR..."
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 h-20 focus:outline-none focus:border-horilla-primary resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLeaveModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Submit Request
                  </button>
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

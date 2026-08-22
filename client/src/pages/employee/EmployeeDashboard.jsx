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
  Download,
  Building,
  Plus,
  ArrowRight,
  Briefcase,
  FileText,
  Check,
  X,
  ChevronRight,
  ShieldCheck,
  Activity,
  Sparkles
} from 'lucide-react';

export const EmployeeDashboard = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // Employee Metadata & Fallbacks
  const employeeName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Jane Smith' : 'Jane Smith';
  const employeeId = user?.loginId || 'ACJS20260002';
  const employeeRole = user?.jobTitle || 'Software Engineer';
  const employeeDepartment = user?.department || 'Engineering Department';
  const employeeAvatar = user?.firstName ? user.firstName[0].toUpperCase() : 'J';

  // Clock In / Out Interactive State
  const [clockedIn, setClockedIn] = useState(true);
  const [clockInTime, setClockInTime] = useState('08:56 AM');
  const [elapsedSeconds, setElapsedSeconds] = useState(7 * 3600 + 15 * 60 + 24); // 07h 15m 24s

  // Leave Form Modal State
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Annual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // Payslip Download Mock Notice State
  const [showPayslipNotice, setShowPayslipNotice] = useState(false);

  // My Leave Applications Mock Data State
  const [myLeaves, setMyLeaves] = useState([
    { id: 1, type: 'Annual Leave', dates: 'Aug 28 – Aug 30', days: 3, status: 'Pending', reason: 'Personal travel' },
    { id: 2, type: 'Casual Leave', dates: 'Jul 14', days: 1, status: 'Approved', reason: 'Doctor visit' },
    { id: 3, type: 'Sick Leave', dates: 'Jun 02', days: 1, status: 'Rejected', reason: 'Medical rest' }
  ]);

  // Timer Tick
  useEffect(() => {
    let timer;
    if (clockedIn) {
      timer = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [clockedIn]);

  const formatElapsedTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m`;
  };

  const handleToggleClock = () => {
    if (clockedIn) {
      setClockedIn(false);
    } else {
      setClockedIn(true);
      const now = new Date();
      setClockInTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleApplyLeaveSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.max(0, end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newReq = {
      id: Date.now(),
      type: leaveType,
      dates: `${startDate} – ${endDate}`,
      days: diffDays > 0 ? diffDays : 1,
      status: 'Pending',
      reason: leaveReason || 'Time-off request'
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

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  const triggerPayslipDownload = () => {
    setShowPayslipNotice(true);
    setTimeout(() => setShowPayslipNotice(false), 3500);
  };

  // Attendance Overview Mon-Fri Data
  const weeklyAttendance = [
    { day: 'MON', date: 'Aug 17', status: 'Present', time: '8:56' },
    { day: 'TUE', date: 'Aug 18', status: 'Present', time: '9:02' },
    { day: 'WED', date: 'Aug 19', status: 'Present', time: '8:51' },
    { day: 'THU', date: 'Aug 20', status: 'Present', time: '9:00' },
    { day: 'FRI', date: 'Aug 21', status: 'Present', time: '8:57' }
  ];

  // Recent Activity Data
  const recentActivities = [
    { id: 1, title: 'Checked in at 08:56 AM', date: 'Today', iconColor: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 2, title: 'Leave request submitted (Annual Leave)', date: 'Aug 20', iconColor: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 3, title: 'Profile details updated', date: 'Aug 18', iconColor: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 4, title: 'Leave request approved (Casual Leave)', date: 'Aug 15', iconColor: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-inter flex flex-col pb-6">
      
      {/* 1. COMPACT TOP HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          
          {/* Dayflow Official Brand Emblem & Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group focus:outline-none">
              <div className="w-8 h-8 rounded-lg bg-[#1F2A52] flex items-center justify-center shadow-sm group-hover:bg-[#121A36] transition-all">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#FF5D7A]"
                >
                  <path
                    d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-40"
                  />
                  <path
                    d="M12 6L7 9V15L12 18L17 15V9L12 6Z"
                    fill="#FF5D7A"
                  />
                  <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
                </svg>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-sora text-base font-extrabold text-[#1F2A52] tracking-tight">
                  Dayflow
                </span>
                <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#FF5D7A]/10 text-[#FF5D7A] border border-[#FF5D7A]/20">
                  PORTAL
                </span>
              </div>
            </Link>
          </div>

          {/* Right User Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#1F2A52] text-white font-sora font-bold text-xs flex items-center justify-center">
                {employeeAvatar}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-[#1F2A52] leading-none">{employeeName}</p>
                <p className="text-[10px] text-slate-500 font-mono leading-none mt-0.5">{employeeId}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>

        </div>
      </header>

      {/* DENSE GRID MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-4 space-y-4">

        {/* 2. INTEGRATED HERO HEADER & STATS BAR */}
        <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Welcome & Live Clock In */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-1">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">EMPLOYEE PORTAL</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">{employeeRole}</span>
              </div>
              <h1 className="font-sora text-lg sm:text-xl font-bold text-[#1F2A52] tracking-tight mt-0.5">
                Good morning, {employeeName.split(' ')[0]}
              </h1>
            </div>

            {/* Attendance Status Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center gap-4 shrink-0">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`w-2 h-2 rounded-full ${clockedIn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {clockedIn ? 'Checked in' : 'Checked out'}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-slate-900">{clockedIn ? clockInTime : '—'}</span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {formatElapsedTime(elapsedSeconds)} worked
                  </span>
                </div>
              </div>

              <button
                onClick={handleToggleClock}
                className={`px-3 py-1.5 rounded-lg text-xs font-sora font-semibold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  clockedIn
                    ? 'bg-slate-900 hover:bg-slate-800 text-white'
                    : 'bg-[#FF5D7A] hover:bg-[#FF4263] text-white shadow-sm'
                }`}
              >
                {clockedIn ? (
                  <>
                    <Square className="w-3 h-3" />
                    <span>Clock Out</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Clock In</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Integrated 4 Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:border-l lg:border-slate-200 lg:pl-4 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 min-w-[110px]">
              <span className="text-[10px] font-medium text-slate-500 block">Attendance</span>
              <div className="text-sm font-bold text-[#1F2A52] font-sora mt-0.5">4 / 5 days</div>
              <span className="text-[9px] text-emerald-600 font-semibold block mt-0.5">This week</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 min-w-[110px]">
              <span className="text-[10px] font-medium text-slate-500 block">Leave Balance</span>
              <div className="text-sm font-bold text-[#1F2A52] font-sora mt-0.5">12 days</div>
              <span className="text-[9px] text-blue-600 font-semibold block mt-0.5">Paid remaining</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 min-w-[110px]">
              <span className="text-[10px] font-medium text-slate-500 block">Pending</span>
              <div className="text-sm font-bold text-amber-700 font-sora mt-0.5">1 request</div>
              <span className="text-[9px] text-amber-600 font-semibold block mt-0.5">Awaiting HR</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 min-w-[110px]">
              <span className="text-[10px] font-medium text-slate-500 block">Next Holiday</span>
              <div className="text-sm font-bold text-[#1F2A52] font-sora mt-0.5">Aug 31</div>
              <span className="text-[9px] text-purple-600 font-semibold block mt-0.5">Independence</span>
            </div>
          </div>

        </section>

        {/* 3. BALANCED 3-COLUMN DENSE GRID (ZERO GAP ALIGNMENT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          
          {/* COLUMN 1: ATTENDANCE & LEAVE REQUESTS */}
          <div className="space-y-4 flex flex-col">
            
            {/* Attendance Overview Card */}
            <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h2 className="font-sora text-xs font-bold text-[#1F2A52]">Attendance Overview</h2>
                  <p className="text-[10px] text-slate-500">Weekly work log (Mon – Fri)</p>
                </div>
                <span className="text-[10px] font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Aug 17 – Aug 21
                </span>
              </div>

              {/* Mon -> Fri Compact Row */}
              <div className="grid grid-cols-5 gap-1.5">
                {weeklyAttendance.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-center space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-500 uppercase block">{item.day}</span>
                    <span className="inline-block px-1 py-0.5 rounded text-[9px] font-semibold bg-emerald-100 text-emerald-800">
                      {item.status}
                    </span>
                    <span className="text-[11px] font-medium text-slate-900 block font-mono">{item.time}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Summary Bar */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-600">
                  Avg weekly: <strong className="text-[#1F2A52] font-mono">7h 42m</strong>
                </span>

                <Link
                  to="/employee/attendance"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Full log</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </section>

            {/* Leave Requests Card */}
            <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h2 className="font-sora text-xs font-bold text-[#1F2A52]">Recent Leave Requests</h2>
                  <p className="text-[10px] text-slate-500">Submitted time-off applications</p>
                </div>

                <button
                  onClick={() => setShowLeaveModal(true)}
                  className="px-2.5 py-1 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-semibold text-xs rounded-lg transition cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3 h-3" />
                  <span>New Request</span>
                </button>
              </div>

              {/* Compact Request Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold text-[9px]">
                      <th className="py-1.5 px-2">Type</th>
                      <th className="py-1.5 px-2">Date</th>
                      <th className="py-1.5 px-2">Days</th>
                      <th className="py-1.5 px-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {myLeaves.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-2">
                          <span className="font-semibold text-slate-900 block leading-tight">{req.type}</span>
                          <span className="text-[10px] text-slate-500 italic block truncate max-w-[120px]">{req.reason}</span>
                        </td>
                        <td className="py-2 px-2 text-slate-700 font-medium whitespace-nowrap text-[11px]">{req.dates}</td>
                        <td className="py-2 px-2 text-slate-600 font-mono text-[11px] whitespace-nowrap">{req.days}d</td>
                        <td className="py-2 px-2 text-right whitespace-nowrap">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                              req.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : req.status === 'Pending'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-100 text-right">
                <Link
                  to="/employee/leaves"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                >
                  <span>View all requests</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </section>

          </div>

          {/* COLUMN 2: LEAVE BALANCE, PAYSLIP & PROFILE SUMMARY */}
          <div className="space-y-4 flex flex-col">
            
            {/* Leave Balance Section */}
            <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="font-sora text-xs font-bold text-[#1F2A52]">Leave Balance Summary</h2>
                <span className="text-[10px] text-slate-500 font-medium">Year 2026</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-slate-700 mb-1">
                    <span>Paid Leave</span>
                    <span className="font-bold text-[#1F2A52]">12 / 18 days</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '66%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 mb-1">
                    <span>Sick Leave</span>
                    <span className="font-bold text-[#1F2A52]">6 / 10 days</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-slate-600">
                  <span>Unpaid Leave</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                    Available
                  </span>
                </div>
              </div>
            </section>

            {/* Latest Payslip Section */}
            <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="font-sora text-xs font-bold text-[#1F2A52]">Latest Payslip</h2>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  August 2026
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Gross Salary:</span>
                  <span className="font-mono font-semibold text-slate-900">$5,200</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Deductions:</span>
                  <span className="font-mono font-semibold text-rose-600">-$620</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-[#1F2A52]">
                  <span>Net Salary:</span>
                  <span className="font-mono text-emerald-700 text-sm">$4,580</span>
                </div>
              </div>

              {showPayslipNotice && (
                <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-[10px] text-blue-800 font-medium">
                  ✓ PDF download simulated for August 2026 payslip.
                </div>
              )}

              <div className="flex items-center gap-2">
                <Link
                  to="/employee/payslips"
                  className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#1F2A52] rounded-lg text-xs font-semibold transition text-center border border-slate-200"
                >
                  View Payslips →
                </Link>
                <button
                  onClick={triggerPayslipDownload}
                  title="Download Mock PDF"
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#FF5D7A]" />
                </button>
              </div>
            </section>

            {/* Profile Summary Section */}
            <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="font-sora text-xs font-bold text-[#1F2A52]">Profile Summary</h2>
                <User className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="text-xs space-y-1 text-slate-600">
                <p className="font-bold text-[#1F2A52]">{employeeName}</p>
                <p className="font-mono text-[10px] text-slate-500">ID: {employeeId}</p>
                <div className="pt-1.5 space-y-0.5 text-[11px]">
                  <p><span className="text-slate-400">Role:</span> {employeeRole}</p>
                  <p><span className="text-slate-400">Dept:</span> {employeeDepartment}</p>
                  <p><span className="text-slate-400">Shift:</span> 09:00 AM – 06:00 PM</p>
                </div>
              </div>
            </section>

          </div>

          {/* COLUMN 3: QUICK ACTIONS, UPCOMING & RECENT ACTIVITY */}
          <div className="space-y-4 flex flex-col">
            
            {/* Quick Actions Section */}
            <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2.5">
              <div className="pb-1.5 border-b border-slate-100">
                <h2 className="font-sora text-xs font-bold text-[#1F2A52]">Quick Actions</h2>
              </div>

              <div className="grid grid-cols-1 gap-1.5 text-xs">
                <button
                  onClick={() => setShowLeaveModal(true)}
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-[#1F2A52] flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#FF5D7A]" />
                    <span>Apply for Leave</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <Link
                  to="/employee/attendance"
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-[#1F2A52] flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>View Attendance Log</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/employee/attendance"
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-[#1F2A52] flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    <span>View Full Profile</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2.5">
              <div className="pb-1.5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-sora text-xs font-bold text-[#1F2A52]">Upcoming Events</h2>
                <span className="text-[10px] font-medium text-slate-400">Calendar</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block leading-tight">Aug 31</span>
                    <span className="text-slate-600 text-[10px]">Independence Day</span>
                  </div>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    Holiday
                  </span>
                </div>

                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block leading-tight">Sep 05</span>
                    <span className="text-slate-600 text-[10px]">Team Sync Meeting</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    10:00 AM
                  </span>
                </div>
              </div>
            </section>

            {/* Recent Activity Timeline Section */}
            <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2.5">
              <div className="pb-1.5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-sora text-xs font-bold text-[#1F2A52]">Recent Activity</h2>
                <Activity className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="space-y-2 text-xs">
                {recentActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${
                      act.id === 1 ? 'bg-emerald-500' : 'bg-slate-300'
                    }`} />
                    <div className="flex-1">
                      <p className="text-slate-800 font-medium leading-tight text-[11px]">{act.title}</p>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{act.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>

      </main>

      {/* INTERACTIVE APPLY LEAVE MODAL */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-xl relative animate-modal-pop">
            
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
                ✓ Leave request submitted successfully!
              </div>
            ) : (
              <form onSubmit={handleApplyLeaveSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Leave Type</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF5D7A]"
                  >
                    <option>Annual Leave</option>
                    <option>Casual Leave</option>
                    <option>Sick Leave</option>
                    <option>Unpaid Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF5D7A]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF5D7A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Reason for Leave</label>
                  <textarea
                    required
                    placeholder="Brief explanation..."
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 h-20 focus:outline-none focus:border-[#FF5D7A] resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLeaveModal(false)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-semibold rounded-xl shadow-md shadow-[#FF5D7A]/20 transition cursor-pointer"
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

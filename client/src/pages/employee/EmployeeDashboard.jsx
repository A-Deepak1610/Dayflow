import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
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
  FileText
} from 'lucide-react';

export const EmployeeDashboard = () => {
  const { user, logoutUser } = useAuth();
  const {
    leaves,
    applyLeave,
    employees,
    calculateEmployeePayroll,
    getAttendanceForDate,
    updateAttendanceRecord
  } = useData();
  const navigate = useNavigate();

  // Find matching employee record in store
  const empProfile = employees.find(e => e.id === user?.loginId || e.email === user?.email) || employees[1]; // default Sarah Jenkins for demo
  const userPayroll = calculateEmployeePayroll(empProfile);

  // Clock In / Out State
  const todayDate = '2026-08-22';
  const todayAttendance = getAttendanceForDate(todayDate);
  const myTodayRecord = todayAttendance.find(a => a.id === empProfile.id) || {
    checkIn: '09:02 AM',
    checkOut: '06:15 PM',
    status: 'Present'
  };

  const [clockedIn, setClockedIn] = useState(myTodayRecord.status === 'Present' && myTodayRecord.checkIn !== '--');
  const [clockInTime, setClockInTime] = useState(myTodayRecord.checkIn !== '--' ? myTodayRecord.checkIn : '09:00 AM');
  const [elapsedSeconds, setElapsedSeconds] = useState(7 * 3600 + 14 * 60 + 22);

  // Leave Form Modal
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Annual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // Leaves applied by this employee
  const myLeaves = leaves.filter(l => l.empId === empProfile.id);

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
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (clockedIn) {
      setClockedIn(false);
      updateAttendanceRecord(todayDate, empProfile.id, {
        checkOut: timeNow,
        status: 'Present',
        notes: 'Clocked out by staff member'
      });
    } else {
      setClockedIn(true);
      setClockInTime(timeNow);
      updateAttendanceRecord(todayDate, empProfile.id, {
        checkIn: timeNow,
        checkOut: '--',
        status: 'Present',
        notes: 'Live punch'
      });
    }
  };

  const handleApplyLeaveSubmit = (e) => {
    e.preventDefault();
    applyLeave({
      empId: empProfile.id,
      name: empProfile.name,
      dept: empProfile.dept,
      type: leaveType,
      startDate: startDate,
      endDate: endDate,
      dates: `${startDate} to ${endDate}`,
      days: 2,
      reason: leaveReason
    });

    setLeaveSubmitted(true);
    setTimeout(() => {
      setLeaveSubmitted(false);
      setShowLeaveModal(false);
      setLeaveReason('');
      setStartDate('');
      setEndDate('');
    }, 1200);
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter flex flex-col">
      
      {/* Top Employee Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#1F2A52] text-[#FF5D7A] flex items-center justify-center font-sora font-bold text-sm">
                DF
              </div>
              <span className="font-sora text-lg font-extrabold text-[#1F2A52]">
                Dayflow <span className="text-blue-600">Employee</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
              Self-Service Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-[#1F2A52]">{empProfile.name}</p>
              <p className="text-[10px] text-[#FF5D7A] font-mono font-bold">{empProfile.id}</p>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Employee Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome & Clock In Counter Widget */}
        <div className="bg-gradient-to-r from-blue-900 via-[#1F2A52] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
              <User className="w-3.5 h-3.5" />
              <span>{empProfile.designation || 'Staff Role'} • {empProfile.dept}</span>
            </div>
            <h1 className="font-sora text-2xl sm:text-4xl font-extrabold tracking-tight">
              Hello, {empProfile.name.split(' ')[0]}!
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Employee ID: <span className="font-mono text-[#FF5D7A] font-bold">{empProfile.id}</span>
            </p>
          </div>

          {/* Interactive Clock In/Out Counter */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-6">
            <div>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">Shift Elapsed Time</p>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white mt-0.5">
                {formatElapsedTime(elapsedSeconds)}
              </div>
              <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
                {clockedIn ? `Clocked In at ${clockInTime}` : 'Currently Clocked Out'}
              </p>
            </div>

            <button
              onClick={handleToggleClock}
              className={`px-5 py-3 rounded-2xl font-sora font-bold text-xs sm:text-sm transition-all shadow-lg cursor-pointer flex items-center gap-2 ${
                clockedIn
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30'
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
        </div>

        {/* Leave Balances & Actions Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Annual Paid Leave</span>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">{empProfile.leaveBalances?.annual ?? 12} Days</div>
            <p className="text-xs text-slate-500 mt-1">Available in 2026 quota</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Casual / Sick Leave</span>
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">
              {(empProfile.leaveBalances?.casual ?? 5) + (empProfile.leaveBalances?.sick ?? 6)} Days
            </div>
            <p className="text-xs text-slate-500 mt-1">Available for instant request</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Apply for Time-Off</span>
              <Plus className="w-5 h-5 text-[#FF5D7A]" />
            </div>
            <button
              onClick={() => setShowLeaveModal(true)}
              className="w-full py-3 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-bold text-xs rounded-2xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Apply for Leave</span>
            </button>
          </div>
        </div>

        {/* Main Content Split: My Leaves & Payslip Download */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* My Leaves Status Table */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-sora text-lg font-bold text-[#1F2A52]">My Leave Applications</h3>
                <p className="text-xs text-slate-500">Track HR review status of your submitted time-off requests</p>
              </div>
              <button
                onClick={() => setShowLeaveModal(true)}
                className="text-xs font-bold text-[#FF5D7A] hover:underline cursor-pointer"
              >
                + New Request
              </button>
            </div>

            {myLeaves.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">No leave applications on file.</p>
            ) : (
              <div className="space-y-3">
                {myLeaves.map(leave => (
                  <div key={leave.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-[#1F2A52]">{leave.type}</span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          {leave.days} Day(s)
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{leave.dates} • <span className="italic text-slate-500">"{leave.reason}"</span></p>
                      {leave.comment && (
                        <p className="text-xs text-indigo-700 font-medium bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 mt-1 w-fit">
                          HR Note: {leave.comment}
                        </p>
                      )}
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                      leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                      leave.status === 'Pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      'bg-rose-100 text-rose-700 border border-rose-200'
                    }`}>
                      {leave.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payslip & Profile Card */}
          <div className="space-y-6">
            
            {/* Latest Payslip Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-sora text-base font-bold text-[#1F2A52]">August 2026 Payslip</h3>
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Gross Earnings:</span>
                  <span className="font-bold text-[#1F2A52]">${userPayroll.grossEarnings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Deductions (PF/Tax):</span>
                  <span className="font-semibold text-rose-600">-${userPayroll.totalDeductions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm text-emerald-600">
                  <span>Net Salary Credited:</span>
                  <span>${userPayroll.netPay.toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/employee/payslips"
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#1F2A52] rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#FF5D7A]" />
                <span>View Full Payslip & Statement</span>
              </Link>
            </div>

            {/* Profile Info Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="w-10 h-10 rounded-full bg-[#FF5D7A] text-white font-bold flex items-center justify-center">
                  {empProfile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{empProfile.name}</p>
                  <p className="text-[10px] font-mono text-[#FF5D7A]">{empProfile.id}</p>
                </div>
              </div>

              <div className="text-xs space-y-1.5 text-slate-300">
                <p><span className="text-slate-500">Department:</span> {empProfile.dept}</p>
                <p><span className="text-slate-500">Designation:</span> {empProfile.designation || 'Specialist'}</p>
                <p><span className="text-slate-500">Bank:</span> {empProfile.bankName} ({empProfile.accountNumber})</p>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Apply Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative animate-modal-pop">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="font-sora text-lg font-bold text-[#1F2A52]">Submit Leave Application</h3>
              <button onClick={() => setShowLeaveModal(false)} className="text-slate-400 p-1 cursor-pointer">✕</button>
            </div>

            {leaveSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold text-center">
                ✓ Leave application submitted to HR Manager!
              </div>
            ) : (
              <form onSubmit={handleApplyLeaveSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Leave Type</label>
                  <select value={leaveType} onChange={e => setLeaveType(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold">
                    <option>Annual Leave</option>
                    <option>Casual Leave</option>
                    <option>Sick Leave</option>
                    <option>Unpaid Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
                    <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">End Date</label>
                    <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Reason for Leave</label>
                  <textarea required placeholder="Brief explanation..." value={leaveReason} onChange={e => setLeaveReason(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs h-20" />
                </div>

                <button type="submit" className="w-full py-3 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-bold rounded-xl shadow-md cursor-pointer">
                  Submit to HR Manager
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeDashboard;

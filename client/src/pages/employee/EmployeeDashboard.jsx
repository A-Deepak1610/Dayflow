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
  Plus
} from 'lucide-react';

import { clockInApi, clockOutApi, getMyAttendanceApi } from '../../services/api';

export const EmployeeDashboard = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // Clock In / Out State
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState('--:--');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Leave Form Modal
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Annual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // My Leave Applications State
  const [myLeaves, setMyLeaves] = useState([
    { id: 1, type: 'Annual Leave', dates: 'Aug 28 - Aug 30', days: 3, status: 'Pending', reason: 'Personal travel' },
    { id: 2, type: 'Casual Leave', dates: 'Jul 14', days: 1, status: 'Approved', reason: 'Doctor visit' },
  ]);

  useEffect(() => {
    const fetchTodayState = async () => {
      const res = await getMyAttendanceApi();
      if (res.ok && res.data.logs.length > 0) {
        const today = new Date().toLocaleDateString();
        const latestLog = res.data.logs[0];
        const logDate = new Date(latestLog.date).toLocaleDateString();
        
        if (today === logDate && !latestLog.clockOut) {
          setClockedIn(true);
          setClockInTime(new Date(latestLog.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          
          const diff = Math.floor((new Date() - new Date(latestLog.clockIn)) / 1000);
          setElapsedSeconds(diff);
        }
      }
    };
    fetchTodayState();
  }, []);

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

  const handleToggleClock = async () => {
    if (clockedIn) {
      const res = await clockOutApi();
      if (res.ok) {
        setClockedIn(false);
      } else {
        alert(res.error || res.data?.message || 'Error clocking out');
      }
    } else {
      const res = await clockInApi();
      if (res.ok) {
        setClockedIn(true);
        setClockInTime(new Date(res.data.log.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setElapsedSeconds(0);
      } else {
        alert(res.error || res.data?.message || 'Error clocking in');
      }
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
      reason: leaveReason
    };
    setMyLeaves([newReq, ...myLeaves]);
    setLeaveSubmitted(true);
    setTimeout(() => {
      setLeaveSubmitted(false);
      setShowLeaveModal(false);
      setLeaveReason('');
    }, 1500);
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <div className="text-slate-900 font-inter flex flex-col">
      {/* Main Employee Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome & Clock In Counter Widget */}
        <div className="bg-gradient-to-r from-blue-900 via-[#1F2A52] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
              <User className="w-3.5 h-3.5" />
              <span>Employee Portal</span>
            </div>
            <h1 className="font-sora text-2xl sm:text-4xl font-extrabold tracking-tight">
              Hello, {user?.firstName || 'Team Member'}!
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Your Login ID: <span className="font-mono text-[#FF5D7A] font-bold">{user?.loginId || 'DAY-SJ-2026-0042'}</span>
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
            <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">12 Days</div>
            <p className="text-xs text-slate-500 mt-1">Remaining in 2026 policy</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Casual / Sick Leave</span>
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">6 Days</div>
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
                className="text-xs font-bold text-[#FF5D7A] hover:underline"
              >
                + New Request
              </button>
            </div>

            <div className="space-y-3">
              {myLeaves.map(leave => (
                <div key={leave.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-[#1F2A52]">{leave.type}</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        {leave.days} Day(s)
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{leave.dates} • <span className="italic text-slate-400">"{leave.reason}"</span></p>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {leave.status}
                  </span>
                </div>
              ))}
            </div>
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
                  <span className="text-slate-500">Gross Salary:</span>
                  <span className="font-bold text-[#1F2A52]">$5,200.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deductions (Tax/Ins):</span>
                  <span className="font-semibold text-rose-600">-$620.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm text-emerald-600">
                  <span>Net Salary Credited:</span>
                  <span>$4,580.00</span>
                </div>
              </div>

              <button
                onClick={() => alert('Downloading official PDF Payslip for August 2026...')}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#1F2A52] rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#FF5D7A]" />
                <span>Download Payslip PDF</span>
              </button>
            </div>

            {/* Profile Info Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="w-10 h-10 rounded-full bg-[#FF5D7A] text-white font-bold flex items-center justify-center">
                  {user?.firstName?.[0] || 'E'}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{user?.firstName} {user?.lastName}</p>
                  <p className="text-[10px] font-mono text-[#FF5D7A]">{user?.loginId || 'DAY-EMP-2026-0042'}</p>
                </div>
              </div>

              <div className="text-xs space-y-1.5 text-slate-300">
                <p><span className="text-slate-500">Role:</span> Employee Portal</p>
                <p><span className="text-slate-500">Shift:</span> 09:00 AM - 06:00 PM</p>
                <p><span className="text-slate-500">First Login Password Changed:</span> <span className="text-emerald-400">Yes</span></p>
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
              <button onClick={() => setShowLeaveModal(false)} className="text-slate-400 p-1">✕</button>
            </div>

            {leaveSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold text-center">
                ✓ Leave application submitted to HR Manager!
              </div>
            ) : (
              <form onSubmit={handleApplyLeaveSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Leave Type</label>
                  <select value={leaveType} onChange={e => setLeaveType(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <option>Annual Leave</option>
                    <option>Casual Leave</option>
                    <option>Sick Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
                    <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">End Date</label>
                    <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Reason for Leave</label>
                  <textarea required placeholder="Brief explanation..." value={leaveReason} onChange={e => setLeaveReason(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs h-20" />
                </div>

                <button type="submit" className="w-full py-3 bg-[#FF5D7A] text-white font-bold rounded-xl shadow-md">
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

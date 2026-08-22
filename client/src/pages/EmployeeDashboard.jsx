import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  PlusCircle,
  TrendingUp,
  Briefcase,
  History,
  LogOut,
  LogIn
} from 'lucide-react';

export const EmployeeDashboard = ({ onNavigate }) => {
  // Mock Employee Data
  const employee = {
    name: 'Alex Rivera',
    id: 'EMP-2026-0042',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    avatar: 'AR'
  };

  // Interactive Attendance State (Mock)
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [checkInTime, setCheckInTime] = useState('09:02 AM');
  const [checkOutTime, setCheckOutTime] = useState('—');
  const [elapsedSeconds, setElapsedSeconds] = useState(16320); // 4h 32m in seconds

  useEffect(() => {
    let timer = null;
    if (isCheckedIn) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCheckedIn]);

  const formatHours = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const handleToggleAttendance = () => {
    if (isCheckedIn) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCheckOutTime(timeStr);
      setIsCheckedIn(false);
    } else {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCheckInTime(timeStr);
      setCheckOutTime('—');
      setIsCheckedIn(true);
    }
  };

  // Mock Data Collections
  const attendanceSummary = {
    present: 4,
    absent: 0,
    leave: 1,
    halfDay: 0,
    totalWorkingDays: 5
  };

  const leaveSummary = {
    available: 14,
    pending: 1,
    approved: 3,
    rejected: 0,
    breakdown: [
      { name: 'Paid Annual Leave', remaining: 10, total: 15 },
      { name: 'Sick Leave', remaining: 4, total: 5 },
    ]
  };

  const recentActivities = [
    {
      id: 1,
      type: 'attendance',
      title: 'Clocked in for workday',
      timestamp: 'Today at 09:02 AM',
      status: 'On Time',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 2,
      type: 'leave_request',
      title: 'Submitted 2-day Sick Leave request',
      timestamp: 'Yesterday at 04:15 PM',
      status: 'Pending HR Review',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 3,
      type: 'leave_approval',
      title: 'Annual Leave request (Sept 15 - Sept 18) Approved',
      timestamp: 'Aug 19, 2026',
      status: 'Approved',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 4,
      type: 'profile',
      title: 'Updated emergency contact & address details',
      timestamp: 'Aug 14, 2026',
      status: 'Updated',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200'
    }
  ];

  const upcomingLeavesAndHolidays = [
    {
      id: 1,
      title: 'Labor Day',
      type: 'Company Holiday',
      date: 'Mon, Sept 7, 2026',
      duration: '1 Day Off',
      isHoliday: true
    },
    {
      id: 2,
      title: 'Annual Time-Off',
      type: 'Personal Leave',
      date: 'Sept 15 – Sept 18, 2026',
      duration: '4 Days',
      isHoliday: false
    },
    {
      id: 3,
      title: 'Diwali Office Closure',
      type: 'Company Holiday',
      date: 'Fri, Nov 1, 2026',
      duration: '1 Day Off',
      isHoliday: true
    }
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 pb-16">
      
      {/* 1. COMPACT PROFESSIONAL HEADER */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
              <span>{employee.department}</span>
              <span>•</span>
              <span className="font-mono">{employee.id}</span>
            </div>
            <h1 className="font-sora text-2xl sm:text-3xl font-extrabold text-[#1F2A52] tracking-tight">
              Good morning, {employee.name}
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Here's your work overview and HR actions for today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right border-r border-slate-200 pr-4">
              <span className="block text-xs text-slate-500 font-medium">Today's Date</span>
              <span className="block text-xs font-bold text-[#1F2A52]">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('leave')}
              className="px-4 py-2 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-semibold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Apply for Leave</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        {/* 2. TODAY'S ATTENDANCE & 7. QUICK ACTIONS (TOP GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Today's Attendance Widget (2/3 width on desktop) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF5D7A]" />
                <h2 className="font-sora font-bold text-[#1F2A52] text-base">Today's Attendance</h2>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isCheckedIn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${
                  isCheckedIn 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {isCheckedIn ? 'Checked In' : 'Not Checked In'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Check-in Time</span>
                <span className="text-base font-bold font-sora text-[#1F2A52]">{checkInTime}</span>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Check-out Time</span>
                <span className="text-base font-bold font-sora text-[#1F2A52]">{checkOutTime}</span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">Total Worked</span>
                <span className="text-base font-bold font-sora text-emerald-700 font-mono">
                  {formatHours(elapsedSeconds)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Shift: <span className="font-semibold text-slate-700">09:00 AM – 06:00 PM (8h 00m)</span>
              </span>

              <button
                onClick={handleToggleAttendance}
                className={`px-5 py-2.5 rounded-xl font-sora font-semibold text-xs transition shadow-xs cursor-pointer flex items-center gap-2 ${
                  isCheckedIn
                    ? 'bg-slate-900 hover:bg-slate-800 text-white'
                    : 'bg-[#FF5D7A] hover:bg-[#FF4263] text-white'
                }`}
              >
                {isCheckedIn ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    <span>Clock Out</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Clock In</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 7. Quick Actions Card (1/3 width on desktop) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-sora font-bold text-[#1F2A52] text-base">Quick Actions</h3>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Shortcuts</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Access your primary employee tools and request forms.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => onNavigate && onNavigate('leave')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-[#1F2A52] flex items-center justify-between transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#FF5D7A]" />
                    <span>Apply for Leave</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate && onNavigate('attendance')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-[#1F2A52] flex items-center justify-between transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>View Attendance History</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate && onNavigate('profile')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-[#1F2A52] flex items-center justify-between transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>View My Profile</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Status: <strong className="text-emerald-600">Active Employee</strong></span>
              <span>HR System v1.0</span>
            </div>
          </div>

        </div>

        {/* 3. ATTENDANCE SUMMARY & 4. LEAVE SUMMARY (COMPACT DENSE SUMMARY ROW) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 3. Attendance Summary (Compact Weekly Table/Grid) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="font-sora font-bold text-[#1F2A52] text-sm flex items-center gap-2">
                <History className="w-4 h-4 text-slate-500" />
                Attendance Summary (This Week)
              </h3>
              <span className="text-[11px] font-medium text-slate-500">5 Working Days</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Present</span>
                <span className="text-xl font-bold font-sora text-slate-900 mt-1 block">{attendanceSummary.present}</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Days</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Absent</span>
                <span className="text-xl font-bold font-sora text-slate-900 mt-1 block">{attendanceSummary.absent}</span>
                <span className="text-[10px] text-slate-400 font-semibold">Days</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Leave</span>
                <span className="text-xl font-bold font-sora text-slate-900 mt-1 block">{attendanceSummary.leave}</span>
                <span className="text-[10px] text-amber-600 font-semibold">Day</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Half Day</span>
                <span className="text-xl font-bold font-sora text-slate-900 mt-1 block">{attendanceSummary.halfDay}</span>
                <span className="text-[10px] text-slate-400 font-semibold">Days</span>
              </div>
            </div>
          </div>

          {/* 4. Leave Summary (Compact Balance & Request Status) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="font-sora font-bold text-[#1F2A52] text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FF5D7A]" />
                Leave Balance & Requests
              </h3>
              <button
                onClick={() => onNavigate && onNavigate('leave')}
                className="text-xs font-semibold text-[#FF5D7A] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Apply for Leave</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Available</span>
                <span className="text-xl font-bold font-sora text-[#1F2A52] mt-1 block">{leaveSummary.available}</span>
                <span className="text-[10px] text-slate-500 font-semibold">Days</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pending</span>
                <span className="text-xl font-bold font-sora text-amber-600 mt-1 block">{leaveSummary.pending}</span>
                <span className="text-[10px] text-slate-500 font-semibold">Request</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Approved</span>
                <span className="text-xl font-bold font-sora text-emerald-600 mt-1 block">{leaveSummary.approved}</span>
                <span className="text-[10px] text-slate-500 font-semibold">Requests</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Rejected</span>
                <span className="text-xl font-bold font-sora text-slate-400 mt-1 block">{leaveSummary.rejected}</span>
                <span className="text-[10px] text-slate-500 font-semibold">Requests</span>
              </div>
            </div>
          </div>

        </div>

        {/* 5. RECENT ACTIVITY & 6. UPCOMING LEAVE / HOLIDAYS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 5. Recent Activity Table/List (2/3 width on desktop) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-sora font-bold text-[#1F2A52] text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                Recent Activity
              </h3>
              <span className="text-xs text-slate-500">Last 30 Days</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <th className="py-2.5 px-3">Activity</th>
                    <th className="py-2.5 px-3">Status / Details</th>
                    <th className="py-2.5 px-3 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentActivities.map((act) => (
                    <tr key={act.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-900 block">{act.title}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-[11px] ${act.badgeClass}`}>
                          {act.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-slate-500 font-medium">
                        {act.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. Upcoming Leave / Holidays (1/3 width on desktop) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="font-sora font-bold text-[#1F2A52] text-base flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#FF5D7A]" />
                Upcoming Leave & Holidays
              </h3>
            </div>

            <div className="space-y-3">
              {upcomingLeavesAndHolidays.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.title}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.2 rounded ${
                        item.isHoliday ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{item.date}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-1 rounded border border-slate-200">
                    {item.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default EmployeeDashboard;

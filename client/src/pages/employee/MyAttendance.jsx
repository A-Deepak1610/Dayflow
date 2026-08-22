import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Calendar,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Play,
  Square,
  Download,
  Filter,
  Search,
  Plus,
  Send,
  X,
  Building,
  Laptop,
  Check,
  ChevronLeft,
  ChevronRight,
  Timer,
  FileCheck2,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  TrendingUp,
  MapPin,
  CalendarCheck,
  UserCheck
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

export const MyAttendance = () => {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'weekly' | 'monthly' | 'regularizations'
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [selectedDate, setSelectedDate] = useState('2026-08-22');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(22);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Live Punch State
  const [clockedIn, setClockedIn] = useState(true);
  const [clockInTime, setClockInTime] = useState('08:58 AM');
  const [workMode, setWorkMode] = useState('Office'); // 'Office' | 'Remote WFH' | 'Client Site'
  const [elapsedSeconds, setElapsedSeconds] = useState(7 * 3600 + 24 * 60 + 15);

  // Modals & Feedback State
  const [isRegularizeModalOpen, setIsRegularizeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Regularize Form State
  const [regDate, setRegDate] = useState('2026-08-21');
  const [regInTime, setRegInTime] = useState('09:00 AM');
  const [regOutTime, setRegOutTime] = useState('06:00 PM');
  const [regReason, setRegReason] = useState('');

  // Elapsed Timer Effect
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
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle Live Clock In/Out
  const handleToggleClock = () => {
    if (clockedIn) {
      setClockedIn(false);
      showToast('Clocked out successfully for today.');
    } else {
      setClockedIn(true);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setClockInTime(timeStr);
      showToast(`Clocked in at ${timeStr} (${workMode}).`);
    }
  };

  // ----------------------------------------------------
  // Attendance Logs State
  // ----------------------------------------------------
  const [attendanceLogs, setAttendanceLogs] = useState([
    {
      date: '2026-08-22',
      dayLabel: 'Sat, Aug 22, 2026',
      shift: 'General (09:00 - 18:00)',
      clockIn: '08:58 AM',
      clockOut: '06:02 PM',
      totalHours: '9h 04m',
      rawHours: 9.06,
      overtime: '0h 04m',
      breakTime: '45m',
      status: 'On Time',
      mode: 'Office - Desk 4B',
      notes: 'Morning sprint standup & code review completed'
    },
    {
      date: '2026-08-21',
      dayLabel: 'Fri, Aug 21, 2026',
      shift: 'General (09:00 - 18:00)',
      clockIn: '09:01 AM',
      clockOut: '06:00 PM',
      totalHours: '8h 59m',
      rawHours: 8.98,
      overtime: '0h 00m',
      breakTime: '50m',
      status: 'On Time',
      mode: 'Office - Desk 4B',
      notes: 'Deployed staging v2.4 build'
    },
    {
      date: '2026-08-20',
      dayLabel: 'Thu, Aug 20, 2026',
      shift: 'General (09:00 - 18:00)',
      clockIn: '09:18 AM',
      clockOut: '06:30 PM',
      totalHours: '9h 12m',
      rawHours: 9.2,
      overtime: '0h 12m',
      breakTime: '45m',
      status: 'Late',
      mode: 'Office - Desk 4B',
      notes: 'Traffic delay due to rain on highway'
    },
    {
      date: '2026-08-19',
      dayLabel: 'Wed, Aug 19, 2026',
      shift: 'General (09:00 - 18:00)',
      clockIn: '08:55 AM',
      clockOut: '06:10 PM',
      totalHours: '9h 15m',
      rawHours: 9.25,
      overtime: '0h 15m',
      breakTime: '40m',
      status: 'On Time',
      mode: 'Remote WFH',
      notes: 'Client architecture workshop'
    },
    {
      date: '2026-08-18',
      dayLabel: 'Tue, Aug 18, 2026',
      shift: 'General (09:00 - 18:00)',
      clockIn: '09:00 AM',
      clockOut: '06:05 PM',
      totalHours: '9h 05m',
      rawHours: 9.08,
      overtime: '0h 05m',
      breakTime: '45m',
      status: 'On Time',
      mode: 'Office - Desk 4B',
      notes: 'Sprint planning meeting'
    },
    {
      date: '2026-08-17',
      dayLabel: 'Mon, Aug 17, 2026',
      shift: 'General (09:00 - 18:00)',
      clockIn: '08:52 AM',
      clockOut: '06:00 PM',
      totalHours: '9h 08m',
      rawHours: 9.13,
      overtime: '0h 08m',
      breakTime: '45m',
      status: 'On Time',
      mode: 'Office - Desk 4B',
      notes: 'Weekly team kick-off'
    },
    {
      date: '2026-08-15',
      dayLabel: 'Sat, Aug 15, 2026',
      shift: 'Weekend',
      clockIn: '--',
      clockOut: '--',
      totalHours: '0h 00m',
      rawHours: 0,
      overtime: '0h 00m',
      breakTime: '--',
      status: 'Weekend OFF',
      mode: 'OFF',
      notes: 'Weekend off'
    },
    {
      date: '2026-08-14',
      dayLabel: 'Fri, Aug 14, 2026',
      shift: 'General (09:00 - 18:00)',
      clockIn: '09:00 AM',
      clockOut: '01:30 PM',
      totalHours: '4h 30m',
      rawHours: 4.5,
      overtime: '0h 00m',
      breakTime: '30m',
      status: 'Half-day',
      mode: 'Office - Desk 4B',
      notes: 'Approved half day medical appointment'
    }
  ]);

  // Regularization Requests submitted by this employee
  const [myRegularizations, setMyRegularizations] = useState([
    {
      id: 'REG-MY-101',
      date: '2026-08-20',
      requestedCheckIn: '09:00 AM',
      requestedCheckOut: '06:30 PM',
      originalCheckIn: '09:18 AM',
      originalCheckOut: '06:30 PM',
      reason: 'Biometric fingerprint machine was restarting at North Gate entrance',
      status: 'Pending',
      submittedOn: 'Aug 20, 2026, 06:45 PM',
      hrComment: ''
    },
    {
      id: 'REG-MY-102',
      date: '2026-08-12',
      requestedCheckIn: '09:00 AM',
      requestedCheckOut: '06:00 PM',
      originalCheckIn: 'Missed Punch',
      originalCheckOut: '06:00 PM',
      reason: 'Was attending offsite client breakfast presentation',
      status: 'Approved',
      submittedOn: 'Aug 12, 2026, 06:10 PM',
      hrComment: 'Approved as per manager verification note.'
    }
  ]);

  // Weekly Bar Chart Data
  const weeklyChartData = [
    { day: 'Mon 17', hours: 9.13, target: 8.0, status: 'On Time' },
    { day: 'Tue 18', hours: 9.08, target: 8.0, status: 'On Time' },
    { day: 'Wed 19', hours: 9.25, target: 8.0, status: 'On Time' },
    { day: 'Thu 20', hours: 9.20, target: 8.0, status: 'Late' },
    { day: 'Fri 21', hours: 8.98, target: 8.0, status: 'On Time' },
    { day: 'Sat 22', hours: 9.06, target: 8.0, status: 'On Time' },
    { day: 'Sun 23', hours: 0.00, target: 8.0, status: 'OFF' }
  ];

  // Submit Regularization Form
  const handleSubmitRegularization = (e) => {
    e.preventDefault();
    if (!regReason) {
      alert('Please enter a reason for regularization.');
      return;
    }

    const newReg = {
      id: `REG-MY-${Date.now().toString().slice(-3)}`,
      date: regDate,
      requestedCheckIn: regInTime,
      requestedCheckOut: regOutTime,
      originalCheckIn: '09:18 AM',
      originalCheckOut: '06:00 PM',
      reason: regReason,
      status: 'Pending',
      submittedOn: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hrComment: ''
    };

    setMyRegularizations([newReg, ...myRegularizations]);
    setIsRegularizeModalOpen(false);
    setRegReason('');
    showToast('Regularization request submitted to HR Manager.');
  };

  // Export Attendance CSV
  const handleExportCSV = () => {
    const headers = ['Date,Day,Shift,Clock In,Clock Out,Total Hours,Overtime,Break Time,Status,Work Location,Notes'];
    const rows = attendanceLogs.map(
      l =>
        `"${l.date}","${l.dayLabel}","${l.shift}","${l.clockIn}","${l.clockOut}","${l.totalHours}","${l.overtime}","${l.breakTime}","${l.status}","${l.mode}","${l.notes}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `My_Attendance_Report_August_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Attendance report exported to CSV.');
  };

  // Filtered Daily Records
  const filteredDailyLogs = useMemo(() => {
    return attendanceLogs.filter(l => {
      const matchesSearch =
        l.dayLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.mode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || l.status.toUpperCase() === statusFilter.toUpperCase();
      return matchesSearch && matchesStatus;
    });
  }, [attendanceLogs, searchTerm, statusFilter]);

  // Monthly Calendar Matrix Generation (August 2026: 31 Days, starts on Saturday)
  const calendarDays = useMemo(() => {
    const days = [];
    for (let p = 0; p < 5; p++) {
      days.push({ type: 'empty', id: `empty-${p}` });
    }

    for (let d = 1; d <= 31; d++) {
      const dayOfWeek = (5 + d) % 7; // 0=Mon, 6=Sun
      let status = 'Present';
      let hours = '9h 00m';

      if (dayOfWeek === 5 || dayOfWeek === 6) {
        status = 'Weekend';
        hours = '0h 00m';
      } else if (d === 14) {
        status = 'Half-day';
        hours = '4h 30m';
      } else if (d === 20) {
        status = 'Late';
        hours = '9h 12m';
      } else if (d === 28) {
        status = 'Leave';
        hours = '0h 00m';
      } else if (d > 22) {
        status = 'Upcoming';
        hours = '--';
      }

      days.push({
        dayNum: d,
        status,
        hours,
        dateStr: `2026-08-${d.toString().padStart(2, '0')}`,
        isToday: d === 22
      });
    }
    return days;
  }, []);

  // Selected Day Data in Monthly view
  const selectedDayLog = useMemo(() => {
    const dateStr = `2026-08-${selectedCalendarDay.toString().padStart(2, '0')}`;
    const found = attendanceLogs.find(l => l.date === dateStr);
    if (found) return found;

    return {
      date: dateStr,
      dayLabel: `Aug ${selectedCalendarDay}, 2026`,
      shift: 'General (09:00 - 18:00)',
      clockIn: selectedCalendarDay > 22 ? 'Upcoming' : selectedCalendarDay % 7 === 1 || selectedCalendarDay % 7 === 2 ? '--' : '09:00 AM',
      clockOut: selectedCalendarDay > 22 ? 'Upcoming' : selectedCalendarDay % 7 === 1 || selectedCalendarDay % 7 === 2 ? '--' : '06:00 PM',
      totalHours: selectedCalendarDay > 22 ? '--' : selectedCalendarDay % 7 === 1 || selectedCalendarDay % 7 === 2 ? '0h 00m' : '9h 00m',
      overtime: '0h 00m',
      breakTime: '45m',
      status: selectedCalendarDay > 22 ? 'Scheduled' : selectedCalendarDay % 7 === 1 || selectedCalendarDay % 7 === 2 ? 'Weekend OFF' : 'Present',
      mode: 'Office - Desk 4B',
      notes: selectedCalendarDay > 22 ? 'Scheduled regular working day' : 'Standard working hours completed'
    };
  }, [selectedCalendarDay, attendanceLogs]);

  return (
    <div className="p-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2A52] text-white px-5 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Actions (Matching HR Theme exactly) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to="/employee/dashboard"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-slate-500 hover:text-horilla-primary transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">My Attendance & Timesheets</h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Personal biometric check-in records, weekly matrices, monthly calendars, and regularizations
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsRegularizeModalOpen(true)}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-[#333333] border border-slate-200 font-semibold text-[13px] rounded-lg shadow-xs cursor-pointer flex items-center gap-2 transition"
          >
            <FileCheck2 className="w-4 h-4 text-horilla-primary" />
            <span>Request Regularization</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold text-[13px] rounded-lg shadow-xs cursor-pointer flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Live Punch & Shift Status Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Saturday, Aug 22, 2026</span>
            </span>

            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
              Shift: 09:00 AM - 06:00 PM
            </span>

            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              clockedIn ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
            }`}>
              {clockedIn ? '● Shift Active' : '○ Clocked Out'}
            </span>
          </div>

          <h3 className="text-[18px] font-bold text-[#1F2A52]">
            {clockedIn ? `Clocked in at ${clockInTime}` : 'Currently Clocked Out'}
          </h3>
          <p className="text-[12px] text-slate-500">
            Work Mode: <strong className="text-slate-800">{workMode}</strong> • Lunch Break: <strong className="text-slate-800">45m taken</strong>
          </p>

          {/* Work Mode Switcher */}
          <div className="flex items-center gap-1.5 pt-1 text-xs">
            <span className="text-slate-400 font-medium text-[11px]">Mode:</span>
            {['Office', 'Remote WFH', 'Client Site'].map(mode => (
              <button
                key={mode}
                onClick={() => setWorkMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                  workMode === mode
                    ? 'bg-[#1F2A52] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Live Elapsed Counter & Action */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-6 shrink-0">
          <div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">Shift Duration</p>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[#1F2A52] mt-0.5">
              {formatElapsed(elapsedSeconds)}
            </div>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5 font-mono">
              Target: 8h 00m (+1h 04m OT)
            </p>
          </div>

          <button
            onClick={handleToggleClock}
            className={`px-5 py-2.5 rounded-lg font-semibold text-[13px] transition shadow-xs cursor-pointer flex items-center gap-2 ${
              clockedIn
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
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
                <span>Clock In</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Metric Cards (Matching HR Banner Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Present Days</span>
            <UserCheck className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-[#1F2A52] mt-2">19 / 22</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">86.4% on track</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Worked</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-[#1F2A52] mt-2">172.5h</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Aug 2026 total</p>
        </div>

        <div className="bg-white border border-blue-200 bg-blue-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Daily Average</span>
            <Timer className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-blue-700 mt-2">9.1 hrs</p>
          <p className="text-[11px] text-blue-600 font-medium mt-0.5">&gt; 8.0h threshold</p>
        </div>

        <div className="bg-white border border-emerald-200 bg-emerald-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">On-Time Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 mt-2">95.2%</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">1 Late arrival</p>
        </div>

        <div className="bg-white border border-purple-200 bg-purple-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-purple-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Overtime (OT)</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-purple-700 mt-2">+6.5h</p>
          <p className="text-[11px] text-purple-600 font-medium mt-0.5">1.5x pay credit</p>
        </div>

        <div className="bg-white border border-rose-200 bg-rose-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Leaves Taken</span>
            <CalendarCheck className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-extrabold text-rose-700 mt-2">1.5 Days</p>
          <p className="text-[11px] text-rose-600 font-medium mt-0.5">Approved time-off</p>
        </div>
      </div>

      {/* Main Sub-Navigation Bar (Matching HR Style) */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'daily', label: 'Daily Punch Log', icon: Clock, count: filteredDailyLogs.length },
          { id: 'weekly', label: 'Weekly Timesheet & Matrix', icon: CalendarDays },
          { id: 'monthly', label: 'Monthly Calendar View', icon: Calendar },
          { id: 'regularizations', label: 'My Regularization Requests', icon: FileCheck2, count: myRegularizations.filter(r => r.status === 'Pending').length, badgeColor: 'bg-amber-500' }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 text-[13px] font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-horilla-primary text-horilla-primary'
                  : 'border-transparent text-[#666666] hover:text-[#333333]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                    tab.badgeColor ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* TAB 1: DAILY PUNCH LOG VIEW                                  */}
      {/* ============================================================ */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search log by date, location, notes..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Calendar className="w-4 h-4 text-slate-400 hidden sm:block" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-medium text-[#333333] outline-none"
                />
              </div>
            </div>

            {/* Status Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full lg:w-auto">
              {['ALL', 'ON TIME', 'LATE', 'HALF-DAY', 'WEEKEND OFF'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer shrink-0 ${
                    statusFilter === st
                      ? 'bg-[#1F2A52] text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#1F2A52]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Table (Clean HR Styled) */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/75">
                    <th className="py-3 px-4">DATE & DAY</th>
                    <th className="py-3 px-3">SHIFT TIMING</th>
                    <th className="py-3 px-3">CLOCK IN</th>
                    <th className="py-3 px-3">CLOCK OUT</th>
                    <th className="py-3 px-3">TOTAL HOURS</th>
                    <th className="py-3 px-3">OVERTIME</th>
                    <th className="py-3 px-3">LOCATION / MODE</th>
                    <th className="py-3 px-3">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDailyLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-[#1F2A52]">{log.dayLabel}</p>
                        <p className="text-[11px] text-slate-400 font-normal italic">{log.notes}</p>
                      </td>

                      <td className="py-3.5 px-3 text-slate-600 text-xs">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono text-slate-700">
                          {log.shift}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-mono font-semibold text-slate-800">
                        {log.clockIn !== '--' ? (
                          <span className={log.status === 'Late' ? 'text-amber-600 font-bold' : ''}>
                            {log.clockIn}
                          </span>
                        ) : (
                          <span className="text-slate-300">--:--</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 font-mono font-semibold text-slate-800">
                        {log.clockOut}
                      </td>

                      <td className="py-3.5 px-3 font-mono font-bold text-[#1F2A52]">
                        {log.totalHours}
                      </td>

                      <td className="py-3.5 px-3 font-mono">
                        {log.overtime !== '0h 00m' ? (
                          <span className="text-emerald-600 font-bold">+{log.overtime}</span>
                        ) : (
                          <span className="text-slate-300">$0</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {log.mode}
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                            log.status === 'On Time'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : log.status === 'Late'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : log.status === 'Half-day'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {log.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setRegDate(log.date);
                            setIsRegularizeModalOpen(true);
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-horilla-primary hover:text-white text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                        >
                          Correct
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredDailyLogs.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-10 text-center text-slate-400">
                        No punch logs match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: WEEKLY VIEW & MATRIX                                  */}
      {/* ============================================================ */}
      {activeTab === 'weekly' && (
        <div className="space-y-6">
          {/* Weekly Bar Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-[16px] font-bold text-[#333333]">Weekly Hours Worked</h3>
                <p className="text-[12px] text-slate-500">Aug 17 - Aug 23, 2026 • Standard Target: 8.0 hours / day</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-horilla-primary inline-block"></span> Daily Hours</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 inline-block"></span> 8h Benchmark</span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey="day" stroke="#888888" fontSize={11} />
                  <YAxis stroke="#888888" fontSize={11} domain={[0, 12]} tickFormatter={v => `${v}h`} />
                  <Tooltip formatter={val => [`${val} hrs`, 'Work Duration']} />
                  <ReferenceLine y={8.0} stroke="#10B981" strokeDasharray="3 3" />
                  <Bar dataKey="hours" fill="#E9573F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Matrix Card Grid */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[16px] font-bold text-[#333333]">Weekly Shift Schedule Matrix</h3>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Week Total: 45.7 hrs
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 text-center text-xs">
              {[
                { day: 'Mon 17', in: '08:52 AM', out: '06:00 PM', total: '9h 08m', status: 'Present' },
                { day: 'Tue 18', in: '09:00 AM', out: '06:05 PM', total: '9h 05m', status: 'Present' },
                { day: 'Wed 19', in: '08:55 AM', out: '06:10 PM', total: '9h 15m', status: 'Present' },
                { day: 'Thu 20', in: '09:18 AM', out: '06:30 PM', total: '9h 12m', status: 'Late' },
                { day: 'Fri 21', in: '09:01 AM', out: '06:00 PM', total: '8h 59m', status: 'Present' },
                { day: 'Sat 22', in: '08:58 AM', out: '06:02 PM', total: '9h 04m', status: 'Present' },
                { day: 'Sun 23', in: '--', out: '--', total: '0h 00m', status: 'Weekend' }
              ].map((w, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border flex flex-col justify-between space-y-1.5 ${
                    w.status === 'Late'
                      ? 'bg-amber-50/60 border-amber-200'
                      : w.status === 'Weekend'
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-emerald-50/40 border-emerald-200'
                  }`}
                >
                  <p className="font-bold text-[#1F2A52] text-[13px]">{w.day}</p>
                  <div className="font-mono text-[11px] text-slate-600">
                    <p>In: {w.in}</p>
                    <p>Out: {w.out}</p>
                  </div>
                  <p className="font-mono font-extrabold text-xs text-[#1F2A52]">{w.total}</p>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      w.status === 'Present'
                        ? 'bg-emerald-100 text-emerald-800'
                        : w.status === 'Late'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {w.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: MONTHLY CALENDAR VIEW                                 */}
      {/* ============================================================ */}
      {activeTab === 'monthly' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Calendar Grid */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[16px] font-bold text-[#333333]">August 2026 Attendance Calendar</h3>
                <p className="text-[12px] text-slate-500">Click on any date to inspect shift logs and clock timings</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-800">August 2026</span>
                <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase py-1">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            {/* Month Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((item, idx) => {
                if (item.type === 'empty') {
                  return <div key={idx} className="h-16 bg-slate-50/40 rounded-xl border border-dashed border-slate-100"></div>;
                }

                const isSelected = selectedCalendarDay === item.dayNum;

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCalendarDay(item.dayNum)}
                    className={`h-16 p-1.5 rounded-xl border flex flex-col justify-between text-left transition cursor-pointer relative ${
                      isSelected
                        ? 'border-horilla-primary ring-2 ring-horilla-primary/20 bg-rose-50/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xs font-bold ${item.isToday ? 'bg-horilla-primary text-white w-5 h-5 rounded-full flex items-center justify-center' : 'text-slate-700'}`}>
                        {item.dayNum}
                      </span>
                      {item.status === 'Present' && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                      {item.status === 'Late' && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                      {item.status === 'Half-day' && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                      {item.status === 'Leave' && <span className="w-2 h-2 rounded-full bg-purple-500"></span>}
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 truncate w-full">
                      {item.hours}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Present</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Late In</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Half Day</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Leave</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Weekend OFF</span>
            </div>
          </div>

          {/* Selected Date Inspector Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#1F2A52] text-[15px]">Date Details</h4>
                  <p className="text-xs text-slate-500">{selectedDayLog.dayLabel}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  selectedDayLog.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                  selectedDayLog.status === 'Late' ? 'bg-amber-100 text-amber-800' :
                  selectedDayLog.status === 'Half-day' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                }`}>
                  {selectedDayLog.status}
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Shift Timing:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedDayLog.shift}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Clock In Time:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedDayLog.clockIn}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Clock Out Time:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedDayLog.clockOut}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Total Work Duration:</span>
                  <span className="font-mono font-extrabold text-[#1F2A52]">{selectedDayLog.totalHours}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Overtime Credited:</span>
                  <span className="font-mono font-bold text-emerald-600">{selectedDayLog.overtime}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Work Location:</span>
                  <span className="font-semibold text-slate-900">{selectedDayLog.mode}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl border border-slate-100">
                "{selectedDayLog.notes}"
              </p>
            </div>

            <button
              onClick={() => {
                setRegDate(selectedDayLog.date);
                setIsRegularizeModalOpen(true);
              }}
              className="w-full py-2.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition flex items-center justify-center gap-1.5"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Request Punch Correction</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: REGULARIZATION REQUESTS QUEUE                         */}
      {/* ============================================================ */}
      {activeTab === 'regularizations' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">My Attendance Regularizations</h3>
              <p className="text-[12px] text-slate-500">Track HR review status of your missed punch and timing correction requests</p>
            </div>

            <button
              onClick={() => setIsRegularizeModalOpen(true)}
              className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Submit New Regularization</span>
            </button>
          </div>

          <div className="space-y-3">
            {myRegularizations.map(reg => (
              <div
                key={reg.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition text-xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1F2A52] text-sm">{reg.date}</span>
                    <span className="font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{reg.id}</span>
                    <span
                      className={`font-bold px-2.5 py-0.5 rounded-full ${
                        reg.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : reg.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {reg.status}
                    </span>
                  </div>

                  <p className="text-slate-600">
                    <strong>Requested Timings:</strong> {reg.requestedCheckIn} to {reg.requestedCheckOut} (Original: {reg.originalCheckIn})
                  </p>
                  <p className="text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100">
                    "{reg.reason}"
                  </p>
                  {reg.hrComment && (
                    <p className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 font-medium">
                      HR Note: {reg.hrComment}
                    </p>
                  )}
                </div>

                <div className="text-right text-slate-400 text-[11px] font-mono shrink-0">
                  Submitted: {reg.submittedOn}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: SUBMIT REGULARIZATION REQUEST                         */}
      {/* ============================================================ */}
      {isRegularizeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[17px] font-bold text-[#1F2A52]">Request Attendance Regularization</h3>
              <button
                onClick={() => setIsRegularizeModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRegularization} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Date of Missed / Incorrect Punch</label>
                <input
                  type="date"
                  value={regDate}
                  onChange={e => setRegDate(e.target.value)}
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-horilla-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Actual Clock In Time</label>
                  <input
                    type="text"
                    value={regInTime}
                    onChange={e => setRegInTime(e.target.value)}
                    required
                    placeholder="e.g. 09:00 AM"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Actual Clock Out Time</label>
                  <input
                    type="text"
                    value={regOutTime}
                    onChange={e => setRegOutTime(e.target.value)}
                    required
                    placeholder="e.g. 06:00 PM"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Reason for Correction</label>
                <textarea
                  rows={3}
                  value={regReason}
                  onChange={e => setRegReason(e.target.value)}
                  required
                  placeholder="e.g. Biometric device was offline / Offsite client duty meeting"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-horilla-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRegularizeModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-lg shadow-xs"
                >
                  Submit to HR Manager
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAttendance;

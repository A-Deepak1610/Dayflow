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
  UserCheck,
  Loader2
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
import {
  fetchMyAttendanceApi,
  clockInApi,
  clockOutApi,
  fetchMyRegularizationsApi,
  submitRegularizationApi
} from '../../services/api';

export const MyAttendance = () => {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'weekly' | 'monthly' | 'regularizations'
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [selectedDate, setSelectedDate] = useState('2026-08-22');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(22);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Live Punch State
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState('--');
  const [workMode, setWorkMode] = useState('Office'); // 'Office' | 'Remote WFH' | 'Client Site'
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Modals & Feedback State
  const [isRegularizeModalOpen, setIsRegularizeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Regularize Form State
  const [regDate, setRegDate] = useState('2026-08-21');
  const [regInTime, setRegInTime] = useState('09:00');
  const [regOutTime, setRegOutTime] = useState('18:00');
  const [regReason, setRegReason] = useState('');

  // Live Data State
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [metrics, setMetrics] = useState({
    presentCount: 0,
    totalHoursWorked: '0.0',
    averageHoursPerDay: '8.0',
    onTimeRate: 100,
    totalOtHours: '0.0',
  });
  const [myRegularizations, setMyRegularizations] = useState([]);

  // Load live attendance from database
  const loadAttendanceData = async () => {
    setLoading(true);
    try {
      const [attRes, regRes] = await Promise.all([
        fetchMyAttendanceApi(),
        fetchMyRegularizationsApi()
      ]);

      if (attRes.ok && attRes.data) {
        const rawLogs = attRes.data.attendances || [];
        const formatted = rawLogs.map(a => {
          const d = new Date(a.date);
          const inTime = a.clockIn ? new Date(a.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';
          const outTime = a.clockOut ? new Date(a.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';
          const totalH = Math.floor((a.totalMinutes || 0) / 60);
          const totalM = (a.totalMinutes || 0) % 60;
          const otH = Math.floor((a.overtimeMinutes || 0) / 60);
          const otM = (a.overtimeMinutes || 0) % 60;

          return {
            id: a.id,
            date: a.date.split('T')[0],
            dayLabel: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
            shift: a.shift || 'General (09:00 - 18:00)',
            clockIn: inTime,
            clockOut: outTime,
            totalHours: `${totalH}h ${String(totalM).padStart(2, '0')}m`,
            rawHours: Number(((a.totalMinutes || 0) / 60).toFixed(2)),
            overtime: `${otH}h ${String(otM).padStart(2, '0')}m`,
            breakTime: `${a.breakMinutes || 45}m`,
            status: a.status || 'Present',
            mode: a.workMode || 'Office - Desk 4B',
            notes: a.notes || 'Standard biometric record'
          };
        });

        setAttendanceLogs(formatted);
        if (attRes.data.metrics) {
          setMetrics(attRes.data.metrics);
        }

        // Today's clock in state
        if (attRes.data.todayRecord) {
          const rec = attRes.data.todayRecord;
          if (rec.clockIn && !rec.clockOut) {
            setClockedIn(true);
            setClockInTime(new Date(rec.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            const diffSecs = Math.max(0, Math.floor((Date.now() - new Date(rec.clockIn).getTime()) / 1000));
            setElapsedSeconds(diffSecs);
          } else if (rec.clockIn && rec.clockOut) {
            setClockedIn(false);
            setClockInTime(new Date(rec.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setElapsedSeconds((rec.totalMinutes || 0) * 60);
          }
          if (rec.workMode) setWorkMode(rec.workMode);
        }
      }

      if (regRes.ok && regRes.data) {
        const rawRegs = regRes.data.regularizations || [];
        const formattedRegs = rawRegs.map(r => ({
          id: r.id,
          date: r.date.split('T')[0],
          requestedCheckIn: r.requestedClockIn ? new Date(r.requestedClockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '09:00 AM',
          requestedCheckOut: r.requestedClockOut ? new Date(r.requestedClockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:00 PM',
          originalCheckIn: r.originalClockIn ? new Date(r.originalClockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Missed Punch',
          originalCheckOut: r.originalClockOut ? new Date(r.originalClockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:00 PM',
          reason: r.reason,
          status: r.status,
          submittedOn: new Date(r.submittedAt).toLocaleDateString() + ' ' + new Date(r.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hrComment: r.reviewNote || ''
        }));
        setMyRegularizations(formattedRegs);
      }
    } catch (e) {
      console.error('Failed to load attendance:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendanceData();
  }, []);

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

  // Live Clock In / Clock Out Backend Action
  const handleToggleClock = async () => {
    if (clockedIn) {
      const res = await clockOutApi();
      if (res.ok) {
        setClockedIn(false);
        showToast('Clocked out successfully for today.');
        loadAttendanceData();
      } else {
        showToast(res.data?.message || 'Failed to clock out');
      }
    } else {
      const res = await clockInApi({ workMode });
      if (res.ok) {
        setClockedIn(true);
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setClockInTime(timeStr);
        setElapsedSeconds(0);
        showToast(`Clocked in at ${timeStr} (${workMode}).`);
        loadAttendanceData();
      } else {
        showToast(res.data?.message || 'Failed to clock in');
      }
    }
  };

  // Submit Regularization Form to Backend
  const handleSubmitRegularization = async (e) => {
    e.preventDefault();
    if (!regReason) {
      alert('Please enter a reason for regularization.');
      return;
    }

    const res = await submitRegularizationApi({
      date: regDate,
      requestedClockIn: regInTime,
      requestedClockOut: regOutTime,
      reason: regReason
    });

    if (res.ok) {
      setIsRegularizeModalOpen(false);
      setRegReason('');
      showToast('Regularization request submitted to HR Manager.');
      loadAttendanceData();
    } else {
      showToast(res.data?.message || 'Failed to submit regularization');
    }
  };

  // Weekly Bar Chart Data from live logs
  const weeklyChartData = useMemo(() => {
    if (attendanceLogs.length === 0) {
      return [
        { day: 'Mon 17', hours: 9.13, target: 8.0, status: 'Present' },
        { day: 'Tue 18', hours: 9.08, target: 8.0, status: 'Present' },
        { day: 'Wed 19', hours: 9.25, target: 8.0, status: 'Present' },
        { day: 'Thu 20', hours: 9.20, target: 8.0, status: 'Late' },
        { day: 'Fri 21', hours: 8.98, target: 8.0, status: 'Present' },
        { day: 'Sat 22', hours: 9.06, target: 8.0, status: 'Present' },
        { day: 'Sun 23', hours: 0.00, target: 8.0, status: 'OFF' }
      ];
    }
    return attendanceLogs.slice(0, 7).reverse().map(l => ({
      day: l.dayLabel.slice(0, 6),
      hours: l.rawHours > 0 ? l.rawHours : (l.status === 'Present' ? 8.5 : 0),
      target: 8.0,
      status: l.status
    }));
  }, [attendanceLogs]);

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
      const dateStr = `2026-08-${d.toString().padStart(2, '0')}`;
      const log = attendanceLogs.find(l => l.date === dateStr);
      const dayOfWeek = (5 + d) % 7; // 0=Mon, 6=Sun
      let status = log ? log.status : 'Present';
      let hours = log ? log.totalHours : '9h 00m';

      if (dayOfWeek === 5 || dayOfWeek === 6) {
        status = 'Weekend';
        hours = '0h 00m';
      } else if (d > 22) {
        status = 'Upcoming';
        hours = '--';
      }

      days.push({
        dayNum: d,
        status,
        hours,
        dateStr,
        isToday: d === 22
      });
    }
    return days;
  }, [attendanceLogs]);

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

      {/* Top Header & Actions */}
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
            Personal biometric check-in records, weekly matrices, monthly calendars, and regularizations (Live Database)
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
              <span>Today: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
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
              Target: 8h 00m
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

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Present Days</span>
            <UserCheck className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-[#1F2A52] mt-2">{metrics.presentCount || attendanceLogs.length}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Verified logs</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Worked</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-[#1F2A52] mt-2">{metrics.totalHoursWorked}h</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Database aggregate</p>
        </div>

        <div className="bg-white border border-blue-200 bg-blue-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Daily Average</span>
            <Timer className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-blue-700 mt-2">{metrics.averageHoursPerDay} hrs</p>
          <p className="text-[11px] text-blue-600 font-medium mt-0.5">&gt; 8.0h threshold</p>
        </div>

        <div className="bg-white border border-emerald-200 bg-emerald-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">On-Time Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 mt-2">{metrics.onTimeRate}%</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Punctuality index</p>
        </div>

        <div className="bg-white border border-purple-200 bg-purple-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-purple-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Overtime (OT)</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-purple-700 mt-2">+{metrics.totalOtHours}h</p>
          <p className="text-[11px] text-purple-600 font-medium mt-0.5">Approved OT</p>
        </div>

        <div className="bg-white border border-rose-200 bg-rose-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Regularizations</span>
            <FileCheck2 className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-extrabold text-rose-700 mt-2">{myRegularizations.length}</p>
          <p className="text-[11px] text-rose-600 font-medium mt-0.5">Submitted requests</p>
        </div>
      </div>

      {/* Main Sub-Navigation Bar */}
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

      {/* Loading state indicator */}
      {loading && (
        <div className="p-8 flex items-center justify-center gap-2 text-slate-500 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-horilla-primary" />
          <span>Synchronizing live attendance records from database...</span>
        </div>
      )}

      {/* TAB 1: DAILY PUNCH LOG VIEW */}
      {!loading && activeTab === 'daily' && (
        <div className="space-y-4">
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
              {['ALL', 'PRESENT', 'LATE', 'HALF-DAY'].map(st => (
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
                          <span className="text-slate-300">0h</span>
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
                            log.status === 'Present' || log.status === 'On Time'
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

      {/* TAB 2: WEEKLY VIEW & MATRIX */}
      {!loading && activeTab === 'weekly' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-[16px] font-bold text-[#333333]">Weekly Hours Worked</h3>
                <p className="text-[12px] text-slate-500">Live duration logs • Target: 8.0 hours / day</p>
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
        </div>
      )}

      {/* TAB 3: MONTHLY CALENDAR VIEW */}
      {!loading && activeTab === 'monthly' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase py-1">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

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
                      {(item.status === 'Present' || item.status === 'On Time') && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
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
                  selectedDayLog.status === 'Present' || selectedDayLog.status === 'On Time' ? 'bg-emerald-100 text-emerald-800' :
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

      {/* TAB 4: REGULARIZATION REQUESTS QUEUE */}
      {!loading && activeTab === 'regularizations' && (
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

            {myRegularizations.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No regularization requests submitted yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: SUBMIT REGULARIZATION REQUEST */}
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
                <label className="block text-slate-600 font-semibold mb-1">Select Attendance Date</label>
                <input
                  type="date"
                  value={regDate}
                  onChange={e => setRegDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Correct Clock In</label>
                  <input
                    type="time"
                    value={regInTime}
                    onChange={e => setRegInTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-800 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Correct Clock Out</label>
                  <input
                    type="time"
                    value={regOutTime}
                    onChange={e => setRegOutTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-800 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Reason for Missed Punch / Late</label>
                <textarea
                  rows={3}
                  value={regReason}
                  onChange={e => setRegReason(e.target.value)}
                  placeholder="E.g., Biometric device failure, client site visit, or emergency transportation delay..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800 text-xs resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRegularizeModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold rounded-xl shadow-xs transition"
                >
                  Submit Request
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

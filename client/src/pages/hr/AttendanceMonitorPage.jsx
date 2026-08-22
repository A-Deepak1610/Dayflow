import React, { useState, useMemo } from 'react';
import {
  Clock,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CalendarDays,
  Download,
  Plus,
  Edit3,
  History,
  FileCheck2,
  Users,
  Timer,
  ChevronRight,
  X,
  Building,
  Check,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

export const AttendanceMonitorPage = () => {
  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'weekly' | 'regularizations' | 'policy'
  const [selectedDate, setSelectedDate] = useState('2026-08-22');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [historyEmployee, setHistoryEmployee] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Form states for manual / edit punch
  const [formEmployeeId, setFormEmployeeId] = useState('');
  const [formDate, setFormDate] = useState('2026-08-22');
  const [formCheckIn, setFormCheckIn] = useState('09:00 AM');
  const [formCheckOut, setFormCheckOut] = useState('06:00 PM');
  const [formStatus, setFormStatus] = useState('Present');
  const [formNotes, setFormNotes] = useState('');

  // Primary Attendance Records State
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 'ATT-101',
      empId: 'DAY-HR-2026-0001',
      name: 'Adam Admin',
      dept: 'Executive',
      role: 'Chief HR Officer',
      avatar: 'AA',
      shift: 'General (09:00 - 18:00)',
      checkIn: '08:52 AM',
      checkOut: '06:05 PM',
      totalHours: '9h 13m',
      overtime: '0h 13m',
      breakTime: '45m',
      status: 'Present',
      notes: 'On time, biometric punch verified'
    },
    {
      id: 'ATT-102',
      empId: 'DAY-SJ-2026-0012',
      name: 'Sarah Jenkins',
      dept: 'Engineering',
      role: 'Lead Architect',
      avatar: 'SJ',
      shift: 'General (09:00 - 18:00)',
      checkIn: '09:02 AM',
      checkOut: '06:30 PM',
      totalHours: '9h 28m',
      overtime: '0h 28m',
      breakTime: '50m',
      status: 'Present',
      notes: 'Standard shift'
    },
    {
      id: 'ATT-103',
      empId: 'DAY-AR-2026-0045',
      name: 'Alex Rivera',
      dept: 'Product Design',
      role: 'Senior UI/UX Designer',
      avatar: 'AR',
      shift: 'General (09:00 - 18:00)',
      checkIn: '08:58 AM',
      checkOut: '06:02 PM',
      totalHours: '9h 04m',
      overtime: '0h 04m',
      breakTime: '40m',
      status: 'Present',
      notes: 'Morning design review completed'
    },
    {
      id: 'ATT-104',
      empId: 'DAY-DC-2026-0008',
      name: 'David Chen',
      dept: 'Human Resources',
      role: 'Talent Specialist',
      avatar: 'DC',
      shift: 'General (09:00 - 18:00)',
      checkIn: '09:48 AM',
      checkOut: '06:00 PM',
      totalHours: '8h 12m',
      overtime: '0h 00m',
      breakTime: '45m',
      status: 'Late',
      notes: 'Reported traffic delay'
    },
    {
      id: 'ATT-105',
      empId: 'DAY-EW-2026-0033',
      name: 'Emma Watson',
      dept: 'Operations',
      role: 'Operations Lead',
      avatar: 'EW',
      shift: 'General (09:00 - 18:00)',
      checkIn: '09:00 AM',
      checkOut: '01:30 PM',
      totalHours: '4h 30m',
      overtime: '0h 00m',
      breakTime: '30m',
      status: 'Half-day',
      notes: 'Pre-approved personal appointment'
    },
    {
      id: 'ATT-106',
      empId: 'DAY-ER-2026-0012',
      name: 'Elena Rostova',
      dept: 'Engineering',
      role: 'Full Stack Engineer',
      avatar: 'ER',
      shift: 'General (09:00 - 18:00)',
      checkIn: '--',
      checkOut: '--',
      totalHours: '0h 00m',
      overtime: '0h 00m',
      breakTime: '--',
      status: 'On Leave',
      notes: 'Approved Annual Leave'
    },
    {
      id: 'ATT-107',
      empId: 'DAY-AM-2026-0051',
      name: 'Alice Murphy',
      dept: 'Marketing',
      role: 'Growth Marketing Lead',
      avatar: 'AM',
      shift: 'General (09:00 - 18:00)',
      checkIn: '08:45 AM',
      checkOut: '05:50 PM',
      totalHours: '9h 05m',
      overtime: '0h 00m',
      breakTime: '45m',
      status: 'Present',
      notes: 'Client campaign execution'
    },
    {
      id: 'ATT-108',
      empId: 'DAY-JS-2026-0077',
      name: 'John Smith',
      dept: 'Sales',
      role: 'Account Executive',
      avatar: 'JS',
      shift: 'General (09:00 - 18:00)',
      checkIn: '--',
      checkOut: '--',
      totalHours: '0h 00m',
      overtime: '0h 00m',
      breakTime: '--',
      status: 'Absent',
      notes: 'Unexcused absence - auto flagged'
    }
  ]);

  // Regularization Requests State
  const [regularizations, setRegularizations] = useState([
    {
      id: 'REG-201',
      empId: 'DAY-SJ-2026-0012',
      name: 'Sarah Jenkins',
      dept: 'Engineering',
      date: '2026-08-21',
      requestedCheckIn: '08:55 AM',
      requestedCheckOut: '06:15 PM',
      originalCheckIn: 'Missed Punch',
      originalCheckOut: '06:15 PM',
      reason: 'Biometric fingerprint scanner malfunction at North Gate entrance',
      status: 'Pending',
      submittedOn: 'Aug 21, 2026, 06:30 PM'
    },
    {
      id: 'REG-202',
      empId: 'DAY-DC-2026-0008',
      name: 'David Chen',
      dept: 'Human Resources',
      date: '2026-08-20',
      requestedCheckIn: '09:00 AM',
      requestedCheckOut: '06:00 PM',
      originalCheckIn: '09:45 AM',
      originalCheckOut: '06:00 PM',
      reason: 'Was attending offsite HR Campus recruitment drive in the morning',
      status: 'Pending',
      submittedOn: 'Aug 20, 2026, 07:15 PM'
    },
    {
      id: 'REG-203',
      empId: 'DAY-AR-2026-0045',
      name: 'Alex Rivera',
      dept: 'Product Design',
      date: '2026-08-19',
      requestedCheckIn: '09:00 AM',
      requestedCheckOut: '06:00 PM',
      originalCheckIn: '09:30 AM',
      originalCheckOut: '06:00 PM',
      reason: 'Client design workshop ran through breakfast',
      status: 'Approved',
      submittedOn: 'Aug 19, 2026, 06:10 PM',
      reviewedBy: 'Adam Admin',
      reviewNote: 'Approved as per manager pre-clearance'
    }
  ]);

  // Weekly Matrix Mock Data
  const weeklyMatrix = [
    { name: 'Adam Admin', id: 'DAY-HR-2026-0001', dept: 'Executive', mon: 'P', tue: 'P', wed: 'P', thu: 'P', fri: 'P', sat: 'OFF', sun: 'OFF', totalHours: '45.2 hrs', onTimeRate: '100%' },
    { name: 'Sarah Jenkins', id: 'DAY-SJ-2026-0012', dept: 'Engineering', mon: 'P', tue: 'P', wed: 'P', thu: 'P', fri: 'P', sat: 'OFF', sun: 'OFF', totalHours: '46.5 hrs', onTimeRate: '98%' },
    { name: 'Alex Rivera', id: 'DAY-AR-2026-0045', dept: 'Product Design', mon: 'P', tue: 'P', wed: 'P', thu: 'P', fri: 'P', sat: 'OFF', sun: 'OFF', totalHours: '44.0 hrs', onTimeRate: '100%' },
    { name: 'David Chen', id: 'DAY-DC-2026-0008', dept: 'Human Resources', mon: 'P', tue: 'HD', wed: 'P', thu: 'P', fri: 'LATE', sat: 'OFF', sun: 'OFF', totalHours: '39.2 hrs', onTimeRate: '80%' },
    { name: 'Emma Watson', id: 'DAY-EW-2026-0033', dept: 'Operations', mon: 'P', tue: 'P', wed: 'P', thu: 'HD', fri: 'P', sat: 'OFF', sun: 'OFF', totalHours: '40.5 hrs', onTimeRate: '92%' },
    { name: 'Elena Rostova', id: 'DAY-ER-2026-0012', dept: 'Engineering', mon: 'L', tue: 'L', wed: 'L', thu: 'L', fri: 'L', sat: 'OFF', sun: 'OFF', totalHours: '0.0 hrs', onTimeRate: '100%' },
    { name: 'Alice Murphy', id: 'DAY-AM-2026-0051', dept: 'Marketing', mon: 'P', tue: 'P', wed: 'P', thu: 'P', fri: 'P', sat: 'OFF', sun: 'OFF', totalHours: '43.8 hrs', onTimeRate: '100%' },
    { name: 'John Smith', id: 'DAY-JS-2026-0077', dept: 'Sales', mon: 'P', tue: 'P', wed: 'A', thu: 'P', fri: 'A', sat: 'OFF', sun: 'OFF', totalHours: '26.0 hrs', onTimeRate: '60%' }
  ];

  // Helper notification toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPI Calculations
  const totalEmployees = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(r => r.status === 'Present').length;
  const lateCount = attendanceRecords.filter(r => r.status === 'Late').length;
  const halfDayCount = attendanceRecords.filter(r => r.status === 'Half-day').length;
  const leaveCount = attendanceRecords.filter(r => r.status === 'On Leave').length;
  const absentCount = attendanceRecords.filter(r => r.status === 'Absent').length;
  const pendingRegs = regularizations.filter(r => r.status === 'Pending').length;

  // Filtered Daily Records
  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dept.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = deptFilter === 'ALL' || item.dept === deptFilter;
      const matchesStatus = statusFilter === 'ALL' || item.status.toUpperCase() === statusFilter.toUpperCase();
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [attendanceRecords, searchTerm, deptFilter, statusFilter]);

  // Handle Manual Attendance Add
  const handleAddManualAttendance = (e) => {
    e.preventDefault();
    if (!formEmployeeId) {
      alert('Please enter an employee ID or select an employee.');
      return;
    }

    const newRecord = {
      id: `ATT-${Date.now().toString().slice(-4)}`,
      empId: formEmployeeId.toUpperCase(),
      name: formEmployeeId === 'DAY-HR-2026-0001' ? 'Adam Admin' : formEmployeeId === 'DAY-SJ-2026-0012' ? 'Sarah Jenkins' : 'Staff Member',
      dept: formEmployeeId === 'DAY-HR-2026-0001' ? 'Executive' : formEmployeeId === 'DAY-SJ-2026-0012' ? 'Engineering' : 'General Staff',
      role: 'Staff Specialist',
      avatar: formEmployeeId.slice(4, 6) || 'EM',
      shift: 'General (09:00 - 18:00)',
      checkIn: formCheckIn || '--',
      checkOut: formCheckOut || '--',
      totalHours: formCheckIn && formCheckOut ? '9h 00m' : '0h 00m',
      overtime: '0h 00m',
      breakTime: '45m',
      status: formStatus,
      notes: formNotes || 'Manual entry by HR'
    };

    setAttendanceRecords(prev => [newRecord, ...prev]);
    setIsManualModalOpen(false);
    resetForm();
    showToast(`Attendance entry recorded for ${newRecord.empId}`);
  };

  // Handle Edit Attendance Record
  const handleEditRecord = (e) => {
    e.preventDefault();
    if (!selectedRecord) return;

    setAttendanceRecords(prev =>
      prev.map(item => {
        if (item.id === selectedRecord.id) {
          return {
            ...item,
            checkIn: formCheckIn,
            checkOut: formCheckOut,
            status: formStatus,
            notes: formNotes || item.notes
          };
        }
        return item;
      })
    );

    setIsEditModalOpen(false);
    showToast(`Attendance record updated for ${selectedRecord.name}`);
  };

  const openEditModal = (rec) => {
    setSelectedRecord(rec);
    setFormCheckIn(rec.checkIn);
    setFormCheckOut(rec.checkOut);
    setFormStatus(rec.status);
    setFormNotes(rec.notes || '');
    setIsEditModalOpen(true);
  };

  const openHistoryDrawer = (rec) => {
    setHistoryEmployee(rec);
    setIsHistoryModalOpen(true);
  };

  const resetForm = () => {
    setFormEmployeeId('');
    setFormCheckIn('09:00 AM');
    setFormCheckOut('06:00 PM');
    setFormStatus('Present');
    setFormNotes('');
  };

  // Regularization Actions
  const handleRegularizationAction = (id, newStatus) => {
    setRegularizations(prev =>
      prev.map(reg => {
        if (reg.id === id) {
          return {
            ...reg,
            status: newStatus,
            reviewedBy: 'Adam Admin (HR)',
            reviewNote: newStatus === 'Approved' ? 'Regularization approved & shift timings corrected.' : 'Rejected due to incomplete verification.'
          };
        }
        return reg;
      })
    );

    // If approved, update the corresponding employee's attendance record
    const targetReg = regularizations.find(r => r.id === id);
    if (targetReg && newStatus === 'Approved') {
      setAttendanceRecords(prev =>
        prev.map(att => {
          if (att.empId === targetReg.empId) {
            return {
              ...att,
              checkIn: targetReg.requestedCheckIn,
              checkOut: targetReg.requestedCheckOut,
              status: 'Present',
              notes: `Regularized via ${targetReg.id}`
            };
          }
          return att;
        })
      );
    }

    showToast(`Regularization request ${id} ${newStatus.toLowerCase()} successfully.`);
  };

  // Export Attendance CSV
  const handleExportCSV = () => {
    const headers = ['Employee ID,Name,Department,Role,Shift,Clock In,Clock Out,Total Hours,Overtime,Status,Notes'];
    const rows = attendanceRecords.map(r =>
      `"${r.empId}","${r.name}","${r.dept}","${r.role}","${r.shift}","${r.checkIn}","${r.checkOut}","${r.totalHours}","${r.overtime}","${r.status}","${r.notes}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dayflow_Attendance_Report_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Attendance report exported to CSV.');
  };

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
          <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">Attendance & Shift Monitoring</h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Real-time biometric & web clock-in records, shift matrices, and regularization requests
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold text-[13px] rounded-lg shadow-xs cursor-pointer flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Mark Manual Punch</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-[#333333] border border-slate-200 font-semibold text-[13px] rounded-lg shadow-xs cursor-pointer flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Staff</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-[#1F2A52] mt-2">{totalEmployees}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">All scheduled</p>
        </div>

        <div className="bg-white border border-emerald-200 bg-emerald-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Present</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 mt-2">{presentCount}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">{Math.round((presentCount / totalEmployees) * 100)}% on duty</p>
        </div>

        <div className="bg-white border border-amber-200 bg-amber-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Late In</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-700 mt-2">{lateCount}</p>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">&gt; 15 min grace</p>
        </div>

        <div className="bg-white border border-blue-200 bg-blue-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Half Day</span>
            <Timer className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-blue-700 mt-2">{halfDayCount}</p>
          <p className="text-[11px] text-blue-600 font-medium mt-0.5">4.5h completed</p>
        </div>

        <div className="bg-white border border-purple-200 bg-purple-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-purple-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">On Leave</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-purple-700 mt-2">{leaveCount}</p>
          <p className="text-[11px] text-purple-600 font-medium mt-0.5">Approved off</p>
        </div>

        <div className="bg-white border border-rose-200 bg-rose-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Absent</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-extrabold text-rose-700 mt-2">{absentCount}</p>
          <p className="text-[11px] text-rose-600 font-medium mt-0.5">Unexcused</p>
        </div>
      </div>

      {/* Main Mode Navigation Bar */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'daily', label: 'Daily Punch Log', icon: Clock, count: filteredRecords.length },
          { id: 'weekly', label: 'Weekly Shift Matrix', icon: CalendarDays },
          { id: 'regularizations', label: 'Regularization Requests', icon: FileCheck2, count: pendingRegs, badgeColor: 'bg-rose-500' },
          { id: 'policy', label: 'Shift Timings & Policies', icon: ShieldAlert }
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
                    tab.badgeColor ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: DAILY PUNCH LOG */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search & Dept */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, ID or department..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Building className="w-4 h-4 text-slate-400 hidden sm:block" />
                <select
                  value={deptFilter}
                  onChange={e => setDeptFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-medium text-[#333333] outline-none focus:border-horilla-primary"
                >
                  <option value="ALL">All Departments</option>
                  <option value="Executive">Executive</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product Design">Product Design</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
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
              {['ALL', 'PRESENT', 'LATE', 'HALF-DAY', 'ON LEAVE', 'ABSENT'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer shrink-0 ${
                    statusFilter === status
                      ? 'bg-[#1F2A52] text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#1F2A52]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/75">
                    <th className="py-3 px-4">EMPLOYEE</th>
                    <th className="py-3 px-4">DEPARTMENT / ROLE</th>
                    <th className="py-3 px-4">SHIFT TIMING</th>
                    <th className="py-3 px-4">CLOCK IN</th>
                    <th className="py-3 px-4">CLOCK OUT</th>
                    <th className="py-3 px-4">HOURS WORKED</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map(rec => (
                    <tr key={rec.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-[#1F2A52] font-bold flex items-center justify-center text-xs">
                            {rec.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-[#1F2A52] leading-tight">{rec.name}</p>
                            <p className="text-[10px] font-mono text-slate-400 mt-0.5">{rec.empId}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-700">{rec.dept}</p>
                        <p className="text-[11px] text-slate-400">{rec.role}</p>
                      </td>

                      <td className="py-3 px-4 text-slate-600 text-xs">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono text-slate-700">
                          {rec.shift}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                        {rec.checkIn !== '--' ? (
                          <span className={rec.status === 'Late' ? 'text-amber-600 font-bold' : ''}>
                            {rec.checkIn}
                          </span>
                        ) : (
                          <span className="text-slate-300">--:--</span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                        {rec.checkOut !== '--' ? (
                          rec.checkOut
                        ) : (
                          <span className="text-slate-300">--:--</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-mono font-bold text-[#1F2A52]">{rec.totalHours}</p>
                        {rec.overtime !== '0h 00m' && (
                          <p className="text-[10px] font-medium text-emerald-600 font-mono">+{rec.overtime} OT</p>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 ${
                            rec.status === 'Present'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : rec.status === 'Late'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : rec.status === 'Half-day'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : rec.status === 'On Leave'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {rec.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(rec)}
                            title="Edit Attendance Punch"
                            className="p-1.5 text-slate-500 hover:text-horilla-primary hover:bg-rose-50 rounded-lg transition cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openHistoryDrawer(rec)}
                            title="View Employee Punch Log History"
                            className="p-1.5 text-slate-500 hover:text-[#1F2A52] hover:bg-slate-100 rounded-lg transition cursor-pointer"
                          >
                            <History className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-slate-400">
                        No attendance records match your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WEEKLY SHIFT MATRIX */}
      {activeTab === 'weekly' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">Staff Weekly Shift Matrix</h3>
              <p className="text-[12px] text-slate-500">
                Cycle: Aug 17 - Aug 23, 2026 • Legend: <span className="text-emerald-600 font-bold">P</span> (Present),{' '}
                <span className="text-amber-600 font-bold">LATE</span> (Late),{' '}
                <span className="text-blue-600 font-bold">HD</span> (Half Day),{' '}
                <span className="text-purple-600 font-bold">L</span> (Leave),{' '}
                <span className="text-rose-600 font-bold">A</span> (Absent),{' '}
                <span className="text-slate-400 font-mono">OFF</span> (Weekend)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-[12px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                  <th className="py-3 px-3 text-left">EMPLOYEE</th>
                  <th className="py-3 px-2">MON (17)</th>
                  <th className="py-3 px-2">TUE (18)</th>
                  <th className="py-3 px-2">WED (19)</th>
                  <th className="py-3 px-2">THU (20)</th>
                  <th className="py-3 px-2">FRI (21)</th>
                  <th className="py-3 px-2">SAT (22)</th>
                  <th className="py-3 px-2">SUN (23)</th>
                  <th className="py-3 px-3">WEEKLY HRS</th>
                  <th className="py-3 px-3 text-right">ON-TIME %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {weeklyMatrix.map((emp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-3 text-left">
                      <p className="font-bold text-[#1F2A52]">{emp.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{emp.dept}</p>
                    </td>

                    {['mon', 'tue', 'wed', 'thu', 'fri'].map(day => {
                      const val = emp[day];
                      return (
                        <td key={day} className="py-3 px-2">
                          <span
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                              val === 'P'
                                ? 'bg-emerald-100 text-emerald-800'
                                : val === 'LATE'
                                ? 'bg-amber-100 text-amber-800'
                                : val === 'HD'
                                ? 'bg-blue-100 text-blue-800'
                                : val === 'L'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {val}
                          </span>
                        </td>
                      );
                    })}

                    <td className="py-3 px-2 text-slate-400 font-mono font-medium">{emp.sat}</td>
                    <td className="py-3 px-2 text-slate-400 font-mono font-medium">{emp.sun}</td>

                    <td className="py-3 px-3 font-mono font-bold text-[#1F2A52]">{emp.totalHours}</td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-emerald-600">
                      {emp.onTimeRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: REGULARIZATION REQUESTS */}
      {activeTab === 'regularizations' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">Punch Regularization Queue</h3>
              <p className="text-[12px] text-slate-500">
                Staff submissions for missed biometric punches, offsite client duty, and gate delay corrections
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {regularizations.map(reg => (
              <div
                key={reg.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[#1F2A52] text-[14px]">{reg.name}</span>
                    <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                      {reg.empId}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">({reg.dept})</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        reg.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : reg.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {reg.status}
                    </span>
                  </div>

                  <div className="text-[12px] text-slate-700 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>
                      <strong className="text-slate-900">Date:</strong> {reg.date}
                    </span>
                    <span>
                      <strong className="text-slate-900">Original Punch:</strong> {reg.originalCheckIn} &rarr;{' '}
                      {reg.originalCheckOut}
                    </span>
                    <span>
                      <strong className="text-emerald-700">Requested Correction:</strong> {reg.requestedCheckIn} &rarr;{' '}
                      {reg.requestedCheckOut}
                    </span>
                  </div>

                  <p className="text-[12px] text-slate-600 italic bg-white p-2 rounded border border-slate-100">
                    "{reg.reason}"
                  </p>

                  {reg.reviewNote && (
                    <p className="text-[11px] text-emerald-700 font-medium mt-1">
                      HR Decision Note: {reg.reviewNote} ({reg.reviewedBy})
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {reg.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleRegularizationAction(reg.id, 'Approved')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Punch</span>
                      </button>
                      <button
                        onClick={() => handleRegularizationAction(reg.id, 'Rejected')}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[12px] font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-mono">Processed</span>
                  )}
                </div>
              </div>
            ))}

            {regularizations.length === 0 && (
              <div className="py-8 text-center text-slate-400 text-xs">No pending regularization requests.</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: SHIFT POLICIES & CONFIG */}
      {activeTab === 'policy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-[16px] font-bold text-[#333333]">Standard Working Shifts</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-[#1F2A52]">General Morning Shift</p>
                  <p className="text-[11px] text-slate-500">Engineering, HR, Executive & Operations</p>
                </div>
                <span className="font-mono text-[12px] font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-800">
                  09:00 AM - 06:00 PM
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-[#1F2A52]">Evening Support Shift</p>
                  <p className="text-[11px] text-slate-500">Global Customer Success & IT Helpdesk</p>
                </div>
                <span className="font-mono text-[12px] font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-800">
                  02:00 PM - 11:00 PM
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-[#1F2A52]">Flexible Product Sprint Shift</p>
                  <p className="text-[11px] text-slate-500">Product Design & Research</p>
                </div>
                <span className="font-mono text-[12px] font-bold bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-800">
                  Core: 10:00 AM - 04:00 PM
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-[16px] font-bold text-[#333333]">Attendance Rules & Penalties</h3>
            <div className="space-y-2.5 text-[13px]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-slate-600">
                  <strong className="text-slate-900">Grace Period:</strong> 15 minutes grace allowed past official
                  check-in (until 09:15 AM).
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-slate-600">
                  <strong className="text-slate-900">Half-Day Threshold:</strong> Work duration between 4.5 and 7 hours
                  counts as half-day credit.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-slate-600">
                  <strong className="text-slate-900">Overtime Calculation:</strong> Any verified duration above 9 hours
                  is auto-credited as 1.5x Overtime.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-slate-600">
                  <strong className="text-slate-900">3 Late Arrivals Rule:</strong> Accumulating 3 late marks within a
                  single month auto-deducts 0.5 Casual Leave.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: MARK MANUAL ATTENDANCE */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[17px] font-bold text-[#1F2A52]">Record Manual Attendance</h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddManualAttendance} className="space-y-4 text-[13px]">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Employee</label>
                <select
                  value={formEmployeeId}
                  onChange={e => setFormEmployeeId(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none focus:border-horilla-primary"
                >
                  <option value="">-- Choose Employee --</option>
                  <option value="DAY-HR-2026-0001">Adam Admin (Executive)</option>
                  <option value="DAY-SJ-2026-0012">Sarah Jenkins (Engineering)</option>
                  <option value="DAY-AR-2026-0045">Alex Rivera (Product Design)</option>
                  <option value="DAY-DC-2026-0008">David Chen (Human Resources)</option>
                  <option value="DAY-EW-2026-0033">Emma Watson (Operations)</option>
                  <option value="DAY-AM-2026-0051">Alice Murphy (Marketing)</option>
                  <option value="DAY-JS-2026-0077">John Smith (Sales)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Attendance Status</label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none focus:border-horilla-primary"
                  >
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Half-day">Half-day</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clock In Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 09:00 AM"
                    value={formCheckIn}
                    onChange={e => setFormCheckIn(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clock Out Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 06:00 PM"
                    value={formCheckOut}
                    onChange={e => setFormCheckOut(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">HR Note / Authorization Reason</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Client site visit pre-approved by Director"
                  value={formNotes}
                  onChange={e => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold rounded-lg shadow-sm"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PUNCH RECORD */}
      {isEditModalOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">Edit Punch Entry</h3>
                <p className="text-[11px] text-slate-400">
                  {selectedRecord.name} ({selectedRecord.empId})
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditRecord} className="space-y-4 text-[13px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clock In</label>
                  <input
                    type="text"
                    value={formCheckIn}
                    onChange={e => setFormCheckIn(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clock Out</label>
                  <input
                    type="text"
                    value={formCheckOut}
                    onChange={e => setFormCheckOut(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={formStatus}
                  onChange={e => setFormStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                >
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Half-day">Half-day</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason / HR Audit Note</label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={e => setFormNotes(e.target.value)}
                  placeholder="Reason for modifying record..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold rounded-lg shadow-sm"
                >
                  Update Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EMPLOYEE ATTENDANCE HISTORY DRAWER */}
      {isHistoryModalOpen && historyEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-[#1F2A52] font-bold flex items-center justify-center text-sm">
                  {historyEmployee.avatar}
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1F2A52]">{historyEmployee.name}</h3>
                  <p className="text-[11px] text-slate-400">
                    {historyEmployee.empId} • {historyEmployee.dept}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-[13px]">
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <div>
                  <p className="text-[11px] text-slate-500">Aug On-Time Rate</p>
                  <p className="text-lg font-extrabold text-emerald-600">96.4%</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Total Hours Worked</p>
                  <p className="text-lg font-extrabold text-[#1F2A52]">172.5h</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Overtime Accumulated</p>
                  <p className="text-lg font-extrabold text-blue-600">+4.5h</p>
                </div>
              </div>

              <h4 className="text-[13px] font-bold text-[#333333] pt-2">Recent 7-Day Punch History</h4>
              <div className="space-y-2">
                {[
                  { date: 'Aug 22, 2026', in: '08:52 AM', out: '06:05 PM', total: '9h 13m', status: 'Present' },
                  { date: 'Aug 21, 2026', in: '09:00 AM', out: '06:00 PM', total: '9h 00m', status: 'Present' },
                  { date: 'Aug 20, 2026', in: '08:55 AM', out: '06:10 PM', total: '9h 15m', status: 'Present' },
                  { date: 'Aug 19, 2026', in: '09:12 AM', out: '06:00 PM', total: '8h 48m', status: 'Late' },
                  { date: 'Aug 18, 2026', in: '08:58 AM', out: '06:02 PM', total: '9h 04m', status: 'Present' },
                  { date: 'Aug 15, 2026', in: '--', out: '--', total: '0h 00m', status: 'Weekend OFF' },
                  { date: 'Aug 14, 2026', in: '09:01 AM', out: '06:00 PM', total: '8h 59m', status: 'Present' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#1F2A52]">{item.date}</p>
                      <p className="text-slate-500 font-mono text-[11px]">
                        In: {item.in} • Out: {item.out}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === 'Present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'Late'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.status}
                      </span>
                      <p className="font-mono text-slate-500 text-[10px] mt-0.5">{item.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceMonitorPage;

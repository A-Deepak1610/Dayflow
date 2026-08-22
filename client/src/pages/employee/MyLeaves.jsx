import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchLeaveTypesApi,
  fetchMyLeaveBalancesApi,
  fetchMyLeavesApi,
  applyLeaveApi,
  cancelLeaveApi,
  fetchHolidaysApi
} from '../../services/api';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Download,
  DollarSign,
  FileText,
  Send,
  X,
  Filter,
  Search,
  Building,
  Info,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  UploadCloud,
  File,
  Trash2,
  Check,
  CalendarDays,
  ShieldCheck,
  UserCheck,
  Users,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Eye,
  RefreshCw,
  HeartHandshake,
  Baby,
  Briefcase,
  GraduationCap,
  Plane,
  Heart,
  CalendarCheck,
  Layers,
  History,
  CheckCheck
} from 'lucide-react';

// ============================================================================
// COMPANY OFFICIAL HOLIDAYS (2026 Master)
// ============================================================================
const COMPANY_HOLIDAYS_2026 = [
  { date: '2026-01-01', name: "New Year's Day", day: 'Thursday' },
  { date: '2026-01-26', name: 'Republic Day', day: 'Monday' },
  { date: '2026-03-04', name: 'Holi Festival', day: 'Wednesday' },
  { date: '2026-04-03', name: 'Good Friday', day: 'Friday' },
  { date: '2026-05-01', name: 'Labor Day', day: 'Friday' },
  { date: '2026-08-15', name: 'Independence Day', day: 'Saturday' },
  { date: '2026-08-31', name: 'National Day Observance', day: 'Monday' },
  { date: '2026-10-02', name: 'Gandhi Jayanti', day: 'Friday' },
  { date: '2026-10-20', name: 'Dussehra', day: 'Tuesday' },
  { date: '2026-11-08', name: 'Diwali Festival', day: 'Sunday' },
  { date: '2026-12-25', name: 'Christmas Day', day: 'Friday' }
];

// ============================================================================
// CONFIGURABLE LEAVE TYPES MASTER & ENTITLEMENTS (Alex Johnson - EMP-1024)
// ============================================================================
const LEAVE_TYPES_CONFIG = [
  {
    id: 'AL',
    name: 'Annual Leave',
    category: 'Core Paid',
    totalQuota: 20,
    used: 8,
    pending: 2,
    available: 10,
    upcoming: 2,
    unit: 'days',
    icon: Calendar,
    color: 'indigo',
    purpose: 'Planned vacation, travel, and personal downtime.',
    noticePeriod: '3 working days in advance',
    maxContinuous: '10 working days',
    carryForward: 'Up to 5 days to next calendar year',
    docRequired: 'Not required',
    approvalWorkflow: 'Direct Team Lead → HR Operations',
    historyLogs: [
      { date: '01 Jan 2026', event: 'Opening Annual Balance Allocated', change: '+20 days', balance: '20 days' },
      { date: '15 Jan 2026', event: 'Winter Break Leave Used (LV-2026-0012)', change: '-4 days', balance: '16 days' },
      { date: '12 Mar 2026', event: 'Spring Vacation Used (LV-2026-0310)', change: '-4 days', balance: '12 days' },
      { date: '20 Aug 2026', event: 'Pending Approval Pipeline (LV-2026-0842)', change: '-2 days', balance: '10 days' }
    ]
  },
  {
    id: 'SL',
    name: 'Sick Leave',
    category: 'Core Paid',
    totalQuota: 8,
    used: 2,
    pending: 0,
    available: 6,
    upcoming: 0,
    unit: 'days',
    icon: HeartHandshake,
    color: 'blue',
    purpose: 'Recovery from illness, surgery, or medical appointments.',
    noticePeriod: 'Same-day intimation before 10:00 AM',
    maxContinuous: '10 consecutive days',
    carryForward: 'Lapses at end of year (No carryover)',
    docRequired: 'Medical Certificate required if > 2 consecutive days',
    approvalWorkflow: 'Direct Team Lead',
    historyLogs: [
      { date: '01 Jan 2026', event: 'Annual Allocation Credited', change: '+8 days', balance: '8 days' },
      { date: '02 Jun 2026', event: 'Viral Flu Recovery Used (LV-2026-0602)', change: '-2 days', balance: '6 days' }
    ]
  },
  {
    id: 'CL',
    name: 'Casual Leave',
    category: 'Core Paid',
    totalQuota: 7,
    used: 3,
    pending: 1,
    available: 3,
    upcoming: 0,
    unit: 'days',
    icon: Heart,
    color: 'emerald',
    purpose: 'Urgent personal matters, family affairs, or sudden domestic tasks.',
    noticePeriod: '1 working day advance notice',
    maxContinuous: '3 working days',
    carryForward: 'Non-accruable / Lapses annually',
    docRequired: 'Not required',
    approvalWorkflow: 'Direct Team Lead',
    historyLogs: [
      { date: '01 Jan 2026', event: 'Annual Quota Credited', change: '+7 days', balance: '7 days' },
      { date: '18 Apr 2026', event: 'Personal Domestic Task (LV-2026-0418)', change: '-1 day', balance: '6 days' },
      { date: '14 Jul 2026', event: 'Doctor Appointment (LV-2026-0714)', change: '-1 day', balance: '5 days' },
      { date: '05 Aug 2026', event: 'Vehicle Registration (LV-2026-0805)', change: '-1 day', balance: '4 days' },
      { date: '21 Aug 2026', event: 'Pending Pipeline Request', change: '-1 day', balance: '3 days' }
    ]
  },
  {
    id: 'COMP',
    name: 'Compensatory Off',
    category: 'Core Paid',
    totalQuota: 3,
    used: 1,
    pending: 0,
    available: 2,
    upcoming: 0,
    unit: 'days',
    icon: Briefcase,
    color: 'purple',
    purpose: 'Compensatory rest for authorized weekend or holiday shift duty.',
    noticePeriod: '2 working days advance notice',
    maxContinuous: '2 working days',
    carryForward: 'Valid for 90 days from credit date',
    docRequired: 'Approved manager weekend attendance log',
    approvalWorkflow: 'Direct Team Lead',
    historyLogs: [
      { date: '10 Jan 2026', event: 'Saturday Deployment Support Credited', change: '+1 day', balance: '1 day' },
      { date: '15 Feb 2026', event: 'Weekend Cloud Migration Credited', change: '+2 days', balance: '3 days' },
      { date: '20 Apr 2026', event: 'Comp-Off Availment (LV-2026-0420)', change: '-1 day', balance: '2 days' }
    ]
  },
  {
    id: 'ML',
    name: 'Maternity Leave',
    category: 'Special Policy',
    totalQuota: 182,
    used: 0,
    pending: 0,
    available: 182,
    upcoming: 0,
    unit: 'days',
    icon: Baby,
    color: 'rose',
    purpose: '26 weeks statutory paid time-off for expecting and new mothers.',
    noticePeriod: '30 days advance notice',
    maxContinuous: '182 consecutive days',
    carryForward: 'N/A (One-time event benefit)',
    docRequired: 'Expected date medical certificate / birth record',
    approvalWorkflow: 'Department Head → HR Director',
    historyLogs: []
  },
  {
    id: 'PL',
    name: 'Paternity Leave',
    category: 'Special Policy',
    totalQuota: 10,
    used: 0,
    pending: 0,
    available: 10,
    upcoming: 0,
    unit: 'days',
    icon: Users,
    color: 'sky',
    purpose: 'Paid time-off for new fathers within 6 months of childbirth.',
    noticePeriod: '14 days advance notice',
    maxContinuous: '10 working days',
    carryForward: 'Lapses after 6 months of childbirth',
    docRequired: 'Birth Certificate copy',
    approvalWorkflow: 'Direct Team Lead & HR Operations',
    historyLogs: []
  },
  {
    id: 'BL',
    name: 'Bereavement Leave',
    category: 'Special Policy',
    totalQuota: 5,
    used: 0,
    pending: 0,
    available: 5,
    upcoming: 0,
    unit: 'days',
    icon: ShieldCheck,
    color: 'amber',
    purpose: 'Compassionate leave for the loss of an immediate family member.',
    noticePeriod: 'Immediate intimation',
    maxContinuous: '5 working days',
    carryForward: 'N/A',
    docRequired: 'Self-declaration upon resumption of duty',
    approvalWorkflow: 'Direct Team Lead & HR Notification',
    historyLogs: []
  },
  {
    id: 'LOP',
    name: 'Unpaid Leave (Loss of Pay)',
    category: 'Unpaid',
    totalQuota: 30,
    used: 0,
    pending: 0,
    available: 30,
    upcoming: 0,
    unit: 'days',
    icon: AlertCircle,
    color: 'slate',
    purpose: 'Approved absence taken beyond paid allocations; deducted from monthly payroll.',
    noticePeriod: '7 working days advance notice',
    maxContinuous: '30 working days',
    carryForward: 'N/A',
    docRequired: 'Written justification to HR Director',
    approvalWorkflow: 'HR Director',
    historyLogs: []
  }
];

// ============================================================================
// TEAM HANDOVER DIRECTORY
// ============================================================================
const HANDOVER_COLLEAGUES = [
  { id: 'usr-1', name: 'Sophia Chen', role: 'Senior Frontend Engineer', email: 'sophia.c@dayflow.io' },
  { id: 'usr-2', name: 'Liam Patel', role: 'Fullstack Developer', email: 'liam.p@dayflow.io' },
  { id: 'usr-3', name: 'Marcus Vance', role: 'Product QA Specialist', email: 'marcus.v@dayflow.io' },
  { id: 'usr-4', name: 'Elena Rostova', role: 'UI/UX Designer', email: 'elena.r@dayflow.io' }
];

export const MyLeaves = () => {
  // Navigation Tabs: 'overview' | 'requests' | 'calendar' | 'history' | 'policies'
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  // Modals & Drawers
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedBalanceDetails, setSelectedBalanceDetails] = useState(null);
  const [selectedRequestDetails, setSelectedRequestDetails] = useState(null);
  const [selectedPolicyDetails, setSelectedPolicyDetails] = useState(null);
  const [cancelModalRequest, setCancelModalRequest] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [toast, setToast] = useState(null);

  // --------------------------------------------------------------------------
  // MULTI-STEP APPLY LEAVE WIZARD STATE (Steps 1 to 5)
  // --------------------------------------------------------------------------
  const [applyStep, setApplyStep] = useState(1); // 1: Type, 2: Dates & Calculation, 3: Reason & Docs, 4: Review, 5: Success
  const [selectedType, setSelectedType] = useState('AL');
  const [durationMode, setDurationMode] = useState('MULTIPLE'); // 'SINGLE' | 'MULTIPLE' | 'HALF_FIRST' | 'HALF_SECOND'
  const [startDate, setStartDate] = useState('2026-08-25');
  const [endDate, setEndDate] = useState('2026-08-29');
  const [reasonText, setReasonText] = useState('');
  const [handoverColleague, setHandoverColleague] = useState('Sophia Chen');
  const [handoverNotes, setHandoverNotes] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [submittedRequestId, setSubmittedRequestId] = useState(null);

  // Toast Helper
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3800);
  };

  // Live Data State from Backend
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [companyHolidays, setCompanyHolidays] = useState(COMPANY_HOLIDAYS_2026);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLeaveData = async () => {
    try {
      const [balRes, reqRes, typeRes, holRes] = await Promise.all([
        fetchMyLeaveBalancesApi(),
        fetchMyLeavesApi(),
        fetchLeaveTypesApi(),
        fetchHolidaysApi()
      ]);

      if (balRes.ok && balRes.data?.balances) {
        setLeaveBalances(balRes.data.balances);
      }
      if (reqRes.ok && reqRes.data?.leaveRequests) {
        const mapped = reqRes.data.leaveRequests.map(r => ({
          id: r.id,
          typeId: r.leaveTypeId,
          typeName: r.leaveType?.name || 'Leave',
          startDate: r.startDate.split('T')[0],
          endDate: r.endDate.split('T')[0],
          dateRangeDisplay: `${new Date(r.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} – ${new Date(r.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`,
          calendarDays: r.calendarDays,
          workingDays: Number(r.workingDays),
          weekendDays: r.weekendDays,
          holidayDays: r.holidayDays,
          durationLabel: `${Number(r.workingDays)} working day${Number(r.workingDays) > 1 ? 's' : ''}`,
          reason: r.reason,
          status: r.status,
          submittedOn: new Date(r.appliedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
          handoverTo: r.handoverUserId || 'Team Member',
          handoverNotes: r.handoverNotes || '',
          hasAttachment: !!r.attachmentUrl,
          timeline: (r.events && r.events.length > 0) ? r.events.map(e => ({
            title: e.event,
            date: new Date(e.createdAt).toLocaleDateString(),
            by: e.note || 'HR Team',
            status: 'completed'
          })) : [
            { title: 'Application Submitted', date: new Date(r.appliedAt).toLocaleDateString(), by: 'Employee Portal', status: 'completed' },
            { title: 'HR / Manager Review', date: r.status === 'Pending' ? 'In Progress' : 'Reviewed', by: 'Operations', status: r.status === 'Pending' ? 'current' : 'completed' }
          ]
        }));
        setRequests(mapped);
      }
      if (typeRes.ok && typeRes.data?.leaveTypes) {
        setLeaveTypes(typeRes.data.leaveTypes);
      }
      if (holRes.ok && holRes.data?.holidays) {
        setCompanyHolidays(holRes.data.holidays.map(h => ({
          date: h.date.split('T')[0],
          name: h.name,
          day: new Date(h.date).toLocaleDateString('en-US', { weekday: 'long' })
        })));
      }
    } catch (e) {
      console.error('Failed to load live leaves:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaveData();
  }, []);

  // Dynamic leave types configuration combining master UI icons/colors with live backend balances
  const dynamicLeaveTypes = useMemo(() => {
    return LEAVE_TYPES_CONFIG.map(cfg => {
      const liveBal = leaveBalances.find(b => b.leaveType?.name.toLowerCase() === cfg.name.toLowerCase() || b.leaveTypeId === cfg.id);
      if (liveBal) {
        return {
          ...cfg,
          id: liveBal.leaveTypeId || cfg.id,
          totalQuota: Number(liveBal.totalDays),
          used: Number(liveBal.usedDays),
          pending: Number(liveBal.pendingDays),
          available: Number(liveBal.remainingDays),
        };
      }
      return cfg;
    });
  }, [leaveBalances]);

  // Current Type Configuration in Apply Wizard
  const currentTypeConfig = useMemo(() => {
    return dynamicLeaveTypes.find(t => t.id === selectedType) || dynamicLeaveTypes[0] || LEAVE_TYPES_CONFIG[0];
  }, [dynamicLeaveTypes, selectedType]);

  // --------------------------------------------------------------------------
  // LIVE WORKING DAYS & DEDUCTION CALCULATION ENGINE
  // --------------------------------------------------------------------------
  const calculatedDeduction = useMemo(() => {
    if (!startDate || !endDate) {
      return {
        calendarDays: 0,
        workingDays: 0,
        weekends: 0,
        holidays: 0,
        holidayNames: [],
        isValid: false,
        balanceAfter: currentTypeConfig?.available || 0,
        isOverBalance: false
      };
    }

    const start = new Date(startDate);
    const end = new Date(durationMode === 'SINGLE' || durationMode.startsWith('HALF') ? startDate : endDate);

    if (start > end) {
      return {
        calendarDays: 0,
        workingDays: 0,
        weekends: 0,
        holidays: 0,
        holidayNames: [],
        isValid: false,
        balanceAfter: currentTypeConfig?.available || 0,
        isOverBalance: false
      };
    }

    let current = new Date(start);
    let calendarCount = 0;
    let weekendCount = 0;
    let holidayCount = 0;
    const holidayNames = [];

    while (current <= end) {
      calendarCount++;
      const dayOfWeek = current.getDay(); // 0 = Sunday, 6 = Saturday
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      const dateStr = current.toISOString().split('T')[0];
      const matchedHoliday = companyHolidays.find(h => h.date === dateStr);

      if (isWeekend) {
        weekendCount++;
      } else if (matchedHoliday) {
        holidayCount++;
        holidayNames.push(matchedHoliday.name);
      }

      current.setDate(current.getDate() + 1);
    }

    let netWorkingDays = calendarCount - weekendCount - holidayCount;
    if (netWorkingDays < 0) netWorkingDays = 0;

    if (durationMode === 'HALF_FIRST' || durationMode === 'HALF_SECOND') {
      netWorkingDays = netWorkingDays > 0 ? 0.5 : 0;
    }

    const balanceAfter = (currentTypeConfig?.available || 0) - netWorkingDays;
    const isOverBalance = currentTypeConfig?.category !== 'Unpaid' && balanceAfter < 0;

    return {
      calendarDays: calendarCount,
      workingDays: netWorkingDays,
      weekends: weekendCount,
      holidays: holidayCount,
      holidayNames,
      isValid: true,
      balanceAfter,
      isOverBalance
    };
  }, [startDate, endDate, durationMode, currentTypeConfig, companyHolidays]);

  // --------------------------------------------------------------------------
  // CONFIRM LEAVE CANCELLATION HANDLER (BACKEND CONNECTED)
  // --------------------------------------------------------------------------
  const handleConfirmCancel = async () => {
    if (!cancelModalRequest) return;
    try {
      const res = await cancelLeaveApi(cancelModalRequest.id);
      if (res.ok) {
        showToast(`Leave request ${cancelModalRequest.id} has been cancelled.`);
        setCancelModalRequest(null);
        setCancelReason('');
        loadLeaveData();
      } else {
        showToast(res.data?.message || 'Failed to cancel leave request', 'error');
      }
    } catch (err) {
      showToast('Error cancelling leave', 'error');
    }
  };

  // --------------------------------------------------------------------------
  // SUBMIT LEAVE REQUEST (WIZARD STEP 4 -> 5 - BACKEND CONNECTED)
  // --------------------------------------------------------------------------
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (calculatedDeduction.workingDays === 0) {
      showToast('No working days detected in selected date range.', 'error');
      return;
    }

    const isHalfDay = durationMode === 'HALF_FIRST' || durationMode === 'HALF_SECOND';
    const effectiveEndDate = durationMode === 'SINGLE' || isHalfDay ? startDate : endDate;

    try {
      const targetType = leaveTypes.find(t => t.id === currentTypeConfig.id || t.name.toLowerCase() === currentTypeConfig.name.toLowerCase()) || { id: currentTypeConfig.id };

      const res = await applyLeaveApi({
        leaveTypeId: targetType.id,
        startDate,
        endDate: effectiveEndDate,
        calendarDays: calculatedDeduction.calendarDays,
        workingDays: calculatedDeduction.workingDays,
        weekendDays: calculatedDeduction.weekends,
        holidayDays: calculatedDeduction.holidays,
        reason: reasonText,
        handoverUserId: handoverColleague,
        handoverNotes: handoverNotes || 'Project responsibilities communicated with handover contact.',
        isPaid: currentTypeConfig.category !== 'Unpaid',
      });

      if (res.ok) {
        const newId = res.data?.leave?.id || `LV-${Date.now()}`;
        setSubmittedRequestId(newId);
        setApplyStep(5);
        showToast(`Leave request ${newId} submitted successfully!`);
        loadLeaveData();
      } else {
        showToast(res.data?.message || 'Failed to submit leave request.', 'error');
      }
    } catch (err) {
      showToast('Error submitting leave application.', 'error');
    }
  };

  // Reset Apply Wizard
  const handleOpenApplyModal = (prefillTypeId = null) => {
    if (prefillTypeId) setSelectedType(prefillTypeId);
    setApplyStep(1);
    setStartDate('2026-08-25');
    setEndDate('2026-08-29');
    setDurationMode('MULTIPLE');
    setReasonText('');
    setHandoverNotes('');
    setAttachedFile(null);
    setSubmittedRequestId(null);
    setIsApplyModalOpen(true);
  };

  // Filtered Requests
  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      const matchesStatus = statusFilter === 'ALL' || r.status.toUpperCase() === statusFilter;
      const matchesType = typeFilter === 'ALL' || r.typeId === typeFilter;
      const matchesSearch =
        r.typeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [requests, statusFilter, typeFilter, searchQuery]);

  // Upcoming Time Off
  const upcomingTimeOff = useMemo(() => {
    return requests.filter(r => r.status === 'Approved' || r.status === 'Pending');
  }, [requests]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Request ID,Leave Type,Start Date,End Date,Working Days,Status,Reason,Submitted On,Approved By'];
    const rows = filteredRequests.map(
      r =>
        `"${r.id}","${r.typeName}","${r.startDate}","${r.endDate}","${r.workingDays}","${r.status}","${r.reason.replace(/"/g, '""')}","${r.submittedOn}","${r.approvedBy || 'N/A'}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `My_Leaves_Register_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leave history register exported as CSV.');
  };

  return (
    <div className="space-y-6 font-inter text-slate-900">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl border flex items-center gap-3 animate-fade-in text-xs font-semibold ${
          toast.type === 'error'
            ? 'bg-rose-900 text-white border-rose-700'
            : 'bg-[#1F2A52] text-white border-slate-700'
        }`}>
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 1. TOP HEADER & PRIMARY ACTION TOOLBAR                               */}
      {/* ==================================================================== */}
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
          <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">My Leaves</h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Manage your time off, view your leave balance, and track your requests.
          </p>
        </div>

        {/* Year Selector & Prominent "+ Apply Leave" Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 px-3 py-1.5 shadow-xs text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400 mr-2" />
            <span>Year:</span>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="ml-1 font-bold text-[#1F2A52] bg-transparent outline-none cursor-pointer"
            >
              <option value="2026">2026 ▾</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <button
            onClick={() => handleOpenApplyModal()}
            className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-[13px] font-bold rounded-lg shadow-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Apply Leave</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. COMPACT & REFINED LEAVE BALANCE CARDS                             */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LEAVE_TYPES_CONFIG.slice(0, 4).map(type => {
          const Icon = type.icon;
          const pctUsed = Math.round((type.used / type.totalQuota) * 100);

          return (
            <div
              key={type.id}
              onClick={() => setSelectedBalanceDetails(type)}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition flex items-center justify-center text-slate-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#1F2A52] leading-tight">{type.name}</h4>
                      <span className="text-[10px] font-medium text-slate-400">Total: {type.totalQuota} {type.unit}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-horilla-primary flex items-center gap-0.5">
                    <span>Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Balance</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-extrabold text-[#1F2A52]">{type.available}</span>
                    <span className="text-xs font-semibold text-slate-500">{type.unit} available</span>
                  </div>
                </div>

                {/* Progress Bar (8 / 20 used) */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      type.id === 'AL' ? 'bg-indigo-600' :
                      type.id === 'SL' ? 'bg-blue-500' :
                      type.id === 'CL' ? 'bg-emerald-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${pctUsed}%` }}
                  />
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Used: <strong className="text-slate-800">{type.used} {type.unit}</strong></span>
                  <span>Pending: <strong className={type.pending > 0 ? 'text-amber-600' : 'text-slate-700'}>{type.pending} {type.unit}</strong></span>
                </div>
              </div>

              <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{type.used} / {type.totalQuota} used</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenApplyModal(type.id);
                  }}
                  className="font-bold text-horilla-primary hover:underline cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* 3. MAIN TAB NAVIGATION BAR                                           */}
      {/* ==================================================================== */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'requests', label: 'My Requests', icon: FileText, count: requests.length },
          { id: 'upcoming', label: 'Upcoming Time Off', icon: Clock, count: upcomingTimeOff.length },
          { id: 'calendar', label: 'Leave Calendar', icon: CalendarDays },
          { id: 'history', label: 'Leave History', icon: History },
          { id: 'policies', label: 'Leave Policy & Guidelines', icon: BookOpen }
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
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: MY REQUESTS QUEUE & TABLE                                     */}
      {/* ==================================================================== */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          
          {/* Controls Bar: Sub-status tabs, search, and type filter */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Status Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'].map(st => {
                const count = st === 'ALL' ? requests.length : requests.filter(r => r.status.toUpperCase() === st).length;
                return (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      statusFilter === st
                        ? 'bg-[#1F2A52] text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#1F2A52]'
                    }`}
                  >
                    <span>{st}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${statusFilter === st ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search, Type Filter & Export */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by reason or ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
                />
              </div>

              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-medium text-[#333333] outline-none cursor-pointer"
              >
                <option value="ALL">All Leave Types</option>
                <option value="AL">Annual Leave</option>
                <option value="SL">Sick Leave</option>
                <option value="CL">Casual Leave</option>
                <option value="COMP">Compensatory Off</option>
              </select>

              <button
                onClick={handleExportCSV}
                className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition"
                title="Export Leave Register to CSV"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/75">
                    <th className="py-3 px-4">LEAVE TYPE & ID</th>
                    <th className="py-3 px-3">DATE RANGE</th>
                    <th className="py-3 px-3">DURATION</th>
                    <th className="py-3 px-3">SUBMITTED DATE</th>
                    <th className="py-3 px-3">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#1F2A52] block">{req.typeName}</span>
                        <span className="font-mono text-[10px] text-slate-400">{req.id}</span>
                        {req.hasAttachment && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-medium ml-1.5">
                            <File className="w-3 h-3" /> Doc Attached
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 font-medium text-slate-700">
                        {req.dateRangeDisplay}
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-mono font-bold text-[#1F2A52] bg-slate-100 px-2 py-0.5 rounded text-xs">
                          {req.workingDays} working days
                        </span>
                        {req.weekendDays > 0 && (
                          <span className="text-[10px] text-slate-400 block mt-0.5">({req.weekendDays} weekend excluded)</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-slate-600 text-xs">
                        {req.submittedOn}
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 ${
                            req.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : req.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : req.status === 'Rejected'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {req.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedRequestDetails(req)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-horilla-primary hover:text-white text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                        >
                          View Details
                        </button>

                        {req.status === 'Pending' && (
                          <button
                            onClick={() => setCancelModalRequest(req)}
                            className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        <Calendar className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold text-slate-600">No leave requests found</p>
                        <p className="text-xs text-slate-400 mt-0.5">Try changing filters or submit a new time-off application</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: UPCOMING TIME OFF                                             */}
      {/* ==================================================================== */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[16px] font-bold text-[#333333]">Upcoming Time Off</h3>
                <p className="text-xs text-slate-500">Your scheduled and pending leaves in the pipeline</p>
              </div>
              <button
                onClick={() => handleOpenApplyModal()}
                className="text-xs font-bold text-horilla-primary hover:underline cursor-pointer"
              >
                + Plan More Time Off
              </button>
            </div>

            {upcomingTimeOff.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingTimeOff.map(req => (
                  <div
                    key={req.id}
                    className={`p-4 rounded-xl border space-y-2 text-xs transition ${
                      req.status === 'Approved'
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-amber-50/40 border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1F2A52] text-sm">{req.typeName}</span>
                        <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{req.id}</span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          req.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status === 'Approved' ? 'Approved ✓' : 'Pending'}
                      </span>
                    </div>

                    <p className="text-slate-700 font-medium">
                      Dates: <strong>{req.dateRangeDisplay}</strong> ({req.durationLabel})
                    </p>

                    <p className="text-slate-500 italic bg-white p-2.5 rounded-lg border border-slate-100">
                      "{req.reason}"
                    </p>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Handover: <strong className="text-slate-800">{req.handoverTo}</strong></span>
                      <button
                        onClick={() => setSelectedRequestDetails(req)}
                        className="font-bold text-horilla-primary hover:underline cursor-pointer"
                      >
                        View Timeline &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">
                <Calendar className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="font-semibold text-slate-600">No upcoming time off</p>
                <p className="text-xs text-slate-400 mt-0.5">Planning a break?</p>
                <button
                  onClick={() => handleOpenApplyModal()}
                  className="mt-3 px-4 py-2 bg-horilla-primary text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs"
                >
                  Apply Leave
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: PERSONAL LEAVE CALENDAR                                       */}
      {/* ==================================================================== */}
      {activeTab === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[16px] font-bold text-[#333333]">AUGUST 2026</h3>
                <p className="text-[12px] text-slate-500">Personal time-off schedule and company holiday calendar</p>
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

            {/* Day Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase py-1">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Aug 2026 padding */}
              {[1, 2, 3, 4, 5].map(p => (
                <div key={`pad-${p}`} className="h-16 bg-slate-50/40 rounded-xl border border-dashed border-slate-100" />
              ))}

              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const dateStr = `2026-08-${day.toString().padStart(2, '0')}`;
                const isWeekend = (5 + day) % 7 === 5 || (5 + day) % 7 === 6;
                const isHoliday = COMPANY_HOLIDAYS_2026.some(h => h.date === dateStr);
                const isPendingLeave = day >= 25 && day <= 29;

                return (
                  <div
                    key={day}
                    onClick={() => {
                      if (isPendingLeave) {
                        const found = requests.find(r => r.id === 'LV-2026-00842');
                        if (found) setSelectedRequestDetails(found);
                      }
                    }}
                    className={`h-16 p-1.5 rounded-xl border flex flex-col justify-between text-left text-xs transition cursor-pointer ${
                      isPendingLeave
                        ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/50 hover:bg-amber-100/60'
                        : isHoliday
                        ? 'bg-purple-50 border-purple-200 text-purple-900'
                        : isWeekend
                        ? 'bg-slate-50 border-slate-200 text-slate-400'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{day}</span>
                      {isPendingLeave && <span className="w-2 h-2 rounded-full bg-amber-500" title="Pending Leave" />}
                      {isHoliday && <span className="w-2 h-2 rounded-full bg-purple-600" title="Company Holiday" />}
                    </div>

                    <div className="text-[10px] truncate font-medium">
                      {isPendingLeave && <span className="text-amber-700 font-semibold">25–29 Aug Leave</span>}
                      {isHoliday && <span className="text-purple-700 font-bold">{day === 15 ? 'Indep. Day' : 'Natl Holiday'}</span>}
                      {isWeekend && !isHoliday && <span className="text-slate-400">Weekend</span>}
                      {!isWeekend && !isHoliday && !isPendingLeave && <span className="text-emerald-600">Working</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Approved Leave</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pending Leave</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Company Holiday</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Weekend</span>
            </div>
          </div>

          {/* Side Holidays Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h4 className="text-[15px] font-bold text-[#1F2A52]">Observed Holidays</h4>
              <p className="text-xs text-slate-500">2026 official non-working company holidays</p>
            </div>

            <div className="space-y-2.5 text-xs">
              {COMPANY_HOLIDAYS_2026.slice(0, 7).map((h, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#1F2A52] block">{h.name}</span>
                    <span className="text-[11px] text-slate-500">{h.day}</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-purple-700">
                    {h.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: LEAVE HISTORY TABLE                                           */}
      {/* ==================================================================== */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-[16px] font-bold text-[#333333]">Leave History</h3>
                <p className="text-xs text-slate-500">Full historical log of all applications submitted across fiscal years</p>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer flex items-center gap-1.5 transition self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export History CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/75">
                    <th className="py-3 px-4">LEAVE TYPE</th>
                    <th className="py-3 px-3">DATE</th>
                    <th className="py-3 px-3">DURATION</th>
                    <th className="py-3 px-3">SUBMITTED</th>
                    <th className="py-3 px-3">STATUS</th>
                    <th className="py-3 px-4 text-right">DETAILS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-[#1F2A52]">
                        <span>{req.typeName}</span>
                        <span className="font-mono text-[10px] text-slate-400 block font-normal">{req.id}</span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-700 font-medium">
                        {req.dateRangeDisplay}
                      </td>

                      <td className="py-3.5 px-3 font-mono font-bold text-[#1F2A52]">
                        {req.workingDays} days
                      </td>

                      <td className="py-3.5 px-3 text-slate-600 text-xs">
                        {req.submittedOn.split(',')[0]}
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            req.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : req.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : req.status === 'Rejected'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedRequestDetails(req)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-horilla-primary hover:text-white text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: LEAVE POLICY & GUIDELINES                                     */}
      {/* ==================================================================== */}
      {activeTab === 'policies' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-[16px] font-bold text-[#333333]">Company Leave Policy</h3>
              <p className="text-xs text-slate-500">Applicable entitlements, notice periods, carryover rules, and approval workflows</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {LEAVE_TYPES_CONFIG.map(policy => {
                const Icon = policy.icon;
                return (
                  <div
                    key={policy.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 hover:border-slate-300 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1F2A52] text-[13px]">{policy.name}</h4>
                          <span className="text-[10px] text-slate-500 font-semibold">{policy.totalQuota} {policy.unit} Annual Allocation</span>
                        </div>
                      </div>

                      <p className="text-slate-600 leading-relaxed mt-2">{policy.purpose}</p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-200/80 text-[11px] mt-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Notice Period:</span>
                          <span className="font-semibold text-slate-700">{policy.noticePeriod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Carry Forward:</span>
                          <span className="font-semibold text-slate-700">{policy.carryForward}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Documentation:</span>
                          <span className="font-semibold text-slate-700 text-right">{policy.docRequired}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Approval:</span>
                          <span className="font-semibold text-slate-700">{policy.approvalWorkflow}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPolicyDetails(policy)}
                      className="w-full mt-3 py-1.5 bg-white hover:bg-horilla-primary hover:text-white border border-slate-200 text-slate-700 font-bold rounded-lg transition text-xs cursor-pointer text-center"
                    >
                      View Full Policy &rarr;
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. MULTI-STEP APPLY LEAVE MODAL FLOW                                 */}
      {/* ==================================================================== */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-modal-pop relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">Apply Leave</h3>
                <p className="text-xs text-slate-500">Step {applyStep} of 4 • {
                  applyStep === 1 ? 'Select Leave Type' :
                  applyStep === 2 ? 'Select Dates & Calculate Deduction' :
                  applyStep === 3 ? 'Reason & Supporting Documents' :
                  applyStep === 4 ? 'Review & Submit' : 'Submission Success'
                }</p>
              </div>

              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Progress Indicator */}
            {applyStep <= 4 && (
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {['1. Leave Details', '2. Dates', '3. Reason & Docs', '4. Review & Submit'].map((st, i) => (
                  <div
                    key={i}
                    className={`py-1.5 rounded-lg font-semibold text-[11px] transition ${
                      applyStep === i + 1
                        ? 'bg-[#1F2A52] text-white'
                        : applyStep > i + 1
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {st}
                  </div>
                ))}
              </div>
            )}

            {/* STEP 1: SELECT LEAVE TYPE */}
            {applyStep === 1 && (
              <div className="space-y-4 text-xs">
                <p className="font-semibold text-slate-700">Select Leave Type:</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {LEAVE_TYPES_CONFIG.map(lt => {
                    const Icon = lt.icon;
                    const isSelected = selectedType === lt.id;

                    return (
                      <div
                        key={lt.id}
                        onClick={() => setSelectedType(lt.id)}
                        className={`p-3.5 rounded-xl border transition cursor-pointer space-y-1.5 relative ${
                          isSelected
                            ? 'border-horilla-primary bg-rose-50/20 ring-2 ring-horilla-primary/20'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-slate-700" />
                            <span className="font-bold text-[#1F2A52]">{lt.name}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-horilla-primary" />}
                        </div>

                        <p className="text-[11px] text-slate-500 leading-snug">{lt.purpose}</p>

                        <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100">
                          <span className="text-slate-600 font-bold">{lt.available} {lt.unit} available</span>
                          <span className="text-slate-400">{lt.noticePeriod}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setApplyStep(2)}
                    className="px-5 py-2.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Continue to Dates</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SELECT DATES & WORKING DAY CALCULATION */}
            {applyStep === 2 && (
              <div className="space-y-4 text-xs">
                {/* Duration Mode Selector */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Leave Duration Mode</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'SINGLE', label: 'Single Day' },
                      { id: 'MULTIPLE', label: 'Multiple Days' },
                      { id: 'HALF_FIRST', label: 'Half Day (First Half)' },
                      { id: 'HALF_SECOND', label: 'Half Day (Second Half)' }
                    ].map(mode => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setDurationMode(mode.id)}
                        className={`py-2 px-2.5 rounded-lg font-semibold text-xs transition cursor-pointer border text-center ${
                          durationMode === mode.id
                            ? 'bg-[#1F2A52] text-white border-[#1F2A52]'
                            : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-horilla-primary text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {durationMode === 'MULTIPLE' ? 'End Date' : 'End Date (Single Day)'}
                    </label>
                    <input
                      type="date"
                      disabled={durationMode !== 'MULTIPLE'}
                      value={durationMode === 'MULTIPLE' ? endDate : startDate}
                      onChange={e => setEndDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-horilla-primary text-xs disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* SMART WORKING DAYS & DEDUCTION CALCULATION BOX */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-[#1F2A52]">Actual Leave Deduction:</span>
                    <span className="font-mono text-base font-extrabold text-horilla-primary">
                      {calculatedDeduction.workingDays} {calculatedDeduction.workingDays === 1 ? 'day' : 'days'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600">
                    <div>Calendar Days: <strong>{calculatedDeduction.calendarDays}</strong></div>
                    <div>Weekend Days: <strong className="text-emerald-700">{calculatedDeduction.weekends}</strong></div>
                    <div>Company Holidays: <strong className="text-purple-700">{calculatedDeduction.holidays}</strong></div>
                  </div>

                  {calculatedDeduction.weekends > 0 && (
                    <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200">
                      ✓ Weekend days are not deducted from your leave balance according to company policy.
                    </p>
                  )}

                  {calculatedDeduction.holidayNames.length > 0 && (
                    <p className="text-[11px] text-purple-700 bg-purple-50 p-2 rounded border border-purple-200">
                      ✓ Company Holiday ({calculatedDeduction.holidayNames.join(', ')}) will not be deducted from your leave balance.
                    </p>
                  )}

                  {/* Balance Impact */}
                  <div className="pt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Available</span>
                      <span className="font-bold text-slate-800">{currentTypeConfig.available} days</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Pending</span>
                      <span className="font-bold text-amber-600">{currentTypeConfig.pending} days</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Requested</span>
                      <span className="font-bold text-horilla-primary">{calculatedDeduction.workingDays} days</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Remaining After</span>
                      <span className={`font-bold ${calculatedDeduction.isOverBalance ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {calculatedDeduction.balanceAfter} days
                      </span>
                    </div>
                  </div>
                </div>

                {calculatedDeduction.isOverBalance && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>
                      <strong>Insufficient Leave Balance:</strong> You have only {currentTypeConfig.available} days available, but this request requires {calculatedDeduction.workingDays} days.
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setApplyStep(1)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    disabled={!calculatedDeduction.isValid || calculatedDeduction.workingDays === 0 || calculatedDeduction.isOverBalance}
                    onClick={() => setApplyStep(3)}
                    className="px-5 py-2.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>Continue to Reason</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REASON & DOCUMENTS */}
            {applyStep === 3 && (
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Reason for Leave</label>
                    <span className="text-[10px] text-slate-400">{reasonText.length} / 500 characters</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={500}
                    required
                    value={reasonText}
                    onChange={e => setReasonText(e.target.value)}
                    placeholder="Briefly explain why you are requesting leave..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-horilla-primary"
                  />
                </div>

                {/* Handover Colleague */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Backup / Handover Colleague</label>
                    <select
                      value={handoverColleague}
                      onChange={e => setHandoverColleague(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none cursor-pointer"
                    >
                      {HANDOVER_COLLEAGUES.map(t => (
                        <option key={t.id} value={t.name}>{t.name} ({t.role})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Handover Notes (Optional)</label>
                    <input
                      type="text"
                      value={handoverNotes}
                      onChange={e => setHandoverNotes(e.target.value)}
                      placeholder="Add important information for your team..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none"
                    />
                  </div>
                </div>

                {/* Supporting Document Uploader */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Supporting Document {currentTypeConfig.id === 'SL' && calculatedDeduction.workingDays > 2 ? '(Medical Certificate Required)' : '(Optional)'}
                  </label>
                  
                  {attachedFile ? (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-900 font-semibold">
                        <File className="w-4 h-4 text-blue-600" />
                        <span>{attachedFile.name} ({(attachedFile.size / 1024).toFixed(1)} KB)</span>
                        <span className="text-emerald-600 text-[11px] font-bold">✓ Uploaded</span>
                      </div>
                      <button
                        onClick={() => setAttachedFile(null)}
                        className="p-1 text-rose-600 hover:bg-rose-100 rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-200 hover:border-horilla-primary rounded-xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition">
                      <UploadCloud className="w-6 h-6 text-slate-400" />
                      <span className="font-semibold text-slate-700">Upload a PDF, JPG or PNG</span>
                      <span className="text-[10px] text-slate-400">Maximum size: 5 MB</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={e => {
                          if (e.target.files?.[0]) {
                            setAttachedFile(e.target.files[0]);
                            showToast('Document uploaded successfully.');
                          }
                        }}
                      />
                    </label>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setApplyStep(2)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    disabled={!reasonText.trim()}
                    onClick={() => setApplyStep(4)}
                    className="px-5 py-2.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>Review Leave Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & SUBMIT */}
            {applyStep === 4 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-[#1F2A52] text-sm">Review Your Leave Request</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      Status After Submission: Pending
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Leave Type</span>
                      <span className="font-bold text-slate-900">{currentTypeConfig.name}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Dates</span>
                      <span className="font-bold text-slate-900">{startDate} to {durationMode === 'SINGLE' ? startDate : endDate}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Calendar Days</span>
                      <span className="font-bold text-slate-900">{calculatedDeduction.calendarDays}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Working Days</span>
                      <span className="font-bold text-slate-900">{calculatedDeduction.workingDays}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Leave Deduction</span>
                      <span className="font-mono font-bold text-horilla-primary">{calculatedDeduction.workingDays} days</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Supporting Document</span>
                      <span className="font-semibold text-slate-900">{attachedFile ? attachedFile.name : 'None'}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase mb-1">Reason</span>
                    <p className="p-2.5 bg-white rounded-lg border border-slate-100 italic text-slate-700">
                      "{reasonText}"
                    </p>
                  </div>
                </div>

                {/* Balance Summary Box */}
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                  <div>
                    <span>Current Balance: <strong>{currentTypeConfig.available} days</strong></span>
                  </div>
                  <div>
                    <span>Remaining After Approval: <strong className="text-sm font-mono">{calculatedDeduction.balanceAfter} days</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setApplyStep(3)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Leave Request</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 5: SUBMISSION SUCCESS STATE */}
            {applyStep === 5 && (
              <div className="py-6 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1F2A52]">✓ Leave Request Submitted</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your request has been sent for approval.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Request ID:</span>
                    <span className="font-mono font-bold text-slate-900">{submittedRequestId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Leave Type:</span>
                    <span className="font-bold text-slate-900">{currentTypeConfig.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dates:</span>
                    <span className="font-bold text-slate-900">{startDate} – {endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-mono font-bold text-horilla-primary">{calculatedDeduction.workingDays} working days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-amber-700">Pending</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsApplyModalOpen(false);
                      const found = requests.find(r => r.id === submittedRequestId);
                      if (found) setSelectedRequestDetails(found);
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
                  >
                    View Request
                  </button>

                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-lg text-xs shadow-xs cursor-pointer"
                  >
                    Back to My Leaves
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 5. LEAVE BALANCE DETAILS MODAL                                       */}
      {/* ==================================================================== */}
      {selectedBalanceDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">{selectedBalanceDetails.name} Balance Details</h3>
                <p className="text-xs text-slate-500">{selectedBalanceDetails.category}</p>
              </div>

              <button
                onClick={() => setSelectedBalanceDetails(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Allocated</span>
                  <span className="font-extrabold text-base text-slate-900">{selectedBalanceDetails.totalQuota} days</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Used</span>
                  <span className="font-extrabold text-base text-slate-900">{selectedBalanceDetails.used} days</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Pending</span>
                  <span className="font-extrabold text-base text-amber-600">{selectedBalanceDetails.pending} days</span>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 uppercase font-bold block">Available</span>
                  <span className="font-extrabold text-base text-emerald-700">{selectedBalanceDetails.available} days</span>
                </div>
                <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200">
                  <span className="text-[10px] text-blue-800 uppercase font-bold block">Upcoming</span>
                  <span className="font-extrabold text-base text-blue-700">{selectedBalanceDetails.upcoming} days</span>
                </div>
              </div>

              {/* Progress */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>Usage Progress</span>
                  <span>{selectedBalanceDetails.used} / {selectedBalanceDetails.totalQuota} used</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${Math.round((selectedBalanceDetails.used / selectedBalanceDetails.totalQuota) * 100)}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                * Pending requests are not deducted permanently until approved, according to company policy.
              </p>

              {/* Balance Adjustments History */}
              {selectedBalanceDetails.historyLogs && selectedBalanceDetails.historyLogs.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="font-bold text-[#1F2A52] block">Balance History Log</span>
                  <div className="space-y-1.5">
                    {selectedBalanceDetails.historyLogs.map((log, idx) => (
                      <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-[11px]">
                        <div>
                          <span className="font-semibold text-slate-800 block">{log.event}</span>
                          <span className="text-[10px] text-slate-400">{log.date}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-horilla-primary block">{log.change}</span>
                          <span className="text-[10px] text-slate-400">Bal: {log.balance}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedBalanceDetails(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const tid = selectedBalanceDetails.id;
                  setSelectedBalanceDetails(null);
                  handleOpenApplyModal(tid);
                }}
                className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-lg text-xs shadow-xs"
              >
                Apply for {selectedBalanceDetails.name}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 6. LEAVE REQUEST DETAILS DRAWER / MODAL                              */}
      {/* ==================================================================== */}
      {selectedRequestDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-modal-pop relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs text-slate-400 block">{selectedRequestDetails.id}</span>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">Leave Request — {selectedRequestDetails.typeName}</h3>
              </div>

              <button
                onClick={() => setSelectedRequestDetails(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Status Header Banner */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Status</span>
                  <p className="font-bold text-sm text-[#1F2A52]">{selectedRequestDetails.status}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedRequestDetails.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedRequestDetails.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800'
                      : selectedRequestDetails.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {selectedRequestDetails.status}
                </span>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Leave Type</span>
                  <span className="font-bold text-slate-900">{selectedRequestDetails.typeName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Date Range</span>
                  <span className="font-bold text-slate-900">{selectedRequestDetails.dateRangeDisplay}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                  <span className="font-mono font-bold text-horilla-primary">{selectedRequestDetails.durationLabel}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Submitted Date</span>
                  <span className="font-semibold text-slate-900">{selectedRequestDetails.submittedOn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Handover Colleague</span>
                  <span className="font-semibold text-slate-900">{selectedRequestDetails.handoverTo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Supporting Document</span>
                  <span className="font-semibold text-slate-900">{selectedRequestDetails.hasAttachment ? selectedRequestDetails.attachmentName : 'None'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold block text-[10px] uppercase mb-1">Reason</span>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 italic text-slate-700">
                  "{selectedRequestDetails.reason}"
                </p>
              </div>

              {/* Approval Timeline */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-[#1F2A52] block">Approval Timeline</span>
                <div className="space-y-3">
                  {selectedRequestDetails.timeline?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                        step.status === 'completed'
                          ? 'bg-emerald-500 text-white'
                          : step.status === 'current'
                          ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-200'
                          : step.status === 'rejected'
                          ? 'bg-rose-500 text-white'
                          : step.status === 'cancelled'
                          ? 'bg-slate-400 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-800">{step.title}</p>
                          <span className="text-[10px] text-slate-400">{step.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{step.by}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditional States */}
              {selectedRequestDetails.status === 'Approved' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 space-y-1">
                  <p className="font-bold">✓ Approved by {selectedRequestDetails.approvedBy} on {selectedRequestDetails.approvedOn}</p>
                  <p>Leave Deducted: <strong>{selectedRequestDetails.leaveDeducted}</strong> • Balance Remaining: <strong>{selectedRequestDetails.balanceRemaining}</strong></p>
                </div>
              )}

              {selectedRequestDetails.status === 'Pending' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
                  <p className="font-semibold">Your leave request is currently awaiting approval.</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">Cancellation may require approval according to company policy.</p>
                </div>
              )}

              {selectedRequestDetails.status === 'Rejected' && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 space-y-2">
                  <div>
                    <p className="font-bold">Request Rejected by {selectedRequestDetails.rejectedBy} on {selectedRequestDetails.rejectedOn}</p>
                    <p className="text-slate-700 mt-1">Reason: <em>"{selectedRequestDetails.rejectionReason}"</em></p>
                  </div>
                  <button
                    onClick={() => {
                      const tid = selectedRequestDetails.typeId;
                      setSelectedRequestDetails(null);
                      handleOpenApplyModal(tid);
                    }}
                    className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs"
                  >
                    Apply Again
                  </button>
                </div>
              )}

              {selectedRequestDetails.status === 'Cancelled' && (
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-700">
                  <p className="font-bold">Request Cancelled on {selectedRequestDetails.cancelledOn}</p>
                  <p className="text-slate-600 mt-0.5">Reason: {selectedRequestDetails.cancellationReason}</p>
                </div>
              )}

            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedRequestDetails(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Close
              </button>

              {selectedRequestDetails.status === 'Pending' && (
                <button
                  onClick={() => {
                    setCancelModalRequest(selectedRequestDetails);
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs"
                >
                  Cancel Request
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 7. LEAVE POLICY DETAILS DRAWER / MODAL                               */}
      {/* ==================================================================== */}
      {selectedPolicyDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-horilla-primary uppercase">{selectedPolicyDetails.category}</span>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">{selectedPolicyDetails.name} Policy</h3>
              </div>
              <button onClick={() => setSelectedPolicyDetails(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedPolicyDetails.purpose}
              </p>

              <div className="space-y-2">
                <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Annual Allocation:</span>
                  <span className="font-bold text-[#1F2A52]">{selectedPolicyDetails.totalQuota} {selectedPolicyDetails.unit}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Available to You:</span>
                  <span className="font-bold text-emerald-700">{selectedPolicyDetails.available} {selectedPolicyDetails.unit}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Notice Period:</span>
                  <span className="font-semibold text-slate-800">{selectedPolicyDetails.noticePeriod}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Maximum Continuous Leave:</span>
                  <span className="font-semibold text-slate-800">{selectedPolicyDetails.maxContinuous}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Carry Forward Rule:</span>
                  <span className="font-semibold text-slate-800">{selectedPolicyDetails.carryForward}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Documentation Required:</span>
                  <span className="font-semibold text-slate-800 text-right">{selectedPolicyDetails.docRequired}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Approval Process:</span>
                  <span className="font-semibold text-slate-800">{selectedPolicyDetails.approvalWorkflow}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedPolicyDetails(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const tid = selectedPolicyDetails.id;
                  setSelectedPolicyDetails(null);
                  handleOpenApplyModal(tid);
                }}
                className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-lg text-xs shadow-xs"
              >
                Apply Under This Policy
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 8. CANCEL REQUEST CONFIRMATION MODAL                                 */}
      {/* ==================================================================== */}
      {cancelModalRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-600 font-bold">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-[16px]">Cancel Leave Request?</h3>
              </div>
              <button onClick={() => setCancelModalRequest(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                Are you sure you want to cancel request <strong className="text-slate-900">{cancelModalRequest.id}</strong> ({cancelModalRequest.typeName}) for dates <strong className="text-slate-900">{cancelModalRequest.dateRangeDisplay}</strong>?
              </p>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cancellation Reason (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Vacation plans rescheduled"
                  value={cancelReason}
                  onChange={e => setCancelReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setCancelModalRequest(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
              >
                Keep Request
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs shadow-xs cursor-pointer"
              >
                Cancel Request
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyLeaves;

import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Filter,
  Plus,
  Search,
  Download,
  Calendar,
  Clock,
  UserCheck,
  Users,
  AlertCircle,
  FileText,
  Paperclip,
  Check,
  X,
  Building,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  List,
  CalendarDays,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const LeaveManagementPage = () => {
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' | 'balances' | 'calendar' | 'holidays'
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Drawers
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAdjustBalanceModalOpen, setIsAdjustBalanceModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedBalanceUser, setSelectedBalanceUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Review Form state
  const [reviewAction, setReviewAction] = useState('Approved');
  const [reviewComment, setReviewComment] = useState('');

  // Assign Leave Form state
  const [assignEmployee, setAssignEmployee] = useState('');
  const [assignType, setAssignType] = useState('Casual Leave');
  const [assignStartDate, setAssignStartDate] = useState('2026-08-25');
  const [assignEndDate, setAssignEndDate] = useState('2026-08-26');
  const [assignDays, setAssignDays] = useState(2);
  const [assignReason, setAssignReason] = useState('');
  const [assignIsPaid, setAssignIsPaid] = useState(true);

  // Adjust Balance Form state
  const [adjAnnual, setAdjAnnual] = useState(0);
  const [adjSick, setAdjSick] = useState(0);
  const [adjCasual, setAdjCasual] = useState(0);

  // Requests Data State
  const [requests, setRequests] = useState([
    {
      id: 'LR-1001',
      name: 'Elena Rostova',
      empId: 'DAY-ER-2026-0012',
      dept: 'Engineering',
      role: 'Full Stack Engineer',
      avatar: 'ER',
      type: 'Annual Leave',
      dates: 'Aug 24 - Aug 26, 2026',
      startDate: '2026-08-24',
      endDate: '2026-08-26',
      days: 3,
      appliedOn: 'Aug 20, 2026',
      status: 'Pending',
      reason: 'Attending family annual vacation and cousin wedding ceremony.',
      attachment: 'travel_tickets.pdf',
      balanceLeft: { annual: 12, sick: 8, casual: 6 },
      comment: '',
      reviewedBy: ''
    },
    {
      id: 'LR-1002',
      name: 'Michael Chang',
      empId: 'DAY-MC-2026-0044',
      dept: 'Engineering',
      role: 'Backend Developer',
      avatar: 'MC',
      type: 'Sick Leave',
      dates: 'Aug 22 - Aug 23, 2026',
      startDate: '2026-08-22',
      endDate: '2026-08-23',
      days: 2,
      appliedOn: 'Aug 21, 2026',
      status: 'Pending',
      reason: 'Severe acute throat infection and doctor recommended 2 days vocal rest.',
      attachment: 'medical_certificate.pdf',
      balanceLeft: { annual: 15, sick: 4, casual: 8 },
      comment: '',
      reviewedBy: ''
    },
    {
      id: 'LR-1003',
      name: 'Sarah Connor',
      empId: 'DAY-SC-2026-0089',
      dept: 'Operations',
      role: 'Logistics Coordinator',
      avatar: 'SC',
      type: 'Casual Leave',
      dates: 'Aug 29, 2026',
      startDate: '2026-08-29',
      endDate: '2026-08-29',
      days: 1,
      appliedOn: 'Aug 18, 2026',
      status: 'Approved',
      reason: 'Urgent home maintenance and municipal inspection appointment.',
      attachment: null,
      balanceLeft: { annual: 14, sick: 10, casual: 5 },
      comment: 'Approved. Ensure handoff to standby operations lead.',
      reviewedBy: 'Adam Admin'
    },
    {
      id: 'LR-1004',
      name: 'Alex Rivera',
      empId: 'DAY-AR-2026-0045',
      dept: 'Product Design',
      role: 'Senior UI/UX Designer',
      avatar: 'AR',
      type: 'Unpaid Leave',
      dates: 'Sep 02 - Sep 05, 2026',
      startDate: '2026-09-02',
      endDate: '2026-09-05',
      days: 4,
      appliedOn: 'Aug 15, 2026',
      status: 'Rejected',
      reason: 'Extended personal overseas travel trip with friends.',
      attachment: null,
      balanceLeft: { annual: 2, sick: 7, casual: 1 },
      comment: 'Overlaps with client product launch Sprint 4 milestone deliverable.',
      reviewedBy: 'Adam Admin'
    },
    {
      id: 'LR-1005',
      name: 'David Chen',
      empId: 'DAY-DC-2026-0008',
      dept: 'Human Resources',
      role: 'Talent Specialist',
      avatar: 'DC',
      type: 'Casual Leave',
      dates: 'Aug 28, 2026',
      startDate: '2026-08-28',
      endDate: '2026-08-28',
      days: 1,
      appliedOn: 'Aug 22, 2026',
      status: 'Pending',
      reason: 'Attending younger sister convocation ceremony at City University.',
      attachment: null,
      balanceLeft: { annual: 16, sick: 9, casual: 7 },
      comment: '',
      reviewedBy: ''
    }
  ]);

  // Leave Balances State
  const [leaveBalances, setLeaveBalances] = useState([
    { id: 'DAY-HR-2026-0001', name: 'Adam Admin', dept: 'Executive', annual: { total: 20, used: 2, remaining: 18 }, sick: { total: 10, used: 1, remaining: 9 }, casual: { total: 10, used: 2, remaining: 8 } },
    { id: 'DAY-SJ-2026-0012', name: 'Sarah Jenkins', dept: 'Engineering', annual: { total: 18, used: 4, remaining: 14 }, sick: { total: 10, used: 2, remaining: 8 }, casual: { total: 10, used: 3, remaining: 7 } },
    { id: 'DAY-AR-2026-0045', name: 'Alex Rivera', dept: 'Product Design', annual: { total: 18, used: 16, remaining: 2 }, sick: { total: 10, used: 3, remaining: 7 }, casual: { total: 10, used: 9, remaining: 1 } },
    { id: 'DAY-DC-2026-0008', name: 'David Chen', dept: 'Human Resources', annual: { total: 18, used: 2, remaining: 16 }, sick: { total: 10, used: 1, remaining: 9 }, casual: { total: 10, used: 3, remaining: 7 } },
    { id: 'DAY-EW-2026-0033', name: 'Emma Watson', dept: 'Operations', annual: { total: 18, used: 5, remaining: 13 }, sick: { total: 10, used: 0, remaining: 10 }, casual: { total: 10, used: 4, remaining: 6 } },
    { id: 'DAY-ER-2026-0012', name: 'Elena Rostova', dept: 'Engineering', annual: { total: 18, used: 6, remaining: 12 }, sick: { total: 10, used: 2, remaining: 8 }, casual: { total: 10, used: 4, remaining: 6 } },
    { id: 'DAY-AM-2026-0051', name: 'Alice Murphy', dept: 'Marketing', annual: { total: 18, used: 3, remaining: 15 }, sick: { total: 10, used: 1, remaining: 9 }, casual: { total: 10, used: 2, remaining: 8 } },
    { id: 'DAY-JS-2026-0077', name: 'John Smith', dept: 'Sales', annual: { total: 18, used: 8, remaining: 10 }, sick: { total: 10, used: 4, remaining: 6 }, casual: { total: 10, used: 5, remaining: 5 } }
  ]);

  // Company Holidays 2026
  const companyHolidays = [
    { name: 'Labor Day', date: 'Sep 07, 2026', day: 'Monday', type: 'Public Holiday', status: 'Upcoming' },
    { name: 'Columbus Day / Indigenous Peoples Day', date: 'Oct 12, 2026', day: 'Monday', type: 'Federal Holiday', status: 'Upcoming' },
    { name: 'Veterans Day', date: 'Nov 11, 2026', day: 'Wednesday', type: 'Public Holiday', status: 'Upcoming' },
    { name: 'Thanksgiving Day', date: 'Nov 26, 2026', day: 'Thursday', type: 'Mandatory Holiday', status: 'Upcoming' },
    { name: 'Day After Thanksgiving', date: 'Nov 27, 2026', day: 'Friday', type: 'Company Floater', status: 'Upcoming' },
    { name: 'Christmas Day', date: 'Dec 25, 2026', day: 'Friday', type: 'Mandatory Holiday', status: 'Upcoming' }
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Requests
  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.dept.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || r.status.toUpperCase() === statusFilter.toUpperCase();
      const matchesType = typeFilter === 'ALL' || r.type === typeFilter;
      const matchesDept = deptFilter === 'ALL' || r.dept === deptFilter;
      return matchesSearch && matchesStatus && matchesType && matchesDept;
    });
  }, [requests, searchTerm, statusFilter, typeFilter, deptFilter]);

  // KPIs
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const approvedCount = requests.filter(r => r.status === 'Approved').length;
  const rejectedCount = requests.filter(r => r.status === 'Rejected').length;
  const onLeaveToday = 2; // Elena & Emma
  const totalDaysApproved = requests
    .filter(r => r.status === 'Approved')
    .reduce((sum, r) => sum + r.days, 0);

  // Quick Action (Direct Approve / Reject)
  const handleQuickAction = (id, newStatus) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            status: newStatus,
            reviewedBy: 'Adam Admin (HR)',
            comment: newStatus === 'Approved' ? 'Quick approved by HR Manager.' : 'Rejected by HR Manager.'
          };
        }
        return r;
      })
    );
    showToast(`Leave request ${id} ${newStatus.toLowerCase()} successfully.`);
  };

  // Open Detailed Review Modal
  const openReviewModal = (req) => {
    setSelectedRequest(req);
    setReviewAction(req.status === 'Pending' ? 'Approved' : req.status);
    setReviewComment(req.comment || '');
    setIsReviewModalOpen(true);
  };

  // Submit Detailed Review Modal
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    setRequests(prev =>
      prev.map(r => {
        if (r.id === selectedRequest.id) {
          return {
            ...r,
            status: reviewAction,
            comment: reviewComment || (reviewAction === 'Approved' ? 'Approved by HR' : 'Rejected by HR'),
            reviewedBy: 'Adam Admin (HR)'
          };
        }
        return r;
      })
    );

    setIsReviewModalOpen(false);
    showToast(`Leave request ${selectedRequest.id} marked as ${reviewAction}.`);
  };

  // Submit Assign Leave Modal
  const handleAssignLeave = (e) => {
    e.preventDefault();
    if (!assignEmployee) {
      alert('Please select an employee');
      return;
    }

    const employeeObj = leaveBalances.find(b => b.id === assignEmployee);
    const newReq = {
      id: `LR-${Date.now().toString().slice(-4)}`,
      name: employeeObj ? employeeObj.name : 'Staff Member',
      empId: assignEmployee,
      dept: employeeObj ? employeeObj.dept : 'General',
      role: 'Staff Specialist',
      avatar: assignEmployee.slice(4, 6),
      type: assignType,
      dates: `${assignStartDate} to ${assignEndDate}`,
      startDate: assignStartDate,
      endDate: assignEndDate,
      days: Number(assignDays),
      appliedOn: 'Aug 22, 2026',
      status: 'Approved',
      reason: assignReason || 'Assigned directly by HR Admin',
      attachment: null,
      balanceLeft: { annual: 10, sick: 8, casual: 6 },
      comment: 'Direct assignment by HR Administration',
      reviewedBy: 'Adam Admin (HR)'
    };

    setRequests(prev => [newReq, ...prev]);
    setIsAssignModalOpen(false);
    showToast(`Leave assigned for ${newReq.name} (${newReq.days} days).`);

    // Reset
    setAssignEmployee('');
    setAssignReason('');
  };

  // Submit Adjust Balance Modal
  const handleAdjustBalance = (e) => {
    e.preventDefault();
    if (!selectedBalanceUser) return;

    setLeaveBalances(prev =>
      prev.map(b => {
        if (b.id === selectedBalanceUser.id) {
          return {
            ...b,
            annual: { ...b.annual, remaining: Math.max(0, b.annual.remaining + Number(adjAnnual)) },
            sick: { ...b.sick, remaining: Math.max(0, b.sick.remaining + Number(adjSick)) },
            casual: { ...b.casual, remaining: Math.max(0, b.casual.remaining + Number(adjCasual)) }
          };
        }
        return b;
      })
    );

    setIsAdjustBalanceModalOpen(false);
    showToast(`Leave quotas adjusted for ${selectedBalanceUser.name}.`);
  };

  const openAdjustBalanceModal = (user) => {
    setSelectedBalanceUser(user);
    setAdjAnnual(0);
    setAdjSick(0);
    setAdjCasual(0);
    setIsAdjustBalanceModalOpen(true);
  };

  // Export Leave CSV
  const handleExportCSV = () => {
    const headers = ['Request ID,Employee ID,Name,Department,Leave Type,Dates,Total Days,Applied Date,Status,HR Comment'];
    const rows = requests.map(r =>
      `"${r.id}","${r.empId}","${r.name}","${r.dept}","${r.type}","${r.dates}",${r.days},"${r.appliedOn}","${r.status}","${r.comment || ''}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dayflow_Leave_Requests_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leave report exported to CSV.');
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
          <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">Leave Approvals & Time-Off Manager</h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Review employee leave requests, manage leave balances, track holiday calendars, and assign leaves
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAssignModalOpen(true)}
            className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold text-[13px] rounded-lg shadow-xs cursor-pointer flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Assign Leave to Staff</span>
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

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-amber-200 bg-amber-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Approvals</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-700 mt-2">{pendingCount}</p>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">Requires review</p>
        </div>

        <div className="bg-white border border-blue-200 bg-blue-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">On Leave Today</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-blue-700 mt-2">{onLeaveToday}</p>
          <p className="text-[11px] text-blue-600 font-medium mt-0.5">Approved off duty</p>
        </div>

        <div className="bg-white border border-emerald-200 bg-emerald-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Approved Requests</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 mt-2">{approvedCount}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">This month</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">Days Utilized</span>
            <CalendarCheck className="w-4 h-4 text-slate-500" />
          </div>
          <p className="text-2xl font-extrabold text-[#1F2A52] mt-2">{totalDaysApproved} Days</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Aug 2026 total</p>
        </div>

        <div className="bg-white border border-rose-200 bg-rose-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Rejected Requests</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-extrabold text-rose-700 mt-2">{rejectedCount}</p>
          <p className="text-[11px] text-rose-600 font-medium mt-0.5">Policy mismatch</p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'requests', label: 'Leave Requests Queue', icon: FileText, count: pendingCount, badgeColor: 'bg-amber-500' },
          { id: 'balances', label: 'Employee Leave Balances', icon: Users },
          { id: 'calendar', label: 'Team Leave Schedule', icon: CalendarDays },
          { id: 'holidays', label: 'Company Holidays 2026', icon: Sparkles }
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
              {tab.count !== undefined && tab.count > 0 && (
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: LEAVE REQUESTS QUEUE */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, ID or reason..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
                />
              </div>

              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-medium text-[#333333] outline-none focus:border-horilla-primary"
              >
                <option value="ALL">All Leave Types</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
              </select>

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
              </select>
            </div>

            {/* Status Pills & Card/Table View Switcher */}
            <div className="flex items-center justify-between gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer shrink-0 ${
                      statusFilter === st
                        ? 'bg-[#1F2A52] text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#1F2A52]'
                    }`}
                  >
                    {st} (
                    {
                      requests.filter(r => (st === 'ALL' ? true : r.status.toUpperCase() === st)).length
                    }
                    )
                  </button>
                ))}
              </div>

              <div className="flex items-center p-1 bg-slate-100 rounded-lg shrink-0">
                <button
                  onClick={() => setViewMode('cards')}
                  title="Card View"
                  className={`p-1.5 rounded-md transition ${
                    viewMode === 'cards' ? 'bg-white text-[#1F2A52] shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  title="Table View"
                  className={`p-1.5 rounded-md transition ${
                    viewMode === 'table' ? 'bg-white text-[#1F2A52] shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mode 1: CARDS VIEW */}
          {viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRequests.map(req => (
                <div
                  key={req.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-[#1F2A52] font-bold flex items-center justify-center text-xs">
                        {req.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1F2A52] text-[14px] leading-tight">{req.name}</h4>
                        <p className="text-[11px] text-slate-400">
                          {req.empId} • {req.dept}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        req.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : req.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  {/* Dates & Type */}
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-[12px]">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          req.type === 'Annual Leave'
                            ? 'bg-blue-100 text-blue-800'
                            : req.type === 'Sick Leave'
                            ? 'bg-rose-100 text-rose-800'
                            : req.type === 'Casual Leave'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {req.type}
                      </span>
                      <span className="font-bold text-[#1F2A52]">{req.days} Day{req.days > 1 ? 's' : ''} Duration</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{req.dates}</span>
                    </div>

                    {req.attachment && (
                      <div className="flex items-center gap-1.5 text-blue-600 font-medium text-[11px]">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span className="underline cursor-pointer">{req.attachment}</span>
                      </div>
                    )}
                  </div>

                  {/* Reason & HR Note */}
                  <div className="text-[12px] space-y-1.5">
                    <p className="text-slate-600 italic">"{req.reason}"</p>
                    {req.comment && (
                      <div className="p-2 bg-emerald-50/80 border border-emerald-200 rounded-lg text-emerald-800 text-[11px]">
                        <strong>HR Note:</strong> {req.comment} {req.reviewedBy && `(${req.reviewedBy})`}
                      </div>
                    )}
                  </div>

                  {/* Quota balance indicator */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      Quota Left: <strong>{req.balanceLeft.annual} Annual</strong> |{' '}
                      <strong>{req.balanceLeft.sick} Sick</strong> |{' '}
                      <strong>{req.balanceLeft.casual} Casual</strong>
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openReviewModal(req)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[12px] font-semibold flex items-center gap-1 cursor-pointer transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                      <span>Review Details</span>
                    </button>

                    {req.status === 'Pending' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuickAction(req.id, 'Approved')}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[12px] font-bold flex items-center gap-1 cursor-pointer transition shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleQuickAction(req.id, 'Rejected')}
                          className="px-3.5 py-1.5 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-[12px] font-bold flex items-center gap-1 cursor-pointer transition shadow-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {filteredRequests.length === 0 && (
                <div className="col-span-full py-12 text-center bg-white border border-slate-200 rounded-xl text-slate-400">
                  No leave requests found matching your filter criteria.
                </div>
              )}
            </div>
          ) : (
            /* Mode 2: TABLE VIEW */
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/75">
                      <th className="py-3 px-4">EMPLOYEE</th>
                      <th className="py-3 px-4">LEAVE TYPE</th>
                      <th className="py-3 px-4">DATE SPAN</th>
                      <th className="py-3 px-4">DAYS</th>
                      <th className="py-3 px-4">REASON</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRequests.map(req => (
                      <tr key={req.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 px-4">
                          <p className="font-bold text-[#1F2A52]">{req.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {req.empId} • {req.dept}
                          </p>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              req.type === 'Annual Leave'
                                ? 'bg-blue-100 text-blue-800'
                                : req.type === 'Sick Leave'
                                ? 'bg-rose-100 text-rose-800'
                                : req.type === 'Casual Leave'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {req.type}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-slate-700 font-medium text-xs">{req.dates}</td>

                        <td className="py-3 px-4 font-bold text-[#1F2A52]">{req.days}</td>

                        <td className="py-3 px-4 text-slate-600 text-xs max-w-xs truncate" title={req.reason}>
                          {req.reason}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              req.status === 'Pending'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : req.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openReviewModal(req)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold"
                            >
                              Review
                            </button>
                            {req.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => handleQuickAction(req.id, 'Approved')}
                                  className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
                                  title="Quick Approve"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleQuickAction(req.id, 'Rejected')}
                                  className="p-1 bg-slate-700 hover:bg-slate-800 text-white rounded"
                                  title="Quick Reject"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: EMPLOYEE LEAVE BALANCES DIRECTORY */}
      {activeTab === 'balances' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">Staff Leave Balance Quotas</h3>
              <p className="text-[12px] text-slate-500">
                Annual entitlements, consumed days, and remaining available balances per staff member
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                  <th className="py-3 px-3">EMPLOYEE</th>
                  <th className="py-3 px-3">ANNUAL LEAVE (USED / TOTAL)</th>
                  <th className="py-3 px-3">SICK LEAVE (USED / TOTAL)</th>
                  <th className="py-3 px-3">CASUAL LEAVE (USED / TOTAL)</th>
                  <th className="py-3 px-3">TOTAL AVAILABLE</th>
                  <th className="py-3 px-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaveBalances.map(b => {
                  const totalRem = b.annual.remaining + b.sick.remaining + b.casual.remaining;
                  return (
                    <tr key={b.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-3">
                        <p className="font-bold text-[#1F2A52]">{b.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {b.id} • {b.dept}
                        </p>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-bold text-blue-700">{b.annual.remaining} left</span>
                        <span className="text-slate-400 text-xs"> ({b.annual.used}/{b.annual.total} used)</span>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-bold text-rose-700">{b.sick.remaining} left</span>
                        <span className="text-slate-400 text-xs"> ({b.sick.used}/{b.sick.total} used)</span>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-bold text-emerald-700">{b.casual.remaining} left</span>
                        <span className="text-slate-400 text-xs"> ({b.casual.used}/{b.casual.total} used)</span>
                      </td>

                      <td className="py-3.5 px-3 font-mono font-bold text-[#1F2A52]">
                        <span className="bg-slate-100 px-2.5 py-1 rounded text-xs">{totalRem} Days</span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => openAdjustBalanceModal(b)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-horilla-primary hover:text-white text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                        >
                          Adjust Quota
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TEAM LEAVE SCHEDULE / CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">Team Time-Off Schedule Map</h3>
              <p className="text-[12px] text-slate-500">
                August 2026 - Staff coverage and scheduled time-offs to prevent department shortages
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-900 text-[13px]">Engineering Team</span>
                <span className="text-[10px] font-bold bg-blue-200 text-blue-800 px-2 py-0.5 rounded">2 Off</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <p>• <strong>Elena Rostova:</strong> Aug 24 - Aug 26 (Annual)</p>
                <p>• <strong>Michael Chang:</strong> Aug 22 - Aug 23 (Sick)</p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 text-[13px]">Operations & Logistics</span>
                <span className="text-[10px] font-bold bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded">1 Off</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <p>• <strong>Sarah Connor:</strong> Aug 29 (Casual)</p>
              </div>
            </div>

            <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-900 text-[13px]">Human Resources</span>
                <span className="text-[10px] font-bold bg-purple-200 text-purple-800 px-2 py-0.5 rounded">1 Off</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <p>• <strong>David Chen:</strong> Aug 28 (Casual)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPANY HOLIDAYS 2026 */}
      {activeTab === 'holidays' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">Official Company Holidays 2026</h3>
              <p className="text-[12px] text-slate-500">
                Paid corporate holidays observed across all company offices & regions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyHolidays.map((h, i) => (
              <div
                key={i}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-horilla-primary uppercase">{h.type}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      {h.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-[#1F2A52] text-[14px] mt-1">{h.name}</h4>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs text-slate-600">
                  <span className="font-semibold">{h.date}</span>
                  <span className="text-slate-400 font-mono">{h.day}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: ASSIGN LEAVE MODAL */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[17px] font-bold text-[#1F2A52]">Assign Leave on Behalf of Employee</h3>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignLeave} className="space-y-4 text-[13px]">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Employee</label>
                <select
                  value={assignEmployee}
                  onChange={e => setAssignEmployee(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none focus:border-horilla-primary"
                >
                  <option value="">-- Choose Employee --</option>
                  {leaveBalances.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.dept}) - [{b.annual.remaining + b.sick.remaining + b.casual.remaining} days left]
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Leave Category</label>
                  <select
                    value={assignType}
                    onChange={e => setAssignType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none focus:border-horilla-primary"
                  >
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={assignDays}
                    onChange={e => setAssignDays(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={assignStartDate}
                    onChange={e => setAssignStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={assignEndDate}
                    onChange={e => setAssignEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason / HR Reference</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Scheduled emergency surgery or pre-approved sabbatical"
                  value={assignReason}
                  onChange={e => setAssignReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold rounded-lg shadow-sm"
                >
                  Assign & Record Leave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: REVIEW & ADD HR NOTE MODAL */}
      {isReviewModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">Review Leave Application</h3>
                <p className="text-[11px] text-slate-400">
                  {selectedRequest.id} • {selectedRequest.name}
                </p>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-700">
              <p>
                <strong>Employee:</strong> {selectedRequest.name} ({selectedRequest.empId})
              </p>
              <p>
                <strong>Type:</strong> {selectedRequest.type} ({selectedRequest.days} Days)
              </p>
              <p>
                <strong>Date Span:</strong> {selectedRequest.dates}
              </p>
              <p>
                <strong>Reason:</strong> "{selectedRequest.reason}"
              </p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-[13px]">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Decision Status</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReviewAction('Approved')}
                    className={`py-2 px-3 rounded-lg font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
                      reviewAction === 'Approved'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve Request</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewAction('Rejected')}
                    className={`py-2 px-3 rounded-lg font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
                      reviewAction === 'Rejected'
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <X className="w-4 h-4" />
                    <span>Reject Request</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">HR Feedback / Note</label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="Add comments or instructions for the employee..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold rounded-lg shadow-sm"
                >
                  Save Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADJUST LEAVE BALANCE MODAL */}
      {isAdjustBalanceModalOpen && selectedBalanceUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">Adjust Quota Balances</h3>
                <p className="text-[11px] text-slate-400">
                  {selectedBalanceUser.name} ({selectedBalanceUser.id})
                </p>
              </div>
              <button
                onClick={() => setIsAdjustBalanceModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdjustBalance} className="space-y-4 text-[13px]">
              <p className="text-xs text-slate-500">
                Enter +/- day offsets to credit or deduct from the employee's remaining quota balance.
              </p>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Annual Leave Adjustment (Current: {selectedBalanceUser.annual.remaining} left)
                </label>
                <input
                  type="number"
                  value={adjAnnual}
                  onChange={e => setAdjAnnual(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  placeholder="+2 or -1"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Sick Leave Adjustment (Current: {selectedBalanceUser.sick.remaining} left)
                </label>
                <input
                  type="number"
                  value={adjSick}
                  onChange={e => setAdjSick(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  placeholder="+1 or -1"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Casual Leave Adjustment (Current: {selectedBalanceUser.casual.remaining} left)
                </label>
                <input
                  type="number"
                  value={adjCasual}
                  onChange={e => setAdjCasual(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  placeholder="+2 or -1"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAdjustBalanceModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold rounded-lg shadow-sm"
                >
                  Apply Balance Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagementPage;

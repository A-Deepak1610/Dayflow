import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOutletContext, Link } from 'react-router-dom';
import {
  Users,
  Clock,
  Calendar,
  DollarSign,
  UserPlus,
  TrendingUp,
  RotateCw,
  Plus,
  Briefcase,
  UserCheck,
  Bell,
  CheckCircle2,
  ShieldCheck,
  Building,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';

export const HrDashboard = () => {
  const { user } = useAuth();
  const { onOpenAddModal } = useOutletContext();

  // Date Filter State
  const [periodPreset, setPeriodPreset] = useState('This Month');
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-08-31');
  const [lastRefreshed, setLastRefreshed] = useState('Just now');

  // Announcements Feed State
  const [announcements, setAnnouncements] = useState([
    { title: 'Employee Referral Program — Earn Referral Bonuses', date: 'Aug 11, 2026', expires: 'Nov 20', tag: 'Program' },
    { title: 'Scheduled IT Infrastructure Maintenance', date: 'Aug 10, 2026', expires: 'Sep 05', tag: 'IT Alert' },
    { title: 'Company Family Day — September 15, 2026', date: 'Aug 09, 2026', expires: 'Sep 15', tag: 'Event' },
    { title: 'Updated Work-From-Home Policy — Effective September 1, 2026', date: 'Aug 08, 2026', expires: 'Oct 21', tag: 'Policy' },
    { title: 'Employee of the Month — August 2026', date: 'Aug 07, 2026', expires: 'Sep 21', tag: 'Award' },
    { title: 'Compensation Review Cycle — August Payroll', date: 'Aug 04, 2026', expires: 'Sep 21', tag: 'Payroll' },
    { title: 'Mandatory Cybersecurity Awareness Training — Complete by Sep 09', date: 'Aug 03, 2026', expires: 'Sep 09', tag: 'Training' },
    { title: 'Annual Leave Encashment — Submit Before Sep 04', date: 'Aug 02, 2026', expires: 'Sep 04', tag: 'Leave' },
    { title: 'Mid-Year Performance Reviews — August 2026', date: 'Aug 01, 2026', expires: 'Sep 19', tag: 'Review' },
    { title: 'Q2 2026 Performance Highlights — Thank You, Team!', date: 'Aug 01, 2026', expires: 'Oct 06', tag: 'Company' },
  ]);

  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [newAnnoTitle, setNewAnnoTitle] = useState('');
  const [newAnnoTag, setNewAnnoTag] = useState('General');
  const [newAnnoExpires, setNewAnnoExpires] = useState('Sep 30');

  const handleRefresh = () => {
    setLastRefreshed('Just now');
  };

  const handleAddAnnouncementSubmit = (e) => {
    e.preventDefault();
    if (!newAnnoTitle.trim()) return;
    const item = {
      title: newAnnoTitle,
      date: 'Aug 22, 2026',
      expires: newAnnoExpires,
      tag: newAnnoTag
    };
    setAnnouncements([item, ...announcements]);
    setNewAnnoTitle('');
    setShowAddAnnouncement(false);
  };

  // Recharts Datasets
  const departmentData = [
    { name: 'Engineering', count: 42 },
    { name: 'Operations', count: 28 },
    { name: 'Design', count: 22 },
    { name: 'Sales & Mkt', count: 20 },
    { name: 'CS', count: 18 },
    { name: 'HR', count: 14 },
    { name: 'Finance', count: 12 },
    { name: 'QA', count: 10 },
  ];

  const leaveTrendData = [
    { day: 'Mon', leaves: 4 },
    { day: 'Tue', leaves: 2 },
    { day: 'Wed', leaves: 5 },
    { day: 'Thu', leaves: 3 },
    { day: 'Fri', leaves: 6 },
    { day: 'Sat', leaves: 1 },
    { day: 'Sun', leaves: 0 },
  ];

  const employeeStatusData = [
    { name: 'Active', value: 175, color: '#10B981' },
    { name: 'Inactive', value: 4, color: '#94A3B8' },
  ];

  const genderData = [
    { name: 'Female', value: 84, color: '#059669' },
    { name: 'Male', value: 91, color: '#3B82F6' },
    { name: 'Other', value: 4, color: '#64748B' },
  ];

  const leaveCategoryData = [
    { name: 'Casual Leave', value: 45, color: '#10B981' },
    { name: 'Annual Paid', value: 30, color: '#3B82F6' },
    { name: 'Sick Leave', value: 15, color: '#F59E0B' },
    { name: 'Unpaid Leave', value: 10, color: '#64748B' },
  ];

  const deptAttendanceData = [
    { dept: 'Engineering', OnTime: 94, Late: 4, EarlyLeave: 2 },
    { dept: 'Operations', OnTime: 91, Late: 6, EarlyLeave: 3 },
    { dept: 'Design', OnTime: 96, Late: 2, EarlyLeave: 2 },
    { dept: 'Sales', OnTime: 88, Late: 8, EarlyLeave: 4 },
  ];

  const recruitmentFunnelData = [
    { stage: 'Sourced', candidates: 14 },
    { stage: 'Screened', candidates: 8 },
    { stage: 'Interview', candidates: 6 },
    { stage: 'Offer', candidates: 3 },
    { stage: 'Hired', candidates: 1 },
  ];

  return (
    <div className="space-y-8">
      
      {/* SECTION 1: Top Controls & Filter Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>Saturday, August 22, 2026</span>
            <span>•</span>
            <span className="text-emerald-600 flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              {lastRefreshed}
            </span>
            <button
              onClick={handleRefresh}
              className="p-1 text-slate-400 hover:text-emerald-700 rounded-lg transition cursor-pointer"
              title="Refresh Analytics"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
          <h1 className="font-sora text-2xl font-extrabold text-[#1F2A52] tracking-tight">
            Executive HR Full Analytics
          </h1>
          <p className="text-xs text-slate-500">Real-time workforce intelligence, payroll analytics, Recharts data & pending approvals</p>
        </div>

        {/* Time Period Filter Pills & Range Picker */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs w-full sm:w-auto">
            {['This Month', 'Last Month', 'Quarter', 'Customize'].map((preset) => (
              <button
                key={preset}
                onClick={() => setPeriodPreset(preset)}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 font-sora font-semibold rounded-xl transition cursor-pointer ${
                  periodPreset === preset
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#1F2A52]'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5 text-xs text-[#1F2A52]">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent font-mono font-semibold focus:outline-none"
            />
            <span className="text-slate-400">→</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent font-mono font-semibold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Top Metric Cards Grid (White & Emerald Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Employees */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500 mb-3 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Employees</span>
            <div className="w-9 h-9 rounded-2xl bg-slate-100 text-[#1F2A52] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-sora font-extrabold text-[#1F2A52] relative z-10">179</div>
          <p className="text-xs text-slate-500 mt-2 font-medium relative z-10">No new joiners this period</p>
        </div>

        {/* Present Today */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500 mb-3 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider">Present Today</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-sora font-extrabold text-[#1F2A52] relative z-10">19</div>
          <p className="text-xs text-emerald-600 mt-2 font-bold relative z-10">10.6% attendance rate</p>
        </div>

        {/* On Leave */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500 mb-3 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider">On Leave</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-sora font-extrabold text-[#1F2A52] relative z-10">3</div>
          <p className="text-xs text-amber-600 mt-2 font-bold relative z-10">12 pending requests</p>
        </div>

        {/* Open Recruitments */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500 mb-3 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider">Open Recruitments</span>
            <div className="w-9 h-9 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-sora font-extrabold text-[#1F2A52] relative z-10">2</div>
          <p className="text-xs text-blue-600 mt-2 font-bold relative z-10">Active hiring pipeline</p>
        </div>

      </div>

      {/* SECTION 3: Main Visual Analytics Dashboard Grid (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Recharts Visualizations */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Department Headcount Chart (Recharts BarChart) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-sora text-base font-bold text-[#1F2A52]">Department Headcount (Recharts)</h3>
                <p className="text-xs text-slate-500">Top departments staff distribution</p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                179 Total
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leave Trends Chart (Recharts AreaChart) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-sora text-base font-bold text-[#1F2A52]">Leave Trends (Daily Leaves — Current Week)</h3>
                <p className="text-xs text-slate-500">Day-by-day leave volume</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Peak: Friday (6 Staff)
              </span>
            </div>

            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={leaveTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLeaves" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                  <Area type="monotone" dataKey="leaves" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorLeaves)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grid 2-col: Recharts Pie / Donut Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Employee Status (Active vs Inactive Recharts Pie) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-sora text-sm font-bold text-[#1F2A52]">Employee Status</h3>
                <span className="text-[11px] font-semibold text-slate-500">Active vs Inactive</span>
              </div>

              <div className="h-44 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={employeeStatusData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" paddingAngle={5}>
                      {employeeStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-around text-xs pt-2">
                <div className="text-center">
                  <span className="font-bold text-[#1F2A52]">175</span>
                  <p className="text-slate-500 text-[10px]">Active (97.8%)</p>
                </div>
                <div className="text-center">
                  <span className="font-bold text-slate-600">4</span>
                  <p className="text-slate-500 text-[10px]">Inactive (2.2%)</p>
                </div>
              </div>
            </div>

            {/* Gender Distribution Recharts Donut */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-sora text-sm font-bold text-[#1F2A52]">Gender Distribution</h3>
                <span className="text-[11px] font-semibold text-slate-500">Active Employees</span>
              </div>

              <div className="h-44 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genderData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" paddingAngle={5}>
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-around text-xs pt-2">
                <div className="text-center">
                  <span className="font-bold text-emerald-700">84</span>
                  <p className="text-slate-500 text-[10px]">Female (47%)</p>
                </div>
                <div className="text-center">
                  <span className="font-bold text-blue-700">91</span>
                  <p className="text-slate-500 text-[10px]">Male (51%)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Leave Breakdown & Attendance Overview Grid */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-sora text-base font-bold text-[#1F2A52]">Leave Category Breakdown (August 2026)</h3>
                <p className="text-xs text-slate-500">Distribution across leave types</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl text-center">
                <p className="text-xs text-slate-600 font-semibold">Casual Leave</p>
                <p className="font-sora text-2xl font-extrabold text-emerald-700 mt-1">45%</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Primary category</p>
              </div>

              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl text-center">
                <p className="text-xs text-slate-600 font-semibold">Annual Paid</p>
                <p className="font-sora text-2xl font-extrabold text-blue-600 mt-1">30%</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Vacation time</p>
              </div>

              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl text-center">
                <p className="text-xs text-slate-600 font-semibold">Sick Leave</p>
                <p className="font-sora text-2xl font-extrabold text-amber-600 mt-1">15%</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Medical reasons</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                <p className="text-xs text-slate-600 font-semibold">Unpaid Leave</p>
                <p className="font-sora text-2xl font-extrabold text-slate-700 mt-1">10%</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Personal time</p>
              </div>
            </div>
          </div>

          {/* Attendance Overview (Recharts Stacked BarChart) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-sora text-base font-bold text-[#1F2A52]">Attendance Overview by Department (Recharts)</h3>
                <p className="text-xs text-slate-500">On-time, late arrivals & early departures rates</p>
              </div>
            </div>

            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="dept" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                  <Legend />
                  <Bar dataKey="OnTime" fill="#10B981" name="On-Time %" />
                  <Bar dataKey="Late" fill="#F59E0B" name="Late %" />
                  <Bar dataKey="EarlyLeave" fill="#EF4444" name="Early Leave %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recruitment Pipeline & Funnel (Recharts BarChart) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-sora text-base font-bold text-[#1F2A52]">Recruitment Pipeline Funnel (Recharts)</h3>
                <p className="text-xs text-slate-500">Candidates by stage — Senior Fullstack Engineer</p>
              </div>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recruitmentFunnelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                  <Bar dataKey="candidates" fill="#059669" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right 1 Column: Payroll, Announcements, On Leave Today, Approvals Matrix */}
        <div className="space-y-8">
          
          {/* SECTION 4: Payroll Summary Card (August 2026 - Emerald Theme) */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-xl space-y-5 border border-emerald-900">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80">
              <div>
                <h3 className="font-sora text-lg font-bold text-white">Payroll Summary</h3>
                <p className="text-xs text-emerald-300">August 2026 Salary Cycle</p>
              </div>
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-emerald-300 font-semibold">Net Pay</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-sora text-3xl font-extrabold text-white">440,338</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    ↑ 9%
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400/80 mt-0.5 font-mono">Prev Month: 403,814</p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-emerald-800/80 text-center">
                <div className="p-2.5 bg-emerald-900/60 rounded-xl border border-emerald-800">
                  <p className="text-[10px] text-emerald-300">Gross</p>
                  <p className="font-mono font-bold text-white text-xs mt-0.5">511,774</p>
                </div>
                <div className="p-2.5 bg-emerald-900/60 rounded-xl border border-emerald-800">
                  <p className="text-[10px] text-emerald-300">Deductions</p>
                  <p className="font-mono font-bold text-emerald-300 text-xs mt-0.5">71,435</p>
                </div>
                <div className="p-2.5 bg-emerald-900/60 rounded-xl border border-emerald-800">
                  <p className="text-[10px] text-emerald-300">Payslips</p>
                  <p className="font-mono font-bold text-emerald-400 text-xs mt-0.5">20</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Pending Approvals Matrix (Total 12) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-sora text-base font-bold text-[#1F2A52]">Pending Approvals</h3>
                <p className="text-xs text-slate-500">Cross-department requests requiring HR action</p>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-xs">
                12 Pending
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link to="/hr/leaves" className="p-3 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-between transition cursor-pointer">
                <span className="font-semibold text-emerald-900">Leave</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">12</span>
              </Link>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <span className="font-semibold text-slate-700">Attendance</span>
                <span className="font-mono font-bold text-slate-400 text-sm">0</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <span className="font-semibold text-slate-700">Assets</span>
                <span className="font-mono font-bold text-blue-600 text-sm">3</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <span className="font-semibold text-slate-700">Shift</span>
                <span className="font-mono font-bold text-amber-600 text-sm">5</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <span className="font-semibold text-slate-700">Work Type</span>
                <span className="font-mono font-bold text-purple-600 text-sm">4</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <span className="font-semibold text-slate-700">Reimbursements</span>
                <span className="font-mono font-bold text-emerald-600 text-sm">5</span>
              </div>
            </div>
          </div>

          {/* SECTION 6: On Leave Today Widget */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-sora text-base font-bold text-[#1F2A52]">On Leave Today</h3>
              <Link to="/hr/leaves" className="text-xs font-bold text-emerald-700 hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { name: 'Amelia Cooper', type: 'Casual Leave', range: 'Aug 01 – Aug 31', duration: '23d' },
                { name: 'Ethan Gonzalez', type: 'Casual Leave', range: 'Aug 01 – Aug 31', duration: '23d' },
                { name: 'Sebastian Mitchell', type: 'Casual Leave', range: 'Aug 01 – Aug 31', duration: '23d' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#1F2A52]">{item.name}</p>
                    <p className="text-[11px] text-slate-500">{item.type} • {item.range}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-mono font-bold text-[11px]">
                    {item.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7: Upcoming Holidays Widget */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-sora text-base font-bold text-[#1F2A52]">Upcoming Holidays</h3>
              <button className="text-xs font-bold text-emerald-700 hover:underline">View all</button>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xs text-slate-500 italic">
              No holidays in the next 7 days
            </div>
          </div>

          {/* SECTION 8: Announcements Feed (With '+' Action Button) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-600" />
                <h3 className="font-sora text-base font-bold text-[#1F2A52]">Announcements</h3>
              </div>
              <button
                onClick={() => setShowAddAnnouncement(true)}
                className="w-7 h-7 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center font-bold text-base transition cursor-pointer shadow-xs"
                title="Post Announcement"
              >
                +
              </button>
            </div>

            {/* Modal to Post Announcement */}
            {showAddAnnouncement && (
              <form onSubmit={handleAddAnnouncementSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Announcement title..."
                  value={newAnnoTitle}
                  onChange={(e) => setNewAnnoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-[#1F2A52] outline-none"
                />
                <div className="flex items-center gap-2">
                  <select
                    value={newAnnoTag}
                    onChange={(e) => setNewAnnoTag(e.target.value)}
                    className="px-2 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="Program">Program</option>
                    <option value="Policy">Policy</option>
                    <option value="Event">Event</option>
                    <option value="IT Alert">IT Alert</option>
                    <option value="Payroll">Payroll</option>
                  </select>
                  <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-xl text-xs ml-auto cursor-pointer">
                    Post
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {announcements.map((anno, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-2xl hover:border-slate-300 transition space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-[#1F2A52] leading-snug">{anno.title}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                      {anno.tag}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-mono">
                    <span>{anno.date}</span>
                    <span className="text-emerald-700 font-semibold">Expires {anno.expires}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HrDashboard;

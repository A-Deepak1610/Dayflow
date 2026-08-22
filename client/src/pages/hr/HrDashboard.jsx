import React, { useState } from 'react';
import { 
  Users, UserCheck, Calendar, Briefcase, Settings, RefreshCcw, Plus
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';

export const HrDashboard = () => {
  const [activeDateFilter, setActiveDateFilter] = useState('This Month');

  // Chart Data
  const headcountData = [
    { name: 'Engineering', value: 65, color: '#9333EA' },
    { name: 'Sales', value: 45, color: '#E9573F' },
    { name: 'Support', value: 30, color: '#10B981' },
    { name: 'Marketing', value: 25, color: '#F59E0B' },
    { name: 'Finance', value: 13, color: '#3B82F6' },
  ];

  const leaveTrendsData = [
    { name: 'Mon', leaves: 3 },
    { name: 'Tue', leaves: 3 },
    { name: 'Wed', leaves: 3 },
    { name: 'Thu', leaves: 3 },
    { name: 'Fri', leaves: 3 },
    { name: 'Sat', leaves: 3 },
    { name: 'Sun', leaves: 3 },
  ];

  const empStatusData = [
    { name: 'Active', value: 178, color: '#10B981' },
    { name: 'In-Active', value: 2, color: '#E9573F' },
  ];

  const genderData = [
    { name: 'Male', value: 36, color: '#3B82F6' },
    { name: 'Female', value: 36, color: '#EC4899' },
    { name: 'Other', value: 27, color: '#A855F7' },
  ];

  const recruitmentData = [
    { stage: 'Initial', value: 2, fill: '#94A3B8' },
    { stage: 'Applied', value: 7, fill: '#E9573F' },
    { stage: 'Interview', value: 1, fill: '#F59E0B' },
    { stage: 'Cancelled', value: 2, fill: '#E9573F' },
    { stage: 'Hired', value: 5, fill: '#10B981' },
  ];

  const leaveBreakdownData = [
    { name: 'Casual Leave', value: 14, fill: '#E9573F' }
  ];

  const attendanceOverviewData = [
    { name: 'Eng', onTime: 85, late: 10, early: 5 },
    { name: 'Sales', onTime: 70, late: 20, early: 10 },
    { name: 'Support', onTime: 90, late: 5, early: 5 },
    { name: 'Marketing', onTime: 80, late: 15, early: 5 },
  ];

  const departmentOvertimeData = [
    { name: 'Eng', hours: 45 },
    { name: 'Sales', hours: 10 },
    { name: 'Support', hours: 25 },
    { name: 'Market', hours: 5 },
  ];

  const attendanceTrendData = [
    { date: 'Week 1', rate: 95 },
    { date: 'Week 2', rate: 93 },
    { date: 'Week 3', rate: 96 },
    { date: 'Week 4', rate: 94 },
  ];

  const recruitmentPipelineData = [
    { role: 'Frontend Eng', applied: 45, interview: 12, offer: 3 },
    { role: 'Sales Rep', applied: 30, interview: 8, offer: 2 },
    { role: 'Support Agent', applied: 60, interview: 15, offer: 5 },
  ];

  const hiringTimelineData = [
    { month: 'Jan', joined: 4 },
    { month: 'Feb', joined: 2 },
    { month: 'Mar', joined: 6 },
    { month: 'Apr', joined: 3 },
    { month: 'May', joined: 5 },
    { month: 'Jun', joined: 1 },
  ];

  const employeeTurnoverData = [
    { name: 'Engineering', newHires: 4, exits: 1 },
    { name: 'Sales', newHires: 2, exits: 2 },
    { name: 'Support', newHires: 5, exits: 0 },
    { name: 'Marketing', newHires: 1, exits: 1 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter flex flex-col">
      {/* Top HR Admin Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#1F2A52] text-[#FF5D7A] flex items-center justify-center font-sora font-bold text-sm">
                DF
              </div>
              <span className="font-sora text-lg font-extrabold text-[#1F2A52]">
                Dayflow <span className="text-[#FF5D7A]">HR Admin</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-[#FF5D7A] border border-rose-200">
              Admin Portal
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
            <span className="text-[11px] text-[#888888]">Just now</span>
            <RefreshCcw className="w-3 h-3 text-[#888888] cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            {['This Month', 'Last Month', 'Quarter'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveDateFilter(filter)}
                className={`px-4 py-2 text-[13px] font-medium transition ${
                  activeDateFilter === filter 
                    ? 'bg-horilla-primary text-white' 
                    : 'bg-white text-[#666666] hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input type="date" defaultValue="2026-08-01" className="px-3 py-2 text-[13px] border border-slate-200 rounded-lg text-[#666666] bg-white shadow-sm" />
            <span className="text-[#888888]">→</span>
            <input type="date" defaultValue="2026-08-31" className="px-3 py-2 text-[13px] border border-slate-200 rounded-lg text-[#666666] bg-white shadow-sm" />
          </div>

          <button className="px-4 py-2 bg-horilla-primary text-white text-[13px] font-medium rounded-lg shadow-sm flex items-center gap-2 cursor-pointer hover:bg-horilla-primary-hover transition">
            <Settings className="w-4 h-4" />
            Customize
          </button>
        </div>
      </div>

      {/* Top Section with Right Sidebar */}
      <div className="flex flex-col xl:flex-row gap-6 mb-6">
        
        {/* Main Content (Left Column) */}
        <div className="flex-1 space-y-6">
          
          {/* Top KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-lg bg-[#FCECE9] flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-[#E9573F]" />
              </div>
              <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Total Employees</p>
              <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">179</h3>
              <p className="text-[12px] text-[#A0A0A0] mt-2">No new joiners</p>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-slate-100 rounded-full opacity-50 pointer-events-none"></div>
            </div>

            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-lg bg-[#E6F4EA] flex items-center justify-center mb-4">
                <UserCheck className="w-5 h-5 text-[#10B981]" />
              </div>
              <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Present Today</p>
              <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">19</h3>
              <p className="text-[12px] font-bold text-[#F59E0B] mt-2">10.6% rate</p>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-slate-100 rounded-full opacity-50 pointer-events-none"></div>
            </div>

            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">On Leave</p>
              <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">3</h3>
              <p className="text-[12px] font-bold text-[#F59E0B] mt-2">12 pending</p>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-slate-100 rounded-full opacity-50 pointer-events-none"></div>
            </div>

            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5 text-[#9333EA]" />
              </div>
              <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Open Recruitments</p>
              <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">2</h3>
              <p className="text-[12px] text-[#A0A0A0] mt-2">Active hiring</p>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-slate-100 rounded-full opacity-50 pointer-events-none"></div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Headcount */}
            <div className="horilla-card horilla-card-gradient-top-orange-purple p-5 flex flex-col h-80">
              <div>
                <h3 className="text-[15px] font-bold text-[#333333]">Department Headcount</h3>
                <p className="text-[12px] text-[#888888]">Top 10 departments</p>
              </div>
              <div className="flex-1 relative mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={headcountData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none">
                      {headcountData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[13px] text-[#888888] font-medium">Total</span>
                  <span className="text-[22px] font-bold text-[#333333]">178</span>
                </div>
              </div>
            </div>

            {/* Leave Trends */}
            <div className="horilla-card horilla-card-gradient-top-orange-purple p-5 flex flex-col h-80">
              <div>
                <h3 className="text-[15px] font-bold text-[#333333]">Leave Trends</h3>
                <p className="text-[12px] text-[#888888]">Daily leaves — current week</p>
              </div>
              <div className="flex-1 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={leaveTrendsData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorLeaves" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9333EA" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#9333EA" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={false} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} domain={[0, 4]} ticks={[1, 2, 3, 4]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="leaves" stroke="#9333EA" strokeWidth={3} fillOpacity={1} fill="url(#colorLeaves)" dot={{ r: 4, fill: '#9333EA', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employee Status */}
            <div className="horilla-card horilla-card-gradient-top-orange-purple p-5 flex flex-col h-80">
              <div>
                <h3 className="text-[15px] font-bold text-[#333333]">Employee Status</h3>
                <p className="text-[12px] text-[#888888]">Active vs Inactive</p>
              </div>
              <div className="flex-1 relative mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={empStatusData} cx="50%" cy="50%" innerRadius={80} outerRadius={105} paddingAngle={0} dataKey="value" stroke="none">
                      {empStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[13px] text-[#888888] font-medium">Total</span>
                  <span className="text-[22px] font-bold text-[#333333]">180</span>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                  <span className="text-[12px] text-[#666666]">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E9573F]"></div>
                  <span className="text-[12px] text-[#666666]">In-Active</span>
                </div>
              </div>
            </div>

            {/* Gender Distribution */}
            <div className="horilla-card p-5 flex flex-col h-80">
              <div>
                <h3 className="text-[15px] font-bold text-[#333333]">Gender Distribution</h3>
                <p className="text-[12px] text-[#888888]">Active employees</p>
              </div>
              <div className="flex-1 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genderData} cx="50%" cy="50%" outerRadius={100} dataKey="value" stroke="#fff" strokeWidth={2} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3B82F6]"></div>
                  <span className="text-[12px] text-[#666666]">Male</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EC4899]"></div>
                  <span className="text-[12px] text-[#666666]">Female</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#A855F7]"></div>
                  <span className="text-[12px] text-[#666666]">Other</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="w-full xl:w-[320px] shrink-0 space-y-6">
          {/* Announcements */}
          <div className="horilla-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[#333333]">Announcements</h3>
              <button className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center text-horilla-primary hover:bg-horilla-primary-light transition">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Employee Referral Program', date: 'Aug 11, 2026', exp: 'Expires Nov 20' },
                { title: 'Scheduled IT Maintenance', date: 'Aug 10, 2026', exp: 'Expires Sep 05' },
                { title: 'Company Family Day', date: 'Aug 09, 2026', exp: 'Expires Sep 15' },
                { title: 'Updated Work-From-Home Policy', date: 'Aug 08, 2026', exp: 'Expires Oct 21' },
              ].map((item, i) => (
                <div key={i} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <h4 className="text-[13px] font-bold text-[#333333] leading-snug">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] text-[#A0A0A0]">{item.date}</span>
                    <span className="text-[10px] font-semibold text-[#D6A262] bg-[#FDF8F3] px-1.5 py-0.5 rounded">{item.exp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* On Leave Today */}
          <div className="horilla-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[#333333]">On Leave Today</h3>
              <a href="#" className="text-[12px] font-bold text-horilla-primary hover:underline">View all</a>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Amelia Cooper', type: 'Casual Leave', dates: 'Aug 01 – Aug 31', initials: 'AC', color: 'bg-[#F59E0B]' },
                { name: 'Ethan Gonzalez', type: 'Casual Leave', dates: 'Aug 01 – Aug 31', initials: 'EG', color: 'bg-[#9333EA]' },
                { name: 'Sebastian Mitchell', type: 'Casual Leave', dates: 'Aug 01 – Aug 31', initials: 'SM', color: 'bg-[#10B981]' },
              ].map((emp, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${emp.color} text-white flex items-center justify-center text-[12px] font-bold`}>
                      {emp.initials}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#333333] leading-tight">{emp.name}</p>
                      <p className="text-[11px] text-[#888888]">{emp.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-[#888888] mb-0.5">{emp.dates}</p>
                    <span className="inline-block px-1.5 py-0.5 bg-[#E6F4EA] text-[#10B981] font-bold text-[10px] rounded">23d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Holidays */}
          <div className="horilla-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[#333333]">Upcoming Holidays</h3>
              <a href="#" className="text-[12px] font-bold text-horilla-primary hover:underline">View all</a>
            </div>
            <div className="py-6 text-center border border-slate-100 rounded-lg bg-slate-50">
              <p className="text-[12px] text-[#A0A0A0]">No holidays in the next 7 days</p>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="horilla-card p-5">
            <h3 className="text-[15px] font-bold text-[#333333] mb-4">Pending Approvals</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FEF9EE] border border-[#FDEBCE] rounded-lg p-3 text-center cursor-pointer hover:shadow-sm transition">
                <h2 className="text-[20px] font-extrabold text-[#333333]">12</h2>
                <p className="text-[10px] font-bold text-[#888888] uppercase mt-0.5">LEAVE</p>
              </div>
              <div className="bg-[#F0F5FE] border border-[#DCE8FC] rounded-lg p-3 text-center cursor-pointer hover:shadow-sm transition">
                <h2 className="text-[20px] font-extrabold text-[#333333]">0</h2>
                <p className="text-[10px] font-bold text-[#888888] uppercase mt-0.5">ATTENDANCE</p>
              </div>
              <div className="bg-[#EDF9F1] border border-[#D2F0DE] rounded-lg p-3 text-center cursor-pointer hover:shadow-sm transition">
                <h2 className="text-[20px] font-extrabold text-[#333333]">3</h2>
                <p className="text-[10px] font-bold text-[#888888] uppercase mt-0.5">ASSETS</p>
              </div>
              <div className="bg-[#EEFDF9] border border-[#D0F9EF] rounded-lg p-3 text-center cursor-pointer hover:shadow-sm transition">
                <h2 className="text-[20px] font-extrabold text-[#333333]">5</h2>
                <p className="text-[10px] font-bold text-[#888888] uppercase mt-0.5">SHIFT</p>
              </div>
              <div className="bg-[#F3E8FF] border border-[#E9D5FF] rounded-lg p-3 text-center cursor-pointer hover:shadow-sm transition">
                <h2 className="text-[20px] font-extrabold text-[#333333]">4</h2>
                <p className="text-[10px] font-bold text-[#888888] uppercase mt-0.5">WORK TYPE</p>
              </div>
              <div className="bg-[#FCEDF5] border border-[#FAD3E9] rounded-lg p-3 text-center cursor-pointer hover:shadow-sm transition">
                <h2 className="text-[20px] font-extrabold text-[#333333]">5</h2>
                <p className="text-[10px] font-bold text-[#888888] uppercase mt-0.5">REIMB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section (Full Width Charts) */}
      <div className="space-y-6">
        
        {/* Charts Row 3: Payroll & Recruitment Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payroll Summary Widget */}
          <div className="horilla-card p-0 flex flex-col h-80 border-t-4 border-[#9333EA]">
            <div className="p-5 pb-4 border-b border-slate-100">
              <h3 className="text-[15px] font-bold text-[#333333]">Payroll Summary</h3>
              <p className="text-[12px] text-[#888888]">August 2026</p>
            </div>
            <div className="p-5 flex-1 flex flex-col gap-4">
              <div className="bg-gradient-to-r from-[#9333EA] to-[#EC4899] rounded-xl p-5 text-white flex items-center justify-between shadow-md">
                <div>
                  <p className="text-[10px] font-bold tracking-wider opacity-80 mb-1">NET PAY</p>
                  <h2 className="text-3xl font-bold">440,338</h2>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <span className="text-[12px] font-bold text-white">↑ 9%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="bg-[#E6F4EA] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <h3 className="text-[18px] font-bold text-[#10B981]">511,774</h3>
                  <p className="text-[10px] font-bold text-[#666666] uppercase mt-1">Gross</p>
                </div>
                <div className="bg-[#FCECE9] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <h3 className="text-[18px] font-bold text-[#E9573F]">71,435</h3>
                  <p className="text-[10px] font-bold text-[#666666] uppercase mt-1">Deductions</p>
                </div>
                <div className="bg-[#EEF2FF] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <h3 className="text-[18px] font-bold text-[#E9573F]">20</h3>
                  <p className="text-[10px] font-bold text-[#666666] uppercase mt-1">Payslips</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <h3 className="text-[18px] font-bold text-[#333333]">403,814</h3>
                  <p className="text-[10px] font-bold text-[#888888] uppercase mt-1">Prev Month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recruitment Funnel */}
          <div className="horilla-card horilla-card-gradient-top-red-orange p-5 flex flex-col h-80">
            <div>
              <h3 className="text-[15px] font-bold text-[#333333]">Recruitment Funnel</h3>
              <p className="text-[12px] text-[#888888]">Candidates by stage — active recruitments</p>
            </div>
            <div className="text-right mt-2">
              <span className="text-[11px] text-[#888888]">2 active recruitments · 17 total · 5 hired</span>
            </div>
            <div className="flex-1 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recruitmentData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#333333', fontWeight: 600 }} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]}>
                    {recruitmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 4: Leave & Attendance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leave Breakdown */}
          <div className="horilla-card horilla-card-gradient-top-purple-pink p-5 flex flex-col h-80">
            <div>
              <h3 className="text-[15px] font-bold text-[#333333]">Leave Breakdown</h3>
              <p className="text-[12px] text-[#888888]">August 2026</p>
            </div>
            <div className="flex-1 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leaveBreakdownData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                  <XAxis type="number" axisLine={false} tickLine={false} tick={false} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#333333', fontWeight: 600 }} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" barSize={30} radius={[0, 8, 8, 0]}>
                    {leaveBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="horilla-card horilla-card-gradient-top-orange-purple p-5 flex flex-col h-80">
            <div>
              <h3 className="text-[15px] font-bold text-[#333333]">Attendance Overview</h3>
              <p className="text-[12px] text-[#888888]">On-time, late arrivals & early departures by department</p>
            </div>
            <div className="flex-1 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceOverviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#666666' }} />
                  <Bar dataKey="onTime" name="On-Time" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="late" name="Late" stackId="a" fill="#F59E0B" />
                  <Bar dataKey="early" name="Early Departure" stackId="a" fill="#E9573F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Overtime */}
          <div className="horilla-card horilla-card-gradient-top-orange-purple p-5 flex flex-col h-80">
            <div>
              <h3 className="text-[15px] font-bold text-[#333333]">Department Overtime</h3>
              <p className="text-[12px] text-[#888888]">Overtime hours distribution</p>
            </div>
            <div className="flex-1 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentOvertimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <Tooltip />
                  <Bar dataKey="hours" name="Overtime Hours" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attendance Trend */}
          <div className="horilla-card horilla-card-gradient-top-orange-purple p-5 flex flex-col h-80">
            <div>
              <h3 className="text-[15px] font-bold text-[#333333]">Attendance Trend</h3>
              <p className="text-[12px] text-[#888888]">Weekly rate — 2026-08-01 → 2026-08-31</p>
            </div>
            <div className="flex-1 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" name="Attendance %" stroke="#9333EA" strokeWidth={3} dot={{ r: 4, fill: '#9333EA', strokeWidth: 2, stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recruitment Pipeline */}
          <div className="horilla-card horilla-card-gradient-top-red-orange p-5 flex flex-col h-80">
            <div>
              <h3 className="text-[15px] font-bold text-[#333333]">Recruitment Pipeline</h3>
              <p className="text-[12px] text-[#888888]">Candidates by stage per recruitment</p>
            </div>
            <div className="flex-1 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recruitmentPipelineData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <YAxis dataKey="role" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#333333' }} />
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="applied" name="Applied" stackId="a" fill="#E9573F" />
                  <Bar dataKey="interview" name="Interview" stackId="a" fill="#F59E0B" />
                  <Bar dataKey="offer" name="Offer" stackId="a" fill="#10B981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hiring Timeline */}
          <div className="horilla-card horilla-card-gradient-top-orange-purple p-5 flex flex-col h-80">
            <div>
              <h3 className="text-[15px] font-bold text-[#333333]">Hiring Timeline</h3>
              <p className="text-[12px] text-[#888888]">Employees joined by month</p>
            </div>
            <div className="flex-1 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hiringTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <Tooltip />
                  <Bar dataKey="joined" name="Joined Employees" fill="#10B981" radius={[4, 4, 0, 0]} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 7 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Employee Turnover */}
          <div className="horilla-card horilla-card-gradient-top-purple-pink p-5 flex flex-col h-80">
            <div>
              <h3 className="text-[15px] font-bold text-[#333333]">Employee Turnover</h3>
              <p className="text-[12px] text-[#888888]">6-month turnover rate: 2.1%</p>
            </div>
            <div className="flex-1 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employeeTurnoverData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="newHires" name="New Hires" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="exits" name="Exits" fill="#E9573F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HrDashboard;

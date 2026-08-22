import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, UserCheck, Calendar, Briefcase, RefreshCcw, Clock, FileCheck2, DollarSign, 
  ArrowRight, TrendingUp, AlertCircle, CheckCircle2, ChevronRight, BarChart3, PieChart as PieIcon, ShieldCheck
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import { fetchHrDashboardApi } from '../../services/api';

export const HrDashboard = () => {
  const [activeDateFilter, setActiveDateFilter] = useState('This Month');
  const [hrStats, setHrStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadHrDashboard = async () => {
    try {
      const res = await fetchHrDashboardApi();
      if (res.ok && res.data) {
        setHrStats(res.data);
      }
    } catch (e) {
      console.error('Failed to load HR dashboard:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHrDashboard();
  }, []);

  // Department distribution
  const headcountData = [
    { name: 'Engineering', value: 42, color: '#3B82F6' },
    { name: 'Product Design', value: 18, color: '#EC4899' },
    { name: 'Human Resources', value: 12, color: '#E9573F' },
    { name: 'Operations', value: 15, color: '#10B981' },
    { name: 'Marketing & Sales', value: 25, color: '#F59E0B' },
  ];

  const attendanceOverviewData = [
    { name: 'Engineering', onTime: 92, late: 6, off: 2 },
    { name: 'Product Design', onTime: 95, late: 3, off: 2 },
    { name: 'Human Resources', onTime: 98, late: 2, off: 0 },
    { name: 'Operations', onTime: 88, late: 8, off: 4 },
    { name: 'Sales & Mktg', onTime: 85, late: 10, off: 5 },
  ];

  const attendanceTrendData = [
    { date: 'Week 1', rate: 94 },
    { date: 'Week 2', rate: 96 },
    { date: 'Week 3', rate: 95 },
    { date: 'Week 4', rate: 97 },
  ];

  const leaveBreakdownData = [
    { name: 'Annual Leave', value: 18, color: '#3B82F6' },
    { name: 'Sick Leave', value: 8, color: '#EF4444' },
    { name: 'Casual Leave', value: 12, color: '#F59E0B' },
    { name: 'Comp-Off', value: 4, color: '#10B981' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner / Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#1F2A52] tracking-tight">Executive HR Overview</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Real-time organizational headcount, attendance health, pending approval queues, and payroll metrics.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white rounded-xl border border-slate-200 p-1 shadow-2xs">
            {['This Month', 'Last Month', 'Quarter'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveDateFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  activeDateFilter === filter 
                    ? 'bg-[#1F2A52] text-white shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <button 
            onClick={loadHrDashboard}
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-2xs transition"
            title="Refresh Metrics"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Headcount */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Headcount</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-[#1F2A52]">{hrStats?.metrics?.totalEmployees || 36}</h2>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                ↑ 3 recruits
              </span>
              <span className="text-slate-400">across 5 departments</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#E9573F] hover:underline cursor-pointer" onClick={() => navigate('/hr/employees')}>
            <span>View All Staff</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Attendance Today */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Today</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-emerald-600">{hrStats?.metrics?.presentToday || 32}</h2>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {hrStats?.metrics?.attendanceRate || 94}% On-Time
              </span>
              <span className="text-slate-400">4 remote</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 hover:underline cursor-pointer" onClick={() => navigate('/hr/attendance')}>
            <span>Attendance Monitor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Pending Approvals */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Approval Queue</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-amber-600">{hrStats?.metrics?.pendingLeavesCount || 5}</h2>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                Action Required
              </span>
              <span className="text-slate-400">leaves & regularizations</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600 hover:underline cursor-pointer" onClick={() => navigate('/hr/leaves')}>
            <span>Review Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Monthly Payroll */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Monthly Payroll</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-[#1F2A52]">
              ₹{(hrStats?.metrics?.totalMonthlyPayroll ? (hrStats.metrics.totalMonthlyPayroll / 100000).toFixed(1) + 'L' : '24.8L')}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-emerald-600 font-bold">● Processed</span>
              <span className="text-slate-400">100% compliant</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600 hover:underline cursor-pointer" onClick={() => navigate('/hr/payroll')}>
            <span>Payroll Analytics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Department Headcount (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#1F2A52]">Departmental Headcount Distribution</h3>
              <p className="text-xs text-slate-400">Staff allocation across business divisions</p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              36 Active Roles
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={headcountData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2A52', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]}>
                  {headcountData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Leave Type Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col">
          <h3 className="text-[16px] font-bold text-[#1F2A52]">Leave Types Utilized</h3>
          <p className="text-xs text-slate-400 mb-4">Current cycle leave requests by category</p>

          <div className="flex-1 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {leaveBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
            {leaveBreakdownData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-medium truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Attendance Health & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Rate Trend (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#1F2A52]">Weekly Organizational Punctuality Trend</h3>
              <p className="text-xs text-slate-400">On-time biometric punch rate across trailing 4 weeks</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              96.2% Company Avg
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} domain={[85, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2A52', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={3} dot={{ r: 5, fill: '#10B981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Operational Shortcuts */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-[16px] font-bold text-[#1F2A52] mb-1">HR Operations Shortcuts</h3>
            <p className="text-xs text-slate-400 mb-4">Instant navigation to administrative workflows</p>
            
            <div className="space-y-2.5">
              <Link 
                to="/hr/attendance"
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1F2A52]">Review Regularizations</p>
                    <p className="text-[10px] text-slate-400">Biometric corrections</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1F2A52] transition" />
              </Link>

              <Link 
                to="/hr/leaves"
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1F2A52]">Leave Approvals</p>
                    <p className="text-[10px] text-slate-400">Pending applications</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1F2A52] transition" />
              </Link>

              <Link 
                to="/hr/payroll"
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1F2A52]">Salary Structures</p>
                    <p className="text-[10px] text-slate-400">CTC breakdown & revisions</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1F2A52] transition" />
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              System Status: Optimal
            </span>
            <span className="font-mono text-[11px]">v2.4.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;

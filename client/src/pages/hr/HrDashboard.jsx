import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, UserCheck, Calendar, Briefcase, RefreshCcw, Plus
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
    { name: 'Engineering', value: 65, color: '#9333EA' },
    { name: 'Sales', value: 45, color: '#FF5D7A' },
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
    { name: 'In-Active', value: 2, color: '#FF5D7A' },
  ];

  const genderData = [
    { name: 'Male', value: 36, color: '#3B82F6' },
    { name: 'Female', value: 36, color: '#EC4899' },
    { name: 'Other', value: 27, color: '#A855F7' },
  ];

  const recruitmentData = [
    { stage: 'Initial', value: 2, fill: '#94A3B8' },
    { stage: 'Applied', value: 7, fill: '#FF5D7A' },
    { stage: 'Interview', value: 1, fill: '#F59E0B' },
    { stage: 'Cancelled', value: 2, fill: '#EF4444' },
    { stage: 'Hired', value: 5, fill: '#10B981' },
  ];

  const leaveBreakdownData = [
    { name: 'Casual Leave', value: 14, fill: '#FF5D7A' }
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
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 font-inter p-6">
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-sora text-2xl font-extrabold text-white">HR Executive Analytics</h1>
          <p className="text-xs text-slate-400">Real-time workforce intelligence and system telemetry</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-[#111] rounded-xl border border-white/10 overflow-hidden p-1">
            {['This Month', 'Last Month', 'Quarter'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveDateFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  activeDateFilter === filter 
                    ? 'bg-[#FF5D7A] text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-[#111] px-3 py-1.5 rounded-xl border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span>Live Data</span>
            <RefreshCcw className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white transition ml-1" />
          </div>
        </div>
      </div>

      {/* Top Section with Right Sidebar */}
      <div className="flex flex-col xl:flex-row gap-6 mb-6">
        
        {/* Main Content (Left Column) */}
        <div className="flex-1 space-y-6">
          
          {/* Top KPI Cards Row (Image 2 Card Aesthetics) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 text-[#FF5D7A]">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Total Workforce</p>
              <h3 className="text-3xl font-sora font-extrabold text-white mt-1">179</h3>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Active employees</span>
                <span className="text-emerald-400 font-bold">✓ 100% Onboarded</span>
              </div>
            </div>

            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Present Today</p>
              <h3 className="text-3xl font-sora font-extrabold text-white mt-1">19</h3>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Check-in rate</span>
                <span className="text-amber-400 font-bold">10.6% Live</span>
              </div>
            </div>

            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">On Approved Leave</p>
              <h3 className="text-3xl font-sora font-extrabold text-white mt-1">3</h3>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Pending requests</span>
                <span className="text-[#FF5D7A] font-bold">12 Pending</span>
              </div>
            </div>

            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Open Positions</p>
              <h3 className="text-3xl font-sora font-extrabold text-white mt-1">2</h3>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Active recruitment</span>
                <span className="text-blue-400 font-bold">5 Hired</span>
              </div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Headcount */}
            <div className="horilla-card horilla-card-gradient-top-orange-purple p-5 flex flex-col h-80">
              <div>
                <h3 className="text-sm font-sora font-bold text-white">Department Headcount</h3>
                <p className="text-xs text-slate-400">Distribution across business units</p>
              </div>
              <div className="flex-1 relative mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={headcountData} cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={3} dataKey="value" stroke="none">
                      {headcountData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-mono">Total</span>
                  <span className="text-xl font-bold text-white">178</span>
                </div>
              </div>
            </div>

            {/* Leave Trends */}
            <div className="horilla-card horilla-card-gradient-top-purple-pink p-5 flex flex-col h-80">
              <div>
                <h3 className="text-sm font-sora font-bold text-white">Leave Trends</h3>
                <p className="text-xs text-slate-400">Daily leave applications this week</p>
              </div>
              <div className="flex-1 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={leaveTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorLeaves" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF5D7A" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FF5D7A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} domain={[0, 4]} />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                    <Area type="monotone" dataKey="leaves" stroke="#FF5D7A" strokeWidth={3} fillOpacity={1} fill="url(#colorLeaves)" dot={{ r: 4, fill: '#FF5D7A', strokeWidth: 2, stroke: '#111' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employee Status */}
            <div className="horilla-card p-5 flex flex-col h-80">
              <div>
                <h3 className="text-sm font-sora font-bold text-white">Employee Active Status</h3>
                <p className="text-xs text-slate-400">Active vs Inactive personnel</p>
              </div>
              <div className="flex-1 relative mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={empStatusData} cx="50%" cy="50%" innerRadius={75} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none">
                      {empStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-mono">Total</span>
                  <span className="text-xl font-bold text-white">180</span>
                </div>
              </div>
            </div>

            {/* Gender Distribution */}
            <div className="horilla-card p-5 flex flex-col h-80">
              <div>
                <h3 className="text-sm font-sora font-bold text-white">Gender Diversity</h3>
                <p className="text-xs text-slate-400">Demographic breakdown</p>
              </div>
              <div className="flex-1 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genderData} cx="50%" cy="50%" outerRadius={95} dataKey="value" stroke="#111" strokeWidth={2}>
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="w-full xl:w-[320px] shrink-0 space-y-6">
          {/* Announcements */}
          <div className="horilla-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-sora font-bold text-white">Company Broadcasts</h3>
              <button className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center text-[#FF5D7A] hover:bg-[#FF5D7A]/10 transition">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Employee Referral Program', date: 'Aug 11, 2026', exp: 'Expires Nov 20' },
                { title: 'Scheduled IT Maintenance', date: 'Aug 10, 2026', exp: 'Expires Sep 05' },
                { title: 'Updated Work Policy', date: 'Aug 08, 2026', exp: 'Expires Oct 21' },
              ].map((item, i) => (
                <div key={i} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <h4 className="text-xs font-bold text-slate-200 leading-snug">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500 font-mono">
                    <span>{item.date}</span>
                    <span className="text-[#FF5D7A] bg-[#FF5D7A]/10 px-1.5 py-0.5 rounded border border-[#FF5D7A]/20">{item.exp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 hover:underline cursor-pointer" onClick={() => navigate('/hr/attendance')}>
            <span>Attendance Monitor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

          {/* Pending Approvals */}
          <div className="horilla-card p-5">
            <h3 className="text-sm font-sora font-bold text-white mb-4">Approval Matrix</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#18181b] border border-white/10 rounded-xl p-3 text-center hover:border-[#FF5D7A]/40 transition">
                <h2 className="text-xl font-sora font-extrabold text-white">12</h2>
                <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">LEAVE</p>
              </div>
              <div className="bg-[#18181b] border border-white/10 rounded-xl p-3 text-center hover:border-emerald-500/40 transition">
                <h2 className="text-xl font-sora font-extrabold text-white">0</h2>
                <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">ATTENDANCE</p>
              </div>
              <div className="bg-[#18181b] border border-white/10 rounded-xl p-3 text-center hover:border-purple-500/40 transition">
                <h2 className="text-xl font-sora font-extrabold text-white">3</h2>
                <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">ASSETS</p>
              </div>
              <div className="bg-[#18181b] border border-white/10 rounded-xl p-3 text-center hover:border-blue-500/40 transition">
                <h2 className="text-xl font-sora font-extrabold text-white">5</h2>
                <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">PAYROLL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;

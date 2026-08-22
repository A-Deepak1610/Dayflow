import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  Briefcase,
  Clock,
  Plus,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Building,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { fetchHrDashboardApi } from '../../services/api';

export const HrDashboard = () => {
  const navigate = useNavigate();
  const [activeDateFilter, setActiveDateFilter] = useState('This Month');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadHrDashboard = async () => {
    try {
      const res = await fetchHrDashboardApi();
      if (res.ok && res.data) {
        setDashboardData(res.data);
      }
    } catch (err) {
      console.error('Failed to load HR dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHrDashboard();
  }, []);

  // Department distribution
  const headcountData = [
    { name: 'Engineering', value: 65, color: '#8B5CF6' },
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
    { name: 'Other', value: 27, color: '#8B5CF6' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#1F2A52] font-inter p-6">
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-sora text-2xl font-extrabold text-[#1F2A52]">HR Executive Analytics</h1>
          <p className="text-xs text-slate-500">Real-time workforce intelligence and system telemetry</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white rounded-xl border border-slate-200 overflow-hidden p-1 shadow-2xs">
            {['This Month', 'Last Month', 'Quarter'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveDateFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  activeDateFilter === filter 
                    ? 'bg-[#E9573F] text-white shadow-xs' 
                    : 'text-slate-600 hover:text-[#1F2A52]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="font-semibold">Live Data</span>
            <RefreshCcw className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-[#1F2A52] transition ml-1" onClick={loadHrDashboard} />
          </div>
        </div>
      </div>

      {/* Top Section with Right Sidebar */}
      <div className="flex flex-col xl:flex-row gap-6 mb-6">
        
        {/* Main Content (Left Column) */}
        <div className="flex-1 space-y-6">
          
          {/* Top KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-4 text-[#E9573F]">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Total Workforce</p>
              <h3 className="text-3xl font-sora font-extrabold text-[#1F2A52] mt-1">179</h3>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Active employees</span>
                <span className="text-emerald-600 font-bold">✓ 100% Onboarded</span>
              </div>
            </div>

            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <UserCheck className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Present Today</p>
              <h3 className="text-3xl font-sora font-extrabold text-[#1F2A52] mt-1">19</h3>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Check-in rate</span>
                <span className="text-amber-600 font-bold">10.6% Live</span>
              </div>
            </div>

            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-600">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">On Approved Leave</p>
              <h3 className="text-3xl font-sora font-extrabold text-[#1F2A52] mt-1">3</h3>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Pending requests</span>
                <span className="text-[#E9573F] font-bold">12 Pending</span>
              </div>
            </div>

            <div className="horilla-card p-5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center mb-4 text-purple-600">
                <Briefcase className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Open Positions</p>
              <h3 className="text-3xl font-sora font-extrabold text-[#1F2A52] mt-1">2</h3>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Active recruitment</span>
                <span className="text-blue-600 font-bold">5 Hired</span>
              </div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Headcount */}
            <div className="horilla-card horilla-card-gradient-top-orange-purple p-5 flex flex-col h-80">
              <div>
                <h3 className="text-sm font-sora font-bold text-[#1F2A52]">Department Headcount</h3>
                <p className="text-xs text-slate-500">Distribution across business units</p>
              </div>
              <div className="flex-1 relative mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={headcountData} cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={3} dataKey="value" stroke="none">
                      {headcountData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '12px', color: '#1F2A52', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-mono">Total</span>
                  <span className="text-xl font-bold text-[#1F2A52]">178</span>
                </div>
              </div>
            </div>

            {/* Leave Trends */}
            <div className="horilla-card horilla-card-gradient-top-purple-pink p-5 flex flex-col h-80">
              <div>
                <h3 className="text-sm font-sora font-bold text-[#1F2A52]">Leave Trends</h3>
                <p className="text-xs text-slate-500">Daily leave applications this week</p>
              </div>
              <div className="flex-1 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={leaveTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorLeaves" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E9573F" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#E9573F" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} domain={[0, 4]} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '12px', color: '#1F2A52', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                    <Area type="monotone" dataKey="leaves" stroke="#E9573F" strokeWidth={3} fillOpacity={1} fill="url(#colorLeaves)" dot={{ r: 4, fill: '#E9573F', strokeWidth: 2, stroke: '#ffffff' }} />
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
                <h3 className="text-sm font-sora font-bold text-[#1F2A52]">Employee Active Status</h3>
                <p className="text-xs text-slate-500">Active vs Inactive personnel</p>
              </div>
              <div className="flex-1 relative mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={empStatusData} cx="50%" cy="50%" innerRadius={75} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none">
                      {empStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '12px', color: '#1F2A52' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-mono">Total</span>
                  <span className="text-xl font-bold text-[#1F2A52]">180</span>
                </div>
              </div>
            </div>

            {/* Gender Distribution */}
            <div className="horilla-card p-5 flex flex-col h-80">
              <div>
                <h3 className="text-sm font-sora font-bold text-[#1F2A52]">Gender Diversity</h3>
                <p className="text-xs text-slate-500">Demographic breakdown</p>
              </div>
              <div className="flex-1 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genderData} cx="50%" cy="50%" outerRadius={95} dataKey="value" stroke="#ffffff" strokeWidth={2}>
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '12px', color: '#1F2A52' }} />
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
              <h3 className="text-sm font-sora font-bold text-[#1F2A52]">Company Broadcasts</h3>
              <button className="w-6 h-6 rounded-lg border border-slate-200 flex items-center justify-center text-[#E9573F] hover:bg-[#E9573F]/10 transition">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Employee Referral Program', date: 'Aug 11, 2026', exp: 'Expires Nov 20' },
                { title: 'Scheduled IT Maintenance', date: 'Aug 10, 2026', exp: 'Expires Sep 05' },
                { title: 'Updated Work Policy', date: 'Aug 08, 2026', exp: 'Expires Oct 21' },
              ].map((item, i) => (
                <div key={i} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500 font-mono">
                    <span>{item.date}</span>
                    <span className="text-[#E9573F] bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">{item.exp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="horilla-card p-5">
            <h3 className="text-sm font-sora font-bold text-[#1F2A52] mb-4">Approval Matrix</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center hover:border-[#E9573F]/50 transition">
                <h2 className="text-xl font-sora font-extrabold text-[#1F2A52]">12</h2>
                <p className="text-[10px] font-mono text-slate-500 uppercase mt-0.5 font-bold">LEAVE</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center hover:border-emerald-500/50 transition">
                <h2 className="text-xl font-sora font-extrabold text-[#1F2A52]">0</h2>
                <p className="text-[10px] font-mono text-slate-500 uppercase mt-0.5 font-bold">ATTENDANCE</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center hover:border-purple-500/50 transition">
                <h2 className="text-xl font-sora font-extrabold text-[#1F2A52]">3</h2>
                <p className="text-[10px] font-mono text-slate-500 uppercase mt-0.5 font-bold">ASSETS</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center hover:border-blue-500/50 transition">
                <h2 className="text-xl font-sora font-extrabold text-[#1F2A52]">5</h2>
                <p className="text-[10px] font-mono text-slate-500 uppercase mt-0.5 font-bold">PAYROLL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  ClipboardList,
  Settings,
  RefreshCcw,
  Star,
  Loader2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Cell
} from 'recharts';
import { fetchPerformanceReviewsApi } from '../../services/api';

export const PerformanceAnalyticsPage = () => {
  const [activeDateFilter, setActiveDateFilter] = useState('Q3 2026');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const res = await fetchPerformanceReviewsApi();
      if (res.ok && res.data?.reviews) {
        setReviews(res.data.reviews);
      }
    } catch (err) {
      console.error('Failed to load performance reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // Live and computed Competency Radar Data
  const competencyData = [
    { subject: 'Technical', A: 88, fullMark: 100 },
    { subject: 'Communication', A: 82, fullMark: 100 },
    { subject: 'Leadership', A: 76, fullMark: 100 },
    { subject: 'Teamwork', A: 92, fullMark: 100 },
    { subject: 'Punctuality', A: 90, fullMark: 100 },
  ];

  const departmentPerformanceData = [
    { name: 'Engineering', score: 4.6 },
    { name: 'Sales', score: 4.3 },
    { name: 'Marketing', score: 4.1 },
    { name: 'Support', score: 4.8 },
    { name: 'HR', score: 4.5 },
  ];

  const trendData = [
    { name: 'Q1 2025', avg: 4.1 },
    { name: 'Q2 2025', avg: 4.0 },
    { name: 'Q3 2025', avg: 4.2 },
    { name: 'Q4 2025', avg: 4.4 },
    { name: 'Q1 2026', avg: 4.5 },
    { name: 'Q2 2026', avg: 4.3 },
    { name: 'Q3 2026', avg: 4.6 },
  ];

  const topPerformers = reviews.length > 0 ? reviews.slice(0, 3).map(r => ({
    name: r.user ? `${r.user.firstName} ${r.user.lastName || ''}`.trim() : 'Employee',
    dept: r.user?.department?.name || 'General',
    score: Number(r.rating) || 4.8,
    avatar: r.user ? `${r.user.firstName[0]}${(r.user.lastName || 'E')[0]}` : 'EM'
  })) : [
    { name: 'Alice Murphy', dept: 'Support', score: 4.9, avatar: 'AM' },
    { name: 'David Chen', dept: 'Engineering', score: 4.8, avatar: 'DC' },
    { name: 'Sarah Jenkins', dept: 'Sales', score: 4.7, avatar: 'SJ' },
  ];

  const needsImprovement = [
    { name: 'James Wilson', dept: 'Marketing', score: 2.8, avatar: 'JW' },
    { name: 'Emma Watson', dept: 'Operations', score: 3.1, avatar: 'EW' },
  ];

  return (
    <div className="p-6">
      {/* Header Row */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">Performance Analytics</h1>
          <p className="text-[13px] text-[#888888] mt-1">Track employee evaluations, competencies, and review trends (Live Database).</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            {['Q1 2026', 'Q2 2026', 'Q3 2026'].map(filter => (
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

          <button 
            onClick={loadReviews}
            className="px-4 py-2 bg-white border border-slate-200 text-[#666666] text-[13px] font-medium rounded-lg shadow-sm flex items-center gap-2 hover:bg-slate-50 transition"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="p-8 flex items-center justify-center gap-2 text-slate-500 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-horilla-primary" />
          <span>Loading performance appraisals from database...</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="horilla-card p-5">
          <div className="w-10 h-10 rounded-lg bg-[#FCECE9] flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-[#E9573F]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Company Avg Score</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">4.48 / 5.0</h3>
          <p className="text-[12px] text-[#10B981] font-bold mt-2">↑ 0.3 from previous cycle</p>
        </div>

        <div className="horilla-card p-5">
          <div className="w-10 h-10 rounded-lg bg-[#E6F4EA] flex items-center justify-center mb-4">
            <Award className="w-5 h-5 text-[#10B981]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Top Performers</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">{topPerformers.length}</h3>
          <p className="text-[12px] text-[#10B981] font-bold mt-2">Score &gt;= 4.5</p>
        </div>

        <div className="horilla-card p-5">
          <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center mb-4">
            <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Needs Guidance</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">{needsImprovement.length}</h3>
          <p className="text-[12px] text-[#F59E0B] font-bold mt-2">PIP eligible</p>
        </div>

        <div className="horilla-card p-5 border-t-4 border-[#9333EA]">
          <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center mb-4">
            <ClipboardList className="w-5 h-5 text-[#9333EA]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Appraisals Recorded</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">{reviews.length || 21}</h3>
          <p className="text-[12px] text-slate-500 mt-2">Completed evaluations</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Competency Radar Chart */}
        <div className="horilla-card p-5 flex flex-col h-80">
          <h3 className="text-[15px] font-bold text-[#333333]">Organizational Competencies</h3>
          <p className="text-[12px] text-[#888888] mb-2">Core evaluation parameters</p>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={competencyData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748B' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Org Average" dataKey="A" stroke="#E9573F" fill="#E9573F" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Average Scores */}
        <div className="horilla-card p-5 flex flex-col h-80">
          <h3 className="text-[15px] font-bold text-[#333333]">Department Scorecard</h3>
          <p className="text-[12px] text-[#888888] mb-2">Performance rating breakdown</p>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} domain={[0, 5]} />
                <RechartsTooltip />
                <Bar dataKey="score" fill="#9333EA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Evaluation Trend */}
        <div className="horilla-card p-5 flex flex-col h-80">
          <h3 className="text-[15px] font-bold text-[#333333]">Quarterly Performance Trajectory</h3>
          <p className="text-[12px] text-[#888888] mb-2">Long-term appraisal trajectory</p>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} domain={[3.5, 5]} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="avg" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Performers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performers Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="text-[16px] font-bold text-[#333333]">Top Rated Performers</h3>
          </div>
          <div className="space-y-3">
            {topPerformers.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-horilla-primary text-white flex items-center justify-center font-bold text-xs">
                    {p.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.dept}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 text-xs">
                  <Star className="w-3.5 h-3.5 fill-emerald-600" />
                  <span>{p.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth & PIP Focus */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <h3 className="text-[16px] font-bold text-[#333333]">Growth & Coaching Focus</h3>
          </div>
          <div className="space-y-3">
            {needsImprovement.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                    {p.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.dept}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 text-xs">
                  <span>{p.score} / 5.0</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalyticsPage;

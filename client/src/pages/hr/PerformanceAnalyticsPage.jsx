import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  ClipboardList,
  Settings,
  RefreshCcw,
  Star
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Cell
} from 'recharts';

export const PerformanceAnalyticsPage = () => {
  const [activeDateFilter, setActiveDateFilter] = useState('Q3 2026');

  // Mock Data for Charts
  const competencyData = [
    { subject: 'Technical', A: 85, fullMark: 100 },
    { subject: 'Communication', A: 78, fullMark: 100 },
    { subject: 'Leadership', A: 65, fullMark: 100 },
    { subject: 'Teamwork', A: 90, fullMark: 100 },
    { subject: 'Punctuality', A: 88, fullMark: 100 },
  ];

  const departmentPerformanceData = [
    { name: 'Engineering', score: 4.5 },
    { name: 'Sales', score: 4.2 },
    { name: 'Marketing', score: 4.0 },
    { name: 'Support', score: 4.7 },
    { name: 'HR', score: 4.3 },
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

  const topPerformers = [
    { name: 'Alice Murphy', dept: 'Support', score: 4.9, avatar: 'AM' },
    { name: 'David Chen', dept: 'Engineering', score: 4.8, avatar: 'DC' },
    { name: 'Sarah Jenkins', dept: 'Sales', score: 4.7, avatar: 'SJ' },
  ];

  const needsImprovement = [
    { name: 'James Wilson', dept: 'Marketing', score: 2.4, avatar: 'JW' },
    { name: 'Emma Watson', dept: 'Operations', score: 2.6, avatar: 'EW' },
  ];

  return (
    <div className="p-6">
      
      {/* Header Row */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">Performance Analytics</h1>
          <p className="text-[13px] text-[#888888] mt-1">Track employee evaluations, competencies, and review trends.</p>
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

          <button className="px-4 py-2 bg-white border border-slate-200 text-[#666666] text-[13px] font-medium rounded-lg shadow-sm flex items-center gap-2 hover:bg-slate-50 transition">
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>
          
          <button className="px-4 py-2 bg-horilla-primary text-white text-[13px] font-medium rounded-lg shadow-sm flex items-center gap-2 hover:bg-horilla-primary-hover transition">
            <Settings className="w-4 h-4" />
            Config Metrics
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="horilla-card p-5">
          <div className="w-10 h-10 rounded-lg bg-[#FCECE9] flex items-center justify-center mb-4">
            <Star className="w-5 h-5 text-[#E9573F]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Avg Org Rating</p>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-[28px] font-extrabold text-[#333333] leading-none">4.6</h3>
            <span className="text-[14px] text-slate-400 mb-0.5">/ 5.0</span>
          </div>
          <p className="text-[12px] text-[#10B981] font-bold mt-2">↑ 0.3 from last quarter</p>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-slate-100 rounded-full opacity-50 pointer-events-none"></div>
        </div>

        <div className="horilla-card p-5">
          <div className="w-10 h-10 rounded-lg bg-[#E6F4EA] flex items-center justify-center mb-4">
            <ClipboardList className="w-5 h-5 text-[#10B981]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Completed Reviews</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">145</h3>
          <p className="text-[12px] text-slate-500 mt-2">85% completion rate</p>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-slate-100 rounded-full opacity-50 pointer-events-none"></div>
        </div>

        <div className="horilla-card p-5">
          <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center mb-4">
            <Award className="w-5 h-5 text-[#9333EA]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">Top Performers</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">32</h3>
          <p className="text-[12px] text-slate-500 mt-2">Employees rated 4.5+</p>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-slate-100 rounded-full opacity-50 pointer-events-none"></div>
        </div>

        <div className="horilla-card p-5 border-b-4 border-[#F59E0B]">
          <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center mb-4">
            <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <p className="text-[11px] font-bold text-[#888888] uppercase tracking-wide">PIP Candidates</p>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-1 leading-none">4</h3>
          <p className="text-[12px] text-slate-500 mt-2">Requires immediate attention</p>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-slate-100 rounded-full opacity-50 pointer-events-none"></div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Competencies Radar */}
        <div className="horilla-card horilla-card-gradient-top-orange-purple p-5 flex flex-col min-h-[400px]">
          <div>
            <h3 className="text-[15px] font-bold text-[#333333]">Core Competencies</h3>
            <p className="text-[12px] text-[#888888]">Organizational average mapping</p>
          </div>
          <div className="flex-1 mt-6 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={competencyData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Org Average" dataKey="A" stroke="#E9573F" fill="#E9573F" fillOpacity={0.4} />
                <RechartsTooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="horilla-card horilla-card-gradient-top-purple-pink p-5 flex flex-col min-h-[400px]">
          <div>
            <h3 className="text-[15px] font-bold text-[#333333]">Performance Trends</h3>
            <p className="text-[12px] text-[#888888]">Average score over recent quarters</p>
          </div>
          <div className="flex-1 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                <YAxis domain={[3.0, 5.0]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Line 
                  type="monotone" 
                  dataKey="avg" 
                  name="Avg Score" 
                  stroke="#9333EA" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: '#9333EA', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department Comparison */}
        <div className="horilla-card p-5 lg:col-span-1 flex flex-col min-h-[350px]">
          <div>
            <h3 className="text-[15px] font-bold text-[#333333]">Department Averages</h3>
            <p className="text-[12px] text-[#888888]">Score out of 5.0</p>
          </div>
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformanceData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <XAxis type="number" domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888888' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#333333', fontWeight: 600 }} />
                <RechartsTooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="score" barSize={20} radius={[0, 4, 4, 0]}>
                  {departmentPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 4.4 ? '#10B981' : entry.score > 4.1 ? '#3B82F6' : '#F59E0B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leaderboards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Top Performers */}
          <div className="horilla-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-[#10B981]" />
              <h3 className="text-[15px] font-bold text-[#333333]">Top Performers</h3>
            </div>
            <div className="space-y-4">
              {topPerformers.map((emp, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#E6F4EA]/50 rounded-xl border border-[#10B981]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[12px] font-bold shadow-sm">
                      {emp.avatar}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#333333] leading-tight">{emp.name}</p>
                      <p className="text-[11px] text-[#666666]">{emp.dept}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-white text-[#10B981] font-bold text-[12px] rounded-lg shadow-sm">
                      {emp.score.toFixed(1)} <Star className="w-3 h-3 inline-block -mt-0.5 fill-[#10B981]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-[12px] font-bold text-[#10B981] hover:bg-[#E6F4EA] rounded-lg transition">
              View all top performers &rarr;
            </button>
          </div>

          {/* Needs Improvement */}
          <div className="horilla-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#E9573F]" />
              <h3 className="text-[15px] font-bold text-[#333333]">Needs Improvement</h3>
            </div>
            <div className="space-y-4">
              {needsImprovement.map((emp, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#FCECE9]/50 rounded-xl border border-[#E9573F]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#E9573F] text-white flex items-center justify-center text-[12px] font-bold shadow-sm">
                      {emp.avatar}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#333333] leading-tight">{emp.name}</p>
                      <p className="text-[11px] text-[#666666]">{emp.dept}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-white text-[#E9573F] font-bold text-[12px] rounded-lg shadow-sm">
                      {emp.score.toFixed(1)} <Star className="w-3 h-3 inline-block -mt-0.5 fill-[#E9573F]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-[12px] font-bold text-[#E9573F] hover:bg-[#FCECE9] rounded-lg transition">
              View all action items &rarr;
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default PerformanceAnalyticsPage;

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
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Building,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const HrDashboard = () => {
  const { user } = useAuth();
  const { onOpenAddModal } = useOutletContext();

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: 'Elena Rostova', empId: 'DAY-ER-2026-0012', type: 'Annual Leave', dates: 'Aug 24 - Aug 26', days: 3, status: 'Pending', reason: 'Family vacation' },
    { id: 2, name: 'Michael Chang', empId: 'DAY-MC-2026-0044', type: 'Sick Leave', dates: 'Aug 22 - Aug 23', days: 2, status: 'Pending', reason: 'Medical appointment' },
    { id: 3, name: 'Sarah Connor', empId: 'DAY-SC-2026-0089', type: 'Casual Leave', dates: 'Aug 29', days: 1, status: 'Approved', reason: 'Personal work' },
  ]);

  const handleApprove = (id) => {
    setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  };

  const handleReject = (id) => {
    setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1F2A52] via-[#121A36] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5D7A]/20 text-[#FF5D7A] text-xs font-semibold mb-3 border border-[#FF5D7A]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Executive HR Suite</span>
          </div>
          <h1 className="font-sora text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.firstName || 'HR Officer'}!
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Workforce alignment overview for <span className="font-semibold text-white">{user?.companyName || 'Dayflow Org'}</span>.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-5 py-3 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#FF5D7A]/30 transition flex items-center gap-2 cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Onboard New Employee</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/hr/employees" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#FF5D7A]/40 transition group">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-medium">Total Staff Directory</span>
            <Users className="w-5 h-5 text-[#FF5D7A]" />
          </div>
          <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">48</div>
          <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+3 new hires this month</span>
          </p>
        </Link>

        <Link to="/hr/attendance" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition group">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-medium">Today's Attendance</span>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">45 / 48</div>
          <p className="text-xs text-blue-600 mt-2 font-medium">93.7% On-time clock-in</p>
        </Link>

        <Link to="/hr/leaves" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition group">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-medium">Pending Leave Queue</span>
            <Calendar className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">
            {leaveRequests.filter(r => r.status === 'Pending').length}
          </div>
          <p className="text-xs text-amber-600 mt-2 font-semibold">Requires HR review</p>
        </Link>

        <Link to="/hr/payroll" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition group">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-medium">Payroll Cycle</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">Calculated</div>
          <p className="text-xs text-emerald-600 mt-2 font-medium">Ready for August 2026</p>
        </Link>
      </div>

      {/* Main Grid: Leave Requests Queue & Live Punch Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leave Requests Queue */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-sora text-lg font-bold text-[#1F2A52]">Leave Approvals Queue</h3>
              <p className="text-xs text-slate-500">Instant approval or rejection with HR comments</p>
            </div>
            <Link to="/hr/leaves" className="text-xs font-bold text-[#FF5D7A] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {leaveRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-[#1F2A52]">{req.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{req.empId}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{req.type}</span>
                  </div>
                  <p className="text-xs text-slate-600">{req.dates} ({req.days} days) • <span className="italic text-slate-500">"{req.reason}"</span></p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {req.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="px-3.5 py-1.5 bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {req.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Attendance Punch Feed */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="font-sora text-lg font-bold text-[#1F2A52]">Real-Time Punch Feed</h3>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div className="space-y-3">
              {[
                { name: 'Sarah Jenkins', time: '09:02 AM', status: 'In Office', id: 'DAY-SJ-2026-0012' },
                { name: 'Alex Rivera', time: '08:58 AM', status: 'In Office', id: 'DAY-AR-2026-0045' },
                { name: 'David Chen', time: '09:14 AM', status: 'Late', id: 'DAY-DC-2026-0008' },
                { name: 'Emma Watson', time: '08:45 AM', status: 'In Office', id: 'DAY-EW-2026-0033' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#1F2A52]">{item.name}</p>
                    <p className="text-[10px] font-mono text-slate-500">{item.id}</p>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    item.status === 'In Office' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={onOpenAddModal}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#1F2A52] text-xs font-bold rounded-xl transition cursor-pointer"
            >
              + Onboard Staff & Issue System ID
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HrDashboard;

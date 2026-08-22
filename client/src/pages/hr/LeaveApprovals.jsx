import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

export const LeaveApprovals = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'Elena Rostova', empId: 'DAY-ER-2026-0012', type: 'Annual Leave', dates: 'Aug 24 - Aug 26', days: 3, status: 'Pending', reason: 'Family vacation' },
    { id: 2, name: 'Michael Chang', empId: 'DAY-MC-2026-0044', type: 'Sick Leave', dates: 'Aug 22 - Aug 23', days: 2, status: 'Pending', reason: 'Medical appointment' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link to="/hr/dashboard" className="text-xs font-semibold text-slate-600 hover:text-[#1F2A52] flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to HR Dashboard</span>
        </Link>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">Leave Request Approvals</h1>
              <p className="text-xs text-slate-500">Approve or reject time-off requests submitted by employees</p>
            </div>
            <Calendar className="w-6 h-6 text-[#FF5D7A]" />
          </div>

          <div className="space-y-3">
            {requests.map(req => (
              <div key={req.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#1F2A52]">{req.name} <span className="text-xs font-mono text-slate-500">({req.empId})</span></p>
                  <p className="text-xs text-slate-600">{req.type} • {req.dates} ({req.days} Days)</p>
                  <p className="text-xs text-slate-400 italic">"{req.reason}"</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setRequests(r => r.map(x => x.id === req.id ? {...x, status: 'Approved'} : x))} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-xl">Approve</button>
                  <button onClick={() => setRequests(r => r.map(x => x.id === req.id ? {...x, status: 'Rejected'} : x))} className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveApprovals;

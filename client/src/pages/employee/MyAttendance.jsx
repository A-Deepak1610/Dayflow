import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';

export const MyAttendance = () => {
  const logs = [
    { date: 'Aug 22, 2026', clockIn: '08:58 AM', clockOut: '06:02 PM', status: 'On Time', total: '9h 04m' },
    { date: 'Aug 21, 2026', clockIn: '09:01 AM', clockOut: '06:00 PM', status: 'On Time', total: '8h 59m' },
    { date: 'Aug 20, 2026', clockIn: '09:12 AM', clockOut: '06:15 PM', status: 'Late', total: '9h 03m' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/employee/dashboard" className="text-xs font-semibold text-slate-600 hover:text-[#1F2A52] flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Employee Dashboard</span>
        </Link>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">My Attendance Log</h1>
              <p className="text-xs text-slate-500">Your personal clock-in and shift duration records</p>
            </div>
            <Clock className="w-6 h-6 text-blue-600" />
          </div>

          <div className="space-y-3">
            {logs.map((log, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1F2A52]">{log.date}</p>
                  <p className="text-xs text-slate-500">Clock In: {log.clockIn} • Clock Out: {log.clockOut}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${log.status === 'On Time' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {log.status}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{log.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttendance;

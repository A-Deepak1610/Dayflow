import React, { useState } from 'react';
import { Clock, Calendar, Search, Filter, CheckCircle2, XCircle, AlertCircle, CalendarDays } from 'lucide-react';

export const AttendanceMonitorPage = () => {
  const [viewMode, setViewMode] = useState('daily'); // 'daily' | 'weekly'
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedDate, setSelectedDate] = useState('2026-08-22');

  const attendanceData = [
    { id: 'DAY-HR-2026-0001', name: 'Admin Officer', dept: 'Executive', checkIn: '08:55 AM', checkOut: '06:00 PM', total: '9h 05m', status: 'Present' },
    { id: 'DAY-SJ-2026-0012', name: 'Sarah Jenkins', dept: 'Engineering', checkIn: '09:02 AM', checkOut: '06:15 PM', status: 'Present' },
    { id: 'DAY-AR-2026-0045', name: 'Alex Rivera', dept: 'Product Design', checkIn: '08:58 AM', checkOut: '06:00 PM', total: '9h 02m', status: 'Present' },
    { id: 'DAY-DC-2026-0008', name: 'David Chen', dept: 'Human Resources', checkIn: '09:45 AM', checkOut: '06:00 PM', total: '8h 15m', status: 'Half-day' },
    { id: 'DAY-EW-2026-0033', name: 'Emma Watson', dept: 'Operations', checkIn: '--', checkOut: '--', total: '0h 00m', status: 'Absent' },
    { id: 'DAY-ER-2026-0012', name: 'Elena Rostova', dept: 'Engineering', checkIn: '--', checkOut: '--', total: '0h 00m', status: 'Leave' },
  ];

  const weeklyData = [
    { name: 'Sarah Jenkins', dept: 'Engineering', mon: 'P', tue: 'P', wed: 'P', thu: 'P', fri: 'P', sat: 'OFF', sun: 'OFF', totalHours: '44.5 hrs' },
    { name: 'Alex Rivera', dept: 'Product Design', mon: 'P', tue: 'P', wed: 'P', thu: 'P', fri: 'P', sat: 'OFF', sun: 'OFF', totalHours: '42.0 hrs' },
    { name: 'David Chen', mon: 'P', tue: 'HD', wed: 'P', thu: 'P', fri: 'P', sat: 'OFF', sun: 'OFF', totalHours: '38.0 hrs' },
    { name: 'Elena Rostova', mon: 'L', tue: 'L', wed: 'L', thu: 'P', fri: 'P', sat: 'OFF', sun: 'OFF', totalHours: '16.0 hrs' },
  ];

  const filteredDaily = attendanceData.filter(item => {
    if (statusFilter === 'ALL') return true;
    return item.status.toUpperCase() === statusFilter.toUpperCase();
  });

  return (
    <div className="space-y-6">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">Company Attendance Records</h1>
          <p className="text-xs text-slate-500">SRS 3.4: Track daily check-in/out & weekly shift matrices for all staff</p>
        </div>

        {/* Daily vs Weekly View Mode Switcher */}
        <div className="flex items-center p-1 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <button
            onClick={() => setViewMode('daily')}
            className={`px-4 py-2 text-xs font-sora font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'daily' ? 'bg-[#1F2A52] text-white shadow-sm' : 'text-slate-600 hover:text-[#1F2A52]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Daily View</span>
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={`px-4 py-2 text-xs font-sora font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'weekly' ? 'bg-[#1F2A52] text-white shadow-sm' : 'text-slate-600 hover:text-[#1F2A52]'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Weekly Matrix</span>
          </button>
        </div>
      </div>

      {/* Daily View Mode */}
      {viewMode === 'daily' ? (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs w-full sm:w-auto">
              <span className="font-semibold text-slate-700">Select Date:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#1F2A52]"
              />
            </div>

            <div className="flex items-center gap-2 text-xs overflow-x-auto w-full sm:w-auto">
              {['ALL', 'PRESENT', 'ABSENT', 'HALF-DAY', 'LEAVE'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer shrink-0 ${
                    statusFilter === status
                      ? 'bg-[#FF5D7A] text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#1F2A52]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Table */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-sora bg-slate-50/50">
                    <th className="py-3.5 px-4">EMPLOYEE</th>
                    <th className="py-3.5 px-4">DEPARTMENT</th>
                    <th className="py-3.5 px-4">CLOCK IN</th>
                    <th className="py-3.5 px-4">CLOCK OUT</th>
                    <th className="py-3.5 px-4">TOTAL HOURS</th>
                    <th className="py-3.5 px-4">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDaily.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4">
                        <div>
                          <p className="font-bold text-[#1F2A52]">{row.name}</p>
                          <p className="text-[10px] font-mono text-slate-400">{row.id}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{row.dept}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">{row.checkIn}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">{row.checkOut}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">{row.total || '9h 00m'}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          row.status === 'Present' ? 'bg-emerald-100 text-emerald-700' :
                          row.status === 'Half-day' ? 'bg-amber-100 text-amber-700' :
                          row.status === 'Leave' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Weekly Matrix Mode */
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-sora text-lg font-bold text-[#1F2A52]">Weekly Staff Matrix</h3>
              <p className="text-xs text-slate-500">Aug 18 - Aug 24, 2026 • Legend: P = Present, HD = Half Day, L = Leave, A = Absent</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-sora bg-slate-50">
                  <th className="py-3 px-3 text-left">EMPLOYEE</th>
                  <th className="py-3 px-2">MON</th>
                  <th className="py-3 px-2">TUE</th>
                  <th className="py-3 px-2">WED</th>
                  <th className="py-3 px-2">THU</th>
                  <th className="py-3 px-2">FRI</th>
                  <th className="py-3 px-2">SAT</th>
                  <th className="py-3 px-2">SUN</th>
                  <th className="py-3 px-3 text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {weeklyData.map((emp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3.5 px-3 text-left font-bold text-[#1F2A52]">{emp.name}</td>
                    <td className="py-3.5 px-2"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">{emp.mon}</span></td>
                    <td className="py-3.5 px-2"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">{emp.tue}</span></td>
                    <td className="py-3.5 px-2"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">{emp.wed}</span></td>
                    <td className="py-3.5 px-2"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">{emp.thu}</span></td>
                    <td className="py-3.5 px-2"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">{emp.fri}</span></td>
                    <td className="py-3.5 px-2 text-slate-400 font-mono">{emp.sat}</td>
                    <td className="py-3.5 px-2 text-slate-400 font-mono">{emp.sun}</td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-[#1F2A52]">{emp.totalHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceMonitorPage;

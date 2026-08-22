import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import {
  Clock,
  ArrowLeft,
  Calendar,
  Download,
  CheckCircle2,
  AlertCircle,
  Timer,
  CalendarDays
} from 'lucide-react';

export const MyAttendance = () => {
  const { user } = useAuth();
  const {
    employees,
    attendance,
    exportToCsv
  } = useData();

  const empProfile = employees.find(e => e.id === user?.loginId || e.email === user?.email) || employees[1];

  // Construct historical logs for this employee across available dates
  const dates = Object.keys(attendance).sort().reverse();
  const logs = dates.map(dateStr => {
    const dayRecords = attendance[dateStr] || [];
    const myRec = dayRecords.find(r => r.id === empProfile.id) || {
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      totalHours: '9h 00m',
      status: 'Present',
      isLate: false,
      notes: ''
    };

    return {
      date: dateStr,
      checkIn: myRec.checkIn,
      checkOut: myRec.checkOut,
      totalHours: myRec.totalHours,
      status: myRec.status,
      isLate: myRec.isLate,
      notes: myRec.notes || ''
    };
  });

  const presentDays = logs.filter(l => l.status === 'Present').length;
  const onTimePercentage = logs.length > 0 ? Math.round((presentDays / logs.length) * 100) : 100;

  const handleExportMyAttendance = () => {
    const headers = ['Date', 'Clock In', 'Clock Out', 'Total Duration', 'Status', 'Notes'];
    const rows = logs.map(l => [
      l.date,
      l.checkIn,
      l.checkOut,
      l.totalHours,
      l.status,
      l.notes
    ]);
    exportToCsv(`Dayflow_My_Attendance_${empProfile.id}.csv`, headers, rows);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link to="/employee/dashboard" className="text-xs font-semibold text-slate-600 hover:text-[#1F2A52] flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Employee Dashboard</span>
          </Link>
          <span className="text-xs font-mono font-bold text-[#FF5D7A]">{empProfile.id}</span>
        </div>

        {/* Header & KPI Summary */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">My Attendance Records</h1>
              <p className="text-xs text-slate-500">Biometric clock-in timestamps, shift durations and punctuality audit</p>
            </div>
            <button
              onClick={handleExportMyAttendance}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#1F2A52] rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#FF5D7A]" />
              <span>Export Log</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-500">Assigned Shift</p>
              <p className="font-sora text-lg font-bold text-[#1F2A52] mt-1">09:00 AM - 06:00 PM</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Grace period: 15 mins</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-500">Punctuality Score</p>
              <p className="font-sora text-lg font-bold text-emerald-600 mt-1">{onTimePercentage}% On-Time</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Optimal attendance record</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-500">Average Daily Shift</p>
              <p className="font-sora text-lg font-bold text-[#1F2A52] mt-1">9.1 Hours</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Includes standard break</p>
            </div>
          </div>
        </div>

        {/* Attendance History Feed */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="font-sora text-base font-bold text-[#1F2A52]">Recent Attendance History</h2>

          <div className="space-y-3">
            {logs.map((log, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-sora font-bold text-sm text-[#1F2A52]">{log.date}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                      log.status === 'Present' ? 'bg-emerald-100 text-emerald-700' :
                      log.status === 'Late' ? 'bg-amber-100 text-amber-700' :
                      log.status === 'Leave' ? 'bg-purple-100 text-purple-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    Clock In: <strong className="text-slate-800">{log.checkIn}</strong> • Clock Out: <strong className="text-slate-800">{log.checkOut}</strong>
                  </p>
                  {log.notes && (
                    <p className="text-[11px] text-slate-500 italic">Remark: {log.notes}</p>
                  )}
                </div>

                <div className="text-right">
                  <span className="font-mono font-extrabold text-[#1F2A52] text-sm">{log.totalHours}</span>
                  <p className="text-[10px] text-slate-400">Total duration</p>
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

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CalendarDays,
  Download,
  Plus,
  History,
  Timer,
  Building,
  FileCheck2,
  Send,
  X
} from 'lucide-react';

export const MyAttendance = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedDate, setSelectedDate] = useState('2026-08-22');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Regularization Modal
  const [showRegModal, setShowRegModal] = useState(false);
  const [regDate, setRegDate] = useState('2026-08-20');
  const [regCheckIn, setRegCheckIn] = useState('09:00 AM');
  const [regCheckOut, setRegCheckOut] = useState('06:00 PM');
  const [regReason, setRegReason] = useState('');
  const [regSubmitted, setRegSubmitted] = useState(false);

  // My Attendance Log State
  const [logs, setLogs] = useState([
    { id: 'ATT-201', date: 'Aug 22, 2026', day: 'Sat', checkIn: '08:58 AM', checkOut: '06:02 PM', shift: 'General (09:00 - 18:00)', total: '9h 04m', overtime: '0h 04m', status: 'Present', notes: 'Biometric punch verified' },
    { id: 'ATT-202', date: 'Aug 21, 2026', day: 'Fri', checkIn: '09:01 AM', checkOut: '06:00 PM', shift: 'General (09:00 - 18:00)', total: '8h 59m', overtime: '0h 00m', status: 'Present', notes: 'On time' },
    { id: 'ATT-203', date: 'Aug 20, 2026', day: 'Thu', checkIn: '09:18 AM', checkOut: '06:15 PM', shift: 'General (09:00 - 18:00)', total: '8h 57m', overtime: '0h 00m', status: 'Late', notes: 'Heavy traffic delay reported' },
    { id: 'ATT-204', date: 'Aug 19, 2026', day: 'Wed', checkIn: '08:50 AM', checkOut: '06:05 PM', shift: 'General (09:00 - 18:00)', total: '9h 15m', overtime: '0h 15m', status: 'Present', notes: 'On time' },
    { id: 'ATT-205', date: 'Aug 18, 2026', day: 'Tue', checkIn: '08:55 AM', checkOut: '06:00 PM', shift: 'General (09:00 - 18:00)', total: '9h 05m', overtime: '0h 05m', status: 'Present', notes: 'On time' },
    { id: 'ATT-206', date: 'Aug 17, 2026', day: 'Mon', checkIn: '08:52 AM', checkOut: '06:00 PM', shift: 'General (09:00 - 18:00)', total: '9h 08m', overtime: '0h 08m', status: 'Present', notes: 'On time' }
  ]);

  // Regularizations State
  const [regularizations, setRegularizations] = useState([
    { id: 'REG-501', date: '2026-08-20', requestedCheckIn: '09:00 AM', requestedCheckOut: '06:15 PM', reason: 'Biometric reader at gate malfunctioning', status: 'Pending', submittedOn: 'Aug 20, 2026' }
  ]);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.date.toLowerCase().includes(searchTerm.toLowerCase()) || log.notes.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || log.status.toUpperCase() === statusFilter.toUpperCase();
      return matchesSearch && matchesStatus;
    });
  }, [logs, searchTerm, statusFilter]);

  const handleExportCSV = () => {
    const headers = ['Date,Shift,Clock In,Clock Out,Total Hours,Overtime,Status,Notes'];
    const rows = logs.map(l => `"${l.date}","${l.shift}","${l.checkIn}","${l.checkOut}","${l.total}","${l.overtime}","${l.status}","${l.notes}"`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `My_Attendance_Report_August_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    const newReg = {
      id: `REG-${Date.now().toString().slice(-4)}`,
      date: regDate,
      requestedCheckIn: regCheckIn,
      requestedCheckOut: regCheckOut,
      reason: regReason,
      status: 'Pending',
      submittedOn: new Date().toLocaleDateString()
    };
    setRegularizations([newReg, ...regularizations]);
    setRegSubmitted(true);
    setTimeout(() => {
      setRegSubmitted(false);
      setShowRegModal(false);
      setRegReason('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">My Attendance & Shift Logs</h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            View daily punch records, weekly shift matrices, and punch regularization history
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowRegModal(true)}
            className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-[13px] font-semibold rounded-lg shadow-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Request Punch Regularization</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-[#333333] border border-slate-200 text-[13px] font-semibold rounded-lg shadow-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Banner (Horilla HR Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="horilla-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888]">Days Present</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-[#333333] mt-2">19 Days</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-0.5">100% On-time compliance</p>
        </div>

        <div className="horilla-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888]">Shift Hours</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-[#333333] mt-2">154.5 hrs</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Avg 7h 42m per day</p>
        </div>

        <div className="horilla-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888]">Late Arrivals</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-700 mt-2">1 Time</p>
          <p className="text-[11px] text-amber-600 font-bold mt-0.5">Aug 20 (18 mins late)</p>
        </div>

        <div className="horilla-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-purple-700">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888]">Overtime Logged</span>
            <Timer className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-purple-700 mt-2">+4.2 hrs</p>
          <p className="text-[11px] text-purple-600 font-bold mt-0.5">Eligible for OT pay</p>
        </div>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'daily', label: 'Daily Punch Records', icon: Clock, count: filteredLogs.length },
          { id: 'regularizations', label: 'Punch Regularizations', icon: FileCheck2, count: regularizations.length }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 text-[13px] font-semibold flex items-center gap-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-horilla-primary text-horilla-primary'
                  : 'border-transparent text-[#666666] hover:text-[#333333]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DAILY PUNCH RECORDS */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by date or notes..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-[#333333] outline-none focus:border-horilla-primary"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Calendar className="w-4 h-4 text-slate-400 hidden sm:block" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-medium text-[#333333] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {['ALL', 'PRESENT', 'LATE', 'HALF-DAY', 'ON LEAVE'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer ${
                    statusFilter === status
                      ? 'bg-[#1F2A52] text-white shadow-2xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#1F2A52]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[#888888] font-bold bg-slate-50 uppercase text-[10px]">
                    <th className="py-3 px-4">DATE</th>
                    <th className="py-3 px-4">SHIFT TIMING</th>
                    <th className="py-3 px-4">CLOCK IN</th>
                    <th className="py-3 px-4">CLOCK OUT</th>
                    <th className="py-3 px-4">TOTAL HOURS</th>
                    <th className="py-3 px-4">OVERTIME</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">NOTES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-bold text-[#333333]">
                        {log.date} <span className="text-[11px] text-[#888888] font-normal">({log.day})</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-[12px]">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono text-slate-700">
                          {log.shift}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                        <span className={log.status === 'Late' ? 'text-amber-600 font-bold' : ''}>
                          {log.checkIn}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">{log.checkOut}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#333333]">{log.total}</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-600 font-semibold text-[12px]">+{log.overtime}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border inline-block ${
                          log.status === 'Present'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-500 italic text-[12px]">{log.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REGULARIZATIONS */}
      {activeTab === 'regularizations' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">My Punch Regularization Requests</h3>
              <p className="text-[12px] text-[#888888]">Correct missed or late biometric punch records</p>
            </div>
            <button
              onClick={() => setShowRegModal(true)}
              className="px-3.5 py-1.5 bg-horilla-primary text-white text-[12px] font-bold rounded-lg cursor-pointer"
            >
              + New Regularization
            </button>
          </div>

          <div className="space-y-3">
            {regularizations.map(reg => (
              <div key={reg.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[#333333] text-[14px]">Date: {reg.date}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                      Req: {reg.requestedCheckIn} – {reg.requestedCheckOut}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-600">Reason: <span className="italic text-slate-500">"{reg.reason}"</span></p>
                </div>

                <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-bold text-[11px]">
                  {reg.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regularization Modal */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-modal-pop">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-sora text-base font-bold text-[#1F2A52]">Request Punch Regularization</h3>
              <button onClick={() => setShowRegModal(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {regSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold text-center">
                ✓ Regularization request submitted to HR Manager!
              </div>
            ) : (
              <form onSubmit={handleRegSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#333333] mb-1">Select Date</label>
                  <input
                    type="date"
                    required
                    value={regDate}
                    onChange={e => setRegDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-horilla-primary outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#333333] mb-1">Correct Clock In</label>
                    <input
                      type="text"
                      required
                      value={regCheckIn}
                      onChange={e => setRegCheckIn(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-horilla-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#333333] mb-1">Correct Clock Out</label>
                    <input
                      type="text"
                      required
                      value={regCheckOut}
                      onChange={e => setRegCheckOut(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-horilla-primary outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#333333] mb-1">Reason for Regularization</label>
                  <textarea
                    required
                    placeholder="Provide details (e.g., biometric scanner error)..."
                    value={regReason}
                    onChange={e => setRegReason(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 h-20 focus:border-horilla-primary outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRegModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-horilla-primary text-white font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAttendance;

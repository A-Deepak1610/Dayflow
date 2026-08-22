import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft, Loader2 } from 'lucide-react';
import { getMyAttendanceApi } from '../../services/api';

export const MyAttendance = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getMyAttendanceApi();
        if (response.ok) {
          setLogs(response.data.logs);
        }
      } catch (error) {
        console.error('Failed to fetch attendance logs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '--:--';
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const calculateTotal = (clockIn, clockOut) => {
    if (!clockIn || !clockOut) return '--h --m';
    const diff = new Date(clockOut) - new Date(clockIn);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="text-slate-900 font-inter p-6">
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
            {loading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : logs.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">No attendance records found.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#1F2A52]">{formatDate(log.date)}</p>
                    <p className="text-xs text-slate-500">Clock In: {formatTime(log.clockIn)} • Clock Out: {formatTime(log.clockOut)}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${log.status === 'On Time' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {log.status}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">{calculateTotal(log.clockIn, log.clockOut)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttendance;

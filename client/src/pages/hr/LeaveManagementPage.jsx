import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, XCircle, MessageSquare, Filter } from 'lucide-react';

export const LeaveManagementPage = () => {
  const [filter, setFilter] = useState('ALL');
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentText, setCommentText] = useState('');

  const [requests, setRequests] = useState([
    { id: 1, name: 'Elena Rostova', empId: 'DAY-ER-2026-0012', type: 'Annual Leave', dates: 'Aug 24 - Aug 26', days: 3, status: 'Pending', reason: 'Family vacation', comment: '' },
    { id: 2, name: 'Michael Chang', empId: 'DAY-MC-2026-0044', type: 'Sick Leave', dates: 'Aug 22 - Aug 23', days: 2, status: 'Pending', reason: 'Medical appointment', comment: '' },
    { id: 3, name: 'Sarah Connor', empId: 'DAY-SC-2026-0089', type: 'Casual Leave', dates: 'Aug 29', days: 1, status: 'Approved', reason: 'Personal work', comment: 'Approved. Enjoy your time off!' },
    { id: 4, name: 'Alex Rivera', empId: 'DAY-AR-2026-0045', type: 'Unpaid Leave', dates: 'Sep 02 - Sep 05', days: 4, status: 'Rejected', reason: 'Extended travel', comment: 'Overlaps with project launch milestone.' },
  ]);

  const handleAction = (id, newStatus) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: newStatus,
          comment: commentText || (newStatus === 'Approved' ? 'Approved by HR Manager' : 'Rejected by HR Manager')
        };
      }
      return req;
    }));
    setActiveCommentId(null);
    setCommentText('');
  };

  const filteredRequests = requests.filter(r => {
    if (filter === 'ALL') return true;
    return r.status.toUpperCase() === filter;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">Leave Approvals & Time-Off Manager</h1>
        <p className="text-xs text-slate-500">SRS 3.5: Review, approve, or reject employee leave requests with HR notes</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-sora font-semibold transition cursor-pointer ${
                filter === f
                  ? 'bg-[#FF5D7A] text-white shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#1F2A52]'
              }`}
            >
              {f} ({requests.filter(r => f === 'ALL' ? true : r.status.toUpperCase() === f).length})
            </button>
          ))}
        </div>
      </div>

      {/* Queue List */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="space-y-4">
          {filteredRequests.map(req => (
            <div key={req.id} className="p-5 bg-slate-50/70 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-sora font-bold text-[#1F2A52] text-sm">{req.name}</span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{req.empId}</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">{req.type}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{req.dates} ({req.days} Days)</p>
                <p className="text-xs text-slate-500 italic">"Reason: {req.reason}"</p>
                {req.comment && (
                  <p className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 font-medium w-fit mt-1">
                    HR Note: {req.comment}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                {req.status === 'Pending' ? (
                  <>
                    {activeCommentId === req.id ? (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          type="text"
                          placeholder="Add HR comment..."
                          value={commentText}
                          onChange={e => setCommentText(e.target.value)}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-[#1F2A52] outline-none"
                        />
                        <button
                          onClick={() => handleAction(req.id, 'Approved')}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(req.id, 'Rejected')}
                          className="px-3 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveCommentId(req.id)}
                          className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-[#1F2A52] rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          <span>Add Note & Review</span>
                        </button>
                        <button
                          onClick={() => handleAction(req.id, 'Approved')}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${
                    req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-rose-100 text-rose-700 border border-rose-200'
                  }`}>
                    {req.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagementPage;

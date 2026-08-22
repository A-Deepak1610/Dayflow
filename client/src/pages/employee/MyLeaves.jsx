import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Download,
  DollarSign,
  FileText,
  Send,
  X,
  Filter,
  Search,
  Building
} from 'lucide-react';

export const MyLeaves = () => {
  const [showModal, setShowModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Annual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [leaves, setLeaves] = useState([
    { id: 1, type: 'Annual Leave', dates: 'Aug 28 – Aug 30, 2026', days: 3, status: 'Pending', reason: 'Personal family travel' },
    { id: 2, type: 'Casual Leave', dates: 'Jul 14, 2026', days: 1, status: 'Approved', reason: 'Doctor checkup' },
    { id: 3, type: 'Sick Leave', dates: 'Jun 02, 2026', days: 1, status: 'Approved', reason: 'Fever recovery' },
    { id: 4, type: 'Annual Leave', dates: 'Mar 10 – Mar 12, 2026', days: 3, status: 'Approved', reason: 'Spring vacation' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = {
      id: Date.now(),
      type: leaveType,
      dates: `${startDate} to ${endDate}`,
      days: 2,
      status: 'Pending',
      reason
    };
    setLeaves([newReq, ...leaves]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
      setReason('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">My Leave Applications & Balances</h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Submit leave requests, check entitlement balances, and track HR approvals
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-[13px] font-semibold rounded-lg shadow-xs flex items-center gap-2 transition cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Time-Off</span>
        </button>
      </div>

      {/* KPI Balances Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="horilla-card p-5 border-t-4 border-blue-500 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#888888]">Annual Paid Leave</span>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="mt-3">
            <h3 className="text-[28px] font-extrabold text-[#333333]">12 Days</h3>
            <p className="text-[12px] text-slate-400 mt-1">12 remaining out of 18 days annual quota</p>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '66%' }} />
          </div>
        </div>

        <div className="horilla-card p-5 border-t-4 border-emerald-500 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#888888]">Casual & Sick Leave</span>
            <Calendar className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="mt-3">
            <h3 className="text-[28px] font-extrabold text-[#333333]">6 Days</h3>
            <p className="text-[12px] text-slate-400 mt-1">6 available for urgent leave</p>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }} />
          </div>
        </div>

        <div className="horilla-card p-5 border-t-4 border-purple-500 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#888888]">Pending Applications</span>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div className="mt-3">
            <h3 className="text-[28px] font-extrabold text-[#333333]">1 Request</h3>
            <p className="text-[12px] text-purple-600 font-bold mt-1">Awaiting HR Approval</p>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '33%' }} />
          </div>
        </div>
      </div>

      {/* Leave Application History Table */}
      <div className="horilla-card p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-[16px] font-bold text-[#333333]">Leave Application History</h3>
            <p className="text-[12px] text-[#888888]">All historical time-off applications submitted in 2026</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[#888888] font-bold bg-slate-50 uppercase text-[10px]">
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4">DATES</th>
                <th className="py-3 px-4">DAYS</th>
                <th className="py-3 px-4">REASON</th>
                <th className="py-3 px-4 text-right">HR STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaves.map(req => (
                <tr key={req.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-[#333333]">{req.type}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{req.dates}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">{req.days} d</td>
                  <td className="py-3.5 px-4 text-slate-500 italic text-[12px]">{req.reason}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border inline-block ${
                      req.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : req.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-modal-pop">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-sora text-base font-bold text-[#1F2A52]">Apply for Leave</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold text-center">
                ✓ Leave application submitted to HR Manager!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#333333] mb-1">Leave Category</label>
                  <select
                    value={leaveType}
                    onChange={e => setLeaveType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-horilla-primary outline-none"
                  >
                    <option>Annual Leave</option>
                    <option>Casual Leave</option>
                    <option>Sick Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#333333] mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-horilla-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#333333] mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-horilla-primary outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#333333] mb-1">Reason for Leave</label>
                  <textarea
                    required
                    placeholder="Provide details..."
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 h-20 focus:border-horilla-primary outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-horilla-primary text-white font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    Submit Application
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

export const MyPayslips = () => {
  const payslips = [
    { month: 'August 2026', gross: '$5,200.00', deductions: '-$620.00', net: '$4,580.00', status: 'Paid', date: 'Aug 25, 2026' },
    { month: 'July 2026', gross: '$5,200.00', deductions: '-$620.00', net: '$4,580.00', status: 'Paid', date: 'Jul 25, 2026' },
    { month: 'June 2026', gross: '$5,000.00', deductions: '-$600.00', net: '$4,400.00', status: 'Paid', date: 'Jun 25, 2026' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">My Payslips & Compensation</h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            View monthly salary statements, gross earnings, tax deductions, and download PDF receipts
          </p>
        </div>

        <button
          onClick={() => alert('Downloading latest YTD salary summary...')}
          className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-[13px] font-semibold rounded-lg shadow-xs flex items-center gap-2 transition cursor-pointer self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download YTD Statement</span>
        </button>
      </div>

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="horilla-card p-5 border-t-4 border-emerald-500">
          <span className="text-[11px] font-bold uppercase text-[#888888]">Current Net Salary</span>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-2">$4,580.00</h3>
          <p className="text-[12px] text-emerald-600 font-bold mt-1">Disbursed on August 25, 2026</p>
        </div>

        <div className="horilla-card p-5 border-t-4 border-blue-500">
          <span className="text-[11px] font-bold uppercase text-[#888888]">YTD Gross Earnings</span>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-2">$41,600.00</h3>
          <p className="text-[12px] text-slate-400 mt-1">8 months total base pay</p>
        </div>

        <div className="horilla-card p-5 border-t-4 border-purple-500">
          <span className="text-[11px] font-bold uppercase text-[#888888]">Tax & Insurance Withheld</span>
          <h3 className="text-[28px] font-extrabold text-[#333333] mt-2">$4,960.00</h3>
          <p className="text-[12px] text-slate-400 mt-1">Total statutory deductions</p>
        </div>
      </div>

      {/* Payslips Table */}
      <div className="horilla-card p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-[16px] font-bold text-[#333333]">Salary Statements</h3>
          <span className="text-[12px] text-[#888888]">2026 Fiscal Year</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[#888888] font-bold bg-slate-50 uppercase text-[10px]">
                <th className="py-3 px-4">PAY PERIOD</th>
                <th className="py-3 px-4">PAYMENT DATE</th>
                <th className="py-3 px-4">GROSS PAY</th>
                <th className="py-3 px-4">DEDUCTIONS</th>
                <th className="py-3 px-4">NET AMOUNT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">DOWNLOAD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payslips.map((slip, i) => (
                <tr key={i} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-[#333333]">{slip.month}</td>
                  <td className="py-3.5 px-4 text-slate-600">{slip.date}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">{slip.gross}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-rose-600">{slip.deductions}</td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-emerald-700">{slip.net}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block">
                      {slip.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Downloading PDF payslip for ${slip.month}...`)}
                      className="p-1.5 text-slate-500 hover:text-horilla-primary hover:bg-rose-50 rounded-lg transition cursor-pointer"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowLeft,
  Download,
  DollarSign,
  Plus,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  FileText
} from 'lucide-react';

export const MyLeaves = () => {
  const { user } = useAuth();
  const { employees, leaves, applyLeave } = useData();

  const empProfile = employees.find(e => e.id === user?.loginId || e.email === user?.email) || employees[1];
  const myLeaves = leaves.filter(l => l.empId === empProfile.id);

  // Apply Leave Modal
  const [showModal, setShowModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Annual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    applyLeave({
      empId: empProfile.id,
      name: empProfile.name,
      dept: empProfile.dept,
      type: leaveType,
      startDate,
      endDate,
      dates: `${startDate} to ${endDate}`,
      days: 2,
      reason
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
      setReason('');
      setStartDate('');
      setEndDate('');
    }, 1200);
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

        {/* Quota Header & Apply Action */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">My Time-Off & Leave History</h1>
              <p className="text-xs text-slate-500">Track leave applications, approvals status, and annual quota balances</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Apply for Leave</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200">
              <p className="text-xs text-blue-900 font-semibold">Annual Paid Leave</p>
              <p className="font-sora text-2xl font-extrabold text-blue-700 mt-1">{empProfile.leaveBalances?.annual ?? 12} Days</p>
              <p className="text-[11px] text-blue-600/80 mt-0.5">Remaining in 2026</p>
            </div>

            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200">
              <p className="text-xs text-amber-900 font-semibold">Casual Leave</p>
              <p className="font-sora text-2xl font-extrabold text-amber-700 mt-1">{empProfile.leaveBalances?.casual ?? 5} Days</p>
              <p className="text-[11px] text-amber-600/80 mt-0.5">Available for instant use</p>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
              <p className="text-xs text-emerald-900 font-semibold">Sick Leave</p>
              <p className="font-sora text-2xl font-extrabold text-emerald-700 mt-1">{empProfile.leaveBalances?.sick ?? 6} Days</p>
              <p className="text-[11px] text-emerald-600/80 mt-0.5">Medical time-off quota</p>
            </div>
          </div>
        </div>

        {/* Leave Requests Log */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="font-sora text-base font-bold text-[#1F2A52]">All Leave Submissions</h2>

          {myLeaves.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No leave applications recorded.</p>
          ) : (
            <div className="space-y-3">
              {myLeaves.map(leave => (
                <div key={leave.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sora font-bold text-sm text-[#1F2A52]">{leave.type}</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        {leave.days} Day(s)
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{leave.dates} • <span className="italic text-slate-500">"{leave.reason}"</span></p>
                    {leave.comment && (
                      <p className="text-xs text-indigo-700 font-medium bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 w-fit">
                        HR Note: {leave.comment}
                      </p>
                    )}
                  </div>

                  <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full shrink-0 ${
                    leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                    leave.status === 'Pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                    'bg-rose-100 text-rose-700 border border-rose-200'
                  }`}>
                    {leave.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative animate-modal-pop">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="font-sora text-lg font-bold text-[#1F2A52]">Submit Leave Application</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 p-1 cursor-pointer">✕</button>
            </div>

            {submitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold text-center">
                ✓ Leave application submitted to HR Manager!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Leave Type</label>
                  <select value={leaveType} onChange={e => setLeaveType(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold">
                    <option>Annual Leave</option>
                    <option>Casual Leave</option>
                    <option>Sick Leave</option>
                    <option>Unpaid Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
                    <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">End Date</label>
                    <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Reason for Leave</label>
                  <textarea required placeholder="Brief explanation..." value={reason} onChange={e => setReason(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs h-20" />
                </div>

                <button type="submit" className="w-full py-3 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-bold rounded-xl shadow-md cursor-pointer">
                  Submit to HR Manager
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const MyPayslips = () => {
  const { user } = useAuth();
  const { employees, calculateEmployeePayroll, payroll } = useData();

  const empProfile = employees.find(e => e.id === user?.loginId || e.email === user?.email) || employees[1];
  const userPayroll = calculateEmployeePayroll(empProfile);

  const [selectedCycle, setSelectedCycle] = useState('August 2026');
  const [showSlipModal, setShowSlipModal] = useState(false);

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

        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">My Payslips & Compensation</h1>
              <p className="text-xs text-slate-500">Official monthly salary slips, tax summaries, and direct deposit receipts</p>
            </div>
            <button
              onClick={() => setShowSlipModal(true)}
              className="px-4 py-2 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>View Latest Payslip</span>
            </button>
          </div>

          {/* Current Month Breakdown Card */}
          <div className="bg-gradient-to-r from-[#1F2A52] via-[#121A36] to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs text-slate-300 font-semibold">August 2026 Net Salary</p>
              <p className="font-sora text-3xl font-extrabold text-emerald-400 mt-1">${userPayroll.netPay.toLocaleString()}</p>
              <p className="text-[11px] text-slate-300 mt-1">Direct deposit to {empProfile.bankName} ({empProfile.accountNumber})</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                <p className="text-slate-300">Gross Earnings</p>
                <p className="font-bold text-white mt-0.5">${userPayroll.grossEarnings.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                <p className="text-slate-300">Total Deductions</p>
                <p className="font-bold text-rose-400 mt-0.5">-${userPayroll.totalDeductions.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payslips History */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="font-sora text-base font-bold text-[#1F2A52]">Salary Slip History</h2>

          <div className="space-y-3">
            {[
              { cycle: 'August 2026', payDate: 'Aug 31, 2026', gross: userPayroll.grossEarnings, net: userPayroll.netPay, status: 'Direct Deposit Ready' },
              { cycle: 'July 2026', payDate: 'Jul 31, 2026', gross: userPayroll.grossEarnings, net: userPayroll.netPay, status: 'Credited' },
              { cycle: 'June 2026', payDate: 'Jun 30, 2026', gross: userPayroll.grossEarnings, net: userPayroll.netPay, status: 'Credited' },
            ].map((slip, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition">
                <div>
                  <p className="font-sora font-bold text-sm text-[#1F2A52]">{slip.cycle}</p>
                  <p className="text-xs text-slate-500">Pay Date: {slip.payDate} • Status: <strong className="text-emerald-700">{slip.status}</strong></p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-mono font-bold text-[#1F2A52]">${slip.net.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400">Net credited</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCycle(slip.cycle);
                      setShowSlipModal(true);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-[#1F2A52] text-[#1F2A52] hover:text-white border border-slate-200 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Payslip Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative animate-modal-pop my-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#1F2A52] text-[#FF5D7A] flex items-center justify-center font-sora font-bold text-xs">
                  DF
                </div>
                <div>
                  <h3 className="font-sora text-base font-bold text-[#1F2A52]">Dayflow Technologies Inc.</h3>
                  <p className="text-[10px] text-slate-400">Official Monthly Salary Statement</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#1F2A52] rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button onClick={() => setShowSlipModal(false)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">✕</button>
              </div>
            </div>

            {/* Payslip Details */}
            <div className="space-y-6 text-xs text-slate-800">
              <div className="text-center py-2 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="font-sora font-bold text-sm text-[#1F2A52]">PAYSLIP FOR {selectedCycle.toUpperCase()}</p>
                <p className="text-[11px] text-slate-500">Working Days: 22 • Payment Mode: Direct Deposit (ACH)</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/70 rounded-2xl border border-slate-200 text-xs">
                <div className="space-y-1">
                  <p><span className="text-slate-400 font-medium">Employee Name:</span> <strong className="text-[#1F2A52]">{empProfile.name}</strong></p>
                  <p><span className="text-slate-400 font-medium">Login ID:</span> <strong className="font-mono text-[#FF5D7A]">{empProfile.id}</strong></p>
                  <p><span className="text-slate-400 font-medium">Department:</span> <strong>{empProfile.dept}</strong></p>
                </div>
                <div className="space-y-1">
                  <p><span className="text-slate-400 font-medium">Bank Name:</span> <strong>{empProfile.bankName}</strong></p>
                  <p><span className="text-slate-400 font-medium">Account:</span> <strong className="font-mono">{empProfile.accountNumber}</strong></p>
                  <p><span className="text-slate-400 font-medium">PAN:</span> <strong className="font-mono">{empProfile.panNumber}</strong></p>
                </div>
              </div>

              {/* Earnings & Deductions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="bg-emerald-50 px-3 py-2 border-b border-emerald-100 text-emerald-900 font-bold text-xs">
                    EARNINGS
                  </div>
                  <div className="p-3 space-y-2 text-xs divide-y divide-slate-100">
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">Base Salary</span>
                      <span className="font-mono font-bold">${userPayroll.basePay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">HRA</span>
                      <span className="font-mono font-bold">${userPayroll.hra.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">Allowances</span>
                      <span className="font-mono font-bold">${(userPayroll.allowances + userPayroll.bonus).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-[#1F2A52]">
                      <span>Gross Earnings</span>
                      <span className="font-mono">${userPayroll.grossEarnings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="bg-rose-50 px-3 py-2 border-b border-rose-100 text-rose-900 font-bold text-xs">
                    STATUTORY DEDUCTIONS
                  </div>
                  <div className="p-3 space-y-2 text-xs divide-y divide-slate-100">
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">Provident Fund (8%)</span>
                      <span className="font-mono font-bold text-rose-600">${userPayroll.pf.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">Tax Deduction (10%)</span>
                      <span className="font-mono font-bold text-rose-600">${userPayroll.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-600">Health Insurance</span>
                      <span className="font-mono font-bold text-rose-600">${userPayroll.insurance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-rose-700">
                      <span>Total Deductions</span>
                      <span className="font-mono">${userPayroll.totalDeductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Pay Box */}
              <div className="p-4 bg-[#1F2A52] text-white rounded-2xl flex items-center justify-between shadow-md">
                <div>
                  <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Net Salary Credited</p>
                  <p className="font-sora text-2xl font-extrabold text-emerald-400 mt-0.5">
                    ${userPayroll.netPay.toLocaleString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/30 text-emerald-300 rounded-full text-xs font-bold border border-emerald-400/30">
                  Transferred via Direct Deposit
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

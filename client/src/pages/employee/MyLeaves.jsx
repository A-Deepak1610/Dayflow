import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Download, DollarSign } from 'lucide-react';

export const MyLeaves = () => (
  <div className="text-slate-900 font-inter p-6">
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/employee/dashboard" className="text-xs font-semibold text-slate-600 flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">My Leave History</h1>
        <p className="text-xs text-slate-500">Track all your leave submissions</p>
      </div>
    </div>
  </div>
);

export const MyPayslips = () => {
  const payslips = [
    { month: 'August 2026', net: '$5,400.00', status: 'Paid', date: 'Aug 25, 2026' },
    { month: 'July 2026', net: '$5,400.00', status: 'Paid', date: 'Jul 25, 2026' },
    { month: 'June 2026', net: '$5,250.00', status: 'Paid', date: 'Jun 25, 2026' },
  ];

  return (
    <div className="bg-transparent text-slate-900 font-inter p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/employee/dashboard" className="text-xs font-semibold text-slate-600 hover:text-[#1F2A52] flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">My Payslips</h1>
              <p className="text-xs text-slate-500">View and download your digital salary slips</p>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
          </div>

          <div className="space-y-3">
            {payslips.map((slip, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between group hover:border-[#FF5D7A] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1F2A52]">{slip.month}</p>
                    <p className="text-xs text-slate-500">Credited on {slip.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-mono font-bold text-[#1F2A52]">{slip.net}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-1 inline-block">
                      {slip.status}
                    </span>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-[#FF5D7A] hover:bg-rose-50 rounded-lg transition cursor-pointer">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

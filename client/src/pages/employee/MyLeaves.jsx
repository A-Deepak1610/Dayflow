import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Download, DollarSign } from 'lucide-react';

export const MyLeaves = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900 font-inter p-6">
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

export const MyPayslips = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900 font-inter p-6">
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/employee/dashboard" className="text-xs font-semibold text-slate-600 flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">My Payslips</h1>
        <p className="text-xs text-slate-500">Download your digital salary slips</p>
      </div>
    </div>
  </div>
);

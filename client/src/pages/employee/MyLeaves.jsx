import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Download, DollarSign } from 'lucide-react';
import { getMySalaryApi } from '../../services/api';

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
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await getMySalaryApi();
        if (response.ok) {
          setPayslips(response.data.salaries);
        }
      } catch (error) {
        console.error('Failed to fetch salaries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSalaries();
  }, []);

  const getMonthName = (monthNum) => {
    const date = new Date();
    date.setMonth(monthNum - 1);
    return date.toLocaleString('default', { month: 'long' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

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
            {loading ? (
              <div className="flex justify-center p-8">
                <span className="text-slate-500 text-sm">Loading payslips...</span>
              </div>
            ) : payslips.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">No payslips generated yet.</p>
            ) : (
              payslips.map((slip) => (
                <div key={slip.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between group hover:border-[#FF5D7A] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1F2A52]">{getMonthName(slip.month)} {slip.year}</p>
                      <p className="text-xs text-slate-500">Gross: {formatCurrency(slip.baseSalary + slip.allowances)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-mono font-bold text-[#1F2A52]">{formatCurrency(slip.netSalary)}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-1 inline-block">
                        Paid
                      </span>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-[#FF5D7A] hover:bg-rose-50 rounded-lg transition cursor-pointer">
                      <Download className="w-5 h-5" />
                    </button>
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

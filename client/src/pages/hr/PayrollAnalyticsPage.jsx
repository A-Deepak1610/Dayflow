import React, { useState } from 'react';
import { DollarSign, Download, Edit2, FileText, CheckCircle2, TrendingUp, BarChart3, Users } from 'lucide-react';

export const PayrollAnalyticsPage = () => {
  const [employees, setEmployees] = useState([
    { id: 'DAY-HR-2026-0001', name: 'Admin Officer', dept: 'Executive', basePay: 10000, hra: 2000, allowances: 1000, pf: 800, tax: 1000, netPay: 11200 },
    { id: 'DAY-SJ-2026-0012', name: 'Sarah Jenkins', dept: 'Engineering', basePay: 7916, hra: 1583, allowances: 500, pf: 633, tax: 791, netPay: 8575 },
    { id: 'DAY-AR-2026-0045', name: 'Alex Rivera', dept: 'Product Design', basePay: 7333, hra: 1466, allowances: 500, pf: 586, tax: 733, netPay: 7980 },
    { id: 'DAY-DC-2026-0008', name: 'David Chen', dept: 'Human Resources', basePay: 6500, hra: 1300, allowances: 400, pf: 520, tax: 650, netPay: 7030 },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editBase, setEditBase] = useState('');

  const totalPayroll = employees.reduce((sum, e) => sum + e.netPay, 0);

  const handleUpdateSalary = (id) => {
    const newBase = parseFloat(editBase);
    if (newBase) {
      const newHra = newBase * 0.20;
      const newPf = newBase * 0.08;
      const newTax = newBase * 0.10;
      const newNet = newBase + newHra + 500 - newPf - newTax;

      setEmployees(prev => prev.map(e => e.id === id ? {
        ...e,
        basePay: Math.round(newBase),
        hra: Math.round(newHra),
        pf: Math.round(newPf),
        tax: Math.round(newTax),
        netPay: Math.round(newNet)
      } : e));
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">Payroll Control & Reports</h1>
          <p className="text-xs text-slate-500">Manage salary structures, payroll accuracy, salary slips & analytics reports</p>
        </div>

        <button
          onClick={() => alert('Generating August 2026 Payroll Summary PDF Report...')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sora font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Payroll Report</span>
        </button>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-md flex items-center justify-between border border-emerald-900">
          <div>
            <p className="text-xs text-emerald-300">Total August Payroll</p>
            <p className="font-sora text-3xl font-extrabold text-emerald-400 mt-1">${totalPayroll.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-400/80 mt-1 font-mono">Direct deposit scheduled</p>
          </div>
          <DollarSign className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Processed Payslips</p>
            <p className="font-sora text-3xl font-extrabold text-[#1F2A52] mt-1">48 / 48</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">100% Verified</p>
          </div>
          <FileText className="w-8 h-8 text-blue-600" />
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Average Net Pay</p>
            <p className="font-sora text-3xl font-extrabold text-[#1F2A52] mt-1">${Math.round(totalPayroll / employees.length).toLocaleString()}</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Per employee / month</p>
          </div>
          <BarChart3 className="w-8 h-8 text-emerald-600" />
        </div>
      </div>

      {/* Salary Structure Control Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-sora text-lg font-bold text-[#1F2A52]">Employee Salary Structures</h3>
            <p className="text-xs text-slate-500">Update base compensation, allowances, and statutory deductions</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-sora bg-slate-50">
                <th className="py-3 px-3">EMPLOYEE</th>
                <th className="py-3 px-3">BASE PAY</th>
                <th className="py-3 px-3">HRA ALLOWANCE</th>
                <th className="py-3 px-3">ALLOWANCES</th>
                <th className="py-3 px-3">PF DEDUCTION</th>
                <th className="py-3 px-3">TAX DEDUCTION</th>
                <th className="py-3 px-3">MONTHLY NET PAY</th>
                <th className="py-3 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-[#1F2A52]">{emp.name}</p>
                    <p className="text-[10px] font-mono text-slate-400">{emp.id}</p>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-semibold text-slate-800">
                    {editingId === emp.id ? (
                      <input
                        type="number"
                        value={editBase}
                        onChange={e => setEditBase(e.target.value)}
                        className="w-20 px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                      />
                    ) : (
                      `$${emp.basePay.toLocaleString()}`
                    )}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-emerald-700">+${emp.hra.toLocaleString()}</td>
                  <td className="py-3.5 px-3 font-mono text-emerald-700">+${emp.allowances.toLocaleString()}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">-${emp.pf.toLocaleString()}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">-${emp.tax.toLocaleString()}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-[#1F2A52]">${emp.netPay.toLocaleString()}</td>
                  <td className="py-3.5 px-3 text-right">
                    {editingId === emp.id ? (
                      <button
                        onClick={() => handleUpdateSalary(emp.id)}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => { setEditingId(emp.id); setEditBase(emp.basePay); }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-600 text-[#1F2A52] hover:text-white rounded font-semibold text-[11px] border border-slate-200 transition"
                      >
                        Edit Base
                      </button>
                    )}
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

export default PayrollAnalyticsPage;

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Search, ArrowLeft, Building, ShieldCheck } from 'lucide-react';

export const EmployeeManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    { id: 'DAY-HR-2026-0001', name: 'Admin Officer', email: 'admin@dayflow.com', role: 'ADMIN', dept: 'Executive', status: 'Active' },
    { id: 'DAY-SJ-2026-0012', name: 'Sarah Jenkins', email: 'sarah.j@dayflow.com', role: 'EMPLOYEE', dept: 'Engineering', status: 'Active' },
    { id: 'DAY-AR-2026-0045', name: 'Alex Rivera', email: 'alex.r@dayflow.com', role: 'EMPLOYEE', dept: 'Design', status: 'Active' },
    { id: 'DAY-DC-2026-0008', name: 'David Chen', email: 'david.c@dayflow.com', role: 'HR', dept: 'Human Resources', status: 'Active' },
  ];

  const filtered = employees.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/hr/dashboard" className="text-xs font-semibold text-slate-600 hover:text-[#1F2A52] flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-xs font-mono text-slate-500">HR Directory Module</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">Employee Directory</h1>
              <p className="text-xs text-slate-500">Manage all registered company workforce accounts</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-sora">
                  <th className="py-3 px-2">LOGIN ID</th>
                  <th className="py-3 px-2">EMPLOYEE NAME</th>
                  <th className="py-3 px-2">EMAIL</th>
                  <th className="py-3 px-2">ROLE</th>
                  <th className="py-3 px-2">DEPARTMENT</th>
                  <th className="py-3 px-2">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50">
                    <td className="py-3 px-2 font-mono font-bold text-[#FF5D7A]">{emp.id}</td>
                    <td className="py-3 px-2 font-semibold text-[#1F2A52]">{emp.name}</td>
                    <td className="py-3 px-2 text-slate-600">{emp.email}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${emp.role === 'ADMIN' ? 'bg-rose-100 text-rose-700' : emp.role === 'HR' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-slate-600">{emp.dept}</td>
                    <td className="py-3 px-2 text-emerald-600 font-semibold">{emp.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;

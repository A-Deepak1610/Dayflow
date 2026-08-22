import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Search, UserPlus, Eye, Building, ShieldCheck, DollarSign } from 'lucide-react';
import EmployeeModal from '../../components/hr/EmployeeModal';

export const EmployeeProfilesPage = () => {
  const { onOpenAddModal } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [selectedEmpForView, setSelectedEmpForView] = useState(null);

  const employees = [
    { id: 'DAY-HR-2026-0001', name: 'Admin Officer', email: 'admin@dayflow.com', phone: '+1 555-0100', role: 'ADMIN', dept: 'Executive', status: 'Active', salary: '120000' },
    { id: 'DAY-SJ-2026-0012', name: 'Sarah Jenkins', email: 'sarah.j@dayflow.com', phone: '+1 555-0142', role: 'EMPLOYEE', dept: 'Engineering', status: 'Active', salary: '95000' },
    { id: 'DAY-AR-2026-0045', name: 'Alex Rivera', email: 'alex.r@dayflow.com', phone: '+1 555-0188', role: 'EMPLOYEE', dept: 'Product Design', status: 'Active', salary: '88000' },
    { id: 'DAY-DC-2026-0008', name: 'David Chen', email: 'david.c@dayflow.com', phone: '+1 555-0199', role: 'HR', dept: 'Human Resources', status: 'Active', salary: '78000' },
    { id: 'DAY-EW-2026-0033', name: 'Emma Watson', email: 'emma.w@dayflow.com', phone: '+1 555-0122', role: 'EMPLOYEE', dept: 'Operations', status: 'Active', salary: '72000' },
  ];

  const filtered = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.id.toLowerCase().includes(searchTerm.toLowerCase()) || e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'ALL' || e.dept === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora text-2xl font-bold text-[#1F2A52]">Employee Profile Directory</h1>
          <p className="text-xs text-slate-500">Manage employee records, job roles, salary structure, and document vaults</p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sora font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Onboard New Employee</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email or Login ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] focus:bg-white focus:border-emerald-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <span className="text-slate-500 font-medium">Department:</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-[#1F2A52]"
          >
            <option value="ALL">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product Design">Product Design</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Operations">Operations</option>
            <option value="Executive">Executive</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-sora bg-slate-50/50">
                <th className="py-3.5 px-4">LOGIN ID</th>
                <th className="py-3.5 px-4">EMPLOYEE NAME</th>
                <th className="py-3.5 px-4">WORK EMAIL</th>
                <th className="py-3.5 px-4">DEPARTMENT</th>
                <th className="py-3.5 px-4">ROLE</th>
                <th className="py-3.5 px-4">ANNUAL SALARY</th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">{emp.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#1F2A52]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {emp.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <span>{emp.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{emp.email}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{emp.dept}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      emp.role === 'ADMIN' ? 'bg-emerald-800 text-white' : emp.role === 'HR' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {emp.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-emerald-700">${parseInt(emp.salary).toLocaleString()}/yr</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedEmpForView(emp)}
                      className="px-3 py-1 bg-slate-100 hover:bg-emerald-600 text-[#1F2A52] hover:text-white border border-slate-200 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed View Modal */}
      {selectedEmpForView && (
        <EmployeeModal
          isOpen={Boolean(selectedEmpForView)}
          onClose={() => setSelectedEmpForView(null)}
          selectedEmployee={selectedEmpForView}
        />
      )}
    </div>
  );
};

export default EmployeeProfilesPage;

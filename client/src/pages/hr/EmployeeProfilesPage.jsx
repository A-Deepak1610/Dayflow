import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Search, UserPlus, Mail, Phone, Briefcase, Building, Sparkles } from 'lucide-react';

export const EmployeeProfilesPage = () => {
  const { onOpenAddModal } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');

  const employees = [
    { id: 'DAY-HR-2026-0001', name: 'Adam Admin', email: 'admin@dayflow.com', phone: '+1 555-0100', role: 'ADMIN', dept: 'Executive', status: 'Active', salary: '120000' },
    { id: 'DAY-SJ-2026-0012', name: 'Sarah Jenkins', email: 'sarah.j@dayflow.com', phone: '+1 555-0142', role: 'EMPLOYEE', dept: 'Engineering', status: 'Active', salary: '95000' },
    { id: 'DAY-AR-2026-0045', name: 'Alex Rivera', email: 'alex.r@dayflow.com', phone: '+1 555-0188', role: 'EMPLOYEE', dept: 'Product Design', status: 'Active', salary: '88000' },
    { id: 'DAY-DC-2026-0008', name: 'David Chen', email: 'david.c@dayflow.com', phone: '+1 555-0199', role: 'HR', dept: 'Human Resources', status: 'Active', salary: '78000' },
    { id: 'DAY-EW-2026-0033', name: 'Emma Watson', email: 'emma.w@dayflow.com', phone: '+1 555-0122', role: 'EMPLOYEE', dept: 'Operations', status: 'Active', salary: '72000' },
    { id: 'DAY-AM-2026-0051', name: 'Alice Murphy', email: 'alice.m@dayflow.com', phone: '+1 555-0133', role: 'EMPLOYEE', dept: 'Marketing', status: 'Active', salary: '81000' },
    { id: 'DAY-JS-2026-0077', name: 'John Smith', email: 'john.s@dayflow.com', phone: '+1 555-0155', role: 'EMPLOYEE', dept: 'Sales', status: 'On Leave', salary: '75000' },
  ];

  const filtered = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'ALL' || e.dept === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="p-6 bg-[#0a0a0a] min-h-screen text-slate-100 font-inter">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-sora">Employee Directory</h1>
          <p className="text-xs text-slate-400 mt-1">Manage personnel records, roles, and profiles</p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-4 py-2 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-semibold text-xs rounded-xl shadow-md shadow-[#FF5D7A]/20 cursor-pointer flex items-center gap-2 transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Create Employee</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#111113] border border-white/10 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#18181b] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:border-[#FF5D7A] outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Building className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-[#18181b] border border-white/10 rounded-xl text-xs font-semibold text-white outline-none focus:border-[#FF5D7A]"
          >
            <option value="ALL">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product Design">Product Design</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Operations">Operations</option>
            <option value="Executive">Executive</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((emp) => (
          <div 
            key={emp.id} 
            onClick={() => navigate(`/hr/employees/${emp.id}`)}
            className="horilla-card p-5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF5D7A] text-white flex items-center justify-center font-sora font-extrabold text-sm shadow-md shadow-[#FF5D7A]/20">
                  {emp.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider ${
                  emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {emp.status}
                </span>
              </div>

              {/* Name & Role */}
              <div>
                <h3 className="text-base font-sora font-bold text-white">{emp.name}</h3>
                <p className="text-xs font-semibold text-[#FF5D7A] mt-0.5">{emp.role}</p>
              </div>

              <div className="my-4 border-t border-white/10"></div>

              {/* Details List */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{emp.dept}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{emp.phone}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">{emp.id}</span>
              <span className="text-xs font-bold text-[#FF5D7A]">Profile &rarr;</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center horilla-card p-6">
            <p className="text-slate-400 text-xs font-mono">No personnel match the specified search parameters.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default EmployeeProfilesPage;

import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Search, UserPlus, Mail, Phone, Briefcase, Building } from 'lucide-react';

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
    <div className="p-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#333333]">Employee Directory</h1>
          <p className="text-[13px] text-[#888888] mt-1">Manage employee profiles and records</p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-5 py-2.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold text-[13px] rounded-lg shadow-sm cursor-pointer flex items-center gap-2 transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Create Employee</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search employees by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Building className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-medium text-[#333333] outline-none focus:border-horilla-primary"
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
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
          >
            {/* Card Header (Avatar & Status) */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-full bg-horilla-primary text-white flex items-center justify-center text-[18px] font-bold shadow-sm">
                {emp.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                emp.status === 'Active' ? 'bg-[#E6F4EA] text-[#10B981]' : 'bg-[#FEF3C7] text-[#F59E0B]'
              }`}>
                {emp.status}
              </span>
            </div>

            {/* Name & Role */}
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">{emp.name}</h3>
              <p className="text-[12px] font-medium text-horilla-primary mt-0.5">{emp.role}</p>
            </div>

            <div className="my-4 border-t border-slate-100"></div>

            {/* Details List */}
            <div className="space-y-2.5 flex-1">
              <div className="flex items-center gap-2 text-[12px] text-[#666666]">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{emp.dept}</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#666666]">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{emp.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#666666]">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{emp.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">{emp.id}</span>
              <span className="text-[12px] font-semibold text-horilla-primary group-hover:underline">View Profile &rarr;</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white border border-slate-200 rounded-xl">
            <p className="text-[#888888]">No employees found matching your criteria.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default EmployeeProfilesPage;

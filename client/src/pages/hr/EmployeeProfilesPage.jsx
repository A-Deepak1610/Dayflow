import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Search, UserPlus, Mail, Phone, Briefcase, Building, Loader2 } from 'lucide-react';
import { fetchAllEmployeesApi } from '../../services/api';

export const EmployeeProfilesPage = () => {
  const { onOpenAddModal } = useOutletContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = async () => {
    try {
      const res = await fetchAllEmployeesApi({ departmentId: deptFilter, search: searchTerm });
      if (res.ok && res.data?.employees) {
        const mapped = res.data.employees.map(e => ({
          id: e.id,
          loginId: e.loginId || 'EMP-1000',
          name: `${e.firstName} ${e.lastName || ''}`.trim(),
          email: e.email,
          phone: e.phone || '+91 98765 43210',
          role: e.role?.name || 'EMPLOYEE',
          dept: e.department?.name || 'General',
          position: e.position?.title || 'Team Member',
          status: 'Active',
          salary: e.salaryStructures?.[0]?.annualCtc ? `₹${(Number(e.salaryStructures[0].annualCtc) / 100000).toFixed(1)}L` : '₹9.6L'
        }));
        setEmployees(mapped);
      }
    } catch (err) {
      console.error('Failed to load employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [deptFilter, searchTerm]);

  const filtered = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.loginId.toLowerCase().includes(searchTerm.toLowerCase()) || 
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
          <p className="text-[13px] text-[#888888] mt-1">Manage employee profiles and records (Live Database)</p>
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

      {/* Loading state */}
      {loading && (
        <div className="p-8 flex items-center justify-center gap-2 text-slate-500 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-horilla-primary" />
          <span>Loading employee directory from database...</span>
        </div>
      )}

      {/* Employee Cards Grid */}
      {!loading && (
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
                  {emp.name.split(' ').map(n=>n[0]).join('').slice(0, 2)}
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  emp.status === 'Active' ? 'bg-[#E6F4EA] text-[#10B981]' : 'bg-[#FEF3C7] text-[#F59E0B]'
                }`}>
                  {emp.status}
                </span>
              </div>

              {/* Name & Role */}
              <div>
                <h3 className="text-[16px] font-bold text-[#333333] hover:text-horilla-primary transition">
                  {emp.name}
                </h3>
                <p className="text-[12px] font-semibold text-horilla-primary mt-0.5">{emp.position}</p>
                <p className="text-[11px] text-[#888888]">{emp.loginId}</p>
              </div>

              {/* Details List */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 flex-1">
                <div className="flex items-center gap-2 text-[12px] text-[#666666]">
                  <Mail className="w-3.5 h-3.5 text-[#888888]" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#666666]">
                  <Phone className="w-3.5 h-3.5 text-[#888888]" />
                  <span>{emp.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#666666]">
                  <Building className="w-3.5 h-3.5 text-[#888888]" />
                  <span>{emp.dept}</span>
                </div>
              </div>

              {/* Card Footer (Salary & Action) */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#888888] block">Annual CTC</span>
                  <span className="text-[13px] font-bold text-[#333333]">{emp.salary}</span>
                </div>
                <span className="text-[11px] font-semibold text-horilla-primary hover:underline">
                  View Profile →
                </span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400">
              No employees found matching the search criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeProfilesPage;

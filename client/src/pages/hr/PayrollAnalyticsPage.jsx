import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Download,
  Edit2,
  FileText,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Users,
  Search,
  Filter,
  Building,
  Plus,
  Printer,
  X,
  CreditCard,
  Percent,
  Check,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  PieChart as PieIcon,
  Layers,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts';

export const PayrollAnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('structures'); // 'structures' | 'analytics' | 'compliance'
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPayslipModalOpen, setIsPayslipModalOpen] = useState(false);
  const [isBatchProcessModalOpen, setIsBatchProcessModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Edit Compensation Form State
  const [formBase, setFormBase] = useState(0);
  const [formHra, setFormHra] = useState(0);
  const [formAllowances, setFormAllowances] = useState(0);
  const [formBonus, setFormBonus] = useState(0);
  const [formPf, setFormPf] = useState(0);
  const [formTax, setFormTax] = useState(0);

  // Primary Employee Compensation State
  const [employees, setEmployees] = useState([
    {
      id: 'DAY-HR-2026-0001',
      name: 'Adam Admin',
      dept: 'Executive',
      role: 'Chief HR Officer',
      avatar: 'AA',
      basePay: 10000,
      hra: 2000,
      allowances: 1200,
      bonus: 800,
      pf: 800,
      tax: 1200,
      netPay: 12000,
      status: 'Disbursed',
      bankAccount: '•••• •••• 4092',
      bankName: 'Chase Bank USA',
      disbursedDate: 'Aug 20, 2026'
    },
    {
      id: 'DAY-SJ-2026-0012',
      name: 'Sarah Jenkins',
      dept: 'Engineering',
      role: 'Lead Architect',
      avatar: 'SJ',
      basePay: 8200,
      hra: 1640,
      allowances: 800,
      bonus: 500,
      pf: 656,
      tax: 980,
      netPay: 9504,
      status: 'Disbursed',
      bankAccount: '•••• •••• 8821',
      bankName: 'Bank of America',
      disbursedDate: 'Aug 20, 2026'
    },
    {
      id: 'DAY-AR-2026-0045',
      name: 'Alex Rivera',
      dept: 'Product Design',
      role: 'Senior UI/UX Designer',
      avatar: 'AR',
      basePay: 7400,
      hra: 1480,
      allowances: 600,
      bonus: 400,
      pf: 592,
      tax: 850,
      netPay: 8438,
      status: 'Disbursed',
      bankAccount: '•••• •••• 3145',
      bankName: 'Wells Fargo',
      disbursedDate: 'Aug 20, 2026'
    },
    {
      id: 'DAY-DC-2026-0008',
      name: 'David Chen',
      dept: 'Human Resources',
      role: 'Talent Specialist',
      avatar: 'DC',
      basePay: 6500,
      hra: 1300,
      allowances: 500,
      bonus: 250,
      pf: 520,
      tax: 720,
      netPay: 7310,
      status: 'Disbursed',
      bankAccount: '•••• •••• 9920',
      bankName: 'Citibank NA',
      disbursedDate: 'Aug 20, 2026'
    },
    {
      id: 'DAY-EW-2026-0033',
      name: 'Emma Watson',
      dept: 'Operations',
      role: 'Operations Lead',
      avatar: 'EW',
      basePay: 6000,
      hra: 1200,
      allowances: 500,
      bonus: 200,
      pf: 480,
      tax: 660,
      netPay: 6760,
      status: 'Pending',
      bankAccount: '•••• •••• 1104',
      bankName: 'Silicon Valley Bank',
      disbursedDate: '--'
    },
    {
      id: 'DAY-AM-2026-0051',
      name: 'Alice Murphy',
      dept: 'Marketing',
      role: 'Growth Marketing Lead',
      avatar: 'AM',
      basePay: 6800,
      hra: 1360,
      allowances: 600,
      bonus: 350,
      pf: 544,
      tax: 760,
      netPay: 7806,
      status: 'Disbursed',
      bankAccount: '•••• •••• 5531',
      bankName: 'Barclays US',
      disbursedDate: 'Aug 20, 2026'
    },
    {
      id: 'DAY-JS-2026-0077',
      name: 'John Smith',
      dept: 'Sales',
      role: 'Account Executive',
      avatar: 'JS',
      basePay: 6200,
      hra: 1240,
      allowances: 500,
      bonus: 1200,
      pf: 496,
      tax: 790,
      netPay: 7854,
      status: 'On Hold',
      bankAccount: '•••• •••• 7712',
      bankName: 'Capital One',
      disbursedDate: '--'
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPI Computations
  const totalEmployees = employees.length;
  const totalGrossPayroll = employees.reduce(
    (sum, e) => sum + (e.basePay + e.hra + e.allowances + e.bonus),
    0
  );
  const totalNetPayroll = employees.reduce((sum, e) => sum + e.netPay, 0);
  const totalTaxDeductions = employees.reduce((sum, e) => sum + e.tax, 0);
  const totalPfDeductions = employees.reduce((sum, e) => sum + e.pf, 0);
  const averageNetSalary = Math.round(totalNetPayroll / totalEmployees);
  const disbursedCount = employees.filter(e => e.status === 'Disbursed').length;

  // Department analytics chart data
  const deptPayrollChart = useMemo(() => {
    const map = {};
    employees.forEach(e => {
      if (!map[e.dept]) map[e.dept] = 0;
      map[e.dept] += e.netPay;
    });
    return Object.keys(map).map(dept => ({
      name: dept,
      amount: map[dept]
    }));
  }, [employees]);

  // Breakdown Pie Chart Data
  const compensationBreakdownData = [
    { name: 'Basic Salaries', value: employees.reduce((s, e) => s + e.basePay, 0), color: '#3B82F6' },
    { name: 'HRA & House Allowances', value: employees.reduce((s, e) => s + e.hra, 0), color: '#10B981' },
    { name: 'Special Allowances & Bonus', value: employees.reduce((s, e) => s + e.allowances + e.bonus, 0), color: '#F59E0B' },
    { name: 'Income Tax TDS', value: totalTaxDeductions, color: '#E9573F' },
    { name: 'Employee PF / 401k', value: totalPfDeductions, color: '#9333EA' }
  ];

  // 6-Month Expenditure Trend Data
  const monthlyTrendData = [
    { month: 'Mar 2026', total: 54000, tax: 6800 },
    { month: 'Apr 2026', total: 55200, tax: 7100 },
    { month: 'May 2026', total: 57400, tax: 7350 },
    { month: 'Jun 2026', total: 58100, tax: 7500 },
    { month: 'Jul 2026', total: 59000, tax: 7650 },
    { month: 'Aug 2026', total: totalNetPayroll, tax: totalTaxDeductions }
  ];

  // Filtered Employees List
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.dept.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = deptFilter === 'ALL' || emp.dept === deptFilter;
      const matchesStatus = statusFilter === 'ALL' || emp.status.toUpperCase() === statusFilter.toUpperCase();
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, searchTerm, deptFilter, statusFilter]);

  // Open Edit Structure Modal
  const openEditStructureModal = (emp) => {
    setSelectedEmployee(emp);
    setFormBase(emp.basePay);
    setFormHra(emp.hra);
    setFormAllowances(emp.allowances);
    setFormBonus(emp.bonus);
    setFormPf(emp.pf);
    setFormTax(emp.tax);
    setIsEditModalOpen(true);
  };

  // Base Pay live auto calculation handler
  const handleBaseChange = (val) => {
    const base = Number(val) || 0;
    setFormBase(base);
    // Auto calculate recommended HRA (20%), PF (8%), Tax (10%)
    setFormHra(Math.round(base * 0.20));
    setFormPf(Math.round(base * 0.08));
    setFormTax(Math.round(base * 0.10));
  };

  // Computed live Net Pay in modal
  const computedGross = Number(formBase) + Number(formHra) + Number(formAllowances) + Number(formBonus);
  const computedDeductions = Number(formPf) + Number(formTax);
  const computedNet = Math.max(0, computedGross - computedDeductions);

  // Save Salary Structure
  const handleSaveSalaryStructure = (e) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === selectedEmployee.id) {
          return {
            ...emp,
            basePay: Number(formBase),
            hra: Number(formHra),
            allowances: Number(formAllowances),
            bonus: Number(formBonus),
            pf: Number(formPf),
            tax: Number(formTax),
            netPay: computedNet
          };
        }
        return emp;
      })
    );

    setIsEditModalOpen(false);
    showToast(`Salary structure updated for ${selectedEmployee.name}`);
  };

  // Toggle Disbursement Status
  const handleToggleStatus = (id) => {
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === id) {
          const nextStatus = emp.status === 'Disbursed' ? 'On Hold' : emp.status === 'On Hold' ? 'Pending' : 'Disbursed';
          return {
            ...emp,
            status: nextStatus,
            disbursedDate: nextStatus === 'Disbursed' ? 'Aug 22, 2026' : '--'
          };
        }
        return emp;
      })
    );
    showToast(`Disbursement status updated.`);
  };

  // Open Payslip Modal
  const openPayslipModal = (emp) => {
    setSelectedEmployee(emp);
    setIsPayslipModalOpen(true);
  };

  // Trigger Print Payslip
  const handlePrintPayslip = () => {
    window.print();
  };

  // Batch Disburse All Pending
  const handleBatchDisburse = () => {
    setEmployees(prev =>
      prev.map(e => ({
        ...e,
        status: 'Disbursed',
        disbursedDate: 'Aug 22, 2026'
      }))
    );
    setIsBatchProcessModalOpen(false);
    showToast(`All ${employees.length} employee payroll salaries marked as Disbursed.`);
  };

  // Export Bank Transfer Sheet CSV
  const handleExportBankSheet = () => {
    const headers = ['Employee ID,Employee Name,Department,Bank Name,Account Number,Monthly Net Pay,Status,Payment Ref'];
    const rows = employees.map(
      e =>
        `"${e.id}","${e.name}","${e.dept}","${e.bankName}","${e.bankAccount}",$${e.netPay},"${e.status}","ACH-202608-${e.id.slice(-4)}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dayflow_Payroll_Bank_Transfer_Aug2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Bank transfer sheet exported to CSV.');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2A52] text-white px-5 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">Payroll Control & Analytics</h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Manage salary structures, statutory deductions, monthly payroll processing, and realistic payslip generation
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsBatchProcessModalOpen(true)}
            className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold text-[13px] rounded-lg shadow-xs cursor-pointer flex items-center gap-2 transition"
          >
            <CreditCard className="w-4 h-4" />
            <span>Process Monthly Payroll</span>
          </button>

          <button
            onClick={handleExportBankSheet}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-[#333333] border border-slate-200 font-semibold text-[13px] rounded-lg shadow-xs cursor-pointer flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Bank Sheet (CSV)</span>
          </button>
        </div>
      </div>

      {/* Payroll Lifecycle Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-[#1F2A52] text-[14px]">August 2026 Payroll Cycle: Active</h4>
            <p className="text-[11px] text-slate-500">
              Direct Deposit ACH Batch Scheduled • {disbursedCount} of {totalEmployees} Disbursed
            </p>
          </div>
        </div>

        {/* 4-Step Progress indicator */}
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> 1. Attendance Locked
          </span>
          <span>&rarr;</span>
          <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> 2. Tax & Deductions Computed
          </span>
          <span>&rarr;</span>
          <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> 3. HR Audited
          </span>
          <span>&rarr;</span>
          <span className="flex items-center gap-1 text-horilla-primary bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
            <Clock className="w-3.5 h-3.5" /> 4. Bank Transfer
          </span>
        </div>
      </div>

      {/* KPI Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1F2A52] text-white rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Gross Payroll</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="font-sora text-3xl font-extrabold text-white mt-2">${totalGrossPayroll.toLocaleString()}</p>
          <p className="text-[11px] text-slate-300 mt-1 font-mono">Company total cost before tax</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Net Disbursed Take-Home</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="font-sora text-3xl font-extrabold text-emerald-600 mt-2">${totalNetPayroll.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-1">Direct to employee accounts</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Statutory & Tax TDS</span>
            <Percent className="w-5 h-5 text-amber-600" />
          </div>
          <p className="font-sora text-3xl font-extrabold text-[#1F2A52] mt-2">
            ${(totalTaxDeductions + totalPfDeductions).toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">PF: ${totalPfDeductions.toLocaleString()} • Tax: ${totalTaxDeductions.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Average Monthly Net</span>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="font-sora text-3xl font-extrabold text-[#1F2A52] mt-2">${averageNetSalary.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-1">Per employee / month</p>
        </div>
      </div>

      {/* Mode Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'structures', label: 'Salary Structures & Compensation', icon: Layers, count: filteredEmployees.length },
          { id: 'analytics', label: 'Payroll Analytics & Visual Insights', icon: BarChart3 },
          { id: 'compliance', label: 'Statutory & Tax Compliance', icon: ShieldCheck }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 text-[13px] font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-horilla-primary text-horilla-primary'
                  : 'border-transparent text-[#666666] hover:text-[#333333]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SALARY STRUCTURES & COMPENSATION TABLE */}
      {activeTab === 'structures' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, ID or department..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
                />
              </div>

              <select
                value={deptFilter}
                onChange={e => setDeptFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-medium text-[#333333] outline-none focus:border-horilla-primary"
              >
                <option value="ALL">All Departments</option>
                <option value="Executive">Executive</option>
                <option value="Engineering">Engineering</option>
                <option value="Product Design">Product Design</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Operations">Operations</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            {/* Status Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full lg:w-auto">
              {['ALL', 'DISBURSED', 'PENDING', 'ON HOLD'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer shrink-0 ${
                    statusFilter === st
                      ? 'bg-[#1F2A52] text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#1F2A52]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Structures Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/75">
                    <th className="py-3 px-4">EMPLOYEE</th>
                    <th className="py-3 px-3">BASE SALARY</th>
                    <th className="py-3 px-3">HRA</th>
                    <th className="py-3 px-3">ALLOWANCES & BONUS</th>
                    <th className="py-3 px-3">PF DEDUCT</th>
                    <th className="py-3 px-3">TAX (TDS)</th>
                    <th className="py-3 px-3">MONTHLY NET PAY</th>
                    <th className="py-3 px-3">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEmployees.map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-[#1F2A52] font-bold flex items-center justify-center text-xs">
                            {emp.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-[#1F2A52] leading-tight">{emp.name}</p>
                            <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                              {emp.id} • {emp.dept}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-mono font-semibold text-slate-800">
                        ${emp.basePay.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-3 font-mono text-emerald-700">
                        +${emp.hra.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-3 font-mono text-emerald-700">
                        +${(emp.allowances + emp.bonus).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-3 font-mono text-slate-500">
                        -${emp.pf.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-3 font-mono text-slate-500">
                        -${emp.tax.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-3 font-mono font-bold text-[#1F2A52] text-[14px]">
                        ${emp.netPay.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => handleToggleStatus(emp.id)}
                          title="Click to toggle status"
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer transition ${
                            emp.status === 'Disbursed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : emp.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                              : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {emp.status}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditStructureModal(emp)}
                            title="Edit Compensation Formula"
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => openPayslipModal(emp)}
                            title="Generate Official Payslip"
                            className="px-2.5 py-1 bg-horilla-primary/10 hover:bg-horilla-primary hover:text-white text-horilla-primary rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Payslip</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-10 text-center text-slate-400">
                        No employees found matching your compensation filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAYROLL ANALYTICS & CHARTS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Expenditure Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">Department-wise Net Payroll Distribution</h3>
              <p className="text-[12px] text-slate-500">August 2026 total disbursement per department ($ USD)</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptPayrollChart} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} interval={0} angle={-15} textAnchor="end" />
                  <YAxis stroke="#888888" fontSize={11} tickFormatter={v => `$${v / 1000}k`} />
                  <Tooltip formatter={val => [`$${Number(val).toLocaleString()}`, 'Total Net Pay']} />
                  <Bar dataKey="amount" fill="#E9573F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Compensation Component Breakdown Pie */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">Payroll Component Composition</h3>
              <p className="text-[12px] text-slate-500">Gross earnings vs statutory and tax withholdings</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={compensationBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {compensationBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={val => `$${Number(val).toLocaleString()}`} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 6-Month Expenditure Trend */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 lg:col-span-2">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">6-Month Payroll Cost & Tax Retention Trend</h3>
              <p className="text-[12px] text-slate-500">Historical compensation trend over past two quarters</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#888888" fontSize={11} />
                  <YAxis stroke="#888888" fontSize={11} tickFormatter={v => `$${v / 1000}k`} />
                  <Tooltip formatter={val => `$${Number(val).toLocaleString()}`} />
                  <Area type="monotone" dataKey="total" name="Net Payroll" stroke="#10B981" fill="#D1FAE5" />
                  <Area type="monotone" dataKey="tax" name="Tax Deductions (TDS)" stroke="#E9573F" fill="#FCECE9" />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STATUTORY & TAX COMPLIANCE */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
                Provident Fund (PF / 401k)
              </span>
              <p className="text-2xl font-extrabold text-[#1F2A52]">${totalPfDeductions.toLocaleString()}</p>
              <p className="text-xs text-slate-500">8% Employee + 8% Employer Match Fund</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
                Income Tax TDS Withholding
              </span>
              <p className="text-2xl font-extrabold text-[#1F2A52]">${totalTaxDeductions.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Form 16 / W-2 Remitted to Internal Revenue</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                Health & State Medical Insurance
              </span>
              <p className="text-2xl font-extrabold text-[#1F2A52]">$3,450</p>
              <p className="text-xs text-slate-500">Comprehensive Staff Coverage Plan</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-[16px] font-bold text-[#333333]">Statutory Audit & Remittance Schedule</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1F2A52]">Federal Tax Deposit (941 / Form 24Q)</p>
                  <p className="text-slate-500">Due on 15th of next calendar month</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">COMPLIANT</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1F2A52]">State Unemployment & Labor Insurance</p>
                  <p className="text-slate-500">Quarterly statutory return</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: EDIT SALARY STRUCTURE MODAL */}
      {isEditModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">Edit Salary & Compensation Structure</h3>
                <p className="text-[11px] text-slate-400">
                  {selectedEmployee.name} ({selectedEmployee.id}) • {selectedEmployee.dept}
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSalaryStructure} className="space-y-4 text-[13px]">
              {/* Live Calculator Summary Box */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Gross Earnings</p>
                  <p className="text-lg font-extrabold text-emerald-600 font-mono">${computedGross.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Total Deductions</p>
                  <p className="text-lg font-extrabold text-rose-600 font-mono">-${computedDeductions.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Take-Home Net Pay</p>
                  <p className="text-lg font-extrabold text-[#1F2A52] font-mono">${computedNet.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Base Monthly Salary ($)</label>
                  <input
                    type="number"
                    value={formBase}
                    onChange={e => handleBaseChange(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none focus:border-horilla-primary"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Auto-calculates standard allowances</p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">HRA House Rent Allowance ($)</label>
                  <input
                    type="number"
                    value={formHra}
                    onChange={e => setFormHra(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Special Allowances ($)</label>
                  <input
                    type="number"
                    value={formAllowances}
                    onChange={e => setFormAllowances(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Performance Bonus / Incentives ($)</label>
                  <input
                    type="number"
                    value={formBonus}
                    onChange={e => setFormBonus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">PF / 401k Deduction ($)</label>
                  <input
                    type="number"
                    value={formPf}
                    onChange={e => setFormPf(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Income Tax (TDS) ($)</label>
                  <input
                    type="number"
                    value={formTax}
                    onChange={e => setFormTax(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold rounded-lg shadow-sm"
                >
                  Save Salary Structure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: OFFICIAL PRINTABLE PAYSLIP */}
      {isPayslipModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 space-y-6 animate-modal-pop max-h-[90vh] overflow-y-auto">
            {/* Payslip Header with Branding */}
            <div className="flex items-start justify-between pb-4 border-b-2 border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-horilla-primary text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    DF
                  </div>
                  <h2 className="text-xl font-extrabold text-[#1F2A52]">DAYFLOW HRMS</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">Official Electronic Salary Slip • August 2026</p>
                <p className="text-[11px] text-slate-400 font-mono">100 Tech Blvd, Silicon Valley, CA 94025</p>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
                  DISBURSED & VERIFIED
                </span>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">Ref: ACH-202608-{selectedEmployee.id.slice(-4)}</p>
              </div>
            </div>

            {/* Employee Bio Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <div>
                <p className="text-slate-400">Employee Name</p>
                <p className="font-bold text-[#1F2A52] text-[13px]">{selectedEmployee.name}</p>
              </div>
              <div>
                <p className="text-slate-400">Employee ID</p>
                <p className="font-mono font-bold text-slate-700">{selectedEmployee.id}</p>
              </div>
              <div>
                <p className="text-slate-400">Department / Role</p>
                <p className="font-semibold text-slate-700">{selectedEmployee.dept} • {selectedEmployee.role}</p>
              </div>
              <div>
                <p className="text-slate-400">Bank & Account</p>
                <p className="font-mono text-slate-700">{selectedEmployee.bankName} ({selectedEmployee.bankAccount})</p>
              </div>
            </div>

            {/* Itemized Earnings and Deductions Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              {/* Earnings Column */}
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200 font-bold text-[#1F2A52]">
                  <span>EARNINGS COMPONENT</span>
                  <span>AMOUNT</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Basic Salary</span>
                  <span className="font-mono font-semibold">${selectedEmployee.basePay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>House Rent Allowance (HRA)</span>
                  <span className="font-mono font-semibold">${selectedEmployee.hra.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Special & Medical Allowance</span>
                  <span className="font-mono font-semibold">${selectedEmployee.allowances.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Performance Incentives & Bonus</span>
                  <span className="font-mono font-semibold">${selectedEmployee.bonus.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-emerald-700">
                  <span>GROSS EARNINGS</span>
                  <span className="font-mono">
                    ${(selectedEmployee.basePay + selectedEmployee.hra + selectedEmployee.allowances + selectedEmployee.bonus).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Deductions Column */}
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200 font-bold text-[#1F2A52]">
                  <span>STATUTORY DEDUCTIONS</span>
                  <span>AMOUNT</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Provident Fund (PF / 401k)</span>
                  <span className="font-mono font-semibold">${selectedEmployee.pf.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Income Tax Withholding (TDS)</span>
                  <span className="font-mono font-semibold">${selectedEmployee.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Professional Tax</span>
                  <span className="font-mono font-semibold">$0.00</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-rose-700">
                  <span>TOTAL DEDUCTIONS</span>
                  <span className="font-mono">
                    -${(selectedEmployee.pf + selectedEmployee.tax).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Net Salary Highlight Box */}
            <div className="p-4 bg-[#1F2A52] text-white rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">NET TAKE-HOME SALARY</p>
                <p className="text-[11px] text-slate-300 mt-0.5">Credited via direct electronic deposit</p>
              </div>
              <p className="font-sora text-2xl font-extrabold text-emerald-400 font-mono">
                ${selectedEmployee.netPay.toLocaleString()}
              </p>
            </div>

            {/* Sign-off footer & actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[10px] text-slate-400 italic">
                This is a computer generated salary document and requires no physical signature.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintPayslip}
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Payslip</span>
                </button>
                <button
                  onClick={() => setIsPayslipModalOpen(false)}
                  className="px-4 py-2 bg-[#1F2A52] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: BATCH DISBURSE MODAL */}
      {isBatchProcessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[17px] font-bold text-[#1F2A52]">Execute August 2026 Payroll Batch</h3>
              <button
                onClick={() => setIsBatchProcessModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                You are about to initiate the monthly payroll disbursement for <strong>{totalEmployees} employees</strong>.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="flex justify-between">
                  <span>Total Net Disbursement:</span>
                  <strong className="font-mono text-[#1F2A52]">${totalNetPayroll.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Tax Deductions:</span>
                  <strong className="font-mono text-slate-700">${totalTaxDeductions.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total PF Deductions:</span>
                  <strong className="font-mono text-slate-700">${totalPfDeductions.toLocaleString()}</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                Direct ACH transfer files and individual notification payslips will be automatically delivered to employees.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsBatchProcessModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBatchDisburse}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs shadow-sm"
              >
                Confirm & Disburse All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollAnalyticsPage;

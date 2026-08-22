import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchMyPayrollApi, fetchPayslipDetailApi } from '../../services/api';
import {
  DollarSign,
  Calendar,
  Download,
  Printer,
  Eye,
  EyeOff,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  ArrowLeft,
  ShieldCheck,
  Building,
  TrendingUp,
  CreditCard,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Info,
  Layers,
  ArrowUpRight,
  Lock,
  Sparkles,
  FileCheck,
  Landmark,
  Receipt,
  X,
  Check
} from 'lucide-react';

// ============================================================================
// MOCK EMPLOYEE PROFILE & SALARY REGISTER (Indian Rupee MNC Standard)
// ============================================================================
const EMPLOYEE_PROFILE = {
  name: 'Alex Johnson',
  employeeId: 'EMP-1024',
  designation: 'Senior Software Engineer',
  department: 'Product Engineering',
  dateOfJoining: '15 Jan 2024',
  bankName: 'HDFC Bank Ltd',
  bankAccount: '•••• •••• 8842',
  ifscCode: 'HDFC0001234',
  panNumber: 'ABCDE1234F',
  uanNumber: '100928374612',
  pfNumber: 'MH/PUN/0042189/000/1024',
  taxRegime: 'New Tax Regime (FY 2026-27)'
};

// ============================================================================
// CONFIGURABLE SALARY STRUCTURE (READ-ONLY)
// ============================================================================
const SALARY_STRUCTURE = {
  annualCTC: 1020000,
  monthlyGross: 85000,
  monthlyNet: 76400,
  earnings: [
    { component: 'Basic Salary', monthly: 42500, annual: 510000, taxable: true, type: 'Fixed' },
    { component: 'House Rent Allowance (HRA)', monthly: 21250, annual: 255000, taxable: true, type: 'Fixed' },
    { component: 'Special Allowance', monthly: 12750, annual: 153000, taxable: true, type: 'Fixed' },
    { component: 'Conveyance & Transport Allowance', monthly: 4500, annual: 54000, taxable: false, type: 'Reimbursement' },
    { component: 'Medical & Fitness Allowance', monthly: 4000, annual: 48000, taxable: false, type: 'Fixed' }
  ],
  deductions: [
    { component: 'Employees Provident Fund (EPF)', monthly: 3600, annual: 43200, category: 'Statutory' },
    { component: 'Income Tax TDS', monthly: 3800, annual: 45600, category: 'Tax' },
    { component: 'Professional Tax (PT)', monthly: 200, annual: 2400, category: 'Statutory' },
    { component: 'Group Health Insurance (GHI)', monthly: 1000, annual: 12000, category: 'Insurance' }
  ]
};

// ============================================================================
// HISTORICAL PAYROLL STATEMENTS
// ============================================================================
const PAYSLIP_RECORDS = [
  {
    id: 'PS-2026-08',
    month: 'August 2026',
    financialYear: '2026-27',
    payPeriod: '01 Aug 2026 – 31 Aug 2026',
    paymentDate: '31 Aug 2026',
    grossEarnings: 85000,
    totalDeductions: 8600,
    netPay: 76400,
    status: 'Processed',
    workingDays: 31,
    lopDays: 0,
    earningsBreakdown: [
      { name: 'Basic Salary', amount: 42500 },
      { name: 'House Rent Allowance (HRA)', amount: 21250 },
      { name: 'Special Allowance', amount: 12750 },
      { name: 'Conveyance Allowance', amount: 4500 },
      { name: 'Medical Allowance', amount: 4000 }
    ],
    deductionsBreakdown: [
      { name: 'Employees Provident Fund (EPF)', amount: 3600 },
      { name: 'Income Tax TDS', amount: 3800 },
      { name: 'Professional Tax (PT)', amount: 200 },
      { name: 'Group Health Insurance', amount: 1000 }
    ]
  },
  {
    id: 'PS-2026-07',
    month: 'July 2026',
    financialYear: '2026-27',
    payPeriod: '01 Jul 2026 – 31 Jul 2026',
    paymentDate: '31 Jul 2026',
    grossEarnings: 85000,
    totalDeductions: 8600,
    netPay: 76400,
    status: 'Processed',
    workingDays: 31,
    lopDays: 0,
    earningsBreakdown: [
      { name: 'Basic Salary', amount: 42500 },
      { name: 'House Rent Allowance (HRA)', amount: 21250 },
      { name: 'Special Allowance', amount: 12750 },
      { name: 'Conveyance Allowance', amount: 4500 },
      { name: 'Medical Allowance', amount: 4000 }
    ],
    deductionsBreakdown: [
      { name: 'Employees Provident Fund (EPF)', amount: 3600 },
      { name: 'Income Tax TDS', amount: 3800 },
      { name: 'Professional Tax (PT)', amount: 200 },
      { name: 'Group Health Insurance', amount: 1000 }
    ]
  },
  {
    id: 'PS-2026-06',
    month: 'June 2026',
    financialYear: '2026-27',
    payPeriod: '01 Jun 2026 – 30 Jun 2026',
    paymentDate: '30 Jun 2026',
    grossEarnings: 85000,
    totalDeductions: 8600,
    netPay: 76400,
    status: 'Processed',
    workingDays: 30,
    lopDays: 0,
    earningsBreakdown: [
      { name: 'Basic Salary', amount: 42500 },
      { name: 'House Rent Allowance (HRA)', amount: 21250 },
      { name: 'Special Allowance', amount: 12750 },
      { name: 'Conveyance Allowance', amount: 4500 },
      { name: 'Medical Allowance', amount: 4000 }
    ],
    deductionsBreakdown: [
      { name: 'Employees Provident Fund (EPF)', amount: 3600 },
      { name: 'Income Tax TDS', amount: 3800 },
      { name: 'Professional Tax (PT)', amount: 200 },
      { name: 'Group Health Insurance', amount: 1000 }
    ]
  },
  {
    id: 'PS-2026-05',
    month: 'May 2026',
    financialYear: '2026-27',
    payPeriod: '01 May 2026 – 31 May 2026',
    paymentDate: '31 May 2026',
    grossEarnings: 85000,
    totalDeductions: 8600,
    netPay: 76400,
    status: 'Processed',
    workingDays: 31,
    lopDays: 0,
    earningsBreakdown: [
      { name: 'Basic Salary', amount: 42500 },
      { name: 'House Rent Allowance (HRA)', amount: 21250 },
      { name: 'Special Allowance', amount: 12750 },
      { name: 'Conveyance Allowance', amount: 4500 },
      { name: 'Medical Allowance', amount: 4000 }
    ],
    deductionsBreakdown: [
      { name: 'Employees Provident Fund (EPF)', amount: 3600 },
      { name: 'Income Tax TDS', amount: 3800 },
      { name: 'Professional Tax (PT)', amount: 200 },
      { name: 'Group Health Insurance', amount: 1000 }
    ]
  },
  {
    id: 'PS-2026-04',
    month: 'April 2026',
    financialYear: '2026-27',
    payPeriod: '01 Apr 2026 – 30 Apr 2026',
    paymentDate: '30 Apr 2026',
    grossEarnings: 85000,
    totalDeductions: 8600,
    netPay: 76400,
    status: 'Processed',
    workingDays: 30,
    lopDays: 0,
    earningsBreakdown: [
      { name: 'Basic Salary', amount: 42500 },
      { name: 'House Rent Allowance (HRA)', amount: 21250 },
      { name: 'Special Allowance', amount: 12750 },
      { name: 'Conveyance Allowance', amount: 4500 },
      { name: 'Medical Allowance', amount: 4000 }
    ],
    deductionsBreakdown: [
      { name: 'Employees Provident Fund (EPF)', amount: 3600 },
      { name: 'Income Tax TDS', amount: 3800 },
      { name: 'Professional Tax (PT)', amount: 200 },
      { name: 'Group Health Insurance', amount: 1000 }
    ]
  },
  {
    id: 'PS-2026-03',
    month: 'March 2026',
    financialYear: '2025-26',
    payPeriod: '01 Mar 2026 – 31 Mar 2026',
    paymentDate: '31 Mar 2026',
    grossEarnings: 75000,
    totalDeductions: 7800,
    netPay: 67200,
    status: 'Processed',
    workingDays: 31,
    lopDays: 0,
    earningsBreakdown: [
      { name: 'Basic Salary', amount: 37500 },
      { name: 'House Rent Allowance (HRA)', amount: 18750 },
      { name: 'Special Allowance', amount: 11250 },
      { name: 'Conveyance Allowance', amount: 4000 },
      { name: 'Medical Allowance', amount: 3500 }
    ],
    deductionsBreakdown: [
      { name: 'Employees Provident Fund (EPF)', amount: 3200 },
      { name: 'Income Tax TDS', amount: 3400 },
      { name: 'Professional Tax (PT)', amount: 200 },
      { name: 'Group Health Insurance', amount: 1000 }
    ]
  }
];

// Historical Salary Revisions Log (Read-only)
const SALARY_REVISION_HISTORY = [
  {
    effectiveDate: '01 Apr 2026',
    revisedGross: 85000,
    revisedCTC: 1020000,
    changeType: 'Annual Performance Appraisal (+13.3%)',
    approvedBy: 'HR Compensation Committee',
    remarks: 'Promoted to Senior Software Engineer (Band L4)'
  },
  {
    effectiveDate: '15 Jan 2024',
    revisedGross: 75000,
    revisedCTC: 900000,
    changeType: 'Initial Joining Offer',
    approvedBy: 'Talent Acquisition Team',
    remarks: 'Joined Dayflow Technologies as Software Engineer'
  }
];

export const MyPayslips = () => {
  // Financial Year Filter & Tab Navigation
  const [selectedFY, setSelectedFY] = useState('2026-27');
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'structure' | 'revisions' | 'tax'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Privacy Visibility Toggle State (Hide salary amounts)
  const [isSalaryHidden, setIsSalaryHidden] = useState(false);

  // Dedicated Payslip Viewer Modal State
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  // Download simulation state
  const [downloadingId, setDownloadingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Live Data State
  const [payslipRecords, setPayslipRecords] = useState(PAYSLIP_RECORDS);
  const [salaryStructure, setSalaryStructure] = useState(SALARY_STRUCTURE);
  const [salaryRevisions, setSalaryRevisions] = useState(SALARY_REVISION_HISTORY);
  const [loading, setLoading] = useState(true);

  const loadPayrollData = async () => {
    try {
      const res = await fetchMyPayrollApi();
      if (res.ok && res.data) {
        if (res.data.payslips && res.data.payslips.length > 0) {
          const mapped = res.data.payslips.map(p => ({
            id: p.id,
            month: p.payPeriod,
            financialYear: p.financialYear || '2026-27',
            payPeriod: p.payPeriod,
            paymentDate: p.paymentDate ? new Date(p.paymentDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '31 Aug 2026',
            grossEarnings: Number(p.grossEarnings),
            totalDeductions: Number(p.totalDeductions),
            netPay: Number(p.netPay),
            status: p.status || 'Processed',
            workingDays: Number(p.workingDays) || 31,
            lopDays: Number(p.lopDays) || 0,
            earningsBreakdown: (p.lines || []).filter(l => l.type === 'EARNING').map(l => ({ name: l.componentName, amount: Number(l.amount) })),
            deductionsBreakdown: (p.lines || []).filter(l => l.type === 'DEDUCTION').map(l => ({ name: l.componentName, amount: Number(l.amount) }))
          }));
          setPayslipRecords(mapped);
        }

        if (res.data.salaryStructure) {
          const s = res.data.salaryStructure;
          const ctc = Number(s.annualCtc);
          const base = Number(s.basePay);
          const hra = Number(s.hra);
          const sp = Number(s.specialAllowance || 0);
          setSalaryStructure({
            annualCTC: ctc,
            monthlyGross: Math.round(ctc / 12),
            monthlyNet: Math.round((ctc / 12) * 0.9),
            earnings: [
              { component: 'Basic Salary', monthly: Math.round(base / 12), annual: base, taxable: true, type: 'Fixed' },
              { component: 'House Rent Allowance (HRA)', monthly: Math.round(hra / 12), annual: hra, taxable: true, type: 'Fixed' },
              { component: 'Special Allowance', monthly: Math.round(sp / 12), annual: sp, taxable: true, type: 'Fixed' },
              { component: 'Conveyance & Transport Allowance', monthly: 4500, annual: 54000, taxable: false, type: 'Reimbursement' },
              { component: 'Medical & Fitness Allowance', monthly: 4000, annual: 48000, taxable: false, type: 'Fixed' }
            ],
            deductions: [
              { component: 'Employees Provident Fund (EPF)', monthly: 3600, annual: 43200, category: 'Statutory' },
              { component: 'Income Tax TDS', monthly: 3800, annual: 45600, category: 'Tax' },
              { component: 'Professional Tax (PT)', monthly: 200, annual: 2400, category: 'Statutory' },
              { component: 'Group Health Insurance (GHI)', monthly: 1000, annual: 12000, category: 'Insurance' }
            ]
          });
        }

        if (res.data.salaryRevisions && res.data.salaryRevisions.length > 0) {
          setSalaryRevisions(res.data.salaryRevisions.map(r => ({
            effectiveDate: new Date(r.effectiveDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            revisedGross: Number(r.revisedGross),
            revisedCTC: Number(r.revisedCtc),
            changeType: r.changeType,
            approvedBy: r.approver ? `${r.approver.firstName} ${r.approver.lastName}` : 'HR Committee',
            remarks: r.remarks || 'Salary Revision'
          })));
        }
      }
    } catch (e) {
      console.error('Failed to load payroll data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayrollData();
  }, []);

  // Format Indian Currency Helper (Supports privacy hiding)
  const formatCurrency = (amount) => {
    if (isSalaryHidden) return '••••••';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Latest Payslip
  const latestPayslip = payslipRecords[0] || PAYSLIP_RECORDS[0];

  // Year-to-Date (YTD) Summary Calculations for selected FY
  const ytdStats = useMemo(() => {
    const fyRecords = payslipRecords.filter(p => p.financialYear === selectedFY && p.status === 'Processed');
    const gross = fyRecords.reduce((sum, p) => sum + p.grossEarnings, 0);
    const deductions = fyRecords.reduce((sum, p) => sum + p.totalDeductions, 0);
    const net = fyRecords.reduce((sum, p) => sum + p.netPay, 0);
    return {
      count: fyRecords.length,
      gross: gross || 425000,
      deductions: deductions || 43000,
      net: net || 382000
    };
  }, [selectedFY, payslipRecords]);

  // Filtered Payslip History Table
  const filteredPayslips = useMemo(() => {
    return payslipRecords.filter(p => {
      const matchesFY = selectedFY === 'ALL' || p.financialYear === selectedFY;
      const matchesStatus = statusFilter === 'ALL' || p.status.toUpperCase() === statusFilter;
      const matchesSearch =
        p.month.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFY && matchesStatus && matchesSearch;
    });
  }, [selectedFY, statusFilter, searchQuery, payslipRecords]);

  // Handle PDF Download Simulation
  const handleDownloadPDF = (slip) => {
    setDownloadingId(slip.id);
    setTimeout(() => {
      setDownloadingId(null);
      // Create and download structured CSV/receipt text representation
      const content = `=====================================================
DAYFLOW TECHNOLOGIES - SALARY SLIP
Every workday, perfectly aligned.
=====================================================
Slip ID: ${slip.id}
Month: ${slip.month}
Employee: ${EMPLOYEE_PROFILE.name} (${EMPLOYEE_PROFILE.employeeId})
Department: ${EMPLOYEE_PROFILE.department}
Designation: ${EMPLOYEE_PROFILE.designation}
Bank Account: ${EMPLOYEE_PROFILE.bankAccount} (${EMPLOYEE_PROFILE.bankName})
Pay Period: ${slip.payPeriod}
Payment Date: ${slip.paymentDate}
Status: ${slip.status}

-----------------------------------------------------
EARNINGS (INR)
-----------------------------------------------------
${slip.earningsBreakdown.map(e => `${e.name.padEnd(35)} : Rs. ${e.amount.toLocaleString('en-IN')}`).join('\n')}
Gross Earnings                       : Rs. ${slip.grossEarnings.toLocaleString('en-IN')}

-----------------------------------------------------
DEDUCTIONS (INR)
-----------------------------------------------------
${slip.deductionsBreakdown.map(d => `${d.name.padEnd(35)} : Rs. ${d.amount.toLocaleString('en-IN')}`).join('\n')}
Total Deductions                     : Rs. ${slip.totalDeductions.toLocaleString('en-IN')}

-----------------------------------------------------
NET SALARY DISBURSED                 : Rs. ${slip.netPay.toLocaleString('en-IN')}
-----------------------------------------------------
Note: System generated confidential statement.
`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Dayflow_Payslip_${slip.month.replace(/\s+/g, '_')}_${EMPLOYEE_PROFILE.employeeId}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(`Payslip for ${slip.month} downloaded successfully.`);
    }, 900);
  };

  // Handle Print Action
  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-inter text-slate-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2A52] text-white px-5 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 1. TOP HEADER & PRIVACY TOOLBAR                                      */}
      {/* ==================================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to="/employee/dashboard"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-slate-500 hover:text-horilla-primary transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">My Payslips</h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            View your salary details, payslips, and payroll history.
          </p>
        </div>

        {/* Top Right Actions */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Privacy Toggle (Hide / Show Salary Amounts) */}
          <button
            onClick={() => setIsSalaryHidden(!isSalaryHidden)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-xs ${
              isSalaryHidden
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle salary confidentiality on screen"
          >
            {isSalaryHidden ? (
              <>
                <Eye className="w-3.5 h-3.5 text-amber-600" />
                <span>Show Amounts</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span>Hide Amounts</span>
              </>
            )}
          </button>

          {/* Financial Year Selector */}
          <div className="flex items-center bg-white rounded-lg border border-slate-200 px-3 py-1.5 shadow-xs text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400 mr-2" />
            <span>Financial Year:</span>
            <select
              value={selectedFY}
              onChange={e => setSelectedFY(e.target.value)}
              className="ml-1 font-bold text-[#1F2A52] bg-transparent outline-none cursor-pointer"
            >
              <option value="2026-27">FY 2026–27 (Current)</option>
              <option value="2025-26">FY 2025–26</option>
              <option value="ALL">All Financial Years</option>
            </select>
          </div>

          {/* Download Latest Payslip Action */}
          <button
            onClick={() => handleDownloadPDF(latestPayslip)}
            disabled={downloadingId === latestPayslip.id}
            className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white text-[13px] font-bold rounded-lg shadow-xs flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
          >
            {downloadingId === latestPayslip.id ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Preparing PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Latest Payslip</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. SALARY OVERVIEW & SPOTLIGHT BANNER                                */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left: Latest Month Spotlight Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Latest Payroll</span>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">{latestPayslip.month} Statement</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Processed on {latestPayslip.paymentDate}</span>
              </span>
            </div>
          </div>

          {/* Salary Breakdown Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
            
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Gross Earnings</span>
              <p className="text-xl font-mono font-bold text-slate-900">
                {formatCurrency(latestPayslip.grossEarnings)}
              </p>
              <span className="text-[10px] text-slate-400 block">Base salary + allowances</span>
            </div>

            <div className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">Total Deductions</span>
              <p className="text-xl font-mono font-bold text-rose-700">
                -{formatCurrency(latestPayslip.totalDeductions)}
              </p>
              <span className="text-[10px] text-rose-500 block">PF, TDS & Insurance</span>
            </div>

            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">Net Disbursed</span>
              <p className="text-2xl font-mono font-extrabold text-emerald-700">
                {formatCurrency(latestPayslip.netPay)}
              </p>
              <span className="text-[10px] text-emerald-600 font-medium block">Transferred to HDFC •••• 8842</span>
            </div>

          </div>

          {/* Action Bar */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-500 italic text-[11px]">
              Net Pay = Gross Earnings (₹85,000) − Total Deductions (₹8,600)
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedPayslip(latestPayslip)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#1F2A52] font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Payslip</span>
              </button>

              <button
                onClick={() => handleDownloadPDF(latestPayslip)}
                className="px-3.5 py-1.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Year-to-Date (YTD) Summary Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-[15px] font-bold text-[#1F2A52]">Year-to-Date (YTD)</h3>
              <p className="text-[11px] text-slate-400">Fiscal Year {selectedFY} Summary</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {ytdStats.count} Payslips
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
              <span className="text-slate-500">YTD Gross Earnings:</span>
              <span className="font-mono font-bold text-slate-800">{formatCurrency(ytdStats.gross)}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
              <span className="text-slate-500">YTD Tax & Statutory Deductions:</span>
              <span className="font-mono font-bold text-rose-600">-{formatCurrency(ytdStats.deductions)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="font-bold text-emerald-900">YTD Net Pay Disbursed:</span>
              <span className="font-mono font-extrabold text-base text-emerald-700">
                {formatCurrency(ytdStats.net)}
              </span>
            </div>
          </div>

          {/* Privacy Footnote */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Salary information is private and visible only to you.</span>
          </div>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* 3. MAIN NAVIGATION TABS                                              */}
      {/* ==================================================================== */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'history', label: 'Payslip History', icon: Receipt, count: filteredPayslips.length },
          { id: 'structure', label: 'Salary Structure (Read-Only)', icon: Layers },
          { id: 'revisions', label: 'Salary Revision History', icon: TrendingUp },
          { id: 'tax', label: 'Tax & Statutory Filings', icon: Landmark }
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

      {/* ==================================================================== */}
      {/* TAB 1: PAYSLIP HISTORY TABLE                                         */}
      {/* ==================================================================== */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          
          {/* Controls Bar: Search & Status Filter */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by month or slip ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Status:</span>
              {['ALL', 'PROCESSED', 'PENDING'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#1F2A52] text-white'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#1F2A52]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* History Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/75">
                    <th className="py-3 px-4">PAYSLIP MONTH</th>
                    <th className="py-3 px-3">PAY PERIOD</th>
                    <th className="py-3 px-3">GROSS EARNINGS</th>
                    <th className="py-3 px-3">DEDUCTIONS</th>
                    <th className="py-3 px-3">NET PAY</th>
                    <th className="py-3 px-3">PAYMENT DATE</th>
                    <th className="py-3 px-3">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPayslips.map(slip => (
                    <tr key={slip.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-[#1F2A52]">
                        <span>{slip.month}</span>
                        <span className="font-mono text-[10px] text-slate-400 block font-normal">{slip.id}</span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-600 text-xs">
                        {slip.payPeriod}
                      </td>

                      <td className="py-3.5 px-3 font-mono font-semibold text-slate-800">
                        {formatCurrency(slip.grossEarnings)}
                      </td>

                      <td className="py-3.5 px-3 font-mono text-rose-600 font-medium">
                        -{formatCurrency(slip.totalDeductions)}
                      </td>

                      <td className="py-3.5 px-3 font-mono font-extrabold text-emerald-700">
                        {formatCurrency(slip.netPay)}
                      </td>

                      <td className="py-3.5 px-3 text-slate-600 text-xs">
                        {slip.paymentDate}
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block">
                          {slip.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedPayslip(slip)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-horilla-primary hover:text-white text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDownloadPDF(slip)}
                          disabled={downloadingId === slip.id}
                          className="p-1 text-slate-500 hover:text-horilla-primary hover:bg-slate-100 rounded-lg transition cursor-pointer"
                          title="Download Statement"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredPayslips.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        <Receipt className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold text-slate-600">No payslips match your search</p>
                        <p className="text-xs text-slate-400 mt-0.5">Try changing financial year or clearing filters</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: SALARY STRUCTURE BREAKDOWN (READ-ONLY)                         */}
      {/* ==================================================================== */}
      {activeTab === 'structure' && (
        <div className="space-y-6">
          
          {/* Read-Only Notice Bar */}
          <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>Official Compensation Structure:</strong> Calculated as per company band policy. (Read-only for employee self-service).
              </span>
            </div>
            <span className="font-bold text-blue-800 uppercase text-[10px] bg-blue-100 px-2 py-0.5 rounded">
              Band L4 Engineer
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Earnings Breakdown */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-[#1F2A52]">Monthly & Annual Earnings Structure</h3>
                  <p className="text-xs text-slate-500">Itemized allowance components</p>
                </div>
                <span className="font-mono font-bold text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded">
                  Gross: {formatCurrency(SALARY_STRUCTURE.monthlyGross)}/mo
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {SALARY_STRUCTURE.earnings.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#1F2A52] block">{item.component}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Taxable: {item.taxable ? 'Yes' : 'Exempted allowance'}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-900 block">{formatCurrency(item.monthly)}/mo</span>
                      <span className="text-[10px] font-mono text-slate-400">{formatCurrency(item.annual)}/yr</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deductions Breakdown */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-[#1F2A52]">Statutory & Tax Withholdings</h3>
                  <p className="text-xs text-slate-500">Applicable mandatory deductions</p>
                </div>
                <span className="font-mono font-bold text-xs bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded">
                  Deductions: -{formatCurrency(8600)}/mo
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {SALARY_STRUCTURE.deductions.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#1F2A52] block">{item.component}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Category: {item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-rose-600 block">-{formatCurrency(item.monthly)}/mo</span>
                      <span className="text-[10px] font-mono text-slate-400">-{formatCurrency(item.annual)}/yr</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-900">Net Take-Home Salary:</span>
                <span className="font-mono font-extrabold text-base text-emerald-700">
                  {formatCurrency(SALARY_STRUCTURE.monthlyNet)} / month
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: SALARY REVISION HISTORY                                       */}
      {/* ==================================================================== */}
      {activeTab === 'revisions' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-[15px] font-bold text-[#1F2A52]">Salary Revision & Appraisal History</h3>
            <p className="text-xs text-slate-500">Historical compensation changes verified and recorded by HR</p>
          </div>

          <div className="space-y-4">
            {SALARY_REVISION_HISTORY.map((rev, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1F2A52] text-sm">{rev.changeType}</span>
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Gross: {formatCurrency(rev.revisedGross)}/mo
                    </span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">Effective: {rev.effectiveDate}</span>
                </div>

                <p className="text-slate-600">{rev.remarks}</p>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Authorized by: <strong className="text-slate-700">{rev.approvedBy}</strong></span>
                  <span>Annual CTC: <strong className="text-slate-700 font-mono">{formatCurrency(rev.revisedCTC)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: TAX & STATUTORY FILINGS                                       */}
      {/* ==================================================================== */}
      {activeTab === 'tax' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-bold text-[#1F2A52] text-[15px]">Statutory Tax Identifiers</h4>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-500">Income Tax PAN:</span>
                <span className="font-mono font-bold text-slate-900">{EMPLOYEE_PROFILE.panNumber}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-500">Universal Account No (UAN):</span>
                <span className="font-mono font-bold text-slate-900">{EMPLOYEE_PROFILE.uanNumber}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-500">PF Account Number:</span>
                <span className="font-mono font-bold text-slate-900">{EMPLOYEE_PROFILE.pfNumber}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-500">Tax Regime Selected:</span>
                <span className="font-semibold text-indigo-700">{EMPLOYEE_PROFILE.taxRegime}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-bold text-[#1F2A52] text-[15px]">Bank Disbursement Details</h4>
              <Landmark className="w-4 h-4 text-blue-600" />
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-500">Beneficiary Bank:</span>
                <span className="font-bold text-slate-900">{EMPLOYEE_PROFILE.bankName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-500">Account Number:</span>
                <span className="font-mono font-bold text-slate-900">{EMPLOYEE_PROFILE.bankAccount}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-500">IFSC Code:</span>
                <span className="font-mono font-bold text-slate-900">{EMPLOYEE_PROFILE.ifscCode}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                <span className="text-slate-500">Disbursement Mode:</span>
                <span className="font-semibold text-emerald-700">Direct Deposit (ACH / NEFT)</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. DEDICATED PAYSLIP DOCUMENT PREVIEW MODAL & PRINT VIEW             */}
      {/* ==================================================================== */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-8 shadow-2xl border border-slate-200 space-y-6 my-8 animate-modal-pop relative text-slate-900">
            
            {/* Modal Controls Bar (Hidden during window.print()) */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {selectedPayslip.id}
                </span>
                <span className="text-xs font-semibold text-slate-500">Official Payslip Statement</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintSlip}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>

                <button
                  onClick={() => handleDownloadPDF(selectedPayslip)}
                  className="px-3.5 py-1.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1.5 shadow-xs transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Text Slip</span>
                </button>

                <button
                  onClick={() => setSelectedPayslip(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ================================================================ */}
            {/* OFFICIAL PAYSLIP DOCUMENT LETTERHEAD                              */}
            {/* ================================================================ */}
            <div className="border border-slate-300 rounded-xl p-6 sm:p-8 space-y-6 bg-white text-xs" id="printable-payslip">
              
              {/* Brand Letterhead */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-slate-800 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-horilla-primary text-white font-extrabold flex items-center justify-center text-sm">
                      D
                    </div>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-[#1F2A52]">DAYFLOW</h2>
                      <p className="text-[11px] text-slate-500">Every workday, perfectly aligned.</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">SALARY SLIP</h3>
                  <p className="text-xs font-semibold text-slate-600">{selectedPayslip.month}</p>
                  <p className="text-[11px] text-slate-400">Statement ID: {selectedPayslip.id}</p>
                </div>
              </div>

              {/* Employee & Payment Details Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Employee Name</span>
                  <span className="font-bold text-slate-900">{EMPLOYEE_PROFILE.name}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Employee ID</span>
                  <span className="font-mono font-bold text-slate-900">{EMPLOYEE_PROFILE.employeeId}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Department</span>
                  <span className="font-medium text-slate-800">{EMPLOYEE_PROFILE.department}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Designation</span>
                  <span className="font-medium text-slate-800">{EMPLOYEE_PROFILE.designation}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Bank Account</span>
                  <span className="font-mono text-slate-800">{EMPLOYEE_PROFILE.bankAccount}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Bank & IFSC</span>
                  <span className="font-mono text-slate-800">{EMPLOYEE_PROFILE.ifscCode}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pay Period</span>
                  <span className="text-slate-800">{selectedPayslip.payPeriod}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Payment Date</span>
                  <span className="font-bold text-emerald-700">{selectedPayslip.paymentDate}</span>
                </div>
              </div>

              {/* Earnings & Deductions Split Tables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Earnings Subtable */}
                <div className="space-y-2">
                  <div className="pb-1.5 border-b border-slate-300 font-bold text-slate-900 flex justify-between">
                    <span>EARNINGS COMPONENT</span>
                    <span>AMOUNT</span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedPayslip.earningsBreakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-dashed border-slate-100">
                        <span className="text-slate-600">{item.name}</span>
                        <span className="font-mono font-semibold text-slate-900">{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t-2 border-slate-300 flex justify-between font-bold text-slate-900">
                    <span>TOTAL GROSS EARNINGS</span>
                    <span className="font-mono">{formatCurrency(selectedPayslip.grossEarnings)}</span>
                  </div>
                </div>

                {/* Deductions Subtable */}
                <div className="space-y-2">
                  <div className="pb-1.5 border-b border-slate-300 font-bold text-slate-900 flex justify-between">
                    <span>DEDUCTIONS COMPONENT</span>
                    <span>AMOUNT</span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedPayslip.deductionsBreakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-dashed border-slate-100">
                        <span className="text-slate-600">{item.name}</span>
                        <span className="font-mono font-semibold text-rose-600">-{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t-2 border-slate-300 flex justify-between font-bold text-rose-700">
                    <span>TOTAL DEDUCTIONS</span>
                    <span className="font-mono">-{formatCurrency(selectedPayslip.totalDeductions)}</span>
                  </div>
                </div>

              </div>

              {/* Net Disbursed Highlight Banner */}
              <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Net Salary Disbursed (Take-Home)
                  </span>
                  <span className="text-2xl font-mono font-extrabold text-emerald-400">
                    {formatCurrency(selectedPayslip.netPay)}
                  </span>
                </div>

                <div className="text-right text-slate-300 text-[11px]">
                  <p>In Words: <strong>Rupees Seventy-Six Thousand Four Hundred Only</strong></p>
                  <p className="text-emerald-400 font-semibold">Payment Status: Processed via Direct ACH</p>
                </div>
              </div>

              {/* Legal Footer Note */}
              <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 space-y-1">
                <p>This is a system-generated salary statement and does not require a physical signature.</p>
                <p>Dayflow Technologies India Pvt Ltd • Corporate Office: Tech Park, Pune 411014</p>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedPayslip(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
              >
                Close Statement
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyPayslips;

import React, { useState, useMemo } from 'react';
import { exportToCSV } from '../../utils';

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
  AlertCircle,
  Receipt,
  Landmark,
  FileSpreadsheet,
  Coins,
  ChevronRight,
  Lock,
  Unlock,
  RefreshCw,
  Eye,
  Calendar,
  Sparkles,
  Sliders,
  HelpCircle,
  Paperclip,
  CheckCheck
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
  Legend,
  LineChart,
  Line
} from 'recharts';

export const PayrollAnalyticsPage = () => {
  // Navigation & Period State - Analytics as the FIRST and DEFAULT tab
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'structures' | 'reimbursements' | 'advances' | 'compliance'
  const [selectedPeriod, setSelectedPeriod] = useState('August 2026');
  const [isCycleLocked, setIsCycleLocked] = useState(false);
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPayslipModalOpen, setIsPayslipModalOpen] = useState(false);
  const [isBatchProcessModalOpen, setIsBatchProcessModalOpen] = useState(false);
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);

  // Selected Entities
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Structure Form Fields (Deep Itemized Breakdown)
  const [formBase, setFormBase] = useState(0);
  const [formHra, setFormHra] = useState(0);
  const [formSpecial, setFormSpecial] = useState(0);
  const [formConveyance, setFormConveyance] = useState(0);
  const [formMedical, setFormMedical] = useState(0);
  const [formBonus, setFormBonus] = useState(0);
  const [formPf, setFormPf] = useState(0);
  const [formTax, setFormTax] = useState(0);
  const [formInsurance, setFormInsurance] = useState(0);
  const [formLoanEmi, setFormLoanEmi] = useState(0);
  const [formLopDays, setFormLopDays] = useState(0);
  const [formTaxRegime, setFormTaxRegime] = useState('New Regime (Default)');

  // Bonus Form
  const [bonusAmount, setBonusAmount] = useState(500);
  const [bonusReason, setBonusReason] = useState('Q3 Performance Spot Award');

  // Hold Reason Form
  const [holdReason, setHoldReason] = useState('Pending bank account re-verification');

  // New Reimbursement Claim Form
  const [claimEmpId, setClaimEmpId] = useState('');
  const [claimCategory, setClaimCategory] = useState('Client Travel & Meals');
  const [claimAmount, setClaimAmount] = useState(150);
  const [claimDesc, setClaimDesc] = useState('');

  // New Loan/Advance Form
  const [loanEmpId, setLoanEmpId] = useState('');
  const [loanTotal, setLoanTotal] = useState(3000);
  const [loanTenure, setLoanTenure] = useState(6);
  const [loanReason, setLoanReason] = useState('Emergency medical expense');

  // ----------------------------------------------------
  // Primary Employee Compensation State (Full Enterprise Fields)
  // ----------------------------------------------------
  const [employees, setEmployees] = useState([
    {
      id: 'DAY-HR-2026-0001',
      name: 'Adam Admin',
      dept: 'Executive',
      role: 'Chief HR Officer',
      avatar: 'AA',
      empType: 'Full-time Permanent',
      taxRegime: 'New Regime (Default)',
      ctcAnnual: 168000,
      basePay: 10000,
      hra: 2000,
      special: 800,
      conveyance: 300,
      medical: 200,
      bonus: 1000,
      lopDays: 0,
      lopDeduction: 0,
      pf: 800,
      tax: 1200,
      insurance: 150,
      loanEmi: 0,
      netPay: 12150,
      status: 'Disbursed',
      bankAccount: '•••• •••• 4092',
      bankName: 'JPMorgan Chase USA',
      ifsc: 'CHASUS33',
      panNo: 'ADMPA1009K',
      disbursedDate: 'Aug 20, 2026',
      holdReason: ''
    },
    {
      id: 'DAY-SJ-2026-0012',
      name: 'Sarah Jenkins',
      dept: 'Engineering',
      role: 'Lead Cloud Architect',
      avatar: 'SJ',
      empType: 'Full-time Permanent',
      taxRegime: 'New Regime (Default)',
      ctcAnnual: 135000,
      basePay: 8200,
      hra: 1640,
      special: 600,
      conveyance: 250,
      medical: 150,
      bonus: 600,
      lopDays: 0,
      lopDeduction: 0,
      pf: 656,
      tax: 980,
      insurance: 120,
      loanEmi: 0,
      netPay: 9684,
      status: 'Disbursed',
      bankAccount: '•••• •••• 8821',
      bankName: 'Bank of America',
      ifsc: 'BOFAUS3N',
      panNo: 'SJENK4412L',
      disbursedDate: 'Aug 20, 2026',
      holdReason: ''
    },
    {
      id: 'DAY-AR-2026-0045',
      name: 'Alex Rivera',
      dept: 'Product Design',
      role: 'Staff UI/UX Designer',
      avatar: 'AR',
      empType: 'Full-time Permanent',
      taxRegime: 'Old Regime (Exemptions)',
      ctcAnnual: 120000,
      basePay: 7400,
      hra: 1480,
      special: 400,
      conveyance: 200,
      medical: 150,
      bonus: 400,
      lopDays: 0,
      lopDeduction: 0,
      pf: 592,
      tax: 820,
      insurance: 120,
      loanEmi: 250, // Active Loan EMI
      netPay: 8248,
      status: 'Disbursed',
      bankAccount: '•••• •••• 3145',
      bankName: 'Wells Fargo Bank',
      ifsc: 'WFBIUS6S',
      panNo: 'ARIVE9011P',
      disbursedDate: 'Aug 20, 2026',
      holdReason: ''
    },
    {
      id: 'DAY-DC-2026-0008',
      name: 'David Chen',
      dept: 'Human Resources',
      role: 'Senior Talent Partner',
      avatar: 'DC',
      empType: 'Full-time Permanent',
      taxRegime: 'New Regime (Default)',
      ctcAnnual: 105000,
      basePay: 6500,
      hra: 1300,
      special: 350,
      conveyance: 200,
      medical: 100,
      bonus: 300,
      lopDays: 0,
      lopDeduction: 0,
      pf: 520,
      tax: 720,
      insurance: 100,
      loanEmi: 0,
      netPay: 7410,
      status: 'Disbursed',
      bankAccount: '•••• •••• 9920',
      bankName: 'Citibank NA',
      ifsc: 'CITIUS33',
      panNo: 'DCHEN3381M',
      disbursedDate: 'Aug 20, 2026',
      holdReason: ''
    },
    {
      id: 'DAY-EW-2026-0033',
      name: 'Emma Watson',
      dept: 'Operations',
      role: 'Operations & Logistics Lead',
      avatar: 'EW',
      empType: 'Full-time Permanent',
      taxRegime: 'New Regime (Default)',
      ctcAnnual: 98000,
      basePay: 6000,
      hra: 1200,
      special: 300,
      conveyance: 150,
      medical: 100,
      bonus: 200,
      lopDays: 1, // 1 Day LOP unapproved absence
      lopDeduction: 200,
      pf: 480,
      tax: 640,
      insurance: 100,
      loanEmi: 0,
      netPay: 6430,
      status: 'Pending',
      bankAccount: '•••• •••• 1104',
      bankName: 'Silicon Valley Bank',
      ifsc: 'SVBKUS2S',
      panNo: 'EWATS7720Q',
      disbursedDate: '--',
      holdReason: ''
    },
    {
      id: 'DAY-ER-2026-0012',
      name: 'Elena Rostova',
      dept: 'Engineering',
      role: 'Senior Backend Engineer',
      avatar: 'ER',
      empType: 'Full-time Permanent',
      taxRegime: 'New Regime (Default)',
      ctcAnnual: 118000,
      basePay: 7200,
      hra: 1440,
      special: 400,
      conveyance: 200,
      medical: 120,
      bonus: 350,
      lopDays: 0,
      lopDeduction: 0,
      pf: 576,
      tax: 810,
      insurance: 120,
      loanEmi: 0,
      netPay: 8204,
      status: 'Disbursed',
      bankAccount: '•••• •••• 6610',
      bankName: 'Morgan Stanley Wealth',
      ifsc: 'MSWDUS44',
      panNo: 'EROST5502R',
      disbursedDate: 'Aug 20, 2026',
      holdReason: ''
    },
    {
      id: 'DAY-AM-2026-0051',
      name: 'Alice Murphy',
      dept: 'Marketing',
      role: 'Growth Marketing Manager',
      avatar: 'AM',
      empType: 'Full-time Permanent',
      taxRegime: 'New Regime (Default)',
      ctcAnnual: 110000,
      basePay: 6800,
      hra: 1360,
      special: 400,
      conveyance: 200,
      medical: 100,
      bonus: 500,
      lopDays: 0,
      lopDeduction: 0,
      pf: 544,
      tax: 770,
      insurance: 100,
      loanEmi: 0,
      netPay: 7946,
      status: 'Disbursed',
      bankAccount: '•••• •••• 5531',
      bankName: 'Barclays US',
      ifsc: 'BARCUS22',
      panNo: 'AMURP2219S',
      disbursedDate: 'Aug 20, 2026',
      holdReason: ''
    },
    {
      id: 'DAY-JS-2026-0077',
      name: 'John Smith',
      dept: 'Sales',
      role: 'Enterprise Account Exec',
      avatar: 'JS',
      empType: 'Full-time Permanent',
      taxRegime: 'Old Regime (Exemptions)',
      ctcAnnual: 125000,
      basePay: 6200,
      hra: 1240,
      special: 300,
      conveyance: 200,
      medical: 100,
      bonus: 1400, // Sales commission
      lopDays: 2, // 2 Unapproved absences
      lopDeduction: 413,
      pf: 496,
      tax: 820,
      insurance: 100,
      loanEmi: 300,
      netPay: 7311,
      status: 'On Hold',
      bankAccount: '•••• •••• 7712',
      bankName: 'Capital One Bank',
      ifsc: 'CAPOUS99',
      panNo: 'JSMIT8841T',
      disbursedDate: '--',
      holdReason: 'Awaiting updated tax declaration for overseas commissions'
    }
  ]);

  // ----------------------------------------------------
  // Reimbursements Claims State
  // ----------------------------------------------------
  const [reimbursements, setReimbursements] = useState([
    {
      id: 'EXP-8801',
      empId: 'DAY-AR-2026-0045',
      name: 'Alex Rivera',
      dept: 'Product Design',
      category: 'Design Tools & Figma Annual License',
      amount: 540,
      submittedOn: 'Aug 14, 2026',
      receipt: 'figma_enterprise_receipt.pdf',
      status: 'Approved',
      includedInPayroll: true,
      notes: 'Pre-approved by VP of Product'
    },
    {
      id: 'EXP-8802',
      name: 'Sarah Jenkins',
      empId: 'DAY-SJ-2026-0012',
      dept: 'Engineering',
      category: 'AWS Cloud Summit Travel & Hotel',
      amount: 820,
      submittedOn: 'Aug 18, 2026',
      receipt: 'hotel_boarding_pass.pdf',
      status: 'Approved',
      includedInPayroll: true,
      notes: 'Keynote Speaker representation'
    },
    {
      id: 'EXP-8803',
      name: 'John Smith',
      empId: 'DAY-JS-2026-0077',
      dept: 'Sales',
      category: 'Client Dinner & Entertainment',
      amount: 290,
      submittedOn: 'Aug 21, 2026',
      receipt: 'steakhouse_dinner_bill.jpg',
      status: 'Pending',
      includedInPayroll: false,
      notes: 'Quarterly client renewal meeting'
    }
  ]);

  // ----------------------------------------------------
  // Company Loans & Salary Advances State
  // ----------------------------------------------------
  const [loans, setLoans] = useState([
    {
      id: 'LN-501',
      empId: 'DAY-AR-2026-0045',
      name: 'Alex Rivera',
      dept: 'Product Design',
      principal: 3000,
      monthlyEmi: 250,
      tenureMonths: 12,
      paidMonths: 4,
      balanceRemaining: 2000,
      disbursedDate: 'Apr 2026',
      reason: 'Home Relocation Advance',
      status: 'Active'
    },
    {
      id: 'LN-502',
      empId: 'DAY-JS-2026-0077',
      name: 'John Smith',
      dept: 'Sales',
      principal: 3600,
      monthlyEmi: 300,
      tenureMonths: 12,
      paidMonths: 6,
      balanceRemaining: 1800,
      disbursedDate: 'Feb 2026',
      reason: 'Medical Emergency Support',
      status: 'Active'
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ----------------------------------------------------
  // Computed Financial Intelligence KPIs
  // ----------------------------------------------------
  const totalEmployees = employees.length;
  const totalGrossPayroll = employees.reduce(
    (sum, e) =>
      sum + (e.basePay + e.hra + e.special + e.conveyance + e.medical + e.bonus),
    0
  );
  const totalNetPayroll = employees.reduce((sum, e) => sum + e.netPay, 0);
  const totalTaxWithholdings = employees.reduce((sum, e) => sum + e.tax, 0);
  const totalPfDeductions = employees.reduce((sum, e) => sum + e.pf, 0);
  const totalInsurance = employees.reduce((sum, e) => sum + e.insurance, 0);
  const totalLoanDeductions = employees.reduce((sum, e) => sum + e.loanEmi, 0);
  const totalLopDeductions = employees.reduce((sum, e) => sum + e.lopDeduction, 0);
  const averageNetSalary = Math.round(totalNetPayroll / totalEmployees);
  const disbursedCount = employees.filter(e => e.status === 'Disbursed').length;
  const onHoldCount = employees.filter(e => e.status === 'On Hold').length;
  const pendingCount = employees.filter(e => e.status === 'Pending').length;

  // Chart 1: Department Payroll Expenditure
  const deptPayrollChart = useMemo(() => {
    const map = {};
    employees.forEach(e => {
      if (!map[e.dept]) map[e.dept] = 0;
      map[e.dept] += e.netPay;
    });
    return Object.keys(map).map(dept => ({
      name: dept,
      netPay: map[dept],
      headcount: employees.filter(e => e.dept === dept).length
    }));
  }, [employees]);

  // Chart 2: Itemized Composition Breakdown Pie
  const compensationCompositionData = [
    { name: 'Basic Wages', value: employees.reduce((s, e) => s + e.basePay, 0), color: '#3B82F6' },
    { name: 'HRA (House Rent)', value: employees.reduce((s, e) => s + e.hra, 0), color: '#10B981' },
    { name: 'Special & Medical Allowances', value: employees.reduce((s, e) => s + (e.special + e.conveyance + e.medical), 0), color: '#F59E0B' },
    { name: 'Variable Performance Bonus', value: employees.reduce((s, e) => s + e.bonus, 0), color: '#EC4899' },
    { name: 'Income Tax TDS (Remitted)', value: totalTaxWithholdings, color: '#E9573F' },
    { name: 'PF & Retirement Match', value: totalPfDeductions, color: '#9333EA' }
  ];

  // Chart 3: 12-Month Payroll Trend
  const annualPayrollTrendData = [
    { month: 'Sep 25', gross: 68000, net: 54000, tax: 6800 },
    { month: 'Nov 25', gross: 70500, net: 56100, tax: 7100 },
    { month: 'Jan 26', gross: 72000, net: 57400, tax: 7350 },
    { month: 'Mar 26', gross: 73200, net: 58200, tax: 7500 },
    { month: 'May 26', gross: 74800, net: 59600, tax: 7700 },
    { month: 'Jul 26', gross: 75500, net: 60100, tax: 7800 },
    { month: 'Aug 26', gross: totalGrossPayroll, net: totalNetPayroll, tax: totalTaxWithholdings }
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

  // ----------------------------------------------------
  // Dynamic Structure Calculation Engine
  // ----------------------------------------------------
  const handleBaseChange = (val) => {
    const base = Number(val) || 0;
    setFormBase(base);
    // Standard HR compensation formulas
    setFormHra(Math.round(base * 0.20));
    setFormSpecial(Math.round(base * 0.06));
    setFormConveyance(200);
    setFormMedical(150);
    setFormPf(Math.round(base * 0.08));
    setFormTax(Math.round(base * 0.11));
    setFormInsurance(120);
  };

  const computedGross =
    Number(formBase) +
    Number(formHra) +
    Number(formSpecial) +
    Number(formConveyance) +
    Number(formMedical) +
    Number(formBonus);

  const computedDailyRate = formBase > 0 ? formBase / 30 : 0;
  const computedLopDeduction = Math.round(computedDailyRate * Number(formLopDays));

  const computedTotalDeductions =
    Number(formPf) +
    Number(formTax) +
    Number(formInsurance) +
    Number(formLoanEmi) +
    computedLopDeduction;

  const computedNet = Math.max(0, computedGross - computedTotalDeductions);
  const computedAnnualCtc = Math.round((computedGross + Number(formPf)) * 12);

  // Open Edit Structure Modal
  const openEditStructureModal = (emp) => {
    setSelectedEmployee(emp);
    setFormBase(emp.basePay);
    setFormHra(emp.hra);
    setFormSpecial(emp.special);
    setFormConveyance(emp.conveyance);
    setFormMedical(emp.medical);
    setFormBonus(emp.bonus);
    setFormPf(emp.pf);
    setFormTax(emp.tax);
    setFormInsurance(emp.insurance);
    setFormLoanEmi(emp.loanEmi);
    setFormLopDays(emp.lopDays);
    setFormTaxRegime(emp.taxRegime);
    setIsEditModalOpen(true);
  };

  // Save Modified Salary Structure
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
            special: Number(formSpecial),
            conveyance: Number(formConveyance),
            medical: Number(formMedical),
            bonus: Number(formBonus),
            pf: Number(formPf),
            tax: Number(formTax),
            insurance: Number(formInsurance),
            loanEmi: Number(formLoanEmi),
            lopDays: Number(formLopDays),
            lopDeduction: computedLopDeduction,
            taxRegime: formTaxRegime,
            ctcAnnual: computedAnnualCtc,
            netPay: computedNet
          };
        }
        return emp;
      })
    );

    setIsEditModalOpen(false);
    showToast(`Salary structure & tax regime updated for ${selectedEmployee.name}`);
  };

  // Open Quick Bonus Modal
  const openBonusModal = (emp) => {
    setSelectedEmployee(emp);
    setBonusAmount(500);
    setBonusReason('Q3 Performance Spot Award');
    setIsBonusModalOpen(true);
  };

  const handleGrantBonus = (e) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === selectedEmployee.id) {
          const newBonus = emp.bonus + Number(bonusAmount);
          const newGross = emp.basePay + emp.hra + emp.special + emp.conveyance + emp.medical + newBonus;
          const newNet = newGross - (emp.pf + emp.tax + emp.insurance + emp.loanEmi + emp.lopDeduction);
          return {
            ...emp,
            bonus: newBonus,
            netPay: newNet
          };
        }
        return emp;
      })
    );

    setIsBonusModalOpen(false);
    showToast(`$${bonusAmount} variable bonus credited to ${selectedEmployee.name}`);
  };

  // Open Hold Modal
  const openHoldModal = (emp) => {
    setSelectedEmployee(emp);
    setHoldReason('Awaiting updated tax residency declaration');
    setIsHoldModalOpen(true);
  };

  const handleApplyHold = (e) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === selectedEmployee.id) {
          return {
            ...emp,
            status: 'On Hold',
            holdReason: holdReason,
            disbursedDate: '--'
          };
        }
        return emp;
      })
    );

    setIsHoldModalOpen(false);
    showToast(`Salary disbursement for ${selectedEmployee.name} put On Hold.`);
  };

  const handleReleaseHold = (emp) => {
    setEmployees(prev =>
      prev.map(e => {
        if (e.id === emp.id) {
          return {
            ...e,
            status: 'Pending',
            holdReason: ''
          };
        }
        return e;
      })
    );
    showToast(`Salary hold released for ${emp.name}. Status is now Pending.`);
  };

  // Open Official Payslip Modal
  const openPayslipModal = (emp) => {
    setSelectedEmployee(emp);
    setIsPayslipModalOpen(true);
  };

  // Print Payslip
  const handlePrintPayslip = () => {
    window.print();
  };

  // Batch Disburse All Active
  const handleBatchDisburse = () => {
    setEmployees(prev =>
      prev.map(e => ({
        ...e,
        status: e.status === 'On Hold' ? 'On Hold' : 'Disbursed',
        disbursedDate: e.status === 'On Hold' ? '--' : 'Aug 22, 2026'
      }))
    );
    setIsBatchProcessModalOpen(false);
    showToast(`Payroll disbursement cycle executed. ACH files generated.`);
  };

  // Toggle Cycle Lock
  const handleToggleCycleLock = () => {
    setIsCycleLocked(prev => !prev);
    showToast(!isCycleLocked ? 'August 2026 Payroll Cycle Locked.' : 'Payroll Cycle unlocked for modifications.');
  };

  // Reimbursement Actions
  const handleReimbursementAction = (id, newStatus) => {
    setReimbursements(prev =>
      prev.map(claim => {
        if (claim.id === id) {
          return {
            ...claim,
            status: newStatus,
            includedInPayroll: newStatus === 'Approved'
          };
        }
        return claim;
      })
    );

    // If approved, auto-add to employee's allowances for current cycle
    const targetClaim = reimbursements.find(c => c.id === id);
    if (targetClaim && newStatus === 'Approved') {
      setEmployees(prev =>
        prev.map(emp => {
          if (emp.id === targetClaim.empId) {
            const newSpecial = emp.special + targetClaim.amount;
            const newGross = emp.basePay + emp.hra + newSpecial + emp.conveyance + emp.medical + emp.bonus;
            const newNet = newGross - (emp.pf + emp.tax + emp.insurance + emp.loanEmi + emp.lopDeduction);
            return {
              ...emp,
              special: newSpecial,
              netPay: newNet
            };
          }
          return emp;
        })
      );
    }

    showToast(`Expense claim ${id} marked as ${newStatus}.`);
  };

  // Create Reimbursement Claim
  const handleCreateClaim = (e) => {
    e.preventDefault();
    if (!claimEmpId) {
      alert('Please select an employee');
      return;
    }
    const empObj = employees.find(e => e.id === claimEmpId);
    const newClaim = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      empId: claimEmpId,
      name: empObj ? empObj.name : 'Staff Member',
      dept: empObj ? empObj.dept : 'Engineering',
      category: claimCategory,
      amount: Number(claimAmount),
      submittedOn: 'Aug 22, 2026',
      receipt: 'invoice_attachment.pdf',
      status: 'Approved',
      includedInPayroll: true,
      notes: claimDesc || 'Employee submitted expense claim'
    };

    setReimbursements(prev => [newClaim, ...prev]);
    setIsClaimModalOpen(false);
    showToast(`Reimbursement claim recorded and approved for ${newClaim.name}.`);
  };

  // Create Loan / Advance
  const handleCreateLoan = (e) => {
    e.preventDefault();
    if (!loanEmpId) {
      alert('Please select an employee');
      return;
    }
    const empObj = employees.find(e => e.id === loanEmpId);
    const monthlyEmi = Math.round(Number(loanTotal) / Number(loanTenure));
    const newLoan = {
      id: `LN-${Date.now().toString().slice(-3)}`,
      empId: loanEmpId,
      name: empObj ? empObj.name : 'Staff Member',
      dept: empObj ? empObj.dept : 'Executive',
      principal: Number(loanTotal),
      monthlyEmi: monthlyEmi,
      tenureMonths: Number(loanTenure),
      paidMonths: 0,
      balanceRemaining: Number(loanTotal),
      disbursedDate: 'Aug 2026',
      reason: loanReason || 'Salary advance request',
      status: 'Active'
    };

    setLoans(prev => [newLoan, ...prev]);

    // Update employee EMI deduction
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === loanEmpId) {
          const newEmi = monthlyEmi;
          const newGross = emp.basePay + emp.hra + emp.special + emp.conveyance + emp.medical + emp.bonus;
          const newNet = newGross - (emp.pf + emp.tax + emp.insurance + newEmi + emp.lopDeduction);
          return {
            ...emp,
            loanEmi: newEmi,
            netPay: newNet
          };
        }
        return emp;
      })
    );

    setIsLoanModalOpen(false);
    showToast(`$${loanTotal} Salary advance granted to ${newLoan.name}. Monthly EMI: $${monthlyEmi}`);
  };

  // Export Bank Transfer Sheet CSV
  const handleExportBankSheet = () => {
    const columns = [
      { header: 'Employee ID', key: 'id' },
      { header: 'Employee Name', key: 'name' },
      { header: 'Department', key: 'dept' },
      { header: 'Bank Name', key: 'bankName' },
      { header: 'Account Number', key: 'bankAccount' },
      { header: 'IFSC/Routing', key: 'ifsc' },
      { header: 'PAN/SSN', key: 'panNo' },
      { header: 'Tax Regime', key: 'taxRegime' },
      { header: 'Monthly Net Pay', key: 'netPay' },
      { header: 'Status', key: 'status' },
    ];
    exportToCSV(`Dayflow_DirectDeposit_${selectedPeriod.replace(/\s+/g, '_')}`, employees, columns);
    showToast('Direct Deposit ACH bank transfer sheet exported.');
  };

  // Export Full Compensation Register CSV
  const handleExportFullRegister = () => {
    const columns = [
      { header: 'Employee ID', key: 'id' },
      { header: 'Name', key: 'name' },
      { header: 'Department', key: 'dept' },
      { header: 'Role', key: 'role' },
      { header: 'Annual CTC', key: 'ctcAnnual' },
      { header: 'Base Pay', key: 'basePay' },
      { header: 'HRA', key: 'hra' },
      { header: 'Special Allowance', key: 'special' },
      { header: 'Bonus', key: 'bonus' },
      { header: 'PF Deduct', key: 'pf' },
      { header: 'Tax (TDS)', key: 'tax' },
      { header: 'Net Take Home', key: 'netPay' },
      { header: 'Status', key: 'status' },
    ];
    exportToCSV(`Dayflow_Salary_Register_${selectedPeriod.replace(/\s+/g, '_')}`, employees, columns);
    showToast('Comprehensive salary register exported to CSV.');
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

      {/* Top Header & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[24px] font-bold text-[#333333] tracking-tight">Payroll & Compensation Engine</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {selectedPeriod}
            </span>
            {isCycleLocked ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Locked
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 flex items-center gap-1">
                <Unlock className="w-3 h-3" /> Active / Editable
              </span>
            )}
          </div>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Salary structures, attendance LOP deductions, expense reimbursements, advance loans, and ACH direct deposit
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Period Selector */}
          <select
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-[#333333] outline-none shadow-xs"
          >
            <option value="August 2026">August 2026 (Current)</option>
            <option value="July 2026">July 2026</option>
            <option value="June 2026">June 2026</option>
            <option value="May 2026">May 2026</option>
          </select>

          <button
            onClick={handleToggleCycleLock}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-[13px] rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition"
          >
            {isCycleLocked ? <Unlock className="w-4 h-4 text-blue-600" /> : <Lock className="w-4 h-4 text-slate-500" />}
            <span>{isCycleLocked ? 'Unlock Cycle' : 'Lock Cycle'}</span>
          </button>

          <button
            onClick={() => setIsBatchProcessModalOpen(true)}
            className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold text-[13px] rounded-lg shadow-xs cursor-pointer flex items-center gap-2 transition"
          >
            <CreditCard className="w-4 h-4" />
            <span>Run Monthly Payroll Batch</span>
          </button>

          <button
            onClick={handleExportBankSheet}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#333333] border border-slate-200 font-semibold text-[13px] rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition"
            title="Export Direct Deposit ACH CSV"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>ACH Bank Sheet</span>
          </button>

          <button
            onClick={handleExportFullRegister}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#333333] border border-slate-200 font-semibold text-[13px] rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition"
            title="Export Full Salary Register"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Salary Register</span>
          </button>
        </div>
      </div>

      {/* Financial Intelligence KPI Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Gross Payroll */}
        <div className="bg-[#1F2A52] text-white rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-[11px] font-bold uppercase tracking-wider">Gross Payroll Cost</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-sora text-2xl font-extrabold text-white mt-1.5">${totalGrossPayroll.toLocaleString()}</p>
          <p className="text-[11px] text-slate-300 font-mono mt-0.5">Annualized CTC: ${(totalGrossPayroll * 12).toLocaleString()}</p>
        </div>

        {/* Net Take Home */}
        <div className="bg-white border border-emerald-200 bg-emerald-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Net Disbursed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-sora text-2xl font-extrabold text-emerald-700 mt-1.5">${totalNetPayroll.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">{disbursedCount} of {totalEmployees} Transferred</p>
        </div>

        {/* Tax TDS Withholding */}
        <div className="bg-white border border-rose-200 bg-rose-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Income Tax (TDS)</span>
            <Percent className="w-4 h-4 text-rose-600" />
          </div>
          <p className="font-sora text-2xl font-extrabold text-rose-700 mt-1.5">${totalTaxWithholdings.toLocaleString()}</p>
          <p className="text-[11px] text-rose-600 font-medium mt-0.5">Form 24Q Ready</p>
        </div>

        {/* PF / 401k */}
        <div className="bg-white border border-purple-200 bg-purple-50/20 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-purple-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Provident Fund (PF)</span>
            <Coins className="w-4 h-4 text-purple-600" />
          </div>
          <p className="font-sora text-2xl font-extrabold text-purple-700 mt-1.5">${totalPfDeductions.toLocaleString()}</p>
          <p className="text-[11px] text-purple-600 font-medium mt-0.5">Match: ${(totalPfDeductions).toLocaleString()}</p>
        </div>

        {/* Status Counters */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Cycle Status</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-xl font-extrabold text-emerald-600">{disbursedCount} Done</span>
            <span className="text-xs font-bold text-amber-600">({pendingCount} Pending)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">{onHoldCount > 0 ? `${onHoldCount} On Hold` : 'Zero exceptions'}</p>
        </div>
      </div>

      {/* Main Sub-Navigation Tabs with Visual Analytics in FIRST Position */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'analytics', label: 'Payroll Visual Analytics', icon: BarChart3 },
          { id: 'structures', label: 'Salary Master & Structures', icon: Layers, count: filteredEmployees.length },
          { id: 'reimbursements', label: 'Reimbursements & Claims', icon: Receipt, count: reimbursements.filter(r => r.status === 'Pending').length, badgeColor: 'bg-amber-500' },
          { id: 'advances', label: 'Loans & Salary Advances', icon: Landmark, count: loans.length },
          { id: 'compliance', label: 'Tax & Statutory Filings', icon: ShieldCheck }
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
                <span
                  className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                    tab.badgeColor ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* TAB 1 (DEFAULT / FIRST): PAYROLL VISUAL ANALYTICS            */}
      {/* ============================================================ */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Expenditure Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">Department-wise Net Payroll Distribution</h3>
              <p className="text-[12px] text-slate-500">August 2026 disbursement breakdown per department ($ USD)</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptPayrollChart} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} interval={0} angle={-15} textAnchor="end" />
                  <YAxis stroke="#888888" fontSize={11} tickFormatter={v => `$${v / 1000}k`} />
                  <Tooltip formatter={val => [`$${Number(val).toLocaleString()}`, 'Total Net Pay']} />
                  <Bar dataKey="netPay" fill="#E9573F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Component Breakdown Pie */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">Itemized Payroll Component Composition</h3>
              <p className="text-[12px] text-slate-500">Gross wages vs statutory taxes and retirement fund contributions</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={compensationCompositionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {compensationCompositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={val => `$${Number(val).toLocaleString()}`} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 12-Month Payroll Trend Area Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 lg:col-span-2">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">12-Month Gross Payroll Cost & Tax Retention Curve</h3>
              <p className="text-[12px] text-slate-500">Historical compensation trend over past 4 fiscal quarters ($ USD)</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={annualPayrollTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#888888" fontSize={11} />
                  <YAxis stroke="#888888" fontSize={11} tickFormatter={v => `$${v / 1000}k`} />
                  <Tooltip formatter={val => `$${Number(val).toLocaleString()}`} />
                  <Area type="monotone" dataKey="gross" name="Gross Payroll" stroke="#1F2A52" fill="#E2E8F0" />
                  <Area type="monotone" dataKey="net" name="Net Disbursed" stroke="#10B981" fill="#D1FAE5" />
                  <Area type="monotone" dataKey="tax" name="Income Tax TDS" stroke="#E9573F" fill="#FCECE9" />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: SALARY MASTER & STRUCTURES TABLE                      */}
      {/* ============================================================ */}
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

            {/* Status Pills */}
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
                  {st} (
                  {
                    employees.filter(e => (st === 'ALL' ? true : e.status.toUpperCase() === st)).length
                  }
                  )
                </button>
              ))}
            </div>
          </div>

          {/* Deep Employee Salary Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/75">
                    <th className="py-3 px-4">EMPLOYEE</th>
                    <th className="py-3 px-3">BASE SALARY</th>
                    <th className="py-3 px-3">HRA</th>
                    <th className="py-3 px-3">ALLOWANCES & BONUS</th>
                    <th className="py-3 px-3">LOP DEDUCT</th>
                    <th className="py-3 px-3">PF DEDUCT</th>
                    <th className="py-3 px-3">TAX (TDS)</th>
                    <th className="py-3 px-3">MONTHLY NET PAY</th>
                    <th className="py-3 px-3">DISBURSE STATUS</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEmployees.map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-[#1F2A52] font-bold flex items-center justify-center text-xs shrink-0">
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

                      <td className="py-3.5 px-3 font-mono text-emerald-700 font-medium">
                        +${emp.hra.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-3 font-mono text-emerald-700 font-medium">
                        +${(emp.special + emp.conveyance + emp.medical + emp.bonus).toLocaleString()}
                        {emp.bonus > 0 && (
                          <span className="block text-[10px] text-pink-600 font-mono">(incl. ${emp.bonus} bonus)</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 font-mono">
                        {emp.lopDeduction > 0 ? (
                          <span className="text-rose-600 font-bold">-${emp.lopDeduction} ({emp.lopDays}d)</span>
                        ) : (
                          <span className="text-slate-300">$0</span>
                        )}
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
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                            emp.status === 'Disbursed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : emp.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {emp.status}
                        </span>
                        {emp.status === 'On Hold' && emp.holdReason && (
                          <span className="block text-[10px] text-rose-600 italic max-w-xs truncate" title={emp.holdReason}>
                            "{emp.holdReason}"
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditStructureModal(emp)}
                            title="Edit Compensation Master"
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => openBonusModal(emp)}
                            title="Credit Spot Bonus / Incentive"
                            className="p-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => openPayslipModal(emp)}
                            title="Generate Official Payslip"
                            className="px-2.5 py-1 bg-horilla-primary/10 hover:bg-horilla-primary hover:text-white text-horilla-primary rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Slip</span>
                          </button>

                          {emp.status === 'On Hold' ? (
                            <button
                              onClick={() => handleReleaseHold(emp)}
                              title="Release Salary Hold"
                              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              <Unlock className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => openHoldModal(emp)}
                              title="Hold Salary Disbursement"
                              className="p-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-500 rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              <Lock className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan={10} className="py-10 text-center text-slate-400">
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

      {/* ============================================================ */}
      {/* TAB 3: REIMBURSEMENTS & EXPENSE CLAIMS                      */}
      {/* ============================================================ */}
      {activeTab === 'reimbursements' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">Employee Expense Reimbursements</h3>
              <p className="text-[12px] text-slate-500">
                Staff travel, client entertainment, certifications, and home-office equipment claims
              </p>
            </div>

            <button
              onClick={() => setIsClaimModalOpen(true)}
              className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold text-[12px] rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Record Expense Claim</span>
            </button>
          </div>

          <div className="space-y-3">
            {reimbursements.map(claim => (
              <div
                key={claim.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[#1F2A52] text-[14px]">{claim.name}</span>
                    <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                      {claim.empId}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">({claim.dept})</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        claim.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : claim.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {claim.status}
                    </span>
                  </div>

                  <div className="text-[13px] font-semibold text-slate-800 flex items-center gap-3">
                    <span>Category: {claim.category}</span>
                    <span className="text-emerald-700 font-mono font-bold">${claim.amount.toLocaleString()}</span>
                  </div>

                  <p className="text-[12px] text-slate-600 italic">"{claim.notes}"</p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span>Submitted: {claim.submittedOn}</span>
                    {claim.receipt && (
                      <span className="text-blue-600 flex items-center gap-1 font-medium underline cursor-pointer">
                        <Paperclip className="w-3 h-3" /> {claim.receipt}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {claim.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleReimbursementAction(claim.id, 'Approved')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Add to Payroll</span>
                      </button>
                      <button
                        onClick={() => handleReimbursementAction(claim.id, 'Rejected')}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[12px] font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                      Disbursed in Current Cycle
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: LOANS & SALARY ADVANCES                             */}
      {/* ============================================================ */}
      {activeTab === 'advances' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-[16px] font-bold text-[#333333]">Corporate Loans & Salary Advances</h3>
              <p className="text-[12px] text-slate-500">
                Track staff advance disbursements, monthly payroll EMI deductions, and remaining balances
              </p>
            </div>

            <button
              onClick={() => setIsLoanModalOpen(true)}
              className="px-4 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold text-[12px] rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Grant Salary Advance</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                  <th className="py-3 px-3">EMPLOYEE</th>
                  <th className="py-3 px-3">LOAN ID & REASON</th>
                  <th className="py-3 px-3">PRINCIPAL AMOUNT</th>
                  <th className="py-3 px-3">MONTHLY PAYROLL EMI</th>
                  <th className="py-3 px-3">TENURE / INSTALLMENTS</th>
                  <th className="py-3 px-3">REMAINING BALANCE</th>
                  <th className="py-3 px-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loans.map(ln => (
                  <tr key={ln.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-[#1F2A52]">{ln.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {ln.empId} • {ln.dept}
                      </p>
                    </td>

                    <td className="py-3.5 px-3">
                      <p className="font-semibold text-slate-700">{ln.reason}</p>
                      <p className="text-[11px] font-mono text-slate-400">{ln.id} • Issued {ln.disbursedDate}</p>
                    </td>

                    <td className="py-3.5 px-3 font-mono font-bold text-[#1F2A52]">
                      ${ln.principal.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-3 font-mono font-bold text-rose-600">
                      -${ln.monthlyEmi.toLocaleString()} / mo
                    </td>

                    <td className="py-3.5 px-3 font-mono text-slate-600 text-xs">
                      {ln.paidMonths} of {ln.tenureMonths} Months Paid
                    </td>

                    <td className="py-3.5 px-3 font-mono font-bold text-[#1F2A52]">
                      ${ln.balanceRemaining.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        {ln.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: STATUTORY & TAX COMPLIANCE                           */}
      {/* ============================================================ */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
                Provident Fund (PF / 401k)
              </span>
              <p className="text-2xl font-extrabold text-[#1F2A52]">${totalPfDeductions.toLocaleString()}</p>
              <p className="text-xs text-slate-500">8% Employee + 8% Employer Match Fund ($4,092 Total)</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
                Income Tax TDS Withholding
              </span>
              <p className="text-2xl font-extrabold text-[#1F2A52]">${totalTaxWithholdings.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Form 24Q Quarterly Return • Remitted to Revenue Authority</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                Health & State Medical Insurance
              </span>
              <p className="text-2xl font-extrabold text-[#1F2A52]">${totalInsurance.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Comprehensive Staff Coverage Plan (Zero Co-Pay)</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-[16px] font-bold text-[#333333]">Statutory Audit & Remittance Schedule</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1F2A52]">Federal & State Tax Deposit (Form 941 / Form 24Q)</p>
                  <p className="text-slate-500">Due on 15th of next calendar month</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">COMPLIANT</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1F2A52]">Employee Retirement PF Contribution Challan</p>
                  <p className="text-slate-500">Electronic ECR filing generated and reconciled</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 1: EDIT SALARY STRUCTURE MODAL                        */}
      {/* ============================================================ */}
      {isEditModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">Comprehensive Compensation Master</h3>
                <p className="text-[11px] text-slate-400">
                  {selectedEmployee.name} ({selectedEmployee.id}) • {selectedEmployee.dept} • {selectedEmployee.role}
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
              {/* Dynamic Live Calculator Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Monthly Gross</p>
                  <p className="text-lg font-extrabold text-emerald-600 font-mono">${computedGross.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Total Deductions</p>
                  <p className="text-lg font-extrabold text-rose-600 font-mono">-${computedTotalDeductions.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Take-Home Net Pay</p>
                  <p className="text-lg font-extrabold text-[#1F2A52] font-mono">${computedNet.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Annualized CTC</p>
                  <p className="text-lg font-extrabold text-blue-600 font-mono">${computedAnnualCtc.toLocaleString()}</p>
                </div>
              </div>

              {/* Tax Regime & Employment Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Income Tax Regime</label>
                  <select
                    value={formTaxRegime}
                    onChange={e => setFormTaxRegime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none focus:border-horilla-primary"
                  >
                    <option value="New Regime (Default)">New Regime (Default - Lower Slab)</option>
                    <option value="Old Regime (Exemptions)">Old Regime (80C, 80D Exemptions)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unapproved LOP (Days Off)</label>
                  <input
                    type="number"
                    min="0"
                    max="31"
                    value={formLopDays}
                    onChange={e => setFormLopDays(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                  />
                </div>
              </div>

              {/* Earnings Components */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#1F2A52] uppercase tracking-wider">Earnings Breakdown</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Base Salary ($)</label>
                    <input
                      type="number"
                      value={formBase}
                      onChange={e => handleBaseChange(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none focus:border-horilla-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">HRA (House Rent) ($)</label>
                    <input
                      type="number"
                      value={formHra}
                      onChange={e => setFormHra(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Special Allowance ($)</label>
                    <input
                      type="number"
                      value={formSpecial}
                      onChange={e => setFormSpecial(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Conveyance Allowance ($)</label>
                    <input
                      type="number"
                      value={formConveyance}
                      onChange={e => setFormConveyance(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Medical Allowance ($)</label>
                    <input
                      type="number"
                      value={formMedical}
                      onChange={e => setFormMedical(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Variable Bonus ($)</label>
                    <input
                      type="number"
                      value={formBonus}
                      onChange={e => setFormBonus(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Deductions Components */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#1F2A52] uppercase tracking-wider">Statutory Deductions & EMI</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">PF / 401k ($)</label>
                    <input
                      type="number"
                      value={formPf}
                      onChange={e => setFormPf(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Income Tax TDS ($)</label>
                    <input
                      type="number"
                      value={formTax}
                      onChange={e => setFormTax(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Health Insurance ($)</label>
                    <input
                      type="number"
                      value={formInsurance}
                      onChange={e => setFormInsurance(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Loan / Advance EMI ($)</label>
                    <input
                      type="number"
                      value={formLoanEmi}
                      onChange={e => setFormLoanEmi(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                    />
                  </div>
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
                  Save Salary Master
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: OFFICIAL PRINTABLE PAYSLIP                         */}
      {/* ============================================================ */}
      {isPayslipModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 space-y-6 animate-modal-pop max-h-[90vh] overflow-y-auto">
            {/* Header with Letterhead */}
            <div className="flex items-start justify-between pb-4 border-b-2 border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-horilla-primary text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    DF
                  </div>
                  <h2 className="text-xl font-extrabold text-[#1F2A52] tracking-tight">DAYFLOW ENTERPRISE HRMS</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">Official Electronic Salary Slip • {selectedPeriod}</p>
                <p className="text-[11px] text-slate-400 font-mono">100 Tech Blvd, Silicon Valley, CA 94025</p>
              </div>

              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs ${
                    selectedEmployee.status === 'Disbursed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedEmployee.status.toUpperCase()}
                </span>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">Ref: ACH-202608-{selectedEmployee.id.slice(-4)}</p>
              </div>
            </div>

            {/* Employee Details Matrix */}
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
                <p className="font-semibold text-slate-700">
                  {selectedEmployee.dept} • {selectedEmployee.role}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Tax Regime</p>
                <p className="font-semibold text-slate-700">{selectedEmployee.taxRegime}</p>
              </div>

              <div>
                <p className="text-slate-400">Bank & Routing</p>
                <p className="font-mono text-slate-700">
                  {selectedEmployee.bankName} ({selectedEmployee.ifsc})
                </p>
              </div>
              <div>
                <p className="text-slate-400">Account Number</p>
                <p className="font-mono text-slate-700">{selectedEmployee.bankAccount}</p>
              </div>
              <div>
                <p className="text-slate-400">Tax ID / PAN</p>
                <p className="font-mono font-bold text-slate-700">{selectedEmployee.panNo}</p>
              </div>
              <div>
                <p className="text-slate-400">LOP Days Deducted</p>
                <p className="font-mono text-slate-700">{selectedEmployee.lopDays} Day(s)</p>
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
                  <span>Basic Wage</span>
                  <span className="font-mono font-semibold">${selectedEmployee.basePay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>House Rent Allowance (HRA)</span>
                  <span className="font-mono font-semibold">${selectedEmployee.hra.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Special Allowance</span>
                  <span className="font-mono font-semibold">${selectedEmployee.special.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Conveyance Allowance</span>
                  <span className="font-mono font-semibold">${selectedEmployee.conveyance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Medical Allowance</span>
                  <span className="font-mono font-semibold">${selectedEmployee.medical.toLocaleString()}</span>
                </div>
                {selectedEmployee.bonus > 0 && (
                  <div className="flex justify-between text-pink-700 font-semibold">
                    <span>Performance Incentive / Bonus</span>
                    <span className="font-mono">+${selectedEmployee.bonus.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-emerald-700">
                  <span>GROSS EARNINGS</span>
                  <span className="font-mono">
                    $
                    {(
                      selectedEmployee.basePay +
                      selectedEmployee.hra +
                      selectedEmployee.special +
                      selectedEmployee.conveyance +
                      selectedEmployee.medical +
                      selectedEmployee.bonus
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Deductions Column */}
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200 font-bold text-[#1F2A52]">
                  <span>STATUTORY & LOAN DEDUCTIONS</span>
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
                  <span>Medical Insurance Premium</span>
                  <span className="font-mono font-semibold">${selectedEmployee.insurance.toLocaleString()}</span>
                </div>
                {selectedEmployee.loanEmi > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Salary Advance / Loan EMI</span>
                    <span className="font-mono font-semibold">${selectedEmployee.loanEmi.toLocaleString()}</span>
                  </div>
                )}
                {selectedEmployee.lopDeduction > 0 && (
                  <div className="flex justify-between text-rose-600 font-semibold">
                    <span>Loss of Pay (LOP Deduct)</span>
                    <span className="font-mono">-${selectedEmployee.lopDeduction.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-rose-700">
                  <span>TOTAL DEDUCTIONS</span>
                  <span className="font-mono">
                    -$
                    {(
                      selectedEmployee.pf +
                      selectedEmployee.tax +
                      selectedEmployee.insurance +
                      selectedEmployee.loanEmi +
                      selectedEmployee.lopDeduction
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Net Salary Highlight Banner */}
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
                This is an encrypted computer-generated electronic payslip and does not require a physical seal.
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

      {/* ============================================================ */}
      {/* MODAL 3: SPOT BONUS MODAL                                   */}
      {/* ============================================================ */}
      {isBonusModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">Grant Spot Bonus</h3>
                <p className="text-[11px] text-slate-400">
                  {selectedEmployee.name} ({selectedEmployee.id})
                </p>
              </div>
              <button
                onClick={() => setIsBonusModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGrantBonus} className="space-y-4 text-[13px]">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bonus Amount ($)</label>
                <input
                  type="number"
                  value={bonusAmount}
                  onChange={e => setBonusAmount(e.target.value)}
                  required
                  min="50"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Award Citation / Reason</label>
                <input
                  type="text"
                  value={bonusReason}
                  onChange={e => setBonusReason(e.target.value)}
                  placeholder="e.g. Critical bug fix or project milestone award"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBonusModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold rounded-lg shadow-sm"
                >
                  Credit Bonus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 4: HOLD SALARY MODAL                                  */}
      {/* ============================================================ */}
      {isHoldModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-[17px] font-bold text-[#1F2A52]">Hold Salary Disbursement</h3>
                <p className="text-[11px] text-slate-400">
                  {selectedEmployee.name} ({selectedEmployee.id})
                </p>
              </div>
              <button
                onClick={() => setIsHoldModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyHold} className="space-y-4 text-[13px]">
              <p className="text-xs text-slate-500">
                Placing a salary on hold will exclude this employee from the automated direct deposit ACH batch.
              </p>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason for Hold</label>
                <textarea
                  rows={3}
                  value={holdReason}
                  onChange={e => setHoldReason(e.target.value)}
                  required
                  placeholder="e.g. Disputed tax residency documents or pending asset clearance"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsHoldModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  Apply Hold
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 5: RECORD EXPENSE CLAIM MODAL                         */}
      {isClaimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[17px] font-bold text-[#1F2A52]">Record Reimbursement Claim</h3>
              <button
                onClick={() => setIsClaimModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClaim} className="space-y-4 text-[13px]">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Employee</label>
                <select
                  value={claimEmpId}
                  onChange={e => setClaimEmpId(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none focus:border-horilla-primary"
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.dept}) - {e.id}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expense Category</label>
                  <select
                    value={claimCategory}
                    onChange={e => setClaimCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                  >
                    <option value="Client Travel & Meals">Client Travel & Meals</option>
                    <option value="Home Office & Broadband">Home Office & Broadband</option>
                    <option value="Software & Cloud Licenses">Software & Cloud Licenses</option>
                    <option value="Training & Certifications">Training & Certifications</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Claim Amount ($)</label>
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={e => setClaimAmount(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Claim Description</label>
                <input
                  type="text"
                  value={claimDesc}
                  onChange={e => setClaimDesc(e.target.value)}
                  placeholder="e.g. AWS Cloud Certification Voucher Reimbursement"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsClaimModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold rounded-lg shadow-sm"
                >
                  Approve & Credit to Payroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 6: GRANT SALARY ADVANCE MODAL                         */}
      {isLoanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[17px] font-bold text-[#1F2A52]">Grant Salary Advance / Loan</h3>
              <button
                onClick={() => setIsLoanModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLoan} className="space-y-4 text-[13px]">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Employee</label>
                <select
                  value={loanEmpId}
                  onChange={e => setLoanEmpId(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none focus:border-horilla-primary"
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.dept}) - {e.id}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Principal Advance Amount ($)</label>
                  <input
                    type="number"
                    value={loanTotal}
                    onChange={e => setLoanTotal(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tenure (Months)</label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={loanTenure}
                    onChange={e => setLoanTenure(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] font-mono outline-none"
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500 font-mono">
                Estimated Monthly Payroll Deduction: <strong>${Math.round(loanTotal / (loanTenure || 1))} / month</strong>
              </p>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason / Note</label>
                <input
                  type="text"
                  value={loanReason}
                  onChange={e => setLoanReason(e.target.value)}
                  placeholder="e.g. Relocation assistance or family emergency"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsLoanModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-horilla-primary hover:bg-horilla-primary-hover text-white font-semibold rounded-lg shadow-sm"
                >
                  Disburse & Setup EMI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 7: BATCH DISBURSE MODAL                               */}
      {/* ============================================================ */}
      {isBatchProcessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-[17px] font-bold text-[#1F2A52]">Execute {selectedPeriod} Payroll Batch</h3>
              <button
                onClick={() => setIsBatchProcessModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                You are about to initiate the electronic ACH direct deposit for <strong>{totalEmployees} employees</strong>.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span>Total Net Payout:</span>
                  <strong className="font-mono text-[#1F2A52]">${totalNetPayroll.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Tax Deductions (TDS):</span>
                  <strong className="font-mono text-slate-700">${totalTaxWithholdings.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total PF Contributions:</span>
                  <strong className="font-mono text-slate-700">${totalPfDeductions.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Employees on Hold:</span>
                  <strong className="font-mono text-rose-600">{onHoldCount} Employee(s)</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                Direct ACH transfer files and individual notification payslips will be automatically delivered to active employees.
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

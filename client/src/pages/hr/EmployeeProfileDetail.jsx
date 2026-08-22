import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Download, Circle, Loader2, CheckCircle2 } from 'lucide-react';
import { fetchEmployeeDetailApi } from '../../services/api';

export const EmployeeProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Resume');
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Salary state for dynamic calculation
  const [wage, setWage] = useState(85000);
  const [workingDays, setWorkingDays] = useState(5);
  
  // Salary component percentages
  const [basicPct, setBasicPct] = useState(50);
  const [hraPct, setHraPct] = useState(20);
  const [medicalPct, setMedicalPct] = useState(5);
  const [bonusPct, setBonusPct] = useState(10);
  const [ltaPct, setLtaPct] = useState(5);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await fetchEmployeeDetailApi(id);
        if (res.ok && res.data?.employee) {
          const emp = res.data.employee;
          setEmployeeData(emp);
          if (emp.salaryStructures && emp.salaryStructures.length > 0) {
            setWage(Math.round(Number(emp.salaryStructures[0].annualCtc) / 12));
          }
        }
      } catch (err) {
        console.error('Failed to load employee detail:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  const employee = employeeData ? {
    id: employeeData.loginId || employeeData.id,
    name: `${employeeData.firstName} ${employeeData.lastName || ''}`.trim(),
    loginId: employeeData.loginId || 'EMP-1000',
    email: employeeData.email,
    mobile: employeeData.phone || '+91 98765 43210',
    company: 'Dayflow Inc.',
    department: employeeData.department?.name || 'Engineering',
    manager: 'Sarah Williams',
    location: employeeData.profile?.location || 'New York HQ',
    status: 'Active'
  } : {
    id: id || 'DAY-HR-2026-0001',
    name: 'Adam Admin',
    loginId: 'admin@dayflow.com',
    email: 'admin@dayflow.com',
    mobile: '+1 555-0100',
    company: 'Dayflow Inc.',
    department: 'Executive',
    manager: 'CEO',
    location: 'New York HQ',
    status: 'Active'
  };

  // Computed values
  const basicSalary = (wage * (basicPct / 100)).toFixed(2);
  const hra = (wage * (hraPct / 100)).toFixed(2);
  const medical = (wage * (medicalPct / 100)).toFixed(2);
  const bonus = (wage * (bonusPct / 100)).toFixed(2);
  const lta = (wage * (ltaPct / 100)).toFixed(2);
  
  // Fixed allowance takes the remainder to reach 100% (if applicable)
  const remainingPct = 100 - (basicPct + hraPct + medicalPct + bonusPct + ltaPct);
  const fixedAllowance = (wage * (remainingPct / 100)).toFixed(2);

  // Deductions
  const [pfPct, setPfPct] = useState(12);
  const pfAmount = ((parseFloat(basicSalary) * (pfPct / 100))).toFixed(2);
  const professionalTax = 200.00;

  if (loading) {
    return (
      <div className="p-12 flex items-center justify-center gap-2 text-slate-500 text-sm">
        <Loader2 className="w-5 h-5 animate-spin text-horilla-primary" />
        <span>Loading employee details from database...</span>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      
      {/* Navigation & Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/hr/employees')}
          className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </button>
        <h1 className="text-[20px] font-bold text-[#333333]">Employee Profile</h1>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side: Avatar & Basic Info */}
            <div className="flex items-center gap-6 md:w-1/2">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#FCECE9] flex items-center justify-center text-horilla-primary text-[32px] font-bold shadow-sm">
                  {employee.name.split(' ').map(n=>n[0]).join('').slice(0, 2)}
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#10B981] border-2 border-white rounded-full"></div>
                <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white border border-slate-200 p-1 rounded-full shadow-sm hover:bg-slate-50">
                  <Edit2 className="w-3 h-3 text-slate-600" />
                </button>
              </div>
              
              <div>
                <h2 className="text-[24px] font-bold text-[#333333] mb-2">{employee.name}</h2>
                <div className="space-y-1 text-[13px]">
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="text-slate-500">Login ID</span>
                    <span className="font-medium text-[#333333]">{employee.loginId}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="text-slate-500">Email</span>
                    <span className="font-medium text-horilla-primary">{employee.email}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="text-slate-500">Mobile</span>
                    <span className="font-medium text-[#333333]">{employee.mobile}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Job Details */}
            <div className="md:w-1/2 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 md:pl-8 pt-4 md:pt-0">
              <div className="space-y-2 text-[13px]">
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <span className="text-slate-500">Company</span>
                  <span className="font-medium text-[#333333]">{employee.company}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <span className="text-slate-500">Department</span>
                  <span className="font-medium text-[#333333]">{employee.department}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium text-[#333333]">{employee.location}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <span className="text-slate-500">Status</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#10B981]">
                    <Circle className="w-2.5 h-2.5 fill-[#10B981]" />
                    {employee.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-t border-slate-200 px-6 gap-6 overflow-x-auto">
          {['Resume', 'Private Info', 'Salary Info', 'Attendance', 'Leaves'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-[13px] font-semibold border-b-2 transition cursor-pointer whitespace-nowrap ${
                activeTab === tab 
                  ? 'border-horilla-primary text-horilla-primary' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content 1: Salary Info (Dynamic Calculations) */}
      {activeTab === 'Salary Info' && (
        <div className="space-y-6">
          {/* Base Wage Config */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-[#333333] mb-4">Base Wage & Work Schedule</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-[#888888] uppercase mb-1">Monthly Gross Wage (₹)</label>
                <input 
                  type="number" 
                  value={wage}
                  onChange={(e) => setWage(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] font-bold text-[#333333] outline-none focus:border-horilla-primary"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#888888] uppercase mb-1">Working Days / Week</label>
                <select 
                  value={workingDays}
                  onChange={(e) => setWorkingDays(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] font-medium text-[#333333] outline-none"
                >
                  <option value={5}>5 Days (Mon - Fri)</option>
                  <option value={6}>6 Days (Mon - Sat)</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#888888] uppercase mb-1">Annual CTC</label>
                <div className="text-[18px] font-extrabold text-horilla-primary mt-1">
                  ₹{(wage * 12).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Salary Components Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Earnings Component Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-[#333333]">Earnings Components</h3>
                <span className="text-[11px] font-bold text-[#10B981] bg-[#E6F4EA] px-2 py-1 rounded">
                  Monthly Total: ₹{wage.toLocaleString()}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-[13px] font-bold text-[#333333]">Basic Salary ({basicPct}%)</p>
                    <p className="text-[11px] text-[#888888]">Primary taxable component</p>
                  </div>
                  <span className="text-[14px] font-bold text-[#333333]">₹{Number(basicSalary).toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-[13px] font-bold text-[#333333]">House Rent Allowance ({hraPct}%)</p>
                    <p className="text-[11px] text-[#888888]">HRA tax exemption</p>
                  </div>
                  <span className="text-[14px] font-bold text-[#333333]">₹{Number(hra).toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-[13px] font-bold text-[#333333]">Medical Allowance ({medicalPct}%)</p>
                    <p className="text-[11px] text-[#888888]">Fixed medical component</p>
                  </div>
                  <span className="text-[14px] font-bold text-[#333333]">₹{Number(medical).toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-[13px] font-bold text-[#333333]">Performance Bonus ({bonusPct}%)</p>
                    <p className="text-[11px] text-[#888888]">Variable performance incentive</p>
                  </div>
                  <span className="text-[14px] font-bold text-[#333333]">₹{Number(bonus).toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-[13px] font-bold text-[#333333]">Special Allowance ({remainingPct}%)</p>
                    <p className="text-[11px] text-[#888888]">Residual balancing component</p>
                  </div>
                  <span className="text-[14px] font-bold text-[#333333]">₹{Number(fixedAllowance).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Deductions Component Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-[#333333]">Deductions & Net Pay</h3>
                <span className="text-[11px] font-bold text-[#E9573F] bg-[#FCECE9] px-2 py-1 rounded">
                  Deduction Total: ₹{(parseFloat(pfAmount) + professionalTax).toLocaleString()}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-[13px] font-bold text-[#333333]">Provident Fund (PF - {pfPct}%)</p>
                    <p className="text-[11px] text-[#888888]">Calculated on basic salary</p>
                  </div>
                  <span className="text-[14px] font-bold text-[#E9573F]">-₹{Number(pfAmount).toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-[13px] font-bold text-[#333333]">Professional Tax (PT)</p>
                    <p className="text-[11px] text-[#888888]">Monthly state tax deduction</p>
                  </div>
                  <span className="text-[14px] font-bold text-[#E9573F]">-₹{professionalTax.toFixed(2)}</span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-bold text-slate-500 uppercase">Estimated Monthly Take-Home</p>
                    <p className="text-[22px] font-extrabold text-[#10B981] mt-1">
                      ₹{(wage - (parseFloat(pfAmount) + professionalTax)).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs">
                    Net Pay Slip View
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Resume */}
      {activeTab === 'Resume' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-[16px] font-bold text-[#333333] mb-2">Professional Summary</h3>
            <p className="text-[13px] text-[#666666] leading-relaxed">
              Experienced professional contributing to core organizational objectives at Dayflow Inc. Possesses extensive domain knowledge and cross-functional leadership capabilities.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-[16px] font-bold text-[#333333] mb-3">Skills & Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {['HR Operations', 'People Management', 'Strategic Hiring', 'Conflict Resolution', 'Policy Formulation', 'Payroll Verification'].map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-100 text-[#333333] rounded-full text-[12px] font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Attendance */}
      {activeTab === 'Attendance' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-[16px] font-bold text-[#333333] mb-4">Recent Attendance Log</h3>
          <div className="space-y-3 text-xs">
            {employeeData?.attendances && employeeData.attendances.length > 0 ? (
              employeeData.attendances.map((att, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{new Date(att.date).toLocaleDateString()}</span>
                  <span className="font-mono text-slate-600">{att.clockIn ? new Date(att.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'} to {att.clockOut ? new Date(att.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}</span>
                  <span className="font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">{att.status}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400">Regular 100% biometric attendance verified.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab Content 4: Leaves */}
      {activeTab === 'Leaves' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-[16px] font-bold text-[#333333] mb-4">Leave Quotas & Requests</h3>
          <div className="space-y-3 text-xs">
            {employeeData?.leaveRequests && employeeData.leaveRequests.length > 0 ? (
              employeeData.leaveRequests.map((l, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{l.leaveType?.name || 'Leave'} ({Number(l.workingDays)} days)</span>
                  <span className="text-slate-500">{new Date(l.startDate).toLocaleDateString()} – {new Date(l.endDate).toLocaleDateString()}</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${l.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{l.status}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No active pending leave requests for this employee.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab Content 5: Private Info */}
      {activeTab === 'Private Info' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-400 block mb-1">Residential Address</span>
              <span className="font-semibold text-slate-800">{employeeData?.profile?.address || 'Baner Road, Pune, Maharashtra 411045'}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-400 block mb-1">Emergency Contact</span>
              <span className="font-semibold text-slate-800">+91 98765 11223 (Spouse)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-400 block mb-1">Personal Email</span>
              <span className="font-semibold text-slate-800">{employeeData?.profile?.personalEmail || employeeData?.email}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-400 block mb-1">Date of Joining</span>
              <span className="font-semibold text-slate-800">{employeeData?.profile?.joiningDate ? new Date(employeeData.profile.joiningDate).toLocaleDateString() : '15 Jan 2024'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfileDetail;

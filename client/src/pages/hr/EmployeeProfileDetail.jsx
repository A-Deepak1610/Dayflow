import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Download, Circle } from 'lucide-react';

export const EmployeeProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Resume');

  // Mock data based on the route ID
  const employee = {
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

  // Salary state for dynamic calculation
  const [wage, setWage] = useState(80000);
  const [workingDays, setWorkingDays] = useState(5);
  
  // Salary component percentages
  const [basicPct, setBasicPct] = useState(50);
  const [hraPct, setHraPct] = useState(20);
  const [medicalPct, setMedicalPct] = useState(5);
  const [bonusPct, setBonusPct] = useState(10);
  const [ltaPct, setLtaPct] = useState(5);
  
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

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      
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
                  {employee.name.split(' ').map(n=>n[0]).join('')}
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
            <div className="md:w-1/2 pl-0 md:pl-8 border-l border-slate-100 flex flex-col justify-center">
              <div className="space-y-3 text-[13px]">
                <div className="grid grid-cols-[100px_1fr] gap-2 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-semibold">Company</span>
                  <span className="font-bold text-[#333333]">{employee.company}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-semibold">Department</span>
                  <span className="font-bold text-[#333333]">{employee.department}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-semibold">Manager</span>
                  <span className="font-bold text-[#333333]">{employee.manager}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <span className="text-slate-500 font-semibold">Location</span>
                  <span className="font-bold text-[#333333]">{employee.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-t border-slate-200 bg-slate-50 px-6">
          {['Resume', 'Private Info', 'Salary Info'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-[14px] font-bold transition border-b-2 ${
                activeTab === tab 
                  ? 'border-horilla-primary text-horilla-primary bg-white' 
                  : 'border-transparent text-slate-500 hover:text-[#333333] hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT: RESUME */}
      {activeTab === 'Resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-[#333333] mb-4 flex items-center gap-2">
                About <Edit2 className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-[#333333] mb-4 flex items-center gap-2">
                What I love about my job <Edit2 className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-[#333333] mb-4 flex items-center gap-2">
                My interests and hobbies <Edit2 className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[200px]">
              <h3 className="text-[16px] font-bold text-[#333333] mb-4 border-b border-slate-100 pb-2">Skills</h3>
              <button className="text-[13px] font-bold text-horilla-primary hover:underline flex items-center gap-1 mt-4">
                + Add skills
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[200px]">
              <h3 className="text-[16px] font-bold text-[#333333] mb-4 border-b border-slate-100 pb-2">Certification</h3>
              <button className="text-[13px] font-bold text-horilla-primary hover:underline flex items-center gap-1 mt-4">
                + Add duty
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PRIVATE INFO */}
      {activeTab === 'Private Info' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-[#333333] mb-6 border-b border-slate-100 pb-2">Personal Details</h3>
            <div className="space-y-4 text-[13px]">
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">Date of Birth</span>
                <span className="font-medium text-[#333333]">12 Jan 1990</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">Primary Address</span>
                <span className="font-medium text-[#333333]">123 Tech Lane, Silicon Valley, CA 94025</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">Nationality</span>
                <span className="font-medium text-[#333333]">American</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">Personal Email</span>
                <span className="font-medium text-horilla-primary">adam.personal@gmail.com</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">Gender</span>
                <span className="font-medium text-[#333333]">Male</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">Marital Status</span>
                <span className="font-medium text-[#333333]">Single</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">Date of Joining</span>
                <span className="font-medium text-[#333333]">01 Mar 2026</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-[#333333] mb-6 border-b border-slate-100 pb-2">Bank Details</h3>
            <div className="space-y-4 text-[13px]">
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">Account Number</span>
                <span className="font-medium text-[#333333]">**** **** **** 4589</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">Bank Name</span>
                <span className="font-medium text-[#333333]">Chase Bank</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">IFSC Code</span>
                <span className="font-medium text-[#333333]">CHAS000124</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">PAN No</span>
                <span className="font-medium text-[#333333]">ABCDE1234F</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span className="text-slate-500 font-semibold">Emp Code</span>
                <span className="font-medium text-[#333333]">DAY-0001</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SALARY INFO */}
      {activeTab === 'Salary Info' && (
        <div className="space-y-6">
          
          <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 italic">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Salary Info tab should only be visible to Admin
          </div>

          {/* Wage Config Header */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 border-r border-slate-100 pr-6">
              <span className="text-[14px] font-bold text-slate-500 w-24">Month Wage</span>
              <input type="number" value={wage} onChange={(e)=>setWage(Number(e.target.value))} className="w-32 px-3 py-1.5 border border-slate-200 rounded font-mono font-bold text-[15px]" />
              <span className="text-[13px] text-slate-500">/ Month</span>
            </div>
            
            <div className="flex items-center gap-4 border-r border-slate-100 pr-6">
              <span className="text-[14px] font-bold text-slate-500 w-24">Yearly Wage</span>
              <span className="w-32 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded font-mono font-bold text-[15px]">{(wage * 12).toLocaleString()}</span>
              <span className="text-[13px] text-slate-500">/ Yearly</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[14px] font-bold text-slate-500">No of working days in a week:</span>
              <input type="number" value={workingDays} onChange={(e)=>setWorkingDays(Number(e.target.value))} className="w-16 px-3 py-1.5 border border-slate-200 rounded font-mono font-bold text-[15px]" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Salary Components (Allowances) */}
            <div>
              <h3 className="text-[16px] font-bold text-[#333333] mb-4 border-b border-slate-200 pb-2">Salary Components</h3>
              
              <div className="space-y-4">
                {/* Basic Salary */}
                <div className="flex items-center justify-between group">
                  <div className="w-1/2">
                    <p className="text-[13px] font-bold text-[#333333]">Basic Salary</p>
                    <p className="text-[10px] text-slate-400 leading-tight pr-4">Defines basic salary fixed company wide usually calculated as 50%</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-mono font-bold">{basicSalary}</span>
                    <span className="text-[11px] text-slate-500">/ month</span>
                    <input type="number" value={basicPct} onChange={(e)=>setBasicPct(Number(e.target.value))} className="w-14 px-2 py-1 text-xs border border-slate-200 rounded text-right" />
                    <span className="text-[11px] text-slate-500">%</span>
                  </div>
                </div>
                <hr className="border-slate-100" />

                {/* HRA */}
                <div className="flex items-center justify-between group">
                  <div className="w-1/2">
                    <p className="text-[13px] font-bold text-[#333333]">House Rent Allowance</p>
                    <p className="text-[10px] text-slate-400 leading-tight pr-4">HRA provided to employee, standard 20% of the wage</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-mono font-bold">{hra}</span>
                    <span className="text-[11px] text-slate-500">/ month</span>
                    <input type="number" value={hraPct} onChange={(e)=>setHraPct(Number(e.target.value))} className="w-14 px-2 py-1 text-xs border border-slate-200 rounded text-right" />
                    <span className="text-[11px] text-slate-500">%</span>
                  </div>
                </div>
                <hr className="border-slate-100" />

                {/* Medical Allowance */}
                <div className="flex items-center justify-between group">
                  <div className="w-1/2">
                    <p className="text-[13px] font-bold text-[#333333]">Medical Allowance</p>
                    <p className="text-[10px] text-slate-400 leading-tight pr-4">A standard allowance is a predetermined fixed amount provided</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-mono font-bold">{medical}</span>
                    <span className="text-[11px] text-slate-500">/ month</span>
                    <input type="number" value={medicalPct} onChange={(e)=>setMedicalPct(Number(e.target.value))} className="w-14 px-2 py-1 text-xs border border-slate-200 rounded text-right" />
                    <span className="text-[11px] text-slate-500">%</span>
                  </div>
                </div>
                <hr className="border-slate-100" />

                {/* Performance Bonus */}
                <div className="flex items-center justify-between group">
                  <div className="w-1/2">
                    <p className="text-[13px] font-bold text-[#333333]">Performance Bonus</p>
                    <p className="text-[10px] text-slate-400 leading-tight pr-4">Variable amount paid during payroll. This value is defined by the company</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-mono font-bold">{bonus}</span>
                    <span className="text-[11px] text-slate-500">/ month</span>
                    <input type="number" value={bonusPct} onChange={(e)=>setBonusPct(Number(e.target.value))} className="w-14 px-2 py-1 text-xs border border-slate-200 rounded text-right" />
                    <span className="text-[11px] text-slate-500">%</span>
                  </div>
                </div>
                <hr className="border-slate-100" />

                {/* Leave Travel Allowance */}
                <div className="flex items-center justify-between group">
                  <div className="w-1/2">
                    <p className="text-[13px] font-bold text-[#333333]">Leave Travel Allowance</p>
                    <p className="text-[10px] text-slate-400 leading-tight pr-4">LTA is paid by the company to employee for travel expenses</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-mono font-bold">{lta}</span>
                    <span className="text-[11px] text-slate-500">/ month</span>
                    <input type="number" value={ltaPct} onChange={(e)=>setLtaPct(Number(e.target.value))} className="w-14 px-2 py-1 text-xs border border-slate-200 rounded text-right" />
                    <span className="text-[11px] text-slate-500">%</span>
                  </div>
                </div>
                <hr className="border-slate-100" />

                {/* Fixed Allowance */}
                <div className="flex items-center justify-between group bg-slate-50 p-2 -mx-2 rounded">
                  <div className="w-1/2">
                    <p className="text-[13px] font-bold text-[#333333]">Fixed Allowance</p>
                    <p className="text-[10px] text-slate-400 leading-tight pr-4">Fixed allowance portion of wages is determined after calculating all components</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-mono font-bold text-horilla-primary">{fixedAllowance}</span>
                    <span className="text-[11px] text-slate-500">/ month</span>
                    <span className="w-14 px-2 py-1 text-xs bg-slate-200 rounded text-right font-bold">{remainingPct.toFixed(2)}</span>
                    <span className="text-[11px] text-slate-500">%</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Deductions */}
            <div>
              <h3 className="text-[16px] font-bold text-[#333333] mb-4 border-b border-slate-200 pb-2">Provident Fund (PF) Contribution</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between group">
                  <div className="w-1/2">
                    <p className="text-[13px] font-bold text-[#333333]">Employee</p>
                    <p className="text-[10px] text-slate-400 leading-tight pr-4">PF is calculated based on the basic salary</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-mono font-bold text-red-500">-{pfAmount}</span>
                    <span className="text-[11px] text-slate-500">/ month</span>
                    <input type="number" value={pfPct} onChange={(e)=>setPfPct(Number(e.target.value))} className="w-14 px-2 py-1 text-xs border border-slate-200 rounded text-right" />
                    <span className="text-[11px] text-slate-500">%</span>
                  </div>
                </div>
                <hr className="border-slate-100" />
                
                <div className="flex items-center justify-between group">
                  <div className="w-1/2">
                    <p className="text-[13px] font-bold text-[#333333]">Employer</p>
                    <p className="text-[10px] text-slate-400 leading-tight pr-4">PF is calculated based on the basic salary</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-mono font-bold text-red-500">-{pfAmount}</span>
                    <span className="text-[11px] text-slate-500">/ month</span>
                    <span className="w-14 px-2 py-1 text-xs bg-slate-100 rounded text-right text-slate-500">{pfPct}</span>
                    <span className="text-[11px] text-slate-500">%</span>
                  </div>
                </div>
              </div>

              <h3 className="text-[16px] font-bold text-[#333333] mt-8 mb-4 border-b border-slate-200 pb-2">Tax Deductions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between group">
                  <div className="w-1/2">
                    <p className="text-[13px] font-bold text-[#333333]">Professional Tax</p>
                    <p className="text-[10px] text-slate-400 leading-tight pr-4">Professional Tax deducted from the gross salary</p>
                  </div>
                  <div className="flex items-center gap-3 pr-10">
                    <span className="text-[14px] font-mono font-bold text-red-500">-{professionalTax.toFixed(2)}</span>
                    <span className="text-[11px] text-slate-500">/ month</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#FFF8E1] border border-[#FFE082] rounded-xl text-[12px] text-[#5D4037]">
                <h4 className="font-bold mb-2 flex items-center gap-2"><Circle className="w-3 h-3 fill-yellow-400 text-yellow-600" /> Important</h4>
                <p className="mb-2">The Salary Information tab allows users to define and manage all salary-related details for an employee, including wage type, working schedule, salary components, benefits. Salary components should be calculated automatically based on the defined Wage.</p>
                <p className="font-mono mt-4">- Automatic Calculation:</p>
                <p>The system should calculate each component amount based on the employee's defined Wage. For Example: If Wage = $80,000 and Basic = 50% of Wage, then Basic = $40,000.</p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeProfileDetail;

import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  User,
  Building,
  Mail,
  Phone,
  DollarSign,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Edit2,
  Save,
  Check
} from 'lucide-react';
import { createEmployeeApi } from '../../services/api';

export const EmployeeModal = ({ isOpen, onClose, selectedEmployee = null }) => {
  const isEditMode = Boolean(selectedEmployee);

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roleName, setRoleName] = useState('EMPLOYEE');
  const [department, setDepartment] = useState('Engineering');
  const [baseSalary, setBaseSalary] = useState('65000');

  // Active Tab for Viewing Profile Mode
  const [profileTab, setProfileTab] = useState('personal'); // 'personal' | 'salary' | 'documents'

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedEmployee) {
      const nameParts = (selectedEmployee.name || '').split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setEmail(selectedEmployee.email || '');
      setPhone(selectedEmployee.phone || '+1 555-0198');
      setRoleName(selectedEmployee.role || 'EMPLOYEE');
      setDepartment(selectedEmployee.dept || 'Engineering');
      setBaseSalary(selectedEmployee.salary || '72000');
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setRoleName('EMPLOYEE');
      setDepartment('Engineering');
      setBaseSalary('65000');
    }
    setSuccessData(null);
    setErrorMsg('');
  }, [selectedEmployee, isOpen]);

  if (!isOpen) return null;

  const handleOnboardSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessData(null);
    setLoading(true);

    try {
      const res = await createEmployeeApi({
        firstName,
        lastName,
        email,
        phone,
        roleName
      });

      if (res.ok) {
        setSuccessData({
          loginId: res.data?.employee?.loginId,
          password: res.data?.employee?.generatedPassword,
          email: res.data?.employee?.email
        });
      } else {
        setErrorMsg(res.data?.message || res.error || 'Failed to onboard employee');
      }
    } catch (err) {
      setErrorMsg('Server connection error while creating employee');
    } finally {
      setLoading(false);
    }
  };

  const calculatedSalary = {
    base: parseFloat(baseSalary) || 60000,
    hra: (parseFloat(baseSalary) || 60000) * 0.20,
    allowances: 5000,
    pfDeduction: (parseFloat(baseSalary) || 60000) * 0.08,
    taxDeduction: (parseFloat(baseSalary) || 60000) * 0.10,
  };
  calculatedSalary.netPay = calculatedSalary.base + calculatedSalary.hra + calculatedSalary.allowances - calculatedSalary.pfDeduction - calculatedSalary.taxDeduction;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-modal-pop my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              {isEditMode ? 'EP' : 'OE'}
            </div>
            <div>
              <h3 className="font-sora text-lg font-bold text-[#1F2A52]">
                {isEditMode ? `Employee Profile: ${selectedEmployee.name}` : 'Onboard New Employee'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEditMode ? `Login ID: ${selectedEmployee.id}` : 'Issue auto-generated system credentials & workspace access'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewing / Editing Detailed Employee Profile Tabs */}
        {isEditMode ? (
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setProfileTab('personal')}
                className={`flex-1 py-2 text-xs font-sora font-semibold rounded-lg transition cursor-pointer ${
                  profileTab === 'personal' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-[#1F2A52]'
                }`}
              >
                Personal & Job Details
              </button>
              <button
                onClick={() => setProfileTab('salary')}
                className={`flex-1 py-2 text-xs font-sora font-semibold rounded-lg transition cursor-pointer ${
                  profileTab === 'salary' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-[#1F2A52]'
                }`}
              >
                Salary Structure
              </button>
              <button
                onClick={() => setProfileTab('documents')}
                className={`flex-1 py-2 text-xs font-sora font-semibold rounded-lg transition cursor-pointer ${
                  profileTab === 'documents' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-[#1F2A52]'
                }`}
              >
                Documents Vault
              </button>
            </div>

            {/* TAB 1: Personal Details */}
            {profileTab === 'personal' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <p className="text-slate-500">Full Name</p>
                    <p className="font-bold text-[#1F2A52] text-sm">{firstName} {lastName}</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <p className="text-slate-500">System Login ID</p>
                    <p className="font-mono font-bold text-emerald-700 text-sm">{selectedEmployee.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <p className="text-slate-500">Email Address</p>
                    <p className="font-semibold text-slate-800">{email}</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <p className="text-slate-500">Phone</p>
                    <p className="font-semibold text-slate-800">{phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <p className="text-slate-500">Department</p>
                    <p className="font-semibold text-[#1F2A52]">{department}</p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <p className="text-slate-500">Role Privilege</p>
                    <span className="font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">{roleName}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Salary Structure */}
            {profileTab === 'salary' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-emerald-950 text-white rounded-2xl flex items-center justify-between border border-emerald-900">
                  <div>
                    <p className="text-xs text-emerald-300">Annual Net Package</p>
                    <p className="font-sora text-2xl font-bold text-emerald-400">${(calculatedSalary.netPay * 12).toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-emerald-400" />
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">Base Salary (Monthly):</span>
                    <span className="font-bold text-[#1F2A52]">${calculatedSalary.base.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">HRA Allowance (20%):</span>
                    <span className="font-semibold text-emerald-600">+${calculatedSalary.hra.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">Special Allowances:</span>
                    <span className="font-semibold text-emerald-600">+${calculatedSalary.allowances.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">Provident Fund (PF):</span>
                    <span className="font-semibold text-rose-600">-${calculatedSalary.pfDeduction.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">Income Tax Deduction (10%):</span>
                    <span className="font-semibold text-rose-600">-${calculatedSalary.taxDeduction.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 font-bold text-sm text-[#1F2A52]">
                    <span>Monthly Net Payable:</span>
                    <span className="text-emerald-700">${calculatedSalary.netPay.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Documents Vault */}
            {profileTab === 'documents' && (
              <div className="space-y-3 text-xs">
                {[
                  { name: 'Employment_Contract_Signed.pdf', size: '1.4 MB', date: 'Jan 15, 2026' },
                  { name: 'Government_ID_Verification.pdf', size: '2.1 MB', date: 'Jan 12, 2026' },
                  { name: 'Tax_Declaration_Form.pdf', size: '890 KB', date: 'Feb 01, 2026' },
                ].map((doc, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <div>
                        <p className="font-semibold text-[#1F2A52]">{doc.name}</p>
                        <p className="text-[10px] text-slate-400">{doc.size} • Uploaded {doc.date}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Verified</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ONBOARD NEW EMPLOYEE FORM MODE */
          <div>
            {successData ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Employee Successfully Onboarded!</span>
                </div>
                <p className="text-slate-600">The system has generated their official credentials and dispatched a welcome email.</p>

                <div className="p-4 bg-white border border-emerald-300 rounded-xl font-mono space-y-1.5 text-slate-700">
                  <p><span className="text-slate-400">Assigned Login ID:</span> <strong className="text-emerald-700 text-sm">{successData.loginId}</strong></p>
                  <p><span className="text-slate-400">Temporary Password:</span> <strong>{successData.password}</strong></p>
                  <p><span className="text-slate-400">Sent to Email:</span> {successData.email}</p>
                </div>

                <button
                  onClick={() => setSuccessData(null)}
                  className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md"
                >
                  Onboard Another Team Member
                </button>
              </div>
            ) : (
              <form onSubmit={handleOnboardSubmit} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] focus:bg-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jenkins"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] focus:bg-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah.j@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 555-0192"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52] focus:bg-white focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52]"
                    >
                      <option>Engineering</option>
                      <option>Product Design</option>
                      <option>Human Resources</option>
                      <option>Operations</option>
                      <option>Finance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Role *</label>
                    <select
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52]"
                    >
                      <option value="EMPLOYEE">EMPLOYEE</option>
                      <option value="HR">HR OFFICER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                  📌 System auto-generates Login ID format: <code className="text-emerald-700 font-bold">COMP-EMP-2026-0001</code>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-sora font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Issue Credentials & Onboard</span>}
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default EmployeeModal;

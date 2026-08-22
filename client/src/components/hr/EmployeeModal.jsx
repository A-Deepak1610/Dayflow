import React, { useState, useEffect } from 'react';
import { UserPlus, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { createEmployeeApi } from '../../services/api';

export const EmployeeModal = ({ isOpen, onClose }) => {
  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roleName, setRoleName] = useState('EMPLOYEE');
  const [department, setDepartment] = useState('Engineering');

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setRoleName('EMPLOYEE');
      setDepartment('Engineering');
      setSuccessData(null);
      setErrorMsg('');
    }
  }, [isOpen]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 animate-modal-pop my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-horilla-primary text-white flex items-center justify-center shadow-md">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-[#333333]">
                Onboard New Employee
              </h3>
              <p className="text-[12px] text-slate-500 mt-0.5">
                Issue auto-generated system credentials & workspace access
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-[#333333] rounded-full hover:bg-slate-100 cursor-pointer transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ONBOARD NEW EMPLOYEE FORM MODE */}
        <div>
          {successData ? (
            <div className="p-5 bg-[#FCECE9] border border-[#FADBD8] rounded-xl text-[13px] space-y-4">
              <div className="flex items-center gap-2 text-horilla-primary font-bold text-[15px]">
                <CheckCircle2 className="w-5 h-5" />
                <span>Employee Successfully Onboarded!</span>
              </div>
              <p className="text-[#666666]">The system has generated their official credentials and dispatched a welcome email.</p>

              <div className="p-4 bg-white border border-[#FADBD8] rounded-lg font-mono space-y-2 text-[#333333]">
                <p><span className="text-slate-500">Assigned Login ID:</span> <strong className="text-horilla-primary ml-2">{successData.loginId}</strong></p>
                <p><span className="text-slate-500">Temporary Password:</span> <strong className="ml-2">{successData.password}</strong></p>
                <p><span className="text-slate-500">Sent to Email:</span> <span className="ml-2">{successData.email}</span></p>
              </div>

              <button
                onClick={() => setSuccessData(null)}
                className="w-full py-2.5 bg-horilla-primary text-white font-bold rounded-lg text-[13px] cursor-pointer shadow-sm hover:bg-horilla-primary-hover transition"
              >
                Onboard Another Team Member
              </button>
            </div>
          ) : (
            <form onSubmit={handleOnboardSubmit} className="space-y-5 text-[13px]">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#333333] mb-1.5">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#333333] mb-1.5">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jenkins"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#333333] mb-1.5">Work Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="sarah.j@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-[#333333] mb-1.5">Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 555-0192"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] focus:bg-white focus:border-horilla-primary outline-none transition"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#333333] mb-1.5">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none focus:border-horilla-primary transition"
                  >
                    <option>Engineering</option>
                    <option>Product Design</option>
                    <option>Human Resources</option>
                    <option>Operations</option>
                    <option>Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#333333] mb-1.5">Role *</label>
                  <select
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[#333333] outline-none focus:border-horilla-primary transition"
                  >
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="HR">HR OFFICER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                <span>📌 System auto-generates Login ID format:</span>
                <code className="text-horilla-primary font-bold bg-white px-1.5 py-0.5 rounded border border-slate-100">COMP-EMP-2026-0001</code>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-horilla-primary hover:bg-horilla-primary-hover text-white rounded-lg font-bold text-[13px] shadow-sm cursor-pointer flex items-center justify-center gap-2 transition"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Issue Credentials & Onboard</span>}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default EmployeeModal;

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  Calendar,
  DollarSign,
  UserPlus,
  LogOut,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Building,
  TrendingUp,
  Search,
  Bell,
  Sparkles,
  ChevronRight,
  Loader2,
  Check,
  AlertCircle
} from 'lucide-react';
import { createEmployeeApi } from '../../services/api';

export const HrDashboard = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // Create Employee Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roleName, setRoleName] = useState('EMPLOYEE');
  
  const [loading, setLoading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(null);
  const [modalError, setModalError] = useState('');

  // Sample data for Leave Approvals
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: 'Elena Rostova', empId: 'DAY-ER-2026-0012', type: 'Annual Leave', dates: 'Aug 24 - Aug 26', days: 3, status: 'Pending', reason: 'Family vacation' },
    { id: 2, name: 'Michael Chang', empId: 'DAY-MC-2026-0044', type: 'Sick Leave', dates: 'Aug 22 - Aug 23', days: 2, status: 'Pending', reason: 'Medical appointment' },
    { id: 3, name: 'Sarah Connor', empId: 'DAY-SC-2026-0089', type: 'Casual Leave', dates: 'Aug 29', days: 1, status: 'Approved', reason: 'Personal work' },
  ]);

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  const handleApproveLeave = (id) => {
    setLeaveRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Approved' } : req));
  };

  const handleRejectLeave = (id) => {
    setLeaveRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
  };

  const handleCreateEmployeeSubmit = async (e) => {
    e.preventDefault();
    setModalError('');
    setModalSuccess(null);
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
        setModalSuccess({
          loginId: res.data?.employee?.loginId,
          password: res.data?.employee?.generatedPassword,
          email: res.data?.employee?.email
        });
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
      } else {
        setModalError(res.data?.message || res.error || 'Failed to create employee');
      }
    } catch (err) {
      setModalError('Server error creating employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter flex flex-col">
      {/* Top HR Admin Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#1F2A52] text-[#FF5D7A] flex items-center justify-center font-sora font-bold text-sm">
                DF
              </div>
              <span className="font-sora text-lg font-extrabold text-[#1F2A52]">
                Dayflow <span className="text-[#FF5D7A]">HR Admin</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-[#FF5D7A] border border-rose-200">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <Building className="w-3.5 h-3.5 text-[#FF5D7A]" />
              <span>Workspace: {user?.companyName || 'Dayflow Org'}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-[#1F2A52]">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] text-slate-500 font-mono">{user?.loginId || 'ADMIN'}</p>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Header & Action */}
        <div className="bg-gradient-to-r from-[#1F2A52] via-[#121A36] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5D7A]/20 text-[#FF5D7A] text-xs font-semibold mb-3 border border-[#FF5D7A]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Executive Control Center</span>
            </div>
            <h1 className="font-sora text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {user?.firstName || 'HR Officer'}!
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Here is your workforce alignment breakdown for today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-3 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#FF5D7A]/30 transition flex items-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Onboard New Employee</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium">Total Employees</span>
              <Users className="w-5 h-5 text-[#FF5D7A]" />
            </div>
            <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">48</div>
            <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+3 onboarding this week</span>
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium">Today's Attendance</span>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">45 / 48</div>
            <p className="text-xs text-blue-600 mt-2 font-medium">93.7% On-time clock-in</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium">Pending Leave Requests</span>
              <Calendar className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">
              {leaveRequests.filter(r => r.status === 'Pending').length}
            </div>
            <p className="text-xs text-amber-600 mt-2 font-semibold">Action required by HR</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-medium">Payroll Cycle</span>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-sora font-extrabold text-[#1F2A52]">Ready</div>
            <p className="text-xs text-emerald-600 mt-2 font-medium">Calculated for August 2026</p>
          </div>
        </div>

        {/* Section Grid: Leave Requests & Live Attendance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Leave Approvals Table */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <h3 className="font-sora text-lg font-bold text-[#1F2A52]">Leave Approval Requests</h3>
                <p className="text-xs text-slate-500">Review time-off submissions from team members</p>
              </div>
              <span className="text-xs font-bold text-[#FF5D7A] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                HR Manager Queue
              </span>
            </div>

            <div className="space-y-3">
              {leaveRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-[#1F2A52]">{req.name}</span>
                      <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{req.empId}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{req.type}</span>
                    </div>
                    <p className="text-xs text-slate-600">{req.dates} ({req.days} days) • <span className="italic text-slate-500">"{req.reason}"</span></p>
                  </div>

                  <div className="flex items-center gap-2">
                    {req.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handleApproveLeave(req.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleRejectLeave(req.id)}
                          className="px-3 py-1.5 bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </>
                    ) : (
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {req.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Real-Time Attendance Log */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h3 className="font-sora text-lg font-bold text-[#1F2A52]">Real-Time Punch Feed</h3>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Sarah Jenkins', time: '09:02 AM', status: 'In Office', id: 'DAY-SJ-2026-0012' },
                  { name: 'Alex Rivera', time: '08:58 AM', status: 'In Office', id: 'DAY-AR-2026-0045' },
                  { name: 'David Chen', time: '09:14 AM', status: 'Late', id: 'DAY-DC-2026-0008' },
                  { name: 'Emma Watson', time: '08:45 AM', status: 'In Office', id: 'DAY-EW-2026-0033' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#1F2A52]">{item.name}</p>
                      <p className="text-[10px] font-mono text-slate-500">{item.id}</p>
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      item.status === 'In Office' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#1F2A52] text-xs font-bold rounded-xl transition cursor-pointer"
              >
                + Onboard Employee & Issue Credentials
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* Add Employee Modal Pop-up (HR / Admin Only) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-modal-pop">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <UserPlus className="w-5 h-5 text-[#FF5D7A]" />
                <h3 className="font-sora text-lg font-bold text-[#1F2A52]">Onboard Employee (HR Admin)</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full"
              >
                ✕
              </button>
            </div>

            {modalSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Employee Successfully Created!</span>
                </div>
                <div className="p-3 bg-white border border-emerald-300 rounded-xl space-y-1 font-mono text-slate-700">
                  <p><span className="text-slate-400">Assigned Login ID:</span> <strong className="text-[#FF5D7A]">{modalSuccess.loginId}</strong></p>
                  <p><span className="text-slate-400">Generated Password:</span> <strong>{modalSuccess.password}</strong></p>
                  <p><span className="text-slate-400">Email Dispatched:</span> {modalSuccess.email}</p>
                </div>
                <button
                  onClick={() => setModalSuccess(null)}
                  className="w-full py-2 bg-[#1F2A52] text-white rounded-xl font-bold text-xs"
                >
                  Onboard Another Employee
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateEmployeeSubmit} className="space-y-4">
                {modalError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                    <span>{modalError}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employee Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="john.doe@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 555-0192"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1F2A52]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Role *</label>
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
                  📌 Note: The system will auto-generate the employee's standard Login ID (`COMP+EMP+YEAR+SER`) and temporary password.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#FF5D7A] hover:bg-[#FF4263] text-white rounded-xl font-sora font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Create Employee & Issue ID</span>}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default HrDashboard;

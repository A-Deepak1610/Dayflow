import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';

export const HeroSection = ({ onOpenAuthModal }) => {
  const [activeRoleView, setActiveRoleView] = useState('admin');
  const [approvedLeave, setApprovedLeave] = useState(false);

  return (
    <section className="relative pt-8 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-slate-50">
      {/* Background Soft Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-200/40 via-purple-100/50 to-[#FF5D7A]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-[#1F2A52] text-xs font-semibold tracking-wide shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5D7A]" />
            <span className="text-[#1F2A52]">Next-Gen Human Resource Management System</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5D7A] animate-ping" />
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-sora text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1F2A52] leading-[1.15] mb-6">
            Every workday, <br />
            <span className="text-[#FF5D7A]">perfectly aligned.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-10">
            Unify your entire workforce operations in one powerful ecosystem. From seamless 
            <span className="text-[#1F2A52] font-semibold"> employee onboarding</span> and 
            <span className="text-[#1F2A52] font-semibold"> smart attendance tracking</span> to automated 
            <span className="text-[#1F2A52] font-semibold"> leave management</span> and transparent 
            <span className="text-[#FF5D7A] font-semibold"> payroll visibility</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              type="button"
              onClick={() => onOpenAuthModal && onOpenAuthModal('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-bold text-base rounded-2xl transition-all duration-300 shadow-xl shadow-[#FF5D7A]/25 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
              className="w-full sm:w-auto px-8 py-4 bg-[#1F2A52] hover:bg-[#121A36] text-white font-sora font-semibold text-base rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-[#FF5D7A]" />
              <span>Sign In (Pop-up)</span>
            </button>
          </div>
        </div>

        {/* Light Preview Dashboard Visual */}
        <div className="relative max-w-5xl mx-auto">
          {/* Subtle Outer Frame Shadow */}
          <div className="relative bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-slate-300/60 overflow-hidden">
            
            {/* Mock Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                  dayflow.app/dashboard
                </span>
              </div>

              {/* Role Toggle Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium px-2.5">Perspective:</span>
                <button
                  onClick={() => setActiveRoleView('admin')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                    activeRoleView === 'admin'
                      ? 'bg-[#FF5D7A] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#1F2A52]'
                  }`}
                >
                  Admin / HR View
                </button>
                <button
                  onClick={() => setActiveRoleView('employee')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                    activeRoleView === 'employee'
                      ? 'bg-[#1F2A52] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#1F2A52]'
                  }`}
                >
                  Employee View
                </button>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            {activeRoleView === 'admin' ? (
              <div className="space-y-6">
                {/* Stat Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-medium">Workday Alignment</span>
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-sora font-extrabold text-[#1F2A52]">99.8%</div>
                    <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                      <span>↑ +2.4%</span> vs last month
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-medium">Today's Attendance</span>
                      <Clock className="w-4 h-4 text-[#FF5D7A]" />
                    </div>
                    <div className="text-2xl font-sora font-extrabold text-[#1F2A52]">142 / 150</div>
                    <p className="text-[11px] text-slate-500 mt-1">94.6% Clocked in on time</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-medium">Pending Leaves</span>
                      <Calendar className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="text-2xl font-sora font-extrabold text-[#1F2A52]">3 Requests</div>
                    <p className="text-[11px] text-amber-600 mt-1 font-medium">Requires HR approval</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-medium">Payroll Cycle</span>
                      <DollarSign className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-sora font-extrabold text-[#1F2A52]">Calculated</div>
                    <p className="text-[11px] text-blue-600 mt-1 font-medium">Ready for 150 members</p>
                  </div>
                </div>

                {/* Live Activity & Leave Approval Interactive Widget */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Attendance Live Log */}
                  <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-sora text-sm font-bold text-[#1F2A52] flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#FF5D7A]" />
                        Real-time Attendance Flow
                      </h4>
                      <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                        Live Feed
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { name: 'Sarah Jenkins', id: 'ACME-SJ-2026-0012', time: '09:02 AM', status: 'On Time', dept: 'Engineering' },
                        { name: 'Alex Rivera', id: 'ACME-AR-2026-0045', time: '08:58 AM', status: 'On Time', dept: 'Product Design' },
                        { name: 'David Chen', id: 'ACME-DC-2026-0008', time: '09:14 AM', status: 'Late Check-in', dept: 'Operations' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1F2A52] text-white flex items-center justify-center font-bold text-xs">
                              {item.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-[#1F2A52]">{item.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{item.id} • {item.dept}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                              item.status === 'On Time' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {item.status} ({item.time})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Leave Request Approval Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-[#1F2A52] uppercase tracking-wider">Leave Approval</span>
                        <span className="text-[10px] text-[#FF5D7A] font-bold">1 Click Approval</span>
                      </div>
                      <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-[#1F2A52]">Elena Rostova</span>
                          <span className="text-[10px] bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded">Annual Leave</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mb-1">Aug 24 - Aug 26 (3 Days)</p>
                        <p className="text-[10px] text-slate-400 italic">"Family obligation & personal leave."</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setApprovedLeave(!approvedLeave)}
                      className={`w-full py-2.5 rounded-xl font-sora font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        approvedLeave
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-[#FF5D7A] hover:bg-[#FF4263] text-white shadow-md'
                      }`}
                    >
                      {approvedLeave ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approved & Calendar Synced</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve Leave Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Employee Self-Service View Preview */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <p className="text-xs text-slate-500 mb-1">Your Login ID</p>
                    <p className="text-lg font-mono font-bold text-[#FF5D7A]">DAY-SJ-2026-0089</p>
                    <p className="text-[11px] text-slate-600 mt-2">Role: Senior Frontend Engineer</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <p className="text-xs text-slate-500 mb-1">Today's Shift Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-sm font-semibold text-emerald-700">Clocked In (08:58 AM)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-2">Shift: 09:00 AM - 06:00 PM</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <p className="text-xs text-slate-500 mb-1">Leave Balance</p>
                    <p className="text-lg font-sora font-bold text-[#1F2A52]">18 Days Remaining</p>
                    <p className="text-[11px] text-slate-600 mt-2">12 Paid • 6 Casual</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-emerald-600 bg-emerald-50 p-1 rounded-lg" />
                    <div>
                      <p className="text-xs font-semibold text-[#1F2A52]">Latest Payslip Issued — August 2026</p>
                      <p className="text-[10px] text-slate-500">Directly deposited to verified account</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#1F2A52] border border-slate-300 rounded-lg cursor-pointer"
                  >
                    View Payslip Details
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

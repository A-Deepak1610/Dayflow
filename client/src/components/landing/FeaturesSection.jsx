import React, { useState } from 'react';
import { 
  UserPlus, 
  Clock, 
  CalendarDays, 
  Receipt, 
  ArrowRight,
  ShieldCheck,
  Lock,
  Eye,
  Sparkles,
  CheckCircle2,
  Download,
  Wifi,
  FileCheck2,
  ChevronRight
} from 'lucide-react';

const FeaturesSection = ({ onOpenAuthModal }) => {
  const [activeFeature, setActiveFeature] = useState('onboarding');
  const [selectedRoleTab, setSelectedRoleTab] = useState('admin');

  // Interactive Mockup State for Onboarding
  const [onboardedId] = useState('DAY-2026-089');
  
  // Interactive Mockup State for Attendance
  const [isClockedIn, setIsClockedIn] = useState(true);

  // Interactive Mockup State for Leave
  const [leaveApproved, setLeaveApproved] = useState(true);

  const modules = [
    {
      id: 'onboarding',
      title: 'Digital Onboarding',
      subtitle: 'Paperless employee setup & digital KYC vault',
      icon: UserPlus,
      badge: 'Zero Paper',
      highlights: [
        'Automated ID & company credentials creation',
        'Centralized digital KYC document vault',
        'Self-service profile completion portal'
      ]
    },
    {
      id: 'attendance',
      title: 'Smart Attendance',
      subtitle: 'Geo-fenced live check-in telemetry',
      icon: Clock,
      badge: 'Real-Time',
      highlights: [
        'One-click clock-in / clock-out telemetry',
        'Timesheet anomaly & overtime detection',
        'Live presence & activity dashboard'
      ]
    },
    {
      id: 'leaves',
      title: 'Leave Management',
      subtitle: 'Transparent matrix & instant approvals',
      icon: CalendarDays,
      badge: 'Automated',
      highlights: [
        'Real-time leave balance tracking',
        'Custom multi-level approval workflows',
        'Holiday calendar & shift integration'
      ]
    },
    {
      id: 'payroll',
      title: 'Payroll Visibility',
      subtitle: 'Instant PDF payslips & tax deduction audits',
      icon: Receipt,
      badge: 'Compliant',
      highlights: [
        'Detailed breakdown of tax & deductions',
        'Instant one-click PDF downloads',
        'Direct digital payslip distribution'
      ]
    }
  ];

  const currentModule = modules.find(m => m.id === activeFeature) || modules[0];

  return (
    <section id="features" className="py-20 lg:py-28 relative bg-[#0a0a0a] text-slate-100 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF5D7A]/10 border border-[#FF5D7A]/30 text-[#FF5D7A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Product Suite</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Explore the core modules of <br />
            <span className="text-[#FF5D7A]">Dayflow HRMS.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Select a module to experience live interactive workflows designed to automate administrative tasks and empower your workforce.
          </p>
        </div>

        {/* Master Interactive Tab Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left Column: Module Navigation Tabs (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            {modules.map((mod) => {
              const Icon = mod.icon;
              const isActive = mod.id === activeFeature;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveFeature(mod.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#18181c] border-[#FF5D7A] shadow-xl shadow-[#FF5D7A]/10'
                      : 'bg-[#111113] border-white/10 hover:bg-[#18181c] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 ${
                        isActive 
                          ? 'bg-[#FF5D7A] text-white scale-105 shadow-md shadow-[#FF5D7A]/30' 
                          : 'bg-[#18181b] text-[#FF5D7A] border border-white/10 group-hover:bg-[#FF5D7A]/10'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`font-sora text-base font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {mod.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {mod.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'text-[#FF5D7A] translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Product Canvas Showcase (8 cols) */}
          <div className="lg:col-span-8 bg-[#111113] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[480px]">
            
            {/* Background Ambient Glow (#FF5D7A only) */}
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FF5D7A] opacity-10 blur-3xl pointer-events-none" />

            <div>
              {/* Canvas Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#FF5D7A]/10 text-[#FF5D7A] border border-[#FF5D7A]/20">
                      {currentModule.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Module v2.4</span>
                  </div>
                  <h3 className="font-sora text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    {currentModule.title}
                  </h3>
                </div>

                <button
                  onClick={() => onOpenAuthModal && onOpenAuthModal('signup')}
                  className="px-5 py-2.5 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-semibold text-xs rounded-xl shadow-md shadow-[#FF5D7A]/20 cursor-pointer flex items-center gap-2 transition w-fit"
                >
                  <span>Try {currentModule.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Interactive Feature Canvas Content (Pure White + #FF5D7A palette) */}
              <div className="py-8">
                
                {/* 1. Onboarding Interactive Canvas */}
                {activeFeature === 'onboarding' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#FF5D7A]/20 text-[#FF5D7A] border border-[#FF5D7A]/30 flex items-center justify-center font-sora font-extrabold text-base">
                            JC
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">Jane Cooper</h4>
                            <p className="text-xs text-slate-400">Software Engineer • Engineering</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <span className="text-[11px] font-mono text-slate-400 block">Generated ID:</span>
                          <span className="text-xs font-mono font-bold text-[#FF5D7A] bg-[#FF5D7A]/10 px-2.5 py-0.5 rounded border border-[#FF5D7A]/20">
                            {onboardedId}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-[#18181b] p-3 rounded-xl border border-white/10 flex items-center justify-between">
                          <span className="text-slate-300 font-medium">Government Photo ID</span>
                          <span className="text-[#FF5D7A] font-bold">✓ Verified</span>
                        </div>
                        <div className="bg-[#18181b] p-3 rounded-xl border border-white/10 flex items-center justify-between">
                          <span className="text-slate-300 font-medium">Digital NDA & W-4</span>
                          <span className="text-[#FF5D7A] font-bold">✓ Signed</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 text-xs">
                        <span className="text-slate-400">Onboarding Status</span>
                        <span className="text-[#FF5D7A] font-bold font-mono">100% Completed</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Attendance Interactive Canvas */}
                {activeFeature === 'attendance' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${isClockedIn ? 'bg-[#FF5D7A] animate-pulse' : 'bg-slate-500'}`} />
                          <span className="text-sm font-mono font-bold text-white">
                            {isClockedIn ? '09:08 AM · Active Session' : 'Offline / Checked Out'}
                          </span>
                        </div>

                        <button
                          onClick={() => setIsClockedIn(!isClockedIn)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold font-sora cursor-pointer transition ${
                            isClockedIn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#FF5D7A] text-white hover:bg-[#FF4263]'
                          }`}
                        >
                          {isClockedIn ? 'Simulate Check Out' : 'Simulate Check In'}
                        </button>
                      </div>

                      <div className="bg-[#18181b] p-4 rounded-xl border border-white/10 space-y-2">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Weekly Hours (Target: 40h)</span>
                          <span className="text-[#FF5D7A] font-bold">36.5h Tracked</span>
                        </div>
                        <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden p-0.5">
                          <div className="bg-[#FF5D7A] h-full rounded-full w-[91%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Leave Interactive Canvas */}
                {activeFeature === 'leaves' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 space-y-4">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-[#18181b] p-3 rounded-xl border border-white/10">
                          <span className="text-[10px] text-slate-400 font-mono block">ANNUAL</span>
                          <span className="text-sm font-bold text-white">12 Days</span>
                        </div>
                        <div className="bg-[#18181b] p-3 rounded-xl border border-white/10">
                          <span className="text-[10px] text-slate-400 font-mono block">SICK</span>
                          <span className="text-sm font-bold text-white">6 Days</span>
                        </div>
                        <div className="bg-[#18181b] p-3 rounded-xl border border-white/10">
                          <span className="text-[10px] text-slate-400 font-mono block">CASUAL</span>
                          <span className="text-sm font-bold text-white">4 Days</span>
                        </div>
                      </div>

                      <div className="bg-[#18181b] p-4 rounded-xl border border-white/10 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">Casual Leave Application</p>
                          <p className="text-[11px] text-slate-400">25 Aug – 28 Aug 2026 (3 Days)</p>
                        </div>
                        
                        <button
                          onClick={() => setLeaveApproved(!leaveApproved)}
                          className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer bg-[#FF5D7A]/10 text-[#FF5D7A] border border-[#FF5D7A]/20"
                        >
                          {leaveApproved ? 'Approved ✓' : 'Pending Approval ⏳'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Payroll Interactive Canvas */}
                {activeFeature === 'payroll' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono uppercase">Net Monthly Salary</span>
                          <p className="text-2xl font-sora font-extrabold text-white">₹72,500</p>
                        </div>
                        <div className="text-right text-xs text-slate-400 font-mono">
                          <p>Gross Pay: ₹80,000</p>
                          <p className="text-[#FF5D7A]">Deductions: -₹7,500</p>
                        </div>
                      </div>

                      <div className="bg-[#18181b] p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-slate-200">
                          <FileCheck2 className="w-4 h-4 text-[#FF5D7A]" />
                          <span>August_2026_Payslip.pdf</span>
                        </div>
                        <span className="text-xs font-bold text-[#FF5D7A] flex items-center gap-1 cursor-pointer hover:underline">
                          <Download className="w-3.5 h-3.5" /> Download PDF
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Highlights Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10">
                {currentModule.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-[#18181b]/50 p-2.5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5D7A] shrink-0" />
                    <span className="line-clamp-1">{item}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Role-Based Access Highlight Box (Admin/HR vs Employee) */}
        <div className="relative bg-gradient-to-br from-slate-900 via-[#111113] to-[#0a0a0a] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5D7A]/20 text-[#FF5D7A] text-xs font-semibold mb-4 border border-[#FF5D7A]/30">
                <ShieldCheck className="w-4 h-4" />
                <span>Feature Spotlight #5</span>
              </div>
              <h3 className="font-sora text-3xl font-extrabold text-white mb-4">
                Role-Based Access Control <br />
                <span className="text-[#FF5D7A]">(Admin/HR vs Employee)</span>
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Enforce privacy with custom permissions. Administrators & HR Officers gain full executive oversight, policy creation, and approval powers, while Employees enjoy a clean self-service portal.
              </p>

              {/* Interactive Switcher */}
              <div className="flex items-center gap-3 p-1.5 bg-[#0a0a0a] rounded-2xl border border-white/10 w-fit mb-6">
                <button
                  onClick={() => setSelectedRoleTab('admin')}
                  className={`px-5 py-2.5 rounded-xl font-sora text-xs font-bold transition-all cursor-pointer ${
                    selectedRoleTab === 'admin'
                      ? 'bg-[#FF5D7A] text-white shadow-md shadow-[#FF5D7A]/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Admin / HR Officer Role
                </button>
                <button
                  onClick={() => setSelectedRoleTab('employee')}
                  className={`px-5 py-2.5 rounded-xl font-sora text-xs font-bold transition-all cursor-pointer ${
                    selectedRoleTab === 'employee'
                      ? 'bg-white/10 text-white border border-white/20 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Employee Role
                </button>
              </div>
            </div>

            {/* Preview Panel for Active Role */}
            <div className="lg:w-1/2 w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
              {selectedRoleTab === 'admin' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-sora">
                      <Lock className="w-4 h-4 text-[#FF5D7A]" />
                      Admin & HR Officer Control Center
                    </span>
                    <span className="text-[10px] bg-[#FF5D7A]/20 text-[#FF5D7A] font-mono px-2 py-0.5 rounded border border-[#FF5D7A]/30">
                      Full Access
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-[#18181b] border border-white/10 flex items-center justify-between">
                      <span>✓ Organization Setup & Logo Upload</span>
                      <span className="text-[#FF5D7A] font-mono text-[10px] bg-[#FF5D7A]/10 px-2 py-0.5 rounded border border-[#FF5D7A]/20">ADMIN ONLY</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#18181b] border border-white/10 flex items-center justify-between">
                      <span>✓ Auto-generate Employee IDs</span>
                      <span className="text-[#FF5D7A] font-mono text-[10px] bg-[#FF5D7A]/10 px-2 py-0.5 rounded border border-[#FF5D7A]/20">HR + ADMIN</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#18181b] border border-white/10 flex items-center justify-between">
                      <span>✓ Review & Approve Leave Requests</span>
                      <span className="text-[#FF5D7A] font-mono text-[10px] bg-[#FF5D7A]/10 px-2 py-0.5 rounded border border-[#FF5D7A]/20">HR + ADMIN</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#18181b] border border-white/10 flex items-center justify-between">
                      <span>✓ Company-wide Payroll Execution</span>
                      <span className="text-[#FF5D7A] font-mono text-[10px] bg-[#FF5D7A]/10 px-2 py-0.5 rounded border border-[#FF5D7A]/20">ADMIN ONLY</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-sora">
                      <Eye className="w-4 h-4 text-[#FF5D7A]" />
                      Employee Self-Service Portal
                    </span>
                    <span className="text-[10px] bg-white/10 text-white font-mono px-2 py-0.5 rounded border border-white/20">
                      Personal View
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-[#18181b] border border-white/10 flex items-center justify-between">
                      <span>✓ Daily Clock-In / Clock-Out</span>
                      <span className="text-white font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/20">SELF SERVICE</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#18181b] border border-white/10 flex items-center justify-between">
                      <span>✓ Submit Leave Application</span>
                      <span className="text-white font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/20">SELF SERVICE</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#18181b] border border-white/10 flex items-center justify-between">
                      <span>✓ View Personal Leave Balances</span>
                      <span className="text-white font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/20">SELF SERVICE</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#18181b] border border-white/10 flex items-center justify-between">
                      <span>✓ Download Personal Payslip PDF</span>
                      <span className="text-white font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/20">SELF SERVICE</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;

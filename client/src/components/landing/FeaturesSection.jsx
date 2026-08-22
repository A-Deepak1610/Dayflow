import React, { useState } from 'react';
import { 
  Users, 
  CalendarClock, 
  FileCheck, 
  Wallet, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Lock,
  Eye,
  Sparkles
} from 'lucide-react';

const FeaturesSection = ({ onOpenAuthModal }) => {
  const [selectedTab, setSelectedTab] = useState('admin');

  const features = [
    {
      id: 'onboarding',
      title: 'Digital Onboarding',
      description: 'Go paperless from day one. Auto-generate employee IDs, collect digital signatures, and securely store KYC documents in a centralized vault.',
      icon: Users,
      badge: 'Zero Paper',
      highlights: [
        'Automated ID generation',
        'Secure document vault',
        'Self-service profile completion'
      ],
      color: 'bg-blue-50/50',
      bgGradient: 'from-blue-500 to-blue-600',
      accentColor: 'text-blue-400',
      borderColor: 'hover:border-blue-500/50'
    },
    {
      id: 'attendance',
      title: 'Smart Attendance',
      description: 'Real-time clock-in/out tracking with IP and geofencing capabilities. Employees see exactly what the HR sees, fostering absolute trust.',
      icon: CalendarClock,
      badge: 'Real-time',
      highlights: [
        'One-click clock-in/out',
        'Timesheet anomaly detection',
        'Live presence dashboard'
      ],
      color: 'bg-indigo-50/50',
      bgGradient: 'from-indigo-500 to-indigo-600',
      accentColor: 'text-indigo-400',
      borderColor: 'hover:border-indigo-500/50'
    },
    {
      id: 'leaves',
      title: 'Leave Management',
      description: 'A transparent approval matrix. Employees can check balances and apply for time-off in seconds. Managers can approve with one click.',
      icon: FileCheck,
      badge: 'Automated',
      highlights: [
        'Real-time balance tracking',
        'Custom approval workflows',
        'Holiday calendar integration'
      ],
      color: 'bg-purple-50/50',
      bgGradient: 'from-purple-500 to-purple-600',
      accentColor: 'text-purple-400',
      borderColor: 'hover:border-purple-500/50'
    },
    {
      id: 'payroll',
      title: 'Payroll Visibility',
      description: 'No more payroll mysteries. Employees get instant access to beautiful, clear PDF payslips the moment salaries are disbursed.',
      icon: Wallet,
      badge: 'Compliant',
      highlights: [
        'Clear breakdown of deductions',
        'One-click PDF downloads',
        'Direct digital payslip delivery'
      ],
      color: 'bg-emerald-50/50',
      bgGradient: 'from-emerald-500 to-emerald-600',
      accentColor: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/50'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-28 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FF5D7A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Modules</span>
          </div>
          <h2 className="font-sora text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Everything your HR team needs, <br />
            <span className="text-[#FF5D7A]">without the clutter.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Purpose-built tools designed to save HR managers up to 20 hours per week while offering employees a transparent self-service portal.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.id} 
                className="group relative bg-[#111] rounded-3xl p-8 border border-white/10 hover:border-[#FF5D7A]/50 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {/* Decorative Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${feature.bgGradient} mb-6 shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-sora text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                    {feature.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {feature.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs font-medium text-slate-300">
                        <Check className={`w-4 h-4 ${feature.accentColor} shrink-0`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                  <span className="text-xs text-slate-500 font-mono">Dayflow Module v2.4</span>
                  <button
                    onClick={() => onOpenAuthModal && onOpenAuthModal('signup')}
                    className="text-xs font-semibold text-[#FF5D7A] hover:text-white flex items-center gap-1 group/btn cursor-pointer transition-colors"
                  >
                    <span>Explore Module</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Role-Based Access Highlight Box (Admin/HR vs Employee) */}
        <div className="relative bg-gradient-to-br from-slate-900 via-[#1F2A52] to-[#121A36] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-white/10">
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
              <div className="flex items-center gap-3 p-1.5 bg-[#0F172A] rounded-2xl border border-slate-800 w-fit mb-6">
                <button
                  onClick={() => setSelectedTab('admin')}
                  className={`px-5 py-2.5 rounded-xl font-sora text-xs font-bold transition-all cursor-pointer ${
                    selectedTab === 'admin'
                      ? 'bg-[#FF5D7A] text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Admin / HR Officer Role
                </button>
                <button
                  onClick={() => setSelectedTab('employee')}
                  className={`px-5 py-2.5 rounded-xl font-sora text-xs font-bold transition-all cursor-pointer ${
                    selectedTab === 'employee'
                      ? 'bg-[#1F2A52] text-white border border-[#FF5D7A]/50 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Employee Role
                </button>
              </div>
            </div>

            {/* Preview Panel for Active Role */}
            <div className="lg:w-1/2 w-full bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-2xl">
              {selectedTab === 'admin' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#FF5D7A]" />
                      Admin & HR Officer Control Center
                    </span>
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 font-mono px-2 py-0.5 rounded">
                      Full Access
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-2.5 rounded-lg bg-[#121A36] border border-slate-800 flex items-center justify-between">
                      <span>✓ Organization Setup & Logo Upload</span>
                      <span className="text-emerald-400 font-mono text-[10px]">ADMIN ONLY</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#121A36] border border-slate-800 flex items-center justify-between">
                      <span>✓ Auto-generate Employee IDs</span>
                      <span className="text-emerald-400 font-mono text-[10px]">HR + ADMIN</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#121A36] border border-slate-800 flex items-center justify-between">
                      <span>✓ Review & Approve Leave Requests</span>
                      <span className="text-emerald-400 font-mono text-[10px]">HR + ADMIN</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#121A36] border border-slate-800 flex items-center justify-between">
                      <span>✓ Company-wide Payroll Execution</span>
                      <span className="text-emerald-400 font-mono text-[10px]">ADMIN ONLY</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-400" />
                      Employee Self-Service Portal
                    </span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded">
                      Personal View
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-2.5 rounded-lg bg-[#121A36] border border-slate-800 flex items-center justify-between">
                      <span>✓ Daily Clock-In / Clock-Out</span>
                      <span className="text-blue-400 font-mono text-[10px]">SELF SERVICE</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#121A36] border border-slate-800 flex items-center justify-between">
                      <span>✓ Submit Leave Application</span>
                      <span className="text-blue-400 font-mono text-[10px]">SELF SERVICE</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#121A36] border border-slate-800 flex items-center justify-between">
                      <span>✓ View Personal Leave Balances</span>
                      <span className="text-blue-400 font-mono text-[10px]">SELF SERVICE</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#121A36] border border-slate-800 flex items-center justify-between">
                      <span>✓ Download Personal Payslip PDF</span>
                      <span className="text-blue-400 font-mono text-[10px]">SELF SERVICE</span>
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

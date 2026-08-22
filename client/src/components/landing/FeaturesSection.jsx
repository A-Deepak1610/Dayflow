import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  UserCheck,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Sliders,
  Check,
  Building,
  Lock,
  Eye,
  ChevronRight
} from 'lucide-react';

export const FeaturesSection = ({ onOpenAuth }) => {
  const [selectedTab, setSelectedTab] = useState('admin'); // 'admin' | 'employee'

  const features = [
    {
      id: 'attendance',
      icon: Clock,
      title: 'Attendance Tracking',
      badge: 'Real-Time & Geo-Fenced',
      description: 'Capture exact check-in/out timestamps with automated IP validation, shift schedule enforcement, and overtime calculations.',
      highlights: [
        'One-touch mobile & desktop clock-in',
        'Automated late arrival & early exit flags',
        'Custom shift rules & break tracking'
      ],
      color: 'from-blue-500/20 to-[#1F2A52]',
      accentColor: 'text-blue-400',
      borderColor: 'hover:border-blue-500/50'
    },
    {
      id: 'leave',
      icon: Calendar,
      title: 'Leave & Time-Off Management',
      badge: 'Instant Auto-Accruals',
      description: 'Streamline vacation requests, sick leave, and paid time off with 1-click HR approvals and real-time team balance tracking.',
      highlights: [
        'Multi-policy leave accrual engine',
        'Shared team availability calendar',
        'Automatic weekend & holiday exclusions'
      ],
      color: 'from-[#FF5D7A]/20 to-[#1F2A52]',
      accentColor: 'text-[#FF5D7A]',
      borderColor: 'hover:border-[#FF5D7A]/50'
    },
    {
      id: 'profiles',
      icon: UserCheck,
      title: '360° Employee Profiles',
      badge: 'Unified Digital Directory',
      description: 'Centralize employee records, contracts, emergency contacts, performance milestones, and automated onboarding workflows.',
      highlights: [
        'Secure cloud document vault',
        'Auto-generated employee IDs',
        'Interactive org chart & team directory'
      ],
      color: 'from-purple-500/20 to-[#1F2A52]',
      accentColor: 'text-purple-400',
      borderColor: 'hover:border-purple-500/50'
    },
    {
      id: 'payroll',
      icon: DollarSign,
      title: 'Payroll Visibility',
      badge: '100% Transparent Engine',
      description: 'Eliminate end-of-month pay errors with real-time gross-to-net salary previews, bonus additions, and instant payslip PDF downloads.',
      highlights: [
        'Automated attendance-to-payroll sync',
        'Itemized tax & deduction breakdowns',
        'Direct digital payslip delivery'
      ],
      color: 'from-emerald-500/20 to-[#1F2A52]',
      accentColor: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/50'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 relative bg-[#0B1120]">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#1F2A52] blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F2A52] border border-[#FF5D7A]/30 text-[#FF5D7A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Modules</span>
          </div>

          <h2 className="font-sora text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Everything your HR team needs, <br />
            <span className="text-[#FF5D7A]">without the clutter.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Purpose-built tools designed to save HR managers up to 20 hours per week while offering employees a transparent, friction-free portal.
          </p>
        </div>

        {/* Feature Cards 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className={`relative group bg-[#121A36]/80 border border-slate-800 rounded-3xl p-8 transition-all duration-300 ${feature.borderColor} hover:shadow-2xl hover:shadow-black/40 flex flex-col justify-between overflow-hidden`}
              >
                {/* Background accent gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#1F2A52] border border-slate-700/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`w-6 h-6 ${feature.accentColor}`} />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="font-sora text-2xl font-bold text-white mb-3 group-hover:text-white transition">
                    {feature.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800">
                    {feature.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs font-medium text-slate-300">
                        <Check className={`w-4 h-4 ${feature.accentColor} shrink-0`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Dayflow Module v2.4</span>
                  <button
                    onClick={() => onOpenAuth && onOpenAuth('signup')}
                    className="text-xs font-semibold text-[#FF5D7A] hover:text-white flex items-center gap-1 group/btn cursor-pointer"
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
        <div className="relative bg-gradient-to-br from-[#1F2A52] via-[#121A36] to-[#0F172A] border border-[#FF5D7A]/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5D7A]/15 text-[#FF5D7A] text-xs font-semibold mb-4 border border-[#FF5D7A]/30">
                <ShieldCheck className="w-4 h-4" />
                <span>Feature Spotlight #5</span>
              </div>
              <h3 className="font-sora text-3xl font-extrabold text-white mb-4">
                Role-Based Access Control <br />
                <span className="text-[#FF5D7A]">(Admin/HR vs Employee)</span>
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Enforce security & privacy with custom permissions. Administrators & HR Officers gain full executive oversight, policy creation, and approval powers, while Employees enjoy a clean self-service portal.
              </p>

              {/* Interactive Switcher */}
              <div className="flex items-center gap-3 p-1.5 bg-[#0F172A] rounded-2xl border border-slate-700 w-fit mb-6">
                <button
                  onClick={() => setSelectedTab('admin')}
                  className={`px-5 py-2.5 rounded-xl font-sora text-xs font-bold transition-all cursor-pointer ${
                    selectedTab === 'admin'
                      ? 'bg-[#FF5D7A] text-white shadow-lg shadow-[#FF5D7A]/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Admin / HR Officer Role
                </button>
                <button
                  onClick={() => setSelectedTab('employee')}
                  className={`px-5 py-2.5 rounded-xl font-sora text-xs font-bold transition-all cursor-pointer ${
                    selectedTab === 'employee'
                      ? 'bg-[#1F2A52] text-white border border-[#FF5D7A]/40 shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Employee Role
                </button>
              </div>
            </div>

            {/* Preview Panel for Active Role */}
            <div className="lg:w-1/2 w-full bg-[#0F172A]/90 border border-slate-700 rounded-2xl p-6 shadow-xl">
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
                      <span>✓ Auto-generate Employee IDs & Issuance</span>
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

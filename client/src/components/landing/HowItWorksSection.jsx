import React from 'react';
import { Building, Key, CheckCircle2, Sparkles, ArrowRight, Shield } from 'lucide-react';

export const HowItWorksSection = ({ onOpenAuth }) => {
  const steps = [
    {
      step: '01',
      icon: Building,
      title: 'Register Company & Logo',
      description: 'The HR Officer or Admin signs up with company details, logo, and contact info in under 60 seconds.',
      detail: 'Instant workspace provisioned with customizable organization rules.'
    },
    {
      step: '02',
      icon: Key,
      title: 'Auto-Generate Employee IDs',
      description: 'Dayflow generates standardized Login IDs & temporary passwords automatically upon employee onboarding.',
      detail: 'Format: Company Initials + Employee Initials + Join Year + Serial No (e.g. ACME-JD-2026-0001).'
    },
    {
      step: '03',
      icon: CheckCircle2,
      title: 'Align Daily Operations',
      description: 'Employees log in to track attendance, request time off, and access payslips with zero friction.',
      detail: 'Automated policy enforcement & real-time compliance reporting.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 relative bg-[#121A36]/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F2A52] border border-[#FF5D7A]/30 text-[#FF5D7A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Friction-Free Onboarding</span>
          </div>

          <h2 className="font-sora text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            How Dayflow aligns your workday in <br />
            <span className="text-[#FF5D7A]">3 simple steps.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            No long implementation cycles or steep learning curves. Get your entire team aligned in a single afternoon.
          </p>
        </div>

        {/* 3 Step Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="relative bg-[#0F172A] border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col justify-between group hover:border-[#FF5D7A]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-sora text-4xl font-extrabold text-[#1F2A52] group-hover:text-[#FF5D7A] transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#1F2A52] border border-slate-700 flex items-center justify-center text-[#FF5D7A] shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-sora text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <div className="p-3 bg-[#121A36] rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 flex items-start gap-2">
                    <Shield className="w-4 h-4 text-[#FF5D7A] shrink-0 mt-0.5" />
                    <span>{item.detail}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => onOpenAuth && onOpenAuth('signup')}
            className="px-8 py-3.5 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-semibold text-sm rounded-xl transition duration-200 shadow-xl shadow-[#FF5D7A]/25 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Start Your 14-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;

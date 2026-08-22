import React from 'react';
import { Building, Key, CheckCircle2, Sparkles, ArrowRight, Shield } from 'lucide-react';

export const HowItWorksSection = ({ onOpenAuthModal }) => {
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
    <section id="how-it-works" className="w-full py-20 lg:py-28 relative bg-gradient-to-tr from-[#E5DAE2] via-[#F8F2F6] to-[#EFE7EC] border-y border-[#E2D5E0] text-[#281A26] font-inter overflow-hidden">
      
      {/* Hero-matched Ambient Shading Blobs */}
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#FF5D7A]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#3D273A]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDFBFD]/80 backdrop-blur-md border border-[#E2D5E0] text-[#FF5D7A] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Friction-Free Onboarding</span>
          </div>

          <h2 className="font-sora text-3xl sm:text-5xl font-extrabold text-[#281A26] tracking-tight leading-tight mb-4">
            How Dayflow aligns your workday in <br />
            <span className="text-[#FF5D7A]">3 simple steps.</span>
          </h2>

          <p className="text-[#6B5667] text-base sm:text-lg">
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
                className="relative bg-[#FDFBFD]/90 backdrop-blur-md border border-[#E2D5E0] rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-[#FF5D7A]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-sora text-4xl font-extrabold text-slate-300 group-hover:text-[#FF5D7A] transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#F5ECF2] border border-[#E2D5E0] flex items-center justify-center text-[#FF5D7A] shadow-sm">
                      <IconComponent className="w-6 h-6 text-[#FF5D7A]" />
                    </div>
                  </div>

                  <h3 className="font-sora text-xl font-bold text-[#281A26] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-[#6B5667] text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2D5E0]">
                  <div className="p-3 bg-[#F5ECF2] rounded-xl border border-[#E2D5E0] text-[11px] font-mono text-[#281A26] flex items-start gap-2">
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
            onClick={() => onOpenAuthModal && onOpenAuthModal('signup')}
            className="px-8 py-3.5 bg-[#FF5D7A] hover:bg-[#FF4263] text-white font-sora font-semibold text-sm rounded-xl transition duration-200 shadow-lg shadow-[#FF5D7A]/20 inline-flex items-center gap-2 cursor-pointer"
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

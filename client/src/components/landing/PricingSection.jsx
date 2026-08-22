import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const PricingSection = ({ onOpenAuth }) => {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for small teams & growing startups getting started with automated HR.',
      priceMonthly: '$29',
      priceAnnual: '$22',
      badge: 'Up to 25 Employees',
      popular: false,
      features: [
        'Real-time Attendance Tracking',
        'Basic Leave & Time-off Requests',
        'Digital Employee Directory',
        'Auto-generated Employee Login IDs',
        'Email Support'
      ],
      ctaText: 'Start Free Trial',
      ctaVariant: 'secondary'
    },
    {
      name: 'Growth',
      description: 'Full-featured HR ecosystem for established teams seeking complete workforce alignment.',
      priceMonthly: '$79',
      priceAnnual: '$59',
      badge: 'Up to 150 Employees',
      popular: true,
      features: [
        'Everything in Starter, plus:',
        'Advanced Geo & IP Attendance Rules',
        'Automated Payroll Calculation Engine',
        'Custom Leave Policy Accruals',
        'Role-Based Admin vs Employee Portals',
        'Priority 24/7 HR Support & Training'
      ],
      ctaText: 'Get Started Now',
      ctaVariant: 'primary'
    },
    {
      name: 'Enterprise',
      description: 'Custom security, dedicated compliance manager, and API integrations for large enterprises.',
      priceMonthly: 'Custom',
      priceAnnual: 'Custom',
      badge: 'Unlimited Employees',
      popular: false,
      features: [
        'Everything in Growth, plus:',
        'Custom SSO & Active Directory Integration',
        'Multi-Entity & Regional Compliance',
        'Dedicated Customer Success Manager',
        'Custom API & Webhook Access',
        '99.99% Guaranteed SLA Uptime'
      ],
      ctaText: 'Contact Enterprise Team',
      ctaVariant: 'secondary'
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32 relative bg-[#0B1120]">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-[#FF5D7A]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F2A52] border border-[#FF5D7A]/30 text-[#FF5D7A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>

          <h2 className="font-sora text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Predictable plans for <br />
            <span className="text-[#FF5D7A]">teams of all sizes.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg mb-8">
            No hidden setup fees or surprise charges. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-[#121A36] rounded-2xl border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-sora font-semibold transition cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#1F2A52] text-white shadow-md border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-xl text-xs font-sora font-semibold transition flex items-center gap-2 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-[#FF5D7A] text-white shadow-lg shadow-[#FF5D7A]/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-[#121A36] border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'border-[#FF5D7A] shadow-2xl shadow-[#FF5D7A]/15 lg:-translate-y-2'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF5D7A] text-white text-[11px] font-sora font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular Plan
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-sora text-2xl font-bold text-white">{plan.name}</h3>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#1F2A52] text-slate-300 border border-slate-700">
                    {plan.badge}
                  </span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  {plan.priceMonthly === 'Custom' ? (
                    <div className="text-3xl font-sora font-extrabold text-white">Custom Quote</div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="font-sora text-4xl sm:text-5xl font-extrabold text-white">
                        {billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly}
                      </span>
                      <span className="text-slate-400 text-sm">/ month / employee</span>
                    </div>
                  )}
                  {billingCycle === 'annual' && plan.priceMonthly !== 'Custom' && (
                    <span className="text-[11px] text-[#FF5D7A] font-semibold block mt-1">
                      Billed annually (Includes 25% discount)
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-[#FF5D7A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenAuth && onOpenAuth('signup')}
                className={`w-full py-3.5 rounded-xl font-sora font-semibold text-xs transition duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                  plan.ctaVariant === 'primary'
                    ? 'bg-[#FF5D7A] hover:bg-[#FF4263] text-white shadow-xl shadow-[#FF5D7A]/30'
                    : 'bg-[#1F2A52] hover:bg-[#2A386C] border border-slate-700 text-white'
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;

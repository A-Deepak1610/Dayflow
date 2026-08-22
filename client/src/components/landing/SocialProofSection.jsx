import React from 'react';
import { Star, Sparkles, Quote } from 'lucide-react';

export const SocialProofSection = () => {
  const stats = [
    { label: 'Workday Alignment Rate', value: '99.8%', desc: 'Proven attendance accuracy' },
    { label: 'Active Workdays Tracked', value: '50,000+', desc: 'Across high-growth companies' },
    { label: 'HR Admin Satisfaction', value: '4.9 / 5', desc: 'Rated by HR Directors' },
    { label: 'Payroll Hours Saved', value: '85%', desc: 'Reduction in processing friction' },
  ];

  const testimonials = [
    {
      quote: "Dayflow replaced 3 disconnected tools for our 120-person team. The auto-generated Login IDs and 1-click leave approvals saved our HR department over 15 hours every single week.",
      author: "Marcus Vance",
      title: "VP of People & Culture",
      company: "Aether Dynamics",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Our employees love the clear payroll visibility and instant self-service portal. There's zero confusion about attendance or leave balances anymore. It keeps everyone perfectly aligned.",
      author: "Priya Sharma",
      title: "Head of Operations",
      company: "NexGen Logistics",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Setting up company onboarding with custom logos and auto-issued employee IDs took us less than 10 minutes. The visual identity and UX feel super premium.",
      author: "David Miller",
      title: "Founder & CEO",
      company: "Vanguard Tech Labs",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section id="testimonials" className="w-full py-20 lg:py-28 relative bg-gradient-to-tr from-[#E5DAE2] via-[#F8F2F6] to-[#EFE7EC] border-t border-[#E2D5E0] text-[#281A26] font-inter overflow-hidden">
      
      {/* Ambient Radial Shading Blobs */}
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-[#FF5D7A]/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#FDFBFD]/90 backdrop-blur-md border border-[#E2D5E0] rounded-3xl p-6 text-center hover:border-[#FF5D7A]/40 transition-colors shadow-sm"
            >
              <div className="font-sora text-3xl sm:text-4xl font-extrabold text-[#FF5D7A] mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-[#281A26] mb-1">{stat.label}</div>
              <div className="text-xs text-[#6B5667] font-mono">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDFBFD]/80 backdrop-blur-md border border-[#E2D5E0] text-[#FF5D7A] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trusted Worldwide</span>
          </div>

          <h2 className="font-sora text-3xl sm:text-5xl font-extrabold text-[#281A26] tracking-tight leading-tight mb-4">
            Loved by HR Leaders & <br />
            <span className="text-[#FF5D7A]">Forward-Thinking Teams.</span>
          </h2>

          <p className="text-[#6B5667] text-base sm:text-lg">
            See how modern organizations run effortless HR operations with Dayflow.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FDFBFD]/90 backdrop-blur-md border border-[#E2D5E0] rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:border-[#FF5D7A]/40 transition duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF5D7A] text-[#FF5D7A]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                <p className="text-[#6B5667] text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-[#E2D5E0]">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#FF5D7A]"
                />
                <div>
                  <h4 className="font-sora text-sm font-bold text-[#281A26]">{t.author}</h4>
                  <p className="text-[11px] text-[#6B5667]">{t.title} • <span className="text-[#FF5D7A] font-semibold">{t.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialProofSection;

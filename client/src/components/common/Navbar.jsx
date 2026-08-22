import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Menu, X, ShieldCheck } from 'lucide-react';

export const Navbar = ({ onOpenAuth, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F172A]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Dayflow Logo / Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F2A52] to-[#121A36] border border-[#FF5D7A]/40 flex items-center justify-center shadow-md shadow-[#FF5D7A]/10 group-hover:border-[#FF5D7A] transition-all duration-300">
              {/* Custom Geometry / Dayflow Symbol */}
              <div className="absolute inset-0 bg-[#FF5D7A]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#FF5D7A] transition-transform duration-300 group-hover:scale-110"
              >
                <path
                  d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-40"
                />
                <path
                  d="M12 6L7 9V15L12 18L17 15V9L12 6Z"
                  fill="url(#dayflow-grad)"
                />
                <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
                <defs>
                  <linearGradient id="dayflow-grad" x1="7" y1="6" x2="17" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF5D7A" />
                    <stop offset="1" stopColor="#1F2A52" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-sora text-xl font-extrabold text-white tracking-tight">
                  Dayflow
                </span>
                <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#FF5D7A]/15 text-[#FF5D7A] border border-[#FF5D7A]/30">
                  HRMS
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide -mt-0.5">
                Every Workday, Aligned
              </span>
            </div>
          </a>

          {/* Nav Links (Center) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#1F2A52]/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-700/50 shadow-inner">
            <button
              onClick={() => scrollToSection('features')}
              className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition cursor-pointer"
            >
              Social Proof
            </button>
          </nav>

          {/* Right Action: Login CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onOpenAuth && onOpenAuth('login')}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#1F2A52] hover:bg-[#2A386C] border border-[#FF5D7A]/40 hover:border-[#FF5D7A] rounded-xl transition duration-200 shadow-md hover:shadow-[#FF5D7A]/20 flex items-center gap-2 group cursor-pointer"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4 text-[#FF5D7A] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onOpenAuth && onOpenAuth('signup')}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#FF5D7A] hover:bg-[#FF4263] rounded-xl transition duration-200 shadow-lg shadow-[#FF5D7A]/25 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Started</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenAuth && onOpenAuth('login')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#FF5D7A] rounded-lg cursor-pointer"
            >
              Login
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A] border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-3">
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg"
          >
            Social Proof
          </button>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth && onOpenAuth('login');
              }}
              className="w-full py-2 text-center text-sm font-semibold bg-[#1F2A52] text-white border border-[#FF5D7A]/40 rounded-xl"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth && onOpenAuth('signup');
              }}
              className="w-full py-2 text-center text-sm font-semibold bg-[#FF5D7A] text-white rounded-xl shadow-md"
            >
              Register Company (Sign Up)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

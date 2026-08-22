import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Menu, X, LogIn } from 'lucide-react';

export const Navbar = ({ onOpenAuthModal }) => {
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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
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
            <div className="relative w-10 h-10 rounded-xl bg-[#1F2A52] flex items-center justify-center shadow-md shadow-[#1F2A52]/10 group-hover:bg-[#121A36] transition-all duration-300">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#FF5D7A]"
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
                  fill="#FF5D7A"
                />
                <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-sora text-xl font-extrabold text-[#1F2A52] tracking-tight">
                  Dayflow
                </span>
                <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#FF5D7A]/10 text-[#FF5D7A] border border-[#FF5D7A]/20">
                  HRMS
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide -mt-0.5">
                Every Workday, Aligned
              </span>
            </div>
          </a>

          {/* Nav Links (Center) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200 shadow-inner">
            <button
              onClick={() => scrollToSection('features')}
              className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-[#1F2A52] rounded-full hover:bg-white transition cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-[#1F2A52] rounded-full hover:bg-white transition cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-[#1F2A52] rounded-full hover:bg-white transition cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-[#1F2A52] rounded-full hover:bg-white transition cursor-pointer"
            >
              Reviews
            </button>
          </nav>

          {/* Right Action: Login CTA Button (Opens Pop-Up Modal) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
              className="px-5 py-2 text-sm font-semibold text-[#1F2A52] bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#1F2A52] rounded-xl transition duration-200 shadow-sm flex items-center gap-2 cursor-pointer group"
            >
              <LogIn className="w-4 h-4 text-[#FF5D7A]" />
              <span>Login</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenAuthModal && onOpenAuthModal('signup')}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#FF5D7A] hover:bg-[#FF4263] rounded-xl transition duration-200 shadow-md shadow-[#FF5D7A]/20 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Started</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#FF5D7A] rounded-lg cursor-pointer"
            >
              Login
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-[#1F2A52]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 mt-3 space-y-2 shadow-lg">
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            Reviews
          </button>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal && onOpenAuthModal('login');
              }}
              className="w-full py-2 text-center text-sm font-semibold bg-slate-100 text-[#1F2A52] border border-slate-300 rounded-xl"
            >
              Sign In (Pop-up)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal && onOpenAuthModal('signup');
              }}
              className="w-full py-2 text-center text-sm font-semibold bg-[#FF5D7A] text-white rounded-xl shadow-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

import React from 'react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const Footer = ({ onOpenAuth }) => {
  return (
    <footer className="bg-[#0B1120] border-t border-slate-800/80 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1F2A52] to-[#121A36] border border-[#FF5D7A]/50 flex items-center justify-center font-sora font-bold text-[#FF5D7A] text-sm shadow-md">
                DF
              </div>
              <span className="font-sora text-xl font-extrabold text-white tracking-tight">
                Dayflow <span className="text-[#FF5D7A]">HRMS</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The next-generation Human Resource Management System built for workforce alignment. Streamlining attendance, leaves, employee profiles, and payroll in one unified platform.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>All Systems Operational (99.99% SLA)</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-sora text-xs font-bold text-white uppercase tracking-wider mb-4">
              Product Modules
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#features" className="hover:text-white transition">Attendance Tracking</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">Leave & Time-Off</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">Employee Directory</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">Payroll Engine</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">Role-Based Access</a>
              </li>
            </ul>
          </div>

          {/* Solution Links */}
          <div>
            <h4 className="font-sora text-xs font-bold text-white uppercase tracking-wider mb-4">
              Resources & Pricing
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#pricing" className="hover:text-white transition">Pricing Plans</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
              </li>
              <li>
                <button onClick={() => onOpenAuth && onOpenAuth('signup')} className="hover:text-white transition text-left cursor-pointer">
                  Register Company
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth && onOpenAuth('login')} className="hover:text-white transition text-left cursor-pointer">
                  Sign In Portal
                </button>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition">Customer Reviews</a>
              </li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div>
            <h4 className="font-sora text-xs font-bold text-white uppercase tracking-wider mb-4">
              Security & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF5D7A]" />
                <span>SOC-2 Type II Certified</span>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition">Terms of Service</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition">GDPR Compliance</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition">Security Architecture</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dayflow HRMS Inc. Every workday, perfectly aligned.</p>
          <p className="flex items-center gap-1">
            Built with precision using <span className="text-[#FF5D7A]">Navy #1F2A52 & Coral #FF5D7A</span> identity
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

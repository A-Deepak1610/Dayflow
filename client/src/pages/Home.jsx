import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import PricingSection from '../components/landing/PricingSection';
import SocialProofSection from '../components/landing/SocialProofSection';
import AuthPanel from '../components/auth/AuthPanel';
import Footer from '../components/common/Footer';
import { checkServerHealth } from '../services/api';
import { Activity, CheckCircle2, AlertTriangle } from 'lucide-react';

export const Home = () => {
  const [authMode, setAuthMode] = useState('login');
  const [health, setHealth] = useState(null);
  const [showHealthToast, setShowHealthToast] = useState(false);

  useEffect(() => {
    const fetchHealth = async () => {
      const res = await checkServerHealth();
      if (res.ok) {
        setHealth(res.data);
      } else {
        setHealth({ status: 'offline' });
      }
    };
    fetchHealth();
  }, []);

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    const authElement = document.getElementById('auth-panel');
    if (authElement) {
      authElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Main Landing Sections */}
      <main>
        <HeroSection onOpenAuth={handleOpenAuth} />
        
        {/* Auth Section Panel */}
        <section className="bg-gradient-to-b from-[#0B1120] via-[#121A36]/80 to-[#0B1120] py-8 border-y border-slate-800/60">
          <AuthPanel initialMode={authMode} key={authMode} />
        </section>

        <FeaturesSection onOpenAuth={handleOpenAuth} />
        <HowItWorksSection onOpenAuth={handleOpenAuth} />
        <PricingSection onOpenAuth={handleOpenAuth} />
        <SocialProofSection />
      </main>

      {/* Footer */}
      <Footer onOpenAuth={handleOpenAuth} />

      {/* Subtle Bottom System Status Floating Badge */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setShowHealthToast(!showHealthToast)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#121A36]/90 backdrop-blur-md border border-slate-700/80 rounded-full text-[11px] text-slate-300 shadow-xl hover:border-[#FF5D7A]/50 transition cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5 text-[#FF5D7A] animate-pulse" />
          <span>Server API:</span>
          <span className={`font-semibold ${health?.status === 'ok' ? 'text-emerald-400' : 'text-amber-400'}`}>
            {health?.status === 'ok' ? 'Online' : 'Checking / Standby'}
          </span>
        </button>

        {showHealthToast && (
          <div className="mt-2 p-3 bg-[#0F172A] border border-slate-700 rounded-xl shadow-2xl text-xs space-y-1 w-64 animate-fadeIn">
            <div className="flex items-center justify-between font-bold text-white mb-1">
              <span>System Telemetry</span>
              <span className="text-[10px] text-slate-400">TiDB MySQL</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Backend: http://localhost:5000</p>
            <p className="text-[11px] text-slate-400 font-mono">DB Status: {health?.database?.status || 'Connected'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

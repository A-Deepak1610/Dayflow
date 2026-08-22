import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import PricingSection from '../components/landing/PricingSection';
import SocialProofSection from '../components/landing/SocialProofSection';
import AuthModal from '../components/auth/AuthModal';
import Footer from '../components/common/Footer';
import { checkServerHealth } from '../services/api';
import { Activity } from 'lucide-react';

export const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
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

  const handleOpenAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-50 text-slate-900 selection:bg-[#FF5D7A] selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenAuthModal={handleOpenAuthModal} />

      {/* Main Landing Sections */}
      <main>
        <HeroSection onOpenAuthModal={handleOpenAuthModal} />
        <FeaturesSection onOpenAuthModal={handleOpenAuthModal} />
        <HowItWorksSection onOpenAuthModal={handleOpenAuthModal} />
        <PricingSection onOpenAuthModal={handleOpenAuthModal} />
        <SocialProofSection />
      </main>

      {/* Footer */}
      <Footer onOpenAuthModal={handleOpenAuthModal} />

      {/* Pop-up Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* Subtle Bottom System Status Floating Badge */}
      <div className="fixed bottom-4 left-4 z-30">
        <button
          onClick={() => setShowHealthToast(!showHealthToast)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-full text-[11px] text-slate-700 shadow-md hover:border-[#FF5D7A] transition cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5 text-[#FF5D7A] animate-pulse" />
          <span>Server API:</span>
          <span className={`font-semibold ${health?.status === 'ok' ? 'text-emerald-600' : 'text-amber-600'}`}>
            {health?.status === 'ok' ? 'Online' : 'Checking / Standby'}
          </span>
        </button>

        {showHealthToast && (
          <div className="mt-2 p-3 bg-white border border-slate-200 rounded-xl shadow-xl text-xs space-y-1 w-64 animate-fadeIn">
            <div className="flex items-center justify-between font-bold text-[#1F2A52] mb-1">
              <span>System Telemetry</span>
              <span className="text-[10px] text-slate-500">TiDB MySQL</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">Backend: http://localhost:5000</p>
            <p className="text-[11px] text-slate-500 font-mono">DB Status: {health?.database?.status || 'Connected'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { CinematicHero } from '../components/landing/CinematicHero';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import PricingSection from '../components/landing/PricingSection';
import SocialProofSection from '../components/landing/SocialProofSection';
import AuthModal from '../components/auth/AuthModal';
import Footer from '../components/common/Footer';
import { checkServerHealth } from '../services/api';
import { Activity } from 'lucide-react';
import './Landing.css'; // Global cinematic CSS

export const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  return (
    <div className="landing-page bg-[#0a0a0a] min-h-screen">
      
      {/* 1. New Cinematic Hero (Dark, Fixed Video Background) */}
      <CinematicHero 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onOpenAuthModal={handleOpenAuthModal}
      />

      {/* 2. Original Dayflow Sections (Now running on Dark Theme) */}
      <main className="relative z-10 w-full flex flex-col items-center bg-[#0a0a0a] border-t border-white/5">
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
          className="flex items-center gap-2 px-3 py-1.5 bg-[#111]/95 backdrop-blur-md border border-white/10 rounded-full text-[11px] text-white/70 shadow-md hover:border-white/30 transition cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5 text-[#FF5D7A] animate-pulse" />
          <span>Server API:</span>
          <span className={`font-semibold ${health?.status === 'ok' ? 'text-emerald-400' : 'text-amber-500'}`}>
            {health?.status === 'ok' ? 'Online' : 'Checking / Standby'}
          </span>
        </button>

        {showHealthToast && (
          <div className="mt-2 p-3 bg-[#111] border border-white/10 rounded-xl shadow-xl text-xs space-y-1 w-64 animate-fadeIn">
            <div className="flex items-center justify-between font-bold text-white mb-1">
              <span>System Telemetry</span>
              <span className="text-[10px] text-white/50">TiDB MySQL</span>
            </div>
            <p className="text-[11px] text-white/50 font-mono">Backend: http://localhost:5000</p>
            <p className="text-[11px] text-white/50 font-mono">DB Status: {health?.database?.status || 'Connected'}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;

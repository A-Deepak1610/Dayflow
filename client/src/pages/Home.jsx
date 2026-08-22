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
import './Landing.css';

export const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
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
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="landing-page bg-[#EFE7EC] min-h-screen w-full overflow-x-hidden">
      
      {/* 1. Cinematic Hero */}
      <CinematicHero 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onOpenAuthModal={handleOpenAuthModal}
      />

      {/* 2. Hero-Matched Silver-Mauve & Coral Blush Light Background for all sections below Hero */}
      <main className="relative z-10 w-full bg-gradient-to-b from-[#EFE7EC] via-[#F8F2F6] to-[#E5DAE2]">
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

      {/* Floating System Telemetry Badge */}
      <div className="fixed bottom-4 left-4 z-30">
        <button
          onClick={() => setShowHealthToast(!showHealthToast)}
          className="flex items-center gap-2 px-3.5 py-2 bg-white/95 backdrop-blur-md border border-[#E2D5E0] rounded-full text-xs text-[#281A26] shadow-lg hover:border-[#FF5D7A]/50 transition cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5 text-[#FF5D7A] animate-pulse" />
          <span className="font-medium">Server API:</span>
          <span className={`font-bold ${health?.status === 'ok' ? 'text-emerald-600' : 'text-amber-600'}`}>
            {health?.status === 'ok' ? 'Online' : 'Checking / Standby'}
          </span>
        </button>

        {showHealthToast && (
          <div className="mt-2 p-3.5 bg-white border border-[#E2D5E0] rounded-xl shadow-2xl text-xs space-y-1 w-64 animate-fadeIn text-[#281A26]">
            <div className="flex items-center justify-between font-bold text-[#281A26] mb-1">
              <span>System Telemetry</span>
              <span className="text-[10px] text-[#6B5667] font-mono">TiDB MySQL</span>
            </div>
            <p className="text-[11px] text-[#6B5667] font-mono">Backend: http://localhost:5000</p>
            <p className="text-[11px] text-[#6B5667] font-mono">DB Status: {health?.database?.status || 'Connected'}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;

import React, { useState, useEffect, useRef } from 'react';
import { Hexagon, Building2, Briefcase, Globe2 } from 'lucide-react';

// Custom hook for the count-up animation
const useCountUp = (target, decimals, duration, delayMs) => {
  const [value, setValue] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
          setTimeout(() => {
            let startTime = null;
            const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
            
            const step = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min(Math.max((timestamp - startTime) / duration, 0), 1);
              const eased = easeOutCubic(progress);
              setValue(eased * target);
              
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setValue(target);
              }
            };
            requestAnimationFrame(step);
          }, delayMs);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target, duration, delayMs, hasRun]);

  return { value: value.toFixed(decimals), ref: elementRef };
};

// Custom hook for entrance animations
const useEntranceAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.landing-anim').forEach((el) => {
      if (!el.classList.contains('landing-header') && !el.classList.contains('landing-headline')) {
        observer.observe(el);
      }
    });

    // Header and headline are always visible in single viewport
    document.querySelector('.landing-header')?.classList.add('is-visible');
    document.querySelector('.landing-headline')?.classList.add('is-visible');

    return () => observer.disconnect();
  }, []);
};

export const CinematicHero = ({
  isMobileMenuOpen, setIsMobileMenuOpen, 
  onOpenAuthModal 
}) => {
  useEntranceAnimation();
  const stat1 = useCountUp(99.9, 1, 1500, 480);
  const stat2 = useCountUp(150, 0, 1580, 570);
  const stat3 = useCountUp(24, 0, 1660, 660);
  const stat4 = useCountUp(1, 0, 1740, 750);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="landing-hero-container">
      {/* Background Video */}
      <video className="landing-bg-video" autoPlay muted loop playsInline>
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4" type="video/mp4" />
      </video>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="landing-mobile-overlay landing-overlay-in" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="landing-content">
        
        {/* Header */}
        <header className={`landing-header landing-anim ${mounted ? 'is-visible' : ''}`} style={{ '--d': '0s' }}>
          <div className="landing-logo">
            <Hexagon size={24} strokeWidth={1.5} />
          </div>
          
          <nav className="landing-nav-pill landing-desktop-only">
            <a href="#" className="landing-nav-link active">Home</a>
            <a href="#features" className="landing-nav-link">Features</a>
            <a href="#pricing" className="landing-nav-link">Pricing</a>
            <a href="#footer" className="landing-nav-link">Contact</a>
          </nav>

          <div className="landing-desktop-only flex gap-3">
            <button onClick={() => onOpenAuthModal('login')} className="landing-sign-in bg-transparent border border-white/20 hover:bg-white/10 text-white">
              Sign In
            </button>
            <button onClick={() => onOpenAuthModal('signup')} className="landing-sign-in">
              Sign Up
            </button>
          </div>

          <button 
            className="landing-burger landing-mobile-only" 
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="landing-burger-bars">
              <span /><span /><span />
            </div>
          </button>
        </header>

        {/* Mobile Sheet */}
        {isMobileMenuOpen && (
          <div className="landing-mobile-sheet landing-menu-in">
            <nav className="landing-mobile-nav">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="landing-nav-link active">Home</a>
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="landing-nav-link">Features</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="landing-nav-link">Pricing</a>
              <a href="#footer" onClick={() => setIsMobileMenuOpen(false)} className="landing-nav-link">Contact</a>
            </nav>
            <button onClick={() => onOpenAuthModal('login')} className="landing-mobile-sign-in">
              Sign In
            </button>
          </div>
        )}

        {/* Hero */}
        <main className="landing-hero pt-12">
          {/* Trust row */}
          <div className={`landing-trust-row landing-anim ${mounted ? 'is-visible' : ''}`} style={{ '--d': '0.05s' }}>
            <div className="landing-avatar-ring landing-a1"><div className="landing-avatar-inner"><Building2 size={14} /></div></div>
            <div className="landing-avatar-ring landing-a2"><div className="landing-avatar-inner"><Briefcase size={14} /></div></div>
            <div className="landing-avatar-ring landing-a3"><div className="landing-avatar-inner"><Globe2 size={14} /></div></div>
            <div className="landing-trust-pill">Trusted by 2000+ HR Teams</div>
          </div>

          {/* Headline */}
          <h1 className={`landing-headline landing-anim ${mounted ? 'is-visible' : ''}`} style={{ '--d': '0.12s' }}>
            <span className="landing-hl-line" style={{ '--ld': '0.12s' }}>DayFlow HRMS</span>
          </h1>

          {/* Subhead */}
          <p className={`landing-subhead landing-anim ${mounted ? 'is-visible' : ''}`} style={{ '--d': '0.28s' }}>
            Unify your entire workforce operations—from seamless onboarding and smart attendance to transparent payroll visibility.
          </p>

          {/* CTA */}
          <button onClick={() => onOpenAuthModal('signup')} className={`landing-cta landing-anim ${mounted ? 'is-visible' : ''}`} style={{ '--d': '0.4s' }}>
            Get Started
          </button>
        </main>

        {/* Stats footer */}
        <footer className="landing-stats">
          <div className={`landing-stat landing-anim ${mounted ? 'is-visible' : ''}`} style={{ '--d': '0.5s' }} ref={stat1.ref}>
            <div className="landing-stat-top">
              <span className="landing-stat-icon">&gt;</span>
              <span className="landing-stat-val">{stat1.value}%</span>
            </div>
            <div className="landing-stat-label">Payroll Accuracy</div>
          </div>

          <div className="landing-stat landing-anim" style={{ '--d': '0.58s' }} ref={stat2.ref}>
            <div className="landing-stat-top">
              <span className="landing-stat-icon">#</span>
              <span className="landing-stat-val">{stat2.value}k</span>
            </div>
            <div className="landing-stat-label">Employees Managed</div>
          </div>

          <div className="landing-stat landing-anim" style={{ '--d': '0.66s' }} ref={stat3.ref}>
            <div className="landing-stat-top">
              <span className="landing-stat-icon">*</span>
              <span className="landing-stat-val">{stat3.value}/7</span>
            </div>
            <div className="landing-stat-label">Self-Service Access</div>
          </div>

          <div className={`landing-stat landing-anim ${mounted ? 'is-visible' : ''}`} style={{ '--d': '0.74s' }} ref={stat4.ref}>
            <div className="landing-stat-top">
              <span className="landing-stat-icon">&lt;</span>
              <span className="landing-stat-val">{stat4.value}s</span>
            </div>
            <div className="landing-stat-label">Leave Approval Time</div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default CinematicHero;

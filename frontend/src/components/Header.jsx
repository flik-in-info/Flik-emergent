import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { navItems, images } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open: openDemoDialog } = useDemoDialog();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMobileMenuOpen
          ? 'bg-[#0a0a0b] border-b border-white/10 shadow-2xl'
          : isScrolled
            ? 'bg-[#0a0a0b]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'bg-[#0a0a0b]/60 backdrop-blur-md border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0 py-1.5">
            <img 
              src={images.logo} 
              alt="Flik Explorer - Real-Time 3D Digital Twin Platform" 
              decoding="async"
              className="h-8 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-4/5" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Button
              data-testid="header-request-demo"
              onClick={() => {
                telemetry.ctaClick('Request Demo', 'header');
                openDemoDialog('header');
              }}
              className="bg-white text-gray-900 hover:bg-gray-100 font-medium px-6 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Right Controls: Prominent Request Demo Button + Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            <Button
              data-testid="header-mobile-bar-cta"
              onClick={() => {
                telemetry.ctaClick('Request Demo', 'header_mobile_top_bar');
                setIsMobileMenuOpen(false);
                openDemoDialog('header_mobile_top_bar');
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium text-xs px-4 py-2 h-10 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.35)] active:scale-95 transition-all"
            >
              Request Demo
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center text-white hover:text-emerald-400 active:scale-95 transition-all rounded-xl border border-white/10 bg-white/[0.04] focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Tap-outside Backdrop Scrim */}
      {isMobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-black/75 backdrop-blur-sm z-40"
        />
      )}

      {/* Opaque Solid Mobile Menu Drawer */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 z-50 bg-[#0a0a0b] border-b border-white/15 transition-all duration-300 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.98)] ${
          isMobileMenuOpen ? 'max-h-[75dvh] opacity-100 py-5 overflow-y-auto' : 'max-h-0 opacity-0 py-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col px-5 gap-1.5" aria-label="Mobile Navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-200 hover:text-white transition-colors duration-200 min-h-[46px] px-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] text-base flex items-center justify-between"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>{item.label}</span>
              <span className="text-xs font-mono text-emerald-400">→</span>
            </a>
          ))}
          <Button
            data-testid="mobile-request-demo"
            onClick={() => {
              telemetry.ctaClick('Request Demo', 'header_mobile_drawer');
              setIsMobileMenuOpen(false);
              openDemoDialog('header_mobile_drawer');
            }}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium mt-3 min-h-[48px] text-base rounded-xl shadow-lg shadow-emerald-500/25"
          >
            Request Demo
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

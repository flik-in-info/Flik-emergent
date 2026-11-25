import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navItems, images } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const { open: openDemoDialog } = useDemoDialog();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['platform', 'experience', 'technology', 'difference', 'faq', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`/#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'pt-3 px-3 sm:px-6' : 'pt-0 px-0'
      }`}
    >
      <div
        className={`mx-auto transition-all duration-500 ${
          isScrolled
            ? 'max-w-7xl rounded-2xl bg-[#070709]/85 backdrop-blur-2xl border border-white/[0.1] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] px-4 sm:px-6'
            : 'max-w-full bg-gradient-to-b from-[#030304]/90 to-transparent backdrop-blur-sm border-b border-white/[0.04] px-4 sm:px-8 lg:px-12'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20 max-w-7xl mx-auto'
          }`}
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src={images.logo}
              alt="Flik Explorer - Real-Time 3D Digital Twin Platform"
              decoding="async"
              className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="hidden xl:inline-flex items-center gap-1.5 pl-3 border-l border-white/10 text-[10px] font-mono uppercase tracking-[0.18em] text-gray-500 group-hover:text-gray-300 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22E55A]" />
              <span>Hastok Enterprise Pvt. Ltd.</span>
            </span>
          </Link>

          {/* Desktop Navigation Capsule */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-full bg-white/[0.025] border border-white/[0.06]"
          >
            {navItems.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 relative flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-[#22E55A] shadow-[0_0_8px_#22E55A]" />
                  )}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/presentation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors px-3 py-2 hidden xl:inline-flex items-center gap-1"
            >
              <span>Deck</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>

            <Button
              data-testid="header-request-demo"
              onClick={() => {
                telemetry.ctaClick('Request Demo', 'header');
                openDemoDialog('header');
              }}
              className="relative overflow-hidden bg-white text-black hover:bg-[#22E55A] hover:text-black font-semibold text-xs px-5 h-9 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:shadow-[0_0_30px_rgba(34,229,90,0.45)]"
            >
              <span>Request Demo</span>
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            <Button
              data-testid="header-mobile-bar-cta"
              onClick={() => {
                telemetry.ctaClick('Request Demo', 'header_mobile_top_bar');
                openDemoDialog('header_mobile_top_bar');
              }}
              className="bg-[#22E55A] hover:bg-emerald-400 text-black font-semibold text-xs px-3.5 sm:px-4 py-1.5 h-8 sm:h-9 rounded-full shadow-[0_0_18px_rgba(34,229,90,0.35)] active:scale-95 transition-all"
            >
              Request Demo
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-[#22E55A] active:scale-95 transition-all rounded-lg focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden mx-3 sm:mx-6 mt-2 rounded-2xl bg-[#070709]/95 backdrop-blur-2xl border border-white/10 transition-all duration-300 overflow-hidden shadow-2xl ${
          isMobileMenuOpen ? 'max-h-[420px] opacity-100 py-5' : 'max-h-0 opacity-0 py-0 pointer-events-none border-transparent'
        }`}
      >
        <nav className="flex flex-col px-5 gap-1.5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors duration-200 py-2.5 px-3 rounded-xl hover:bg-white/[0.04] text-sm flex items-center justify-between"
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
            className="bg-[#22E55A] hover:bg-emerald-400 text-black font-semibold mt-2 py-5 rounded-xl shadow-lg shadow-emerald-500/25"
          >
            Request Demo
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

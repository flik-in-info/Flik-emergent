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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0a0b]/92 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'bg-[#0a0a0b]/50 backdrop-blur-md border-b border-white/[0.02]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
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
                openDemoDialog('header_mobile_top_bar');
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium text-xs px-3.5 sm:px-4 py-1.5 h-8 sm:h-9 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.35)] active:scale-95 transition-all"
            >
              Request Demo
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-emerald-400 active:scale-95 transition-all rounded-lg focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0b]/98 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 overflow-hidden shadow-2xl ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <nav className="flex flex-col px-6 gap-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors duration-200 py-2.5 px-3 rounded-lg hover:bg-white/[0.04] text-sm flex items-center justify-between"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>{item.label}</span>
              <span className="text-xs font-mono text-gray-500">→</span>
            </a>
          ))}
          <Button
            data-testid="mobile-request-demo"
            onClick={() => {
              telemetry.ctaClick('Request Demo', 'header_mobile_drawer');
              setIsMobileMenuOpen(false);
              openDemoDialog('header_mobile_drawer');
            }}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium mt-3 py-6 rounded-xl shadow-lg shadow-emerald-500/25"
          >
            Request Demo
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

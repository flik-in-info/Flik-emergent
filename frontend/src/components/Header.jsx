import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0a0b]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'bg-[#0a0a0b]/60 backdrop-blur-md border-b border-white/[0.03]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={images.logo} 
              alt="Flik Explorer - Real-Time 3D Digital Twin Platform" 
              decoding="async"
              className="h-9 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm transition-all duration-300 relative group ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-gray-400 hover:text-white'
                  }`
                }
                onClick={() => telemetry.ctaClick(`nav_${item.label.toLowerCase()}`, 'header')}
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-emerald-400 transition-all duration-300 ${
                        isActive
                          ? 'w-4/5 shadow-[0_0_12px_rgba(16,185,129,0.8)]'
                          : 'w-0 group-hover:w-4/5'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-emerald-400 transition-colors"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0b]/98 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 overflow-hidden shadow-2xl ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <nav className="flex flex-col px-6 gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                `text-base transition-colors duration-300 py-2.5 px-3.5 rounded-xl flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-300 font-medium border border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                }`
              }
              onClick={() => {
                telemetry.ctaClick(`nav_mobile_${item.label.toLowerCase()}`, 'header_mobile');
                setIsMobileMenuOpen(false);
              }}
            >
              <span>{item.label}</span>
              <span className="text-xs font-mono text-emerald-400/60">→</span>
            </NavLink>
          ))}
          <Button
            data-testid="mobile-request-demo"
            onClick={() => {
              telemetry.ctaClick('Request Demo', 'header_mobile');
              setIsMobileMenuOpen(false);
              openDemoDialog('header_mobile');
            }}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium mt-4 py-6 shadow-lg shadow-emerald-500/20"
          >
            Request Demo
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

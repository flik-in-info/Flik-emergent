import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { navItems, images } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';
import { UiverseButton } from './uiverse/UiverseComponents';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open: openDemoDialog } = useDemoDialog();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#09090b]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-[#09090b]/80 via-[#09090b]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo + Live Flagship Pill */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center group">
              <img 
                src={images.logo} 
                alt="Flik Explorer - Real-Time 3D Digital Twin Platform" 
                decoding="async"
                className="h-9 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Engine Live Pill */}
            <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SPATIAL DIGITAL TWIN ENGINE · LIVE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.02] border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-1.5 text-xs text-gray-300 hover:text-white transition-colors duration-200 relative group font-medium"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-3/5" />
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <UiverseButton
              variant="primary"
              size="sm"
              onClick={() => openDemoDialog('header')}
              icon={ArrowRight}
            >
              Request Live Demo
            </UiverseButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-emerald-400 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#09090b]/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <nav className="flex flex-col px-6 gap-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2 text-sm border-b border-white/5 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button
            data-testid="mobile-request-demo"
            onClick={() => {
              setIsMobileMenuOpen(false);
              openDemoDialog('header_mobile');
            }}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold mt-4 py-2.5 text-xs shadow-md shadow-emerald-500/20"
          >
            Request Live Demo
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { navItems, images } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';
import { soundFX } from '../utils/soundEffects';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const { open: openDemoDialog } = useDemoDialog();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const next = soundFX.toggleSound();
    setSoundOn(next);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
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
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => soundFX.playClick()}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group font-light"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-4/5" />
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* 3D Audio FX Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              title={soundOn ? '3D Audio FX: Enabled' : 'Enable 3D Audio FX'}
              className={`p-2.5 rounded-full border transition-all duration-300 ${
                soundOn
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* CTA Button */}
            <Button
              data-testid="header-request-demo"
              onClick={() => {
                soundFX.playClick();
                openDemoDialog('header');
              }}
              className="bg-white text-gray-900 hover:bg-gray-100 font-medium px-6 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 rounded-xl"
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Menu Button & Sound */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleSound}
              className={`p-2 rounded-full border ${
                soundOn ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'text-gray-400 border-white/10'
              }`}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0b]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-6 gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-400 hover:text-white transition-colors duration-300 py-2"
              onClick={() => {
                soundFX.playClick();
                setIsMobileMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <Button
            data-testid="mobile-request-demo"
            onClick={() => {
              soundFX.playClick();
              setIsMobileMenuOpen(false);
              openDemoDialog('header_mobile');
            }}
            className="bg-white text-gray-900 hover:bg-gray-100 font-medium mt-4 rounded-xl"
          >
            Request Demo
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

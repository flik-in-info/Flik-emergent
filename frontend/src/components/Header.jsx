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
    const sections = ['hero', 'experience', 'difference', 'technology', 'faq', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id === 'hero' ? '/#platform' : `/#${entry.target.id}`);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-white/15'
          : 'bg-gradient-to-b from-black/80 to-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3.5 flex-shrink-0">
            <img
              src={images.logo}
              alt="Flik Explorer"
              decoding="async"
              className="h-8 sm:h-9 w-auto"
            />
            <span className="hidden xl:inline-block pl-3.5 border-l border-white/20 text-xs font-mono text-gray-300 tracking-tight">
              Hastok Enterprise Pvt. Ltd.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-medium tracking-wide transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="/presentation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors hidden xl:inline-block"
            >
              Presentation PDF
            </a>

            <Button
              data-testid="header-request-demo"
              onClick={() => {
                telemetry.ctaClick('Request Demo', 'header');
                openDemoDialog('header');
              }}
              className="bg-white text-black hover:bg-[#22E55A] hover:text-black font-semibold text-xs px-5 h-9 rounded-md transition-colors"
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              data-testid="header-mobile-bar-cta"
              onClick={() => {
                telemetry.ctaClick('Request Demo', 'header_mobile_top_bar');
                openDemoDialog('header_mobile_top_bar');
              }}
              className="bg-[#22E55A] hover:bg-emerald-400 text-black font-semibold text-xs px-3.5 h-8 rounded-md"
            >
              Request Demo
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-[#22E55A] transition-colors"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-white/15 px-5 py-5">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-white py-3 border-b border-white/10 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              data-testid="mobile-request-demo"
              onClick={() => {
                telemetry.ctaClick('Request Demo', 'header_mobile_drawer');
                setIsMobileMenuOpen(false);
                openDemoDialog('header_mobile_drawer');
              }}
              className="bg-[#22E55A] hover:bg-emerald-400 text-black font-semibold mt-4 py-5 rounded-md"
            >
              Request Demo
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

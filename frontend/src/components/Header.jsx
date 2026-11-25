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
      setIsScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['platform', 'experience', 'difference', 'technology', 'faq', 'contact'];
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
    <header className="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-3.5 px-3 sm:px-6 pointer-events-none">
      <div
        className={`mx-auto transition-all duration-300 pointer-events-auto rounded-xl bg-white/92 backdrop-blur-md border border-black/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.09)] ${
          isScrolled ? 'max-w-[1140px]' : 'max-w-7xl'
        }`}
      >
        <div className="px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <span className="inline-flex items-center justify-center bg-black px-2.5 py-1 rounded-lg">
              <img
                src={images.logo}
                alt="Flik Explorer"
                decoding="async"
                className="h-6 sm:h-7 w-auto"
              />
            </span>
            <span className="hidden xl:inline-block pl-3 border-l border-neutral-200 text-xs font-mono text-neutral-600 tracking-tight">
              Hastok Enterprise Pvt. Ltd.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'text-black font-semibold underline decoration-[#22E55A] decoration-2 underline-offset-[6px]'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action */}
          <div className="hidden lg:flex items-center">
            <Button
              data-testid="header-request-demo"
              onClick={() => {
                telemetry.ctaClick('Request Demo', 'header');
                openDemoDialog('header');
              }}
              className="bg-black hover:bg-[#22E55A] text-white hover:text-black font-medium text-xs px-5 h-9 rounded-lg transition-colors"
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
              className="bg-[#22E55A] hover:bg-[#2EE05F] text-black font-semibold text-xs px-3.5 h-8 rounded-lg"
            >
              Request Demo
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:text-neutral-600 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-100 rounded-b-xl px-5 py-4">
            <nav className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-neutral-700 hover:text-black py-3 border-b border-neutral-100 text-sm font-medium"
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
                className="bg-[#22E55A] hover:bg-[#2EE05F] text-black font-semibold mt-4 py-5 rounded-lg"
              >
                Request Demo
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

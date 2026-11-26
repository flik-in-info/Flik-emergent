import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { navItems, images } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const { open: openDemoDialog } = useDemoDialog();

  useEffect(() => {
    const sections = ['platform', 'difference', 'experience', 'clients', 'contact'];
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
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/15">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Brand & Entity */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <span className="inline-flex items-center justify-center bg-black px-2.5 py-1 rounded-[4px]">
            <img
              src={images.logo}
              alt="Flik Explorer"
              decoding="async"
              className="h-6 w-auto"
            />
          </span>
          <span className="hidden sm:inline-block pl-3 border-l border-neutral-300 text-xs font-mono text-black tracking-tight">
            Hastok Enterprise Pvt. Ltd.
          </span>
        </Link>

        {/* Center Navigation */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`text-xs font-medium tracking-tight py-1 border-b-2 transition-colors ${
                  isActive
                    ? 'text-black font-semibold border-[#22E55A]'
                    : 'text-neutral-600 border-transparent hover:text-black'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Primary CTA */}
        <div className="hidden lg:flex items-center">
          <Button
            data-testid="header-request-demo"
            onClick={() => {
              telemetry.ctaClick('Request Demo', 'header');
              openDemoDialog('header');
            }}
            className="bg-[#22E55A] hover:bg-black text-black hover:text-[#22E55A] font-semibold text-xs px-5 h-9 rounded-[4px] transition-colors"
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
            className="bg-[#22E55A] hover:bg-[#2EE05F] text-black font-semibold text-xs px-3.5 h-8 rounded-[4px]"
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

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-5 py-4">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-neutral-800 hover:text-black py-3 border-b border-neutral-100 text-sm font-medium"
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
              className="bg-[#22E55A] hover:bg-black text-black hover:text-[#22E55A] font-semibold mt-4 py-5 rounded-[4px]"
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

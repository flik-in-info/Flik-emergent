import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const FLOOR_VIEWS = [
  {
    id: 'l08',
    code: 'L-08',
    label: 'Podium Sales Gallery',
    altitude: '32m Altitude',
    sunlight: '09:30 AM / Courtyard',
    image: '/scenes/scene-00-showroom.jpg',
    alt: 'Flik Explorer architectural gallery installation',
  },
  {
    id: 'l26',
    code: 'L-26',
    label: 'Daylight Corner Suite',
    altitude: '94m Altitude',
    sunlight: '13:15 PM / Full Solar',
    image: '/scenes/scene-02-living-day.jpg',
    alt: 'Sunlit coastal luxury residence interior',
  },
  {
    id: 'l42',
    code: 'L-42',
    label: 'Crown Twilight Penthouse',
    altitude: '148m Altitude',
    sunlight: '18:30 PM / Golden Hour',
    image: '/scenes/scene-03-living-dusk.jpg',
    alt: 'Penthouse bay vista at sunset',
  },
];

const HeroSection = () => {
  const { open: openDemoDialog } = useDemoDialog();
  const [floorIdx, setFloorIdx] = useState(1);
  const [userLocked, setUserLocked] = useState(false);

  useEffect(() => {
    if (userLocked) return undefined;
    const timer = setInterval(() => {
      setFloorIdx((i) => (i + 1) % FLOOR_VIEWS.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [userLocked]);

  const activeView = FLOOR_VIEWS[floorIdx];

  return (
    <section
      id="hero"
      className="pt-16 bg-white border-b border-black/15"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 lg:min-h-[calc(100vh-64px)]">
        {/* Left Editorial Manifesto Column */}
        <div className="lg:col-span-5 min-w-0 px-5 sm:px-10 py-12 lg:py-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/15">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-6 border-b border-neutral-200 text-[11px] font-mono text-neutral-600">
            <span>HASTOK ENTERPRISE PVT. LTD.</span>
            <span>AJMERA CITYSCAPES / LIVE</span>
          </div>

          <div className="py-10 lg:py-12">
            <h1 className="text-[2.75rem] sm:text-[3.75rem] lg:text-[4.5rem] font-medium text-black leading-[0.98] tracking-[-0.042em] mb-6">
              Experience before{' '}
              <span className="underline decoration-[#22E55A] decoration-[5px] underline-offset-[8px]">
                you build.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-lg mb-8">
              Developers spend ₹2 to ₹5 crore building one temporary ground-floor sample flat.{' '}
              <strong className="font-semibold text-black">Flik Explorer</strong> streams every floor altitude, view corridor, sunlight angle, and finish option straight to any buyer browser before construction rises.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                data-testid="hero-primary-cta"
                size="lg"
                onClick={() => {
                  telemetry.ctaClick('Request Walkthrough', 'hero_primary');
                  openDemoDialog('hero_primary');
                }}
                className="bg-black hover:bg-[#22E55A] text-white hover:text-black font-semibold px-6 h-12 rounded-[4px] text-sm transition-colors"
              >
                Book a Walkthrough
              </Button>

              <Button
                asChild
                data-testid="hero-secondary-cta"
                size="lg"
                variant="outline"
                className="bg-white border-black text-black hover:bg-neutral-100 font-medium px-6 h-12 rounded-[4px] text-sm transition-colors"
              >
                <a href="#platform">Watch Interactive Sequence</a>
              </Button>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-200 grid grid-cols-3 gap-4 text-xs">
            <div>
              <span className="font-mono text-neutral-400 block text-[10px]">OUTLAY</span>
              <span className="font-semibold text-black">₹2–5 Cr Saved</span>
            </div>
            <div>
              <span className="font-mono text-neutral-400 block text-[10px]">DELIVERY</span>
              <span className="font-semibold text-black">2–4 Weeks Live</span>
            </div>
            <div>
              <span className="font-mono text-neutral-400 block text-[10px]">HARDWARE</span>
              <span className="font-semibold text-black">Any Browser</span>
            </div>
          </div>
        </div>

        {/* Right Full-Bleed Architectural Elevation Instrument */}
        <div className="lg:col-span-7 min-w-0 relative bg-black min-h-[420px] sm:min-h-[540px] lg:min-h-full overflow-hidden flex flex-col justify-between">
          <img
            src={activeView.image}
            alt={activeView.alt}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/85 pointer-events-none" />

          {/* Top Telemetry Frame */}
          <div className="relative z-10 px-5 sm:px-8 pt-6 flex items-center justify-between text-[11px] font-mono text-white">
            <div className="bg-black/80 px-3 py-1.5 border border-white/20">
              <span>{activeView.altitude}</span>
              <span className="text-neutral-400 ml-3 hidden sm:inline">{activeView.sunlight}</span>
            </div>
            <div className="bg-[#22E55A] text-black font-semibold px-2.5 py-1">
              60 FPS STREAM
            </div>
          </div>

          {/* Interactive Floor Selector Dock */}
          <div className="relative z-10 p-5 sm:p-8">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 mb-3">
              Select Tower Elevation to Preview
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {FLOOR_VIEWS.map((view, idx) => {
                const isSelected = idx === floorIdx;
                return (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => {
                      setUserLocked(true);
                      setFloorIdx(idx);
                    }}
                    className={`p-3.5 text-left border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#22E55A] text-black border-[#22E55A]'
                        : 'bg-black/80 text-white border-white/20 hover:border-white/60'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs font-semibold">
                      <span>{view.code}</span>
                      <span className={isSelected ? 'text-black/75' : 'text-neutral-400'}>
                        {view.altitude}
                      </span>
                    </div>
                    <div
                      className={`text-xs font-medium mt-1 truncate ${
                        isSelected ? 'text-black' : 'text-white'
                      }`}
                    >
                      {view.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

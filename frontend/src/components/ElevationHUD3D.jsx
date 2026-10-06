import React, { useState, useEffect } from 'react';
import { Layers, ArrowUp, Compass } from 'lucide-react';

const FLOORS = [
  { id: 'hero', level: 'L01', name: 'Spatial Viewport', alt: '+4m' },
  { id: 'experience', level: 'L24', name: 'Live 3D Digital Twin', alt: '+92m' },
  { id: 'economics', level: 'L38', name: 'Developer Capital ROI', alt: '+146m' },
  { id: 'capabilities', level: 'L52', name: 'Spatial Master Suite', alt: '+198m' },
  { id: 'technology', level: 'L64', name: 'UE5.4 Cloud Core', alt: '+244m' },
  { id: 'faq', level: 'L70', name: 'Enterprise FAQ', alt: '+268m' },
  { id: 'contact', level: 'L72', name: 'Executive Sales Suite', alt: '+278m' },
];

const ElevationHUD3D = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeFloor, setActiveFloor] = useState(FLOORS[0]);
  const [currentAltitude, setCurrentAltitude] = useState(4);
  const [currentLevel, setCurrentLevel] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollPercent(progress);

      // Interpolate level 1 to 72
      const level = Math.floor(progress * 71) + 1;
      setCurrentLevel(level);

      // Interpolate altitude 4m to 278m
      const alt = Math.floor(4 + progress * 274);
      setCurrentAltitude(alt);

      // Determine active floor zone
      const floorIndex = Math.min(Math.floor(progress * FLOORS.length), FLOORS.length - 1);
      setActiveFloor(FLOORS[floorIndex]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="3D Tower Elevation HUD"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end select-none pointer-events-auto"
    >
      <div className="luxury-glass rounded-2xl p-4 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col items-end gap-3 text-right">
        
        {/* HUD Header */}
        <div className="flex items-center gap-2 pb-2.5 border-b border-white/10 w-full justify-end text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="tracking-widest uppercase">3D TOWER ELEVATION</span>
        </div>

        {/* Live Elevation Counter */}
        <div className="space-y-0.5">
          <div className="flex items-baseline justify-end gap-1.5">
            <span className="text-xs font-mono text-gray-400">LEVEL</span>
            <span className="text-2xl font-light font-mono text-white tracking-tight">
              {String(currentLevel).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-mono text-gray-500">/ 72</span>
          </div>

          <div className="text-[11px] font-mono text-emerald-300">
            ALT: +{currentAltitude}m <span className="text-gray-500">MSL</span>
          </div>

          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider truncate max-w-[140px]">
            {activeFloor.name}
          </div>
        </div>

        {/* 3D Vertical Elevator Track with Glowing Cursor Indicator */}
        <div className="relative py-2 flex items-center justify-end w-full pr-1">
          <div className="relative h-44 w-1 bg-white/10 rounded-full overflow-hidden">
            {/* Illuminated fill up to scroll position */}
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-300 rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(34,229,90,0.8)]"
              style={{ height: `${scrollPercent * 100}%` }}
            />
          </div>

          {/* Floating floor pips */}
          <div className="absolute right-4 top-0 h-44 flex flex-col justify-between py-1">
            {FLOORS.map((f, i) => {
              const pipProgress = i / (FLOORS.length - 1);
              const isPast = scrollPercent >= pipProgress - 0.05;
              const isCurrent = activeFloor.id === f.id;

              return (
                <button
                  key={f.id}
                  onClick={() => scrollToSection(f.id)}
                  title={`Jump to ${f.name} (${f.alt})`}
                  className="group flex items-center justify-end gap-2 text-right transition-transform hover:scale-105"
                >
                  <span
                    className={`text-[9px] font-mono transition-opacity duration-200 ${
                      isCurrent
                        ? 'opacity-100 text-emerald-300 font-semibold'
                        : 'opacity-0 group-hover:opacity-100 text-gray-400'
                    }`}
                  >
                    {f.level}
                  </span>
                  <span
                    className={`w-2 h-0.5 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-4 bg-emerald-400 shadow-[0_0_8px_rgba(34,229,90,1)]'
                        : isPast
                        ? 'bg-emerald-500/60'
                        : 'bg-white/20 group-hover:bg-white/50'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll percentage readout */}
        <div className="pt-2 border-t border-white/5 w-full flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>SPATIAL DEPTH</span>
          <span className="text-emerald-400">{Math.round(scrollPercent * 100)}%</span>
        </div>

      </div>
    </aside>
  );
};

export default ElevationHUD3D;

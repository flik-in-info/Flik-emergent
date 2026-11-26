import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smoothstep = (edge0, edge1, x) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const CHAPTERS = [
  { id: 'elevation', target: 0.08, label: 'Elevation Corridor' },
  { id: 'daylight', target: 0.50, label: 'Sunlight & Finishes' },
  { id: 'nri', target: 0.88, label: 'Gallery & NRI Delivery' },
];

const FINISH_PRESETS = [
  { id: 'statuario', name: 'Statuario White Marble', filter: 'contrast(1.04) brightness(1.06) saturate(0.84)', swatch: '#F2F2F0' },
  { id: 'walnut', name: 'Smoked Walnut', filter: 'contrast(1.03) saturate(1.06)', swatch: '#6B4423' },
  { id: 'pietra', name: 'Brushed Pietra Stone', filter: 'contrast(1.1) brightness(0.92) saturate(0.75)', swatch: '#2C2E30' },
];

const CinemaScrollMovie = () => {
  const containerRef = useRef(null);
  const { open: openDemoDialog } = useDemoDialog();

  const [progress, setProgress] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(FINISH_PRESETS[0]);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const computeTarget = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        targetRef.current = 0;
        return;
      }
      targetRef.current = clamp01(-rect.top / scrollable);
    };

    computeTarget();
    currentRef.current = targetRef.current;
    setProgress(targetRef.current);

    let running = true;
    const tick = () => {
      if (!running) return;
      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentRef.current += diff * 0.16;
        setProgress(currentRef.current);
      } else if (currentRef.current !== targetRef.current) {
        currentRef.current = targetRef.current;
        setProgress(currentRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', computeTarget, { passive: true });
    window.addEventListener('resize', computeTarget, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener('scroll', computeTarget);
      window.removeEventListener('resize', computeTarget);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const jumpToChapter = useCallback((targetP) => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + scrollable * targetP,
      behavior: 'smooth',
    });
  }, []);

  const p = progress;

  // Scene motions & transitions across 205vh pinned track
  const towerScale = 1.12 - clamp01(p / 0.36) * 0.09;
  const daylightWipe = smoothstep(0.28, 0.42, p);
  const duskMix = smoothstep(0.48, 0.64, p);
  const showroomWipe = smoothstep(0.68, 0.80, p);

  const beat1Op = 1 - smoothstep(0.27, 0.35, p);
  const beat2Op = smoothstep(0.33, 0.41, p) * (1 - smoothstep(0.66, 0.73, p));
  const beat3Op = smoothstep(0.71, 0.79, p);

  const activeChapterIdx = p < 0.35 ? 0 : p < 0.72 ? 1 : 2;

  return (
    <section
      ref={containerRef}
      id="platform"
      aria-label="Flik Interactive Architecture Film"
      className="relative h-[205vh] bg-black"
    >
      <span id="capabilities" className="absolute top-[40%] left-0" aria-hidden="true" />
      <span id="intelligence" className="absolute top-[75%] left-0" aria-hidden="true" />

      <div className="sticky top-16 h-[calc(100dvh-64px)] w-full overflow-hidden bg-black">
        {/* PLATE 1: Exterior Skyline & Floor Heights */}
        <div
          aria-hidden="true"
          style={{ transform: `scale(${towerScale})`, willChange: 'transform' }}
          className="absolute inset-0 pointer-events-none"
        >
          <img
            src="/scenes/scene-01-tower.jpg"
            alt="Residential tower rising above Mumbai coast at twilight"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/50" />
        </div>

        {/* PLATE 2: Horizontal Wipe to Sunlit Apartment */}
        {daylightWipe > 0.001 && (
          <div
            aria-hidden="true"
            style={{
              clipPath: `inset(0 0 0 ${(1 - daylightWipe) * 100}%)`,
              willChange: 'clip-path',
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <img
              src="/scenes/scene-02-living-day.jpg"
              alt="Sunlit luxury apartment living space overlooking bay"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35" />
          </div>
        )}

        {/* PLATE 3: Seamless Dusk Dissolve with Live Material Filter */}
        {duskMix > 0.001 && (
          <div
            aria-hidden="true"
            style={{
              opacity: duskMix,
              filter: selectedFinish.filter,
              willChange: 'opacity, filter',
            }}
            className="absolute inset-0 pointer-events-none transition-[filter] duration-500"
          >
            <img
              src="/scenes/scene-03-living-dusk.jpg"
              alt="Penthouse interior transitioning from daylight to evening lighting"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35" />
          </div>
        )}

        {/* PLATE 4: Vertical Curtain Wipe to Showroom Experience Center */}
        {showroomWipe > 0.001 && (
          <div
            aria-hidden="true"
            style={{
              clipPath: `inset(${(1 - showroomWipe) * 100}% 0 0 0)`,
              willChange: 'clip-path',
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <img
              src="/scenes/scene-00-showroom.jpg"
              alt="Flik Explorer curved architectural sales gallery"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-black/55" />
          </div>
        )}

        {/* Top Full-Width Architectural Chapter Ruler */}
        <div className="absolute top-0 inset-x-0 z-30 border-b border-white/15 bg-black/55 backdrop-blur-sm">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 h-11 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
              {CHAPTERS.map((chap, idx) => {
                const isActive = idx === activeChapterIdx;
                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => jumpToChapter(chap.target)}
                    className={`text-[11px] font-mono whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#22E55A] font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {chap.label}
                  </button>
                );
              })}
            </div>

            <span className="hidden md:inline font-mono text-[11px] text-neutral-400">
              {Math.round(p * 100)}% SEQUENCE
            </span>
          </div>
          <div
            style={{ width: `${p * 100}%` }}
            className="h-[2px] bg-[#22E55A] transition-[width] duration-75"
          />
        </div>

        {/* STORY BEAT 1 */}
        {beat1Op > 0.01 && (
          <div
            style={{ opacity: beat1Op }}
            className="absolute inset-0 z-20 pointer-events-none flex items-end max-w-[1440px] mx-auto px-5 sm:px-8 pb-10 sm:pb-14"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-[-0.03em] leading-[1.05] mb-3.5">
                A ground-floor sample flat shows one room. Flik streams forty floors.
              </h2>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                Buyers committing ₹1 crore to ₹10 crore+ want exact balcony sightlines, surrounding city block clearances, and floor-specific ocean or skyline geometry.
              </p>
            </div>
          </div>
        )}

        {/* STORY BEAT 2: Sun Sweep + Material Board */}
        {beat2Op > 0.01 && (
          <div
            style={{
              opacity: beat2Op,
              pointerEvents: beat2Op > 0.35 ? 'auto' : 'none',
            }}
            className="absolute inset-0 z-20 flex items-end max-w-[1440px] mx-auto px-5 sm:px-8 pb-10 sm:pb-14"
          >
            <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-xl pointer-events-none">
                <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-[-0.03em] leading-[1.05] mb-3.5">
                  Every finish and daylight hour, tested live inside the room.
                </h2>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                  Swap marble, timber, and basalt palettes on demand while moving naturally from harsh midday glare into evening architecture.
                </p>
              </div>

              <div className="bg-black/85 border border-white/20 p-4 self-start lg:self-auto">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2.5">
                  Interactive Finish Board
                </span>
                <div className="flex flex-wrap gap-2">
                  {FINISH_PRESETS.map((preset) => {
                    const active = selectedFinish.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setSelectedFinish(preset)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#22E55A] text-black font-semibold border-[#22E55A]'
                            : 'bg-black text-white border-white/20 hover:border-white'
                        }`}
                      >
                        <span
                          className="w-3 h-3 border border-white/40 shrink-0"
                          style={{ backgroundColor: preset.swatch }}
                        />
                        <span>{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STORY BEAT 3: Gallery LED Wall + NRI Browser */}
        {beat3Op > 0.01 && (
          <div
            style={{
              opacity: beat3Op,
              pointerEvents: beat3Op > 0.35 ? 'auto' : 'none',
            }}
            className="absolute inset-0 z-20 flex items-end max-w-[1440px] mx-auto px-5 sm:px-8 pb-10 sm:pb-14"
          >
            <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-[-0.03em] leading-[1.05] mb-3.5">
                  One platform in your sales lounge and in NRI pockets worldwide.
                </h2>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                  Delivered in 2 to 4 weeks from architectural CAD and BIM drawings—syncing experience center screens and remote buyer links without headsets or app installs.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <Button
                  onClick={() => {
                    telemetry.ctaClick('Request Private Demo', 'cinema_end');
                    openDemoDialog('cinema_end');
                  }}
                  className="bg-[#22E55A] hover:bg-white text-black font-semibold px-6 h-11 rounded-[4px] text-sm"
                >
                  Schedule Developer Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CinemaScrollMovie;

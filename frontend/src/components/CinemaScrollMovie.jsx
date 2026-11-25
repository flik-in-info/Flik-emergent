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
  { id: 'showroom', targetProgress: 0.0, label: 'Showroom' },
  { id: 'tower', targetProgress: 0.27, label: 'Elevation' },
  { id: 'daylight', targetProgress: 0.52, label: 'Daylight' },
  { id: 'dusk', targetProgress: 0.74, label: 'Finishes' },
  { id: 'economics', targetProgress: 0.94, label: 'Economics' },
];

const FINISH_PRESETS = [
  { id: 'walnut', name: 'Smoked Walnut', filter: 'contrast(1.03) saturate(1.04)', swatch: '#6B4423' },
  { id: 'travertine', name: 'Honed Travertine', filter: 'contrast(1.04) brightness(1.05) saturate(0.86)', swatch: '#DDD6CB' },
  { id: 'pietra', name: 'Pietra Grey Stone', filter: 'contrast(1.1) brightness(0.92) saturate(0.75)', swatch: '#3A3D40' },
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
      if (Math.abs(diff) > 0.0004) {
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

  // Scene 0 (Showroom): camera pushes in toward gallery screen
  const scene0Scale = 1 + clamp01(p / 0.25) * 0.22;

  // Scene 1 (Tower): shutter curtain wipes smoothly upward over showroom (0.14 -> 0.26)
  const shutter1 = smoothstep(0.14, 0.26, p);
  const s1Motion = clamp01((p - 0.14) / 0.36);
  const scene1Scale = 1.16 - s1Motion * 0.12;
  const scene1Y = 2.5 - s1Motion * 5;

  // Scene 2 (Daylight Residence): horizontal curtain wipe opening from right (0.41 -> 0.51)
  const shutter2 = smoothstep(0.41, 0.51, p);
  const s2Motion = clamp01((p - 0.41) / 0.28);
  const scene2Scale = 1.04 + s2Motion * 0.08;
  const scene2X = (s2Motion - 0.5) * -3;

  // Scene 3 (Sunset / Golden Hour): seamless daylight-to-dusk cross-dissolve (0.60 -> 0.72)
  const duskMix = smoothstep(0.60, 0.72, p);
  const s3Motion = clamp01((p - 0.60) / 0.40);
  const scene3Scale = 1.03 + s3Motion * 0.16;
  const scene3X = s3Motion * 2.2;
  const darkMatte = smoothstep(0.83, 0.94, p) * 0.62;

  // Stage Title Visibility Windows (continuous cross-dissolves, zero dead frames)
  const beat0Op = 1 - smoothstep(0.13, 0.18, p);
  const beat1Op = smoothstep(0.18, 0.23, p) * (1 - smoothstep(0.40, 0.44, p));
  const beat2Op = smoothstep(0.43, 0.48, p) * (1 - smoothstep(0.59, 0.63, p));
  const beat3Op = smoothstep(0.62, 0.67, p) * (1 - smoothstep(0.80, 0.84, p));
  const beat4Op = smoothstep(0.83, 0.88, p);

  const activeChapterIdx =
    p < 0.19 ? 0 : p < 0.44 ? 1 : p < 0.63 ? 2 : p < 0.84 ? 3 : 4;

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Flik Explorer Architectural Film"
      className="relative h-[420vh] bg-black"
    >
      {/* Semantic Deep-Link Anchors Distributed Through the Film */}
      <span id="platform" className="absolute top-[25%] left-0" aria-hidden="true" />
      <span id="capabilities" className="absolute top-[48%] left-0" aria-hidden="true" />
      <span id="intelligence" className="absolute top-[72%] left-0" aria-hidden="true" />
      <span id="teams" className="absolute top-[88%] left-0" aria-hidden="true" />

      {/* Pinned Fullscreen Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black">
        {/* PLATE 0: Experience Center Showroom */}
        <div
          aria-hidden="true"
          style={{
            transform: `scale(${scene0Scale})`,
            willChange: 'transform',
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <img
            src="/scenes/scene-00-showroom.jpg"
            alt="Flik Explorer architectural sales gallery"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50" />
        </div>

        {/* PLATE 1: Coastal Skyscraper (Vertical Shutter Curtain Reveal) */}
        {shutter1 > 0.001 && (
          <div
            aria-hidden="true"
            style={{
              clipPath: `inset(${(1 - shutter1) * 100}% 0 0 0)`,
              transform: `scale(${scene1Scale}) translate3d(0, ${scene1Y}%, 0)`,
              willChange: 'clip-path, transform',
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <img
              src="/scenes/scene-01-tower.jpg"
              alt="Residential skyscraper skyline at twilight"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
          </div>
        )}

        {/* PLATE 2: Sunlit Penthouse (Horizontal Curtain Reveal) */}
        {shutter2 > 0.001 && (
          <div
            aria-hidden="true"
            style={{
              clipPath: `inset(0 0 0 ${(1 - shutter2) * 100}%)`,
              transform: `scale(${scene2Scale}) translate3d(${scene2X}%, 0, 0)`,
              willChange: 'clip-path, transform',
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <img
              src="/scenes/scene-02-living-day.jpg"
              alt="Sunlit coastal penthouse apartment living space"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />
          </div>
        )}

        {/* PLATE 3: Evening Bay Dusk (Seamless Day-to-Dusk Lighting Dissolve) */}
        {duskMix > 0.001 && (
          <div
            aria-hidden="true"
            style={{
              opacity: duskMix,
              transform: `scale(${scene3Scale}) translate3d(${scene3X}%, 0, 0)`,
              filter: selectedFinish.filter,
              willChange: 'opacity, transform, filter',
            }}
            className="absolute inset-0 pointer-events-none transition-[filter] duration-500"
          >
            <img
              src="/scenes/scene-03-living-dusk.jpg"
              alt="Coastal penthouse apartment illuminated at golden dusk"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />
            <div
              style={{ opacity: 0.3 + darkMatte }}
              className="absolute inset-0 bg-black"
            />
          </div>
        )}

        {/* ==================== SCENE TITLES & STORYTELLING ==================== */}

        {/* SCENE 0: Opening Frame */}
        <div
          style={{
            opacity: beat0Op,
            transform: `translate3d(0, ${-smoothstep(0, 0.18, p) * 28}px, 0)`,
            pointerEvents: beat0Op > 0.2 ? 'auto' : 'none',
          }}
          className="absolute inset-0 z-20 flex flex-col justify-end pb-24 sm:pb-20 lg:justify-center lg:pb-0 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"
        >
          <div className="max-w-xl">
            <h1 className="text-[2.2rem] sm:text-5xl lg:text-[3.85rem] font-medium text-white leading-[1.06] tracking-[-0.03em] mb-5">
              Walk every floor before a single brick is laid.
            </h1>

            <p className="text-sm sm:text-lg text-gray-200 font-light leading-relaxed max-w-xl mb-8">
              Flik Explorer by{' '}
              <span className="text-white font-medium">Hastok Enterprise Pvt. Ltd.</span> replaces ₹2 to ₹5 crore physical sample flats with interactive browser-streamed residential architecture. Live today with Ajmera Cityscapes.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <Button
                data-testid="hero-primary-cta"
                size="lg"
                onClick={() => {
                  telemetry.ctaClick('Watch Film Sequence', 'hero_primary');
                  jumpToChapter(0.27);
                }}
                className="bg-[#22E55A] hover:bg-emerald-400 text-black font-semibold px-7 h-11 rounded-md text-sm transition-colors"
              >
                Watch the sequence
              </Button>

              <Button
                data-testid="hero-secondary-cta"
                size="lg"
                variant="outline"
                onClick={() => {
                  telemetry.ctaClick('Request Private Demo', 'hero_secondary');
                  openDemoDialog('hero_demo');
                }}
                className="bg-black/60 backdrop-blur-sm border-white/25 text-white hover:bg-white hover:text-black font-medium px-7 h-11 rounded-md text-sm transition-colors"
              >
                Request Demo
              </Button>
            </div>
          </div>

          <div className="hidden lg:block absolute bottom-8 left-12 text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400">
            Scroll down to direct the walkthrough
          </div>
        </div>

        {/* SCENE 1: Elevation Views */}
        {beat1Op > 0.01 && (
          <div
            style={{
              opacity: beat1Op,
              transform: `translate3d(0, ${(0.5 - s1Motion) * 18}px, 0)`,
            }}
            className="absolute inset-0 z-20 pointer-events-none flex items-end pb-24 sm:pb-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"
          >
            <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-[-0.03em] leading-[1.08] mb-3.5">
                  Show buyers the true coastal vista from every level.
                </h2>
                <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed">
                  A physical sample room sits on the ground and shows one fixed apartment. Flik streams the actual view corridor from every unit across all forty floors.
                </p>
              </div>

              <div className="hidden md:flex flex-col items-end gap-3.5 font-mono text-right text-xs text-gray-300 border-r border-white/30 pr-4">
                <div>
                  <span className="text-white block font-medium">Level 42 Penthouse</span>
                  <span className="text-gray-400 text-[11px]">Unobstructed western skyline orientation</span>
                </div>
                <div>
                  <span className="text-white block font-medium">Level 26 Corner Residence</span>
                  <span className="text-gray-400 text-[11px]">City altitude and coastal curve calibration</span>
                </div>
                <div>
                  <span className="text-white block font-medium">Level 08 Podium Deck</span>
                  <span className="text-gray-400 text-[11px]">Infinity pool and landscape clubhouse access</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 2: Morning Light Inside Apartment */}
        {beat2Op > 0.01 && (
          <div
            style={{
              opacity: beat2Op,
            }}
            className="absolute inset-0 z-20 pointer-events-none flex items-end pb-24 sm:pb-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"
          >
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-[-0.03em] leading-[1.08] mb-3.5">
                Explore natural sunlight and full room scale in any browser.
              </h2>
              <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed">
                Non-resident buyers in Dubai, Singapore, or London walk through the furnished apartment from a laptop or phone with zero downloads.
              </p>
            </div>
          </div>
        )}

        {/* SCENE 3: Dusk & Interactive Material Swatches */}
        {beat3Op > 0.01 && (
          <div
            style={{
              opacity: beat3Op,
              pointerEvents: beat3Op > 0.3 ? 'auto' : 'none',
            }}
            className="absolute inset-0 z-20 flex flex-col justify-end pb-24 sm:pb-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-xl pointer-events-none">
                <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-[-0.03em] leading-[1.08] mb-3.5">
                  Compare stone finishes, lighting moods, and unit configurations live.
                </h2>
                <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed">
                  Unlike concrete walls that cannot change once built, your project environment adapts instantly as phases and specifications evolve.
                </p>
              </div>

              <div className="inline-flex flex-col gap-2.5 bg-black/80 backdrop-blur-md border border-white/15 p-4 self-start lg:self-auto">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  Switch Interior Palette
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {FINISH_PRESETS.map((preset) => {
                    const active = selectedFinish.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setSelectedFinish(preset)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-xs transition-colors cursor-pointer border ${
                          active
                            ? 'bg-white text-black font-medium border-white'
                            : 'bg-black/60 text-gray-300 border-white/20 hover:border-white/50'
                        }`}
                      >
                        <span
                          className="w-3 h-3 border border-white/30 shrink-0"
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

        {/* SCENE 4: Economics & Sample Flat Replacement Facts */}
        {beat4Op > 0.01 && (
          <div
            style={{
              opacity: beat4Op,
              pointerEvents: beat4Op > 0.3 ? 'auto' : 'none',
            }}
            className="absolute inset-0 z-20 flex flex-col justify-center max-w-6xl mx-auto px-5 sm:px-8 pt-10"
          >
            <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-[-0.03em] leading-[1.08] mb-8 sm:mb-10 max-w-3xl">
              Why leading residential developers replace the sample flat with Flik Explorer.
            </h2>

            {/* Clean Architectural Data Ledger — Grounded Industry Figures Only */}
            <div className="w-full grid sm:grid-cols-3 border-t border-b border-white/20 divide-y sm:divide-y-0 sm:divide-x divide-white/20 mb-8 sm:mb-10">
              <div className="py-5 sm:py-7 sm:pr-6">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight">
                  ₹2–5 Cr
                </div>
                <div className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                  Typical expenditure to construct one physical sample unit with zero residual value after sellout.
                </div>
              </div>

              <div className="py-5 sm:py-7 sm:px-6">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight">
                  2–4 Weeks
                </div>
                <div className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                  Deployment timeline from receiving 2D CAD and BIM drawings compared to 3 to 6 months for site construction.
                </div>
              </div>

              <div className="py-5 sm:py-7 sm:pl-6">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#22E55A] tracking-tight">
                  70–80%
                </div>
                <div className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                  Share of Indian luxury residential apartments purchased while under construction.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <Button
                asChild
                size="lg"
                className="bg-[#22E55A] hover:bg-emerald-400 text-black font-semibold px-7 h-11 rounded-md text-sm transition-colors"
              >
                <a href="#experience">Try Interactive Walkthrough</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  telemetry.ctaClick('Request Private Demo', 'film_finale');
                  openDemoDialog('film_finale');
                }}
                className="bg-black/70 border-white/25 text-white hover:bg-white hover:text-black font-medium px-7 h-11 rounded-md text-sm transition-colors"
              >
                Schedule Project Review
              </Button>
            </div>
          </div>
        )}

        {/* Right Edge Minimal Chapter Scrubber */}
        <div
          aria-label="Film Chapters"
          className="hidden lg:flex flex-col items-end gap-2.5 absolute right-7 top-1/2 -translate-y-1/2 z-30"
        >
          {CHAPTERS.map((chap, idx) => {
            const isActive = idx === activeChapterIdx;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => jumpToChapter(chap.targetProgress)}
                className="group flex items-center gap-2.5 cursor-pointer py-0.5"
              >
                <span
                  className={`text-[11px] font-mono tracking-wide transition-opacity duration-200 ${
                    isActive ? 'text-white opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-90'
                  }`}
                >
                  {chap.label}
                </span>
                <span
                  className={`block transition-all duration-200 ${
                    isActive
                      ? 'w-6 h-[2px] bg-[#22E55A]'
                      : 'w-2 h-[1px] bg-white/40 group-hover:w-4 group-hover:bg-white'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Clean Bottom Cinema Progress Rule */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10 z-30 pointer-events-none"
        >
          <div style={{ width: `${p * 100}%` }} className="h-full bg-[#22E55A]" />
        </div>
      </div>
    </section>
  );
};

export default CinemaScrollMovie;

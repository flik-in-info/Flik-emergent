import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smoothstep = (edge0, edge1, x) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const HERO_STAGES = [
  {
    id: 'elevation',
    title: 'Level 42 Penthouse View',
    detail: 'Western skyline and coastal curve sightlines',
    actor: 'Vikram, NRI Buyer',
    tag: 'ELEVATION SYNC',
    image: '/scenes/scene-01-tower.jpg',
    alt: 'Mumbai residential tower western coastal vista at dusk',
  },
  {
    id: 'daylight',
    title: 'Sunlight Path & Scale',
    detail: '16:15 solar azimuth inside corner residence',
    actor: 'Priya, Sales Lead',
    tag: 'LIVE BROWSER',
    image: '/scenes/scene-02-living-day.jpg',
    alt: 'Sunlit coastal penthouse apartment living space',
  },
  {
    id: 'finishes',
    title: 'Stone Palette & Dusk',
    detail: 'Smoked walnut and evening architectural lighting',
    actor: 'Anil, Project Architect',
    tag: 'SPEC SWITCH',
    image: '/scenes/scene-03-living-dusk.jpg',
    alt: 'Penthouse living room illuminated at sunset dusk',
  },
];

const CHAPTERS = [
  { id: 'elevation', targetProgress: 0.08, label: 'Elevation' },
  { id: 'daylight', targetProgress: 0.50, label: 'Daylight' },
  { id: 'finishes', targetProgress: 0.88, label: 'Finishes' },
];

const FINISH_PRESETS = [
  { id: 'walnut', name: 'Smoked Walnut', filter: 'contrast(1.03) saturate(1.04)', swatch: '#6B4423' },
  { id: 'travertine', name: 'Honed Travertine', filter: 'contrast(1.04) brightness(1.05) saturate(0.86)', swatch: '#DDD6CB' },
  { id: 'pietra', name: 'Pietra Grey Stone', filter: 'contrast(1.08) brightness(0.93) saturate(0.75)', swatch: '#3A3D40' },
];

const HORIZON_OUTCOMES = [
  {
    metric: '₹2–5 Cr',
    label: 'Physical sample flat expenditure avoided per project with zero post-sellout demolition loss.',
  },
  {
    metric: '2–4 Weeks',
    label: 'Deployment turnaround from existing CAD and BIM drawings versus 3 to 6 months of construction.',
  },
  {
    metric: '70–80%',
    label: 'Share of Indian residential luxury units booked off-plan before site fit-out completion.',
  },
];

const CinemaScrollMovie = () => {
  const movieRef = useRef(null);
  const { open: openDemoDialog } = useDemoDialog();

  const [heroStageIdx, setHeroStageIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(FINISH_PRESETS[0]);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(null);

  const [userPinnedStage, setUserPinnedStage] = useState(false);
  useEffect(() => {
    if (userPinnedStage) return undefined;
    const timer = setInterval(() => {
      setHeroStageIdx((i) => (i + 1) % HERO_STAGES.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [userPinnedStage]);

  useEffect(() => {
    const computeTarget = () => {
      const el = movieRef.current;
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
    const el = movieRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + scrollable * targetP,
      behavior: 'smooth',
    });
  }, []);

  const p = progress;
  const activeStage = HERO_STAGES[heroStageIdx];

  const tiltDeg = (1 - smoothstep(0.0, 0.22, p)) * 6;
  const frameScale = 0.96 + smoothstep(0.0, 0.22, p) * 0.04;

  const s1Motion = clamp01(p / 0.42);
  const scene1Scale = 1.1 - s1Motion * 0.08;
  const scene1Y = 2 - s1Motion * 4;

  const shutter2 = smoothstep(0.30, 0.46, p);
  const s2Motion = clamp01((p - 0.30) / 0.38);
  const scene2Scale = 1.03 + s2Motion * 0.07;
  const scene2X = (s2Motion - 0.5) * -2.5;

  const duskMix = smoothstep(0.64, 0.80, p);
  const s3Motion = clamp01((p - 0.64) / 0.36);
  const scene3Scale = 1.02 + s3Motion * 0.1;

  const beat1Op = 1 - smoothstep(0.32, 0.40, p);
  const beat2Op = smoothstep(0.38, 0.45, p) * (1 - smoothstep(0.65, 0.72, p));
  const beat3Op = smoothstep(0.70, 0.77, p);

  const activeChapterIdx = p < 0.39 ? 0 : p < 0.71 ? 1 : 2;

  return (
    <div id="hero">
      {/* ==================== PART A: LIGHT ARCHITECTURAL OPENING (FLIK PALETTE ONLY) ==================== */}
      <section
        className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-white"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 65% 50% at 88% 15%, rgba(34, 229, 90, 0.09), transparent 60%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy & CTAs */}
            <div className="lg:col-span-6 min-w-0">
              <div className="text-[11px] sm:text-xs font-mono text-neutral-600 tracking-tight mb-4 leading-snug">
                Hastok Enterprise Pvt. Ltd. — Residential Architectural Platform
              </div>

              <h1 className="text-[2.45rem] sm:text-[3.4rem] lg:text-[4.15rem] font-medium text-black leading-[1.04] tracking-[-0.035em] mb-6">
                Walk every floor before a single{' '}
                <span className="underline decoration-[#22E55A] decoration-[4px] underline-offset-[6px]">
                  brick is laid.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl mb-8">
                Flik Explorer replaces ₹2 to ₹5 crore physical sample flats with interactive
                browser-streamed residential architecture. Deployed live today with Ajmera Cityscapes.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 mb-5">
                <Button
                  data-testid="hero-primary-cta"
                  size="lg"
                  onClick={() => {
                    telemetry.ctaClick('Explore the film', 'hero_primary');
                    jumpToChapter(0.05);
                  }}
                  className="bg-[#22E55A] hover:bg-[#2EE05F] text-black font-semibold px-6 h-12 rounded-lg text-sm transition-colors"
                >
                  Explore the film sequence
                </Button>

                <Button
                  data-testid="hero-secondary-cta"
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    telemetry.ctaClick('Request Private Demo', 'hero_secondary');
                    openDemoDialog('hero_demo');
                  }}
                  className="bg-white hover:border-black border-neutral-300 text-black font-medium px-6 h-12 rounded-lg text-sm transition-colors"
                >
                  Request Demo
                </Button>
              </div>

              <p className="text-xs text-neutral-500">
                Streams at 60 FPS across desktop and mobile browsers with zero downloads or VR headsets required.
              </p>
            </div>

            {/* Right Elevated Live Architectural Stage Card */}
            <div className="lg:col-span-6 min-w-0">
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 shadow-[0_28px_70px_-32px_rgba(0,0,0,0.16)] p-4 sm:p-5">
                {/* Stage Preview Viewport */}
                <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden bg-black mb-4">
                  <img
                    src={activeStage.image}
                    alt={activeStage.alt}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                  <div className="absolute top-3 left-3 bg-white/95 text-black text-[11px] font-mono px-2.5 py-1 rounded-md border border-neutral-200">
                    {activeStage.tag}
                  </div>

                  {/* Strict Flik Brand Badge (Black + Green) */}
                  <div className="absolute top-3 right-3 bg-black/90 border border-[#22E55A]/45 text-[#22E55A] text-[11px] font-medium px-2.5 py-1 rounded-md">
                    {activeStage.actor}
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-3 text-white">
                    <div className="min-w-0">
                      <div className="text-sm sm:text-base font-medium font-display">
                        {activeStage.title}
                      </div>
                      <div className="text-xs text-neutral-200">{activeStage.detail}</div>
                    </div>
                    <span className="text-[11px] font-mono bg-[#22E55A] text-black font-semibold px-2 py-0.5 rounded whitespace-nowrap shrink-0">
                      LIVE 60 FPS
                    </span>
                  </div>
                </div>

                {/* Selectable Live Walkthrough Rows */}
                <div className="space-y-2">
                  {HERO_STAGES.map((stage, idx) => {
                    const isActive = idx === heroStageIdx;
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => {
                          setUserPinnedStage(true);
                          setHeroStageIdx(idx);
                        }}
                        className={`w-full text-left flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white border-black shadow-sm'
                            : 'bg-white/60 border-neutral-200 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                              isActive ? 'bg-[#22E55A] border border-black/40' : 'bg-neutral-300'
                            }`}
                          />
                          <div className="truncate">
                            <span className="text-xs sm:text-sm font-semibold text-black block truncate">
                              {stage.title}
                            </span>
                            <span className="text-[11px] text-neutral-500 block truncate">
                              {stage.detail}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ml-2 ${
                            isActive
                              ? 'bg-[#22E55A] text-black font-semibold'
                              : 'bg-neutral-100 border border-neutral-200 text-neutral-600'
                          }`}
                        >
                          {stage.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PART B: PERSPECTIVE-TO-FULL-BLEED SCROLL MOVIE THEATER ==================== */}
      <section id="platform" aria-label="Scroll Cinema Walkthrough" className="bg-neutral-100 pt-14 sm:pt-20 border-t border-neutral-200">
        {/* Centered Header Over Neutral Architectural Concrete */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-5xl font-medium text-black tracking-[-0.03em] leading-[1.06] mb-3">
            Direct every angle from podium to penthouse.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto">
            Scroll smoothly through floor elevations, natural coastal sunlight, and interchangeable interior stone specifications.
          </p>
        </div>

        {/* Sticky Scroll Theater Track */}
        <div ref={movieRef} className="relative h-[240vh]">
          <span id="capabilities" className="absolute top-[36%] left-0" aria-hidden="true" />
          <span id="intelligence" className="absolute top-[70%] left-0" aria-hidden="true" />
          <span id="teams" className="absolute top-[85%] left-0" aria-hidden="true" />

          <div className="sticky top-[78px] h-[calc(100dvh-94px)] px-3 sm:px-6 lg:px-8 flex items-center justify-center">
            <div
              style={{
                transform: `perspective(1400px) rotateX(${tiltDeg.toFixed(2)}deg) scale(${frameScale.toFixed(4)})`,
              }}
              className="relative w-full max-w-7xl h-full rounded-2xl overflow-hidden bg-black border border-black/20 shadow-[0_38px_90px_-30px_rgba(0,0,0,0.45)]"
            >
              {/* SCENE 1 PLATE: Mumbai Coastal Skyline Tower */}
              <div
                aria-hidden="true"
                style={{
                  transform: `scale(${scene1Scale}) translate3d(0, ${scene1Y}%, 0)`,
                  willChange: 'transform',
                }}
                className="absolute inset-0 pointer-events-none"
              >
                <img
                  src="/scenes/scene-01-tower.jpg"
                  alt="Marine Drive curve residential skyscraper at twilight"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-transparent" />
              </div>

              {/* SCENE 2 PLATE: Horizontal Curtain Wipe to Daylight Living Room */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />
                </div>
              )}

              {/* SCENE 3 PLATE: Sunset / Golden Hour Cross-Dissolve + Finish Swatch */}
              {duskMix > 0.001 && (
                <div
                  aria-hidden="true"
                  style={{
                    opacity: duskMix,
                    transform: `scale(${scene3Scale})`,
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-black/20" />
                </div>
              )}

              {/* CAPTION 1: Elevation Views */}
              {beat1Op > 0.01 && (
                <div
                  style={{ opacity: beat1Op }}
                  className="absolute inset-0 z-20 pointer-events-none flex items-end p-6 sm:p-10 lg:p-12"
                >
                  <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="max-w-xl">
                      <h3 className="text-2xl sm:text-4xl font-medium text-white tracking-[-0.025em] leading-[1.08] mb-2.5">
                        Show buyers the true coastal vista from every level.
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                        A ground-level physical sample flat shows one room. Flik streams exact balcony sightlines from Level 08 podium up to Level 42.
                      </p>
                    </div>

                    <div className="hidden md:flex flex-col items-end gap-2 font-mono text-right text-xs text-neutral-300 border-r border-white/30 pr-4">
                      <span>Level 42 Penthouse — Open western horizon</span>
                      <span>Level 26 Residence — Marine curve altitude</span>
                      <span>Level 08 Podium — Pool and clubhouse deck</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CAPTION 2: Daylight Scale */}
              {beat2Op > 0.01 && (
                <div
                  style={{ opacity: beat2Op }}
                  className="absolute inset-0 z-20 pointer-events-none flex items-end p-6 sm:p-10 lg:p-12"
                >
                  <div className="max-w-xl">
                    <h3 className="text-2xl sm:text-4xl font-medium text-white tracking-[-0.025em] leading-[1.08] mb-2.5">
                      Explore natural sunlight and full room scale in any browser.
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                      Overseas buyers in Dubai, Singapore, or London inspect furnished layouts from their laptop or phone without installing software.
                    </p>
                  </div>
                </div>
              )}

              {/* CAPTION 3: Dusk & Material Swatches */}
              {beat3Op > 0.01 && (
                <div
                  style={{
                    opacity: beat3Op,
                    pointerEvents: beat3Op > 0.35 ? 'auto' : 'none',
                  }}
                  className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 lg:p-12"
                >
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="max-w-xl pointer-events-none">
                      <h3 className="text-2xl sm:text-4xl font-medium text-white tracking-[-0.025em] leading-[1.08] mb-2.5">
                        Switch stone palettes and evening moods live.
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                        Test wood, travertine, and stone finishes directly inside the scene as specifications evolve across launch phases.
                      </p>
                    </div>

                    <div className="inline-flex flex-col gap-2 bg-black/85 backdrop-blur-md border border-white/20 p-3.5 rounded-xl self-start lg:self-auto">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                        Interior Material Mood
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {FINISH_PRESETS.map((preset) => {
                          const active = selectedFinish.id === preset.id;
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => setSelectedFinish(preset)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer border ${
                                active
                                  ? 'bg-[#22E55A] text-black font-semibold border-[#22E55A]'
                                  : 'bg-white/5 text-neutral-200 border-white/20 hover:border-white/50'
                              }`}
                            >
                              <span
                                className="w-3 h-3 rounded-sm border border-white/30 shrink-0"
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

              {/* Right Chapter Selector Pill Inside Theater */}
              <div
                aria-label="Film Chapters"
                className="hidden sm:flex items-center gap-1.5 absolute top-5 right-5 z-30 bg-black/80 backdrop-blur-md border border-white/20 px-2 py-1.5 rounded-lg"
              >
                {CHAPTERS.map((chap, idx) => {
                  const isActive = idx === activeChapterIdx;
                  return (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => jumpToChapter(chap.targetProgress)}
                      className={`px-3 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#22E55A] text-black font-semibold'
                          : 'text-neutral-300 hover:text-white'
                      }`}
                    >
                      {chap.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Monochrome Obsidian-to-White Atmospheric Bridge (Strict Flik Black/White/Green) */}
        <div
          className="relative pt-16 sm:pt-20 pb-20 sm:pb-28 text-white"
          style={{
            background:
              'linear-gradient(180deg, #000000 0%, #18181b 52%, #d4d4d8 84%, #ffffff 100%)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-5">
              {HORIZON_OUTCOMES.map((item) => (
                <div
                  key={item.metric}
                  className="bg-black/85 backdrop-blur-md border border-white/15 rounded-2xl p-6 sm:p-7"
                >
                  <div className="text-3xl sm:text-4xl font-medium font-display text-[#22E55A] tracking-tight mb-2.5">
                    {item.metric}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CinemaScrollMovie;

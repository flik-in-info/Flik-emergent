import React, { useState } from 'react';
import { ArrowRight, Compass, ShieldCheck, Zap, Sparkles, Play, IndianRupee, Layers, Eye, Smartphone, CheckCircle2 } from 'lucide-react';
import { useDemoDialog } from '../context/DemoDialogContext';
import { UiverseButton, UiverseBadge, Uiverse3DCard } from './uiverse/UiverseComponents';

const VIEWPORT_SLIDES = [
  {
    id: 'penthouse',
    label: 'Sea-Facing Penthouse Twin',
    tag: 'Mumbai Coastal Skyline · 42nd Floor',
    image: '/assets/nri-penthouse.jpg',
    desc: 'Floor-to-ceiling panoramic glass, Italian statuario marble, & real-time sunset lighting over the Arabian Sea.',
    hotspots: [
      { x: '18%', y: '45%', title: 'Panoramic Sea Vista', text: 'Simulated 180° sunset view from 42nd floor elevation.' },
      { x: '58%', y: '78%', title: 'Live 3D Twin on iPad', text: 'Real-time spatial engine running on Safari without apps.' },
      { x: '82%', y: '52%', title: 'Acoustic Wall Panels', text: 'Custom fluted timber finishes toggled by buyer choice.' },
    ],
  },
  {
    id: 'towers',
    label: '3D High-Rise Tower Orbit',
    tag: 'Towers A, B & C · Master Elevation',
    image: '/assets/panorama-studio.png',
    desc: 'Full 360° orbital view of the superstructure, floor-by-floor unit isolation, and live inventory sync.',
    hotspots: [
      { x: '78%', y: '25%', title: 'Unit A-2403 Selected', text: '3 BHK · 1,286 sq ft · ₹3.25 Cr · East Facing.' },
      { x: '45%', y: '68%', title: 'Resort Swimming Pool', text: 'Ground amenities mapped to real sunlight hours.' },
      { x: '62%', y: '72%', title: 'Clubhouse Pavilion', text: 'Interactive spatial walk into lifestyle amenities.' },
    ],
  },
  {
    id: 'platform',
    label: 'Multi-Tower Project Explorer',
    tag: 'Full Inventory & Vastu Compass',
    image: '/assets/obsidian-platform.png',
    desc: 'Live CRM unit inventory matrix, 3D extruded floor cutaways, and dynamic time-of-day slider.',
    hotspots: [
      { x: '88%', y: '28%', title: '3D Isometric Layout', text: 'Instant extruded floor plan linked to 3D walk.' },
      { x: '65%', y: '88%', title: 'Sun Dial (16:30)', text: 'Slide from morning dawn to evening golden hour.' },
    ],
  },
];

const HeroSection = () => {
  const { open: openDemoDialog } = useDemoDialog();
  const [activeSlide, setActiveSlide] = useState(VIEWPORT_SLIDES[0]);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative flex flex-col justify-start overflow-hidden bg-[#060608] pt-28 pb-16">
      
      {/* Ambient Architectural Lighting Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(34,229,90,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col">
        
        {/* Top Authority Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <UiverseBadge
            highlight="ENTERPRISE PLATFORM"
            text="Replacing Physical Sample Flats for Premier Indian Developers"
          />

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>UNREAL ENGINE 5.4 · 60 FPS BROWSER STREAMING</span>
          </div>
        </div>

        {/* Main Grand Architectural Headline */}
        <div className="max-w-4xl mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight text-white leading-[1.04] tracking-tight mb-6">
            The sample flat is obsolete.<br />
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white">
              Sell what doesn&apos;t exist yet in 3D.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-3xl mb-8">
            Flik Explorer replaces ₹2 to ₹5 Crore physical sample flats with photorealistic, real-time 3D spatial twins. Walk every floor, inspect balcony sightlines, and close NRI buyers remotely—weeks before physical construction finishes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <UiverseButton
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('experience')}
              icon={ArrowRight}
            >
              Step Inside Live 3D Twin
            </UiverseButton>

            <UiverseButton
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('economics')}
              icon={IndianRupee}
            >
              Calculate Capital Saved
            </UiverseButton>

            <UiverseButton
              variant="glass"
              size="lg"
              onClick={() => openDemoDialog('hero_executive')}
              icon={Sparkles}
            >
              Request Private Walkthrough
            </UiverseButton>
          </div>
        </div>

        {/* Viewport View Switcher Tabs (Uiverse style) */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {VIEWPORT_SLIDES.map((slide) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => {
                setActiveSlide(slide);
                setActiveHotspot(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-medium transition-all duration-300 ${
                activeSlide.id === slide.id
                  ? 'bg-emerald-500 text-black font-bold shadow-[0_0_25px_rgba(34,229,90,0.4)]'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{slide.label}</span>
            </button>
          ))}
        </div>

        {/* The Master Cinema-Grade Architectural Viewport Frame */}
        <div className="rounded-3xl overflow-hidden border border-white/15 bg-[#09090d] shadow-[0_30px_100px_rgba(0,0,0,0.95)] relative group">
          
          {/* Top Cinema Telemetry Bar */}
          <div className="px-6 py-3.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-wider uppercase">{activeSlide.tag}</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-gray-400">
              <span>LUMEN GLOBAL ILLUMINATION · 4K UHD</span>
              <span className="text-white/20">|</span>
              <span className="text-emerald-400 font-semibold">ZERO APP DOWNLOADS</span>
            </div>
          </div>

          {/* Viewport Canvas with Ultra-Res Photographic Master Visual */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black select-none">
            <img
              src={activeSlide.image}
              alt={activeSlide.label}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
            
            {/* Ambient Dark Gradient Framing */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />

            {/* Interactive 3D Hotspot Coordinate Pins */}
            {activeSlide.hotspots.map((spot, i) => (
              <div
                key={i}
                style={{ left: spot.x, top: spot.y }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  type="button"
                  onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
                  className="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/90 text-black shadow-[0_0_25px_rgba(34,229,90,0.7)] hover:scale-125 transition-transform"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="w-2.5 h-2.5 rounded-full bg-black" />
                </button>

                {/* Popover Hotspot Card */}
                {activeHotspot === i && (
                  <div className="absolute left-10 top-0 -translate-y-1/2 w-64 p-3.5 rounded-2xl bg-black/90 backdrop-blur-2xl border border-emerald-500/40 text-left shadow-2xl z-30 animate-in fade-in zoom-in-95">
                    <div className="text-xs font-mono font-bold text-emerald-400 mb-1">{spot.title}</div>
                    <p className="text-[11px] text-gray-300 font-light leading-relaxed">{spot.text}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Central Primary Interactive Launch Trigger */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                type="button"
                onClick={() => scrollToSection('experience')}
                className="pointer-events-auto group/btn flex items-center gap-3.5 px-7 py-4.5 rounded-2xl bg-black/75 hover:bg-black/95 backdrop-blur-2xl border border-emerald-500/50 hover:border-emerald-400 text-white shadow-[0_0_40px_rgba(34,229,90,0.3)] hover:shadow-[0_0_70px_rgba(34,229,90,0.6)] transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg">
                  <Play className="w-5 h-5 fill-black ml-0.5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                    Interactive Walkthrough
                  </div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <span>Enter Live 3D Digital Twin</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </div>
                </div>
              </button>
            </div>

            {/* Bottom-Left Perspective Description Card */}
            <div className="absolute bottom-6 left-6 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 max-w-sm hidden sm:block pointer-events-none">
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
                {activeSlide.label}
              </div>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                {activeSlide.desc}
              </p>
            </div>

            {/* Bottom-Right Stream Telemetry Card */}
            <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 hidden md:block pointer-events-none text-right">
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
                Browser Native WebGPU
              </div>
              <div className="text-xs text-gray-300 font-light font-mono">
                Runs on Safari, Chrome, iOS & Android
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 4 Uiverse 3D Metric Highlights Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Uiverse3DCard className="p-5">
            <div className="text-2xl sm:text-3xl font-light text-white font-mono mb-1 text-gradient-emerald">
              ₹2–5 Crore
            </div>
            <div className="text-xs text-gray-300 font-light">Physical Sunk Cost Eliminated</div>
          </Uiverse3DCard>

          <Uiverse3DCard className="p-5">
            <div className="text-2xl sm:text-3xl font-light text-white font-mono mb-1 text-gradient-emerald">
              14 Days
            </div>
            <div className="text-xs text-gray-300 font-light">Turnaround to Live Launch</div>
          </Uiverse3DCard>

          <Uiverse3DCard className="p-5">
            <div className="text-2xl sm:text-3xl font-light text-white font-mono mb-1 text-gradient-emerald">
              100%
            </div>
            <div className="text-xs text-gray-300 font-light">Browser-Native (Zero Apps)</div>
          </Uiverse3DCard>

          <Uiverse3DCard className="p-5">
            <div className="text-2xl sm:text-3xl font-light text-white font-mono mb-1 text-gradient-emerald">
              1-Click
            </div>
            <div className="text-xs text-gray-300 font-light">WhatsApp Link for NRI Buyers</div>
          </Uiverse3DCard>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
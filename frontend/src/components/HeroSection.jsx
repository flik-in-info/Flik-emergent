import React, { useState } from 'react';
import { ArrowRight, Compass, ShieldCheck, Zap, Sparkles, Play, IndianRupee, Layers, Eye, Smartphone, Maximize2, CheckCircle2 } from 'lucide-react';
import { useDemoDialog } from '../context/DemoDialogContext';
import { UiverseButton, UiverseBadge, Uiverse3DCard } from './uiverse/UiverseComponents';

const STUDIO_MODES = [
  {
    id: 'walkthrough',
    label: '3D Walkthrough Twin',
    icon: Compass,
    tag: 'Penthouse Suite · Sunset Horizon',
    image: '/assets/flik-walkthrough-ui.png',
    badge: '1:1 SPATIAL INTERIOR TWIN',
    title: 'Penthouse Walkthrough & Balcony Horizon',
    desc: 'Interactive 3D walkthrough with real-time floor plan minimap radar, daylight scrubber, and true altitude horizon views.',
    stats: { metric: '60 FPS', label: 'Unreal Lumen GI', extra: 'Safari · Chrome · iPad' },
  },
  {
    id: 'customizer',
    label: 'Live Finish Customizer',
    icon: Layers,
    tag: 'Kitchen Island & Living Surfaces',
    image: '/assets/flik-material-ui.png',
    badge: 'SURFACE & MATERIAL ENGINE',
    title: 'Real-Time Material & Finish Customizer',
    desc: 'Buyers swap Italian Calacatta marble, smoked oak wood, midnight quartz, and polished concrete with instant dual-screen sync.',
    stats: { metric: '4 Finishes', label: 'Photorealistic PBR', extra: 'Real-Time Sync' },
  },
  {
    id: 'location',
    label: 'Catchment Intelligence',
    icon: Compass,
    tag: 'Urban Spatial Matrix · 1km & 3km Radius',
    image: '/assets/flik-location-ui.png',
    badge: 'SPATIAL CATCHMENT MAP',
    title: 'Holographic Location & Infrastructure Matrix',
    desc: 'Drone-verified 3D city mesh with school, hospital, and transit commute curves linked directly to project elevations.',
    stats: { metric: '3D Mesh', label: 'POI & Transit Layer', extra: 'Live Telemetry' },
  },
  {
    id: 'inventory',
    label: 'Stacking Plan & Heatmap',
    icon: Zap,
    tag: '15-Floor Tower Plate · Live Availability',
    image: '/assets/flik-dashboard-ui.png',
    badge: 'CRM INVENTORY & TELEMETRY',
    title: 'Live Unit Stacking Plan & Dwell Heatmap',
    desc: 'Real-time unit availability grid mapped to buyer spatial dwell heatmaps and sales velocity telemetry synced into Sell.Do and Salesforce.',
    stats: { metric: '15 Floors', label: 'Live Inventory Matrix', extra: 'CRM Auto-Sync' },
  },
];

const HeroSection = () => {
  const { open: openDemoDialog } = useDemoDialog();
  const [activeMode, setActiveMode] = useState(STUDIO_MODES[0]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative flex flex-col justify-start overflow-hidden bg-[#060608] pt-28 pb-20">
      
      {/* Ambient Architectural Lighting Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(34,229,90,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        {/* Top Authority Header Badge */}
        <div className="mb-6">
          <UiverseBadge
            highlight="ENTERPRISE PLATFORM"
            text="Unreal Engine 5 Real Estate Sales Operating System"
          />
        </div>

        {/* Main Grand Architectural Headline */}
        <div className="max-w-4xl mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight text-white leading-[1.05] tracking-tight mb-6">
            Sell under-construction towers.<br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white">
              Before ground is broken.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Flik Explorer replaces ₹2 to ₹5 Crore physical sample flats with photorealistic 3D digital twins. Walk every floor, inspect balcony sightlines, and close remote NRI buyers in standard web browsers.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
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
              onClick={() => openDemoDialog('hero_executive')}
              icon={Sparkles}
            >
              Request Executive Walkthrough
            </UiverseButton>
          </div>
        </div>

        {/* Interactive Studio Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 w-full max-w-4xl">
          {STUDIO_MODES.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode.id === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveMode(mode)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-black font-bold shadow-[0_0_30px_rgba(34,229,90,0.45)] scale-105'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* The Master Interactive Studio Frame (High-Tech Product Viewport) */}
        <div className="w-full max-w-6xl rounded-3xl overflow-hidden border border-white/15 bg-[#09090d] shadow-[0_30px_100px_rgba(0,0,0,0.95)] relative group text-left">
          
          {/* Top Telemetry & Studio HUD Bar */}
          <div className="px-6 py-3.5 bg-white/[0.03] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-wider uppercase font-semibold">● LIVE 4K PIXEL STREAM (WEBRTC)</span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="text-gray-300 hidden sm:inline font-normal">{activeMode.tag}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-emerald-300">
                {activeMode.stats.metric}
              </span>
              <span className="hidden md:inline">{activeMode.stats.label}</span>
              <span className="text-white/20 hidden md:inline">|</span>
              <span className="text-emerald-400 font-semibold">{activeMode.stats.extra}</span>
            </div>
          </div>

          {/* Master Viewport Image with Smooth Fade */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black select-none">
            <img
              src={activeMode.image}
              alt={activeMode.title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.01]"
            />
            
            {/* Subtle Gradient Framing */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-black/10 to-transparent pointer-events-none" />

            {/* Bottom Viewport Interactive Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/85 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {activeMode.badge}
                  </span>
                  <span className="text-xs text-gray-400 font-light">Click tabs above to switch spatial modules</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-white">
                  {activeMode.title}
                </h3>
                <p className="text-xs text-gray-300 font-light max-w-2xl leading-relaxed">
                  {activeMode.desc}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToSection('experience')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(34,229,90,0.3)] flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Launch Walkthrough</span>
                </button>
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
            <div className="text-xs text-gray-300 font-light">Sample Flat Capex Eliminated</div>
          </Uiverse3DCard>

          <Uiverse3DCard className="p-5">
            <div className="text-2xl sm:text-3xl font-light text-white font-mono mb-1 text-gradient-emerald">
              14 Days
            </div>
            <div className="text-xs text-gray-300 font-light">Turnaround from CAD/BIM</div>
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
            <div className="text-xs text-gray-300 font-light">WhatsApp NRI Cloud Link</div>
          </Uiverse3DCard>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
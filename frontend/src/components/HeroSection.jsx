import React, { useState } from 'react';
import { Button } from './ui/button';
import { Play, ArrowRight, Radio, Sparkles, Compass, ShieldCheck, Zap, Eye, Sunrise, Sun, Sunset, Maximize2, MapPin } from 'lucide-react';
import { images } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';

const SPATIAL_HOTSPOTS = [
  {
    id: 'balcony',
    title: 'Balcony Sightline · 34th Floor',
    subtitle: 'Drone-verified panoramic ocean & skyline view',
    image: images.environment,
    elevation: '+118m MSL',
    sun: '06:15 PM Sunset Amber',
  },
  {
    id: 'living',
    title: 'Double-Height Living Gallery',
    subtitle: 'Italian statuario marble & bespoke architectural lighting',
    image: images.hero,
    elevation: '+4m MSL',
    sun: '12:30 PM Solar White',
  },
  {
    id: 'aerial',
    title: 'Tower Masterplan Aerial',
    subtitle: 'Full architectural massing and podium arrival experience',
    image: images.devices,
    elevation: '+240m Drone',
    sun: '09:00 AM Morning Light',
  },
  {
    id: 'experience-center',
    title: 'Digital Sales Gallery',
    subtitle: 'Ajmera Cityscapes 4K interactive video wall deployment',
    image: images.showroom,
    elevation: 'Sales Pavilion',
    sun: 'Ambient LED Cove',
  },
];

const HeroSection = () => {
  const { open: openDemoDialog } = useDemoDialog();
  const [activeHotspot, setActiveHotspot] = useState(SPATIAL_HOTSPOTS[0]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#070709] pt-28 pb-12">
      
      {/* 3D Holographic CAD Floor Grid Background */}
      <div className="hologram-floor-3d z-0" />

      {/* Ambient Radial Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[170px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        
        {/* Top Authority Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-emerald-500/30 text-xs font-mono text-gray-300 shadow-[0_0_30px_rgba(34,229,90,0.12)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold tracking-wider">LIVE FLAGSHIP</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300">Ajmera Cityscapes, Mumbai · 3D Digital Twin</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>UNREAL ENGINE 5.4 · 60 FPS ULTRA-HD CLOUD STREAM</span>
          </div>
        </div>

        {/* Main Editorial Headline */}
        <div className="max-w-4xl mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight mb-6">
            <span className="block font-extralight text-gray-400">The sample flat is dead.</span>
            <span className="block font-medium text-gradient-emerald">
              Sell what doesn&apos;t exist yet in 3D.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mb-8">
            Flik Explorer replaces ₹3 Crore physical sample flats with photorealistic, interactive 3D digital twins. Walk every floor, inspect balcony sightlines, and close NRI buyers remotely—weeks before physical construction finishes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              onClick={() => scrollToSection('experience')}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-6 text-base rounded-2xl shadow-[0_0_35px_rgba(34,229,90,0.35)] hover:shadow-[0_0_45px_rgba(34,229,90,0.55)] transition-all duration-300 group"
            >
              <Compass className="mr-2 w-5 h-5 text-black" />
              Explore Live 3D Twin
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              onClick={() => scrollToSection('roi-calculator')}
              className="border-white/20 bg-white/[0.03] backdrop-blur-xl text-white hover:bg-white/10 font-medium px-8 py-6 text-base rounded-2xl transition-all duration-300"
            >
              Calculate Developer ROI
            </Button>
          </div>
        </div>

        {/* The Spatial Viewport Cockpit Stage */}
        <div className="mt-8 rounded-3xl overflow-hidden border border-white/15 bg-[#0b0b0e] shadow-[0_30px_90px_rgba(0,0,0,0.9)] relative card-3d-tilt">
          
          {/* Top Stage Bar */}
          <div className="px-6 py-4 bg-white/[0.02] border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <Eye className="w-4 h-4" />
              <span className="uppercase tracking-wider">INTERACTIVE SPATIAL VIEWPORT · SELECT CAMERA ANGLE</span>
            </div>

            {/* Hotspot Switchers */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {SPATIAL_HOTSPOTS.map((h) => {
                const isActive = activeHotspot.id === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => setActiveHotspot(h)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-emerald-500 text-black font-semibold shadow-md'
                        : 'text-gray-400 hover:text-white bg-white/[0.03] border border-white/5'
                    }`}
                  >
                    {h.title.split('·')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Viewport Canvas */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black select-none">
            <img
              src={activeHotspot.image}
              alt={activeHotspot.title}
              className="w-full h-full object-cover transition-all duration-700 ease-out scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent pointer-events-none" />

            {/* Top-Right Telemetry Overlay */}
            <div className="absolute top-6 right-6 luxury-glass rounded-2xl p-4 text-xs font-mono text-gray-300 border border-white/15 max-w-xs hidden sm:block pointer-events-none">
              <div className="text-emerald-400 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ACTIVE PERSPECTIVE</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">CAMERA:</span>
                  <span className="font-medium text-white">{activeHotspot.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ALTITUDE:</span>
                  <span className="font-medium text-emerald-300">{activeHotspot.elevation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">LIGHTING:</span>
                  <span className="font-medium text-white">{activeHotspot.sun}</span>
                </div>
              </div>
            </div>

            {/* Bottom-Left Description & Direct 3D Trigger */}
            <div className="absolute bottom-6 left-6 luxury-glass rounded-2xl p-5 border border-white/15 max-w-md">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                {activeHotspot.title}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-light mb-3">
                {activeHotspot.subtitle}
              </p>
              <button
                onClick={() => scrollToSection('experience')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-300 hover:text-white transition-colors"
              >
                <span>Launch Full 360° Walkthrough</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Feature Highlights Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-white/10 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero App Downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Browser Streaming</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Lumen Dynamic Lighting</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>₹2-5 Cr Sunk Cost Saved</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
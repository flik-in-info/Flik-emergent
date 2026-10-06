import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Compass, ShieldCheck, Zap, Sparkles, Play, Maximize2 } from 'lucide-react';
import { images } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';

const HeroSection = () => {
  const { open: openDemoDialog } = useDemoDialog();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#050507] pt-28 pb-16">
      
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
            <span className="text-emerald-400 font-semibold tracking-wider">ENTERPRISE SPATIAL PLATFORM</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300">Photorealistic 3D Digital Twins for Real Estate</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>UNREAL ENGINE 5.4 · 60 FPS ULTRA-HD CLOUD STREAM</span>
          </div>
        </div>

        {/* Main Editorial Headline */}
        <div className="max-w-4xl mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight mb-6">
            <span className="block font-extralight text-gray-400">Architecture before the concrete.</span>
            <span className="block font-medium text-gradient-emerald">
              Sell what doesn&apos;t exist yet in 3D.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mb-8">
            Flik Explorer replaces ₹2 to ₹5 Crore physical sample flats with photorealistic, interactive 3D digital twins. Walk every floor, inspect balcony sightlines, and close NRI buyers remotely—weeks before physical construction finishes.
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
              onClick={() => scrollToSection('economics')}
              className="border-white/20 bg-white/[0.03] backdrop-blur-xl text-white hover:bg-white/10 font-medium px-8 py-6 text-base rounded-2xl transition-all duration-300"
            >
              Calculate Developer Savings
            </Button>
          </div>
        </div>

        {/* The Cinema-Grade Spatial Showcase Frame */}
        <div className="rounded-3xl overflow-hidden border border-white/15 bg-[#0a0a0d] shadow-[0_30px_90px_rgba(0,0,0,0.9)] relative card-3d-tilt group">
          
          {/* Top Cinema Bar */}
          <div className="px-6 py-3.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-wider">PHOTOREALISTIC SPATIAL TWIN · 4K UHD INTERACTIVE PREVIEW</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-gray-400">
              <span>LUMEN GLOBAL ILLUMINATION · NANITE GEOMETRY</span>
            </div>
          </div>

          {/* Viewport Canvas with Pure High-Res Interior Visual */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black select-none">
            <img
              src={images.hero}
              alt="Flik Explorer Photorealistic 3D Digital Twin Luxury Interior"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

            {/* Central Interactive Launch Trigger */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                type="button"
                onClick={() => scrollToSection('experience')}
                className="pointer-events-auto group/btn flex items-center gap-3 px-6 py-4 rounded-2xl bg-black/70 hover:bg-black/90 backdrop-blur-2xl border border-emerald-500/50 hover:border-emerald-400 text-white shadow-[0_0_40px_rgba(34,229,90,0.25)] hover:shadow-[0_0_60px_rgba(34,229,90,0.45)] transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg">
                  <Play className="w-5 h-5 fill-black ml-0.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                    Interactive Walkthrough
                  </div>
                  <div className="text-sm font-medium text-white flex items-center gap-1.5">
                    <span>Enter Live 3D Digital Twin</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </div>
                </div>
              </button>
            </div>

            {/* Bottom-Left Perspective Tag */}
            <div className="absolute bottom-6 left-6 p-4 rounded-xl luxury-glass border border-white/15 max-w-sm hidden sm:block pointer-events-none">
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
                Luxury Living Gallery · 42nd Floor
              </div>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Italian statuario marble, acoustic wood slat walls, & dynamic daylight simulated from 06:00 AM to 06:30 PM.
              </p>
            </div>

            {/* Bottom-Right Stream Telemetry */}
            <div className="absolute bottom-6 right-6 p-4 rounded-xl luxury-glass border border-white/15 hidden md:block pointer-events-none text-right">
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
                Zero App Downloads
              </div>
              <div className="text-xs text-gray-300 font-light font-mono">
                Runs on Safari, Chrome, iOS & Android
              </div>
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
            <span>₹2–5 Cr Sunk Cost Saved</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
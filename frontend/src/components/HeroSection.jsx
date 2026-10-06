import React from 'react';
import { Button } from './ui/button';
import { Play, ArrowRight, Radio, Sparkles, Compass, ShieldCheck, Zap } from 'lucide-react';
import { heroData, images } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';

const HeroSection = () => {
  const { open: openDemoDialog } = useDemoDialog();

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#09090b]">
      {/* Background Image with Cinematic Gradient & Mesh Overlays */}
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Flik Explorer — Real-Time 3D Architectural Visualization & Sample Flat Replacement"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multilayered Architectural Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/90 to-[#09090b]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-[#09090b]/60" />
        
        {/* Subtle Ambient Mesh Orbs */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* CAD Watermark Coordinates (Pinterest / Architectural Blueprint style) */}
      <div className="absolute top-28 right-8 lg:right-16 z-10 hidden sm:flex flex-col items-end text-[11px] font-mono text-gray-500/80 pointer-events-none select-none">
        <span className="tracking-widest">SYS // UNREAL ENGINE 5.4.4</span>
        <span className="text-emerald-500/70 tracking-wider">LAT: 18°58&apos;N · LON: 72°49&apos;E [MUMBAI]</span>
        <span className="text-gray-600">NANITE · LUMEN · REALTIME GI</span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-24 w-full">
        <div className="max-w-3xl">
          
          {/* Flagship Authority Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-emerald-500/30 text-xs font-medium text-gray-300 mb-8 shadow-[0_0_25px_rgba(34,229,90,0.12)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold tracking-wide">FLAGSHIP LIVE</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300">Ajmera Cityscapes, Mumbai · 3D Digital Twin</span>
          </div>

          {/* Headline with High-Contrast Architectural Typography */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.08] tracking-tight mb-8">
            <span className="block font-extralight text-gray-300">Replace the ₹3 Crore sample flat.</span>
            <span className="block font-medium text-gradient-emerald">
              Sell what doesn&apos;t exist yet.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-gray-300/90 font-light leading-relaxed mb-10 max-w-2xl">
            Flik Explorer turns under-construction residential towers into cinema-grade, interactive 3D digital twins. Walk through any floor, inspect exact balcony sightlines, and close NRI buyers remotely—months before physical construction finishes.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Button
              data-testid="hero-primary-cta"
              size="lg"
              onClick={() => openDemoDialog('hero')}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-6 text-base transition-all duration-300 shadow-[0_0_30px_rgba(34,229,90,0.3)] hover:shadow-[0_0_40px_rgba(34,229,90,0.5)] group rounded-xl"
            >
              {heroData.primaryCta}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              data-testid="hero-secondary-cta"
              size="lg"
              variant="outline"
              onClick={() => openDemoDialog('hero_demo')}
              className="border-white/20 bg-white/[0.03] backdrop-blur-md text-white hover:bg-white/10 font-medium px-8 py-6 text-base transition-all duration-300 group rounded-xl"
            >
              <Play className="mr-2 w-4 h-4 fill-emerald-400 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
              {heroData.secondaryCta}
            </Button>
          </div>

          {/* Feature Highlight Chips */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-white/10 text-xs text-gray-400 font-mono">
            <div className="flex items-center gap-1.5 text-gray-300">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero App Downloads</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Browser Streaming</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lumen Dynamic Lighting</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Global NRI Closures</span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Glassmorphic Telemetry HUD Card */}
      <div className="absolute bottom-8 right-6 lg:bottom-14 lg:right-14 z-20 hidden md:block">
        <div className="luxury-glass rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15 max-w-sm">
          {/* HUD Header */}
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-medium tracking-wider">UE5 STREAM ACTIVE</span>
            </div>
            <span className="text-gray-400 text-[11px]">60 FPS · 4K UHD</span>
          </div>

          {/* Live Project Metrics */}
          <div className="flex items-center gap-5 text-white mb-3">
            <div>
              <div className="text-2xl font-light tracking-tight">{heroData.floatingStats.units}</div>
              <div className="text-gray-500 text-[11px] font-mono uppercase">Live Units</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-2xl font-light tracking-tight">{heroData.floatingStats.towers}</div>
              <div className="text-gray-500 text-[11px] font-mono uppercase">Towers</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-right">
              <div className="text-sm font-medium text-emerald-300">24ms</div>
              <div className="text-gray-500 text-[11px] font-mono uppercase">Mumbai Edge</div>
            </div>
          </div>

          {/* Subtext */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-white/5 font-mono">
            <span className="text-gray-400">Deployment: Ajmera Cityscapes</span>
            <span className="text-emerald-400">Synced</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-gray-500 text-[10px] uppercase font-mono tracking-[0.25em]">Scroll to Explore</span>
        <div className="w-px h-10 bg-gradient-to-b from-emerald-500/60 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
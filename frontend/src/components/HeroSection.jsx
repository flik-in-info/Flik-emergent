import React from 'react';
import { Button } from './ui/button';
import { Play, ArrowRight, Radio, Sparkles } from 'lucide-react';
import { heroData } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';
import Hero3DCanvas from './3d/Hero3DCanvas';
import { soundFX } from '../utils/soundEffects';

const HeroSection = () => {
  const { open: openDemoDialog } = useDemoDialog();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0b]">
      {/* Real-time 3D Architectural WebGL Canvas */}
      <Hero3DCanvas onOpenDemo={openDemoDialog} />

      {/* Subtle left gradient overlay to guarantee text legibility over 3D canvas */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/85 to-transparent pointer-events-none z-[5]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent pointer-events-none z-[5]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium tracking-wider mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{heroData.badge || 'ENTERPRISE PROPTECH PLATFORM'}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight mb-8 drop-shadow-md">
            {heroData.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl font-light drop-shadow">
            {heroData.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Button
              data-testid="hero-primary-cta"
              size="lg"
              onClick={() => {
                soundFX.playClick();
                openDemoDialog('hero');
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-8 py-6 text-base transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/25 group rounded-xl"
            >
              {heroData.primaryCta}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              data-testid="hero-secondary-cta"
              size="lg"
              variant="outline"
              onClick={() => {
                soundFX.playClick();
                const expEl = document.getElementById('experience');
                if (expEl) expEl.scrollIntoView({ behavior: 'smooth' });
                else openDemoDialog('hero_demo');
              }}
              className="border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white/10 font-medium px-8 py-6 text-base transition-all duration-300 group rounded-xl"
            >
              <Play className="mr-2 w-5 h-5 fill-current" />
              {heroData.secondaryCta}
            </Button>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400/90 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D building active: drag to rotate, explode floors below</span>
          </div>
        </div>
      </div>

      {/* Floating Real-time HUD Stats (Bottom Right) */}
      <div className="absolute bottom-8 right-6 lg:bottom-12 lg:right-12 z-10 pointer-events-auto">
        <div className="bg-[#0a0a0b]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-xs font-mono font-medium">{heroData.floatingStats.label}</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-white">
            <div>
              <span className="text-xl sm:text-2xl font-light">{heroData.floatingStats.units}</span>
              <span className="text-gray-500 text-xs ml-1">units</span>
            </div>
            <div className="w-px h-7 bg-white/10" />
            <div>
              <span className="text-xl sm:text-2xl font-light">{heroData.floatingStats.towers}</span>
              <span className="text-gray-500 text-xs ml-1">towers</span>
            </div>
            <div className="w-px h-7 bg-white/10" />
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-gray-400">{heroData.floatingStats.sync}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

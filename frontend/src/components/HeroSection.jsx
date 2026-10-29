import React from 'react';
import { Button } from './ui/button';
import { Play, ArrowRight, Radio } from 'lucide-react';
import { heroData, images } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';

const HeroSection = () => {
  const { open: openDemoDialog } = useDemoDialog();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Flik Explorer — Real-Time 3D Architectural Visualization & Sample Flat Replacement"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/90 to-[#0a0a0b]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight mb-8">
            {heroData.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-gray-400 leading-relaxed mb-12 max-w-2xl">
            {heroData.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button
              data-testid="hero-primary-cta"
              size="lg"
              onClick={() => openDemoDialog('hero')}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-8 py-6 text-base transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 group"
            >
              {heroData.primaryCta}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              data-testid="hero-secondary-cta"
              size="lg"
              variant="outline"
              onClick={() => openDemoDialog('hero_demo')}
              className="border-white/20 text-white hover:bg-white/10 font-medium px-8 py-6 text-base transition-all duration-300 group"
            >
              <Play className="mr-2 w-5 h-5 fill-current" />
              {heroData.secondaryCta}
            </Button>
          </div>
        </div>
      </div>

      {/* Floating UI Element */}
      <div className="absolute bottom-8 right-8 lg:bottom-16 lg:right-16 z-10">
        <div className="bg-[#0a0a0b]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">{heroData.floatingStats.label}</span>
          </div>
          <div className="flex items-center gap-6 text-white">
            <div>
              <span className="text-2xl font-light">{heroData.floatingStats.units}</span>
              <span className="text-gray-500 text-sm ml-1">units</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-2xl font-light">{heroData.floatingStats.towers}</span>
              <span className="text-gray-500 text-sm ml-1">towers</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-400">{heroData.floatingStats.sync}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2">
        <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
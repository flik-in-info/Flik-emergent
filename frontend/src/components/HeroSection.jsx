import React from 'react';
import { Button } from './ui/button';
import { Play, ArrowRight, Radio, Building2, Sparkles, Clock } from 'lucide-react';
import { heroData, images } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const HERO_TELEMETRY_STRIP = [
  {
    icon: Building2,
    label: 'Flagship Live',
    value: 'Ajmera Cityscapes',
    sub: 'Mumbai Residences',
    pulse: true,
  },
  {
    icon: Radio,
    label: 'Live Inventory',
    value: `${heroData.floatingStats.units} Units`,
    sub: `${heroData.floatingStats.towers} Towers Synced`,
    pulse: true,
  },
  {
    icon: Sparkles,
    label: 'Sample Flat',
    value: '₹2–5 Cr Saved',
    sub: 'Per Project Launch',
    pulse: false,
  },
  {
    icon: Clock,
    label: 'Deployment',
    value: '2–4 Weeks',
    sub: 'Zero Download Cloud',
    pulse: false,
  },
];

const HeroSection = () => {
  const { open: openDemoDialog } = useDemoDialog();

  return (
    <section
      id="hero"
      className="relative min-h-[630px] lg:min-h-[730px] flex flex-col justify-between overflow-hidden bg-[#030304]"
    >
      {/* Background Architecture Render + Kinetic Slow Motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={images.hero}
          alt="Flik Explorer — Real-Time 3D Architectural Visualization & Sample Flat Replacement"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center animate-ken-burns opacity-75"
        />
        {/* Sculpted Multi-Stop Cinema Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030304] via-[#030304]/85 to-[#030304]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/30 to-[#030304]/70" />
        {/* Architectural Blueprint Grid Overlay */}
        <div className="absolute inset-0 bg-arch-grid opacity-55 mix-blend-screen" />
        {/* Emerald Atmospheric Spotlight */}
        <div className="absolute -top-32 -left-24 w-[620px] h-[620px] bg-[#22E55A]/[0.08] blur-[150px] rounded-full" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-8">
        <div className="max-w-3xl">
          {/* Corporate + Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#22E55A]/30 text-[#22E55A] text-[9.5px] sm:text-[11px] font-mono font-medium tracking-[0.07em] sm:tracking-[0.14em] mb-5 sm:mb-6 shadow-[0_0_30px_rgba(34,229,90,0.12)]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22E55A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22E55A]" />
            </span>
            <span>PROPTECH PLATFORM · HASTOK ENTERPRISE PVT. LTD.</span>
          </div>

          {/* Monumental Architectural Headline */}
          <h1 className="text-[2.35rem] sm:text-5xl lg:text-[4.25rem] xl:text-[4.75rem] font-light text-white leading-[1.06] tracking-[-0.03em] mb-5 sm:mb-6">
            <span className="block">Real-time architecture.</span>
            <span className="block text-gray-200">Real-time intelligence.</span>
            <span className="block">
              Real-time{' '}
              <span className="font-editorial italic font-normal text-gradient-emerald tracking-normal pr-2">
                sales.
              </span>
            </span>
          </h1>

          {/* Grounded Outcome Subheadline */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-300/90 leading-relaxed mb-7 sm:mb-9 max-w-2xl font-light">
            Flik Explorer replaces ₹2–5 Cr physical sample flats and static brochures with photorealistic
            Unreal Engine 5 digital twins—live at <span className="text-white font-medium">Ajmera Cityscapes</span> and
            streamed straight to any buyer’s browser.
          </p>

          {/* Tactile Luxury Action Group */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
            <Button
              data-testid="hero-primary-cta"
              size="lg"
              onClick={() => {
                telemetry.ctaClick(heroData.primaryCta, 'hero_primary');
                openDemoDialog('hero');
              }}
              className="w-full sm:w-auto bg-[#22E55A] hover:bg-emerald-400 text-black font-semibold px-8 h-12 sm:h-13 rounded-full text-sm sm:text-base transition-all duration-300 shadow-[0_0_35px_rgba(34,229,90,0.32)] hover:shadow-[0_0_45px_rgba(34,229,90,0.55)] active:scale-[0.98] group flex items-center justify-center"
            >
              <span>{heroData.primaryCta}</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              data-testid="hero-secondary-cta"
              size="lg"
              variant="outline"
              onClick={() => {
                telemetry.ctaClick(heroData.secondaryCta, 'hero_secondary');
                openDemoDialog('hero_demo');
              }}
              className="w-full sm:w-auto bg-white/[0.03] backdrop-blur-md border-white/15 text-white hover:bg-white/[0.09] hover:border-white/30 font-medium px-8 h-12 sm:h-13 rounded-full text-sm sm:text-base transition-all duration-300 active:scale-[0.98] group flex items-center justify-center"
            >
              <Play className="mr-2.5 w-4 h-4 fill-[#22E55A] text-[#22E55A]" />
              <span>{heroData.secondaryCta}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Unified Cinema Telemetry Plinth */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl bg-[#070709]/80 backdrop-blur-2xl border border-white/[0.09] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.07)] divide-y lg:divide-y-0 lg:divide-x divide-white/[0.07] overflow-hidden">
          {HERO_TELEMETRY_STRIP.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`px-3 py-3 sm:px-5 sm:py-4 flex items-center gap-2.5 sm:gap-3.5 ${
                  idx === 1 || idx === 3 ? 'border-l border-white/[0.07] lg:border-l-0' : ''
                }`}
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22E55A]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.1em] sm:tracking-[0.16em] text-gray-500 whitespace-nowrap">
                    {stat.pulse && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22E55A] animate-pulse shrink-0" />
                    )}
                    <span>{stat.label}</span>
                  </div>
                  <div className="text-xs sm:text-base font-semibold text-white tracking-tight mt-0.5 leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-gray-400 leading-tight mt-0.5">
                    {stat.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

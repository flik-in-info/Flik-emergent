import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone, ShieldCheck, Server, Globe, Sparkles } from 'lucide-react';
import { closingSection, images } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';
import { UiverseButton, UiverseBadge } from './uiverse/UiverseComponents';

const TRUST_ICONS = [ShieldCheck, Server, Server, Globe];

const ClosingCTA = () => {
  const { open: openDemoDialog } = useDemoDialog();

  return (
    <section id="get-started" className="relative py-36 overflow-hidden bg-[#09090b]">
      {/* Background Image with Cinematic Gradients & Ambient Mesh Glows */}
      <div className="absolute inset-0">
        <img
          src="/assets/nri-penthouse.jpg"
          alt="Flik Explorer Interactive Real Estate Experience Center and Real-Time 3D Digital Twin"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/90 to-[#09090b]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/90 via-transparent to-[#09090b]/90" />
      </div>

      {/* Ambient Radial Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        
        {/* Top Tag */}
        <UiverseBadge
          highlight="ENTERPRISE DEPLOYMENTS"
          text="Custom Spatial Twins Built From CAD/BIM in 14 Days"
          className="mb-8"
        />

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight mb-6">
          <span className="block font-extralight text-gray-300">{closingSection.headline[0]}</span>
          <span className="block font-medium text-gradient-emerald">{closingSection.headline[1]}</span>
          <span className="block font-light text-white">{closingSection.headline[2]}</span>
        </h2>

        {/* Subheadline */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          {closingSection.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <UiverseButton
            variant="primary"
            size="lg"
            onClick={() => openDemoDialog('closing_cta')}
            icon={ArrowRight}
          >
            {closingSection.primaryCta}
          </UiverseButton>

          <UiverseButton
            variant="secondary"
            size="lg"
            onClick={() => openDemoDialog('closing_sales')}
            icon={Phone}
          >
            {closingSection.secondaryCta}
          </UiverseButton>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10 pt-8 border-t border-white/10">
          {closingSection.trustIndicators.map((indicator, index) => {
            const Icon = TRUST_ICONS[index] || ShieldCheck;
            return (
              <div key={indicator} className="flex items-center gap-2 text-gray-400 text-xs font-mono">
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{indicator}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ClosingCTA;
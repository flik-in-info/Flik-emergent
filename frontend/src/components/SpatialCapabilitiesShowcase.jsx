import React from 'react';
import { Building2, Sparkles, ArrowRight, ShieldCheck, Check, Globe2, Compass, Layers, SunMedium, Smartphone, Activity } from 'lucide-react';
import { images } from '../data/mock';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';
import { UiverseButton, Uiverse3DCard, UiverseBadge } from './uiverse/UiverseComponents';

const CAPABILITY_PILLARS = [
  {
    icon: SunMedium,
    title: 'Real-Time Sun Path & Daylight Matrix',
    desc: 'Buyers simulate actual daylight across seasons. Test direct sunlight into master bedrooms and private balconies from 06:00 AM to 06:30 PM.',
  },
  {
    icon: Compass,
    title: 'Drone-Calibrated Balcony Sightlines',
    desc: 'True-to-altitude panoramic photography stitched at each floor level. Buyers see their exact horizon view before tower construction begins.',
  },
  {
    icon: Smartphone,
    title: '1-Click WhatsApp Cloud Streaming',
    desc: 'Zero app downloads, zero plugins. High-net-worth NRI prospects in Dubai, London, and Singapore launch the 3D twin instantly on Safari or Chrome.',
  },
  {
    icon: Activity,
    title: 'Buyer Engagement Telemetry & CRM Sync',
    desc: 'Real-time heatmaps track which layouts, views, and materials prospective buyers spend the most time exploring, syncing directly into developer CRMs.',
  },
];

const SpatialCapabilitiesShowcase = () => {
  const { open: openDemoDialog } = useDemoDialog();

  return (
    <section id="capabilities" className="relative py-32 bg-[#060608] overflow-hidden border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <UiverseBadge
            highlight="ENTERPRISE SUITE"
            text="Interactive Architectural Spatial Technology"
            className="mb-4"
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">Beyond static renderings.</span>
            <span className="block font-medium text-gradient-emerald">
              The Spatial Digital Twin Master Suite.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            Designed specifically for Tier-1 residential developers marketing landmark towers. Flik Explorer transforms complex 2D blueprints into an interactive sales environment that accelerates closures on both showroom touch walls and overseas buyer devices.
          </p>
        </div>

        {/* Showcase Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center rounded-3xl overflow-hidden border border-white/10 bg-[#09090c] p-8 lg:p-12 shadow-2xl mb-12">
          
          {/* Left Details Column (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block">
                DEVELOPER PERFORMANCE BENCHMARKS
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-white">
                Tier-1 Residential High-Rise Acceleration
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Rather than forcing every prospect into a single ground-level sample flat, sales teams equipped with Flik Explorer let buyers walk their specific 32nd-floor 3BHK layout, inspect the panoramic ocean sunset, and configure bespoke finishes live.
              </p>
            </div>

            {/* Metrics highlight */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-light text-white font-mono">100%</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">Sample Flat Replaced</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-light text-white font-mono">4.2x</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">Buyer Engagement</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-light text-white font-mono">78%</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">Remote NRI Velocity</div>
              </div>
            </div>

            {/* Checkpoints */}
            <div className="space-y-2.5 text-xs text-gray-300 font-light">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero construction delays—launch sales 3 to 6 months earlier</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Showcase every unit typology, duplex, and penthouse penthouse</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct WhatsApp cloud links for Gulf, US, and UK NRI campaigns</span>
              </div>
            </div>

            <div className="pt-2">
              <UiverseButton
                variant="primary"
                size="md"
                onClick={() => openDemoDialog('capabilities_suite')}
                icon={ArrowRight}
              >
                Request Enterprise Specification
              </UiverseButton>
            </div>
          </div>

          {/* Right Visual Column (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-black group">
              <img
                src="/assets/flik-experience-center.png"
                alt="Flik Explorer Interactive Real Estate Experience Center and Real-Time 3D Digital Twin"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Overlay telemetry card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl luxury-glass border border-white/15 text-xs font-mono text-gray-300">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SPATIAL SALES PAVILION · MULTI-TOUCH 4K</span>
                  </div>
                  <span className="text-gray-400">STATUS: ACTIVE</span>
                </div>
                <div className="text-[11px] text-gray-400 font-light">
                  Interactive multi-touch sales center deployment with live CRM inventory sync
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars Grid with Uiverse 3D Spotlight Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Uiverse3DCard
                key={pillar.title}
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-medium text-white mb-2">{pillar.title}</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{pillar.desc}</p>
                </div>
              </Uiverse3DCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SpatialCapabilitiesShowcase;

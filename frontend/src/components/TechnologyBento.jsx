import React from 'react';
import { Cpu, Cloud, Activity, Sparkles, Shield, Laptop, Smartphone, Tablet, Layers, ArrowRight } from 'lucide-react';
import { images } from '../data/mock';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';
import { UiverseButton, Uiverse3DCard, UiverseBadge } from './uiverse/UiverseComponents';

const TechnologyBento = () => {
  const { open: openDemoDialog } = useDemoDialog();

  return (
    <section id="technology" className="relative py-32 bg-[#08080a] overflow-hidden border-t border-white/[0.06]">
      {/* Background Ambient Mesh */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <UiverseBadge
            highlight="SYSTEM ARCHITECTURE"
            text="Unreal Engine 5.4 Lumen & Distributed Edge Streaming"
            className="mb-4"
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">Engineered for luxury real estate.</span>
            <span className="block font-medium text-gradient-emerald">
              Built on serious spatial technology.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            Flik Explorer is not a generic rendering agency or a video file. It is a live real-time cloud platform where architecture, buyer behavioral telemetry, and CRM pipelines converge.
          </p>
        </div>

        {/* Spatial Bento Grid with Uiverse 3D Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          
          {/* Card 1: Unreal Engine 5.4 Nanite & Lumen (8 cols) */}
          <Uiverse3DCard
            spotlightColor="rgba(34, 229, 90, 0.16)"
            className="md:col-span-8 p-8 sm:p-10 flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 text-xs font-mono text-emerald-400/80">
              SYS // CORE RENDERING
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>

              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-2">
                PHOTOREALISTIC SPATIAL PIPELINE
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-white mb-4">
                Unreal Engine 5.4 Lumen & Nanite
              </h3>

              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-2xl mb-6">
                Unlike traditional pre-baked 360° panoramas or flat brochures, every architectural ray of light, marble reflection, and shadow gradient is calculated live. Dynamic sun paths let buyers observe seasonal daylight transitions directly from their specific balcony.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Nanite Virtualized Geometry
              </span>
              <span>Lumen Dynamic Global Illumination</span>
              <span className="text-emerald-400">60 FPS Interactive</span>
            </div>
          </Uiverse3DCard>

          {/* Card 2: Zero App Downloads (4 cols) */}
          <Uiverse3DCard
            spotlightColor="rgba(56, 189, 248, 0.16)"
            className="md:col-span-4 p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                <Cloud className="w-6 h-6" />
              </div>

              <div className="text-[10px] font-mono text-sky-400 uppercase tracking-widest mb-2">
                GLOBAL CLOUD STREAMING
              </div>

              <h3 className="text-xl sm:text-2xl font-light text-white mb-3">
                Zero App Downloads
              </h3>

              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-6">
                Overseas NRI buyers in Dubai, London, or Singapore simply tap a link sent over WhatsApp. Instant 3D cloud streaming on iPhones, iPads, and Android devices without installing software.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-500">
              <span className="text-sky-300">1-CLICK WHATSAPP SHARE</span>
              <span>LOW-LATENCY EDGE</span>
            </div>
          </Uiverse3DCard>

          {/* Card 3: Buyer Behavioral Telemetry (5 cols) */}
          <Uiverse3DCard
            spotlightColor="rgba(168, 85, 247, 0.16)"
            className="md:col-span-5 p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>

              <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-2">
                SALES PIPELINE INTELLIGENCE
              </div>

              <h3 className="text-xl sm:text-2xl font-light text-white mb-3">
                Buyer Intent Telemetry
              </h3>

              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-6">
                Know what your buyers want before they call. Flik tracks spatial dwell time, which balcony sightlines receive the most attention, and scores high-intent NRI leads automatically for your sales team.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-500">
              <span>HEATMAP ANALYTICS</span>
              <span className="text-purple-400 font-mono">89% INTENT PREDICTION</span>
            </div>
          </Uiverse3DCard>

          {/* Card 4: Enterprise CRM & Security (7 cols) */}
          <Uiverse3DCard
            spotlightColor="rgba(34, 229, 90, 0.16)"
            className="md:col-span-7 p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>

              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-2">
                CRM INTEGRATIONS & SECURITY
              </div>

              <h3 className="text-xl sm:text-2xl font-light text-white mb-3">
                Live Inventory & CRM Synchronization
              </h3>

              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-6">
                Direct integration with Salesforce, LeadSquared, Sell.Do, and Farvision. Live inventory blocking, reserved unit status, and automated lead capture synchronize across sales centers and digital microsites in real time.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400">
              <span>SALESFORCE · LEADSQUARED · SELL.DO</span>
              <span className="text-emerald-400 font-medium">99.9% UPTIME SLA</span>
            </div>
          </Uiverse3DCard>

        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-500/[0.08] via-white/[0.02] to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-1">
              Have 2D CAD or BIM blueprints ready?
            </h4>
            <p className="text-xs text-gray-400 font-light">
              We deploy your project&apos;s interactive 3D digital twin in 2 to 4 weeks.
            </p>
          </div>
          <UiverseButton
            variant="primary"
            size="md"
            onClick={() => openDemoDialog('tech_bento')}
            icon={ArrowRight}
          >
            Request Enterprise Blueprint
          </UiverseButton>
        </div>

      </div>
    </section>
  );
};

export default TechnologyBento;

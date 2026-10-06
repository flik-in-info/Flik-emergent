import React from 'react';
import { Check, X, ShieldAlert, Sparkles, ArrowRight, IndianRupee, Clock, Eye, Globe } from 'lucide-react';
import { differenceSection } from '../data/mock';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';
import { UiverseButton, Uiverse3DCard, UiverseBadge } from './uiverse/UiverseComponents';

const TRADITIONAL_POINTS = [
  {
    title: 'Capital Expenditure',
    value: '₹2.0 to ₹5.0 Crore',
    desc: 'Heavy physical construction, luxury interior fit-outs, and maintenance costs.',
  },
  {
    title: 'Time to Market',
    value: '3 to 6 Months Delay',
    desc: 'Sales team cannot show anything until physical podium superstructure is ready.',
  },
  {
    title: 'Buyer Perspective',
    value: 'Single 1-Unit Layout',
    desc: 'Forces all buyers to imagine other floor plans, views, and higher elevations.',
  },
  {
    title: 'Overseas & NRI Reach',
    value: 'Zero Remote Access',
    desc: 'Buyers in Dubai, London, or Singapore must book international flights to visit.',
  },
  {
    title: 'Residual Value',
    value: '₹0 Demolished Asset',
    desc: 'Completely destroyed once the tower sells out, leaving zero lasting platform.',
  },
];

const FLIK_POINTS = [
  {
    title: 'Capital Expenditure',
    value: 'Fraction of Physical Cost',
    desc: 'Saves ₹2+ Crore in upfront sunk developer capital per project.',
  },
  {
    title: 'Time to Market',
    value: '2 to 4 Weeks Turnaround',
    desc: 'Begin closing pre-sales months before physical construction reaches ground level.',
  },
  {
    title: 'Buyer Perspective',
    value: 'Every Floor, Unit & Finish',
    desc: 'Interactive 3D walkthrough for 2BHK, 3BHK, penthouses, and custom finishes.',
  },
  {
    title: 'Overseas & NRI Reach',
    value: 'Instant WhatsApp & Browser Link',
    desc: 'Zero-install cloud streaming directly on smartphones, iPads, and laptops globally.',
  },
  {
    title: 'Residual Value',
    value: 'Permanent Digital Twin',
    desc: 'Ongoing sales asset, easily updated as construction progresses and towers launch.',
  },
];

const DifferenceSection = () => {
  const { open: openDemoDialog } = useDemoDialog();

  return (
    <section id="economics" className="relative py-32 bg-[#09090b] overflow-hidden border-t border-white/[0.06]">
      {/* Background Architectural Grid and Ambient Glows */}
      <div className="absolute inset-0 bg-arch-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <UiverseBadge
            highlight="COMMERCIAL ROI"
            text="Developer Economics & Sunk Capital Recovery"
            className="mb-4"
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">The sample flat is dead.</span>
            <span className="block font-medium text-gradient-emerald">
              Here is what replaces it.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            Real estate developers spend crores constructing temporary sample flats that only show one layout and get demolished once sold out. Flik Explorer replaces that with an ongoing, interactive digital twin platform.
          </p>
        </div>

        {/* Side-by-Side Architectural Showdown Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Left Card: Traditional Sample Flat (The Obsolete Model) */}
          <Uiverse3DCard
            spotlightColor="rgba(239, 68, 68, 0.12)"
            className="p-8 border-red-500/25 bg-red-950/[0.04]"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-red-400/80">
                  OBSOLETE METHOD
                </span>
                <h3 className="text-2xl font-light text-white mt-1">Physical Sample Flat</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-300 text-xs font-mono border border-red-500/20">
                ₹2–5 Cr Sunk Cost
              </span>
            </div>

            {/* List */}
            <div className="space-y-6">
              {TRADITIONAL_POINTS.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/90">
                      {item.title}: <span className="text-red-400/90 font-normal">{item.value}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Uiverse3DCard>

          {/* Right Card: Flik Explorer (The Modern Standard) */}
          <Uiverse3DCard
            spotlightColor="rgba(34, 229, 90, 0.22)"
            className="p-8 border-emerald-500/40 bg-emerald-950/[0.08] shadow-[0_0_50px_rgba(34,229,90,0.12)]"
          >
            {/* Glowing Accent Crosshairs */}
            <div className="absolute top-3 right-3 text-xs font-mono text-emerald-500/60">+</div>

            {/* Header Badge */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                  THE NEW BENCHMARK
                </span>
                <h3 className="text-2xl font-medium text-white mt-1">Flik Explorer Platform</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                90% Cost Cut
              </span>
            </div>

            {/* List */}
            <div className="space-y-6">
              {FLIK_POINTS.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {item.title}: <span className="text-emerald-400 font-medium">{item.value}</span>
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Uiverse3DCard>

        </div>

        {/* Bottom Developer ROI Callout Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-500/[0.08] via-white/[0.02] to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              ENTERPRISE BUSINESS OUTCOME
            </div>
            <h4 className="text-lg sm:text-xl font-medium text-white">
              Save up to ₹2.5+ Crore in sunk construction costs on your next project.
            </h4>
            <p className="text-xs text-gray-400 font-light">
              Provide buyers and NRI investors with a photorealistic, floor-accurate walkthrough from day one.
            </p>
          </div>

          <UiverseButton
            variant="primary"
            size="md"
            onClick={() => openDemoDialog('difference_roi')}
            icon={ArrowRight}
          >
            Calculate Project ROI
          </UiverseButton>
        </div>

      </div>
    </section>
  );
};

export default DifferenceSection;
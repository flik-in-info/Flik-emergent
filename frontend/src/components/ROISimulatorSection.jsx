import React, { useState } from 'react';
import { IndianRupee, Clock, CheckCircle2, XCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';

const ROISimulatorSection = () => {
  const { open: openDemoDialog } = useDemoDialog();
  const [unitCount, setUnitCount] = useState(250);
  const [avgTicket, setAvgTicket] = useState(2.5); // In Crores

  // Mathematical estimations based on Indian real estate developer benchmarks
  const physicalSampleFlatCost = Math.min(Math.max(avgTicket * 1.2, 2.0), 5.0); // ₹2 to ₹5 Cr
  const flikPlatformCost = Math.max(0.18 + (unitCount / 1000) * 0.15, 0.22); // Fractional cost ~₹22-35 Lakhs
  const capitalSavedCrores = (physicalSampleFlatCost - flikPlatformCost).toFixed(2);
  const daysSaved = 105; // 3.5 months saved
  const presaleVelocityGain = Math.round(unitCount * 0.28); // Estimated accelerated bookings

  return (
    <section id="economics" className="relative py-32 bg-[#08080a] overflow-hidden border-t border-white/[0.06]">
      {/* Background Subtle Blueprint Grid and Ambient Mesh Glow */}
      <div className="absolute inset-0 bg-arch-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE DEVELOPER CAPITAL CALCULATOR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">Compare the Economics.</span>
            <span className="block font-medium text-gradient-emerald">
              Physical Sample Flat vs. Flik 3D Twin.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            Adjust the sliders below to calculate the exact sunk construction capital and pre-sales time saved on your upcoming residential development.
          </p>
        </div>

        {/* Interactive Simulator Cockpit */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl flex flex-col justify-between shadow-2xl">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span>PROJECT PARAMETERS</span>
              </div>

              {/* Slider 1: Total Project Units */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-light text-gray-300">Total Project Inventory</label>
                  <span className="text-base font-mono font-medium text-white px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                    {unitCount} Units
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="25"
                  value={unitCount}
                  onChange={(e) => setUnitCount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] font-mono text-gray-500 mt-2">
                  <span>Boutique (50)</span>
                  <span>Mid-Scale (400)</span>
                  <span>Flagship (800)</span>
                </div>
              </div>

              {/* Slider 2: Average Ticket Size (₹ Cr) */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-light text-gray-300">Average Unit Ticket Size</label>
                  <span className="text-base font-mono font-medium text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    ₹{avgTicket.toFixed(1)} Crore
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] font-mono text-gray-500 mt-2">
                  <span>Premium (₹1 Cr)</span>
                  <span>Luxury (₹5 Cr)</span>
                  <span>Ultra-Luxury (₹10 Cr+)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 text-xs text-gray-400 leading-relaxed font-light">
              <span className="text-emerald-400 font-medium">Developer Benchmark:</span> Tier-1 residential developers across Mumbai & Bengaluru verify 100% physical sample flat replacement with remote NRI sales closing capabilities.
            </div>
          </div>

          {/* Results Comparison Column (7 cols) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            
            {/* Physical Sample Flat Liability Card */}
            <div className="p-7 rounded-3xl bg-red-950/[0.04] border border-red-500/20 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-red-400 mb-3">
                  <span>OBSOLETE APPROACH</span>
                  <XCircle className="w-4 h-4 text-red-400" />
                </div>
                <h3 className="text-xl font-light text-white mb-2">Physical Sample Flat</h3>
                <div className="text-3xl font-light text-red-400 font-mono mb-4">
                  ₹{physicalSampleFlatCost.toFixed(2)} Cr
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-6 font-light">
                  Sunk construction costs, fit-outs, and ongoing maintenance with zero residual asset value once sold out.
                </p>

                <div className="space-y-3 text-xs text-gray-400 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                    <span>3 to 6 months construction delay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                    <span>Shows only 1 fixed ground layout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                    <span>Zero access for overseas NRI buyers</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-red-500/20 text-[11px] font-mono text-red-400/80">
                100% Sunk Expense · ₹0 Recovery
              </div>
            </div>

            {/* Flik Explorer Asset Card */}
            <div className="p-7 rounded-3xl bg-emerald-950/[0.08] border border-emerald-500/40 backdrop-blur-xl shadow-[0_0_50px_rgba(34,229,90,0.12)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-3">
                  <span>THE FLIK PLATFORM</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Flik 3D Digital Twin</h3>
                <div className="text-3xl font-medium text-emerald-400 font-mono mb-4">
                  ₹{capitalSavedCrores} Cr Saved
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-6 font-light">
                  Direct capital preserved, deployed in 2–4 weeks from 2D/BIM drawings, and accessible to any buyer globally.
                </p>

                <div className="space-y-3 text-xs text-gray-300 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>2–4 weeks turnaround to launch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Every floor, unit & balcony sightline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>1-click WhatsApp link for global NRIs</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-500/30">
                <Button
                  onClick={() => openDemoDialog('roi_calculator')}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs py-2.5 rounded-xl shadow-[0_0_20px_rgba(34,229,90,0.3)]"
                >
                  Lock In Developer ROI
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ROISimulatorSection;

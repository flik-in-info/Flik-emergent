import React, { useState } from 'react';
import { Check, X, ArrowRight, Calculator, Sparkles } from 'lucide-react';
import { differenceSection } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';
import { Button } from './ui/button';
import Card3DTilt from './3d/Card3DTilt';
import { soundFX } from '../utils/soundEffects';

const DifferenceSection = () => {
  const { open: openDemoDialog } = useDemoDialog();
  const [units, setUnits] = useState(250);
  const [ticketIndex, setTicketIndex] = useState(1);

  const TICKET_SIZES = [
    { label: '₹1.5 Cr', baseCost: 2.2, flikCost: 0.22, value: 1.5 },
    { label: '₹2.5 Cr', baseCost: 3.0, flikCost: 0.28, value: 2.5 },
    { label: '₹5.0 Cr', baseCost: 4.2, flikCost: 0.38, value: 5.0 },
    { label: '₹10+ Cr', baseCost: 5.5, flikCost: 0.48, value: 10.0 },
  ];

  const selectedTier = TICKET_SIZES[ticketIndex];
  const sunkPhysicalCost = selectedTier.baseCost;
  const flikPlatformCost = selectedTier.flikCost;
  const netCapitalSaved = (sunkPhysicalCost - flikPlatformCost).toFixed(2);
  const percentSaved = Math.round(((sunkPhysicalCost - flikPlatformCost) / sunkPhysicalCost) * 100);

  return (
    <section id="difference" className="relative py-32 bg-[#0a0a0b] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-widest mb-6 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Economics · Sunk Capital Recovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            The sample flat is dead. <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Here is what replaces it.
            </span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed font-light">
            Real estate developers spend crores constructing temporary physical sample flats that show only one fixed layout and get demolished once sold out. Flik Explorer replaces that with an ongoing, interactive digital twin platform.
          </p>
        </div>

        {/* Side-by-Side Model Cards with 3D Tilt */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Obsolete Physical Model */}
          <Card3DTilt
            maxTilt={6}
            className="rounded-3xl p-8 lg:p-10 bg-red-500/[0.02] border border-red-500/20 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-wider text-red-400 font-mono font-medium">Obsolete Method</span>
                <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-mono">₹2–5 Cr Sunk Capex</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Physical Sample Flat</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                Constructed on podiums or ground-level lots, physical sample flats tie up millions in capital, show only one layout, and cannot be seen by remote buyers.
              </p>

              <ul className="space-y-3.5 mb-8 text-sm text-gray-400 font-light">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400/80 shrink-0 mt-0.5" />
                  <span><strong>Capital Expenditure:</strong> ₹2.0 to ₹5.0 Crore in upfront construction, luxury interior fit-outs, and maintenance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400/80 shrink-0 mt-0.5" />
                  <span><strong>Time to Market:</strong> 3 to 6 months construction delay before sales teams can show anything.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400/80 shrink-0 mt-0.5" />
                  <span><strong>Buyer Perspective:</strong> Single 1-unit layout. Forces buyers to imagine other floors, views, and configurations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400/80 shrink-0 mt-0.5" />
                  <span><strong>Overseas & NRI Reach:</strong> Zero remote access. Overseas buyers must take international flights to visit.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400/80 shrink-0 mt-0.5" />
                  <span><strong>Residual Value:</strong> ₹0 demolished asset. Completely destroyed once the tower sells out.</span>
                </li>
              </ul>
            </div>
          </Card3DTilt>

          {/* The Flik Explorer Benchmark */}
          <Card3DTilt
            maxTilt={6}
            className="rounded-3xl p-8 lg:p-10 bg-emerald-500/[0.03] border border-emerald-500/40 flex flex-col justify-between shadow-2xl shadow-emerald-500/10"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-medium">The New Benchmark</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-mono font-medium">{percentSaved}% Cost Cut</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Flik Explorer Platform</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                Photorealistic, browser-native 3D digital twins streamed on any device. Walk every floor, customize finishes, and close overseas NRI buyers instantly.
              </p>

              <ul className="space-y-3.5 mb-8 text-sm text-gray-300 font-light">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Capital Expenditure:</strong> Fraction of physical cost. Preserves ₹2+ Crore in developer capital upfront.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Time to Market:</strong> 2 to 3 weeks turnaround. Begin closing pre-sales months before groundbreak.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Buyer Perspective:</strong> Every floor, unit, view & finish. Explore 2BHK, 3BHK, penthouses, and sunrise sightlines.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Overseas & NRI Reach:</strong> Instant WhatsApp & browser cloud link. Streamed in 4K with zero plugins or apps.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Residual Value:</strong> Permanent digital twin. Reused for pre-sales, tower launches, and buyer handover.</span>
                </li>
              </ul>
            </div>
          </Card3DTilt>
        </div>

        {/* Interactive Developer Sunk Capital & Velocity Simulator */}
        <div className="rounded-3xl p-8 lg:p-12 bg-white/[0.02] border border-white/10 backdrop-blur-xl mb-20 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-medium uppercase tracking-widest mb-2">
                <Calculator className="w-4 h-4" />
                <span>Financial Simulator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-white">Compare Developer Sunk Capital & Velocity</h3>
              <p className="text-sm text-gray-400 mt-1 font-light">Adjust project units and ticket size to calculate exact capital preserved on your upcoming development.</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-sm">
              Live ROI Model: 2026 Developer Benchmark
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2 font-mono">
                  <span className="text-gray-400">Total Project Inventory</span>
                  <span className="text-emerald-400 font-semibold">{units} Units</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="25"
                  value={units}
                  onChange={(e) => {
                    soundFX.playClick();
                    setUnits(Number(e.target.value));
                  }}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-gray-500 mt-1 font-mono">
                  <span>50 (Boutique)</span>
                  <span>250 (Mid-Rise)</span>
                  <span>600+ (Flagship)</span>
                </div>
              </div>

              <div>
                <span className="block text-sm text-gray-400 mb-2 font-mono">Average Unit Ticket Size</span>
                <div className="grid grid-cols-4 gap-2">
                  {TICKET_SIZES.map((tier, idx) => (
                    <button
                      key={tier.label}
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setTicketIndex(idx);
                      }}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium font-mono transition-all duration-300 border ${
                        ticketIndex === idx
                          ? 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-lg shadow-emerald-500/20'
                          : 'bg-white/[0.03] text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculations Output */}
            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/10">
                <span className="text-xs text-gray-400 font-mono uppercase tracking-wider block mb-2">Physical Sample Flat</span>
                <p className="text-3xl font-light text-red-400 font-mono">₹{sunkPhysicalCost.toFixed(2)} Cr</p>
                <p className="text-xs text-gray-500 mt-2 font-light">100% Sunk cost: 3–6 mo delay with zero residual value.</p>
              </div>

              <div className="rounded-2xl p-6 bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs text-emerald-400 font-mono uppercase tracking-wider block mb-2">Flik Digital Twin</span>
                <p className="text-3xl font-light text-emerald-300 font-mono">₹{flikPlatformCost.toFixed(2)} Cr</p>
                <p className="text-xs text-emerald-400/80 mt-2 font-light">All units, all views, deployed in 14 days.</p>
              </div>

              <div className="sm:col-span-2 rounded-2xl p-6 bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-emerald-400 font-mono uppercase tracking-wider block">Estimated Net Sunk Capital Saved</span>
                  <p className="text-3xl sm:text-4xl font-normal text-white font-mono mt-1">₹{netCapitalSaved} Crore</p>
                </div>
                <Button
                  onClick={() => {
                    soundFX.playClick();
                    openDemoDialog('difference_roi');
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 shrink-0 rounded-xl"
                >
                  <span>Lock in Developer ROI</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.01]">
          {/* Header */}
          <div className="grid grid-cols-2 bg-white/[0.04]">
            <div className="p-6 text-center border-r border-white/10">
              <span className="text-gray-400 font-medium">Physical Sample Flat / 2D Brochure</span>
            </div>
            <div className="p-6 text-center bg-emerald-500/10">
              <span className="text-emerald-400 font-medium">Flik Explorer Sales Operating System</span>
            </div>
          </div>

          {/* Rows */}
          {differenceSection.comparison.map((row, index) => (
            <div
              key={row.flik}
              className={`grid grid-cols-2 ${
                index !== differenceSection.comparison.length - 1 ? 'border-b border-white/10' : ''
              }`}
            >
              <div className="p-6 flex items-center justify-center gap-3 border-r border-white/10 bg-white/[0.01]">
                <X className="w-5 h-5 text-red-400/80 shrink-0" />
                <span className="text-gray-400 text-sm text-center font-light">{row.traditional}</span>
              </div>
              <div className="p-6 flex items-center justify-center gap-3 bg-emerald-500/[0.02]">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-white text-sm font-medium text-center">{row.flik}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;

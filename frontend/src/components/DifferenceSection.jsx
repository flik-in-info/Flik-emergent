import React, { useState, useMemo } from 'react';
import {
  Check,
  X,
  Calculator,
  ArrowRight,
  Zap,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { metricsSection } from '../data/mock';
import { Button } from './ui/button';
import SpotlightCard from './ui/SpotlightCard';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const TICKET_SIZES = [
  { id: 'mid', label: '₹1 Cr', valueCr: 1.0 },
  { id: 'luxury', label: '₹2.5 Cr', valueCr: 2.5 },
  { id: 'ultra', label: '₹5 Cr', valueCr: 5.0 },
  { id: 'trophy', label: '₹10 Cr+', valueCr: 10.0 },
];

const COMPARISON_ROWS = [
  {
    dimension: 'Pre-Launch Sales',
    traditional: 'Stalled waiting 3–6 months for sample flat completion',
    flik: 'Day-one interactive 3D tower & view exploration',
  },
  {
    dimension: 'NRI & Outstation Buyers',
    traditional: 'Low-trust PDFs & compressed WhatsApp videos',
    flik: 'Live interactive browser walkthrough on any screen',
  },
  {
    dimension: 'Inventory Status',
    traditional: 'Spreadsheet confusion and double-pitched units',
    flik: 'Real-time live tower availability synced to CRM',
  },
  {
    dimension: 'Buyer Follow-Up',
    traditional: 'Guesswork based on gallery visit notes',
    flik: 'Automatic attention heatmaps & intent lead scoring',
  },
];

const DifferenceSection = () => {
  const { open: openDemoDialog } = useDemoDialog();
  const [units, setUnits] = useState(250);
  const [ticketId, setTicketId] = useState('luxury');
  const [focusView, setFocusView] = useState('side-by-side');

  const selectedTicket = useMemo(
    () => TICKET_SIZES.find((t) => t.id === ticketId) || TICKET_SIZES[1],
    [ticketId]
  );

  const metrics = useMemo(() => {
    const totalGdvCr = units * selectedTicket.valueCr;
    const velocityMonthsSaved = Math.max(4, Math.min(11, Math.round(4 + units / 160)));
    const carryingCostSavedCr = Number(
      ((totalGdvCr * 0.085 * velocityMonthsSaved) / 12).toFixed(1)
    );
    const additionalConversions = Math.max(8, Math.round(units * 0.14));

    return {
      totalGdvCr,
      velocityMonthsSaved,
      carryingCostSavedCr,
      additionalConversions,
    };
  }, [units, selectedTicket]);

  const sliderProgress = ((units - 50) / (1000 - 50)) * 100;

  const handleRoiInteraction = (nextUnits, nextTicket) => {
    const totalGdv = nextUnits * nextTicket.valueCr;
    const mSaved = Math.max(4, Math.min(11, Math.round(4 + nextUnits / 160)));
    const crSaved = Number(((totalGdv * 0.085 * mSaved) / 12).toFixed(1));
    telemetry.roiSimulated(nextUnits, nextTicket.label, `${crSaved} Cr`);
  };

  return (
    <section
      id="difference"
      className="scroll-mt-24 relative py-9 lg:py-11 bg-[#060608] border-t border-white/[0.06] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22E55A]/40 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Monolith KPI Bar */}
        <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {(metricsSection.metrics || []).map((metric) => (
            <SpotlightCard
              key={metric.label}
              className="rounded-2xl bg-[#09090d] border border-white/[0.08] glass-bezel p-4 sm:p-5 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-gradient-emerald tracking-tight mb-1">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-white">{metric.label}</div>
              <div className="text-[11px] text-gray-500 mt-1 leading-snug line-clamp-2">
                {metric.description}
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Section Heading + Contrast Switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[#22E55A] text-[11px] font-mono font-medium uppercase tracking-[0.22em] block mb-2">
              04 · Proven Commercial Velocity
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.65rem] font-light text-white leading-[1.18] tracking-[-0.025em]">
              <span className="block">Static brochures cost velocity.</span>
              <span className="block mt-1">
                Quantify the{' '}
                <span className="font-editorial italic font-normal text-gradient-emerald tracking-normal pr-2">
                  Flik uplift.
                </span>
              </span>
            </h2>
          </div>

          <div className="inline-flex p-1.5 rounded-2xl bg-[#0b0b0f] border border-white/[0.09] self-start lg:self-auto gap-1">
            <button
              type="button"
              onClick={() => setFocusView('side-by-side')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                focusView === 'side-by-side'
                  ? 'bg-white text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Before vs After
            </button>
            <button
              type="button"
              onClick={() => setFocusView('flik-only')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                focusView === 'flik-only'
                  ? 'bg-[#22E55A] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Flik Advantage Only
            </button>
          </div>
        </div>

        {/* Asymmetric 2-Column Value & ROI Workbench */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left: Contrast Matrix */}
          <SpotlightCard className="lg:col-span-6 p-5 sm:p-6 rounded-3xl bg-[#09090d] border border-white/[0.09] glass-bezel flex flex-col justify-between">
            <div className="h-full flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-gray-400">
                  <Sparkles className="w-3.5 h-3.5 text-[#22E55A]" />
                  <span>Sample Flat vs Digital Twin</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#22E55A]/10 border border-[#22E55A]/25 text-[#22E55A]">
                  4 Core Shifts
                </span>
              </div>

              <div className="space-y-2.5 my-auto">
                {COMPARISON_ROWS.map((row) => (
                  <div
                    key={row.dimension}
                    className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/15 transition-colors"
                  >
                    <div className="text-xs font-semibold text-white mb-1.5">{row.dimension}</div>
                    <div
                      className={`grid gap-2.5 ${
                        focusView === 'side-by-side' ? 'sm:grid-cols-2' : 'grid-cols-1'
                      }`}
                    >
                      {focusView === 'side-by-side' && (
                        <div className="flex items-start gap-2 text-xs text-gray-500">
                          <X className="w-3.5 h-3.5 text-rose-400/80 shrink-0 mt-0.5" />
                          <span>{row.traditional}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2 text-xs text-emerald-300 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#22E55A] shrink-0 mt-0.5" />
                        <span>{row.flik}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Right: Institutional ROI Simulator */}
          <SpotlightCard
            spotlightColor="rgba(34, 229, 90, 0.16)"
            borderGlowColor="rgba(34, 229, 90, 0.45)"
            className="lg:col-span-6 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0b100d] via-[#090b0d] to-[#070709] border border-[#22E55A]/25 glass-bezel flex flex-col justify-between"
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22E55A]/15 border border-[#22E55A]/30 text-[#22E55A] text-[10px] font-mono uppercase tracking-widest">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Live ROI Terminal</span>
                  </div>
                  <span className="text-xs font-mono text-gray-300">
                    Project GDV:{' '}
                    <strong className="text-white">
                      ₹{metrics.totalGdvCr.toLocaleString('en-IN')} Cr
                    </strong>
                  </span>
                </div>

                {/* Project Units Slider */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <label htmlFor="roi-units-slider" className="text-xs font-medium text-gray-300">
                      Project Inventory Scale
                    </label>
                    <span className="text-sm font-mono font-semibold text-[#22E55A]">
                      {units} Units
                    </span>
                  </div>
                  <input
                    id="roi-units-slider"
                    type="range"
                    min={50}
                    max={1000}
                    step={25}
                    value={units}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setUnits(val);
                      handleRoiInteraction(val, selectedTicket);
                    }}
                    style={{
                      background: `linear-gradient(to right, #22E55A 0%, #22E55A ${sliderProgress}%, rgba(255,255,255,0.12) ${sliderProgress}%, rgba(255,255,255,0.12) 100%)`,
                    }}
                    className="w-full flik-slider cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1.5">
                    <span>50 Units</span>
                    <span>500 Units</span>
                    <span>1,000 Units</span>
                  </div>
                </div>

                {/* Ticket Size Selector */}
                <div className="mb-6">
                  <div className="text-xs font-medium text-gray-300 mb-2">
                    Average Ticket Size (₹)
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {TICKET_SIZES.map((tier) => {
                      const active = tier.id === ticketId;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => {
                            setTicketId(tier.id);
                            handleRoiInteraction(units, tier);
                          }}
                          className={`py-2.5 px-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                            active
                              ? 'bg-[#22E55A] text-black font-bold border-[#22E55A] shadow-[0_0_20px_rgba(34,229,90,0.3)]'
                              : 'bg-white/[0.03] border-white/10 text-gray-300 hover:border-white/25'
                          }`}
                        >
                          {tier.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Projected Outcomes Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3.5 rounded-2xl bg-black/55 border border-[#22E55A]/25">
                    <div className="text-[10px] font-mono text-gray-400 uppercase mb-1">
                      Carry Cost Saved
                    </div>
                    <div className="text-lg sm:text-2xl font-semibold text-[#22E55A] font-mono">
                      ₹{metrics.carryingCostSavedCr} Cr
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/55 border border-white/10">
                    <div className="text-[10px] font-mono text-gray-400 uppercase mb-1">
                      Cycle Saved
                    </div>
                    <div className="text-lg sm:text-2xl font-semibold text-white font-mono flex items-center gap-1">
                      {metrics.velocityMonthsSaved}{' '}
                      <span className="text-xs text-gray-400 font-normal">mos</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-black/55 border border-white/10">
                    <div className="text-[10px] font-mono text-gray-400 uppercase mb-1">
                      Extra Bookings
                    </div>
                    <div className="text-lg sm:text-2xl font-semibold text-white font-mono flex items-center gap-1">
                      +{metrics.additionalConversions}
                      <TrendingUp className="w-3.5 h-3.5 text-[#22E55A]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Zap className="w-3.5 h-3.5 text-[#22E55A] shrink-0" />
                  <span>Based on historical absorption gains</span>
                </div>
                <Button
                  onClick={() => {
                    telemetry.ctaClick('Request Custom ROI Model', 'difference_roi');
                    openDemoDialog('roi_simulator');
                  }}
                  className="bg-[#22E55A] hover:bg-emerald-400 text-black font-semibold text-xs px-5 py-2.5 h-9 rounded-full cursor-pointer shrink-0 shadow-[0_0_25px_rgba(34,229,90,0.28)] transition-all"
                >
                  Get Project ROI Report
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;

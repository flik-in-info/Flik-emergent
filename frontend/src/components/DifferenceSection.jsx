import React, { useState, useMemo } from 'react';
import {
  Check,
  X,
  Calculator,
  ArrowRight,
  Zap,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { metricsSection } from '../data/mock';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const TICKET_SIZES = [
  { id: 'mid', label: '₹1 Cr', valueCr: 1.0 },
  { id: 'luxury', label: '₹2.5 Cr', valueCr: 2.5 },
  { id: 'ultra', label: '₹5 Cr', valueCr: 5.0 },
  { id: 'trophy', label: '₹10 Cr+', valueCr: 10.0 }
];

const COMPARISON_ROWS = [
  {
    dimension: 'Pre-Launch Sales',
    traditional: 'Stalled waiting for physical sample flat completion',
    flik: 'Day-one immersive 3D tower & view exploration'
  },
  {
    dimension: 'NRI & Outstation Buyers',
    traditional: 'Low-trust static PDFs & compressed WhatsApp videos',
    flik: 'Live interactive browser walkthrough link on any device'
  },
  {
    dimension: 'Inventory Status',
    traditional: 'Spreadsheet confusion and double-pitched units',
    flik: 'Real-time live tower availability synchronized to CRM'
  },
  {
    dimension: 'Buyer Follow-Up',
    traditional: 'Guesswork based on handwritten gallery feedback',
    flik: 'Automatic attention heatmaps & intent lead scoring'
  },
  {
    dimension: 'Sunlight & View Clarity',
    traditional: 'Unverified angle assumptions from 2D elevation art',
    flik: 'Floor-by-floor solar angle & skyline accuracy'
  }
];

const DifferenceSection = () => {
  const { open: openDemoDialog } = useDemoDialog();
  const [units, setUnits] = useState(250);
  const [ticketId, setTicketId] = useState('luxury');
  const [focusView, setFocusView] = useState('side-by-side'); // 'side-by-side' | 'flik-only'

  const selectedTicket = useMemo(
    () => TICKET_SIZES.find((t) => t.id === ticketId) || TICKET_SIZES[1],
    [ticketId]
  );

  const metrics = useMemo(() => {
    const totalGdvCr = units * selectedTicket.valueCr;
    // Accelerating pre-sales cycle cuts working-capital carry (~11% p.a.) across faster absorption window
    const velocityMonthsSaved = Math.max(4, Math.min(11, Math.round(4 + units / 160)));
    const carryingCostSavedCr = Number(((totalGdvCr * 0.085 * velocityMonthsSaved) / 12).toFixed(1));
    const additionalConversions = Math.max(8, Math.round(units * 0.14));

    return {
      totalGdvCr,
      velocityMonthsSaved,
      carryingCostSavedCr,
      additionalConversions
    };
  }, [units, selectedTicket]);

  const handleRoiInteraction = (nextUnits, nextTicket) => {
    const totalGdv = nextUnits * nextTicket.valueCr;
    const mSaved = Math.max(4, Math.min(11, Math.round(4 + nextUnits / 160)));
    const crSaved = Number(((totalGdv * 0.085 * mSaved) / 12).toFixed(1));
    telemetry.roiSimulated(nextUnits, nextTicket.label, `${crSaved} Cr`);
  };

  return (
    <section
      id="difference"
      className="scroll-mt-20 relative py-14 lg:py-16 bg-[#08080b] border-t border-white/[0.06] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Merged High-Impact KPI Proof Strip */}
        <div className="mb-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {(metricsSection.metrics || []).map((metric) => (
            <div
              key={metric.label}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#111116] to-[#0b0b0f] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-emerald-500/35 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-light bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent tracking-tight mb-1.5">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-white">{metric.label}</div>
              <div className="text-[11px] text-gray-400 mt-1 line-clamp-2">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-emerald-400 text-xs font-medium uppercase tracking-[0.2em] block mb-2.5">
              Why Leading Developers Switch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight">
              Static brochures cost velocity.
              <span className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Quantify the Flik uplift.
              </span>
            </h2>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setFocusView('side-by-side')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                focusView === 'flik-only'
                  ? 'bg-emerald-500 text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Flik Advantage Only
            </button>
          </div>
        </div>

        {/* Asymmetric 2-Column Value & ROI Workbench */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: Compact Interactive Comparison Matrix */}
          <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-[#101014] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Sales Workflow Contrast</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">5 Core Pillars</span>
              </div>

              <div className="space-y-3">
                {COMPARISON_ROWS.map((row) => (
                  <div
                    key={row.dimension}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                  >
                    <div className="text-xs font-semibold text-white mb-2">{row.dimension}</div>
                    <div className={`grid gap-2.5 ${focusView === 'side-by-side' ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
                      {focusView === 'side-by-side' && (
                        <div className="flex items-start gap-2 text-xs text-gray-500">
                          <X className="w-3.5 h-3.5 text-rose-400/80 shrink-0 mt-0.5" />
                          <span>{row.traditional}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2 text-xs text-emerald-300 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.flik}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Developer ROI Simulator */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#111514] via-[#0e1013] to-[#0c0c10] border border-emerald-500/25 shadow-[0_0_50px_rgba(16,185,129,0.08)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono uppercase tracking-wider">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Live ROI Simulator</span>
                </div>
                <span className="text-xs font-mono text-gray-400">GDV: ₹{metrics.totalGdvCr.toLocaleString('en-IN')} Cr</span>
              </div>

              {/* Project Units Slider */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="roi-units-slider" className="text-xs font-medium text-gray-300">
                    Project Inventory Size
                  </label>
                  <span className="text-sm font-mono font-bold text-white">{units} Units</span>
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
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/15 accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
                  <span>50 Units</span>
                  <span>500 Units</span>
                  <span>1,000 Units</span>
                </div>
              </div>

              {/* Ticket Size Selector */}
              <div className="mb-6">
                <div className="text-xs font-medium text-gray-300 mb-2">Average Unit Ticket Size</div>
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
                        className={`py-2 px-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                          active
                            ? 'bg-emerald-500 text-black font-bold border-emerald-400 shadow-lg shadow-emerald-500/20'
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
                <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/20">
                  <div className="text-[10px] font-mono text-gray-400 uppercase mb-1">Carry Cost Saved</div>
                  <div className="text-xl sm:text-2xl font-semibold text-emerald-400 font-mono">
                    ₹{metrics.carryingCostSavedCr} Cr
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                  <div className="text-[10px] font-mono text-gray-400 uppercase mb-1">Cycle Reduction</div>
                  <div className="text-xl sm:text-2xl font-semibold text-white font-mono flex items-center gap-1">
                    {metrics.velocityMonthsSaved} <span className="text-xs text-gray-400 font-normal">mos</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                  <div className="text-[10px] font-mono text-gray-400 uppercase mb-1">Extra Bookings</div>
                  <div className="text-xl sm:text-2xl font-semibold text-white font-mono flex items-center gap-1">
                    +{metrics.additionalConversions}
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Model based on historical developer velocity gains</span>
              </div>
              <Button
                onClick={() => {
                  telemetry.ctaClick('Request Custom ROI Model', 'difference_roi');
                  openDemoDialog('roi_simulator');
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs px-5 py-2.5 cursor-pointer shrink-0"
              >
                Get Project ROI Report
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;

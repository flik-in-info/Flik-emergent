import React, { useState, useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const TICKET_SIZES = [
  { id: 'mid', label: '₹1.5 Cr', valueCr: 1.5 },
  { id: 'luxury', label: '₹2.5 Cr', valueCr: 2.5 },
  { id: 'ultra', label: '₹5 Cr', valueCr: 5.0 },
  { id: 'trophy', label: '₹10 Cr+', valueCr: 10.0 },
];

const COMPARISON_ROWS = [
  {
    dimension: 'Upfront Capital Expenditure',
    traditional: '₹2 to ₹5 crore spent building one temporary physical flat',
    flik: 'Deployed at a fraction of physical sample construction cost',
    handNote: 'Sunk CapEx gone on demolition',
  },
  {
    dimension: 'Pre-Sales Readiness',
    traditional: 'Sales stall 3 to 6 months waiting for structural setup',
    flik: 'Live interactive walkthroughs delivered in 2 to 4 weeks',
    handNote: 'Missing 4 months of launch demand',
  },
  {
    dimension: 'Floor Plates & Views',
    traditional: 'Buyers only see a single ground-level unit layout',
    flik: 'Explore every floor height, orientation, and view corridor',
    handNote: 'Zero upper-floor view clarity',
  },
  {
    dimension: 'International NRI Access',
    traditional: 'Inaccessible outside physical sales center hours',
    flik: 'Shareable link opening smoothly on any phone or laptop worldwide',
    handNote: 'Lost global buyer velocity',
  },
  {
    dimension: 'Residual Project Value',
    traditional: 'Demolished with zero residual utility after sellout',
    flik: 'Updated live for handover previews and customization talks',
    handNote: 'Rebuilt from zero for next phase',
  },
];

const DifferenceSection = () => {
  const { open: openDemoDialog } = useDemoDialog();
  const [units, setUnits] = useState(250);
  const [ticketId, setTicketId] = useState('luxury');
  const [useFlik, setUseFlik] = useState(true);

  const selectedTicket = useMemo(
    () => TICKET_SIZES.find((t) => t.id === ticketId) || TICKET_SIZES[1],
    [ticketId]
  );

  const metrics = useMemo(() => {
    const totalGdvCr = units * selectedTicket.valueCr;
    const velocityMonthsSaved = Math.max(4, Math.min(9, Math.round(3 + units / 180)));
    const carryingCostSavedCr = Number(
      ((totalGdvCr * 0.08 * velocityMonthsSaved) / 12).toFixed(1)
    );

    return {
      totalGdvCr,
      velocityMonthsSaved,
      carryingCostSavedCr,
    };
  }, [units, selectedTicket]);

  const sliderProgress = ((units - 50) / (1000 - 50)) * 100;

  const handleRoiInteraction = (nextUnits, nextTicket) => {
    const totalGdv = nextUnits * nextTicket.valueCr;
    const mSaved = Math.max(4, Math.min(9, Math.round(3 + nextUnits / 180)));
    const crSaved = Number(((totalGdv * 0.08 * mSaved) / 12).toFixed(1));
    telemetry.roiSimulated(nextUnits, nextTicket.label, `${crSaved} Cr`);
  };

  return (
    <section
      id="difference"
      className="scroll-mt-24 py-16 lg:py-24 bg-grid-paper border-t border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header + Zensia-style Switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-medium text-[#0b1020] leading-[1.08] tracking-[-0.03em]">
              Sample flat friction vs.{' '}
              <span className="text-[#0F766E]">one shared platform.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-xl">
              Flip the switch to compare physical sample flat bottlenecks with browser-streamed pre-sales from Hastok Enterprise Pvt. Ltd.
            </p>
          </div>

          {/* Interactive Toggle Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={useFlik}
            onClick={() => setUseFlik((v) => !v)}
            className="inline-flex items-center gap-3.5 px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-colors cursor-pointer self-start lg:self-auto"
          >
            <span
              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                useFlik ? 'bg-[#00A896]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5 ${
                  useFlik ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </span>
            <span className="text-xs font-medium text-[#0b1020]">
              {useFlik ? 'Flik Explorer Active' : 'Physical Sample Flat Only'}
            </span>
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Drafting Comparison Ledger */}
          <div className="lg:col-span-6 space-y-3">
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.dimension}
                className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
                  useFlik
                    ? 'bg-white border-slate-200/90 shadow-sm'
                    : 'bg-rose-50/45 border-rose-200/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-sm font-semibold text-[#0b1020]">{row.dimension}</span>
                  {!useFlik && (
                    <span className="font-note text-base sm:text-lg text-rose-600 font-bold leading-none">
                      {row.handNote}
                    </span>
                  )}
                </div>

                {useFlik ? (
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <Check className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                    <span>{row.flik}</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-900/80 leading-relaxed">
                    <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Light Project Capital & Velocity Estimator */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.16)]">
            <div className="flex items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-100">
              <span className="text-sm font-semibold text-[#0b1020]">
                Project Capital & Velocity Estimator
              </span>
              <span className="text-xs font-mono text-[#0F766E] bg-[#f4fbfa] px-2.5 py-1 rounded-md border border-[#0F766E]/20 whitespace-nowrap shrink-0">
                GDV ₹{metrics.totalGdvCr.toLocaleString('en-IN')} Cr
              </span>
            </div>

            {/* Project Units Slider */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-2.5">
                <label htmlFor="roi-units-slider" className="text-xs font-medium text-slate-600">
                  Total Residential Units
                </label>
                <span className="text-sm font-mono font-semibold text-[#0F766E]">
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
                  background: `linear-gradient(to right, #0F766E 0%, #0F766E ${sliderProgress}%, #e2e8f0 ${sliderProgress}%, #e2e8f0 100%)`,
                }}
                className="w-full flik-slider cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                <span>50 Units</span>
                <span>500 Units</span>
                <span>1,000 Units</span>
              </div>
            </div>

            {/* Ticket Size Selector */}
            <div className="mb-7">
              <div className="text-xs font-medium text-slate-600 mb-2.5">
                Average Apartment Ticket Price
              </div>
              <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-xl">
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
                      className={`py-2 px-2 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#0b1020] text-white font-semibold shadow-sm'
                          : 'text-slate-600 hover:text-[#0b1020]'
                      }`}
                    >
                      {tier.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Output Metrics */}
            <div className="grid grid-cols-3 border-t border-b border-slate-100 divide-x divide-slate-100 py-5 mb-6">
              <div className="pr-3">
                <div className="text-[11px] font-mono text-slate-500 mb-1">
                  Sample Flat Saved
                </div>
                <div className="text-lg sm:text-xl font-semibold text-[#0b1020] font-mono whitespace-nowrap">
                  ₹2–5 Cr
                </div>
              </div>
              <div className="px-3">
                <div className="text-[11px] font-mono text-slate-500 mb-1">
                  Carry Saved
                </div>
                <div className="text-lg sm:text-xl font-semibold text-[#0F766E] font-mono whitespace-nowrap">
                  ₹{metrics.carryingCostSavedCr} Cr
                </div>
              </div>
              <div className="pl-3">
                <div className="text-[11px] font-mono text-slate-500 mb-1">
                  Time to Pre-Sales
                </div>
                <div className="text-lg sm:text-xl font-semibold text-[#0b1020] font-mono whitespace-nowrap">
                  {metrics.velocityMonthsSaved} Months Saved
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Direct B2B project licensing with zero per-seat fees.
              </span>
              <Button
                data-testid="difference-cta"
                onClick={() => {
                  telemetry.ctaClick('Request Project Proposal', 'difference');
                  openDemoDialog('roi_estimator');
                }}
                className="bg-[#0b1020] hover:bg-[#0F766E] text-white font-medium text-xs px-5 h-10 rounded-lg transition-colors"
              >
                Request Project Proposal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;

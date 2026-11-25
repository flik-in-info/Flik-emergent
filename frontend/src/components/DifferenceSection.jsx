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
  },
  {
    dimension: 'Pre-Sales Readiness',
    traditional: 'Sales stall 3 to 6 months waiting for structural setup',
    flik: 'Live interactive walkthroughs delivered in 2 to 4 weeks',
  },
  {
    dimension: 'Floor Plates & Views',
    traditional: 'Buyers only see a single ground-level unit layout',
    flik: 'Explore every floor height, orientation, and view corridor',
  },
  {
    dimension: 'International NRI Access',
    traditional: 'Inaccessible outside physical sales center hours',
    flik: 'Shareable link opening smoothly on any phone or laptop worldwide',
  },
  {
    dimension: 'Residual Project Value',
    traditional: 'Demolished with zero residual utility after sellout',
    flik: 'Updated live for handover previews and customization talks',
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
    // Physical sample flat construction carry + launch delay capital impact model
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
      className="scroll-mt-20 py-14 lg:py-20 bg-black border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-white leading-[1.1] tracking-[-0.025em]">
              Sample flat economics vs. Flik Explorer.
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-light mt-2.5 max-w-xl">
              Eliminate multi-month construction waits and showcase every unit variation from launch day.
            </p>
          </div>

          <div className="inline-flex border border-white/15 bg-black self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setFocusView('side-by-side')}
              className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                focusView === 'side-by-side'
                  ? 'bg-white text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Side-by-Side
            </button>
            <button
              type="button"
              onClick={() => setFocusView('flik-only')}
              className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                focusView === 'flik-only'
                  ? 'bg-[#22E55A] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Flik Capabilities
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Clean Editorial Ledger Table */}
          <div className="lg:col-span-6 divide-y divide-white/10 border-t border-b border-white/10">
            {COMPARISON_ROWS.map((row) => (
              <div key={row.dimension} className="py-4 sm:py-5">
                <div className="text-sm font-medium text-white mb-2">{row.dimension}</div>
                <div
                  className={`grid gap-3 ${
                    focusView === 'side-by-side' ? 'sm:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {focusView === 'side-by-side' && (
                    <div className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
                      <X className="w-3.5 h-3.5 text-rose-400/80 shrink-0 mt-0.5" />
                      <span>{row.traditional}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-xs text-gray-200 leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-[#22E55A] shrink-0 mt-0.5" />
                    <span>{row.flik}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Project Carrying Cost Estimator */}
          <div className="lg:col-span-6 p-6 sm:p-8 border border-white/15 bg-[#070709]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <span className="text-sm font-medium text-white">
                Project Capital & Velocity Estimator
              </span>
              <span className="text-xs font-mono text-gray-300">
                GDV ₹{metrics.totalGdvCr.toLocaleString('en-IN')} Cr
              </span>
            </div>

            {/* Project Units Slider */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-2.5">
                <label htmlFor="roi-units-slider" className="text-xs font-medium text-gray-300">
                  Total Residential Units
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
                  background: `linear-gradient(to right, #22E55A 0%, #22E55A ${sliderProgress}%, rgba(255,255,255,0.15) ${sliderProgress}%, rgba(255,255,255,0.15) 100%)`,
                }}
                className="w-full flik-slider cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-gray-500 mt-2">
                <span>50 Units</span>
                <span>500 Units</span>
                <span>1,000 Units</span>
              </div>
            </div>

            {/* Ticket Size Selector */}
            <div className="mb-7">
              <div className="text-xs font-medium text-gray-300 mb-2.5">
                Average Apartment Ticket Price
              </div>
              <div className="grid grid-cols-4 border border-white/15 divide-x divide-white/15">
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
                      className={`py-2.5 px-2 text-xs font-mono transition-colors cursor-pointer ${
                        active
                          ? 'bg-white text-black font-semibold'
                          : 'bg-black text-gray-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      {tier.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Output Metrics */}
            <div className="grid grid-cols-3 border-t border-b border-white/10 divide-x divide-white/10 py-5 mb-6">
              <div className="pr-3">
                <div className="text-[11px] font-mono text-gray-400 mb-1">
                  Sample Flat Outlay Saved
                </div>
                <div className="text-lg sm:text-xl font-medium text-white font-mono whitespace-nowrap">
                  ₹2–5 Cr
                </div>
              </div>
              <div className="px-3">
                <div className="text-[11px] font-mono text-gray-400 mb-1">
                  Estimated Carry Saved
                </div>
                <div className="text-lg sm:text-xl font-medium text-[#22E55A] font-mono whitespace-nowrap">
                  ₹{metrics.carryingCostSavedCr} Cr
                </div>
              </div>
              <div className="pl-3">
                <div className="text-[11px] font-mono text-gray-400 mb-1">
                  Time to Pre-Sales
                </div>
                <div className="text-lg sm:text-xl font-medium text-white font-mono whitespace-nowrap">
                  {metrics.velocityMonthsSaved} Months Saved
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-gray-500">
                Direct B2B project licensing with zero per-seat fees.
              </span>
              <Button
                onClick={() => {
                  telemetry.ctaClick('Request Custom ROI Model', 'difference_roi');
                  openDemoDialog('roi_simulator');
                }}
                className="bg-[#22E55A] hover:bg-emerald-400 text-black font-semibold text-xs px-5 h-10 rounded-md cursor-pointer shrink-0 transition-colors"
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

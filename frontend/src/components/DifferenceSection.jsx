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
    dimension: 'Upfront Capital Outlay',
    traditional: '₹2 to ₹5 crore building one temporary physical sample flat',
    flik: 'Deployed at a fraction of physical sample flat construction cost',
    handNote: 'Sunk CapEx lost at close',
  },
  {
    dimension: 'Launch Readiness',
    traditional: '3 to 6 months waiting on civil sample construction',
    flik: 'Delivered in 2 to 4 weeks directly from CAD and BIM drawings',
    handNote: 'Slow pre-sales velocity',
  },
  {
    dimension: 'Inventory & View Coverage',
    traditional: 'Restricted to one fixed ground-level apartment layout',
    flik: 'Every floor elevation, orientation, sunlight hour, and finish live',
    handNote: 'No 40th-floor sightlines',
  },
  {
    dimension: 'NRI & Overseas Buyers',
    traditional: 'Requires physical travel or flat PDF brochures',
    flik: 'Opens immediately in standard laptop and phone browsers worldwide',
    handNote: 'Lost global buyer trust',
  },
  {
    dimension: 'Post-Launch Adaptability',
    traditional: 'Concrete walls cannot change after buildout; demolished later',
    flik: 'Evolves smoothly across phases and handover customization talks',
    handNote: 'Zero residual utility',
  },
];

const STAKEHOLDERS = [
  {
    role: 'Developer MDs & Project Heads',
    outcome:
      'Replace ₹2 to ₹5 crore temporary room expenditure and open pre-sales months ahead of site completion with project-wide licensing.',
  },
  {
    role: 'Sales Galleries & Advisors',
    outcome:
      'Walk buyers straight to exact balconies, floor heights, and marble options across gallery LED walls and handheld tablets.',
  },
  {
    role: 'NRIs & Channel Partners',
    outcome:
      'Close overseas commitments across London, Dubai, or Singapore using one browser URL with zero software downloads.',
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
    <section id="difference" className="scroll-mt-20 bg-white border-b border-black/15">
      {/* Grounded Industry Figures Ledger */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 border-b border-black/15">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/15">
          <div className="py-10 md:pr-8">
            <div className="text-4xl sm:text-5xl font-medium font-display text-black tracking-tight">
              ₹2–5 Cr
            </div>
            <p className="text-sm text-neutral-600 mt-2.5 leading-relaxed">
              Typical spend constructing one physical sample flat that ends with zero residual value once inventory sells out.
            </p>
          </div>
          <div className="py-10 md:px-8">
            <div className="text-4xl sm:text-5xl font-medium font-display text-black tracking-tight">
              2–4 Weeks
            </div>
            <p className="text-sm text-neutral-600 mt-2.5 leading-relaxed">
              Full interactive launch from your 2D CAD and BIM drawings versus 3 to 6 months waiting on civil setup.
            </p>
          </div>
          <div className="py-10 md:pl-8">
            <div className="inline-block bg-black text-[#22E55A] px-3 py-1 text-3xl sm:text-4xl font-medium font-display tracking-tight">
              70–80%
            </div>
            <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
              Share of Indian luxury residential apartments purchased off-plan while towers remain under construction.
            </p>
          </div>
        </div>
      </div>

      {/* Drafting Comparison & Estimator */}
      <div className="bg-grid-paper py-16 lg:py-20 border-b border-black/15">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-medium text-black leading-[1.06] tracking-[-0.03em]">
                Sample flat friction vs.{' '}
                <span className="underline decoration-[#22E55A] decoration-[4px] underline-offset-[6px]">
                  Flik Explorer.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-2.5 max-w-xl">
                Toggle between a static physical room and an interactive sales environment by Hastok Enterprise Pvt. Ltd.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={useFlik}
              onClick={() => setUseFlik((v) => !v)}
              className="inline-flex items-center gap-3.5 px-4 py-2.5 bg-white border border-black cursor-pointer self-start lg:self-auto"
            >
              <span
                className={`relative inline-flex h-5 w-10 shrink-0 transition-colors duration-200 ${
                  useFlik ? 'bg-[#22E55A]' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 bg-black transition-transform duration-200 mt-0.5 ${
                    useFlik ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </span>
              <span className="text-xs font-mono font-semibold text-black uppercase tracking-wide">
                {useFlik ? 'Flik Platform Active' : 'Sample Flat Only'}
              </span>
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Comparison Rows */}
            <div className="lg:col-span-6 border-t border-b border-black/20 divide-y divide-black/15 bg-white/90">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.dimension}
                  className={`p-4 sm:p-5 transition-colors ${
                    useFlik ? 'bg-white' : 'bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-black">{row.dimension}</span>
                    {!useFlik && (
                      <span className="font-note text-base sm:text-lg text-neutral-800 font-bold leading-none underline decoration-neutral-400">
                        {row.handNote}
                      </span>
                    )}
                  </div>

                  {useFlik ? (
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      <span className="w-5 h-5 bg-[#22E55A] text-black flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      <span>{row.flik}</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      <span className="w-5 h-5 bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3 h-3" />
                      </span>
                      <span>{row.traditional}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Project Carry & ROI Estimator */}
            <div className="lg:col-span-6 p-6 sm:p-8 border border-black bg-white">
              <div className="flex items-center justify-between gap-2 pb-4 mb-6 border-b border-neutral-200">
                <span className="text-sm font-semibold text-black">
                  Project Carry & Pre-Sales Estimator
                </span>
                <span className="text-xs font-mono text-[#22E55A] bg-black px-2.5 py-1 font-medium whitespace-nowrap shrink-0">
                  GDV ₹{metrics.totalGdvCr.toLocaleString('en-IN')} Cr
                </span>
              </div>

              <div className="mb-7">
                <div className="flex items-center justify-between mb-2.5">
                  <label htmlFor="roi-units-slider" className="text-xs font-medium text-neutral-600">
                    Total Residential Units
                  </label>
                  <span className="text-sm font-mono font-semibold text-black bg-[#22E55A] px-2 py-0.5">
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
                    background: `linear-gradient(to right, #22E55A 0%, #22E55A ${sliderProgress}%, #e4e4e7 ${sliderProgress}%, #e4e4e7 100%)`,
                  }}
                  className="w-full flik-slider cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-2">
                  <span>50 Units</span>
                  <span>500 Units</span>
                  <span>1,000 Units</span>
                </div>
              </div>

              <div className="mb-7">
                <div className="text-xs font-medium text-neutral-600 mb-2.5">
                  Average Apartment Ticket Price
                </div>
                <div className="grid grid-cols-4 border border-black divide-x divide-black">
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
                            ? 'bg-black text-[#22E55A] font-semibold'
                            : 'bg-white text-black hover:bg-neutral-100'
                        }`}
                      >
                        {tier.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-3 border-t border-b border-neutral-200 divide-x divide-neutral-200 py-5 mb-6">
                <div className="pr-3">
                  <div className="text-[11px] font-mono text-neutral-500 mb-1">
                    Sample Flat Saved
                  </div>
                  <div className="text-lg sm:text-xl font-semibold text-black font-mono whitespace-nowrap">
                    ₹2–5 Cr
                  </div>
                </div>
                <div className="px-3">
                  <div className="text-[11px] font-mono text-neutral-500 mb-1">
                    Carry Saved
                  </div>
                  <div className="inline-block bg-black text-[#22E55A] px-2 py-0.5 text-base sm:text-lg font-semibold font-mono whitespace-nowrap">
                    ₹{metrics.carryingCostSavedCr} Cr
                  </div>
                </div>
                <div className="pl-3">
                  <div className="text-[11px] font-mono text-neutral-500 mb-1">
                    Pre-Sales Lead
                  </div>
                  <div className="text-lg sm:text-xl font-semibold text-black font-mono whitespace-nowrap">
                    {metrics.velocityMonthsSaved} Months Saved
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-neutral-500">
                  Per-project B2B licensing with zero per-seat charges.
                </span>
                <Button
                  data-testid="difference-cta"
                  onClick={() => {
                    telemetry.ctaClick('Request Project Proposal', 'difference');
                    openDemoDialog('roi_estimator');
                  }}
                  className="bg-[#22E55A] hover:bg-black text-black hover:text-[#22E55A] font-semibold text-xs px-5 h-10 rounded-[4px] transition-colors"
                >
                  Request Project Proposal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholder Outcomes (Clean Typographic Strip) */}
      <div id="teams" className="max-w-[1440px] mx-auto px-5 sm:px-8 py-14 lg:py-16">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          {STAKEHOLDERS.map((item) => (
            <div key={item.role} className="py-6 md:py-0 md:first:pr-8 md:px-8 md:last:pl-8 md:last:pr-0">
              <h3 className="text-base sm:text-lg font-semibold text-black mb-2">
                {item.role}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {item.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;

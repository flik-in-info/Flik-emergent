import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { telemetry } from '../utils/telemetry';

const FAQ_ITEMS = [
  {
    category: 'Overview & ROI',
    question: 'How does Flik Explorer replace a physical sample flat?',
    answer:
      'Physical sample flats typically cost ₹2 to ₹5 crore and take 3 to 6 months to construct, yet show buyers only one fixed ground-level unit layout with zero residual value once sold out. Flik Explorer provides a photorealistic, interactive 3D digital platform where buyers can walk through every floor, inspect any 2BHK/3BHK/Penthouse unit configuration, test real-time lighting and sun paths, and see the exact balcony sightline from their specific floor—at a fraction of the cost and deployed weeks before physical podiums are completed.',
  },
  {
    category: 'NRI & Remote Sales',
    question: 'Can NRI (Non-Resident Indian) buyers explore properties without downloading software?',
    answer:
      'Yes. Flik Explorer runs via high-performance cloud streaming directly in any standard browser (Safari, Chrome, Edge) across smartphones, tablets, laptops, and large touch displays. NRI buyers in the UAE, United States, United Kingdom, Singapore, or Canada can step inside under-construction luxury properties remotely with zero lag, zero app downloads, and zero plugins.',
  },
  {
    category: 'Technology & UE5',
    question: 'What technology powers Flik Explorer’s photorealism?',
    answer:
      'Flik Explorer is engineered on Unreal Engine 5 utilizing Lumen dynamic global illumination and Nanite virtualized micro-polygon geometry. Unlike traditional pre-baked 360-degree flat panoramas or static render images, every beam of light, architectural material finish, shadow, and viewpoint is calculated live in real time, giving buyers a cinema-grade spatial experience.',
  },
  {
    category: 'Deployment Timeline',
    question: 'How long does it take to deploy Flik Explorer for a new project?',
    answer:
      'Standard project deployment takes between 2 to 4 weeks once we receive your 2D architectural CAD/BIM drawings, structural plans, and interior finishes schedules. Your sales team can begin showing interactive 3D units and closing pre-sales months before physical construction reaches superstructure stages.',
  },
  {
    category: 'Sales & CRM Integration',
    question: 'Does Flik integrate with real estate sales CRMs and physical sales centers?',
    answer:
      'Yes. Flik seamlessly integrates with major real estate sales CRMs (including Salesforce, LeadSquared, Sell.Do, and Farvision) to synchronize live inventory availability, unit bookings, and buyer telemetry directly into your pipeline. At sales galleries, Flik powers immersive experience centers, interactive video walls, and iPads.',
  },
  {
    category: 'Overview & ROI',
    question: 'What happens to the 3D model as project construction progresses?',
    answer:
      'Unlike a physical sample flat which remains static, Flik Explorer is an ongoing digital platform. As architectural phases evolve, new towers launch, or material finishes change, the digital twin is easily updated and synced live across your microsites, mobile apps, and sales galleries instantly.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = (idx) => {
    const next = openIndex === idx ? -1 : idx;
    setOpenIndex(next);
    if (next !== -1 && FAQ_ITEMS[next]) {
      telemetry.faqExpanded(FAQ_ITEMS[next].question, FAQ_ITEMS[next].category);
    }
  };

  return (
    <section
      id="faq"
      className="scroll-mt-20 relative py-10 lg:py-12 bg-[#050507] border-t border-white/[0.06]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-medium uppercase tracking-[0.2em] mb-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight">
              Answers on <span className="text-emerald-400 font-normal">Flik Explorer</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md">
            Sample flat replacement, Unreal Engine 5 streaming, NRI access, and CRM deployment.
          </p>
        </div>

        {/* Sleek 2-Column Accordion Grid */}
        <div className="grid md:grid-cols-2 gap-3 items-start">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-white/[0.035] border-emerald-500/35'
                    : 'bg-white/[0.015] border-white/[0.07] hover:border-white/15'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left min-h-[52px] px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-[15px] font-medium text-white leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

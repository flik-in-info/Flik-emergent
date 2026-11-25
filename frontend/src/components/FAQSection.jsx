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
  const [openIndex, setOpenIndex] = useState(0);

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
      className="scroll-mt-24 relative py-9 lg:py-11 bg-[#030304] border-t border-white/[0.06]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22E55A]/35 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <div className="inline-flex items-center gap-2 text-[#22E55A] text-[11px] font-mono uppercase tracking-[0.22em] mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>05 · Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.65rem] font-light text-white tracking-[-0.025em] leading-[1.1]">
              Answers on{' '}
              <span className="font-editorial italic font-normal text-gradient-emerald tracking-normal pr-2">
                Flik Explorer.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md font-light">
            Sample flat replacement, Unreal Engine 5 streaming, NRI access, and CRM deployment.
          </p>
        </div>

        {/* 2-Column Smooth-Transition Accordion Grid */}
        <div className="grid md:grid-cols-2 gap-3.5 items-start">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className={`rounded-2xl transition-all duration-300 border glass-bezel ${
                  isOpen
                    ? 'bg-[#0b0d0c] border-[#22E55A]/40 shadow-[0_12px_40px_-15px_rgba(34,229,90,0.18)]'
                    : 'bg-[#08080b] border-white/[0.08] hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`font-mono text-[11px] mt-0.5 shrink-0 ${
                        isOpen ? 'text-[#22E55A]' : 'text-gray-600'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="text-sm sm:text-[15px] font-medium text-white leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 shrink-0 mt-0.5 ${
                      isOpen ? 'rotate-180 text-[#22E55A]' : ''
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-4 pt-1 ml-6 text-xs sm:text-sm text-gray-400 font-light leading-relaxed border-t border-white/[0.05]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

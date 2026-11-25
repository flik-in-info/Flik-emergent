import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { telemetry } from '../utils/telemetry';

const FAQ_ITEMS = [
  {
    category: 'Overview & ROI',
    question: 'How does Flik Explorer replace a physical sample flat?',
    answer:
      'Physical sample flats typically cost ₹2 to ₹5 crore and take 3 to 6 months to construct, yet show buyers only one fixed ground-level apartment layout with zero residual value once sold out. Flik Explorer delivers an interactive browser-streamed environment where buyers walk every floor height, inspect any 2BHK, 3BHK, or Penthouse configuration, test sunlight angles, and preview balcony views months before podium construction completes.',
  },
  {
    category: 'NRI & Remote Sales',
    question: 'Can NRI buyers explore apartments without installing any software?',
    answer:
      'Yes. Flik Explorer runs directly inside standard browsers on smartphones, laptops, tablets, and sales lounge LED screens. Buyers in the UAE, United Kingdom, United States, or Singapore open a project link with zero plugins or app store downloads.',
  },
  {
    category: 'Technology',
    question: 'How is visual fidelity achieved?',
    answer:
      'Environments are engineered on Unreal Engine 5 using dynamic Lumen global illumination and Nanite geometry. Light shafts, flooring materials, shadows, and skyline angles render dynamically rather than relying on flat pre-baked 360 photographs.',
  },
  {
    category: 'Deployment Timeline',
    question: 'How long does deployment take for a residential project?',
    answer:
      'Standard deployment takes 2 to 4 weeks once architectural CAD/BIM drawings and interior finish schedules are provided, enabling pre-launch sales before superstructure slabs go up.',
  },
  {
    category: 'CRM Integration',
    question: 'Does Flik integrate with residential sales CRMs and showrooms?',
    answer:
      'Yes. Live apartment availability syncs directly with major developer CRMs including Salesforce, LeadSquared, Sell.Do, and Farvision across both online links and on-site experience center displays.',
  },
  {
    category: 'Lifecycle Updates',
    question: 'Can the environment be updated as construction specifications evolve?',
    answer:
      'Yes. As new towers launch, floor finishes update, or podium landscape designs change, revisions publish synchronously across gallery lounges and buyer URLs.',
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
      className="scroll-mt-24 py-16 lg:py-24 bg-white border-t border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl font-medium text-black tracking-[-0.03em] leading-[1.1]">
              Common questions on deployment and licensing.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
              Practical answers covering sample flat savings, NRI access, CRM sync, and Unreal Engine turnaround.
            </p>
          </div>

          <div className="lg:col-span-8 bg-neutral-50 rounded-2xl border border-neutral-200 divide-y divide-neutral-200 px-6 sm:px-8">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full text-left py-5 flex items-start justify-between gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-sm sm:text-base font-medium leading-snug transition-colors ${
                        isOpen
                          ? 'text-black underline decoration-[#22E55A] decoration-2 underline-offset-4'
                          : 'text-black group-hover:text-neutral-600'
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                        isOpen
                          ? 'bg-[#22E55A] text-black'
                          : 'bg-neutral-200/80 text-neutral-600 group-hover:bg-black group-hover:text-white'
                      }`}
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-5 pr-6 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

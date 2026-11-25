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
      className="scroll-mt-20 py-14 lg:py-20 bg-black border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-[-0.025em] leading-[1.15]">
              Common questions on deployment and licensing.
            </h2>
            <p className="text-sm text-gray-400 font-light mt-3 leading-relaxed">
              Practical answers covering sample flat savings, NRI access, CRM sync, and Unreal Engine turnaround.
            </p>
          </div>

          <div className="lg:col-span-8 border-t border-white/15 divide-y divide-white/15">
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
                        isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'
                      }`}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 mt-0.5 ${
                        isOpen ? 'rotate-180 text-[#22E55A]' : 'group-hover:text-white'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-5 pr-6 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
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

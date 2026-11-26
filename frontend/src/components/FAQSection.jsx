import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { telemetry } from '../utils/telemetry';

const FAQ_ITEMS = [
  {
    category: 'Overview & ROI',
    question: 'How does Flik Explorer replace a physical sample flat?',
    answer:
      'Physical sample flats typically cost ₹2 to ₹5 crore and take 3 to 6 months to build, yet show only one fixed ground-level room layout. Flik Explorer delivers an interactive browser environment where buyers walk every floor altitude, inspect any unit layout, test sunlight hours, and compare interior stones before construction completes.',
  },
  {
    category: 'NRI & Remote Sales',
    question: 'Can NRI buyers open tours without installing any app?',
    answer:
      'Yes. Flik Explorer runs natively inside standard browsers on smartphones, laptops, tablets, and gallery LED screens. Buyers across Mumbai, London, Dubai, or Singapore open a project link with zero downloads or VR headsets.',
  },
  {
    category: 'Deployment Timeline',
    question: 'How fast does a residential project go live?',
    answer:
      'Projects typically go live within 2 to 4 weeks once architectural CAD or BIM files and interior finish schedules are shared, letting sales teams take pre-launch bookings months early.',
  },
  {
    category: 'CRM & Updates',
    question: 'Can the environment update as launch phases or specifications evolve?',
    answer:
      'Yes. Unlike concrete walls fixed after fit-out, new tower launches, updated lobby landscaping, and live inventory availability sync seamlessly across both sales galleries and remote links.',
  },
  {
    category: 'Licensing',
    question: 'How is Flik Explorer priced for developers?',
    answer:
      'Flik uses straightforward B2B per-project licensing with zero per-seat fees, matching how residential developers allocate launch and experience center budgets.',
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
      className="scroll-mt-20 py-16 lg:py-20 bg-white border-b border-black/15"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl font-medium text-black tracking-[-0.03em] leading-[1.08]">
              Questions from development teams.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
              Practical answers covering sample-flat cost replacement, NRI access, CAD turnaround, and per-project licensing.
            </p>
          </div>

          <div className="lg:col-span-8 border-t border-b border-black/20 divide-y divide-neutral-200">
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
                      className={`w-6 h-6 flex items-center justify-center transition-colors shrink-0 ${
                        isOpen
                          ? 'bg-[#22E55A] text-black'
                          : 'bg-neutral-100 text-neutral-700 group-hover:bg-black group-hover:text-white'
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
                    <div className="pb-5 pr-8 text-xs sm:text-sm text-neutral-600 leading-relaxed">
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

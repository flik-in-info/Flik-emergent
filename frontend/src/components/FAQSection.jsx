import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { contactData } from '../data/mock';
import { useDemoDialog } from '../context/DemoDialogContext';
import { UiverseButton, UiverseBadge } from './uiverse/UiverseComponents';

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
  const [activeCategory, setActiveCategory] = useState('All');
  const { open: openDemoDialog } = useDemoDialog();

  const categories = ['All', 'Overview & ROI', 'NRI & Remote Sales', 'Technology & UE5', 'Deployment Timeline', 'Sales & CRM Integration'];

  const filteredItems =
    activeCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="relative py-32 bg-[#09090b] border-t border-white/5 overflow-hidden">
      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <UiverseBadge
            highlight="ENTERPRISE FAQ"
            text="Real Estate Developer Inquiries & Technical Specifications"
            className="mb-4"
          />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            Everything you need to know about <span className="text-emerald-400 font-normal">Flik Explorer</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Direct answers on sample flat replacement, Unreal Engine 5 technology, NRI accessibility, and commercial developer ROI.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-white/[0.03] border-emerald-500/30'
                    : 'bg-white/[0.015] border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-medium text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-400 leading-relaxed border-t border-white/5 mt-1">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-500/[0.08] to-transparent border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white">Have a specific project in mind?</h3>
            <p className="text-xs text-gray-400">
              Explore custom ROI modeling and technical blueprints for your residential or commercial development.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <UiverseButton
              variant="primary"
              size="sm"
              onClick={() => openDemoDialog('faq_cta')}
              icon={ArrowRight}
            >
              Request Live Demo
            </UiverseButton>
            <a
              href={`https://wa.me/${contactData.phoneRaw}?text=${encodeURIComponent(contactData.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 text-gray-300 hover:text-white text-xs font-medium transition-all duration-200"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;

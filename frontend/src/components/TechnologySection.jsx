import React from 'react';
import TechStackShowcase from './TechStackShowcase';

const TechnologySection = () => {
  return (
    <section
      id="technology"
      className="scroll-mt-24 relative py-9 lg:py-11 bg-[#030304] border-t border-white/[0.06]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22E55A]/35 to-transparent"
      />
      {/* Subtle architectural pattern */}
      <div className="absolute inset-0 bg-arch-grid-fine opacity-45 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechStackShowcase />
      </div>
    </section>
  );
};

export default TechnologySection;

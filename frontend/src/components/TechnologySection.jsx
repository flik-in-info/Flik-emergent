import React from 'react';
import TechStackShowcase from './TechStackShowcase';

const TechnologySection = () => {
  return (
    <section
      id="technology"
      className="scroll-mt-20 relative py-14 lg:py-16 bg-[#050507] border-t border-b border-white/10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22E55A]/45 to-transparent"
      />
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8">
        <TechStackShowcase />
      </div>
    </section>
  );
};

export default TechnologySection;

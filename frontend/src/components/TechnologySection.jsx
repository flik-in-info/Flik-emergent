import React from 'react';
import TechStackShowcase from './TechStackShowcase';

const TechnologySection = () => {
  return (
    <section
      id="technology"
      className="scroll-mt-20 py-14 lg:py-20 bg-[#050506] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechStackShowcase />
      </div>
    </section>
  );
};

export default TechnologySection;

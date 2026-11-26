import React from 'react';
import TechStackShowcase from './TechStackShowcase';

const TechnologySection = () => {
  return (
    <section
      id="technology"
      className="scroll-mt-20 py-16 lg:py-20 bg-white border-b border-black/15"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
        <TechStackShowcase />
      </div>
    </section>
  );
};

export default TechnologySection;

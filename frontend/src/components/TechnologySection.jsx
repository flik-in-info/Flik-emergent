import React from 'react';
import TechStackShowcase from './TechStackShowcase';

const TechnologySection = () => {
  return (
    <section
      id="technology"
      className="scroll-mt-24 py-16 lg:py-24 bg-neutral-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechStackShowcase />
      </div>
    </section>
  );
};

export default TechnologySection;

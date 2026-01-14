import React from 'react';
import { Check, X } from 'lucide-react';
import { differenceSection } from '../data/mock';

const DifferenceSection = () => {
  return (
    <section className="relative py-32 bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">
            {differenceSection.label}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
          {differenceSection.headline.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Body */}
        <p className="text-lg text-gray-400 leading-relaxed mb-16 max-w-3xl">
          {differenceSection.body}
        </p>

        {/* Comparison Table */}
        <div className="rounded-2xl overflow-hidden border border-white/5">
          {/* Header */}
          <div className="grid grid-cols-2 bg-white/[0.04]">
            <div className="p-6 text-center border-r border-white/5">
              <span className="text-gray-500 font-medium">Traditional ArchViz</span>
            </div>
            <div className="p-6 text-center">
              <span className="text-emerald-400 font-medium">Flik Explore</span>
            </div>
          </div>
          
          {/* Rows */}
          {differenceSection.comparison.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 ${
                index !== differenceSection.comparison.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <div className="p-6 flex items-center justify-center gap-3 border-r border-white/5 bg-white/[0.01]">
                <X className="w-5 h-5 text-red-400/60" />
                <span className="text-gray-500">{row.traditional}</span>
              </div>
              <div className="p-6 flex items-center justify-center gap-3">
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-white">{row.flik}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
import React from 'react';
import { metricsSection } from '../data/mock';

const MetricsSection = () => {
  return (
    <section className="relative py-32 bg-[#0d0d0e]">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="text-center mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">
            {metricsSection.label}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-20 text-center">
          {metricsSection.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metricsSection.metrics.map((metric) => (
            <div
              key={metric.label}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 text-center"
            >
              {/* Value */}
              <div className="text-5xl lg:text-6xl font-light text-white mb-2 transition-all duration-500 group-hover:text-emerald-400">
                {metric.value}
              </div>
              
              {/* Label */}
              <div className="text-lg font-medium text-emerald-400 mb-4">
                {metric.label}
              </div>
              
              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {metric.description}
              </p>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-emerald-500/50 to-transparent" />
                <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-emerald-500/50 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
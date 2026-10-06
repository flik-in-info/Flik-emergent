import React from 'react';
import { metricsSection } from '../data/mock';
import { TrendingUp, Sparkles } from 'lucide-react';

const MetricsSection = () => {
  return (
    <section className="relative py-32 bg-[#09090b] overflow-hidden">
      {/* Background Glow & Fine Blueprint Grid */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{metricsSection.label} · PROVEN REAL ESTATE SALES VELOCITY</span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-20 text-center max-w-3xl mx-auto">
          <span className="block font-extralight text-gray-300">{metricsSection.headline[0]}</span>
          <span className="block font-medium text-gradient-emerald">
            {metricsSection.headline[1]}
          </span>
        </h2>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsSection.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="group relative p-8 rounded-2xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.07] hover:border-emerald-500/40 transition-all duration-400 text-center flex flex-col justify-between"
            >
              {/* Corner CAD Accent */}
              <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-700 group-hover:text-emerald-500/60 transition-colors">
                +
              </div>

              <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">
                  METRIC // 0{index + 1}
                </div>

                {/* Big Number */}
                <div className="text-5xl lg:text-6xl font-light tracking-tight text-white mb-2 transition-all duration-400 group-hover:text-emerald-400">
                  {metric.value}
                </div>
                
                {/* Metric Title */}
                <div className="text-base font-medium text-emerald-400 mb-3 tracking-wide">
                  {metric.label}
                </div>
              </div>
              
              {/* Metric Description */}
              <p className="text-gray-400 text-xs leading-relaxed font-light mt-2 pt-4 border-t border-white/5">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MetricsSection;
import React from 'react';
import { Monitor, Sun, CloudRain, View } from 'lucide-react';
import { visualizationSection, images } from '../data/mock';

const icons = [Monitor, Sun, CloudRain, View];

const VisualizationSection = () => {
  return (
    <section id="capabilities" className="relative py-32 bg-[#0d0d0e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">
            {visualizationSection.label}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
          {visualizationSection.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Body */}
        <p className="text-lg text-gray-400 leading-relaxed mb-16 max-w-3xl">
          {visualizationSection.body}
        </p>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {visualizationSection.features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-emerald-500/20">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Image Block with Time Slider UI */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={images.environment}
            alt="Flik Explorer Photorealistic Architectural Lighting and Real-Time Environment Simulation"
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0e] via-transparent to-transparent" />
          
          {/* Time Slider UI Overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-8">
            <div className="bg-[#0a0a0b]/80 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-sm">Time of Day</span>
                <span className="text-white text-sm font-medium">Dynamic Control</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-600 rounded-full" />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Dawn</span>
                <span>Noon</span>
                <span>Dusk</span>
                <span>Night</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualizationSection;
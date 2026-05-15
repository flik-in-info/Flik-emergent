import React from 'react';
import { Compass, BarChart3, Globe } from 'lucide-react';
import { platformSection, images } from '../data/mock';

const icons = [Compass, BarChart3, Globe];

const PlatformSection = () => {
  return (
    <section id="platform" className="relative py-32 bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">
            {platformSection.label}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
          {platformSection.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Body */}
        <p className="text-lg text-gray-400 leading-relaxed mb-16 max-w-3xl">
          {platformSection.body}
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {platformSection.features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:bg-white/[0.04]"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-emerald-500/20 group-hover:scale-110">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Image with UI Overlay */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={images.devices}
            alt="Interior walkthrough with UI overlays"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
import React from 'react';
import { Database, MousePointer, Flame, Users, Brain, Link2 } from 'lucide-react';
import { intelligenceSection, images } from '../data/mock';
import Card3DTilt from './3d/Card3DTilt';

const leftIcons = [Database, MousePointer, Flame];
const rightIcons = [Users, Brain, Link2];

const IntelligenceSection = () => {
  const leftItems = intelligenceSection.leftFeatures || [];
  const rightItems = intelligenceSection.rightFeatures || [];

  return (
    <section id="intelligence" className="relative py-32 bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest font-mono">
            {intelligenceSection.label}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
          {(intelligenceSection.headline || []).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Body */}
        <p className="text-lg text-gray-400 leading-relaxed mb-16 max-w-3xl font-light">
          {intelligenceSection.body}
        </p>

        {/* Two Column Features with 3D Tilt Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Left Column */}
          <div className="space-y-4">
            {leftItems.map((feature, index) => {
              const Icon = leftIcons[index % leftIcons.length];
              return (
                <Card3DTilt
                  key={feature.title}
                  maxTilt={5}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex items-start gap-5"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm font-light">{feature.description}</p>
                  </div>
                </Card3DTilt>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightItems.map((feature, index) => {
              const Icon = rightIcons[index % rightIcons.length];
              return (
                <Card3DTilt
                  key={feature.title}
                  maxTilt={5}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex items-start gap-5"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm font-light">{feature.description}</p>
                  </div>
                </Card3DTilt>
              );
            })}
          </div>
        </div>

        {/* Intelligence Image with Analytics UI */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={images.intelligence}
            alt="Flik Explorer Real-Time Sales Intelligence and Buyer Engagement Heatmaps"
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default IntelligenceSection;

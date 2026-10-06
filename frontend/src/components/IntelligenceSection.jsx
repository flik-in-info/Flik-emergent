import React from 'react';
import { Database, MousePointer, Flame, Users, Brain, Link2, Sparkles, Activity, LineChart, Target } from 'lucide-react';
import { intelligenceSection, images } from '../data/mock';

const LEFT_ICONS = [Database, MousePointer, Flame];
const RIGHT_ICONS = [Users, Brain, Link2];

const IntelligenceSection = () => {
  return (
    <section id="intelligence" className="relative py-32 bg-[#09090b] overflow-hidden">
      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{intelligenceSection.label} · BUYER TELEMETRY & CRM PIPELINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">{intelligenceSection.headline[0]}</span>
            <span className="block font-medium text-gradient-emerald">
              {intelligenceSection.headline[1]}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            {intelligenceSection.body}
          </p>
        </div>

        {/* Intelligence Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          
          {/* Left Column: Inventory & Unit Exploration */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400/90 mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>SPATIAL INTERACTION & INVENTORY SYNC</span>
            </div>

            {intelligenceSection.leftFeatures.map((feature, index) => {
              const Icon = LEFT_ICONS[index];
              return (
                <div
                  key={feature.title}
                  className="group relative p-6 rounded-2xl bg-white/[0.015] hover:bg-white/[0.035] border border-white/[0.06] hover:border-emerald-500/35 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                        DATA CHANNEL // 0{index + 1}
                      </div>
                      <h3 className="text-base font-medium text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Analytics & CRM Pipeline */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400/90 mb-2 flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>BUYER BEHAVIOR & CONVERSION PREDICTION</span>
            </div>

            {intelligenceSection.rightFeatures.map((feature, index) => {
              const Icon = RIGHT_ICONS[index];
              return (
                <div
                  key={feature.title}
                  className="group relative p-6 rounded-2xl bg-white/[0.015] hover:bg-white/[0.035] border border-white/[0.06] hover:border-emerald-500/35 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                        AI ENGINE // 0{index + 4}
                      </div>
                      <h3 className="text-base font-medium text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Analytics Dashboard Image with High-End HUD */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d10] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          <div className="px-6 py-3.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-gray-300 uppercase tracking-wider">
                LIVE SPATIAL HEATMAP & INTENT SCORING DASHBOARD
              </span>
            </div>
            <span className="text-emerald-400 text-[11px] font-mono">
              CRM INTEGRATIONS: SALESFORCE · LEADSQUARED · SELL.DO
            </span>
          </div>

          <div className="relative">
            <img
              src={images.intelligence}
              alt="Flik Explorer Real Estate Sales Intelligence & Buyer Analytics Dashboard"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent pointer-events-none" />

            {/* Floating HUD Chip */}
            <div className="absolute bottom-6 right-6 luxury-glass rounded-xl p-4 text-xs font-mono text-gray-300 border border-white/15 max-w-sm hidden sm:block">
              <div className="flex items-center justify-between gap-4 text-emerald-400 text-[10px] uppercase tracking-wider mb-1">
                <span>● BUYER INTENT PREDICTOR</span>
                <span>89% ACCURACY</span>
              </div>
              <div className="text-gray-400 text-[11px] leading-relaxed">
                Automatically detects when a high-net-worth buyer revisits a balcony view or floor plan 3+ times.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IntelligenceSection;
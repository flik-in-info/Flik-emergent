import React from 'react';
import { Box, Cloud, Smartphone, Cpu, Shield, Plug, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { technologySection } from '../data/mock';

const ICONS = [Box, Cloud, Smartphone, Cpu, Shield, Plug];

const TechnologySection = () => {
  return (
    <section id="technology" className="relative py-32 bg-[#09090b] overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTERPRISE ARCHITECTURE · REAL-TIME CLOUD COMPUTE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">{technologySection.headline[0]}</span>
            <span className="block font-medium text-gradient-emerald">
              {technologySection.headline[1]} {technologySection.headline[2]}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            {technologySection.body}
          </p>
        </div>

        {/* Capabilities Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {technologySection.capabilities.map((capability, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={capability.title}
                className="group relative p-7 rounded-2xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.06] hover:border-emerald-500/35 transition-all duration-400 flex flex-col justify-between"
              >
                {/* CAD crosshair */}
                <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-700 group-hover:text-emerald-500/60 transition-colors">
                  +
                </div>

                <div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 transition-all duration-400 group-hover:bg-emerald-500/20 group-hover:scale-105">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>

                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
                    SYS // 0{index + 1}
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {capability.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                    {capability.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-600">
                  <span>SLA 99.9%</span>
                  <span className="text-emerald-500/80">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform Architecture Diagram */}
        <div className="relative p-8 lg:p-10 rounded-2xl bg-white/[0.015] border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
              DATA FLOW PIPELINE
            </span>
            <h3 className="text-xl sm:text-2xl font-light text-white">
              End-to-End Enterprise Rendering Pipeline
            </h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Layer 1 */}
            <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center relative">
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">STAGE 01</div>
              <span className="text-white font-medium text-base block">Unreal Engine 5.4</span>
              <p className="text-emerald-300/80 text-xs mt-1">Lumen & Nanite Core</p>
            </div>
            
            {/* Layer 2 */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">STAGE 02</div>
              <span className="text-white font-medium text-base block">Cloud Stream Edge</span>
              <p className="text-gray-400 text-xs mt-1">Ultra-Low-Latency CDN</p>
            </div>
            
            {/* Layer 3 */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">STAGE 03</div>
              <span className="text-white font-medium text-base block">Spatial AI Telemetry</span>
              <p className="text-gray-400 text-xs mt-1">Lead & Heatmap Engine</p>
            </div>
            
            {/* Layer 4 */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">STAGE 04</div>
              <span className="text-white font-medium text-base block">Universal Endpoints</span>
              <p className="text-gray-400 text-xs mt-1">Mobile · iPad · 4K Walls</p>
            </div>
          </div>
          
          {/* Connection Lines on Desktop */}
          <div className="hidden lg:flex justify-between items-center mt-5 px-16">
            {['l1', 'l2', 'l3'].map((id) => (
              <div key={id} className="flex-1 h-px bg-gradient-to-r from-emerald-500/20 via-emerald-500/60 to-emerald-500/20" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechnologySection;
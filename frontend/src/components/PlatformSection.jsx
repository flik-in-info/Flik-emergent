import React from 'react';
import { Compass, BarChart3, Globe, Sparkles, Laptop, Smartphone, Tablet, Layers } from 'lucide-react';
import { platformSection, images } from '../data/mock';

const ICONS = [Compass, BarChart3, Globe];

const PlatformSection = () => {
  return (
    <section id="platform" className="relative py-32 bg-[#09090b] overflow-hidden">
      {/* Background Architectural Grid and Ambient Mesh Glow */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{platformSection.label} · ARCHITECTURAL OPERATING SYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">{platformSection.headline[0]}</span>
            <span className="block font-medium text-gradient-emerald">
              {platformSection.headline[1]}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            {platformSection.body}
          </p>
        </div>

        {/* Architectural Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {platformSection.features.map((feature, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl bg-white/[0.015] hover:bg-white/[0.035] border border-white/[0.07] hover:border-emerald-500/35 transition-all duration-400 flex flex-col justify-between"
              >
                {/* Top Corner CAD crosshair */}
                <div className="absolute top-3 right-3 text-[11px] font-mono text-gray-700 group-hover:text-emerald-500/60 transition-colors">
                  +
                </div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 transition-all duration-400 group-hover:bg-emerald-500/20 group-hover:scale-105">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>

                  <div className="text-[10px] font-mono text-emerald-400/90 uppercase tracking-widest mb-2">
                    LAYER // 0{index + 1}
                  </div>

                  <h3 className="text-xl font-medium text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span>LATENCY: ZERO-LAG</span>
                  <span className="text-emerald-400/80">READY</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Devices Showcase with High-Tech HUD Framing */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d10] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          
          {/* Top Bar on Image */}
          <div className="px-6 py-3.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-gray-300 uppercase tracking-wider">
                UNIVERSAL CROSS-DEVICE RUNTIME
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-gray-400 text-[11px]">
              <span className="flex items-center gap-1"><Smartphone className="w-3 h-3 text-emerald-400" /> Mobile</span>
              <span className="flex items-center gap-1"><Tablet className="w-3 h-3 text-emerald-400" /> iPad / Tablet</span>
              <span className="flex items-center gap-1"><Laptop className="w-3 h-3 text-emerald-400" /> Desktop / 4K Wall</span>
            </div>
          </div>

          <div className="relative">
            <img
              src={images.devices}
              alt="Flik Explorer Multi-Device Architectural Visualization on Mobile, Tablet and Desktop"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent pointer-events-none" />

            {/* Bottom floating chip */}
            <div className="absolute bottom-6 left-6 luxury-glass rounded-xl px-4 py-2.5 text-xs font-mono text-gray-300 border border-white/15 max-w-sm hidden sm:block">
              <div className="text-emerald-400 text-[10px] uppercase tracking-wider mb-0.5">
                ● 1-CLICK CLOUD STREAMING
              </div>
              <div className="text-gray-400 text-[11px]">
                Deliverable as a secure link over WhatsApp or email. No App Store downloads required.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PlatformSection;
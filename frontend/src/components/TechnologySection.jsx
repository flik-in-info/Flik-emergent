import React from 'react';
import { Box, Cloud, Smartphone, Cpu, Shield, Plug } from 'lucide-react';
import { technologySection } from '../data/mock';
import GlobalStreamingGlobe from './3d/GlobalStreamingGlobe';
import Card3DTilt from './3d/Card3DTilt';

const icons = [Box, Cloud, Smartphone, Cpu, Shield, Plug];

const TechnologySection = () => {
  return (
    <section id="technology" className="relative py-32 bg-[#0a0c0f]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34,229,90,0.15) 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest font-mono">
            {technologySection.label}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
          {technologySection.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Body */}
        <p className="text-lg text-gray-400 leading-relaxed mb-16 max-w-3xl font-light">
          {technologySection.body}
        </p>

        {/* Interactive 3D Globe + Capabilities Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left: 3D Holographic Globe */}
          <div className="lg:col-span-5">
            <GlobalStreamingGlobe />
          </div>

          {/* Right: Cloud Architecture Capabilities */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {technologySection.capabilities.map((capability, index) => {
              const Icon = icons[index % icons.length];
              return (
                <Card3DTilt
                  key={capability.title}
                  maxTilt={5}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center transition-all duration-300">
                        <Icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h3 className="text-base font-medium text-white">{capability.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{capability.description}</p>
                  </div>
                </Card3DTilt>
              );
            })}
          </div>
        </div>

        {/* Platform Architecture Diagram */}
        <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
          <h3 className="text-lg font-mono font-medium text-emerald-400 mb-6 text-center uppercase tracking-widest">
            End-to-End Pixel Streaming Architecture
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Layer 1 */}
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <span className="text-emerald-400 font-mono font-semibold text-sm">Unreal Engine 5</span>
              <p className="text-gray-300 text-xs mt-1">Lumen & Nanite Core</p>
            </div>

            {/* Layer 2 */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-white font-mono font-semibold text-sm">Cloud Pixel Cluster</span>
              <p className="text-gray-400 text-xs mt-1">GPU Edge Nodes</p>
            </div>

            {/* Layer 3 */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-white font-mono font-semibold text-sm">WebRTC Protocol</span>
              <p className="text-gray-400 text-xs mt-1">&lt;40ms Global Latency</p>
            </div>

            {/* Layer 4 */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-white font-mono font-semibold text-sm">WhatsApp & Browser</span>
              <p className="text-gray-400 text-xs mt-1">Zero App Downloads</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;

import React from 'react';
import { Box, Cloud, Smartphone, Cpu, Shield, Plug } from 'lucide-react';
import { technologySection } from '../data/mock';

const icons = [Box, Cloud, Smartphone, Cpu, Shield, Plug];

const TechnologySection = () => {
  return (
    <section id="technology" className="relative py-32 bg-[#0d0d0e]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">
            {technologySection.label}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
          {technologySection.headline.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Body */}
        <p className="text-lg text-gray-400 leading-relaxed mb-16 max-w-3xl">
          {technologySection.body}
        </p>

        {/* Capabilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologySection.capabilities.map((capability, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center transition-all duration-500 group-hover:bg-emerald-500/20">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">{capability.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{capability.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform Architecture Diagram */}
        <div className="mt-20">
          <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <h3 className="text-xl font-medium text-white mb-8 text-center">Platform Architecture</h3>
            
            <div className="grid md:grid-cols-4 gap-4">
              {/* Layer 1 */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-emerald-400 font-medium text-sm">Unreal Engine 5</span>
                <p className="text-gray-500 text-xs mt-1">Core Rendering</p>
              </div>
              
              {/* Layer 2 */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <span className="text-white font-medium text-sm">Cloud Infrastructure</span>
                <p className="text-gray-500 text-xs mt-1">Global CDN</p>
              </div>
              
              {/* Layer 3 */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <span className="text-white font-medium text-sm">AI Layer</span>
                <p className="text-gray-500 text-xs mt-1">Intelligence Engine</p>
              </div>
              
              {/* Layer 4 */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <span className="text-white font-medium text-sm">Device Endpoints</span>
                <p className="text-gray-500 text-xs mt-1">Multi-Platform</p>
              </div>
            </div>
            
            {/* Connection Lines */}
            <div className="hidden md:flex justify-between items-center mt-4 px-16">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex-1 h-px bg-gradient-to-r from-white/10 via-emerald-500/30 to-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
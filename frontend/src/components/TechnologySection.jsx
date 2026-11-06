import React from 'react';
import { Box, Cloud, Smartphone, Cpu, Shield, Plug } from 'lucide-react';
import { technologySection } from '../data/mock';
import TechStackShowcase from './TechStackShowcase';

const icons = [Box, Cloud, Smartphone, Cpu, Shield, Plug];

const TechnologySection = () => {
  return (
    <section id="technology" className="relative py-32 bg-[#0d0d0e]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">
            {technologySection.label}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
          {(technologySection.headline || []).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Body */}
        <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-3xl">
          {technologySection.body}
        </p>

        {/* Official Startup Programs Credibility Row */}
        <div className="mb-14 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono tracking-wider uppercase mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Official Accelerator & Grant Ecosystem
              </div>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                Flik Explorer is officially accelerated and backed by global frontier computing programs: NVIDIA Inception, AWS Activate, Claude Startups (Anthropic), and ElevenLabs Startup Grants.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
              <a
                href="https://www.nvidia.com/en-us/startups/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#76B900]/50 hover:bg-[#76B900]/5 transition-all duration-300 flex items-center justify-center focus:outline-none"
                title="NVIDIA Inception Program"
              >
                <img
                  src="/nvidia-inception-dark-badge.svg"
                  alt="NVIDIA Inception Program member badge"
                  className="h-7 sm:h-8 w-auto object-contain filter group-hover:brightness-110 transition-all"
                />
              </a>
              <a
                href="https://aws.amazon.com/startups/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#FF9900]/50 hover:bg-[#FF9900]/5 transition-all duration-300 flex items-center justify-center focus:outline-none"
                title="AWS Activate Startup Program"
              >
                <img
                  src="/aws-startups-program-badge.svg"
                  alt="AWS Activate Program member badge"
                  className="h-7 sm:h-8 w-auto object-contain filter group-hover:brightness-110 transition-all"
                />
              </a>
              <a
                href="https://www.anthropic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D97757]/50 hover:bg-[#D97757]/5 transition-all duration-300 flex items-center justify-center focus:outline-none"
                title="Claude Startups Program by Anthropic"
              >
                <img
                  src="/claude-startups-program-badge.svg"
                  alt="Claude Startups Program member badge"
                  className="h-7 sm:h-8 w-auto object-contain filter group-hover:brightness-110 transition-all"
                />
              </a>
              <a
                href="https://elevenlabs.io/startups"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 flex items-center justify-center focus:outline-none"
                title="ElevenLabs Startup Grants Program"
              >
                <img
                  src="/elevenlabs-grants-program-badge.svg"
                  alt="ElevenLabs Startup Grants recipient badge"
                  className="h-7 sm:h-8 w-auto object-contain filter group-hover:brightness-110 transition-all"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(technologySection.capabilities || []).map((capability, index) => {
            const Icon = icons[index] || Box;
            return (
              <div
                key={capability.title || index}
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
              {['l1', 'l2', 'l3'].map((id) => (
                <div key={id} className="flex-1 h-px bg-gradient-to-r from-white/10 via-emerald-500/30 to-white/10" />
              ))}
            </div>
          </div>
        </div>

        {/* Powered by Industry Leaders - Enterprise Technology Stack */}
        <TechStackShowcase />
      </div>
    </section>
  );
};

export default TechnologySection;

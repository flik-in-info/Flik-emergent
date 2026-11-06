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
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://www.nvidia.com/en-us/startups/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#76B900]/50 hover:bg-[#76B900]/5 transition-all duration-300 flex items-center gap-2.5 focus:outline-none"
                title="NVIDIA Inception Program"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] p-1.5 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="#76B900" aria-hidden="true">
                    <path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">NVIDIA</div>
                  <div className="text-[10px] font-mono text-gray-400">Inception</div>
                </div>
              </a>

              <a
                href="https://aws.amazon.com/startups/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF9900]/50 hover:bg-[#FF9900]/5 transition-all duration-300 flex items-center gap-2.5 focus:outline-none"
                title="AWS Activate Startup Program"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] p-1 flex items-center justify-center shrink-0">
                  <svg className="w-full h-auto" viewBox="0 0 24 20" fill="none" aria-hidden="true">
                    <path fill="#ffffff" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" />
                    <path fill="#ff9900" d="M21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607z" />
                    <path fill="#ff9900" d="M22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">AWS</div>
                  <div className="text-[10px] font-mono text-gray-400">Activate</div>
                </div>
              </a>

              <a
                href="https://www.anthropic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D97757]/50 hover:bg-[#D97757]/5 transition-all duration-300 flex items-center gap-2.5 focus:outline-none"
                title="Claude Startups Program by Anthropic"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] p-1.5 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path fill="#D97757" d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#e5947a] transition-colors">Claude</div>
                  <div className="text-[10px] font-mono text-gray-400">Startups</div>
                </div>
              </a>

              <a
                href="https://elevenlabs.io/startups"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 flex items-center gap-2.5 focus:outline-none"
                title="ElevenLabs Startup Grants Program"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] p-1.5 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.6035 0v24h4.9317V0zm9.8613 0v24h4.9317V0z" fill="#ffffff" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">ElevenLabs</div>
                  <div className="text-[10px] font-mono text-gray-400">Grants</div>
                </div>
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

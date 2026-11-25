import React from 'react';
import { Building2 } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';

const CLIENTS = [
  {
    id: 'ajmera',
    name: 'Ajmera Cityscapes',
    category: 'Flagship Deployment · Mumbai',
    logo: '/clients/ajmera-cityscapes.png',
    alt: 'Ajmera Cityscapes logo',
    scaleClass: 'max-h-[82%] max-w-[80%]',
    flagship: true,
  },
  {
    id: 'empire',
    name: 'Empire Developers',
    category: 'Luxury Developments',
    logo: '/clients/empire-developers.png',
    alt: 'Empire Developers logo',
    scaleClass: 'max-h-[72%] max-w-[84%]',
  },
  {
    id: 'nr-greenwood',
    name: 'NR Greenwood',
    category: 'Premium Communities',
    logo: '/clients/nr-greenwood.png',
    alt: 'NR Greenwood logo',
    scaleClass: 'max-h-[76%] max-w-[84%]',
  },
  {
    id: 'gajora',
    name: 'Gajora Infra',
    category: 'Urban Developments',
    logo: '/clients/gajora-infra.png',
    alt: 'Gajora Infra logo',
    scaleClass: 'max-h-[80%] max-w-[76%]',
  },
];

const ClientsSection = () => {
  return (
    <section
      id="clients"
      aria-label="Our Previous Clients"
      className="scroll-mt-24 relative py-9 lg:py-11 bg-[#030304] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Top Emerald Hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22E55A]/40 to-transparent"
      />

      {/* Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[780px] h-[200px] bg-[#22E55A]/[0.045] blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Architectural Gallery Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#22E55A] text-[11px] font-mono uppercase tracking-[0.22em] mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>07 · Trusted By Leading Developers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-[-0.02em] leading-tight">
              Built for teams shaping{' '}
              <span className="font-editorial italic font-normal text-gradient-emerald tracking-normal pr-1">
                modern skylines.
              </span>
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.09] text-[11px] font-mono text-gray-400 self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22E55A] animate-pulse" />
            <span>Selected Client Deployments</span>
          </div>
        </div>

        {/* 4-Column Architectural Client Plinths */}
        <div
          data-testid="clients-logo-grid"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4"
        >
          {CLIENTS.map((client) => (
            <SpotlightCard
              key={client.id}
              data-testid={`client-card-${client.id}`}
              className="rounded-2xl bg-[#09090d] border border-white/[0.09] hover:-translate-y-1 transition-all duration-300 glass-bezel flex flex-col"
            >
              <div className="flex flex-col h-full">
                {/* Crisp White Stage Preserving True Original Brand Colors */}
                <div className="relative h-24 sm:h-28 bg-gradient-to-b from-white via-[#fcfcfd] to-[#f2f4f7] px-4 sm:px-5 py-3 flex items-center justify-center overflow-hidden">
                  {client.flagship && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-600/25 text-[9px] font-mono uppercase tracking-wider text-emerald-700 font-semibold">
                      Live
                    </span>
                  )}
                  <img
                    src={client.logo}
                    alt={client.alt}
                    loading="lazy"
                    decoding="async"
                    className={`${client.scaleClass} w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105`}
                  />
                </div>

                {/* Obsidian Nameplate */}
                <div className="px-4 py-3.5 bg-[#09090d] border-t border-white/[0.07] flex items-center justify-between gap-2 flex-1">
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-white truncate group-hover:text-emerald-300 transition-colors">
                      {client.name}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-gray-500 truncate mt-0.5">
                      {client.category}
                    </div>
                  </div>
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                      client.flagship
                        ? 'bg-[#22E55A] animate-pulse'
                        : 'bg-emerald-500/50 group-hover:bg-[#22E55A]'
                    }`}
                  />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;

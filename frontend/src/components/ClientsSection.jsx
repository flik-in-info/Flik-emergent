import React from 'react';
import { Building2 } from 'lucide-react';

const CLIENTS = [
  {
    id: 'ajmera',
    name: 'Ajmera Cityscapes',
    category: 'Flagship Residences',
    logo: '/clients/ajmera-cityscapes.png',
    alt: 'Ajmera Cityscapes logo',
    scaleClass: 'max-h-[82%] max-w-[80%]'
  },
  {
    id: 'empire',
    name: 'Empire Developers',
    category: 'Luxury Developments',
    logo: '/clients/empire-developers.png',
    alt: 'Empire Developers logo',
    scaleClass: 'max-h-[72%] max-w-[84%]'
  },
  {
    id: 'nr-greenwood',
    name: 'NR Greenwood',
    category: 'Premium Communities',
    logo: '/clients/nr-greenwood.png',
    alt: 'NR Greenwood logo',
    scaleClass: 'max-h-[76%] max-w-[84%]'
  },
  {
    id: 'gajora',
    name: 'Gajora Infra',
    category: 'Urban Developments',
    logo: '/clients/gajora-infra.png',
    alt: 'Gajora Infra logo',
    scaleClass: 'max-h-[80%] max-w-[76%]'
  }
];

const ClientsSection = () => {
  return (
    <section
      id="clients"
      aria-label="Our Previous Clients"
      className="scroll-mt-20 relative py-12 lg:py-16 bg-[#060608] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Top Emerald Hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent"
      />

      {/* Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[220px] bg-emerald-500/[0.045] blur-[110px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-medium uppercase tracking-[0.2em] mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Trusted By Leading Developers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight leading-tight">
              Built for teams shaping modern skylines.
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-gray-400 self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Selected Client Deployments</span>
          </div>
        </div>

        {/* 4-Column Architectural Client Gallery */}
        <div
          data-testid="clients-logo-grid"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5"
        >
          {CLIENTS.map((client) => (
            <div
              key={client.id}
              data-testid={`client-card-${client.id}`}
              className="group rounded-2xl overflow-hidden bg-[#0e0e13] border border-white/10 hover:border-emerald-500/45 transition-all duration-300 hover:-translate-y-1 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.85),0_0_30px_-20px_rgba(16,185,129,0.2)] flex flex-col"
            >
              {/* Full-Bleed Crisp White Logo Stage Preserving True Original Brand Colors */}
              <div className="relative h-28 sm:h-32 md:h-36 bg-gradient-to-b from-white via-[#fcfcfd] to-[#f3f5f8] px-4 sm:px-6 py-4 flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.alt}
                  loading="lazy"
                  decoding="async"
                  className={`${client.scaleClass} w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105`}
                />
              </div>

              {/* Sleek Obsidian Nameplate */}
              <div className="px-3.5 sm:px-4 py-3 bg-[#0c0c10] border-t border-white/[0.07] flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-medium text-white truncate group-hover:text-emerald-300 transition-colors">
                    {client.name}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-gray-500 truncate">
                    {client.category}
                  </div>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 group-hover:bg-emerald-400 shrink-0 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;

import React from 'react';

const CLIENTS = [
  {
    id: 'ajmera',
    name: 'Ajmera Cityscapes',
    category: 'Flagship Live Deployment, Mumbai',
    logo: '/clients/ajmera-cityscapes.png',
    alt: 'Ajmera Cityscapes logo',
    scaleClass: 'max-h-[82%] max-w-[80%]',
  },
  {
    id: 'empire',
    name: 'Empire Developers',
    category: 'Luxury Residential Developments',
    logo: '/clients/empire-developers.png',
    alt: 'Empire Developers logo',
    scaleClass: 'max-h-[72%] max-w-[84%]',
  },
  {
    id: 'nr-greenwood',
    name: 'NR Greenwood',
    category: 'Premium Plotted & Residential Communities',
    logo: '/clients/nr-greenwood.png',
    alt: 'NR Greenwood logo',
    scaleClass: 'max-h-[76%] max-w-[84%]',
  },
  {
    id: 'gajora',
    name: 'Gajora Infra',
    category: 'Urban Residential Developments',
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
      className="scroll-mt-24 py-14 lg:py-20 bg-white border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <h2 className="text-3xl sm:text-4xl font-medium text-[#0b1020] tracking-[-0.03em]">
            Trusted by residential developers.
          </h2>
          <span className="text-xs font-mono text-slate-500">
            Selected developer deployments
          </span>
        </div>

        {/* Crisp Light Gallery Grid Preserving True Website Logo Colors */}
        <div
          data-testid="clients-logo-grid"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {CLIENTS.map((client) => (
            <div
              key={client.id}
              data-testid={`client-card-${client.id}`}
              className="group rounded-2xl border border-slate-200 bg-white hover:border-[#00A896]/50 hover:shadow-md transition-all flex flex-col overflow-hidden"
            >
              {/* True White Stage for Unmodified Website Brand Colors */}
              <div className="h-28 sm:h-32 bg-white px-5 py-4 flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.alt}
                  loading="lazy"
                  decoding="async"
                  className={`${client.scaleClass} w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105`}
                />
              </div>

              {/* Clean Typographic Caption */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex-1">
                <div className="text-sm font-semibold text-[#0b1020] group-hover:text-[#0F766E] transition-colors">
                  {client.name}
                </div>
                <div className="text-xs text-slate-500 mt-1 leading-snug">
                  {client.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;

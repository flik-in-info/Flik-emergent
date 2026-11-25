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
      className="scroll-mt-20 py-14 lg:py-16 bg-black border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-[-0.02em]">
            Trusted by residential developers.
          </h2>
          <span className="text-xs font-mono text-gray-400">
            Selected developer deployments
          </span>
        </div>

        {/* Architectural Grid Preserving True Original Website Logo Colors */}
        <div
          data-testid="clients-logo-grid"
          className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-white/15"
        >
          {CLIENTS.map((client) => (
            <div
              key={client.id}
              data-testid={`client-card-${client.id}`}
              className="group border-r border-b border-white/15 bg-[#08080a] flex flex-col"
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
              <div className="p-4 border-t border-white/10 flex-1">
                <div className="text-sm font-medium text-white group-hover:text-[#22E55A] transition-colors">
                  {client.name}
                </div>
                <div className="text-xs text-gray-500 mt-1 leading-snug">
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

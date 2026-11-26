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
      className="scroll-mt-20 py-14 lg:py-20 bg-white border-b border-black/15"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <h2 className="text-3xl sm:text-4xl font-medium text-black tracking-[-0.03em]">
            Trusted by residential developers.
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            Selected developer deployments
          </span>
        </div>

        {/* Architectural Grid Preserving Unmodified Website Logo Colors on Pure White */}
        <div
          data-testid="clients-logo-grid"
          className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-black/20"
        >
          {CLIENTS.map((client) => (
            <div
              key={client.id}
              data-testid={`client-card-${client.id}`}
              className="group border-r border-b border-black/20 bg-white flex flex-col"
            >
              {/* True White Stage */}
              <div className="h-28 sm:h-32 bg-white px-5 py-4 flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.alt}
                  loading="lazy"
                  decoding="async"
                  className={`${client.scaleClass} w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105`}
                />
              </div>

              {/* Clean Architectural Caption */}
              <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex-1">
                <div className="text-sm font-semibold text-black group-hover:underline decoration-[#22E55A] decoration-2 underline-offset-4">
                  {client.name}
                </div>
                <div className="text-xs text-neutral-500 mt-1 leading-snug">
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

import React, { useState } from 'react';
import { telemetry } from '../utils/telemetry';
import { Layers, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

const TECH_PARTNERS = [
  {
    id: 'unreal',
    name: 'Unreal Engine 5',
    category: 'Core 3D Engine',
    tag: 'Cinematic 3D',
    description: 'Nanite micro-polygon geometry & Lumen dynamic real-time global illumination for uncompromised architectural photorealism.',
    stats: '60 FPS Ultra-HD',
    icon: (
      <svg viewBox="0 0 100 100" className="w-9 h-9 fill-current">
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" />
        <path d="M50 18 L60 36 H53 L50 28 L47 36 H40 Z M32 38 H40 V58 C40 64 44 68 50 68 C56 68 60 64 60 58 V38 H68 V58 C68 70 59 78 50 78 C41 78 32 70 32 58 Z" />
      </svg>
    )
  },
  {
    id: 'nvidia',
    name: 'NVIDIA RTX',
    category: 'Neural Cloud GPU',
    tag: 'DLSS 3.5 & RTX',
    description: 'NVIDIA RTX Cloud streaming, DLSS 3.5 AI neural reconstruction, and hardware-accelerated real-time ray tracing on edge servers.',
    stats: 'Sub-50ms Latency',
    icon: (
      <svg viewBox="0 0 100 100" className="w-10 h-10 fill-current">
        <path d="M22 68 C16 60 16 48 24 38 C32 26 48 22 62 26 C72 29 80 37 84 46 C76 38 65 34 54 35 C42 36 32 44 30 55 C29 61 31 66 35 70 C29 71 25 70 22 68 Z M45 42 C54 41 62 46 66 53 C70 60 68 69 62 74 C56 79 46 80 38 75 C45 76 52 74 56 69 C60 64 59 58 55 53 C52 49 48 46 44 45 Z M10 50 C10 28 28 10 50 10 C68 10 83 22 88 39 C83 31 75 25 65 21 C50 15 32 19 20 30 C10 40 8 55 14 67 C11 62 10 56 10 50 Z" />
      </svg>
    )
  },
  {
    id: 'cesium',
    name: 'Cesium 3D',
    category: 'Geospatial & 3D Tiles',
    tag: '3D Tiles OGC',
    description: 'Open standard 3D Tiles streaming photorealistic terrain, contextual urban surroundings, and geospatial elevation models.',
    stats: 'Global Coverage',
    icon: (
      <svg viewBox="0 0 100 100" className="w-9 h-9 fill-current">
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="5" />
        <ellipse cx="50" cy="50" rx="22" ry="44" fill="none" stroke="currentColor" strokeWidth="5" />
        <line x1="6" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="5" />
        <ellipse cx="50" cy="50" rx="42" ry="18" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="8" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'Global Infrastructure',
    tag: 'Edge CDN',
    description: 'Amazon Web Services CloudFront edge CDN delivery, multi-region low latency, and 99.9% uptime enterprise SLA.',
    stats: '99.9% SLA',
    icon: (
      <svg viewBox="0 0 100 65" className="w-11 h-8 fill-current">
        <path d="M22 18 L26 38 H20 L18 29 H12 L10 38 H4 L8 18 H14 L18 26 L22 18 Z M40 18 L44 38 H38 L36 29 H30 L28 38 H22 L26 18 H32 L36 26 L40 18 Z M62 22 C62 20 59 18 55 18 C50 18 46 20 46 24 C46 28 50 30 55 31 C61 32 64 34 64 38 C64 42 59 45 53 45 C47 45 42 42 41 38 L47 36 C48 38 50 40 54 40 C57 40 59 39 59 37 C59 35 56 34 52 33 C46 32 41 30 41 25 C41 21 46 17 53 17 C58 17 62 19 63 22 Z" />
        <path d="M12 48 C28 58 56 60 78 46 C80 44 82 46 80 48 C55 65 24 63 8 52 C6 50 9 46 12 48 Z" />
        <path d="M74 42 L84 45 L78 54 Z" />
      </svg>
    )
  },
  {
    id: 'google-maps',
    name: 'Google 3D Maps',
    category: 'Photorealistic Urban Context',
    tag: 'Geospatial 3D',
    description: 'Photorealistic 3D city tiles, high-resolution satellite context, solar shadow analysis, and surrounding infrastructure mapping.',
    stats: '2,500+ Cities',
    icon: (
      <svg viewBox="0 0 100 100" className="w-9 h-9 fill-current">
        <path d="M68 40 C66 26 54 16 40 16 C28 16 18 24 14 36 C6 38 0 45 0 54 C0 64 8 72 18 72 H66 C75 72 82 65 82 56 C82 48 76 41 68 40 Z" fill="none" stroke="currentColor" strokeWidth="6" />
        <path d="M40 32 L40 56 M28 44 L40 32 L52 44" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'meta',
    name: 'Meta Quest & WebXR',
    category: 'Spatial VR Immersion',
    tag: 'WebXR & Quest',
    description: 'Zero-friction browser WebXR and untethered Meta Quest 3 spatial immersion for luxury developer sales lounges.',
    stats: 'Zero-Install VR',
    icon: (
      <svg viewBox="0 0 120 80" className="w-11 h-7 fill-current">
        <path d="M32 18 C18 18 8 30 8 44 C8 58 18 68 30 68 C42 68 51 56 60 45 C69 56 78 68 90 68 C102 68 112 58 112 44 C112 30 102 18 88 18 C76 18 67 30 60 41 C53 30 44 18 32 18 Z M32 30 C38 30 43 36 49 44 C43 52 38 56 31 56 C24 56 19 50 19 43 C19 36 24 30 32 30 Z M88 30 C96 30 101 36 101 43 C101 50 96 56 89 56 C82 56 77 52 71 44 C77 36 82 30 88 30 Z" />
      </svg>
    )
  },
  {
    id: 'apple',
    name: 'Apple Vision Pro',
    category: 'Spatial Computing',
    tag: 'visionOS',
    description: 'Native ultra-high density spatial computing and spatial audio rendering for ultra-HNW architectural presentations.',
    stats: '4K Per Eye',
    icon: (
      <svg viewBox="0 0 100 100" className="w-9 h-9 fill-current">
        <path d="M62 16 C66 11 68 5 67 0 C61 1 54 5 50 10 C46 14 43 21 44 26 C51 27 58 21 62 16 Z M76 65 C71 73 66 82 58 82 C51 82 48 77 40 77 C32 77 28 82 21 82 C14 82 8 71 3 60 C-4 44 1 29 13 29 C21 29 26 34 32 34 C37 34 41 29 50 29 C56 29 67 30 73 38 C60 45 62 61 76 65 Z" />
      </svg>
    )
  },
  {
    id: 'autodesk',
    name: 'Autodesk BIM',
    category: 'CAD / BIM Interop',
    tag: 'Revit & 3ds Max',
    description: 'Direct pipeline synchronization with Revit, 3ds Max, and IFC BIM models for instant architectural updates without remodelling.',
    stats: 'Live BIM Sync',
    icon: (
      <svg viewBox="0 0 100 100" className="w-9 h-9 fill-current">
        <path d="M50 8 L90 85 H70 L50 42 L30 85 H10 L50 8 Z M50 56 L62 82 H38 L50 56 Z" />
      </svg>
    )
  },
  {
    id: 'matterport',
    name: 'Matterport & Scans',
    category: 'Digital Twin LiDAR',
    tag: 'Reality Capture',
    description: 'Sub-centimeter LiDAR reality capture for as-built verification, construction milestone tracking, and physical sample flats.',
    stats: '0.1% Tolerance',
    icon: (
      <svg viewBox="0 0 100 100" className="w-9 h-9 fill-current">
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="50" cy="50" r="8" fill="currentColor" />
        <line x1="50" y1="6" x2="50" y2="26" stroke="currentColor" strokeWidth="6" />
        <line x1="50" y1="74" x2="50" y2="94" stroke="currentColor" strokeWidth="6" />
        <line x1="6" y1="50" x2="26" y2="50" stroke="currentColor" strokeWidth="6" />
        <line x1="74" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="6" />
      </svg>
    )
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs AI',
    category: 'Generative Audio Intelligence',
    tag: 'Multilingual Voice',
    description: 'Ultra-low latency multilingual AI architectural narration, dynamically guiding buyers through unit floorplans in their native language.',
    stats: '29+ Languages',
    icon: (
      <svg viewBox="0 0 100 80" className="w-9 h-7 fill-current">
        <rect x="26" y="12" width="16" height="56" rx="8" />
        <rect x="58" y="12" width="16" height="56" rx="8" />
      </svg>
    )
  },
  {
    id: 'samsung',
    name: 'Samsung Enterprise',
    category: 'Experience Center Displays',
    tag: 'The Wall MicroLED',
    description: 'Ultra-wide The Wall MicroLED displays and high-precision capacitive touchscreens for developer experiential galleries.',
    stats: '8K HDR Native',
    icon: (
      <span className="font-black tracking-[0.2em] text-sm sm:text-base font-sans uppercase">
        SAMSUNG
      </span>
    )
  },
  {
    id: 'epson',
    name: 'Epson Pro Laser',
    category: 'Immersive Projection',
    tag: 'Cave Mapping',
    description: 'High-lumen 4K 3LCD laser projection systems for 270° and 360° cave projection sales galleries.',
    stats: '30,000 Lumens',
    icon: (
      <span className="font-extrabold tracking-[0.18em] text-sm sm:text-base font-sans uppercase">
        EPSON
      </span>
    )
  }
];

const TechStackShowcase = () => {
  const [activePartner, setActivePartner] = useState(null);

  const handlePartnerClick = (partner) => {
    setActivePartner(partner.id === activePartner ? null : partner.id);
    telemetry.ctaClick(`tech_stack_${partner.id}`);
  };

  return (
    <div className="mt-28 pt-20 border-t border-white/5 relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Enterprise Integration Matrix
        </div>
        
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight">
          Powered by Industry Leaders
        </h3>
        
        <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed">
          Enterprise-Grade Technology Stack for Maximum Performance, Cinematic Fidelity & Sub-Second Global Streaming
        </p>
      </div>

      {/* Partner Constellation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 relative">
        {TECH_PARTNERS.map((partner) => {
          const isActive = activePartner === partner.id;
          return (
            <div
              key={partner.id}
              onClick={() => handlePartnerClick(partner)}
              className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-sm overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-white/[0.06] border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30'
                  : 'bg-white/[0.02] border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04]'
              }`}
            >
              {/* Subtle top indicator bar */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                isActive ? 'bg-emerald-400' : 'bg-transparent group-hover:bg-emerald-500/30'
              }`} />

              <div>
                {/* Logo & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`transition-all duration-300 ${
                    isActive ? 'text-emerald-400 scale-105' : 'text-gray-400 group-hover:text-white'
                  }`}>
                    {partner.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5 group-hover:border-emerald-500/20 group-hover:text-emerald-400/80 transition-colors">
                    {partner.tag}
                  </span>
                </div>

                {/* Name */}
                <h4 className="text-base font-medium text-white mb-1 group-hover:text-emerald-300 transition-colors">
                  {partner.name}
                </h4>

                {/* Subcategory */}
                <p className="text-xs text-emerald-400/80 font-mono mb-3">
                  {partner.category}
                </p>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
                  {partner.description}
                </p>
              </div>

              {/* Bottom Stat Footer */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <span className="font-mono text-emerald-400/90 font-medium">{partner.stats}</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 group-hover:text-white/60 transition-colors">
                  Verified Stack
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Compliance Banner */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/[0.03] via-white/[0.02] to-emerald-500/[0.03] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-medium text-white">Direct Engine & Cloud Architecture</h5>
            <p className="text-xs text-gray-400 mt-0.5">
              Built on certified enterprise protocols with 99.9% uptime SLA, SOC 2 compliance, and zero third-party telemetry leakage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400 flex-shrink-0">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 font-mono">
            Unreal 5.4+
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 font-mono">
            RTX Cloud
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 font-mono">
            Cesium OGC
          </span>
        </div>
      </div>
    </div>
  );
};

export default TechStackShowcase;

import React, { useState, useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';
import { telemetry } from '../utils/telemetry';
import {
  UnrealEngineLogo,
  EpicGamesLogo,
  NvidiaLogo,
  AwsLogo,
  CesiumLogo,
  GoogleMapsLogo,
  MetaLogo,
  AppleLogo,
  AutodeskLogo,
  ElevenLabsLogo,
  SamsungLogo,
  EpsonLogo,
  AnthropicLogo,
  MatterportEmblem,
} from './TechLogos';

const TECH_PARTNERS = [
  {
    id: 'unreal',
    name: 'Unreal Engine 5',
    category: 'Core 3D Engine',
    layer: '3d',
    tag: 'Nanite & Lumen',
    stats: '60 FPS Ultra-HD',
    description:
      'Virtual micro-polygon geometry and dynamic global illumination delivering interactive interior photography directly across standard browsers.',
    Logo: UnrealEngineLogo,
    logoClass: 'w-8 h-8',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA RTX',
    category: 'Neural Cloud GPU',
    layer: '3d',
    tag: 'DLSS 3.5 & RTX',
    stats: 'Sub-50ms Latency',
    description:
      'DLSS 3.5 ray reconstruction and dedicated GPU servers streaming interactive scenes to laptops and phones worldwide.',
    Logo: NvidiaLogo,
    logoClass: 'w-8 h-8',
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'Global Infrastructure',
    layer: 'cloud',
    tag: 'Edge Delivery',
    stats: '99.9% SLA',
    description:
      'Amazon CloudFront edge nodes ensuring NRI buyers across London, Dubai, and Singapore open full projects smoothly.',
    Logo: AwsLogo,
    logoClass: 'w-9 h-8',
  },
  {
    id: 'anthropic',
    name: 'Claude AI',
    category: 'Spatial Reasoning',
    layer: 'ai',
    tag: 'Claude Startups',
    stats: 'Claude 3.7 Sonnet',
    description:
      'Natural language sales copilot helping advisors inspect sunlight hours, floor specs, and skyline proximity live.',
    Logo: AnthropicLogo,
    logoClass: 'w-8 h-8',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs AI',
    category: 'Generative Audio',
    layer: 'ai',
    tag: 'Multilingual Voice',
    stats: '29+ Languages',
    description:
      'Low-latency voice synthesis guiding international buyers through apartment balconies, lobbies, and layouts naturally.',
    Logo: ElevenLabsLogo,
    logoClass: 'w-8 h-8',
  },
  {
    id: 'google-maps',
    name: 'Google 3D Maps',
    category: 'Photorealistic Context',
    layer: 'cloud',
    tag: 'Geospatial 3D',
    stats: '2,500+ Cities',
    description:
      'Surrounding city blocks, arterial roads, and neighborhood context aligned strictly to tower plot coordinates.',
    Logo: GoogleMapsLogo,
    logoClass: 'w-8 h-8',
  },
  {
    id: 'cesium',
    name: 'Cesium 3D',
    category: 'Geospatial & 3D Tiles',
    layer: 'cloud',
    tag: '3D Tiles OGC',
    stats: 'Global Coverage',
    description:
      'WGS84 earth terrain and open-standard 3D Tiles anchoring true view corridors across 40+ residential floors.',
    Logo: CesiumLogo,
    logoClass: 'w-8 h-8',
  },
  {
    id: 'autodesk',
    name: 'Autodesk BIM',
    category: 'CAD / BIM Pipeline',
    layer: '3d',
    tag: 'Revit & 3ds Max',
    stats: 'Live BIM Sync',
    description:
      'Direct ingestion of architectural CAD, Revit, and BIM blueprints for rapid 2 to 4 week developer deployments.',
    Logo: AutodeskLogo,
    logoClass: 'w-8 h-8',
  },
  {
    id: 'apple',
    name: 'Apple Vision Pro',
    category: 'Spatial Computing',
    layer: 'spatial',
    tag: 'visionOS',
    stats: '8K Stereo Optics',
    description:
      'High-density spatial walkthrough support tailored for flagship luxury lounges and private promoter suites.',
    Logo: AppleLogo,
    logoClass: 'w-8 h-8',
  },
  {
    id: 'samsung',
    name: 'Samsung Enterprise',
    category: 'Gallery MicroLED',
    layer: 'spatial',
    tag: 'The Wall Display',
    stats: '8K HDR Native',
    description:
      'Synchronized multi-panel sales lounge MicroLED walls paired seamlessly with handheld buyer tablets.',
    Logo: SamsungLogo,
    logoClass: 'w-12 h-7',
  },
  {
    id: 'epic',
    name: 'Epic Games',
    category: 'Engine Ecosystem',
    layer: '3d',
    tag: 'Quixel Megascans',
    stats: 'Sub-Pixel PBR',
    description:
      'Physically scanned Italian marble, brushed metal, and timber surface libraries running across real-time pipelines.',
    Logo: EpicGamesLogo,
    logoClass: 'w-8 h-8',
  },
  {
    id: 'meta',
    name: 'Meta Quest',
    category: 'Untethered WebXR',
    layer: 'spatial',
    tag: 'Zero-Install VR',
    stats: '90Hz Refresh',
    description:
      'Browser WebXR compatibility for developer site centers and remote family decision walkthroughs.',
    Logo: MetaLogo,
    logoClass: 'w-9 h-8',
  },
  {
    id: 'matterport',
    name: 'Matterport Scans',
    category: 'LiDAR Reality Capture',
    layer: '3d',
    tag: 'As-Built Capture',
    stats: '0.1% Tolerance',
    description:
      'Sub-centimeter LiDAR structural captures synced cleanly alongside pre-launch unit environments.',
    Logo: MatterportEmblem,
    logoClass: 'w-8 h-8',
  },
  {
    id: 'epson',
    name: 'Epson Pro Laser',
    category: 'Cave Projection',
    layer: 'spatial',
    tag: 'Multi-Surface',
    stats: '30,000 Lumens',
    description:
      'Multi-projector optical blending engineered for wrap-around architectural screening rooms at sales galleries.',
    Logo: EpsonLogo,
    logoClass: 'w-12 h-7',
  },
];

const ARCHITECTURE_LAYERS = [
  { id: 'all', label: 'All Stack' },
  { id: '3d', label: 'Engine & BIM' },
  { id: 'cloud', label: 'Cloud & Context' },
  { id: 'spatial', label: 'Gallery Hardware' },
  { id: 'ai', label: 'AI Intelligence' },
];

const TechStackShowcase = () => {
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [activePartnerId, setActivePartnerId] = useState('unreal');

  const filteredPartners = useMemo(() => {
    if (selectedLayer === 'all') return TECH_PARTNERS;
    return TECH_PARTNERS.filter((p) => p.layer === selectedLayer);
  }, [selectedLayer]);

  return (
    <div id="industry-leaders">
      {/* Header + Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-medium text-black tracking-[-0.03em] leading-[1.06]">
            Powered by industry leaders.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2.5 max-w-2xl">
            Every architectural partner and cloud protocol powering photorealistic rendering, geospatial terrain accuracy, and sub-second browser delivery.
          </p>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-1 border border-black bg-white p-1 shrink-0">
          {ARCHITECTURE_LAYERS.map((layer) => {
            const isCurrent = selectedLayer === layer.id;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => {
                  setSelectedLayer(layer.id);
                  telemetry.ctaClick(`tech_layer_${layer.id}`);
                }}
                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-[#22E55A] text-black font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {layer.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Original 4-Column Partner Grid with Strict Flik Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-black/20 bg-white">
        {filteredPartners.map((partner) => {
          const isActive = activePartnerId === partner.id;
          const LogoComp = partner.Logo;
          return (
            <button
              key={partner.id}
              type="button"
              onClick={() => {
                setActivePartnerId(partner.id);
                telemetry.ctaClick(`tech_stack_${partner.id}`);
              }}
              className={`group text-left p-6 border-r border-b border-black/20 flex flex-col justify-between transition-colors cursor-pointer relative ${
                isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className={isActive ? 'text-[#22E55A]' : 'text-black'}>
                    <LogoComp className={partner.logoClass} />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${
                      isActive
                        ? 'border-white/25 text-neutral-300'
                        : 'border-neutral-200 text-neutral-500'
                    }`}
                  >
                    {partner.tag}
                  </span>
                </div>

                <h3 className={`text-base font-semibold ${isActive ? 'text-white' : 'text-black'}`}>
                  {partner.name}
                </h3>

                <div
                  className={`text-xs font-mono mt-0.5 mb-3 ${
                    isActive ? 'text-[#22E55A]' : 'text-neutral-500'
                  }`}
                >
                  {partner.category}
                </div>

                <p
                  className={`text-xs leading-relaxed ${
                    isActive ? 'text-neutral-300' : 'text-neutral-600'
                  }`}
                >
                  {partner.description}
                </p>
              </div>

              <div
                className={`mt-5 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
                  isActive ? 'border-white/15' : 'border-neutral-200'
                }`}
              >
                <span className={isActive ? 'text-[#22E55A] font-semibold' : 'text-black font-medium'}>
                  {partner.stats}
                </span>
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                    isActive ? 'bg-[#22E55A] text-black' : 'text-neutral-500'
                  }`}
                >
                  Verified
                </span>
              </div>
            </button>
          );
        })}

        {/* Completing 14 + 2 = 16 Architectural Grid Cells on All Stack View */}
        {selectedLayer === 'all' && (
          <div className="sm:col-span-2 p-6 sm:p-8 border-r border-b border-black/20 bg-black text-white flex flex-col justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#22E55A] text-black flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white">
                  Direct Engine & Cloud Architecture
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 leading-relaxed max-w-lg">
                  Built on production protocols with dedicated GPU streaming, zero client installs, and strict B2B asset isolation for Hastok Enterprise Pvt. Ltd. deployments.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="px-3 py-1 bg-white/10 text-white">Unreal 5.4+</span>
              <span className="px-3 py-1 bg-[#22E55A] text-black font-semibold">RTX Cloud</span>
              <span className="px-3 py-1 bg-white/10 text-white">Cesium OGC</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStackShowcase;

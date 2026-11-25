import React, { useState, useMemo } from 'react';
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
    vendor: 'Epic Games',
    category: 'Graphics Engine',
    layer: '3d',
    spec: 'Nanite & Lumen at 60 FPS',
    description:
      'Virtual micro-polygon geometry and dynamic global illumination delivering interactive interior photography directly across standard browsers.',
    Logo: UnrealEngineLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA RTX',
    vendor: 'NVIDIA Corporation',
    category: 'GPU Streaming',
    layer: '3d',
    spec: 'NVIDIA Inception Member',
    description:
      'DLSS 3.5 AI ray reconstruction and dedicated GPU servers streaming interactive scenes to laptops and phones under 50ms latency.',
    Logo: NvidiaLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    vendor: 'Amazon Web Services',
    category: 'Edge Infrastructure',
    layer: 'cloud',
    spec: 'AWS Activate Program',
    description:
      'CloudFront edge nodes spanning global metropolitan regions ensure overseas buyers open high-resolution tours without lag.',
    Logo: AwsLogo,
    logoClass: 'w-8 h-7',
  },
  {
    id: 'anthropic',
    name: 'Claude AI',
    vendor: 'Anthropic PBC',
    category: 'Spatial Reasoning',
    layer: 'ai',
    spec: 'Claude Startups Program',
    description:
      'Natural language copilot intelligence helping developer sales executives query sunlight hours, floor specs, and skyline proximity.',
    Logo: AnthropicLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs AI',
    vendor: 'ElevenLabs Inc.',
    category: 'Voice Synthesis',
    layer: 'ai',
    spec: 'Startup Grants Recipient',
    description:
      'Low-latency multilingual voice narration guiding buyers through balconies, clubhouses, and layouts across 29 languages.',
    Logo: ElevenLabsLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'google-maps',
    name: 'Google 3D Maps',
    vendor: 'Google Cloud Geospatial',
    category: 'Urban Context',
    layer: 'cloud',
    spec: 'Photorealistic 3D Tiles',
    description:
      'Surrounding city blocks, arterial roads, and skyline context calibrated precisely to tower plot coordinates and floor height.',
    Logo: GoogleMapsLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'cesium',
    name: 'Cesium 3D',
    vendor: 'Cesium GS',
    category: 'Geospatial Terrain',
    layer: 'cloud',
    spec: 'OGC 3D Standard',
    description:
      'Precision terrain elevation models and coastline contours rendered seamlessly around major residential masterplans.',
    Logo: CesiumLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'autodesk',
    name: 'Autodesk BIM',
    vendor: 'Autodesk Inc.',
    category: 'CAD Interoperability',
    layer: '3d',
    spec: 'Revit & 3ds Max Sync',
    description:
      'Direct architectural model ingestion from developer Revit, CAD, and IFC schedules into the interactive viewer within weeks.',
    Logo: AutodeskLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'apple',
    name: 'Apple Vision Pro',
    vendor: 'Apple Inc.',
    category: 'Spatial Computing',
    layer: 'spatial',
    spec: 'visionOS Ready',
    description:
      'High-density spatial apartment walkthroughs tailored for private penthouse client previews in developer sales suites.',
    Logo: AppleLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'samsung',
    name: 'Samsung Enterprise',
    vendor: 'Samsung Electronics',
    category: 'Experience Galleries',
    layer: 'spatial',
    spec: 'The Wall MicroLED',
    description:
      'Native calibration for wide-format sales center LED walls and multi-touch negotiation tables.',
    Logo: SamsungLogo,
    logoClass: 'w-11 h-6',
  },
  {
    id: 'epic',
    name: 'Epic Games',
    vendor: 'Epic Ecosystem',
    category: 'Material Library',
    layer: '3d',
    spec: 'Megascans PBR',
    description:
      'Scanned physical stone, travertine, walnut timber, and low-iron glass shaders reflecting authentic architectural materials.',
    Logo: EpicGamesLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'meta',
    name: 'Meta Quest',
    vendor: 'Meta Platforms',
    category: 'WebXR Support',
    layer: 'spatial',
    spec: 'Zero-Install Browser VR',
    description:
      'Untethered headset compatibility directly inside sales galleries without desktop cables or proprietary installations.',
    Logo: MetaLogo,
    logoClass: 'w-8 h-7',
  },
  {
    id: 'matterport',
    name: 'Matterport Scans',
    vendor: 'Matterport Inc.',
    category: 'Reality Capture',
    layer: '3d',
    spec: 'Sub-Centimeter LiDAR',
    description:
      'As-built structural milestone capture linked alongside under-construction interactive tower floors.',
    Logo: MatterportEmblem,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'epson',
    name: 'Epson Pro Laser',
    vendor: 'Epson America',
    category: 'Projection Rooms',
    layer: 'spatial',
    spec: 'Multi-Surface Blending',
    description:
      'Edge-blended curved projection alignment designed for darkroom architectural screening rooms.',
    Logo: EpsonLogo,
    logoClass: 'w-11 h-6',
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
  const [activePartnerId, setActivePartnerId] = useState('unreal');
  const [selectedLayer, setSelectedLayer] = useState('all');

  const filteredPartners = useMemo(() => {
    if (selectedLayer === 'all') return TECH_PARTNERS;
    return TECH_PARTNERS.filter((p) => p.layer === selectedLayer);
  }, [selectedLayer]);

  const activePartner = useMemo(() => {
    return (
      filteredPartners.find((p) => p.id === activePartnerId) ||
      filteredPartners[0] ||
      TECH_PARTNERS[0]
    );
  }, [filteredPartners, activePartnerId]);

  const ActiveLogo = activePartner.Logo;

  return (
    <div id="industry-leaders">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-[-0.025em] leading-[1.1]">
            Engineering stack and integrations.
          </h2>
          <p className="text-sm text-gray-400 font-light mt-2 max-w-xl">
            Powered directly by Unreal Engine 5, NVIDIA GPU cloud streaming, AWS global delivery, and Autodesk BIM workflows.
          </p>
        </div>

        {/* Clean Tab Line */}
        <div className="flex flex-wrap items-center gap-1 border border-white/15 bg-black p-1">
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
                className={`px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-white text-black font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {layer.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Protocol Spec Bar */}
      <div className="border border-white/15 bg-[#070709] p-6 sm:p-8 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-white/15 bg-black flex items-center justify-center shrink-0 text-white">
            <ActiveLogo className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1.5">
              <h3 className="text-lg sm:text-xl font-medium text-white">
                {activePartner.name}
              </h3>
              <span className="text-xs font-mono text-[#22E55A]">
                {activePartner.spec}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-2xl">
              {activePartner.description}
            </p>
          </div>
        </div>

        <div className="lg:text-right border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6 shrink-0">
          <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500">
            Architecture Layer
          </div>
          <div className="text-sm font-medium text-white mt-0.5">
            {activePartner.category}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{activePartner.vendor}</div>
        </div>
      </div>

      {/* Architectural Grid Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 border-t border-l border-white/15">
        {filteredPartners.map((partner) => {
          const isSelected = activePartner.id === partner.id;
          const LogoComp = partner.Logo;
          return (
            <button
              key={partner.id}
              type="button"
              onClick={() => {
                setActivePartnerId(partner.id);
                telemetry.ctaClick(`tech_partner_${partner.id}`);
              }}
              onMouseEnter={() => setActivePartnerId(partner.id)}
              className={`p-4 border-r border-b border-white/15 text-left flex flex-col justify-between gap-4 transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-white text-black'
                  : 'bg-[#040406] text-gray-400 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <div>
                <LogoComp className={partner.logoClass} />
              </div>
              <div>
                <div className={`text-xs font-medium truncate ${isSelected ? 'text-black' : 'text-white'}`}>
                  {partner.name}
                </div>
                <div className={`text-[10px] font-mono truncate mt-0.5 ${isSelected ? 'text-black/70' : 'text-gray-500'}`}>
                  {partner.category}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TechStackShowcase;

import React, { useState, useMemo } from 'react';
import { telemetry } from '../utils/telemetry';
import {
  Activity,
  Zap,
  Sparkles,
  Cpu,
  Globe2,
  Eye,
  Layers,
  CheckCircle2,
} from 'lucide-react';
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
import SpotlightCard from './ui/SpotlightCard';

const TECH_PARTNERS = [
  {
    id: 'unreal',
    name: 'Unreal Engine 5',
    vendor: 'Epic Games',
    category: 'Core 3D Engine',
    layer: '3d',
    tag: 'Nanite & Lumen 5.4+',
    description:
      'Nanite virtualized micro-polygon geometry and Lumen dynamic real-time global illumination delivering architectural photorealism at a locked 60 FPS.',
    stats: '60 FPS Ultra-HD',
    latency: '< 16.6ms frame',
    accent: '#00a2ff',
    glow: 'rgba(0, 162, 255, 0.35)',
    Logo: UnrealEngineLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA RTX',
    vendor: 'NVIDIA Corporation',
    category: 'Neural Cloud Streaming',
    layer: '3d',
    tag: 'DLSS 3.5 & RTX Cloud',
    description:
      'Official NVIDIA Inception member architecture, DLSS 3.5 AI ray reconstruction, and RTX cloud GPUs streaming interactive 3D with sub-50ms latency.',
    stats: 'Sub-50ms Latency',
    latency: 'DLSS 3.5 Neural',
    accent: '#76b900',
    glow: 'rgba(118, 185, 0, 0.38)',
    Logo: NvidiaLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    vendor: 'Amazon Web Services',
    category: 'Global Edge Delivery',
    layer: 'cloud',
    tag: 'CloudFront Edge CDN',
    description:
      'AWS Activate enterprise cloud delivery across 90+ global metropolitan hubs, multi-region failover clusters, and 99.9% uptime guarantees for NRI buyers.',
    stats: '99.9% Uptime SLA',
    latency: '300+ Edge POPs',
    accent: '#ff9900',
    glow: 'rgba(255, 153, 0, 0.35)',
    Logo: AwsLogo,
    logoClass: 'w-8 h-7',
  },
  {
    id: 'anthropic',
    name: 'Claude AI',
    vendor: 'Anthropic PBC',
    category: 'Spatial Reasoning Engine',
    layer: 'ai',
    tag: 'Claude Startups Program',
    description:
      'Natural language spatial intelligence helping sales teams and buyers answer complex questions on sunlight hours, view corridors, dimensions, and pricing.',
    stats: 'Context Intelligence',
    latency: 'Real-Time Insights',
    accent: '#D97757',
    glow: 'rgba(217, 119, 87, 0.38)',
    Logo: AnthropicLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs AI',
    vendor: 'ElevenLabs Inc.',
    category: 'Generative Voice',
    layer: 'ai',
    tag: 'Multilingual Narration',
    description:
      'Ultra-low latency multilingual AI architectural narration, guiding prospective buyers through unit layouts and balcony views across 29+ languages.',
    stats: '29+ Languages',
    latency: '< 150ms Voice Sync',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.38)',
    Logo: ElevenLabsLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'google-maps',
    name: 'Google 3D Maps',
    vendor: 'Google Cloud Geospatial',
    category: 'Urban 3D Context',
    layer: 'cloud',
    tag: 'Photorealistic 3D Tiles',
    description:
      'Direct ingestion of Google Photorealistic 3D city mesh, surrounding skylines, infrastructure, and true-to-life floor-altitude vista verification.',
    stats: '2,500+ Cities',
    latency: 'Live API Sync',
    accent: '#4285f4',
    glow: 'rgba(66, 133, 244, 0.35)',
    Logo: GoogleMapsLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'cesium',
    name: 'Cesium 3D',
    vendor: 'Cesium GS',
    category: 'Geospatial 3D Tiles',
    layer: 'cloud',
    tag: 'OGC 3D Standard',
    description:
      'Open-standard 3D Tiles streaming high-precision terrain, digital elevation models, and surrounding urban masterplans without manual decimation.',
    stats: 'Global Coverage',
    latency: '1.4 GB/s Stream',
    accent: '#00d4b8',
    glow: 'rgba(0, 212, 184, 0.35)',
    Logo: CesiumLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'autodesk',
    name: 'Autodesk BIM',
    vendor: 'Autodesk Inc.',
    category: 'CAD & BIM Pipeline',
    layer: '3d',
    tag: 'Revit & 3ds Max Sync',
    description:
      'Direct pipeline synchronization with Revit, 3ds Max, and IFC architectural CAD models for rapid design revisions before construction hits podium level.',
    stats: 'Live BIM Sync',
    latency: 'Zero Data Loss',
    accent: '#ff334b',
    glow: 'rgba(255, 51, 75, 0.35)',
    Logo: AutodeskLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'apple',
    name: 'Apple Vision Pro',
    vendor: 'Apple Inc.',
    category: 'Spatial Computing',
    layer: 'spatial',
    tag: 'visionOS Native',
    description:
      'High-density spatial computing and acoustic staging tailored for ultra-high-net-worth private viewings, penthouses, and flagship galleries.',
    stats: '4K Micro-OLED',
    latency: '12ms Motion Sync',
    accent: '#e2e8f0',
    glow: 'rgba(226, 232, 240, 0.3)',
    Logo: AppleLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'samsung',
    name: 'Samsung Enterprise',
    vendor: 'Samsung Electronics',
    category: 'Sales Gallery Displays',
    layer: 'spatial',
    tag: 'The Wall MicroLED',
    description:
      'Native calibration for ultra-wide The Wall MicroLED cinema displays and multi-touch negotiation tables inside physical developer experience lounges.',
    stats: '8K HDR Native',
    latency: '120Hz Refresh',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.35)',
    Logo: SamsungLogo,
    logoClass: 'w-11 h-6',
  },
  {
    id: 'epic',
    name: 'Epic Games',
    vendor: 'Epic Games Ecosystem',
    category: 'Runtime Shaders',
    layer: '3d',
    tag: 'Unreal Enterprise',
    description:
      'Megascans physical photogrammetry materials and custom PBR architectural shaders for marble, brushed brass, timber, and low-iron glass.',
    stats: 'Enterprise License',
    latency: 'Sub-Pixel PBR',
    accent: '#e5e7eb',
    glow: 'rgba(255, 255, 255, 0.25)',
    Logo: EpicGamesLogo,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'meta',
    name: 'Meta Quest',
    vendor: 'Meta Platforms',
    category: 'Untethered VR',
    layer: 'spatial',
    tag: 'Zero-Install WebXR',
    description:
      'Browser WebXR and untethered stereoscopic spatial tours tailored for developer experience centers and remote family walkthrough sessions.',
    stats: 'Zero-Install VR',
    latency: '90Hz Refresh',
    accent: '#0081fb',
    glow: 'rgba(0, 129, 251, 0.35)',
    Logo: MetaLogo,
    logoClass: 'w-8 h-7',
  },
  {
    id: 'matterport',
    name: 'Matterport Scans',
    vendor: 'Matterport Inc.',
    category: 'LiDAR Reality Capture',
    layer: '3d',
    tag: 'As-Built Verification',
    description:
      'Sub-centimeter LiDAR point cloud capture for construction milestone verification synced alongside the live pre-launch unit twin.',
    stats: '0.1% Tolerance',
    latency: 'LiDAR Mesh',
    accent: '#ff3158',
    glow: 'rgba(255, 49, 88, 0.35)',
    Logo: MatterportEmblem,
    logoClass: 'w-7 h-7',
  },
  {
    id: 'epson',
    name: 'Epson Pro Laser',
    vendor: 'Epson America',
    category: 'Cave Projection',
    layer: 'spatial',
    tag: '270° Lounge Domes',
    description:
      'Multi-projector geometric warping and optical color blending for immersive 270° and 360° projection rooms at luxury project experience centers.',
    stats: '30,000 Lumens',
    latency: '4K Laser Array',
    accent: '#60a5fa',
    glow: 'rgba(96, 165, 250, 0.35)',
    Logo: EpsonLogo,
    logoClass: 'w-11 h-6',
  },
];

const ARCHITECTURE_LAYERS = [
  { id: 'all', label: 'All Stack', count: 14, icon: Layers },
  { id: '3d', label: 'Engine & BIM', count: 5, icon: Cpu },
  { id: 'cloud', label: 'Cloud & Geo', count: 3, icon: Globe2 },
  { id: 'spatial', label: 'Spatial Hardware', count: 4, icon: Eye },
  { id: 'ai', label: 'AI Layer', count: 2, icon: Sparkles },
];

const TechStackShowcase = () => {
  const [activePartnerId, setActivePartnerId] = useState('unreal');
  const [selectedLayer, setSelectedLayer] = useState('all');

  const filteredPartners = useMemo(() => {
    if (selectedLayer === 'all') return TECH_PARTNERS;
    return TECH_PARTNERS.filter((p) => p.layer === selectedLayer);
  }, [selectedLayer]);

  const activePartner = useMemo(() => {
    const found = filteredPartners.find((p) => p.id === activePartnerId);
    return found || filteredPartners[0] || TECH_PARTNERS[0];
  }, [filteredPartners, activePartnerId]);

  const handleSelectLayer = (layerId) => {
    setSelectedLayer(layerId);
    telemetry.ctaClick(`tech_layer_${layerId}`);
  };

  const handleSelectPartner = (partner) => {
    setActivePartnerId(partner.id);
    telemetry.ctaClick(`tech_partner_${partner.id}`);
  };

  const ActiveLogo = activePartner.Logo;

  return (
    <div className="relative" id="industry-leaders">
      {/* Header + Filter Strip */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[#22E55A] text-[11px] font-mono uppercase tracking-[0.22em] mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>03 · Enterprise Engine & Cloud Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.65rem] font-light text-white tracking-[-0.025em] leading-[1.1]">
            Built on{' '}
            <span className="font-editorial italic font-normal text-gradient-emerald tracking-normal pr-2">
              frontier infrastructure.
            </span>
          </h2>
        </div>

        {/* Layer Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#09090c] border border-white/[0.08]">
          {ARCHITECTURE_LAYERS.map((layer) => {
            const isCurrent = selectedLayer === layer.id;
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => handleSelectLayer(layer.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-mono transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#22E55A] text-black font-semibold shadow-[0_0_20px_rgba(34,229,90,0.28)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{layer.label}</span>
                <span className={`text-[10px] ${isCurrent ? 'text-black/70' : 'text-gray-600'}`}>
                  {layer.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Protocol Inspector Stage */}
      <SpotlightCard
        spotlightColor={activePartner.glow}
        borderGlowColor={activePartner.accent}
        className="rounded-3xl bg-[#09090d] border border-white/[0.1] glass-bezel p-5 sm:p-7 mb-4 transition-all duration-500"
      >
        <div
          aria-hidden="true"
          className="absolute -top-20 right-10 w-64 h-64 rounded-full blur-[90px] opacity-25 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: activePartner.accent }}
        />

        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Left Identity + Narrative */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div
              style={{
                borderColor: `${activePartner.accent}55`,
                boxShadow: `0 0 36px -6px ${activePartner.glow}`,
              }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.04] border flex items-center justify-center shrink-0 text-white transition-all duration-500"
            >
              <ActiveLogo className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                  {activePartner.name}
                </h3>
                <span
                  style={{
                    color: activePartner.accent,
                    borderColor: `${activePartner.accent}40`,
                    backgroundColor: `${activePartner.accent}14`,
                  }}
                  className="px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider font-medium"
                >
                  {activePartner.tag}
                </span>
                <span className="text-xs font-mono text-gray-500">· {activePartner.vendor}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-2xl">
                {activePartner.description}
              </p>
            </div>
          </div>

          {/* Right Benchmark Telemetry Modules */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2.5 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/[0.07] lg:pl-6">
            <div className="px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.07] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#22E55A]" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                  Throughput
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-white">
                {activePartner.stats}
              </span>
            </div>

            <div className="px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.07] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                  Pipeline
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-300">
                {activePartner.latency}
              </span>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Interactive Protocol Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
        {filteredPartners.map((partner) => {
          const isSelected = activePartner.id === partner.id;
          const LogoComp = partner.Logo;
          return (
            <button
              key={partner.id}
              type="button"
              onClick={() => handleSelectPartner(partner)}
              onMouseEnter={() => setActivePartnerId(partner.id)}
              style={{
                borderColor: isSelected ? `${partner.accent}80` : undefined,
                boxShadow: isSelected ? `0 8px 30px -10px ${partner.glow}` : undefined,
              }}
              className={`group relative p-3.5 rounded-2xl border transition-all duration-300 text-left flex flex-col items-start justify-between gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-white/[0.08] text-white'
                  : 'bg-[#08080b] border-white/[0.07] hover:border-white/20 hover:bg-white/[0.04] text-gray-400 hover:text-white'
              }`}
            >
              <div className="w-full flex items-center justify-between">
                <div
                  style={{ color: isSelected ? partner.accent : undefined }}
                  className="transition-colors duration-300"
                >
                  <LogoComp className={partner.logoClass} />
                </div>
                {isSelected && (
                  <CheckCircle2
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: partner.accent }}
                  />
                )}
              </div>

              <div className="w-full">
                <div className="text-xs font-medium text-white truncate">{partner.name}</div>
                <div className="text-[10px] font-mono text-gray-500 truncate mt-0.5">
                  {partner.category}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Subtle Edge-Faded Architectural Spec Ticker */}
      <div className="mt-5 relative border-y border-white/[0.05] bg-[#050507] py-2.5 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#050507] to-transparent z-10 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050507] to-transparent z-10 pointer-events-none"
        />
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee text-[10px] font-mono text-gray-500">
          <span>UNREAL ENGINE 5.4+ · NANITE & LUMEN ACTIVE</span>
          <span className="text-white/15">◆</span>
          <span>NVIDIA INCEPTION · DLSS 3.5 RTX STREAMING</span>
          <span className="text-white/15">◆</span>
          <span>AWS ACTIVATE · CLOUDFRONT 90+ METRO EDGE POPS</span>
          <span className="text-white/15">◆</span>
          <span>CLAUDE STARTUPS · ARCHITECTURAL SPATIAL INTELLIGENCE</span>
          <span className="text-white/15">◆</span>
          <span>ELEVENLABS GRANTS · 29+ MULTILINGUAL VOICE SYNTHESIS</span>
          <span className="text-white/15">◆</span>
          <span>AUTODESK BIM · REVIT & IFC LIVE SYNC</span>
          <span className="text-white/15">◆</span>
          <span>APPLE VISION PRO & META QUEST · SPATIAL READY</span>
          <span className="text-white/15">◆</span>
          <span>UNREAL ENGINE 5.4+ · NANITE & LUMEN ACTIVE</span>
          <span className="text-white/15">◆</span>
          <span>NVIDIA INCEPTION · DLSS 3.5 RTX STREAMING</span>
          <span className="text-white/15">◆</span>
          <span>AWS ACTIVATE · CLOUDFRONT 90+ METRO EDGE POPS</span>
        </div>
      </div>
    </div>
  );
};

export default TechStackShowcase;

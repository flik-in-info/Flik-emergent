import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { telemetry } from '../utils/telemetry';
import {
  Orbit,
  LayoutGrid,
  Activity,
  Zap,
  Layers,
  Radio,
  Eye,
  Cpu,
  Globe2,
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
import { images } from '../data/mock';

const FLIK_GREEN = '#22E55A';
const FLIK_GLOW = 'rgba(34, 229, 90, 0.42)';

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
    coords: { x: -14, y: -18 },
    Logo: UnrealEngineLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA RTX',
    vendor: 'NVIDIA Corporation',
    category: 'Neural Cloud Streaming',
    layer: '3d',
    tag: 'DLSS 3.5 & RTX Cloud',
    description:
      'NVIDIA Inception architecture, DLSS 3.5 AI ray reconstruction, and dedicated GPU cloud servers streaming interactive scenes with sub-50ms latency.',
    stats: 'Sub-50ms Latency',
    latency: 'DLSS 3.5 Neural',
    coords: { x: 14, y: -18 },
    Logo: NvidiaLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8',
  },
  {
    id: 'epic',
    name: 'Epic Games',
    vendor: 'Epic Games Ecosystem',
    category: 'Runtime Architecture',
    layer: '3d',
    tag: 'Unreal Enterprise',
    description:
      'Direct enterprise engine pipeline, Megascans physical photogrammetry library, and calibrated PBR shaders engineered for residential digital twins.',
    stats: 'Enterprise License',
    latency: 'Sub-Pixel PBR',
    coords: { x: -29, y: -30 },
    Logo: EpicGamesLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8',
  },
  {
    id: 'cesium',
    name: 'Cesium 3D',
    vendor: 'Cesium GS',
    category: 'Geospatial & 3D Tiles',
    layer: 'cloud',
    tag: '3D Tiles OGC Standard',
    description:
      'Open-standard 3D Tiles pipeline streaming WGS84 terrain elevation models and surrounding skyline context across 40+ residential floors.',
    stats: 'Global Coverage',
    latency: '1.4 GB/s Stream',
    coords: { x: -18, y: 15 },
    Logo: CesiumLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8',
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    vendor: 'Amazon Web Services',
    category: 'Global Edge Delivery',
    layer: 'cloud',
    tag: 'CloudFront Edge CDN',
    description:
      'AWS Activate CloudFront edge infrastructure across global hubs delivering instant browser streaming for remote buyers in Dubai, London, and Singapore.',
    stats: '99.9% Uptime SLA',
    latency: 'Edge CDN Failover',
    coords: { x: 18, y: 15 },
    Logo: AwsLogo,
    logoClass: 'w-9 h-7 sm:w-10 sm:h-8',
  },
  {
    id: 'google-maps',
    name: 'Google 3D Maps',
    vendor: 'Google Cloud Geospatial',
    category: 'Photorealistic Urban Context',
    layer: 'cloud',
    tag: 'Photorealistic 3D Tiles',
    description:
      'Direct ingestion of Google Photorealistic 3D city mesh, surrounding arterial roads, and calibrated solar shadow corridors anchored to exact plot coordinates.',
    stats: '2,500+ Cities',
    latency: 'Live API Sync',
    coords: { x: 29, y: -30 },
    Logo: GoogleMapsLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8',
  },
  {
    id: 'meta',
    name: 'Meta Quest & WebXR',
    vendor: 'Meta Platforms',
    category: 'Spatial VR Immersion',
    layer: 'spatial',
    tag: 'Untethered VR & WebXR',
    description:
      'Zero-install browser WebXR and Meta Quest spatial walkthroughs engineered for site experience centers and remote family decision consultations.',
    stats: 'Zero-Install VR',
    latency: '90Hz Refresh',
    coords: { x: -34, y: -2 },
    Logo: MetaLogo,
    logoClass: 'w-8 h-7 sm:w-9 sm:h-8',
  },
  {
    id: 'apple',
    name: 'Apple Vision Pro',
    vendor: 'Apple Inc.',
    category: 'Spatial Computing',
    layer: 'spatial',
    tag: 'visionOS Native',
    description:
      'High-density spatial computing and stereophonic viewing tailored for flagship luxury developer lounges and private promoter presentations.',
    stats: '4K Micro-OLED',
    latency: '12ms Motion Sync',
    coords: { x: 34, y: -2 },
    Logo: AppleLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8',
  },
  {
    id: 'autodesk',
    name: 'Autodesk BIM',
    vendor: 'Autodesk Inc.',
    category: 'CAD / BIM Interop',
    layer: '3d',
    tag: 'Revit & 3ds Max Sync',
    description:
      'Direct ingestion of Revit, 3ds Max, and IFC BIM blueprints enabling rapid 2 to 4 week developer deployments with zero manual geometry remodeling.',
    stats: 'Live BIM Sync',
    latency: 'IFC / RVT Native',
    coords: { x: -30, y: 28 },
    Logo: AutodeskLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8',
  },
  {
    id: 'matterport',
    name: 'Matterport & Scans',
    vendor: 'Matterport Inc.',
    category: 'Reality Capture LiDAR',
    layer: '3d',
    tag: 'Digital Twin LiDAR',
    description:
      'Sub-centimeter LiDAR reality capture for as-built structural verification and site progress alignment linked cleanly alongside live inventory.',
    stats: '0.1% Tolerance',
    latency: 'LiDAR Point Cloud',
    coords: { x: -10, y: 32 },
    Logo: MatterportEmblem,
    logoClass: 'w-8 h-8 sm:w-9 sm:h-9',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs AI',
    vendor: 'ElevenLabs',
    category: 'Generative Audio Voice',
    layer: 'ai',
    tag: 'Multilingual Intelligence',
    description:
      'ElevenLabs Grants low-latency multilingual voice synthesis guiding international buyers through apartment balconies, lobbies, and views naturally.',
    stats: '29+ Languages',
    latency: '< 150ms Voice',
    coords: { x: 10, y: 32 },
    Logo: ElevenLabsLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8',
  },
  {
    id: 'samsung',
    name: 'Samsung Enterprise',
    vendor: 'Samsung Electronics',
    category: 'Experience Center Displays',
    layer: 'spatial',
    tag: 'The Wall MicroLED',
    description:
      'Hardware calibration for ultra-wide Samsung The Wall MicroLED gallery screens paired wirelessly with advisor tablets inside sales lounges.',
    stats: '8K HDR Native',
    latency: '120Hz Panel Sync',
    coords: { x: 30, y: 28 },
    Logo: SamsungLogo,
    logoClass: 'w-12 h-6 sm:w-14 sm:h-7',
  },
  {
    id: 'epson',
    name: 'Epson Pro Laser',
    vendor: 'Epson America',
    category: 'Immersive Projection',
    layer: 'spatial',
    tag: 'Cave Projection 360°',
    description:
      'Multi-projector geometric warping, optical edge-blending, and uniform color calibration for wrap-around sales gallery projection rooms.',
    stats: '30,000 Lumens',
    latency: '4K Enhancement',
    coords: { x: 0, y: -34 },
    Logo: EpsonLogo,
    logoClass: 'w-12 h-6 sm:w-14 sm:h-7',
  },
  {
    id: 'anthropic',
    name: 'Claude AI',
    vendor: 'Anthropic PBC',
    category: 'Spatial Reasoning Engine',
    layer: 'ai',
    tag: 'Claude Startups',
    description:
      'Claude Startups AI spatial copilot enabling sales teams to query floor sunlight hours, corridor depths, and live finish schedules in real time.',
    stats: 'Claude 3.7 Sonnet',
    latency: 'Real-Time Query',
    coords: { x: 0, y: 25 },
    Logo: AnthropicLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8',
  },
];

const ARCHITECTURE_LAYERS = [
  { id: 'all', label: 'All Protocols', count: 14, icon: Orbit },
  { id: '3d', label: '3D Engine & CAD', count: 5, icon: Cpu },
  { id: 'cloud', label: 'Cloud & Geospatial', count: 3, icon: Globe2 },
  { id: 'spatial', label: 'Spatial Hardware', count: 4, icon: Eye },
  { id: 'ai', label: 'AI Intelligence', count: 2, icon: Layers },
];

const TICKER_ITEMS = [
  'UNREAL ENGINE 5.4 [60 FPS LOCKED // NANITE ACTIVE]',
  'NVIDIA RTX CLOUD [DLSS 3.5 NEURAL RAY RECONSTRUCTION // SUB-50MS]',
  'CESIUM 3D TILES [OGC TERRAIN STREAM // 1.4 GB/S]',
  'AWS CLOUDFRONT [GLOBAL EDGE POPS // 99.9% SLA]',
  'GOOGLE 3D TILES [2,500+ CITIES PHOTOGRAMMETRY]',
  'APPLE VISION PRO [4K MICRO-OLED // 12MS MOTION SYNC]',
  'META QUEST [ZERO-INSTALL BROWSER WEBXR // 90HZ]',
  'ELEVENLABS AI [29+ LANGUAGES ARCHITECTURAL AUDIO]',
  'CLAUDE AI [SPATIAL REASONING COPILOT]',
];

const TechStackShowcase = () => {
  const [activePartnerId, setActivePartnerId] = useState('unreal');
  const [viewMode, setViewMode] = useState('constellation');
  const [hoveredPartnerId, setHoveredPartnerId] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [autoTourActive, setAutoTourActive] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [radarAngle, setRadarAngle] = useState(0);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const activePartner = useMemo(() => {
    return (
      TECH_PARTNERS.find((p) => p.id === (hoveredPartnerId || activePartnerId)) ||
      TECH_PARTNERS[0]
    );
  }, [hoveredPartnerId, activePartnerId]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    setMouseTilt({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY)),
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseTilt({ x: 0, y: 0 });
    setHoveredPartnerId(null);
  }, []);

  useEffect(() => {
    let animId;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      setRadarAngle((elapsed * 32) % 360);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    if (!autoTourActive) return;
    const interval = setInterval(() => {
      setActivePartnerId((curr) => {
        const idx = TECH_PARTNERS.findIndex((p) => p.id === curr);
        const nextIdx = (idx + 1) % TECH_PARTNERS.length;
        return TECH_PARTNERS[nextIdx].id;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [autoTourActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || viewMode !== 'constellation') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random() * Math.max(1, width),
      y: Math.random() * Math.max(1, height),
      size: Math.random() * 1.4 + 0.5,
      alpha: Math.random() * 0.4 + 0.15,
      speed: Math.random() * 0.14 + 0.04,
    }));

    const photons = Array.from({ length: 6 }, (_, i) => ({
      progress: i / 6,
      speed: 0.012,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (width > 0 && height > 0) {
        stars.forEach((star) => {
          star.y -= star.speed;
          if (star.y < 0) star.y = height;
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        });

        if (activePartner) {
          const centerX = width / 2;
          const centerY = height / 2;
          const targetX = centerX + (activePartner.coords.x / 100) * width;
          const targetY = centerY + (activePartner.coords.y / 100) * height;

          photons.forEach((p) => {
            p.progress += p.speed;
            if (p.progress > 1) p.progress = 0;

            const curX = targetX + (centerX - targetX) * p.progress;
            const curY = targetY + (centerY - targetY) * p.progress;

            ctx.fillStyle = FLIK_GREEN;
            ctx.shadowColor = FLIK_GREEN;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          });
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activePartner, viewMode]);

  const handleSelectPartner = (partner) => {
    setActivePartnerId(partner.id);
    setAutoTourActive(false);
    telemetry.ctaClick(`tech_partner_${partner.id}`);
  };

  const filteredPartners = useMemo(() => {
    if (selectedLayer === 'all') return TECH_PARTNERS;
    return TECH_PARTNERS.filter((p) => p.layer === selectedLayer);
  }, [selectedLayer]);

  return (
    <div className="relative overflow-hidden" id="industry-leaders">
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto mb-6 relative px-2">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-[#22E55A]/10 border border-[#22E55A]/35 text-[#22E55A] text-[11px] font-mono tracking-widest uppercase mb-3">
          <span className="w-1.5 h-1.5 bg-[#22E55A]" />
          <span>Enterprise Technology Stack</span>
          <span className="text-white/30">//</span>
          <span className="text-white font-semibold">14/14 Protocols Online</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-medium text-white tracking-[-0.03em] leading-[1.08]">
          Powered by industry leaders.
        </h2>

        <p className="text-neutral-400 text-xs sm:text-sm mt-2.5 leading-relaxed max-w-2xl mx-auto">
          Direct Unreal Engine 5, hardware, and neural cloud streaming delivering photorealistic fidelity and sub-50ms latency worldwide.
        </p>

        {/* View Mode Switcher & Live Tour Control */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <div className="inline-flex p-1 bg-white/[0.04] border border-white/15">
            <button
              type="button"
              onClick={() => {
                setViewMode('constellation');
                telemetry.ctaClick('tech_view_constellation');
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'constellation'
                  ? 'bg-[#22E55A] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Orbit className={`w-4 h-4 ${viewMode === 'constellation' ? 'text-black' : 'text-[#22E55A]'}`} />
              <span>Orbit Constellation</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('matrix');
                telemetry.ctaClick('tech_view_matrix');
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-[#22E55A] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className={`w-4 h-4 ${viewMode === 'matrix' ? 'text-black' : 'text-[#22E55A]'}`} />
              <span>Architecture Matrix</span>
            </button>
          </div>

          {viewMode === 'constellation' && (
            <button
              type="button"
              onClick={() => {
                setAutoTourActive(!autoTourActive);
                telemetry.ctaClick(`tech_autotour_${!autoTourActive}`);
              }}
              className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono transition-colors border cursor-pointer ${
                autoTourActive
                  ? 'bg-[#22E55A]/15 border-[#22E55A] text-[#22E55A]'
                  : 'bg-white/[0.03] border-white/15 text-neutral-300 hover:text-white hover:border-white/30'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${autoTourActive ? 'text-[#22E55A]' : 'text-neutral-400'}`} />
              <span>{autoTourActive ? 'Auto-Scan: Active' : 'Live Radar Tour'}</span>
            </button>
          )}
        </div>

        {/* Architectural Layer Filter Chips */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          {ARCHITECTURE_LAYERS.map((layer) => {
            const isCurrent = selectedLayer === layer.id;
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => {
                  setSelectedLayer(layer.id);
                  telemetry.ctaClick(`tech_layer_${layer.id}`);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono transition-colors border cursor-pointer ${
                  isCurrent
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-transparent border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                }`}
              >
                <Icon className={`w-3 h-3 ${isCurrent ? 'text-black' : 'text-[#22E55A]'}`} />
                <span>{layer.label}</span>
                <span className="text-[10px] opacity-65">({layer.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: 3D ORBIT CONSTELLATION */}
      {viewMode === 'constellation' && (
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Interactive 3D Stage */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1200px' }}
            className="hidden md:block relative w-full h-[420px] bg-[#070709] border border-white/15 overflow-hidden shadow-[inset_0_0_90px_rgba(0,0,0,0.9),0_20px_50px_rgba(0,0,0,0.55)]"
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

            <div
              style={{
                transform: `rotateX(${-mouseTilt.y * 5}deg) rotateY(${mouseTilt.x * 7}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Radar & Orbital SVG Compass */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="reactorGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={FLIK_GREEN} stopOpacity="0.18" />
                    <stop offset="55%" stopColor={FLIK_GREEN} stopOpacity="0.04" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>

                  <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={FLIK_GREEN} stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.75" />
                    <stop offset="100%" stopColor={FLIK_GREEN} stopOpacity="0.4" />
                  </linearGradient>

                  <linearGradient id="radarSweep" x1="50%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                    <stop offset="90%" stopColor={FLIK_GREEN} stopOpacity="0.12" />
                    <stop offset="100%" stopColor={FLIK_GREEN} stopOpacity="0.32" />
                  </linearGradient>
                </defs>

                <circle cx="50%" cy="50%" r="320" fill="url(#reactorGlow)" />
                <circle cx="50%" cy="50%" r="120" fill="none" stroke="rgba(255,255,255,0.07)" strokeDasharray="3 6" />
                <circle cx="50%" cy="50%" r="195" fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="5 10" />
                <circle cx="50%" cy="50%" r="255" fill="none" stroke="rgba(255,255,255,0.03)" strokeDasharray="2 8" />

                <g style={{ transform: `rotate(${radarAngle}deg)`, transformOrigin: '50% 50%' }}>
                  <line
                    x1="50%"
                    y1="50%"
                    x2="85%"
                    y2="50%"
                    stroke="url(#radarSweep)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="85%" cy="50%" r="3" fill={FLIK_GREEN} opacity="0.7" />
                </g>

                <text x="50%" y="28" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="9" fontFamily="monospace">
                  000° NORTH
                </text>
                <text x="50%" y="96%" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="9" fontFamily="monospace">
                  180° SOUTH
                </text>
                <text x="38" y="50%" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="9" fontFamily="monospace">
                  270° WEST
                </text>
                <text x="95.5%" y="50%" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="9" fontFamily="monospace">
                  090° EAST
                </text>

                {filteredPartners.map((p, i) => {
                  if (i % 3 !== 0) return null;
                  const nextP = filteredPartners[(i + 1) % filteredPartners.length];
                  return (
                    <line
                      key={`mesh-${p.id}-${nextP.id}`}
                      x1={`${50 + p.coords.x}%`}
                      y1={`${50 + p.coords.y}%`}
                      x2={`${50 + nextP.coords.x}%`}
                      y2={`${50 + nextP.coords.y}%`}
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="1"
                    />
                  );
                })}

                {activePartner && (
                  <g>
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${50 + activePartner.coords.x}%`}
                      y2={`${50 + activePartner.coords.y}%`}
                      stroke={FLIK_GREEN}
                      strokeWidth="4"
                      strokeOpacity="0.22"
                      strokeLinecap="round"
                    />
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${50 + activePartner.coords.x}%`}
                      y2={`${50 + activePartner.coords.y}%`}
                      stroke="url(#laserBeamGrad)"
                      strokeWidth="1.8"
                      strokeDasharray="6 4"
                    />
                  </g>
                )}
              </svg>

              {/* Center Hub: Flik Explorer Core */}
              <div
                style={{ transform: 'translate(-50%, -50%) translateZ(40px)' }}
                className="absolute top-1/2 left-1/2 z-20 flex flex-col items-center pointer-events-auto"
              >
                <div className="relative p-4 sm:p-5 bg-[#0a0a0d] border border-[#22E55A]/70 shadow-[0_0_50px_rgba(34,229,90,0.3)] flex items-center justify-center">
                  <img
                    src={images.logo}
                    alt="Flik Explorer Core"
                    className="h-9 w-auto relative z-10 brightness-110"
                  />
                </div>

                <div className="mt-2.5 flex items-center gap-1.5 px-3 py-1 bg-[#0a0a0d] border border-[#22E55A]/45 text-[10px] font-mono text-[#22E55A] tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 bg-[#22E55A]" />
                  <span>CORE HUB ACTIVE</span>
                </div>
              </div>

              {/* 14 Orbiting Partner Nodes */}
              {TECH_PARTNERS.map((partner) => {
                const isSelected = activePartner.id === partner.id;
                const matchesFilter = selectedLayer === 'all' || partner.layer === selectedLayer;
                const LogoComponent = partner.Logo;
                const leftPercent = 50 + partner.coords.x;
                const topPercent = 50 + partner.coords.y;
                const depthZ = isSelected ? 50 : 20 + Math.abs(partner.coords.x) * 0.5;

                return (
                  <button
                    key={partner.id}
                    type="button"
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      transform: `translate(-50%, -50%) translateZ(${depthZ}px)`,
                      opacity: matchesFilter ? 1 : 0.22,
                      filter: matchesFilter ? 'none' : 'grayscale(100%)',
                      transition: 'opacity 0.35s ease, filter 0.35s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={() => setHoveredPartnerId(partner.id)}
                    onMouseLeave={() => setHoveredPartnerId(null)}
                    onClick={() => handleSelectPartner(partner)}
                    className={`absolute z-30 cursor-pointer group ${
                      isSelected ? 'scale-110 z-40' : 'hover:scale-105'
                    }`}
                  >
                    <div
                      style={{
                        borderColor: isSelected ? FLIK_GREEN : undefined,
                        boxShadow: isSelected
                          ? `0 0 28px ${FLIK_GLOW}, inset 0 0 12px rgba(34,229,90,0.18)`
                          : undefined,
                      }}
                      className={`relative p-2.5 sm:p-3 border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#0b140d] text-[#22E55A]'
                          : 'bg-[#0b0b0f]/90 border-white/15 hover:border-white/45 text-neutral-300 hover:text-white'
                      }`}
                    >
                      <LogoComponent className={partner.logoClass} />
                    </div>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap pointer-events-none">
                      <div
                        className={`text-[11px] font-medium tracking-tight px-2 py-0.5 transition-colors border ${
                          isSelected
                            ? 'bg-black text-[#22E55A] border-[#22E55A]/60 font-semibold'
                            : 'bg-[#09090c]/85 text-neutral-400 border-white/10 group-hover:text-white'
                        }`}
                      >
                        {partner.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Cluster View */}
          <div className="md:hidden">
            <div className="p-4 bg-[#09090b] border border-white/15 mb-4">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <img src={images.logo} alt="Flik Core" className="h-6 w-auto" />
                  <span className="text-xs text-[#22E55A] font-mono">14 Protocols</span>
                </div>
                <span className="text-[10px] font-mono text-black uppercase tracking-wider bg-[#22E55A] px-2.5 py-1 font-semibold">
                  Tap to Inspect
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {filteredPartners.map((partner) => {
                  const isSelected = activePartner.id === partner.id;
                  const LogoComponent = partner.Logo;
                  return (
                    <button
                      key={partner.id}
                      type="button"
                      onClick={() => handleSelectPartner(partner)}
                      className={`p-3 border flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#22E55A]/15 border-[#22E55A] text-[#22E55A]'
                          : 'bg-white/[0.03] border-white/10 text-neutral-300'
                      }`}
                    >
                      <LogoComponent className="w-6 h-6" />
                      <span className="text-[10px] truncate max-w-full font-medium">{partner.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic HUD Mission Control Dock */}
          <div className="mt-4 p-5 sm:p-6 bg-[#0a0a0d] border border-[#22E55A]/45 relative transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-black border border-[#22E55A]/55 flex items-center justify-center shrink-0 text-[#22E55A]">
                  {React.createElement(activePartner.Logo, { className: 'w-8 h-8 sm:w-9 sm:h-9' })}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight">
                      {activePartner.name}
                    </h3>
                    <span className="px-2.5 py-0.5 border border-[#22E55A]/45 bg-[#22E55A]/10 text-[#22E55A] text-[11px] font-mono font-medium">
                      {activePartner.tag}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">
                      // {activePartner.vendor}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                    {activePartner.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:flex gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10">
                <div className="px-3.5 py-2.5 bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-[#22E55A] shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Benchmark
                    </span>
                    <span className="font-mono text-[#22E55A] font-semibold text-xs">
                      {activePartner.stats}
                    </span>
                  </div>
                </div>

                <div className="px-3.5 py-2.5 bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-white shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Telemetry
                    </span>
                    <span className="font-mono text-white font-semibold text-xs">
                      {activePartner.latency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: ARCHITECTURE MATRIX (14-PARTNER CARD GRID) */}
      {viewMode === 'matrix' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative max-w-7xl mx-auto">
          {filteredPartners.map((partner) => {
            const isSelected = activePartnerId === partner.id;
            const LogoComponent = partner.Logo;
            return (
              <button
                key={partner.id}
                type="button"
                onClick={() => handleSelectPartner(partner)}
                className={`group text-left relative p-6 cursor-pointer transition-colors border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0b140d] border-[#22E55A] text-white'
                    : 'bg-[#0a0a0d] border-white/10 hover:border-white/30 text-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`p-3 border transition-colors ${
                        isSelected
                          ? 'bg-black border-[#22E55A] text-[#22E55A]'
                          : 'bg-white/[0.03] border-white/10 text-white'
                      }`}
                    >
                      <LogoComponent className="w-7 h-7" />
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 border ${
                        isSelected
                          ? 'border-[#22E55A]/50 bg-[#22E55A]/15 text-[#22E55A]'
                          : 'border-white/10 bg-white/[0.03] text-neutral-400'
                      }`}
                    >
                      {partner.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-white mb-0.5 group-hover:text-[#22E55A] transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-[#22E55A] font-mono mb-3">
                    {partner.category}
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-[#22E55A] font-medium">
                    {partner.stats}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {partner.latency}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Real-Time Telemetry Ticker Ribbon */}
      <div className="mt-6 border-y border-white/10 bg-[#08080a] py-2.5 overflow-hidden relative">
        <div className="animate-marquee items-center gap-8 whitespace-nowrap text-[11px] font-mono text-neutral-400">
          {[0, 1].map((dupIdx) => (
            <div key={dupIdx} className="inline-flex items-center gap-8 pr-8">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#22E55A]" />
                <span className="text-[#22E55A] font-semibold uppercase">
                  LIVE ECOSYSTEM PIPELINE:
                </span>
              </div>
              {TICKER_ITEMS.map((item) => (
                <React.Fragment key={`${dupIdx}-${item}`}>
                  <span>{item}</span>
                  <span className="text-white/20">/</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackShowcase;

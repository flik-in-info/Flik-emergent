import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { telemetry } from '../utils/telemetry';
import {
  ShieldCheck,
  Orbit,
  LayoutGrid,
  Activity,
  Zap,
  Layers,
  Radio,
  Eye,
  Crosshair,
  Maximize2,
  Sparkles,
  CheckCircle2,
  Cpu,
  Globe2,
  Volume2
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
  MatterportLogo,
  MatterportEmblem
} from './TechLogos';
import { images } from '../data/mock';

// Complete enterprise tech stack partners with official brand signatures, coordinates, and architectural telemetry
const TECH_PARTNERS = [
  {
    id: 'unreal',
    name: 'Unreal Engine 5',
    vendor: 'Epic Games',
    category: 'Core 3D Engine',
    layer: '3d',
    tag: 'Nanite & Lumen 5.4+',
    description: 'Nanite virtualized micro-polygon geometry and Lumen dynamic real-time global illumination delivering uncompromised architectural photorealism at a locked 60 FPS.',
    stats: '60 FPS Ultra-HD',
    latency: '< 16.6ms frame',
    bandwidth: '48 GB/s VRAM',
    accent: '#00a2ff',
    glow: 'rgba(0, 162, 255, 0.5)',
    coords: { x: -14, y: -18 },
    mobileCol: 1,
    Logo: UnrealEngineLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'nvidia',
    name: 'NVIDIA RTX',
    vendor: 'NVIDIA Corporation',
    category: 'Neural Cloud Streaming',
    layer: '3d',
    tag: 'DLSS 3.5 & RTX Cloud',
    description: 'Official NVIDIA Inception member architecture, DLSS 3.5 AI neural ray reconstruction, and hardware-accelerated RTX cloud servers streaming interactive 3D with sub-50ms latency.',
    stats: 'Sub-50ms Latency',
    latency: 'DLSS 3.5 Neural',
    bandwidth: '100 Gbps Network',
    accent: '#76b900',
    glow: 'rgba(118, 185, 0, 0.55)',
    coords: { x: 14, y: -18 },
    mobileCol: 2,
    Logo: NvidiaLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'epic',
    name: 'Epic Games',
    vendor: 'Epic Games Ecosystem',
    category: 'Runtime Architecture',
    layer: '3d',
    tag: 'Unreal Enterprise',
    description: 'Direct enterprise engine pipeline, Megascans physical photogrammetry library, and custom real-time shaders engineered specifically for developer digital twin portals.',
    stats: 'Enterprise License',
    latency: 'Sub-Pixel Precision',
    bandwidth: 'PBR Material Pipeline',
    accent: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.45)',
    coords: { x: -29, y: -30 },
    mobileCol: 1,
    Logo: EpicGamesLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'cesium',
    name: 'Cesium 3D',
    vendor: 'Cesium GS',
    category: 'Geospatial & 3D Tiles',
    layer: 'cloud',
    tag: '3D Tiles OGC Standard',
    description: 'Open-standard 3D Tiles pipeline streaming high-precision terrain, global digital elevation models, and surrounding contextual urban architecture with zero manual decimation.',
    stats: 'Global Coverage',
    latency: 'OGC Standard',
    bandwidth: '1.4 GB/s Streaming',
    accent: '#00d4b8',
    glow: 'rgba(0, 212, 184, 0.5)',
    coords: { x: -18, y: 15 },
    mobileCol: 2,
    Logo: CesiumLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    vendor: 'Amazon Web Services',
    category: 'Global Edge Delivery',
    layer: 'cloud',
    tag: 'CloudFront Edge CDN',
    description: 'Amazon Web Services CloudFront edge points of presence across 90+ global metropolitan hubs, multi-region failover clusters, and 99.9% uptime enterprise SLA guarantees.',
    stats: '99.9% Uptime SLA',
    latency: '300+ Edge POPs',
    bandwidth: 'Multi-Tbps Edge',
    accent: '#ff9900',
    glow: 'rgba(255, 153, 0, 0.5)',
    coords: { x: 18, y: 15 },
    mobileCol: 1,
    Logo: AwsLogo,
    logoClass: 'w-9 h-7 sm:w-10 sm:h-8'
  },
  {
    id: 'google-maps',
    name: 'Google 3D Maps',
    vendor: 'Google Cloud Geospatial',
    category: 'Photorealistic Urban Context',
    layer: 'cloud',
    tag: 'Photorealistic 3D Tiles',
    description: 'Direct ingestion of Google Photorealistic 3D city mesh, high-resolution satellite imagery, surrounding road infrastructure, and dynamic solar shadow simulations for prospective buyers.',
    stats: '2,500+ Cities',
    latency: 'Live API Sync',
    bandwidth: 'Photogrammetry Mesh',
    accent: '#4285f4',
    glow: 'rgba(66, 133, 244, 0.5)',
    coords: { x: 29, y: -30 },
    mobileCol: 2,
    Logo: GoogleMapsLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'meta',
    name: 'Meta Quest & WebXR',
    vendor: 'Meta Platforms',
    category: 'Spatial VR Immersion',
    layer: 'spatial',
    tag: 'Untethered VR & WebXR',
    description: 'Zero-friction browser WebXR and Meta Quest 3 untethered spatial walkthroughs tailored for developer experience centers, sales lounges, and remote global buyer consultations.',
    stats: 'Zero-Install VR',
    latency: '90Hz Refresh',
    bandwidth: 'Stereoscopic 3D',
    accent: '#0081fb',
    glow: 'rgba(0, 129, 251, 0.5)',
    coords: { x: -34, y: -2 },
    mobileCol: 1,
    Logo: MetaLogo,
    logoClass: 'w-8 h-7 sm:w-9 sm:h-8'
  },
  {
    id: 'apple',
    name: 'Apple Vision Pro',
    vendor: 'Apple Inc.',
    category: 'Spatial Computing',
    layer: 'spatial',
    tag: 'visionOS Native',
    description: 'Ultra-high-density spatial computing and spatial audio rendering tailored for ultra-high-net-worth real estate developer presentations, luxury penthouses, and private viewings.',
    stats: '4K Micro-OLED Per Eye',
    latency: '12ms Photon-to-Motion',
    bandwidth: 'True Spatial Audio',
    accent: '#e2e8f0',
    glow: 'rgba(226, 232, 240, 0.45)',
    coords: { x: 34, y: -2 },
    mobileCol: 2,
    Logo: AppleLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'autodesk',
    name: 'Autodesk BIM',
    vendor: 'Autodesk Inc.',
    category: 'CAD / BIM Interop',
    layer: '3d',
    tag: 'Revit & 3ds Max Sync',
    description: 'Direct pipeline synchronization with Revit, 3ds Max, and IFC BIM architectural models for instant structural revisions and floorplan updates without manual 3D remodeling.',
    stats: 'Live BIM Sync',
    latency: 'Zero Data Loss',
    bandwidth: 'IFC / RVT Native',
    accent: '#ff334b',
    glow: 'rgba(255, 51, 75, 0.5)',
    coords: { x: -30, y: 28 },
    mobileCol: 1,
    Logo: AutodeskLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'matterport',
    name: 'Matterport & Scans',
    vendor: 'Matterport Inc.',
    category: 'Reality Capture LiDAR',
    layer: '3d',
    tag: 'Digital Twin LiDAR',
    description: 'Sub-centimeter LiDAR reality capture for as-built architectural verification, construction milestone tracking, and physical sample apartment digital twins linked to live inventory.',
    stats: '0.1% Tolerance',
    latency: 'Cortex AI 3D',
    bandwidth: 'LiDAR Point Cloud',
    accent: '#ff3158',
    glow: 'rgba(255, 49, 88, 0.5)',
    coords: { x: -10, y: 32 },
    mobileCol: 2,
    Logo: MatterportEmblem,
    fullLogo: MatterportLogo,
    logoClass: 'w-8 h-8 sm:w-9 sm:h-9'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs AI',
    vendor: 'ElevenLabs',
    category: 'Generative Audio Voice',
    layer: 'ai',
    tag: 'Multilingual Intelligence',
    description: 'Ultra-low latency multilingual AI architectural narration, dynamically guiding prospective buyers through unit layouts, sunlight paths, and balcony panoramas in 29+ languages.',
    stats: '29+ Languages',
    latency: '< 150ms Latency',
    bandwidth: 'Neural TTS Voice',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.55)',
    coords: { x: 10, y: 32 },
    mobileCol: 1,
    Logo: ElevenLabsLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'samsung',
    name: 'Samsung Enterprise',
    vendor: 'Samsung Electronics',
    category: 'Experience Center Displays',
    layer: 'spatial',
    tag: 'The Wall MicroLED',
    description: 'Hardware optimization for ultra-wide The Wall MicroLED video walls and high-precision capacitive touch tables installed in developer experiential sales galleries.',
    stats: '8K HDR Native',
    latency: '120Hz Native Sync',
    bandwidth: 'Black Seal Optical',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.5)',
    coords: { x: 30, y: 28 },
    mobileCol: 2,
    Logo: SamsungLogo,
    logoClass: 'w-12 h-6 sm:w-14 sm:h-7'
  },
  {
    id: 'epson',
    name: 'Epson Pro Laser',
    vendor: 'Epson America',
    category: 'Immersive Projection',
    layer: 'spatial',
    tag: 'Cave Projection 360°',
    description: 'Multi-projector geometric warping, edge-blending and optical color calibration for 270° and 360° cave projection sales galleries and immersive walkthrough domes.',
    stats: '30,000 Lumens',
    latency: '4K Enhancement',
    bandwidth: '3LCD Laser Array',
    accent: '#60a5fa',
    glow: 'rgba(96, 165, 250, 0.5)',
    coords: { x: 0, y: -34 },
    mobileCol: 1,
    Logo: EpsonLogo,
    logoClass: 'w-12 h-6 sm:w-14 sm:h-7'
  },
  {
    id: 'anthropic',
    name: 'Anthropic AI',
    vendor: 'Anthropic PBC',
    category: 'Spatial Reasoning Engine',
    layer: 'ai',
    tag: 'Architectural Intelligence',
    description: 'Natural language spatial copilot intelligence allowing sales teams and buyers to ask complex questions regarding sunlight hours, view corridors, floorplan dimensions, and unit specs.',
    stats: 'Context Intelligence',
    latency: 'Real-Time Insights',
    bandwidth: 'Claude Spatial Core',
    accent: '#d97706',
    glow: 'rgba(217, 119, 6, 0.5)',
    coords: { x: 0, y: 22 },
    mobileCol: 2,
    Logo: AnthropicLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  }
];

const ARCHITECTURE_LAYERS = [
  { id: 'all', label: 'All Protocols', count: 14, icon: Orbit },
  { id: '3d', label: '3D Engine & CAD', count: 5, icon: Cpu },
  { id: 'cloud', label: 'Cloud & Geospatial', count: 3, icon: Globe2 },
  { id: 'spatial', label: 'Spatial Hardware', count: 4, icon: Eye },
  { id: 'ai', label: 'AI Intelligence', count: 2, icon: Sparkles }
];

const TechStackShowcase = () => {
  const [activePartnerId, setActivePartnerId] = useState('unreal');
  const [viewMode, setViewMode] = useState('constellation'); // 'constellation' | 'matrix'
  const [hoveredPartnerId, setHoveredPartnerId] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [autoTourActive, setAutoTourActive] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [radarAngle, setRadarAngle] = useState(0);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const activePartner = useMemo(() => {
    return TECH_PARTNERS.find((p) => p.id === (hoveredPartnerId || activePartnerId)) || TECH_PARTNERS[0];
  }, [hoveredPartnerId, activePartnerId]);

  // Handle 3D Parallax Tilt with smoothing
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    setMouseTilt({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY))
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseTilt({ x: 0, y: 0 });
    setHoveredPartnerId(null);
  }, []);

  // Continuous subtle radar sweep animation
  useEffect(() => {
    let animId;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      setRadarAngle((elapsed * 35) % 360); // 35 deg per sec
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Auto-tour rotation every 4 seconds if enabled
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

  // Canvas particle starfield & streaming photon beam rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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

    // Generate static ambient star particles
    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.15 + 0.05
    }));

    // Photon packets streaming from active node to center
    const photons = Array.from({ length: 6 }, (_, i) => ({
      progress: i / 6,
      speed: 0.012
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render cosmic ambient dust
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) star.y = height;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render flowing data photons between active partner and center hub
      if (activePartner) {
        const centerX = width / 2;
        const centerY = height / 2;
        const targetX = centerX + (activePartner.coords.x / 100) * width;
        const targetY = centerY + (activePartner.coords.y / 100) * height;

        photons.forEach((p) => {
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;

          // Interpolate from node to center
          const curX = targetX + (centerX - targetX) * p.progress;
          const curY = targetY + (centerY - targetY) * p.progress;

          ctx.fillStyle = activePartner.accent || '#10b981';
          ctx.shadowColor = activePartner.accent || '#10b981';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activePartner]);

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
    <div className="mt-28 pt-20 border-t border-white/5 relative overflow-hidden" id="industry-leaders">
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1100px] h-[650px] bg-gradient-to-tr from-emerald-500/[0.05] via-cyan-500/[0.03] to-purple-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      {/* Cybernetic Section Header */}
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 relative px-4">
        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-5 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Enterprise Integration Ecosystem</span>
          <span className="text-white/30">•</span>
          <span className="text-emerald-300 font-semibold">14/14 Protocols Online</span>
        </div>

        <h3 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
          Powered by Industry Leaders
        </h3>

        <p className="text-gray-400 text-sm sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto font-light">
          Direct engine, hardware, and neural cloud streaming integration delivering cinematic fidelity, sub-50ms latency, and global multi-device immersion.
        </p>

        {/* View Switcher & Live Tour Control */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-xl">
            <button
              onClick={() => {
                setViewMode('constellation');
                telemetry.ctaClick('tech_view_constellation');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                viewMode === 'constellation'
                  ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Orbit className="w-4 h-4 text-emerald-400" />
              <span>Orbit Constellation</span>
            </button>

            <button
              onClick={() => {
                setViewMode('matrix');
                telemetry.ctaClick('tech_view_matrix');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                viewMode === 'matrix'
                  ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-emerald-400" />
              <span>Architecture Matrix</span>
            </button>
          </div>

          {/* Auto-Tour Toggle Button */}
          {viewMode === 'constellation' && (
            <button
              onClick={() => {
                setAutoTourActive(!autoTourActive);
                telemetry.ctaClick(`tech_autotour_${!autoTourActive}`);
              }}
              className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 border backdrop-blur-md ${
                autoTourActive
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${autoTourActive ? 'animate-pulse text-cyan-300' : ''}`} />
              <span>{autoTourActive ? 'Auto-Scan: Active' : 'Live Radar Tour'}</span>
            </button>
          )}
        </div>

        {/* Architectural Layer Filter Chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {ARCHITECTURE_LAYERS.map((layer) => {
            const isCurrent = selectedLayer === layer.id;
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => {
                  setSelectedLayer(layer.id);
                  telemetry.ctaClick(`tech_layer_${layer.id}`);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 border ${
                  isCurrent
                    ? 'bg-white/[0.1] border-emerald-400/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-transparent border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10'
                }`}
              >
                <Icon className={`w-3 h-3 ${isCurrent ? 'text-emerald-400' : 'text-gray-500'}`} />
                <span>{layer.label}</span>
                <span className="text-[10px] opacity-60">({layer.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: HOLOGRAPHIC 3D ORBIT CONSTELLATION */}
      {viewMode === 'constellation' && (
        <div className="relative max-w-6xl mx-auto px-4">
          {/* Desktop Interactive 3D Holographic Canvas */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              perspective: '1200px'
            }}
            className="hidden md:block relative w-full h-[660px] rounded-3xl bg-[#070709]/90 border border-white/10 backdrop-blur-2xl overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.9),0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* HTML5 Canvas for Starfield & Flowing Data Photons */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

            {/* Holographic 3D Tilt Stage */}
            <div
              style={{
                transform: `rotateX(${-mouseTilt.y * 5}deg) rotateY(${mouseTilt.x * 7}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)'
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Radar & Orbital SVG Compass */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Central Energy Reactor Radial Glow */}
                  <radialGradient id="reactorGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#10b981" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>

                  {/* Active Laser Beam Gradient */}
                  <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                    <stop offset="60%" stopColor={activePartner.accent || '#34d399'} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={activePartner.accent || '#10b981'} stopOpacity="0.3" />
                  </linearGradient>

                  {/* Rotating Radar Sweep Gradient */}
                  <linearGradient id="radarSweep" x1="50%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                    <stop offset="90%" stopColor="#10b981" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.25" />
                  </linearGradient>
                </defs>

                {/* Central Ambient Glow */}
                <circle cx="50%" cy="50%" r="320" fill="url(#reactorGlow)" />

                {/* Outer Cybernetic Guideline Rings */}
                <circle cx="50%" cy="50%" r="135" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />
                <circle cx="50%" cy="50%" r="225" fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="5 10" />
                <circle cx="50%" cy="50%" r="295" fill="none" stroke="rgba(255,255,255,0.025)" strokeDasharray="2 8" />

                {/* Rotating Cybernetic Radar Scanner */}
                <g transform={`rotate(${radarAngle} 720 330)`}>
                  <line
                    x1="50%"
                    y1="50%"
                    x2="85%"
                    y2="50%"
                    stroke="url(#radarSweep)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="85%" cy="50%" r="3" fill="#34d399" opacity="0.6" />
                </g>

                {/* Compass Degree Coordinates */}
                <text x="50%" y="42" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="monospace">
                  000° NORTH
                </text>
                <text x="50%" y="640" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="monospace">
                  180° SOUTH
                </text>
                <text x="35" y="50%" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="monospace">
                  270° WEST
                </text>
                <text x="96%" y="50%" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="monospace">
                  090° EAST
                </text>

                {/* Ambient Inter-Node Mesh Web lines */}
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
                      stroke="rgba(255,255,255,0.03)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Active Dynamic Laser Energy Beam */}
                {activePartner && (
                  <g>
                    {/* Outer Beam Halo */}
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${50 + activePartner.coords.x}%`}
                      y2={`${50 + activePartner.coords.y}%`}
                      stroke={activePartner.accent || '#10b981'}
                      strokeWidth="4"
                      strokeOpacity="0.2"
                      strokeLinecap="round"
                    />
                    {/* Core Laser Stream */}
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${50 + activePartner.coords.x}%`}
                      y2={`${50 + activePartner.coords.y}%`}
                      stroke="url(#laserBeamGrad)"
                      strokeWidth="1.8"
                      strokeDasharray="6 4"
                      className="animate-pulse"
                    />
                  </g>
                )}
              </svg>

              {/* Epicenter: FLIK Explorer Core Engine */}
              <div
                style={{
                  transform: 'translate(-50%, -50%) translateZ(40px)'
                }}
                className="absolute top-1/2 left-1/2 z-20 flex flex-col items-center pointer-events-auto"
              >
                <div className="relative group p-4 sm:p-5 rounded-2xl bg-[#0a0a0d] border border-emerald-500/50 shadow-[0_0_60px_rgba(16,185,129,0.35)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {/* Reactor Aura */}
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-emerald-500/30 via-cyan-500/20 to-emerald-500/30 blur-lg animate-pulse pointer-events-none" />

                  <img
                    src={images.logo}
                    alt="Flik Explorer Core"
                    className="h-9 w-auto relative z-10 brightness-110 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                  />
                </div>

                <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0a0d]/90 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 tracking-widest uppercase shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CORE HUB ACTIVE</span>
                </div>
              </div>

              {/* Orbiting Partner Nodes with REAL VECTOR LOGOS */}
              {TECH_PARTNERS.map((partner) => {
                const isSelected = activePartner.id === partner.id;
                const isHovered = hoveredPartnerId === partner.id;
                const matchesFilter = selectedLayer === 'all' || partner.layer === selectedLayer;
                const LogoComponent = partner.Logo;
                const leftPercent = 50 + partner.coords.x;
                const topPercent = 50 + partner.coords.y;

                // Subtle parallax depth calculation
                const depthZ = isSelected ? 50 : 20 + Math.abs(partner.coords.x) * 0.5;

                return (
                  <div
                    key={partner.id}
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      transform: `translate(-50%, -50%) translateZ(${depthZ}px)`,
                      opacity: matchesFilter ? 1 : 0.25,
                      filter: matchesFilter ? 'none' : 'grayscale(100%)',
                      transition: 'opacity 0.4s ease, filter 0.4s ease, transform 0.2s ease'
                    }}
                    onMouseEnter={() => setHoveredPartnerId(partner.id)}
                    onMouseLeave={() => setHoveredPartnerId(null)}
                    onClick={() => handleSelectPartner(partner)}
                    className={`absolute z-30 cursor-pointer group ${
                      isSelected ? 'scale-115 z-40' : 'hover:scale-110'
                    }`}
                  >
                    <div
                      style={{
                        borderColor: isSelected ? partner.accent : undefined,
                        boxShadow: isSelected
                          ? `0 0 35px ${partner.glow}, inset 0 0 15px ${partner.glow}`
                          : undefined
                      }}
                      className={`relative p-3.5 sm:p-4 rounded-2xl border backdrop-blur-xl flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-white/[0.14] text-white ring-1'
                          : 'bg-white/[0.04] border-white/10 hover:border-white/30 hover:bg-white/[0.08] text-gray-300 hover:text-white shadow-[0_8px_25px_rgba(0,0,0,0.6)]'
                      }`}
                    >
                      {/* Neon ping when selected */}
                      {isSelected && (
                        <span
                          style={{ backgroundColor: partner.accent }}
                          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-4 ring-[#070709] animate-ping"
                        />
                      )}

                      <div
                        style={{
                          filter: isSelected ? `drop-shadow(0 0 10px ${partner.accent})` : undefined
                        }}
                        className="transition-all duration-300"
                      >
                        <LogoComponent className={partner.logoClass} />
                      </div>
                    </div>

                    {/* Micro HUD Brand Label */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap pointer-events-none">
                      <div
                        style={{
                          borderColor: isSelected ? `${partner.accent}55` : undefined,
                          color: isSelected ? partner.accent : undefined
                        }}
                        className={`text-[11px] font-medium tracking-tight px-2.5 py-0.5 rounded-md backdrop-blur-md transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#09090c]/95 border shadow-lg font-semibold'
                            : 'text-gray-400 group-hover:text-white bg-[#09090c]/70 border border-white/5'
                        }`}
                      >
                        {partner.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Cluster View */}
          <div className="md:hidden">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#09090b] border border-white/10 mb-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <img src={images.logo} alt="Flik Core" className="h-6 w-auto" />
                  <span className="text-xs text-emerald-400 font-mono">14 Protocols</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  Tap to Inspect
                </span>
              </div>

              {/* Grid of official logos */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {filteredPartners.map((partner) => {
                  const isSelected = activePartner.id === partner.id;
                  const LogoComponent = partner.Logo;
                  return (
                    <button
                      key={partner.id}
                      onClick={() => handleSelectPartner(partner)}
                      style={{
                        borderColor: isSelected ? partner.accent : undefined,
                        boxShadow: isSelected ? `0 0 20px ${partner.glow}` : undefined
                      }}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                        isSelected
                          ? 'bg-white/[0.12] text-white'
                          : 'bg-white/[0.03] border-white/5 text-gray-400'
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
          <div
            style={{
              borderColor: `${activePartner.accent}40`,
              boxShadow: `0 10px 40px -10px ${activePartner.glow}`
            }}
            className="mt-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0c0c10] via-[#0e0e14] to-[#0c0c10] border backdrop-blur-2xl relative transition-all duration-500 shadow-2xl"
          >
            {/* Top Accent Strip */}
            <div
              style={{ backgroundColor: activePartner.accent }}
              className="absolute top-0 left-8 right-8 h-[2px] opacity-75 blur-[1px]"
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Partner Identity & Capability */}
              <div className="flex items-start sm:items-center gap-5">
                <div
                  style={{
                    borderColor: `${activePartner.accent}50`,
                    boxShadow: `0 0 30px ${activePartner.glow}`
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.05] border flex items-center justify-center flex-shrink-0 text-white transition-all duration-300"
                >
                  {React.createElement(activePartner.Logo, { className: 'w-9 h-9 sm:w-11 sm:h-11' })}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <h4 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                      {activePartner.name}
                    </h4>
                    <span
                      style={{
                        backgroundColor: `${activePartner.accent}15`,
                        borderColor: `${activePartner.accent}40`,
                        color: activePartner.accent
                      }}
                      className="px-3 py-0.5 rounded-full border text-xs font-mono font-medium"
                    >
                      {activePartner.tag}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      • {activePartner.vendor}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed max-w-2xl font-light">
                    {activePartner.description}
                  </p>
                </div>
              </div>

              {/* Live Architectural Benchmarks */}
              <div className="grid grid-cols-2 lg:flex lg:flex-col gap-3 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Performance Benchmark</span>
                    <span className="font-mono text-emerald-300 font-semibold text-sm">
                      {activePartner.stats}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">Runtime Telemetry</span>
                    <span className="font-mono text-cyan-300 font-semibold text-xs sm:text-sm">
                      {activePartner.latency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: HIGH-TECH ARCHITECTURE MATRIX (BENTO GRID) */}
      {viewMode === 'matrix' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 relative max-w-7xl mx-auto px-4">
          {filteredPartners.map((partner) => {
            const isSelected = activePartnerId === partner.id;
            const LogoComponent = partner.Logo;
            return (
              <div
                key={partner.id}
                onClick={() => handleSelectPartner(partner)}
                style={{
                  borderColor: isSelected ? partner.accent : undefined,
                  boxShadow: isSelected ? `0 0 35px ${partner.glow}` : undefined
                }}
                className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-xl flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/[0.09] text-white ring-1'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                {/* Active Top Accent Line */}
                <div
                  style={{
                    backgroundColor: isSelected ? partner.accent : undefined
                  }}
                  className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-40 group-hover:bg-white/40'
                  }`}
                />

                <div>
                  {/* Top Header: Logo + Layer Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      style={{
                        borderColor: isSelected ? `${partner.accent}50` : undefined,
                        color: isSelected ? partner.accent : undefined
                      }}
                      className={`p-3 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? 'bg-white/[0.08]'
                          : 'bg-white/[0.03] border-white/10 text-gray-300 group-hover:text-white group-hover:border-white/20'
                      }`}
                    >
                      <LogoComponent className="w-7 h-7" />
                    </div>

                    <span
                      style={{
                        color: isSelected ? partner.accent : undefined,
                        borderColor: isSelected ? `${partner.accent}40` : undefined,
                        backgroundColor: isSelected ? `${partner.accent}15` : undefined
                      }}
                      className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5 transition-colors"
                    >
                      {partner.tag}
                    </span>
                  </div>

                  {/* Brand & Category */}
                  <h4 className="text-lg font-medium text-white mb-0.5 group-hover:text-emerald-300 transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-emerald-400/90 font-mono mb-3">
                    {partner.category}
                  </p>

                  {/* Architectural Description */}
                  <p className="text-xs text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                    {partner.description}
                  </p>
                </div>

                {/* Bottom Metric & Live SLA */}
                <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{partner.stats}</span>
                  </div>

                  <span className="text-[11px] font-mono text-gray-500 group-hover:text-gray-300 transition-colors">
                    {partner.latency}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Real-Time Telemetry Ticker Ribbon */}
      <div className="mt-12 border-y border-white/5 bg-[#08080a]/80 py-3 overflow-hidden relative">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold uppercase">LIVE ECOSYSTEM PIPELINE:</span>
          </div>
          <span>UNREAL ENGINE 5.4.4 [60 FPS LOCKED • NANITE ACTIVE]</span>
          <span className="text-white/20">/</span>
          <span>NVIDIA RTX CLOUD [DLSS 3.5 AI RAY RECONSTRUCTION • 34MS]</span>
          <span className="text-white/20">/</span>
          <span>CESIUM 3D TILES [OGC TERRAIN STREAM • 1.4 GB/S]</span>
          <span className="text-white/20">/</span>
          <span>AWS CLOUDFRONT [90+ METRO POPS • 99.99% SLA]</span>
          <span className="text-white/20">/</span>
          <span>GOOGLE 3D TILES [2,500+ CITIES PHOTOGRAMMETRY]</span>
          <span className="text-white/20">/</span>
          <span>APPLE VISION PRO [4K PER EYE • 12MS PHOTON-TO-MOTION]</span>
          <span className="text-white/20">/</span>
          <span>META QUEST 3 [ZERO-INSTALL BROWSER WEBXR • 90HZ]</span>
          <span className="text-white/20">/</span>
          <span>ELEVENLABS [29+ LANGUAGES MULTILINGUAL ARCHITECTURAL VOICE]</span>
        </div>
      </div>

      {/* Enterprise Hardware & Zero-Interception Guarantee */}
      <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-emerald-500/[0.03] via-white/[0.02] to-emerald-500/[0.03] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-base font-medium text-white">Direct Engine & Hardware Runtime Guarantee</h5>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-2xl font-light">
              Flik runs directly on native Unreal Engine 5 with NVIDIA RTX neural cloud streaming, sub-50ms glass-to-glass latency, and zero third-party telemetry interception.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-gray-400 flex-shrink-0">
          <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 font-mono">
            Unreal 5.4+
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 font-mono">
            RTX Cloud
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 font-mono">
            Cesium OGC
          </span>
        </div>
      </div>
    </div>
  );
};

export default TechStackShowcase;

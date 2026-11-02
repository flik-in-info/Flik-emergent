import React, { useState } from 'react';
import { telemetry } from '../utils/telemetry';
import { ShieldCheck, Orbit, LayoutGrid, Activity, Zap } from 'lucide-react';
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

const TECH_PARTNERS = [
  {
    id: 'unreal',
    name: 'Unreal Engine 5',
    vendor: 'Epic Games',
    category: 'Core 3D Engine',
    tag: 'Nanite & Lumen',
    description: 'Nanite micro-polygon geometry and Lumen real-time dynamic global illumination delivering cinematic architectural photorealism in real time.',
    stats: '60 FPS Ultra-HD',
    latency: '< 16.6ms frame',
    coords: { x: -14, y: -18 },
    mobileRow: 1,
    Logo: UnrealEngineLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'nvidia',
    name: 'NVIDIA RTX',
    vendor: 'NVIDIA Corporation',
    category: 'Neural Cloud Streaming',
    tag: 'DLSS 3.5 & RTX Cloud',
    description: 'NVIDIA Inception member infrastructure, DLSS 3.5 AI neural frame generation, and enterprise GPU clusters for sub-50ms cloud pixel streaming.',
    stats: 'Sub-50ms Latency',
    latency: 'DLSS 3.5 Active',
    coords: { x: 14, y: -18 },
    mobileRow: 1,
    Logo: NvidiaLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'epic',
    name: 'Epic Games',
    vendor: 'Epic Games Ecosystem',
    category: 'Runtime Architecture',
    tag: 'Unreal Enterprise',
    description: 'Direct enterprise engine pipeline, Megascans photogrammetry assets, and custom real-time shaders engineered for architectural digital twins.',
    stats: 'Enterprise License',
    latency: 'Sub-Pixel Precision',
    coords: { x: -28, y: -30 },
    mobileRow: 2,
    Logo: EpicGamesLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'cesium',
    name: 'Cesium 3D',
    vendor: 'Cesium GS',
    category: 'Geospatial & 3D Tiles',
    tag: '3D Tiles OGC Standard',
    description: 'Open-standard 3D Tiles pipeline streaming high-precision terrain, global digital elevation models, and contextual urban surroundings seamlessly.',
    stats: 'Global Coverage',
    latency: 'OGC Standard',
    coords: { x: -18, y: 15 },
    mobileRow: 2,
    Logo: CesiumLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    vendor: 'Amazon Web Services',
    category: 'Global Edge Delivery',
    tag: 'CloudFront Edge CDN',
    description: 'Amazon Web Services CloudFront edge points of presence across 90+ cities globally, ensuring 99.9% uptime SLA and multi-region failover.',
    stats: '99.9% Uptime SLA',
    latency: '300+ Edge POPs',
    coords: { x: 18, y: 15 },
    mobileRow: 2,
    Logo: AwsLogo,
    logoClass: 'w-9 h-7 sm:w-10 sm:h-8'
  },
  {
    id: 'google-maps',
    name: 'Google 3D Maps',
    vendor: 'Google Cloud Geospatial',
    category: 'Photorealistic Urban Context',
    tag: 'Photorealistic 3D Tiles',
    description: 'Direct ingestion of Google Photorealistic 3D Tiles, high-resolution satellite imagery, surrounding road networks, and solar shadow simulations.',
    stats: '2,500+ Cities',
    latency: 'Live API Sync',
    coords: { x: 28, y: -30 },
    mobileRow: 3,
    Logo: GoogleMapsLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'meta',
    name: 'Meta Quest & WebXR',
    vendor: 'Meta Platforms',
    category: 'Spatial VR Immersion',
    tag: 'Untethered VR & WebXR',
    description: 'Zero-friction browser WebXR and Meta Quest 3 untethered spatial walkthroughs for real estate developer sales galleries and VIP lounges.',
    stats: 'Zero-Install VR',
    latency: '90Hz Refresh',
    coords: { x: -33, y: -2 },
    mobileRow: 3,
    Logo: MetaLogo,
    logoClass: 'w-8 h-7 sm:w-9 sm:h-8'
  },
  {
    id: 'apple',
    name: 'Apple Vision Pro',
    vendor: 'Apple Inc.',
    category: 'Spatial Computing',
    tag: 'visionOS Native',
    description: 'Ultra-high-density spatial computing and spatial audio rendering tailored for ultra-high-net-worth architectural presentations and boardrooms.',
    stats: '4K Micro-OLED Per Eye',
    latency: '12ms Photon-to-Motion',
    coords: { x: 33, y: -2 },
    mobileRow: 3,
    Logo: AppleLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'autodesk',
    name: 'Autodesk BIM',
    vendor: 'Autodesk Inc.',
    category: 'CAD / BIM Interop',
    tag: 'Revit & 3ds Max',
    description: 'Direct pipeline synchronization with Revit, 3ds Max, and IFC BIM models for instant architectural updates without 3D remodeling overhead.',
    stats: 'Live BIM Sync',
    latency: 'Zero Data Loss',
    coords: { x: -30, y: 28 },
    mobileRow: 4,
    Logo: AutodeskLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'matterport',
    name: 'Matterport & Scans',
    vendor: 'Matterport Inc.',
    category: 'Reality Capture LiDAR',
    tag: 'Digital Twin LiDAR',
    description: 'Sub-centimeter LiDAR reality capture for as-built spatial verification, construction milestone tracking, and physical sample apartment digital twins.',
    stats: '0.1% Tolerance',
    latency: 'Cortex AI 3D',
    coords: { x: -10, y: 32 },
    mobileRow: 4,
    Logo: MatterportEmblem,
    fullLogo: MatterportLogo,
    logoClass: 'w-8 h-8 sm:w-9 sm:h-9'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs AI',
    vendor: 'ElevenLabs',
    category: 'Generative Audio Voice',
    tag: 'Multilingual Intelligence',
    description: 'Ultra-low latency multilingual AI architectural narration, dynamically guiding buyers through unit floorplans and spatial views in 29+ languages.',
    stats: '29+ Languages',
    latency: '< 150ms Latency',
    coords: { x: 10, y: 32 },
    mobileRow: 5,
    Logo: ElevenLabsLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  },
  {
    id: 'samsung',
    name: 'Samsung Enterprise',
    vendor: 'Samsung Electronics',
    category: 'Experience Center Displays',
    tag: 'The Wall MicroLED',
    description: 'Hardware optimization for ultra-wide The Wall MicroLED video walls and high-precision capacitive touch tables in developer experiential galleries.',
    stats: '8K HDR Native',
    latency: '120Hz Native Sync',
    coords: { x: 30, y: 28 },
    mobileRow: 5,
    Logo: SamsungLogo,
    logoClass: 'w-12 h-6 sm:w-14 sm:h-7'
  },
  {
    id: 'epson',
    name: 'Epson Pro Laser',
    vendor: 'Epson America',
    category: 'Immersive Projection',
    tag: 'Cave Projection 360°',
    description: 'Multi-projector warping, edge-blending and color calibration for 270° and 360° immersive cave sales suites and experiential walkthrough domes.',
    stats: '30,000 Lumens',
    latency: '4K Enhancement',
    coords: { x: 0, y: -34 },
    mobileRow: 1,
    Logo: EpsonLogo,
    logoClass: 'w-12 h-6 sm:w-14 sm:h-7'
  },
  {
    id: 'anthropic',
    name: 'Anthropic AI',
    vendor: 'Anthropic PBC',
    category: 'Spatial Reasoning Engine',
    tag: 'Architectural Intelligence',
    description: 'Natural language spatial copilot intelligence allowing sales consultants and buyers to ask complex questions regarding sunlight, views, and unit specs.',
    stats: 'Context Intelligence',
    latency: 'Real-Time Insights',
    coords: { x: 0, y: 22 },
    mobileRow: 2,
    Logo: AnthropicLogo,
    logoClass: 'w-7 h-7 sm:w-8 sm:h-8'
  }
];

const TechStackShowcase = () => {
  const [activePartnerId, setActivePartnerId] = useState('unreal');
  const [viewMode, setViewMode] = useState('constellation');
  const [hoveredPartnerId, setHoveredPartnerId] = useState(null);

  const activePartner = TECH_PARTNERS.find((p) => p.id === (hoveredPartnerId || activePartnerId)) || TECH_PARTNERS[0];

  const handleSelectPartner = (partner) => {
    setActivePartnerId(partner.id);
    telemetry.ctaClick(`tech_partner_${partner.id}`);
  };

  return (
    <div className="mt-28 pt-20 border-t border-white/5 relative overflow-hidden" id="industry-leaders">
      {/* Background Ambient Glow & Starfield Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-emerald-500/[0.04] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Enterprise Technology Ecosystem
        </div>
        
        <h3 className="text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
          Powered by Industry Leaders
        </h3>
        
        <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
          Enterprise-Grade Technology Stack for Maximum Performance, Cinematic Fidelity & Sub-Second Global Streaming
        </p>

        {/* View Mode Toggle Switch */}
        <div className="mt-6 inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <button
            onClick={() => {
              setViewMode('constellation');
              telemetry.ctaClick('tech_view_constellation');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
              viewMode === 'constellation'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>Orbit Ecosystem</span>
          </button>
          
          <button
            onClick={() => {
              setViewMode('matrix');
              telemetry.ctaClick('tech_view_matrix');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
              viewMode === 'matrix'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Architecture Matrix</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: CONSTELLATION / ORBIT VIEW */}
      {viewMode === 'constellation' && (
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Constellation Canvas */}
          <div className="hidden md:block relative w-full h-[620px] rounded-3xl bg-[#09090b]/80 border border-white/10 backdrop-blur-xl overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
            {/* Concentric Orbital Rings */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
                  <stop offset="60%" stopColor="#10b981" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Ambient circle glow */}
              <circle cx="50%" cy="50%" r="300" fill="url(#ringGlow)" />

              {/* Orbit guide circles */}
              <circle cx="50%" cy="50%" r="130" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 5" />
              <circle cx="50%" cy="50%" r="210" fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 8" />
              <circle cx="50%" cy="50%" r="280" fill="none" stroke="rgba(255,255,255,0.03)" strokeDasharray="2 6" />

              {/* Dynamic Laser Beam to Active/Hovered Partner */}
              {activePartner && (
                <line
                  x1="50%"
                  y1="50%"
                  x2={`${50 + activePartner.coords.x}%`}
                  y2={`${50 + activePartner.coords.y}%`}
                  stroke="url(#beamGradient)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              )}
            </svg>

            {/* Central FLIK Explorer Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <div className="relative group p-4 rounded-2xl bg-[#0e0e11] border border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.25)] flex items-center justify-center">
                {/* Glowing breathing ring */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 blur-md animate-pulse pointer-events-none" />
                
                <img
                  src={images.logo}
                  alt="Flik Explorer Core"
                  className="h-8 w-auto relative z-10 brightness-110 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                />
              </div>
              <span className="mt-2.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 tracking-widest uppercase">
                Core Engine Active
              </span>
            </div>

            {/* Orbiting Partner Nodes with REAL OFFICIAL LOGOS */}
            {TECH_PARTNERS.map((partner) => {
              const isSelected = activePartner.id === partner.id;
              const LogoComponent = partner.Logo;
              const leftPercent = 50 + partner.coords.x;
              const topPercent = 50 + partner.coords.y;

              return (
                <div
                  key={partner.id}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onMouseEnter={() => setHoveredPartnerId(partner.id)}
                  onMouseLeave={() => setHoveredPartnerId(null)}
                  onClick={() => handleSelectPartner(partner)}
                  className={`absolute z-30 cursor-pointer transition-all duration-300 group ${
                    isSelected ? 'scale-110 z-40' : 'hover:scale-105'
                  }`}
                >
                  <div
                    className={`relative p-3.5 sm:p-4 rounded-2xl border backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-white/[0.12] border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400'
                        : 'bg-white/[0.04] border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {/* Glowing highlight indicator */}
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-[#09090b] animate-ping" />
                    )}

                    <div
                      className={`transition-colors duration-300 ${
                        isSelected
                          ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]'
                          : 'text-gray-300 group-hover:text-white'
                      }`}
                    >
                      <LogoComponent className={partner.logoClass} />
                    </div>
                  </div>

                  {/* Micro Name Label below node */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap pointer-events-none">
                    <span
                      className={`text-[11px] font-medium tracking-tight px-2 py-0.5 rounded-md transition-all duration-300 ${
                        isSelected
                          ? 'text-emerald-300 bg-[#09090b]/90 border border-emerald-500/30'
                          : 'text-gray-400 group-hover:text-white'
                      }`}
                    >
                      {partner.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Cluster View */}
          <div className="md:hidden">
            <div className="p-4 rounded-2xl bg-[#09090b] border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <img src={images.logo} alt="Flik Core" className="h-6 w-auto" />
                  <span className="text-xs text-gray-400 font-mono">Ecosystem</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
                  Tap to Inspect
                </span>
              </div>

              {/* Grid of clean real logos */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {TECH_PARTNERS.map((partner) => {
                  const isSelected = activePartner.id === partner.id;
                  const LogoComponent = partner.Logo;
                  return (
                    <button
                      key={partner.id}
                      onClick={() => handleSelectPartner(partner)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-500/50 text-white'
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

          {/* Dynamic HUD Inspection Dock */}
          <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.04] via-emerald-500/[0.03] to-white/[0.04] border border-white/10 backdrop-blur-xl relative shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left: Active Partner Identity & Description */}
              <div className="flex items-start sm:items-center gap-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.06] border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-white shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  {React.createElement(activePartner.Logo, { className: 'w-8 h-8 sm:w-9 sm:h-9' })}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <h4 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                      {activePartner.name}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                      {activePartner.tag}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      • {activePartner.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 leading-relaxed max-w-2xl font-light">
                    {activePartner.description}
                  </p>
                </div>
              </div>

              {/* Right: Real Benchmark Metrics */}
              <div className="flex sm:flex-row lg:flex-col items-center sm:items-start lg:items-end gap-3 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-400">Verified Metric:</span>
                  <span className="font-mono text-emerald-300 font-medium text-sm sm:text-base">
                    {activePartner.stats}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-400">Runtime Pipeline:</span>
                  <span className="font-mono text-white/90 text-xs">
                    {activePartner.latency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: ARCHITECTURE MATRIX (BENTO GRID) */}
      {viewMode === 'matrix' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 relative max-w-7xl mx-auto">
          {TECH_PARTNERS.map((partner) => {
            const isSelected = activePartnerId === partner.id;
            const LogoComponent = partner.Logo;
            return (
              <div
                key={partner.id}
                onClick={() => handleSelectPartner(partner)}
                className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-md flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/[0.08] border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/40'
                    : 'bg-white/[0.02] border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.05]'
                }`}
              >
                {/* Subtle top indicator bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                    isSelected ? 'bg-emerald-400' : 'bg-transparent group-hover:bg-emerald-500/30'
                  }`}
                />

                <div>
                  {/* Top Bar: Official Logo & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`p-2.5 rounded-xl bg-white/[0.04] border border-white/10 transition-all duration-300 ${
                        isSelected
                          ? 'text-white border-emerald-500/40 bg-emerald-500/10'
                          : 'text-gray-300 group-hover:text-white group-hover:border-white/20'
                      }`}
                    >
                      <LogoComponent className="w-7 h-7" />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5 group-hover:border-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                      {partner.tag}
                    </span>
                  </div>

                  {/* Name & Vendor */}
                  <h4 className="text-lg font-medium text-white mb-0.5 group-hover:text-emerald-300 transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-emerald-400/90 font-mono mb-3">
                    {partner.category}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {partner.description}
                  </p>
                </div>

                {/* Bottom Metric & Status */}
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

      {/* Enterprise Architecture Trust Banner */}
      <div className="mt-14 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-emerald-500/[0.03] via-white/[0.02] to-emerald-500/[0.03] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-medium text-white">Direct Engine & Hardware Integration</h5>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
              Flik runs directly on native Unreal Engine 5.4+ with NVIDIA RTX cloud streaming, sub-50ms glass-to-glass latency, and zero third-party telemetry interception.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-gray-400 flex-shrink-0">
          <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 font-mono">
            Unreal 5.4+
          </span>
          <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 font-mono">
            RTX Cloud
          </span>
          <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 font-mono">
            Cesium OGC
          </span>
        </div>
      </div>
    </div>
  );
};

export default TechStackShowcase;

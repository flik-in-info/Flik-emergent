import React from 'react';
import Card3DTilt from './3d/Card3DTilt';
import { soundFX } from '../utils/soundEffects';

const PARTNERS = [
  {
    id: 'unreal',
    name: 'Unreal Engine',
    category: 'Real-Time 3D Engine',
    desc: 'Lumen & Nanite micro-polygon architecture',
    svg: (
      <svg className="h-8 lg:h-10 w-auto fill-current" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M50 14 C30 14 14 30 14 50 C14 70 30 86 50 86 C70 86 86 70 86 50 C86 30 70 14 50 14 Z M50 20 C66.5 20 80 33.5 80 50 C80 66.5 66.5 80 50 80 C33.5 80 20 66.5 20 50 C20 33.5 33.5 20 50 20 Z" />
        <path d="M38 32 L44 32 L44 54 C44 58 46 61 50 61 C54 61 56 58 56 54 L56 32 L62 32 L62 54 C62 63 57 68 50 68 C43 68 38 63 38 54 Z" />
        <circle cx="50" cy="74" r="2.5" />
      </svg>
    ),
    attribution: 'Unreal® Engine is a trademark of Epic Games, Inc.',
  },
  {
    id: 'cesium',
    name: 'Cesium',
    category: '3D Geospatial & Tiling',
    desc: 'Global 3D Tiles & high-precision GIS coordinates',
    svg: (
      <svg className="h-8 lg:h-10 w-auto fill-current" viewBox="0 0 140 40">
        <g stroke="currentColor" strokeWidth="1.8" fill="none">
          <circle cx="20" cy="20" r="15" />
          <ellipse cx="20" cy="20" rx="15" ry="6" />
          <line x1="20" y1="5" x2="20" y2="35" />
          <line x1="5" y1="20" x2="35" y2="20" />
        </g>
        <text x="44" y="26" fill="currentColor" fontFamily="sans-serif" fontSize="18" fontWeight="700" letterSpacing="1">
          CESIUM
        </text>
      </svg>
    ),
    attribution: 'Powered by Cesium 3D Tiles geospatial platform',
  },
  {
    id: 'google-maps',
    name: 'Google Maps 3D',
    category: 'Photorealistic City Tiles',
    desc: 'Altitude-accurate surrounding contextual 3D mesh',
    svg: (
      <svg className="h-8 lg:h-10 w-auto fill-current" viewBox="0 0 170 40">
        <path d="M18 5 C11.4 5 6 10.4 6 17 C6 25 18 35 18 35 C18 35 30 25 30 17 C30 10.4 24.6 5 18 5 Z M18 21 C15.8 21 14 19.2 14 17 C14 14.8 15.8 13 18 13 C20.2 13 22 14.8 22 17 C22 19.2 20.2 21 18 21 Z" />
        <text x="38" y="24" fill="currentColor" fontFamily="sans-serif" fontSize="14" fontWeight="600" letterSpacing="0.5">
          Google Maps 3D
        </text>
      </svg>
    ),
    attribution: 'Google Maps Platform Photorealistic 3D Tiles',
  },
  {
    id: 'epic-games',
    name: 'Epic Games',
    category: 'Spatial Graphics Ecosystem',
    desc: 'Unreal Developer Network ecosystem partner',
    svg: (
      <svg className="h-8 lg:h-10 w-auto fill-current" viewBox="0 0 100 40">
        <path d="M8 6 L26 6 L30 20 L26 34 L8 34 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <text x="36" y="20" fill="currentColor" fontFamily="sans-serif" fontSize="11" fontWeight="800" letterSpacing="1.5">
          EPIC
        </text>
        <text x="36" y="32" fill="currentColor" fontFamily="sans-serif" fontSize="11" fontWeight="700" letterSpacing="1">
          GAMES
        </text>
      </svg>
    ),
    attribution: 'Epic Games Developer Ecosystem',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA RTX',
    category: 'GPU Pixel Streaming',
    desc: 'CloudXR, DLSS & ray-traced streaming infrastructure',
    svg: (
      <svg className="h-7 lg:h-9 w-auto fill-current" viewBox="0 0 130 40">
        <path d="M22 10 C14 10 8 16 8 23 C8 28 12 32 17 33 L17 29 C14 28 12 25 12 22 C12 17 17 13 22 13 C26 13 30 16 31 20 L35 18 C33 13 28 10 22 10 Z" />
        <path d="M22 6 C12 6 4 14 4 23 C4 30 9 36 17 37 L17 34 C11 33 7 28 7 23 C7 15 14 9 22 9 C28 9 33 13 35 18 L38 16 C35 10 29 6 22 6 Z" />
        <text x="44" y="26" fill="currentColor" fontFamily="sans-serif" fontSize="17" fontWeight="800" letterSpacing="1.5">
          NVIDIA
        </text>
      </svg>
    ),
    attribution: 'NVIDIA RTX & CloudXR Infrastructure',
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'Global Edge Delivery',
    desc: 'Ultra-low latency edge instances worldwide',
    svg: (
      <svg className="h-7 lg:h-9 w-auto fill-current" viewBox="0 0 110 40">
        <text x="10" y="24" fill="currentColor" fontFamily="sans-serif" fontSize="19" fontWeight="800" letterSpacing="1">
          aws
        </text>
        <path d="M12 28 Q32 38 56 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M52 27 L57 28 L55 33 Z" fill="currentColor" />
      </svg>
    ),
    attribution: 'Amazon Web Services Cloud Infrastructure',
  },
  {
    id: 'autodesk',
    name: 'Autodesk Revit & BIM',
    category: 'CAD/BIM Ingestion',
    desc: 'Direct ingestion from Revit, IFC, Rhino & 3ds Max',
    svg: (
      <svg className="h-8 lg:h-10 w-auto fill-current" viewBox="0 0 150 40">
        <path d="M14 6 L28 22 L22 34 L12 34 L8 28 L18 20 L12 14 Z" fill="currentColor" />
        <text x="36" y="25" fill="currentColor" fontFamily="sans-serif" fontSize="15" fontWeight="700" letterSpacing="1">
          AUTODESK
        </text>
      </svg>
    ),
    attribution: 'Autodesk® Revit® & BIM interoperability',
  },
  {
    id: 'matterport',
    name: 'Matterport',
    category: 'Spatial Capture & Twin',
    desc: 'Digital twin scan synchronization',
    svg: (
      <svg className="h-7 lg:h-9 w-auto fill-current" viewBox="0 0 140 40">
        <circle cx="12" cy="14" r="4.5" />
        <circle cx="24" cy="14" r="4.5" />
        <circle cx="18" cy="24" r="4.5" />
        <text x="36" y="24" fill="currentColor" fontFamily="sans-serif" fontSize="15" fontWeight="700" letterSpacing="0.5">
          Matterport
        </text>
      </svg>
    ),
    attribution: 'Matterport spatial data integration',
  },
  {
    id: 'apple',
    name: 'Apple Vision Pro',
    category: 'Spatial Computing',
    desc: 'Native Safari WebGL & visionOS spatial streaming',
    svg: (
      <svg className="h-8 lg:h-10 w-auto fill-current" viewBox="0 0 110 40">
        <path d="M17 12 C18 10 19 8.5 18.5 7 C17 7.2 15.5 8.2 14.8 9.2 C14.1 10 13.5 11.5 14.2 13 C15.8 13.2 17.2 12.2 17 12 Z M21 21 C21 17.5 23.5 16 23.6 15.9 C22 13.5 19.5 13.2 18.6 13.1 C16.5 12.9 14.5 14.3 13.4 14.3 C12.3 14.3 10.7 13.1 9 13.1 C6.8 13.1 4.7 14.4 3.6 16.3 C1.3 20.3 3 26.2 5.2 29.4 C6.3 31 7.6 32.7 9.3 32.6 C11 32.5 11.7 31.5 13.7 31.5 C15.7 31.5 16.3 32.6 18.1 32.6 C19.9 32.6 21 31.1 22.1 29.5 C23.4 27.6 23.9 25.8 24 25.7 C23.8 25.6 21 24.5 21 21 Z" />
        <text x="32" y="24" fill="currentColor" fontFamily="sans-serif" fontSize="15" fontWeight="600" letterSpacing="0.5">
          Apple
        </text>
      </svg>
    ),
    attribution: 'Optimized for Apple Safari & visionOS',
  },
  {
    id: 'meta',
    name: 'Meta Spatial',
    category: 'WebXR Runtime',
    desc: 'Cross-platform VR showroom deployment',
    svg: (
      <svg className="h-7 lg:h-9 w-auto fill-current" viewBox="0 0 110 40">
        <path d="M18 14 C13 14 9 18 9 22 C9 26 13 30 18 30 C22 30 25 26 27 23 C29 26 32 30 36 30 C41 30 45 26 45 22 C45 18 41 14 36 14 C32 14 29 18 27 21 C25 18 22 14 18 14 Z M18 18 C20 18 22 20 24 22 C22 24 20 26 18 26 C15 26 13 24 13 22 C13 20 15 18 18 18 Z M36 18 C39 18 41 20 41 22 C41 24 39 26 36 26 C34 26 32 24 30 22 C32 20 34 18 36 18 Z" />
        <text x="52" y="25" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="700">
          Meta
        </text>
      </svg>
    ),
    attribution: 'Meta Reality Labs WebXR standard',
  },
  {
    id: 'webrtc',
    name: 'WebRTC Protocol',
    category: 'Ultra-Low Latency',
    desc: 'Sub-40ms real-time pixel streaming to mobile browsers',
    svg: (
      <svg className="h-7 lg:h-9 w-auto fill-current" viewBox="0 0 130 40">
        <circle cx="14" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="28" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <text x="44" y="25" fill="currentColor" fontFamily="sans-serif" fontSize="15" fontWeight="700" letterSpacing="0.8">
          WebRTC
        </text>
      </svg>
    ),
    attribution: 'W3C WebRTC Standard Pixel Streaming',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'Spatial AI Voice',
    desc: 'Multilingual real-time AI sales voice commentary',
    svg: (
      <svg className="h-7 lg:h-9 w-auto fill-current" viewBox="0 0 140 40">
        <rect x="10" y="10" width="4" height="20" rx="2" />
        <rect x="18" y="10" width="4" height="20" rx="2" />
        <text x="30" y="25" fill="currentColor" fontFamily="sans-serif" fontSize="14" fontWeight="700">
          ElevenLabs
        </text>
      </svg>
    ),
    attribution: 'AI Spatial Voice Synthesis',
  },
];

const TechStackPartners = () => {
  return (
    <section className="relative py-24 bg-[#08090b] border-y border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-emerald-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-emerald-400 text-xs font-mono font-medium uppercase tracking-widest mb-4">
            <span>Ecosystem & Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            Powered by Industry Leaders
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
            Enterprise-Grade Technology Stack for Maximum Performance & Global Spatial Fidelity
          </p>
        </div>

        {/* Logo Cloud Grid with 3D Tilt & Specular Sheen */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {PARTNERS.map((partner) => (
            <Card3DTilt
              key={partner.id}
              maxTilt={7}
              className="group p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between items-center text-center cursor-default"
              onMouseEnter={() => soundFX.playClick()}
            >
              <div className="w-full flex items-center justify-center min-h-[56px] text-gray-400 group-hover:text-white transition-colors duration-300">
                {partner.svg}
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 w-full">
                <span className="block text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium mb-1">
                  {partner.category}
                </span>
                <p className="text-[11px] text-gray-400 font-light leading-snug">
                  {partner.desc}
                </p>
              </div>
            </Card3DTilt>
          ))}
        </div>

        {/* Attribution & Compliance Disclaimer Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <p className="text-xs text-gray-400 font-mono">
                Official Spatial Stack: Unreal® Engine 5 · Cesium® 3D Tiles · Google Maps Platform Photorealistic 3D Tiles · NVIDIA® RTX CloudXR · Autodesk® BIM
              </p>
            </div>
            <p className="text-[11px] text-gray-400 font-light">
              All product names, logos, and brands are property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackPartners;

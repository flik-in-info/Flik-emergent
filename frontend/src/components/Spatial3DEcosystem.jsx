import React, { useState } from 'react';
import { Box, Layers, Globe, Sparkles, Sliders, ArrowRight, Eye, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';
import ThreeMaterialsLab from './ThreeMaterialsLab';
import ThreeFloorPlanCanvas from './ThreeFloorPlanCanvas';
import ThreeGlobalCloudGlobe from './ThreeGlobalCloudGlobe';
import SpatialElementsModal from './SpatialElementsModal';

export default function Spatial3DEcosystem() {
  const [activeTab, setActiveTab] = useState('materials'); // 'materials' | 'floorplan' | 'globe'
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  return (
    <section id="capabilities" className="py-24 relative overflow-hidden bg-[#050507]">
      {/* Background 3D Perspective Ground Grid (Element #43) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full luxury-glass border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
              <Box className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>50 SPATIAL 3D ELEMENTS · WEBGPU ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl leading-tight">
              A Living 3D Ecosystem.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Not A Static Image.
              </span>
            </h2>
          </div>

          {/* Button to Open the 50 3D Elements Catalog Inspector */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsInspectorOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all transform hover:scale-105"
            >
              <Box className="w-4 h-4" />
              <span>INSPECT ALL 50 3D ELEMENTS</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-black text-[10px]">50 ACTIVE</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher for 3D Studios */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 max-w-fit mb-8 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setActiveTab('materials')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'materials'
                ? 'bg-emerald-500 text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Materials & Shaders (Studio #1)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('floorplan')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'floorplan'
                ? 'bg-emerald-500 text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Procedural Floor Plan (Studio #2)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('globe')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'globe'
                ? 'bg-emerald-500 text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3D Global Cloud Nodes (Studio #3)</span>
          </button>
        </div>

        {/* Interactive 3D Workspace Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main 3D Interactive Canvas (Span 8) */}
          <div className="lg:col-span-8 min-h-[480px]">
            {activeTab === 'materials' && <ThreeMaterialsLab />}
            {activeTab === 'floorplan' && <ThreeFloorPlanCanvas />}
            {activeTab === 'globe' && <ThreeGlobalCloudGlobe />}
          </div>

          {/* Right Bento Cards (Span 4) — 3D Spatial UI Widgets */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            {/* 3D Card #1: Architectural Isometric Cutaway (Element #16) */}
            <div className="p-6 rounded-3xl luxury-glass border border-white/10 card-3d-tilt relative group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Element #16 · Isometric Cutaway
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">4-Layer Spatial Structure</h4>
              <p className="text-xs text-gray-300 font-light mb-4">
                Full volumetric separation from Foundation Piering to Nanite Balconies.
              </p>

              <div className="space-y-1.5 font-mono text-xs">
                {['04. Penthouse Roof Deck & Pool', '03. Architectural Interior Fitout', '02. MEP & Smart HVAC Infrastructure', '01. Post-Tensioned Concrete Slab'].map((layer, idx) => (
                  <div
                    key={layer}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 transition-colors"
                  >
                    <span className="text-gray-300">{layer}</span>
                    <span className="text-emerald-400 text-[10px]">LOD 400</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Card #2: Live Inventory Voxel Tower Stacker (Element #20) */}
            <div className="p-6 rounded-3xl luxury-glass border border-white/10 card-3d-tilt relative group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Element #20 · Voxel Inventory
                </span>
                <span className="text-xs font-mono text-gray-400">72 Floors Sync</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">Live Unit Stacker Matrix</h4>
              <p className="text-xs text-gray-300 font-light mb-3">
                Every unit in the twin is bound to developer CRM inventory status.
              </p>

              {/* Voxel Micro Grid */}
              <div className="grid grid-cols-8 gap-1.5 p-3 rounded-xl bg-black/40 border border-white/10 mb-3">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-4 rounded-sm transition-transform hover:scale-125 ${
                      i === 31 || i === 28
                        ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' // Reserved
                        : i % 3 === 0
                        ? 'bg-gray-700' // Sold
                        : 'bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' // Available
                    }`}
                    title={i === 31 ? 'Penthouse (Reserved)' : i % 3 === 0 ? 'Unit Sold' : 'Unit Available'}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> 847 Live
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> 14 Hold
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gray-600" /> 280 Sold
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spatial 3D Elements Catalog Modal */}
      <SpatialElementsModal isOpen={isInspectorOpen} onClose={() => setIsInspectorOpen(false)} />
    </section>
  );
}

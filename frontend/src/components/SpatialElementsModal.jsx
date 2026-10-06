import React, { useState } from 'react';
import { X, Box, Sparkles, Layers, Cpu, Compass, CheckCircle2, Search, Sliders } from 'lucide-react';
import { SPATIAL_3D_ELEMENTS } from '../data/spatialElementsCatalog';

export default function SpatialElementsModal({ isOpen, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = ['All', 'WebGL Engine', 'Spatial HUD', 'Spatial UI', 'Tactile Control', 'Environment'];

  const filteredElements = SPATIAL_3D_ELEMENTS.filter((el) => {
    const matchesCat = selectedCategory === 'All' || el.cat === selectedCategory;
    const matchesSearch =
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.tech.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-white/20 bg-[#07070a] shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Box className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">50 Spatial 3D Elements Catalog</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
                  50 / 50 ACTIVE
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">
                Engineered for 60 FPS WebGL, Three.js, & Hardware-Accelerated CSS-3D
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b border-white/10 bg-white/[0.01] flex flex-wrap items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search elements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
        </div>

        {/* Elements Grid List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredElements.map((el) => (
              <div
                key={el.id}
                className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-mono text-emerald-400 border border-white/10 font-bold">
                      #{el.id.toString().padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {el.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                    {el.cat}
                  </span>
                </div>

                <p className="text-xs text-gray-300 font-light mb-2.5 leading-relaxed">{el.desc}</p>

                <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Cpu className="w-3 h-3 text-cyan-400" />
                    <span>{el.tech}</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>60 FPS Active</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredElements.length === 0 && (
            <div className="py-12 text-center text-gray-500 font-mono text-xs">
              No matching 3D elements found for "{searchQuery}".
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono text-gray-400">
          <span>Showing {filteredElements.length} of 50 spatial elements</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}

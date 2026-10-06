import React from 'react';
import { Building2, Sparkles, ArrowRight, ShieldCheck, Check, Globe2, Compass } from 'lucide-react';
import { images } from '../data/mock';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';

const FlagshipShowcase = () => {
  const { open: openDemoDialog } = useDemoDialog();

  return (
    <section id="flagship-case-study" className="relative py-32 bg-[#09090b] overflow-hidden border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMERCIAL TRACTION · FLAGSHIP CASE STUDY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">Live with India&apos;s leading developers.</span>
            <span className="block font-medium text-gradient-emerald">
              Flagship Deployment: Ajmera Cityscapes.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            At Ajmera Cityscapes, a landmark luxury residential project in Mumbai, Flik Explorer eliminated the dependency on a ₹3+ Crore physical sample flat, giving high-net-worth and NRI buyers an interactive 3D twin months before completion.
          </p>
        </div>

        {/* Showcase Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center rounded-3xl overflow-hidden border border-white/10 bg-[#0c0c0f] p-8 lg:p-12 shadow-2xl">
          
          {/* Left Details Column (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block">
                DEPLOYMENT METRICS · MUMBAI
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-white">
                Ajmera Cityscapes Luxury Residences
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Rather than forcing every buyer into a single ground-level sample flat, sales teams equipped with Flik Explorer let prospects inspect the exact panoramic balcony view from their chosen 28th-floor unit and test daylight conditions live.
              </p>
            </div>

            {/* Metrics highlight */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-light text-white font-mono">100%</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">Sample Flat Replaced</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-light text-white font-mono">4.2x</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">Buyer Engagement</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-light text-white font-mono">78%</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">NRI Pre-Sales Velocity</div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-gray-300 font-light">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Zero app installs required—shared seamlessly over WhatsApp with overseas NRIs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Live integration with sales gallery 4K touch displays and CRM pipelines</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Permanent reusable asset that updates as construction reaches superstructure</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                onClick={() => openDemoDialog('ajmera_case_study')}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(34,229,90,0.3)]"
              >
                Request Ajmera Case Study Blueprint
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>

          {/* Right Image Showcase Column (6 cols) */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl card-3d-tilt">
            <img
              src={images.showroom}
              alt="Ajmera Cityscapes Flik Explorer Digital Twin Deployment"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 luxury-glass rounded-xl p-4 text-xs font-mono text-gray-300 border border-white/15 max-w-sm">
              <div className="text-emerald-400 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AJMERA CITYSCAPES LIVE TWIN</span>
              </div>
              <div className="text-gray-400 text-[11px] leading-relaxed">
                Deployed live at sales centers and shared with NRI prospects in Dubai, London, and Singapore.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FlagshipShowcase;

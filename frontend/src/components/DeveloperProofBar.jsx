import React from 'react';
import { ShieldCheck, Building2, Zap, Globe2, Sparkles, ArrowUpRight } from 'lucide-react';
import { useDemoDialog } from '../context/DemoDialogContext';

const PROOF_POINTS = [
  {
    icon: Building2,
    badge: 'Enterprise Deployments',
    title: 'Tier-1 Towers',
    subtitle: 'High-rise residential, Mumbai & Bengaluru',
    highlight: 'Active 3D Twins',
  },
  {
    icon: Zap,
    badge: 'Capital Efficiency',
    title: '₹2 to ₹5 Crore',
    subtitle: 'Sample flat cost eliminated per project',
    highlight: '90% Cost Cut',
  },
  {
    icon: ShieldCheck,
    badge: 'Sales Acceleration',
    title: '2–4 Weeks',
    subtitle: 'Turnaround from 2D CAD/BIM drawings',
    highlight: 'Pre-Sales Ready',
  },
  {
    icon: Globe2,
    badge: 'Global NRI Sales',
    title: 'Zero App Installs',
    subtitle: '1-click browser link sent over WhatsApp',
    highlight: 'UAE · US · UK · SG',
  },
];

const DeveloperProofBar = () => {
  const { open: openDemoDialog } = useDemoDialog();

  return (
    <section className="relative py-12 bg-[#08080a] border-y border-white/[0.06] overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-32 bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-32 bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header label */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-400">
              COMMERCIAL PROOF · REAL ESTATE ENTERPRISE DEPLOYMENTS
            </span>
          </div>

          <button
            onClick={() => openDemoDialog('proof_bar_enterprise')}
            className="group inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors duration-200"
          >
            <span>Request an Enterprise Spatial Blueprint</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Proof Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROOF_POINTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative p-5 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.05] hover:border-emerald-500/30 transition-all duration-300 card-3d-tilt"
              >
                {/* Top Corner Crosshair CAD marker */}
                <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-700 group-hover:text-emerald-500/50 transition-colors">
                  +
                </div>

                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {item.highlight}
                  </span>
                </div>

                <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-1">
                  {item.badge}
                </div>
                <h3 className="text-lg font-medium text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DeveloperProofBar;

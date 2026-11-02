import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ExperienceSection from '../components/ExperienceSection';
import TechStackShowcase from '../components/TechStackShowcase';
import MetricsSection from '../components/MetricsSection';
import ClosingCTA from '../components/ClosingCTA';
import Footer from '../components/Footer';
import { ArrowRight, Compass, Eye, BarChart3, Cpu, Sparkles } from 'lucide-react';

const PILLARS = [
  {
    id: 'platform',
    number: '01',
    title: 'The Platform',
    subtitle: 'Decision-Making Environment',
    description: 'Transform architectural visualization into a real-time sales ecosystem with live inventory, unit locking, and multi-device access.',
    href: '/platform',
    icon: Compass,
    accent: '#10b981'
  },
  {
    id: 'experience',
    number: '02',
    title: 'Real-Time Experience',
    subtitle: 'Photorealism That Responds',
    description: 'Powered by Unreal Engine 5. Dynamic time-of-day lighting, balustrade sightline simulation, and interactive 3D floorplan customization.',
    href: '/experience',
    icon: Eye,
    accent: '#06b6d4'
  },
  {
    id: 'intelligence',
    number: '03',
    title: 'Sales Intelligence',
    subtitle: 'Telemetry & Buyer Analytics',
    description: 'Track dwell times, unit heatmaps, and high-intent buyer behavior. Turn visitor attention into actionable sales data.',
    href: '/intelligence',
    icon: BarChart3,
    accent: '#8b5cf6'
  },
  {
    id: 'technology',
    number: '04',
    title: 'Enterprise Technology',
    subtitle: '14 Verified Protocols',
    description: 'NVIDIA RTX neural cloud streaming, sub-50ms glass-to-glass latency, Cesium 3D geospatial tiles, and zero-install WebXR.',
    href: '/technology',
    icon: Cpu,
    accent: '#76b900'
  }
];

const HomePage = () => {
  return (
    <div className="bg-[#0a0a0b] min-h-screen text-gray-200">
      <Header />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* 4 Core Pillars Gateway */}
        <section className="relative py-24 bg-[#08080a] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Architecture · Intelligence · Sales</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Built for Real Estate Developers Who Move Fast
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
                Explore our core platform pillars or dive directly into the dedicated sections above.
              </p>
            </div>

            {/* Pillars 4-Column Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Link
                    key={pillar.id}
                    to={pillar.href}
                    className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top Accent Strip */}
                    <div
                      style={{ backgroundColor: pillar.accent }}
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
                    />

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-mono text-gray-500 tracking-widest">{pillar.number}</span>
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-xl font-medium text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-mono text-emerald-400/90 mb-3.5">
                        {pillar.subtitle}
                      </p>
                      <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                      <span>Explore {pillar.title}</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Live Interactive 3D Experience */}
        <ExperienceSection />

        {/* Enterprise Tech Ecosystem & NVIDIA Inception */}
        <TechStackShowcase />

        {/* Quantified Business Impact Metrics */}
        <MetricsSection />

        {/* Closing CTA */}
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

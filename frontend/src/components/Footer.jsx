import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';
import { footerData, contactData, images } from '../data/mock';
import AdminAuthModal, { isAdminAuthenticated } from './AdminAuthModal';

const SOCIAL_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', href: contactData.socials.linkedin, icon: Linkedin },
  { id: 'instagram', label: 'Instagram', href: contactData.socials.instagram, icon: Instagram },
];

const STARTUP_PROGRAMS = [
  {
    id: 'nvidia',
    category: 'Spatial Computing',
    status: 'Member',
    badge: '/nvidia-inception-dark-badge.svg',
    alt: 'NVIDIA Inception Program member badge',
    href: 'https://www.nvidia.com/en-us/startups/',
    borderColor: 'hover:border-[#76B900]/50 hover:shadow-[0_0_30px_rgba(118,185,0,0.15)]',
    glowColor: 'bg-[#76B900]/10 group-hover:bg-[#76B900]/25',
    tagColor: 'text-emerald-400',
    description: 'Accelerated GPU computing, neural radiance caching, and enterprise edge rendering.',
  },
  {
    id: 'aws',
    category: 'Cloud Infrastructure',
    status: 'Activate',
    badge: '/aws-startups-program-badge.svg',
    alt: 'AWS Activate Program member badge',
    href: 'https://aws.amazon.com/startups/',
    borderColor: 'hover:border-[#FF9900]/50 hover:shadow-[0_0_30px_rgba(255,153,0,0.15)]',
    glowColor: 'bg-[#FF9900]/10 group-hover:bg-[#FF9900]/25',
    tagColor: 'text-amber-400',
    description: 'Global CloudFront edge delivery, ultra-low latency compute clusters, and 99.9% uptime SLA.',
  },
  {
    id: 'claude',
    category: 'Frontier AI',
    status: 'Startups',
    badge: '/claude-startups-program-badge.svg',
    alt: 'Claude Startups Program member badge',
    href: 'https://www.anthropic.com/',
    borderColor: 'hover:border-[#D97757]/50 hover:shadow-[0_0_30px_rgba(217,119,87,0.15)]',
    glowColor: 'bg-[#D97757]/10 group-hover:bg-[#D97757]/25',
    tagColor: 'text-[#D97757]',
    description: 'Domain reasoning, automated floorplan intelligence, and deep conversational buyer context.',
  },
  {
    id: 'elevenlabs',
    category: 'Generative Audio',
    status: 'Grant',
    badge: '/elevenlabs-grants-program-badge.svg',
    alt: 'ElevenLabs Startup Grants recipient badge',
    href: 'https://elevenlabs.io/startups',
    borderColor: 'hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    glowColor: 'bg-purple-500/10 group-hover:bg-purple-500/25',
    tagColor: 'text-purple-400',
    description: 'Human-parity multilingual voice guidance across 29+ languages for real-time buyer tours.',
  },
];

const SocialIcons = () => (
  <div className="flex items-center gap-3 mt-8" data-testid="footer-socials">
    {SOCIAL_LINKS.map(({ id, label, href, icon: Icon }) => (
      <a
        key={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`footer-social-${id}`}
        aria-label={label}
        className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-300"
      >
        <Icon className="w-4 h-4" />
      </a>
    ))}
  </div>
);

const FooterLinkColumn = ({ title, links }) => (
  <>
    <h4 className="text-white font-medium mb-6">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => {
        const isInternal = link.href.startsWith('/');
        return (
          <li key={link.label}>
            {isInternal ? (
              <Link
                to={link.href}
                className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
              >
                {link.label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  </>
);

const FooterBrand = () => (
  <div className="lg:col-span-2">
    <Link to="/" className="flex items-center mb-6">
      <img 
        src={images.logo} 
        alt="Flik Explorer - Real-Time 3D Digital Twin Platform" 
        loading="lazy"
        decoding="async"
        className="h-10 w-auto" 
      />
    </Link>
    <p className="text-gray-500 leading-relaxed max-w-sm">{footerData.tagline}</p>

    <div className="mt-8 space-y-2 text-sm">
      <a
        href={`mailto:${contactData.email}`}
        data-testid="footer-email"
        className="block text-gray-400 hover:text-white transition-colors duration-300"
      >
        {contactData.email}
      </a>
      <a
        href={`tel:+${contactData.phoneRaw}`}
        data-testid="footer-phone"
        className="block text-gray-400 hover:text-white transition-colors duration-300"
      >
        {contactData.phone}
      </a>
    </div>

    <SocialIcons />

    <p className="text-gray-600 text-sm mt-8">{footerData.copyright}</p>
  </div>
);

const Footer = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = (e) => {
    e.preventDefault();
    if (isAdminAuthenticated()) {
      navigate('/pulse');
    } else {
      setIsAdminOpen(true);
    }
  };

  return (
    <footer className="bg-[#070708] border-t border-white/5">
      {/* 5-Column Navigation Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          <FooterBrand />
          <div>
            <FooterLinkColumn title="Platform" links={footerData.platform} />
          </div>
          <div>
            <FooterLinkColumn title="Company" links={footerData.company} />
          </div>
          <div>
            <div className="mb-8">
              <FooterLinkColumn title="Resources" links={footerData.resources.slice(0, 3)} />
            </div>
            <FooterLinkColumn title="Legal" links={footerData.legal} />
          </div>
        </div>
      </div>

      {/* Global Startup Accelerator & Grant Programs */}
      <div className="border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Global Accelerator & Frontier Ecosystem
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                Backed by Global Technology Giants
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed font-light">
              Flik Explorer is officially accelerated and backed by the world's premier spatial computing, cloud infrastructure, and frontier AI startup ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STARTUP_PROGRAMS.map(({ id, category, status, badge, alt, href, borderColor, glowColor, tagColor, description }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 ${borderColor} transition-all duration-500 flex flex-col justify-between overflow-hidden`}
              >
                {/* Brand Aura Glow */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 ${glowColor} rounded-full blur-2xl pointer-events-none transition-all duration-500`} />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className={`text-[10px] font-mono tracking-widest uppercase ${tagColor} font-medium`}>
                      {category}
                    </span>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.05] text-gray-300 border border-white/10 group-hover:border-white/20 transition-colors">
                      {status}
                    </span>
                  </div>

                  {/* Brand Logo Lockup */}
                  <div className="py-1">
                    <img
                      src={badge}
                      alt={alt}
                      className="h-9 sm:h-10 w-auto object-contain filter group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-6 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                  {description}
                </p>
              </a>
            ))}
          </div>

          {/* Pedigree Endorsement Strip */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-light">
            <p className="leading-relaxed text-center sm:text-left">
              Flik is an official member of NVIDIA Inception, AWS Activate, and Claude Startups, and a recipient of the ElevenLabs Startup Grant.
            </p>
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-gray-600 font-mono text-[10px] uppercase tracking-wider">
              <span>DLSS 3.5 & RTX</span>
              <span>·</span>
              <span>AWS CloudFront</span>
              <span>·</span>
              <span>Claude 3.7 Sonnet</span>
              <span>·</span>
              <span>ElevenLabs TTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Admin Gate & Legal Trademarks */}
      <div className="border-t border-white/5 bg-[#050506]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm text-center sm:text-left">{footerData.bottomBar}</p>
            <button
              onClick={handleAdminClick}
              data-testid="footer-admin-btn"
              className="text-gray-600 hover:text-emerald-400 text-xs font-mono transition-colors tracking-widest lowercase hover:underline opacity-80 hover:opacity-100"
              title="Flik Admin Access (Passcode: 2822)"
            >
              admin
            </button>
          </div>
          <p className="text-[11px] text-gray-600 text-center sm:text-left leading-relaxed">
            © 2026 NVIDIA, the NVIDIA logo, DLSS, NVIDIA Inception, and NVIDIA RTX are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries. Amazon Web Services, AWS, and AWS Activate are trademarks of Amazon.com, Inc. Anthropic and Claude are trademarks of Anthropic PBC. ElevenLabs is a trademark of ElevenLabs Inc.
          </p>
        </div>
      </div>

      {/* Admin Passcode Modal */}
      <AdminAuthModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </footer>
  );
};

export default Footer;

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
    badge: '/nvidia-inception-program-badge-rgb-for-screen.svg',
    alt: 'NVIDIA Inception Program member badge',
    href: 'https://www.nvidia.com/en-us/startups/',
    description: 'Flik is a member of the NVIDIA Inception program.',
  },
  {
    id: 'aws',
    category: 'Cloud Infrastructure',
    badge: '/aws-startups-program-badge.svg',
    alt: 'AWS Activate Program member badge',
    href: 'https://aws.amazon.com/startups/',
    description: 'Flik is a member of the AWS Activate startup program.',
  },
  {
    id: 'claude',
    category: 'Frontier AI',
    badge: '/claude-startups-program-badge.svg',
    alt: 'Claude Startups Program member badge',
    href: 'https://www.anthropic.com/',
    description: 'Flik is a member of the Claude Startups program by Anthropic.',
  },
  {
    id: 'elevenlabs',
    category: 'Voice & Multilingual AI',
    badge: '/elevenlabs-grants-program-badge.svg',
    alt: 'ElevenLabs Startup Grants recipient badge',
    href: 'https://elevenlabs.io/startups',
    description: 'Flik is a recipient of the ElevenLabs Startup Grants program.',
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-emerald-400 text-xs font-mono tracking-widest uppercase block mb-1.5">
                Global Accelerator & Frontier Technology Ecosystem
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                Official Startup & Accelerator Programs
              </h3>
            </div>
            <p className="text-xs text-gray-400 max-w-md leading-relaxed font-light">
              Flik Explorer is officially backed and accelerated by global frontier computing, cloud infrastructure, and generative AI startup ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STARTUP_PROGRAMS.map(({ id, category, alt, badge, href, description }) => (
              <div
                key={id}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400/90 block mb-3.5">
                    {category}
                  </span>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block shrink-0 focus:outline-none"
                  >
                    <img
                      src={badge}
                      alt={alt}
                      className="w-[124px] sm:w-[130px] h-auto object-contain"
                    />
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-4 leading-relaxed font-light">
                  {description}
                </p>
              </div>
            ))}
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

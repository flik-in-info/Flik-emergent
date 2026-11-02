import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';
import { footerData, contactData, images } from '../data/mock';
import AdminAuthModal, { isAdminAuthenticated } from './AdminAuthModal';

const SOCIAL_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', href: contactData.socials.linkedin, icon: Linkedin },
  { id: 'instagram', label: 'Instagram', href: contactData.socials.instagram, icon: Instagram },
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

    {/* NVIDIA Inception Member Area */}
    <div className="mt-8 pt-6 border-t border-white/5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <a
          href="https://www.nvidia.com/en-us/startups/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block shrink-0 focus:outline-none"
        >
          <img
            src="/nvidia-inception-program-badge-rgb-for-screen.svg"
            alt="NVIDIA Inception Program member badge"
            className="w-[120px] sm:w-[128px] h-auto object-contain"
          />
        </a>
        <p className="text-xs text-gray-400 leading-relaxed">
          Flik is a member of the NVIDIA Inception program.
        </p>
      </div>

      <p className="text-gray-600 text-sm mt-5">{footerData.copyright}</p>
    </div>
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
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

      <div className="border-t border-white/5">
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
            © 2026 NVIDIA, the NVIDIA logo, DLSS, NVIDIA Inception, and NVIDIA RTX are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.
          </p>
        </div>
      </div>

      {/* Admin Passcode Modal */}
      <AdminAuthModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </footer>
  );
};

export default Footer;

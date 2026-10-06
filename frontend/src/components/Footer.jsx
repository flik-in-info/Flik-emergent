import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';
import { footerData, contactData, images } from '../data/mock';

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

    <p className="text-gray-600 text-sm mt-8">{footerData.copyright}</p>
  </div>
);

const Footer = () => (
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <p className="text-gray-600 text-sm text-center">{footerData.bottomBar}</p>
      </div>
    </div>
  </footer>
);

export default Footer;

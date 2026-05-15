import React from 'react';
import { footerData, images } from '../data/mock';

const FooterLinkColumn = ({ title, links }) => (
  <>
    <h4 className="text-white font-medium mb-6">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </>
);

const FooterBrand = () => (
  <div className="lg:col-span-2">
    <a href="/" className="flex items-center mb-6">
      <img src={images.logo} alt="Flik" className="h-10 w-auto" />
    </a>
    <p className="text-gray-500 leading-relaxed max-w-sm">{footerData.tagline}</p>
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

import React from 'react';
import { footerData, images } from '../data/mock';

const Footer = () => {
  return (
    <footer className="bg-[#070708] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <a href="/" className="flex items-center mb-6">
              <img 
                src={images.logo} 
                alt="Flik" 
                className="h-10 w-auto"
              />
            </a>
            <p className="text-gray-500 leading-relaxed max-w-sm">
              {footerData.tagline}
            </p>
            <p className="text-gray-600 text-sm mt-8">
              {footerData.copyright}
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-medium mb-6">Platform</h4>
            <ul className="space-y-3">
              {footerData.platform.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-medium mb-6">Company</h4>
            <ul className="space-y-3">
              {footerData.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h4 className="text-white font-medium mb-6">Resources</h4>
            <ul className="space-y-3 mb-8">
              {footerData.resources.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerData.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <p className="text-gray-600 text-sm text-center">
            {footerData.bottomBar}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
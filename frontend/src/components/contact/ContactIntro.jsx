import React from 'react';
import { Mail, Phone, MessageCircle, Sparkles, MapPin } from 'lucide-react';
import { contactData } from '../../data/mock';

const buildWhatsAppLink = () =>
  `https://wa.me/${contactData.phoneRaw}?text=${encodeURIComponent(contactData.whatsappMessage)}`;

const ContactChannel = ({ href, icon: Icon, label, sublabel, testId, target }) => (
  <a
    href={href}
    data-testid={testId}
    {...(target ? { target, rel: 'noopener noreferrer' } : {})}
    className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-300 group"
  >
    <span className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:border-emerald-500/40 group-hover:bg-emerald-500/20 transition-all duration-300 shrink-0">
      <Icon className="w-4 h-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
    </span>
    <span className="flex flex-col min-w-0">
      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 group-hover:text-emerald-400 transition-colors duration-300">
        {label}
      </span>
      <span className="text-sm font-medium text-white truncate">{sublabel}</span>
    </span>
  </a>
);

const ContactIntro = ({ email }) => (
  <div className="lg:col-span-2">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-6">
      <Sparkles className="w-3.5 h-3.5" />
      <span>DIRECT SALES & DEMO INQUIRY</span>
    </div>

    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
      <span className="block font-extralight text-gray-300">Tell us about</span>
      <span className="block font-medium text-gradient-emerald">your project.</span>
    </h2>

    <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
      Deploy Flik Explorer for your upcoming residential or commercial tower. Receive tailored ROI modeling and technical walkthroughs within 24 hours.
    </p>

    <div className="flex flex-col gap-3 mb-8">
      <ContactChannel
        href={`mailto:${email}`}
        icon={Mail}
        label="Direct Inquiries"
        sublabel={email}
        testId="contact-email-link"
      />
      <ContactChannel
        href={`tel:+${contactData.phoneRaw}`}
        icon={Phone}
        label="Phone"
        sublabel={contactData.phone}
        testId="contact-call-link"
      />
      <ContactChannel
        href={buildWhatsAppLink()}
        icon={MessageCircle}
        label="WhatsApp VIP Line"
        sublabel={`Chat directly · ${contactData.phone}`}
        testId="contact-whatsapp-link"
        target="_blank"
      />
    </div>

    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 pt-4 border-t border-white/5">
      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
      <span>MUMBAI, INDIA · GLOBAL NRI COVERAGE</span>
    </div>
  </div>
);

export default ContactIntro;

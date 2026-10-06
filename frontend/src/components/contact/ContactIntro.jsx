import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { contactData } from '../../data/mock';

const buildWhatsAppLink = () =>
  `https://wa.me/+${contactData.phoneRaw}?text=${encodeURIComponent(contactData.whatsappMessage)}`;

const ContactChannel = ({ href, icon: Icon, label, sublabel, testId, target }) => (
  <a
    href={href}
    data-testid={testId}
    {...(target ? { target, rel: 'noopener noreferrer' } : {})}
    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-300 group"
  >
    <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-all duration-300">
      <Icon className="w-4 h-4 text-white group-hover:text-emerald-400 transition-colors duration-300" />
    </span>
    <span className="flex flex-col">
      <span className="text-xs uppercase tracking-wider text-gray-500 group-hover:text-emerald-400 transition-colors duration-300">
        {label}
      </span>
      <span className="text-sm text-white">{sublabel}</span>
    </span>
  </a>
);

const ContactIntro = ({ email }) => (
  <div className="lg:col-span-2">
    <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">
      Contact
    </span>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mt-6 mb-6">
      <span className="block">Tell us about</span>
      <span className="block">your project.</span>
    </h2>
    <p className="text-gray-400 leading-relaxed mb-8">
      Share a few details and we'll prepare a tailored response. Replies in one business day.
    </p>

    <div className="flex flex-col gap-3">
      <ContactChannel
        href={`mailto:${email}`}
        icon={Mail}
        label="Email"
        sublabel={email}
        testId="contact-email-link"
      />
      <ContactChannel
        href={`tel:+${contactData.phoneRaw}`}
        icon={Phone}
        label="Call"
        sublabel={contactData.phone}
        testId="contact-call-link"
      />
      <ContactChannel
        href={buildWhatsAppLink()}
        icon={MessageCircle}
        label="WhatsApp"
        sublabel={`Chat with us · ${contactData.phone}`}
        testId="contact-whatsapp-link"
        target="_blank"
      />
    </div>
  </div>
);

export default ContactIntro;

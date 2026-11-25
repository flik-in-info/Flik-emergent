import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { contactData } from '../../data/mock';
import { telemetry } from '../../utils/telemetry';

const buildWhatsAppLink = () =>
  `https://wa.me/${contactData.phoneRaw}?text=${encodeURIComponent(contactData.whatsappMessage)}`;

const ContactChannel = ({ href, icon: Icon, label, sublabel, testId, target, onClick, telemetryLoc }) => (
  <a
    href={href}
    data-testid={testId}
    data-telemetry-loc={telemetryLoc}
    onClick={onClick}
    {...(target ? { target, rel: 'noopener noreferrer' } : {})}
    className="flex items-center gap-4 px-4 py-3.5 border border-white/15 bg-black hover:border-white/40 transition-colors group"
  >
    <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#22E55A] transition-colors shrink-0" />
    <span className="flex flex-col min-w-0">
      <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <span className="text-sm text-white font-medium truncate">{sublabel}</span>
    </span>
  </a>
);

const ContactIntro = ({ email }) => (
  <div className="lg:col-span-5">
    <h2 className="text-3xl sm:text-4xl font-medium text-white leading-[1.1] tracking-[-0.025em] mb-4">
      Tell us about your project.
    </h2>
    <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8 font-light">
      Share your tower specifications or launch schedule. Our team responds within one business day.
    </p>

    <div className="flex flex-col gap-3">
      <ContactChannel
        href={`mailto:${email}`}
        icon={Mail}
        label="Email"
        sublabel={email}
        testId="contact-email-link"
        onClick={() => telemetry.contactDirectClick('email', email)}
      />
      <ContactChannel
        href={`tel:+${contactData.phoneRaw}`}
        icon={Phone}
        label="Phone"
        sublabel={contactData.phone}
        testId="contact-call-link"
        onClick={() => telemetry.contactDirectClick('phone', contactData.phone)}
      />
      <ContactChannel
        href={buildWhatsAppLink()}
        icon={MessageCircle}
        label="WhatsApp"
        sublabel={`Chat directly (${contactData.phone})`}
        testId="contact-whatsapp-link"
        target="_blank"
        telemetryLoc="contact_intro"
        onClick={() => telemetry.whatsAppClick('contact_intro')}
      />
    </div>

    <div className="mt-8 pt-6 border-t border-white/15 space-y-1 text-xs font-mono">
      <div className="text-gray-500 uppercase tracking-wider text-[11px]">
        Registered Corporate Entity
      </div>
      <div className="text-white font-medium text-sm">
        Hastok Enterprise Pvt. Ltd.
      </div>
      <div className="text-gray-400 text-xs">
        Mumbai, Bengaluru, Dubai
      </div>
    </div>
  </div>
);

export default ContactIntro;

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
    className="flex items-center gap-4 px-4 py-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#00A896] hover:shadow-sm transition-all group"
  >
    <span className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#f4fbfa] group-hover:text-[#0F766E] group-hover:border-[#0F766E]/30 transition-colors shrink-0">
      <Icon className="w-4 h-4" />
    </span>
    <span className="flex flex-col min-w-0">
      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <span className="text-sm text-[#0b1020] font-medium truncate">{sublabel}</span>
    </span>
  </a>
);

const ContactIntro = ({ email }) => (
  <div className="lg:col-span-5">
    <h2 className="text-3xl sm:text-4xl font-medium text-[#0b1020] leading-[1.08] tracking-[-0.03em] mb-4">
      Tell us about your project.
    </h2>
    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
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

    <div className="mt-8 pt-6 border-t border-slate-200 space-y-1 text-xs font-mono">
      <div className="text-slate-400 uppercase tracking-wider text-[11px]">
        Registered Corporate Entity
      </div>
      <div className="text-[#0b1020] font-semibold text-sm">
        Hastok Enterprise Pvt. Ltd.
      </div>
      <div className="text-slate-500 text-xs">
        Mumbai, Bengaluru, Dubai
      </div>
    </div>
  </div>
);

export default ContactIntro;

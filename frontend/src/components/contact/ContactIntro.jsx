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
    className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-[#09090d] border border-white/[0.08] hover:border-[#22E55A]/45 hover:bg-white/[0.04] transition-all duration-300 group shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
  >
    <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-[#22E55A]/45 group-hover:bg-[#22E55A]/15 transition-all duration-300 shrink-0">
      <Icon className="w-4 h-4 text-white group-hover:text-[#22E55A] transition-colors duration-300" />
    </span>
    <span className="flex flex-col min-w-0">
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-gray-500 group-hover:text-[#22E55A] transition-colors duration-300">
        {label}
      </span>
      <span className="text-sm text-white font-medium truncate">{sublabel}</span>
    </span>
  </a>
);

const ContactIntro = ({ email }) => (
  <div className="lg:col-span-2">
    <span className="text-[#22E55A] text-[11px] font-mono font-medium uppercase tracking-[0.22em] block mb-2">
      06 · Private Consultation
    </span>
    <h2 className="text-2xl sm:text-3xl lg:text-[2.65rem] font-light text-white leading-[1.18] tracking-[-0.025em] mb-4">
      <span className="block">Tell us about</span>
      <span className="block mt-1 font-editorial italic font-normal text-gradient-emerald tracking-normal pr-2">
        your project.
      </span>
    </h2>
    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 font-light">
      Share your tower specifications or launch schedule. Our engineering team prepares a tailored 3D walkthrough within one business day.
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
        label="Call"
        sublabel={contactData.phone}
        testId="contact-call-link"
        onClick={() => telemetry.contactDirectClick('phone', contactData.phone)}
      />
      <ContactChannel
        href={buildWhatsAppLink()}
        icon={MessageCircle}
        label="WhatsApp"
        sublabel={`Chat with us · ${contactData.phone}`}
        testId="contact-whatsapp-link"
        target="_blank"
        telemetryLoc="contact_intro"
        onClick={() => telemetry.whatsAppClick('contact_intro')}
      />
    </div>

    {/* Corporate Entity Details */}
    <div className="mt-8 pt-6 border-t border-white/5 space-y-1 text-xs text-gray-500 font-mono">
      <div className="text-gray-400 font-medium tracking-wider uppercase text-[10px]">Corporate Entity</div>
      <div className="text-white font-medium text-sm">Hastok Enterprise Pvt. Ltd.</div>
      <div className="text-gray-500 text-[11px]">Mumbai · Bengaluru · Dubai</div>
    </div>
  </div>
);

export default ContactIntro;

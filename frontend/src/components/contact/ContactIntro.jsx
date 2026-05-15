import React from 'react';
import { Mail } from 'lucide-react';

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
    <a
      href={`mailto:${email}`}
      className="inline-flex items-center gap-3 text-white hover:text-emerald-400 transition-colors duration-300 group"
      data-testid="contact-email-link"
    >
      <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-all duration-300">
        <Mail className="w-4 h-4" />
      </span>
      <span className="text-sm">{email}</span>
    </a>
  </div>
);

export default ContactIntro;

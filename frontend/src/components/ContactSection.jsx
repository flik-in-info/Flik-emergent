import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const CONTACT_EMAIL = 'Contact@flik.in';

const INTEREST_OPTIONS = [
  'Virtual Walkthrough',
  'Modular Explorer',
  'Real-Time Sales Platform',
  'Sales Intelligence & Analytics',
  'Custom Project / Other',
];

const initialState = {
  fullName: '',
  phone: '',
  email: '',
  interest: '',
  message: '',
};

const inputClass =
  'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-emerald-500/40';

const buildMailto = (form) => {
  const subject = `Flik Explore Enquiry — ${form.interest || 'General'}`;
  const lines = [
    `Name: ${form.fullName}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Interest: ${form.interest || '—'}`,
    '',
    'Message:',
    form.message || '—',
  ];
  const body = lines.join('\n');
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

const ContactSuccess = ({ onReset }) => (
  <div className="text-center py-12" data-testid="contact-success">
    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-6">
      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
    </div>
    <h3 className="text-3xl font-light text-white mb-4">Message ready.</h3>
    <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
      Your email client just opened with your enquiry pre-filled and addressed to{' '}
      <span className="text-emerald-400">{CONTACT_EMAIL}</span>. Send it off and a Flik
      specialist will respond within one business day.
    </p>
    <Button
      data-testid="contact-send-another"
      variant="outline"
      onClick={onReset}
      className="border-white/20 text-white hover:bg-white/10"
    >
      Send another enquiry
    </Button>
  </div>
);

const ContactSection = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) {
      setError('Please share your name and email so we can reach back.');
      return;
    }
    window.location.href = buildMailto(form);
    setSubmitted(true);
  };

  const reset = () => {
    setForm(initialState);
    setSubmitted(false);
    setError('');
  };

  return (
    <section id="contact" className="relative py-32 bg-[#0a0a0b]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left — intro */}
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
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-3 text-white hover:text-emerald-400 transition-colors duration-300 group"
              data-testid="contact-email-link"
            >
              <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-all duration-300">
                <Mail className="w-4 h-4" />
              </span>
              <span className="text-sm">{CONTACT_EMAIL}</span>
            </a>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3 rounded-2xl bg-white/[0.02] border border-white/5 p-8 lg:p-10">
            {submitted ? (
              <ContactSuccess onReset={reset} />
            ) : (
              <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-gray-300 text-xs uppercase tracking-wider">
                      Full Name
                    </Label>
                    <Input
                      id="contact-name"
                      data-testid="contact-fullname"
                      value={form.fullName}
                      onChange={update('fullName')}
                      placeholder="Your full name"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone" className="text-gray-300 text-xs uppercase tracking-wider">
                      Phone
                    </Label>
                    <Input
                      id="contact-phone"
                      data-testid="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+91 98xx-xxxxxx"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-gray-300 text-xs uppercase tracking-wider">
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    data-testid="contact-email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@company.com"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-interest" className="text-gray-300 text-xs uppercase tracking-wider">
                    Interest
                  </Label>
                  <Select
                    value={form.interest}
                    onValueChange={(value) => setForm((f) => ({ ...f, interest: value }))}
                  >
                    <SelectTrigger
                      id="contact-interest"
                      data-testid="contact-interest"
                      className="bg-white/5 border-white/10 text-white focus:ring-emerald-500/40 data-[placeholder]:text-gray-600"
                    >
                      <SelectValue placeholder="What are you interested in?" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0e0e10] border-white/10 text-white">
                      {INTEREST_OPTIONS.map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          data-testid={`contact-interest-${option.toLowerCase().replace(/\s+/g, '-')}`}
                          className="focus:bg-emerald-500/10 focus:text-emerald-400"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-gray-300 text-xs uppercase tracking-wider">
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    data-testid="contact-message"
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us about your project, timeline, towers, integrations…"
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p data-testid="contact-error" className="text-red-400 text-sm">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-gray-500 max-w-xs">
                    Submitting opens your email client with the message addressed to{' '}
                    <span className="text-gray-400">{CONTACT_EMAIL}</span>.
                  </p>
                  <Button
                    type="submit"
                    data-testid="contact-submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-8 py-6 group"
                  >
                    <Send className="mr-2 w-4 h-4" />
                    Send enquiry
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

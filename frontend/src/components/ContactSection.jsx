import React, { useState } from 'react';
import { Send, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { contactData } from '../data/mock';
import ContactIntro from './contact/ContactIntro';
import ContactFormFields from './contact/ContactFormFields';
import ContactSuccess from './contact/ContactSuccess';

const CONTACT_EMAIL = contactData.email;

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
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(lines.join('\n'))}`;
};

const ContactSection = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (error) setError('');
  };

  const onInterestChange = (value) =>
    setForm((f) => ({ ...f, interest: value }));

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
          <ContactIntro email={CONTACT_EMAIL} />

          <div className="lg:col-span-3 rounded-2xl bg-white/[0.02] border border-white/5 p-8 lg:p-10">
            {submitted ? (
              <ContactSuccess email={CONTACT_EMAIL} onReset={reset} />
            ) : (
              <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-5">
                <ContactFormFields
                  form={form}
                  update={update}
                  onInterestChange={onInterestChange}
                  interestOptions={INTEREST_OPTIONS}
                />

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

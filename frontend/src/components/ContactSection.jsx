import React, { useState } from 'react';
import axios from 'axios';
import { Send, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { contactData } from '../data/mock';
import ContactIntro from './contact/ContactIntro';
import ContactFormFields from './contact/ContactFormFields';
import ContactSuccess from './contact/ContactSuccess';

const CONTACT_EMAIL = contactData.email;
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY;

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
  botcheck: '', // Web3Forms honeypot — must stay empty
};

const buildPayload = (form) => ({
  access_key: WEB3FORMS_KEY,
  subject: `New Flik Explore enquiry — ${form.fullName || 'Website'}`,
  from_name: 'Flik Explore Website',
  replyto: form.email,
  // Fields delivered in the email body
  'Full Name': form.fullName,
  Phone: form.phone || '—',
  Email: form.email,
  Interest: form.interest || '—',
  Message: form.message || '—',
  // Honeypot (must be empty for legitimate users)
  botcheck: form.botcheck,
});

const ContactSection = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (error) setError('');
  };

  const onInterestChange = (value) =>
    setForm((f) => ({ ...f, interest: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) {
      setError('Please share your name and email so we can reach back.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const { data } = await axios.post(WEB3FORMS_ENDPOINT, buildPayload(form), {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      if (data?.success) {
        setSubmitted(true);
      } else {
        setError(data?.message || 'We couldn\'t send your message. Please try again or email us directly.');
      }
    } catch (err) {
      const detail = err?.response?.data?.message || err?.message;
      setError(
        detail
          ? `We couldn't send your message: ${detail}`
          : 'We couldn\'t send your message. Please try again or email us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(initialState);
    setSubmitted(false);
    setError('');
  };

  return (
    <section id="contact" className="relative py-32 bg-[#09090b] overflow-hidden">
      {/* Background Architectural Grid and Ambient Mesh Glow */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <ContactIntro email={CONTACT_EMAIL} />

          <div className="relative lg:col-span-3 rounded-2xl bg-white/[0.015] border border-white/10 p-8 lg:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* Top Corner CAD marker */}
            <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-700">
              +
            </div>

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

                {/* Web3Forms honeypot — hidden from real users */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex="-1"
                  autoComplete="off"
                  value={form.botcheck}
                  onChange={update('botcheck')}
                  className="hidden"
                  aria-hidden="true"
                />

                {error && (
                  <p data-testid="contact-error" className="text-red-400 text-sm font-mono">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                  <p className="text-xs text-gray-400 max-w-xs font-light">
                    Direct dispatch to{' '}
                    <span className="text-emerald-400 font-mono">{CONTACT_EMAIL}</span>. Non-disclosure protected.
                  </p>
                  <Button
                    type="submit"
                    data-testid="contact-submit"
                    disabled={submitting}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-6 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(34,229,90,0.25)] hover:shadow-[0_0_40px_rgba(34,229,90,0.45)] group disabled:opacity-70 disabled:hover:bg-emerald-500"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Transmitting…
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4" />
                        Send Proposal Request
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
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

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Send, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import SpotlightCard from './ui/SpotlightCard';
import { contactData } from '../data/mock';
import ContactIntro from './contact/ContactIntro';
import ContactFormFields from './contact/ContactFormFields';
import ContactSuccess from './contact/ContactSuccess';
import { telemetry, generateLeadSessionSummary } from '../utils/telemetry';
import {
  sanitizeInput,
  validateEmail,
  validatePhone,
  checkLeadSubmissionRate,
  recordLeadSubmission,
  isHoneypotTriggered,
  isSubmissionTooFast,
} from '../utils/security';

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

const buildPayload = (form) => {
  const sessionSummary = generateLeadSessionSummary();
  const cleanFullName = sanitizeInput(form.fullName, 100);
  const cleanPhone = sanitizeInput(form.phone, 30);
  const cleanEmail = sanitizeInput(form.email, 100);
  const cleanInterest = sanitizeInput(form.interest, 100);
  const cleanMessage = sanitizeInput(form.message, 1000);

  return {
    access_key: WEB3FORMS_KEY,
    subject: `New Flik Explorer enquiry — ${cleanFullName || 'Website'} [${sessionSummary['Traffic Source']}]`,
    from_name: 'Flik Explorer Platform',
    replyto: cleanEmail,
    'Full Name': cleanFullName,
    Phone: cleanPhone || '—',
    Email: cleanEmail,
    Interest: cleanInterest || '—',
    Message: cleanMessage || '—',
    // Telemetry and Attribution Context for Sales Team
    '--- BUYER TELEMETRY ---': '----------------------------------',
    'Traffic Source': sessionSummary['Traffic Source'],
    'Campaign': sessionSummary['Campaign'],
    'Active Dwell Time': sessionSummary['Active Dwell Time'],
    'Max Scroll Depth': sessionSummary['Max Scroll Depth'],
    'Sections Explored': sessionSummary['Sections Explored'],
    '3D Tours Opened': sessionSummary['3D Tours Opened'],
    'ROI Calculator Tested': sessionSummary['ROI Calculator Tested'],
    'FAQs Inquired': sessionSummary['FAQs Inquired'],
    'Referrer URL': sessionSummary['Referrer URL'],
    'Visitor ID': sessionSummary['Visitor ID'],
    botcheck: form.botcheck,
  };
};

const ContactSection = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const formMountedAt = useRef(Date.now());

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (error) setError('');
  };

  const onInterestChange = (value) =>
    setForm((f) => ({ ...f, interest: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Honeypot check - silently swallow bot attacks without notifying attackers
    if (isHoneypotTriggered(form.botcheck)) {
      setSubmitted(true);
      return;
    }

    // 2. Submission speed check - blocks automated headless form fill bots (<1.2s)
    if (isSubmissionTooFast(formMountedAt.current, 1200)) {
      setError('Form completed too quickly. Please verify your details before submitting.');
      return;
    }

    const cleanFullName = sanitizeInput(form.fullName, 100);
    const cleanEmail = sanitizeInput(form.email, 100);
    const cleanPhone = sanitizeInput(form.phone, 30);

    if (!cleanFullName || !cleanEmail) {
      setError('Please share your name and email so we can reach back.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setError('Please enter a valid work email address.');
      return;
    }

    if (cleanPhone && !validatePhone(cleanPhone)) {
      setError('Please enter a valid phone number format.');
      return;
    }

    const rateCheck = checkLeadSubmissionRate();
    if (!rateCheck.allowed) {
      setError(`Too many requests. Please wait ${Math.ceil(rateCheck.remainingSeconds / 60)} minutes before submitting again.`);
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const payload = buildPayload(form);
      const { data } = await axios.post(WEB3FORMS_ENDPOINT, payload, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      if (data?.success) {
        recordLeadSubmission();
        setSubmitted(true);
        telemetry.leadFormSubmitted('contact_section', form);
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
    <section
      id="contact"
      className="scroll-mt-24 relative py-9 lg:py-11 bg-[#060608] border-t border-white/[0.06] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22E55A]/40 to-transparent"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <ContactIntro email={CONTACT_EMAIL} />

          <SpotlightCard className="lg:col-span-3 rounded-3xl bg-[#09090d] border border-white/[0.09] glass-bezel p-6 sm:p-8">
            {submitted ? (
              <ContactSuccess email={CONTACT_EMAIL} onReset={reset} />
            ) : (
              <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-4">
                <ContactFormFields
                  form={form}
                  update={update}
                  onInterestChange={onInterestChange}
                  interestOptions={INTEREST_OPTIONS}
                />

                {error && (
                  <p data-testid="contact-error" className="text-rose-400 text-xs sm:text-sm font-medium">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/[0.06]">
                  <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                    Delivered directly to{' '}
                    <span className="text-gray-300 font-medium">{CONTACT_EMAIL}</span>. Reply within one business day.
                  </p>
                  <Button
                    type="submit"
                    data-testid="contact-submit"
                    disabled={submitting}
                    className="bg-[#22E55A] hover:bg-emerald-400 text-black font-semibold px-7 h-11 rounded-full shadow-[0_0_30px_rgba(34,229,90,0.28)] hover:shadow-[0_0_40px_rgba(34,229,90,0.45)] group disabled:opacity-70 transition-all"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4" />
                        Send enquiry
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

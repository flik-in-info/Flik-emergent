import React, { useCallback, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Dialog, DialogContent } from './ui/dialog';
import LeadFormBody from './lead-form/LeadFormBody';
import LeadFormSuccess from './lead-form/LeadFormSuccess';
import { telemetry, generateLeadSessionSummary } from '../utils/telemetry';
import {
  sanitizeInput,
  validateEmail,
  checkLeadSubmissionRate,
  recordLeadSubmission,
  isHoneypotTriggered,
  isSubmissionTooFast,
} from '../utils/security';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY;

const initialState = {
  name: '',
  email: '',
  company: '',
  project: '',
  message: '',
  botcheck: '', // Web3Forms honeypot — must stay empty
};

const buildPayload = (form, source) => {
  const sessionSummary = generateLeadSessionSummary();
  const cleanName = sanitizeInput(form.name, 100);
  const cleanEmail = sanitizeInput(form.email, 100);
  const cleanCompany = sanitizeInput(form.company, 100);
  const cleanProject = sanitizeInput(form.project, 100);
  const cleanMessage = sanitizeInput(form.message, 1000);

  return {
    access_key: WEB3FORMS_KEY,
    subject: `New Flik Explorer demo request — ${cleanName || 'Website'} [${sessionSummary['Traffic Source']}]`,
    from_name: 'Flik Explorer Platform',
    replyto: cleanEmail,
    Source: source,
    Name: cleanName,
    Email: cleanEmail,
    Company: cleanCompany || '—',
    Project: cleanProject || '—',
    'What they want to see': cleanMessage || '—',
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

const extractErrorMessage = (err) => {
  const apiMsg = err?.response?.data?.message;
  if (apiMsg) return apiMsg;
  if (err?.message) return err.message;
  return 'Something went wrong. Please try again.';
};

const LeadFormDialog = ({ open, onOpenChange, source = 'closing_cta' }) => {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formOpenedAt = useRef(null);

  useEffect(() => {
    if (open) {
      formOpenedAt.current = Date.now();
      telemetry.leadFormStarted(source);
    }
  }, [open, source]);

  const onFieldChange = useCallback(
    (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value })),
    []
  );

  const reset = useCallback(() => {
    setForm(initialState);
    setSubmitted(false);
  }, []);

  const handleOpenChange = useCallback(
    (next) => {
      if (!next) setTimeout(reset, 200);
      onOpenChange(next);
    },
    [reset, onOpenChange]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // 1. Honeypot check - silently drop bot attacks
      if (isHoneypotTriggered(form.botcheck)) {
        setSubmitted(true);
        toast.success('Demo request sent. Our team will reach out shortly.');
        return;
      }

      // 2. Submission speed check - blocks automated scripts (<1.2s)
      if (isSubmissionTooFast(formOpenedAt.current, 1200)) {
        toast.error('Form submitted too fast. Please verify your details before submitting.');
        return;
      }

      const cleanName = sanitizeInput(form.name, 100);
      const cleanEmail = sanitizeInput(form.email, 100);

      if (!cleanName || !cleanEmail) {
        toast.error('Please share your name and email.');
        return;
      }

      if (!validateEmail(cleanEmail)) {
        toast.error('Please enter a valid work email address.');
        return;
      }

      const rateCheck = checkLeadSubmissionRate();
      if (!rateCheck.allowed) {
        toast.error(`Submission limit reached. Please wait ${Math.ceil(rateCheck.remainingSeconds / 60)} minutes before trying again.`);
        return;
      }

      setSubmitting(true);
      try {
        const payload = buildPayload(form, source);
        const { data } = await axios.post(
          WEB3FORMS_ENDPOINT,
          payload,
          { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
        );
        if (data?.success) {
          recordLeadSubmission();
          setSubmitted(true);
          telemetry.leadFormSubmitted(source, form);
          toast.success('Demo request sent. Our team will reach out shortly.');
        } else {
          toast.error(data?.message || 'We couldn\'t send your request. Please try again.');
        }
      } catch (err) {
        toast.error(extractErrorMessage(err));
      } finally {
        setSubmitting(false);
      }
    },
    [form, source]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-testid="lead-form-dialog"
        className="sm:max-w-lg rounded-3xl bg-[#09090d] border border-white/[0.1] glass-bezel text-white"
      >
        {submitted ? (
          <LeadFormSuccess onClose={() => handleOpenChange(false)} />
        ) : (
          <LeadFormBody
            form={form}
            onFieldChange={onFieldChange}
            onSubmit={handleSubmit}
            onCancel={() => handleOpenChange(false)}
            submitting={submitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormDialog;

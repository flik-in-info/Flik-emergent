import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Dialog, DialogContent } from './ui/dialog';
import LeadFormBody from './lead-form/LeadFormBody';
import LeadFormSuccess from './lead-form/LeadFormSuccess';

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

const buildPayload = (form, source) => ({
  access_key: WEB3FORMS_KEY,
  subject: `New Flik demo request — ${form.name || 'Website'}`,
  from_name: 'Flik Explore Website',
  replyto: form.email,
  Source: source,
  Name: form.name,
  Email: form.email,
  Company: form.company || '—',
  Project: form.project || '—',
  'What they want to see': form.message || '—',
  botcheck: form.botcheck,
});

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
      if (!form.name.trim() || !form.email.trim()) {
        toast.error('Please share your name and email.');
        return;
      }
      setSubmitting(true);
      try {
        const { data } = await axios.post(
          WEB3FORMS_ENDPOINT,
          buildPayload(form, source),
          { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
        );
        if (data?.success) {
          setSubmitted(true);
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
        className="sm:max-w-lg bg-[#0e0e10] border border-white/10 text-white"
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

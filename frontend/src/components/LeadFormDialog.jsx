import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initialState = {
  name: '',
  email: '',
  company: '',
  project: '',
  message: '',
};

const LeadFormDialog = ({ open, onOpenChange, source = 'closing_cta' }) => {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const reset = () => {
    setForm(initialState);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Please share your name and email.');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/leads`, { ...form, source });
      setSubmitted(true);
      toast.success('Request received. Our team will reach out shortly.');
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg = Array.isArray(detail) ? detail[0]?.msg : detail;
      toast.error(msg || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (next) => {
    if (!next) {
      // closing — reset after a tick so users see the success state briefly
      setTimeout(reset, 200);
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-testid="lead-form-dialog"
        className="sm:max-w-lg bg-[#0e0e10] border border-white/10 text-white"
      >
        {submitted ? (
          <div className="py-6 text-center" data-testid="lead-form-success">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mb-5">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-light mb-3">Request received.</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              A Flik specialist will reach out within one business day to schedule your personalized walkthrough.
            </p>
            <Button
              data-testid="lead-form-close-success"
              onClick={() => handleOpenChange(false)}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} data-testid="lead-form">
            <DialogHeader>
              <DialogTitle className="text-2xl font-light tracking-tight">
                Request a private demo
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Tell us about your project. We'll prepare a tailored walkthrough of Flik Explore.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lead-name" className="text-gray-300 text-xs uppercase tracking-wider">
                    Name
                  </Label>
                  <Input
                    id="lead-name"
                    data-testid="lead-form-name"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Your full name"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-emerald-500/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-email" className="text-gray-300 text-xs uppercase tracking-wider">
                    Email
                  </Label>
                  <Input
                    id="lead-email"
                    data-testid="lead-form-email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@company.com"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-emerald-500/40"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lead-company" className="text-gray-300 text-xs uppercase tracking-wider">
                    Company
                  </Label>
                  <Input
                    id="lead-company"
                    data-testid="lead-form-company"
                    value={form.company}
                    onChange={update('company')}
                    placeholder="Developer / brokerage"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-emerald-500/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-project" className="text-gray-300 text-xs uppercase tracking-wider">
                    Project
                  </Label>
                  <Input
                    id="lead-project"
                    data-testid="lead-form-project"
                    value={form.project}
                    onChange={update('project')}
                    placeholder="Project or city"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-emerald-500/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-message" className="text-gray-300 text-xs uppercase tracking-wider">
                  What would you like to see?
                </Label>
                <Textarea
                  id="lead-message"
                  data-testid="lead-form-message"
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Towers, units, integrations, timelines…"
                  rows={3}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-emerald-500/40 resize-none"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                data-testid="lead-form-cancel"
                onClick={() => handleOpenChange(false)}
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-testid="lead-form-submit"
                disabled={submitting}
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium group"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Request demo
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormDialog;

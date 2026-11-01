import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, ArrowRight, X, AlertCircle } from 'lucide-react';

export const ADMIN_PASSCODE = '2822';
export const AUTH_STORAGE_KEY = 'flik_admin_auth';

export const isAdminAuthenticated = () => {
  try {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === ADMIN_PASSCODE;
  } catch (e) {
    return false;
  }
};

export const setAdminAuthenticated = (status = true) => {
  try {
    if (status) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, ADMIN_PASSCODE);
    } else {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (e) {
    // ignore
  }
};

export default function AdminAuthModal({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setError(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setAdminAuthenticated(true);
      setError(false);
      onClose();
      navigate('/pulse');
    } else {
      setError(true);
      setPasscode('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-sm p-6 sm:p-8 rounded-2xl bg-[#0f0f11] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 mx-auto">
          <Lock className="w-5 h-5" />
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-white tracking-tight">Admin Gateway</h3>
          <p className="text-xs text-gray-400 mt-1">
            Enter master passcode to access the live telemetry engine & activity tracker.
          </p>
        </div>

        {/* Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <input
                ref={inputRef}
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Passcode"
                className={`w-full px-4 py-3 text-center text-xl tracking-[0.5em] font-mono rounded-xl bg-white/[0.04] border text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                  error
                    ? 'border-rose-500/80 bg-rose-500/5 focus:border-rose-500'
                    : 'border-white/10 focus:border-emerald-500/50 focus:bg-white/[0.06]'
                }`}
              />
            </div>
            {error && (
              <div className="flex items-center justify-center gap-1.5 text-rose-400 text-xs mt-2 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect passcode. Try again.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Unlock Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <span className="text-[10px] font-mono text-gray-600 tracking-wider uppercase">
            Flik Security Protocol 2.4
          </span>
        </div>
      </div>
    </div>
  );
}

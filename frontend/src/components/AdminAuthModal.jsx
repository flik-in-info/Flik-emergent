import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, X, AlertCircle, ShieldAlert, Clock, Loader2 } from 'lucide-react';
import {
  isAdminAuthenticated,
  setAdminAuthenticated,
  verifyAdminPasscode,
  getAdminGateState,
} from '../utils/security';

export { isAdminAuthenticated, setAdminAuthenticated };

export default function AdminAuthModal({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockout, setLockout] = useState({ isLocked: false, remainingSeconds: 0, attemptsLeft: 5 });
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Sync lockout state & run active countdown timer if locked
  useEffect(() => {
    const updateGate = () => {
      const state = getAdminGateState();
      setLockout(state);
      if (state.isLocked) {
        setErrorMsg(`Too many failed attempts. Locked for ${Math.floor(state.remainingSeconds / 60)}m ${state.remainingSeconds % 60}s.`);
      }
    };

    updateGate();
    const timer = setInterval(() => {
      const state = getAdminGateState();
      setLockout(state);
      if (state.isLocked) {
        setErrorMsg(`Too many failed attempts. Locked for ${Math.floor(state.remainingSeconds / 60)}m ${state.remainingSeconds % 60}s.`);
      } else if (errorMsg && errorMsg.includes('Locked for')) {
        setErrorMsg('');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [errorMsg]);

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setErrorMsg('');
      const state = getAdminGateState();
      setLockout(state);
      setTimeout(() => {
        if (!state.isLocked) {
          inputRef.current?.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (lockout.isLocked || isSubmitting) return;

    if (!passcode.trim()) {
      setErrorMsg('Please enter the passcode.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const result = await verifyAdminPasscode(passcode);
      if (result.success) {
        onClose();
        navigate('/pulse');
      } else if (result.isLocked) {
        setLockout({ isLocked: true, remainingSeconds: result.remainingSeconds, attemptsLeft: 0 });
        setErrorMsg(`Too many failed attempts. Locked for ${Math.floor(result.remainingSeconds / 60)}m ${result.remainingSeconds % 60}s.`);
        setPasscode('');
      } else {
        setLockout((prev) => ({ ...prev, attemptsLeft: result.attemptsLeft }));
        setErrorMsg(
          result.attemptsLeft <= 2
            ? `Incorrect passcode. Warning: ${result.attemptsLeft} attempt${result.attemptsLeft === 1 ? '' : 's'} remaining.`
            : `Incorrect passcode. ${result.attemptsLeft} attempts remaining.`
        );
        setPasscode('');
        inputRef.current?.focus();
      }
    } catch (err) {
      setErrorMsg('Verification error. Please retry.');
    } finally {
      setIsSubmitting(false);
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
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 mx-auto transition-colors ${
            lockout.isLocked
              ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
              : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
          }`}
        >
          {lockout.isLocked ? <ShieldAlert className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-white tracking-tight">Admin Gateway</h3>
          <p className="text-xs text-gray-400 mt-1">
            {lockout.isLocked
              ? 'Brute-force protection activated. Gateway temporarily locked.'
              : 'Enter cryptographically authenticated passcode to access telemetry.'}
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
                disabled={lockout.isLocked || isSubmitting}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder={lockout.isLocked ? 'Locked' : 'Passcode'}
                className={`w-full px-4 py-3 text-center text-xl tracking-[0.5em] font-mono rounded-xl bg-white/[0.04] border text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                  lockout.isLocked
                    ? 'border-rose-500/50 bg-rose-500/10 text-rose-300 cursor-not-allowed opacity-60'
                    : errorMsg
                    ? 'border-rose-500/80 bg-rose-500/5 focus:border-rose-500'
                    : 'border-white/10 focus:border-emerald-500/50 focus:bg-white/[0.06]'
                }`}
              />
            </div>

            {errorMsg && (
              <div
                className={`flex items-center justify-center gap-1.5 text-xs mt-2 font-mono text-center px-2 ${
                  lockout.isLocked ? 'text-rose-400 font-semibold' : 'text-rose-400'
                }`}
              >
                {lockout.isLocked ? <Clock className="w-3.5 h-3.5 flex-shrink-0 animate-pulse" /> : <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={lockout.isLocked || isSubmitting}
            className={`w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              lockout.isLocked || isSubmitting
                ? 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99]'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying SHA-256…</span>
              </>
            ) : lockout.isLocked ? (
              <>
                <Clock className="w-4 h-4" />
                <span>Locked ({lockout.remainingSeconds}s)</span>
              </>
            ) : (
              <>
                <span>Unlock Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <span className="text-[10px] font-mono text-gray-600 tracking-wider uppercase">
            Flik Enterprise Cryptographic Shield • 256-Bit
          </span>
        </div>
      </div>
    </div>
  );
}

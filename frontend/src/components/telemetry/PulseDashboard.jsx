import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Smartphone,
  Monitor,
  Clock,
  TrendingUp,
  Trash2,
  Download,
  ShieldCheck,
  Send,
  Boxes,
  HelpCircle,
  Eye,
  RefreshCw,
  Lock,
  Unlock,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import {
  getPulseEvents,
  getSessionLog,
  getAttribution,
  clearPulseEvents,
  trackEvent,
  telemetry,
} from '../../utils/telemetry';
import {
  isAdminAuthenticated,
  setAdminAuthenticated,
  verifyAdminPasscode,
  getAdminGateState,
} from '../../utils/security';

export default function PulseDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());
  const [passcodeInput, setPasscodeInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [lockout, setLockout] = useState({ isLocked: false, remainingSeconds: 0, attemptsLeft: 5 });
  const inputRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [sessionLog, setSessionLog] = useState({});
  const [attribution, setAttribution] = useState({});
  const [lastRefreshed, setLastRefreshed] = useState(Date.now());

  const refreshData = () => {
    setEvents(getPulseEvents());
    setSessionLog(getSessionLog());
    setAttribution(getAttribution());
    setLastRefreshed(Date.now());
  };

  // Sync lockout state & active countdown timer when unauthenticated
  useEffect(() => {
    if (!isAuthenticated) {
      const updateGate = () => {
        const state = getAdminGateState();
        setLockout(state);
        if (state.isLocked) {
          setErrorMsg(`Rate limit enforced: Locked for ${Math.floor(state.remainingSeconds / 60)}m ${state.remainingSeconds % 60}s.`);
        }
      };

      updateGate();
      const timer = setInterval(() => {
        const state = getAdminGateState();
        setLockout(state);
        if (state.isLocked) {
          setErrorMsg(`Rate limit enforced: Locked for ${Math.floor(state.remainingSeconds / 60)}m ${state.remainingSeconds % 60}s.`);
        } else if (errorMsg && errorMsg.includes('Locked for')) {
          setErrorMsg('');
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isAuthenticated, errorMsg]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
      const interval = setInterval(refreshData, 2000);

      const handleTelemetryEvent = () => refreshData();
      window.addEventListener('flik:telemetry', handleTelemetryEvent);

      return () => {
        clearInterval(interval);
        window.removeEventListener('flik:telemetry', handleTelemetryEvent);
      };
    } else {
      setTimeout(() => {
        const state = getAdminGateState();
        if (!state.isLocked) {
          inputRef.current?.focus();
        }
      }, 100);
    }
  }, [isAuthenticated]);

  const handleUnlock = async (e) => {
    e?.preventDefault();
    if (lockout.isLocked || isVerifying) return;

    if (!passcodeInput.trim()) {
      setErrorMsg('Please enter the administrator passcode.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    try {
      const result = await verifyAdminPasscode(passcodeInput);
      if (result.success) {
        setIsAuthenticated(true);
        setErrorMsg('');
        setPasscodeInput('');
      } else if (result.isLocked) {
        setLockout({ isLocked: true, remainingSeconds: result.remainingSeconds, attemptsLeft: 0 });
        setErrorMsg(`Too many failed attempts. Locked for ${Math.floor(result.remainingSeconds / 60)}m ${result.remainingSeconds % 60}s.`);
        setPasscodeInput('');
      } else {
        setLockout((prev) => ({ ...prev, attemptsLeft: result.attemptsLeft }));
        setErrorMsg(
          result.attemptsLeft <= 2
            ? `Access Denied: ${result.attemptsLeft} attempt${result.attemptsLeft === 1 ? '' : 's'} remaining before security lockout.`
            : `Access Denied: Incorrect passcode (${result.attemptsLeft} attempts remaining).`
        );
        setPasscodeInput('');
        inputRef.current?.focus();
      }
    } catch (err) {
      setErrorMsg('Verification system error. Please retry.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLock = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    setPasscodeInput('');
    setErrorMsg('');
  };

  // If locked, render the Cyber-Security Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center p-6 text-white font-sans relative overflow-hidden">
        {/* Ambient Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0d0d10] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.85)] text-center relative z-10">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner transition-colors ${
            lockout.isLocked
              ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
              : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
          }`}>
            {lockout.isLocked ? <ShieldAlert className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
          </div>

          <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase px-3.5 py-1 rounded-full ${
            lockout.isLocked
              ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
              : 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${lockout.isLocked ? 'bg-rose-400' : 'bg-emerald-400 animate-pulse'}`} />
            {lockout.isLocked ? 'Gateway Lockdown Active' : 'Restricted Admin Portal'}
          </span>

          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-5">
            Flik Pulse Gateway
          </h2>
          <p className="text-xs text-gray-400 mt-2.5 max-w-xs mx-auto leading-relaxed">
            {lockout.isLocked
              ? 'Client brute-force rate limiter triggered. Gateway access is temporarily suspended.'
              : 'Enter cryptographically salted passcode to inspect real-time telemetry and engagement metrics.'}
          </p>

          <form onSubmit={handleUnlock} className="mt-8 space-y-4">
            <div>
              <input
                ref={inputRef}
                type="password"
                inputMode="numeric"
                maxLength={8}
                disabled={lockout.isLocked || isVerifying}
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder={lockout.isLocked ? 'Locked' : 'Passcode'}
                className={`w-full px-4 py-3.5 text-center text-2xl tracking-[0.6em] font-mono rounded-xl bg-white/[0.04] border text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                  lockout.isLocked
                    ? 'border-rose-500/50 bg-rose-500/10 text-rose-300 cursor-not-allowed opacity-60'
                    : errorMsg
                    ? 'border-rose-500/80 bg-rose-500/5 focus:border-rose-500'
                    : 'border-white/10 focus:border-emerald-500/50 focus:bg-white/[0.06]'
                }`}
              />
              {errorMsg && (
                <div className={`flex items-center justify-center gap-1.5 text-xs font-mono mt-2.5 text-center px-2 ${
                  lockout.isLocked ? 'text-rose-400 font-semibold' : 'text-rose-400'
                }`}>
                  {lockout.isLocked ? <Clock className="w-3.5 h-3.5 flex-shrink-0 animate-pulse" /> : <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={lockout.isLocked || isVerifying}
              className={`w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
                lockout.isLocked || isVerifying
                  ? 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying SHA-256…</span>
                </>
              ) : lockout.isLocked ? (
                <>
                  <Clock className="w-4 h-4" />
                  <span>Lockout Active ({lockout.remainingSeconds}s)</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </Link>
            <span className="font-mono text-[10px] text-gray-600">Flik Cryptographic Shield 2.4</span>
          </div>
        </div>
      </div>
    );
  }

  // Compute Metrics from recorded events
  const totalEvents = events.length;
  const whatsAppClicks = events.filter((e) => e.name === 'whatsapp_clicked').length;
  const demoSubmissions = events.filter((e) => e.name === 'lead_form_submitted').length;
  const tourViews = events.filter((e) => e.name === '3d_experience_engaged').length;
  const roiCalculations = events.filter((e) => e.name === 'roi_simulator_adjusted').length;
  const highIntentTotal = whatsAppClicks + demoSubmissions;

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 5) return 'Just now';
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  // Event Badges & Formatting
  const renderEventBadge = (event) => {
    switch (event.name) {
      case 'whatsapp_clicked':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <MessageSquare className="w-3 h-3" />
            WHATSAPP CONVERSION
          </span>
        );
      case 'lead_form_submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/40">
            <Send className="w-3 h-3" />
            DEMO REQUEST SENT
          </span>
        );
      case '3d_experience_engaged':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/15 text-sky-300 border border-sky-500/30">
            <Boxes className="w-3 h-3" />
            3D SHOWROOM ({event.properties?.action || 'interact'})
          </span>
        );
      case 'roi_simulator_adjusted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <TrendingUp className="w-3 h-3" />
            ROI CALCULATED ({event.properties?.units} units · {event.properties?.ticket_tier})
          </span>
        );
      case 'faq_question_expanded':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <HelpCircle className="w-3 h-3" />
            FAQ EXPANDED
          </span>
        );
      case 'scroll_depth_milestone':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono text-gray-300 bg-white/5 border border-white/10">
            SCROLL {event.properties?.percent}%
          </span>
        );
      case 'section_viewed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono text-gray-400 bg-white/[0.03] border border-white/5">
            <Eye className="w-3 h-3" />
            {event.properties?.section_name}
          </span>
        );
      case 'presentation_pdf_viewed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/20 text-blue-300 border border-blue-500/40">
            <Download className="w-3 h-3" />
            PDF PRESENTATION OPENED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono text-gray-400 bg-white/5">
            {event.name}
          </span>
        );
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `flik_telemetry_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSimulateWhatsAppClick = () => {
    telemetry.whatsAppClick('pulse_dashboard_test');
    refreshData();
  };

  const handleSimulateRoiTest = () => {
    telemetry.roiSimulated(300, '₹2.5 Cr', '2.72');
    refreshData();
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-white/10 bg-[#0a0c0f]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <h1 className="text-base font-semibold tracking-tight text-white flex items-center gap-2">
                  <span>Flik Pulse</span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Live Telemetry
                  </span>
                </h1>
                <p className="text-[11px] font-mono text-gray-400">
                  Real-time visitor activity and intent telemetry for flik.in
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://us.posthog.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-white px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <span>PostHog Cloud</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </a>

            <button
              onClick={refreshData}
              title="Refresh Telemetry"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleLock}
              title="Lock Dashboard & Sign Out"
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-gray-400 hover:text-rose-400 text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Pulse Container */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">High-Intent Leads</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-light text-white font-mono">{highIntentTotal}</div>
            <p className="text-xs text-emerald-400 mt-2 font-mono">
              {whatsAppClicks} WhatsApp · {demoSubmissions} Demo Forms
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">3D Showroom Tours</span>
              <Boxes className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-light text-white font-mono">{tourViews}</div>
            <p className="text-xs text-sky-400 mt-2 font-mono">
              Walkthroughs & Fullscreen 3D
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">ROI Calculations</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-light text-white font-mono">{roiCalculations}</div>
            <p className="text-xs text-amber-400 mt-2 font-mono">
              Developer Sunk Cost Simulator
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Total Actions Logged</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-light text-white font-mono">{totalEvents}</div>
            <p className="text-xs text-gray-400 mt-2 font-mono">
              Buffered in live ring memory
            </p>
          </div>
        </div>

        {/* Current Active Session Footprint Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-medium text-white flex items-center gap-2">
                <span>Your Current Session Footprint</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                This is the exact enriched payload attached to incoming lead submissions.
              </p>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 self-start sm:self-center">
              Visitor: {sessionLog.visitorId || 'v_unknown'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
            <div>
              <span className="text-gray-500 block mb-1">Traffic Source</span>
              <span className="text-emerald-400 font-medium text-sm">
                {attribution.utm_source || attribution.referrer || 'direct'}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Active Dwell Time</span>
              <span className="text-white font-medium text-sm">
                {Math.floor((sessionLog.activeDwellSeconds || 0) / 60)}m {(sessionLog.activeDwellSeconds || 0) % 60}s
              </span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Max Scroll Depth</span>
              <span className="text-white font-medium text-sm">
                {sessionLog.maxScrollDepth || 0}%
              </span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Sections Explored</span>
              <span className="text-white font-medium text-sm">
                {(sessionLog.sectionsViewed || []).length > 0
                  ? (sessionLog.sectionsViewed || []).join(', ')
                  : 'none'}
              </span>
            </div>
          </div>
        </div>

        {/* Live Action Stream Feed */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-medium text-white flex items-center gap-2">
                <span>Real-Time Activity Stream</span>
                <span className="text-xs font-mono text-gray-500">({events.length} events)</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Every click, 3D tour launch, ROI calculation, and WhatsApp conversation trigger.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
              <button
                onClick={handleSimulateWhatsAppClick}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-colors"
              >
                + Test WhatsApp Trigger
              </button>
              <button
                onClick={handleSimulateRoiTest}
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono transition-colors"
              >
                + Test ROI Trigger
              </button>
              <button
                onClick={handleExportJSON}
                title="Export Telemetry JSON"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  clearPulseEvents();
                  refreshData();
                }}
                title="Clear Ring Buffer"
                className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-300 hover:text-rose-400 border border-white/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="py-16 text-center text-gray-500 font-mono text-xs border border-dashed border-white/10 rounded-2xl">
              Waiting for live visitor events. Browse the site in another tab to see real-time updates.
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-3.5 rounded-xl bg-white/[0.015] border border-white/5 hover:border-white/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    {renderEventBadge(event)}
                    <span className="text-gray-300 font-mono">
                      {event.properties?.context || event.properties?.section_name || ''}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-500 text-[11px] font-mono shrink-0">
                    <span className="flex items-center gap-1">
                      {event.device === 'Mobile' ? (
                        <Smartphone className="w-3 h-3 text-gray-400" />
                      ) : (
                        <Monitor className="w-3 h-3 text-gray-400" />
                      )}
                      <span>{event.device || 'Desktop'}</span>
                    </span>
                    <span className="text-gray-500">·</span>
                    <span className="text-emerald-400/90">{event.referrer || 'direct'}</span>
                    <span className="text-gray-500">·</span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(event.time)}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PostHog Instructions & Attribution Reference */}
        <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              All events are simultaneously dispatched to PostHog (`phc_xAvL...`) with full session replay, user identity, and attribution.
            </span>
          </div>
          <a
            href="https://us.posthog.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline inline-flex items-center gap-1 shrink-0"
          >
            Open PostHog Analytics <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </main>
    </div>
  );
}

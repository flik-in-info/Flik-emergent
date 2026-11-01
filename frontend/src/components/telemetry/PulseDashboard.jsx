import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowLeft,
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
} from 'lucide-react';
import {
  getPulseEvents,
  getSessionLog,
  getAttribution,
  clearPulseEvents,
  trackEvent,
  telemetry,
} from '../../utils/telemetry';

export default function PulseDashboard() {
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

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 2000);

    const handleTelemetryEvent = () => refreshData();
    window.addEventListener('flik:telemetry', handleTelemetryEvent);

    return () => {
      clearInterval(interval);
      window.removeEventListener('flik:telemetry', handleTelemetryEvent);
    };
  }, []);

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
            <p className="text-xs text-gray-400 mt-2 font-mono">Walkthroughs & Fullscreen 3D</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">ROI Calculations</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-light text-white font-mono">{roiCalculations}</div>
            <p className="text-xs text-gray-400 mt-2 font-mono">Developer Sunk Cost Simulator</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Total Actions Logged</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-light text-white font-mono">{totalEvents}</div>
            <p className="text-xs text-gray-400 mt-2 font-mono">Buffered in live ring memory</p>
          </div>
        </div>

        {/* Current Active Session & Attribution Card */}
        <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <h3 className="text-sm font-semibold text-white">Your Current Session Footprint</h3>
                <p className="text-xs text-gray-400 font-mono">
                  This is the exact enriched payload attached to incoming lead submissions.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                Visitor: {sessionLog.visitorId || 'init'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-gray-500 block mb-1">Traffic Source</span>
              <span className="text-emerald-400 font-medium">{attribution.source || 'direct'}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Active Dwell Time</span>
              <span className="text-white font-medium">
                {Math.floor((sessionLog.activeSeconds || 0) / 60)}m {(sessionLog.activeSeconds || 0) % 60}s
              </span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Max Scroll Depth</span>
              <span className="text-white font-medium">{sessionLog.maxScrollPercent || 0}%</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Sections Explored</span>
              <span className="text-white font-medium">
                {(sessionLog.sectionsViewed || []).length > 0
                  ? sessionLog.sectionsViewed.join(', ')
                  : 'Hero'}
              </span>
            </div>
          </div>
        </div>

        {/* Live Event Stream Table */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="p-6 lg:p-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <span>Real-Time Activity Stream</span>
                <span className="text-xs font-mono text-gray-400">({events.length} events)</span>
              </h3>
              <p className="text-xs text-gray-400 font-light mt-0.5">
                Every click, 3D tour launch, ROI calculation, and WhatsApp conversation trigger.
              </p>
            </div>

            {/* Quick Test & Export Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSimulateWhatsAppClick}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors"
              >
                + Test WhatsApp Trigger
              </button>
              <button
                onClick={handleSimulateRoiTest}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
              >
                + Test ROI Trigger
              </button>
              <button
                onClick={handleExportJSON}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
                title="Export JSON Log"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  clearPulseEvents();
                  refreshData();
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 text-gray-400 hover:text-red-400 transition-colors"
                title="Clear Logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="p-16 text-center text-gray-500 font-mono text-xs">
              <Activity className="w-8 h-8 text-gray-600 mx-auto mb-3" />
              <p>No activity logged yet in this browser.</p>
              <p className="text-gray-600 mt-1">
                Browse around <Link to="/" className="text-emerald-400 underline">flik.in</Link> or click a test button above.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 sm:px-8 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    {renderEventBadge(event)}
                    <span className="text-gray-300 font-mono">
                      {event.properties?.button_label ||
                        event.properties?.question ||
                        event.properties?.location ||
                        event.properties?.section_name ||
                        '—'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-gray-400 font-mono text-[11px] shrink-0">
                    <span className="flex items-center gap-1">
                      {event.device === 'Mobile' ? (
                        <Smartphone className="w-3 h-3 text-gray-500" />
                      ) : (
                        <Monitor className="w-3 h-3 text-gray-500" />
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

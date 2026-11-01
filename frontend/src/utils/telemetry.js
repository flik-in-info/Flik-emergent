// Flik Explorer Telemetry & Activity Engine
// Comprehensive client-side tracking, session attribution, and PostHog integration

const STORAGE_KEYS = {
  VISITOR_ID: 'flik_visitor_id',
  SESSION_ID: 'flik_session_id',
  SESSION_LOG: 'flik_session_log',
  PULSE_EVENTS: 'flik_pulse_events',
  USER_TRAITS: 'flik_user_traits',
};

const MAX_PULSE_LOGS = 250;

// Generate or retrieve persistent visitor ID
export function getVisitorId() {
  if (typeof window === 'undefined') return 'server';
  try {
    let id = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
    if (!id) {
      id = 'v_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
      localStorage.setItem(STORAGE_KEYS.VISITOR_ID, id);
    }
    return id;
  } catch {
    return 'anon_' + Date.now();
  }
}

// Generate or retrieve session ID (expires when browser session ends)
export function getSessionId() {
  if (typeof window === 'undefined') return 'server';
  try {
    let id = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
    if (!id) {
      id = 's_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, id);
    }
    return id;
  } catch {
    return 'sess_' + Date.now();
  }
}

// Parse UTM and attribution parameters
export function getAttribution() {
  if (typeof window === 'undefined') return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer ? new URL(document.referrer).hostname : 'direct';

    const utm = {
      source: params.get('utm_source') || (document.referrer.includes('linkedin') ? 'linkedin' : referrer),
      medium: params.get('utm_medium') || (params.get('utm_source') ? 'cpc' : 'organic'),
      campaign: params.get('utm_campaign') || '',
      content: params.get('utm_content') || '',
      term: params.get('utm_term') || '',
      referrer: document.referrer || 'direct',
      pathname: window.location.pathname,
      landingPage: window.location.href,
    };
    return utm;
  } catch {
    return { referrer: 'direct' };
  }
}

// Read running session state
export function getSessionLog() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.SESSION_LOG);
    if (raw) return JSON.parse(raw);
  } catch {}

  const init = {
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    startedAt: Date.now(),
    attribution: getAttribution(),
    activeSeconds: 0,
    maxScrollPercent: 0,
    sectionsViewed: [],
    roiSimulations: [],
    faqsExpanded: [],
    virtualToursLaunched: 0,
    actionsCount: 0,
    events: [],
  };
  try {
    sessionStorage.setItem(STORAGE_KEYS.SESSION_LOG, JSON.stringify(init));
  } catch {}
  return init;
}

// Update session state
function updateSessionLog(updater) {
  if (typeof window === 'undefined') return;
  try {
    const current = getSessionLog();
    const updated = updater(current);
    sessionStorage.setItem(STORAGE_KEYS.SESSION_LOG, JSON.stringify(updated));
    return updated;
  } catch {
    return null;
  }
}

// Record an event in the local Pulse Ring Buffer (for the on-site /pulse dashboard)
function recordPulseEvent(eventRecord) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PULSE_EVENTS);
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(eventRecord);
    if (list.length > MAX_PULSE_LOGS) {
      list.length = MAX_PULSE_LOGS;
    }
    localStorage.setItem(STORAGE_KEYS.PULSE_EVENTS, JSON.stringify(list));
  } catch {}
}

// Retrieve recent events for the /pulse dashboard
export function getPulseEvents() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PULSE_EVENTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Clear Pulse history
export function clearPulseEvents() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.PULSE_EVENTS);
  } catch {}
}

// Core Tracking Dispatcher
export function trackEvent(eventName, properties = {}) {
  if (typeof window === 'undefined') return;

  const timestamp = Date.now();
  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  const attribution = getAttribution();

  const enrichedProps = {
    ...properties,
    visitor_id: visitorId,
    session_id: sessionId,
    utm_source: attribution.source,
    utm_medium: attribution.medium,
    utm_campaign: attribution.campaign,
    referrer: attribution.referrer,
    device: window.innerWidth < 768 ? 'Mobile' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop',
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    path: window.location.pathname,
    timestamp: new Date(timestamp).toISOString(),
  };

  // 1. PostHog Event Capture
  try {
    if (window.posthog && typeof window.posthog.capture === 'function') {
      window.posthog.capture(eventName, enrichedProps);
    }
  } catch (err) {
    console.debug('[Telemetry] PostHog dispatch notice:', err);
  }

  // 2. Local Session Log Update
  updateSessionLog((log) => {
    log.actionsCount = (log.actionsCount || 0) + 1;
    if (!log.events) log.events = [];
    log.events.push({
      name: eventName,
      time: timestamp,
      props: properties,
    });
    if (log.events.length > 50) log.events.shift();
    return log;
  });

  // 3. Pulse Buffer Record
  recordPulseEvent({
    id: Math.random().toString(36).substring(2, 9),
    name: eventName,
    time: timestamp,
    visitorId,
    device: enrichedProps.device,
    referrer: attribution.source,
    properties,
  });

  // Custom event dispatched for on-page real-time listeners
  try {
    window.dispatchEvent(
      new CustomEvent('flik:telemetry', { detail: { eventName, properties: enrichedProps } })
    );
  } catch {}
}

// User Identification (Links lead details to PostHog session recording)
export function identifyUser(email, traits = {}) {
  if (!email || typeof window === 'undefined') return;
  try {
    const payload = {
      email,
      ...traits,
      identifiedAt: new Date().toISOString(),
      visitorId: getVisitorId(),
    };

    localStorage.setItem(STORAGE_KEYS.USER_TRAITS, JSON.stringify(payload));

    if (window.posthog && typeof window.posthog.identify === 'function') {
      window.posthog.identify(email, payload);
    }

    trackEvent('user_identified', { email, ...traits });
  } catch (err) {
    console.debug('[Telemetry] Identify error:', err);
  }
}

// Generate formatted Lead Context summary to attach to Web3Forms submissions
export function generateLeadSessionSummary() {
  const log = getSessionLog();
  const attr = getAttribution();

  const mins = Math.floor((log.activeSeconds || 0) / 60);
  const secs = (log.activeSeconds || 0) % 60;
  const dwellFormatted = `${mins}m ${secs}s`;

  const sectionsStr = (log.sectionsViewed || []).join(', ') || 'Hero';
  const faqsStr = (log.faqsExpanded || []).slice(0, 3).join(' | ') || 'None';

  let roiStr = 'None';
  if (log.roiSimulations && log.roiSimulations.length > 0) {
    const latest = log.roiSimulations[log.roiSimulations.length - 1];
    roiStr = `${latest.units} units @ ${latest.ticketTier} (Est. Saved: ₹${latest.capitalSaved} Cr)`;
  }

  return {
    'Visitor ID': log.visitorId || '—',
    'Traffic Source': attr.source || 'direct',
    'Campaign': attr.campaign || 'none',
    'Referrer URL': attr.referrer || 'direct',
    'Active Dwell Time': dwellFormatted,
    'Max Scroll Depth': `${log.maxScrollPercent || 0}%`,
    'Sections Explored': sectionsStr,
    '3D Tours Opened': `${log.virtualToursLaunched || 0} times`,
    'ROI Calculator Tested': roiStr,
    'FAQs Inquired': faqsStr,
  };
}

// Track Specific High-Intent Signals
export const telemetry = {
  // Pageview
  pageView: (path) => {
    trackEvent('page_view', { path: path || window.location.pathname });
  },

  // CTA Click
  ctaClick: (buttonLabel, location = 'general') => {
    trackEvent('cta_clicked', {
      button_label: buttonLabel,
      location,
    });
  },

  // WhatsApp Click (High Priority Conversion)
  whatsAppClick: (location = 'contact_intro') => {
    trackEvent('whatsapp_clicked', {
      location,
      channel: 'WhatsApp Direct',
      intent: 'high',
    });
  },

  // Phone / Email Click
  contactDirectClick: (type, target) => {
    trackEvent('contact_direct_clicked', { type, target });
  },

  // Presentation PDF View / Download
  presentationViewed: (fileName = 'presentation.pdf') => {
    trackEvent('presentation_pdf_viewed', { fileName });
  },

  // 3D Experience Engagement
  experienceInteract: (experienceId, action = 'view', details = {}) => {
    updateSessionLog((log) => {
      if (action === 'fullscreen') {
        log.virtualToursLaunched = (log.virtualToursLaunched || 0) + 1;
      }
      return log;
    });

    trackEvent('3d_experience_engaged', {
      experience_id: experienceId,
      action,
      ...details,
    });
  },

  // ROI Simulator Adjustment
  roiSimulated: (units, ticketTier, capitalSaved) => {
    updateSessionLog((log) => {
      if (!log.roiSimulations) log.roiSimulations = [];
      log.roiSimulations.push({ units, ticketTier, capitalSaved, time: Date.now() });
      if (log.roiSimulations.length > 10) log.roiSimulations.shift();
      return log;
    });

    trackEvent('roi_simulator_adjusted', {
      units,
      ticket_tier: ticketTier,
      capital_saved_cr: capitalSaved,
    });
  },

  // FAQ Expanded
  faqExpanded: (question, category) => {
    updateSessionLog((log) => {
      if (!log.faqsExpanded) log.faqsExpanded = [];
      if (!log.faqsExpanded.includes(question)) {
        log.faqsExpanded.push(question);
      }
      return log;
    });

    trackEvent('faq_question_expanded', {
      question,
      category,
    });
  },

  // Section Visibility / Dwell
  sectionView: (sectionName) => {
    updateSessionLog((log) => {
      if (!log.sectionsViewed) log.sectionsViewed = [];
      if (!log.sectionsViewed.includes(sectionName)) {
        log.sectionsViewed.push(sectionName);
      }
      return log;
    });

    trackEvent('section_viewed', { section_name: sectionName });
  },

  // Scroll Milestone
  scrollDepth: (percent) => {
    updateSessionLog((log) => {
      log.maxScrollPercent = Math.max(log.maxScrollPercent || 0, percent);
      return log;
    });

    trackEvent('scroll_depth_milestone', { percent });
  },

  // Lead Form Started
  leadFormStarted: (source) => {
    trackEvent('lead_form_started', { source });
  },

  // Lead Form Completed
  leadFormSubmitted: (source, leadData) => {
    identifyUser(leadData.email, {
      name: leadData.name || leadData.fullName,
      phone: leadData.phone,
      company: leadData.company,
      project: leadData.project,
    });

    trackEvent('lead_form_submitted', {
      source,
      company: leadData.company,
      project: leadData.project,
      has_phone: !!leadData.phone,
    });
  },
};

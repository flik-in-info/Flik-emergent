/**
 * Flik Enterprise Security Suite
 * High-grade client hardening, cryptographic authentication, and sanitization
 */

const ADMIN_SALT = 'flik_salt_2026_enterprise_pulse_';
const ADMIN_HASH = '0fe297a39b0b4ece7f465adb96fd9a97f780dc424ec935fee932fac5af60479e';

const ADMIN_SESSION_KEY = 'flik_admin_sec_session_v1';
const ADMIN_GATE_KEY = 'flik_admin_sec_gate_v1';
const FORM_RATE_KEY = 'flik_lead_rate_limit_v1';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

const FORM_RATE_MAX = 3; // Max 3 submissions
const FORM_RATE_WINDOW_MS = 10 * 60 * 1000; // within 10 minutes

/**
 * Pure JavaScript SHA-256 fallback in case window.crypto.subtle is unavailable
 */
function sha256Fallback(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let lengthProperty = 'length';
  let i, j;
  let result = '';
  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;
  let hash = [];
  const k = [];
  let primeCounter = 0;

  const isPrime = (candidate) => {
    for (let factor = 2, max = Math.sqrt(candidate); factor <= max; factor++) {
      if (candidate % factor === 0) return false;
    }
    return true;
  };

  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (isPrime(candidate)) {
      if (primeCounter < 8) {
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      }
      k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      primeCounter++;
    }
  }

  ascii += '\x80';
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return ''; // non-ascii
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15],
        w2 = w[i - 2];
      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      w[i] =
        i < 16
          ? w[i]
          : (w[i - 16] + s0 + w[i - 7] + s1) | 0;

      const s1h =
        rightRotate(hash[4], 6) ^
        rightRotate(hash[4], 11) ^
        rightRotate(hash[4], 25);
      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const temp1 = (hash[7] + s1h + ch + k[i] + w[i]) | 0;
      const s0h =
        rightRotate(hash[0], 2) ^
        rightRotate(hash[0], 13) ^
        rightRotate(hash[0], 22);
      const maj =
        (hash[0] & hash[1]) ^
        (hash[0] & hash[2]) ^
        (hash[1] & hash[2]);
      const temp2 = (s0h + maj) | 0;

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (i = 0; i < 8; i++) {
      for (j = 3; j >= 0; j--) {
        const b = (hash[i] >> (8 * j)) & 255;
        result += (b < 16 ? '0' : '') + b.toString(16);
      }
    }
  }
  return result.slice(0, 64);
}

/**
 * Computes salted SHA-256 hash using native Web Crypto API with fallback
 */
export async function computeSaltedHash(passcode) {
  const saltedString = `${ADMIN_SALT}${passcode}`;
  try {
    if (
      typeof window !== 'undefined' &&
      window.crypto &&
      window.crypto.subtle &&
      typeof window.crypto.subtle.digest === 'function'
    ) {
      const encoder = new TextEncoder();
      const data = encoder.encode(saltedString);
      const buffer = await window.crypto.subtle.digest('SHA-256', data);
      const byteArray = Array.from(new Uint8Array(buffer));
      return byteArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (err) {
    // Fall back to pure JS
  }
  return sha256Fallback(saltedString);
}

/**
 * Constant-time string comparison to resist side-channel timing attacks
 */
function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Checks whether the current admin session is valid and active
 */
export function isAdminAuthenticated() {
  try {
    if (typeof window === 'undefined') return false;
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    if (!session || !session.token || !session.expiresAt) return false;
    if (Date.now() > session.expiresAt) {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Sets or revokes admin session status
 */
export function setAdminAuthenticated(status = true) {
  try {
    if (typeof window === 'undefined') return;
    if (status) {
      const token =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `flik_${Math.random().toString(36).substring(2)}_${Date.now()}`;
      const session = {
        token,
        createdAt: Date.now(),
        expiresAt: Date.now() + SESSION_TTL_MS,
      };
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      resetAdminGate();
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch (e) {
    // ignore
  }
}

/**
 * Reads the admin gate lockout and attempt state from localStorage
 */
export function getAdminGateState() {
  try {
    if (typeof window === 'undefined') {
      return { isLocked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
    }
    const raw = localStorage.getItem(ADMIN_GATE_KEY);
    if (!raw) {
      return { isLocked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
    }
    const data = JSON.parse(raw);
    const now = Date.now();

    if (data.lockedUntil && data.lockedUntil > now) {
      const remainingSeconds = Math.ceil((data.lockedUntil - now) / 1000);
      return { isLocked: true, remainingSeconds, attemptsLeft: 0 };
    }

    if (data.lockedUntil && data.lockedUntil <= now) {
      // Lock expired, reset attempts
      resetAdminGate();
      return { isLocked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
    }

    const failed = typeof data.failedAttempts === 'number' ? data.failedAttempts : 0;
    const attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - failed);
    return { isLocked: false, remainingSeconds: 0, attemptsLeft };
  } catch (e) {
    return { isLocked: false, remainingSeconds: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }
}

/**
 * Records a failed passcode attempt and enforces lockout if threshold reached
 */
export function recordAdminFailedAttempt() {
  try {
    if (typeof window === 'undefined') return { isLocked: false, attemptsLeft: 0 };
    const raw = localStorage.getItem(ADMIN_GATE_KEY);
    const data = raw ? JSON.parse(raw) : { failedAttempts: 0 };
    const now = Date.now();

    data.failedAttempts = (data.failedAttempts || 0) + 1;
    if (data.failedAttempts >= MAX_FAILED_ATTEMPTS) {
      data.lockedUntil = now + LOCKOUT_DURATION_MS;
      localStorage.setItem(ADMIN_GATE_KEY, JSON.stringify(data));
      return { isLocked: true, remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000), attemptsLeft: 0 };
    }

    localStorage.setItem(ADMIN_GATE_KEY, JSON.stringify(data));
    return {
      isLocked: false,
      remainingSeconds: 0,
      attemptsLeft: MAX_FAILED_ATTEMPTS - data.failedAttempts,
    };
  } catch (e) {
    return { isLocked: false, remainingSeconds: 0, attemptsLeft: 0 };
  }
}

/**
 * Clears lockout and attempt history on successful authentication
 */
export function resetAdminGate() {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_GATE_KEY);
    }
  } catch (e) {
    // ignore
  }
}

/**
 * Verifies admin passcode cryptographically against salted SHA-256 digest
 */
export async function verifyAdminPasscode(inputPasscode) {
  const gate = getAdminGateState();
  if (gate.isLocked) {
    return {
      success: false,
      isLocked: true,
      remainingSeconds: gate.remainingSeconds,
      attemptsLeft: 0,
    };
  }

  const cleanInput = String(inputPasscode || '').trim();
  if (!cleanInput) {
    return { success: false, isLocked: false, attemptsLeft: gate.attemptsLeft };
  }

  const computed = await computeSaltedHash(cleanInput);
  const isValid = timingSafeEqual(computed, ADMIN_HASH);

  if (isValid) {
    setAdminAuthenticated(true);
    resetAdminGate();
    return { success: true, isLocked: false, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }

  const failure = recordAdminFailedAttempt();
  return {
    success: false,
    isLocked: failure.isLocked,
    remainingSeconds: failure.remainingSeconds,
    attemptsLeft: failure.attemptsLeft,
  };
}

/**
 * Form Input Sanitization
 * Strips script tags, HTML tags, null bytes, and trims characters within limits
 */
export function sanitizeInput(value, maxLength = 300) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Strict Email Format Validation
 */
export function validateEmail(email) {
  if (typeof email !== 'string') return false;
  const clean = email.trim();
  if (clean.length < 5 || clean.length > 100) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(clean);
}

/**
 * Phone Number Validation (Permissive international format)
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return true; // Optional field
  const clean = phone.trim();
  if (!clean) return true;
  if (clean.length < 7 || clean.length > 25) return false;
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{6,18}$/;
  return phoneRegex.test(clean);
}

/**
 * Client-Side Form Submission Throttling / Rate Limiter
 * Limits submissions to MAX 3 per 10 minutes per browser to prevent automated spam floods
 */
export function checkLeadSubmissionRate() {
  try {
    if (typeof window === 'undefined') return { allowed: true, remainingSeconds: 0 };
    const raw = localStorage.getItem(FORM_RATE_KEY);
    const now = Date.now();
    const timestamps = raw ? JSON.parse(raw) : [];
    const validTimestamps = timestamps.filter((t) => now - t < FORM_RATE_WINDOW_MS);

    if (validTimestamps.length >= FORM_RATE_MAX) {
      const oldest = Math.min(...validTimestamps);
      const remainingSeconds = Math.ceil((oldest + FORM_RATE_WINDOW_MS - now) / 1000);
      return { allowed: false, remainingSeconds: Math.max(1, remainingSeconds) };
    }

    return { allowed: true, remainingSeconds: 0 };
  } catch (e) {
    return { allowed: true, remainingSeconds: 0 };
  }
}

/**
 * Records a successful lead form submission in rate limiter
 */
export function recordLeadSubmission() {
  try {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(FORM_RATE_KEY);
    const now = Date.now();
    const timestamps = raw ? JSON.parse(raw) : [];
    const validTimestamps = timestamps.filter((t) => now - t < FORM_RATE_WINDOW_MS);
    validTimestamps.push(now);
    localStorage.setItem(FORM_RATE_KEY, JSON.stringify(validTimestamps));
  } catch (e) {
    // ignore
  }
}

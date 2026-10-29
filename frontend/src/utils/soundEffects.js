// Synthesized Web Audio API sound effects for Flik Explorer 3D interactions
// Zero external audio files required, zero latency, runs entirely in-browser.

class SoundFXEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = false;
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound(forceState) {
    this.enabled = forceState !== undefined ? forceState : !this.enabled;
    if (this.enabled) {
      this.init();
      this.playChime(660, 0.08, 'sine');
    }
    return this.enabled;
  }

  isSoundEnabled() {
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio playback failsafe
    }
  }

  playSwoosh() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Audio playback failsafe
    }
  }

  playChime(freq = 520, duration = 0.1, type = 'sine') {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio playback failsafe
    }
  }
}

export const soundFX = new SoundFXEngine();

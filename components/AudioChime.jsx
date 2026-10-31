'use client';

// Web Audio API ambient drone & sound effects
let ambientAudioCtx = null;
let ambientGain = null;
let ambientOscillators = [];
let ambientPlaying = false;
let periodicChimeTimer = null;

export function isAmbientPlaying() {
  return ambientPlaying;
}

export function toggleAmbientSoundscape() {
  if (typeof window === 'undefined') return false;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return false;

  if (ambientPlaying) {
    try {
      if (ambientGain) {
        ambientGain.gain.linearRampToValueAtTime(0.0001, ambientAudioCtx.currentTime + 0.8);
      }
      setTimeout(() => {
        ambientOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
        ambientOscillators = [];
        if (periodicChimeTimer) clearInterval(periodicChimeTimer);
      }, 900);
    } catch (e) {}
    ambientPlaying = false;
    return false;
  } else {
    try {
      if (!ambientAudioCtx) {
        ambientAudioCtx = new AudioContext();
      }
      if (ambientAudioCtx.state === 'suspended') {
        ambientAudioCtx.resume();
      }

      ambientGain = ambientAudioCtx.createGain();
      ambientGain.gain.setValueAtTime(0.001, ambientAudioCtx.currentTime);
      ambientGain.gain.linearRampToValueAtTime(0.12, ambientAudioCtx.currentTime + 1.5);
      ambientGain.connect(ambientAudioCtx.destination);

      // Tanpura warm harmonic frequencies (C3, G3, C4, G4 drone)
      const baseFreqs = [130.81, 196.0, 261.63, 392.0];
      ambientOscillators = [];

      baseFreqs.forEach((freq, idx) => {
        const osc = ambientAudioCtx.createOscillator();
        const subGain = ambientAudioCtx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ambientAudioCtx.currentTime);

        const lfo = ambientAudioCtx.createOscillator();
        const lfoGain = ambientAudioCtx.createGain();
        lfo.frequency.value = 0.2 + idx * 0.1;
        lfoGain.gain.value = 1.2;
        lfo.connect(osc.frequency);
        lfo.start();

        subGain.gain.value = 0.25;
        osc.connect(subGain);
        subGain.connect(ambientGain);

        osc.start();
        ambientOscillators.push(osc);
      });

      periodicChimeTimer = setInterval(() => {
        if (!ambientPlaying || !ambientAudioCtx) return;
        try {
          const bellOsc = ambientAudioCtx.createOscillator();
          const bellGain = ambientAudioCtx.createGain();
          const bellFreq = [1046.5, 1174.66, 1318.51, 1567.98][Math.floor(Math.random() * 4)];

          bellOsc.type = 'sine';
          bellOsc.frequency.setValueAtTime(bellFreq, ambientAudioCtx.currentTime);

          bellGain.gain.setValueAtTime(0.04, ambientAudioCtx.currentTime);
          bellGain.gain.exponentialRampToValueAtTime(0.0001, ambientAudioCtx.currentTime + 2.5);

          bellOsc.connect(bellGain);
          bellGain.connect(ambientAudioCtx.destination);

          bellOsc.start();
          bellOsc.stop(ambientAudioCtx.currentTime + 2.6);
        } catch (e) {}
      }, 4500);

      ambientPlaying = true;
      return true;
    } catch (e) {
      console.warn('Ambient audio could not start:', e);
      ambientPlaying = false;
      return false;
    }
  }
}

export function playChimeSound(type = 'celebrate') {
  if (typeof window === 'undefined') return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'shutter') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
      return;
    }

    if (type === 'celebrate') {
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = ctx.currentTime + idx * 0.08;
        const duration = 2.0;

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.28 - idx * 0.03, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    }

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }
  } catch (e) {}
}

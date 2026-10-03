// Web Audio API romantic generative sound generator
// 100% self-contained, no external MP3 dependencies

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMelodyPlaying = false;
  private melodyInterval: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Audio not permitted yet
    }
  }

  playChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq;

        const startTime = now + index * 0.08;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.6);
      });
    } catch {
      // ignore
    }
  }

  playCelebration() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const chords = [392.00, 493.88, 587.33, 783.99, 987.77]; // G major arpeggio to high B
      const now = this.ctx.currentTime;

      chords.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const start = now + idx * 0.09;
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.18, start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 1.2);
      });
    } catch {
      // ignore
    }
  }

  toggleMelody(onStateChange?: (playing: boolean) => void) {
    if (this.isMelodyPlaying) {
      if (this.melodyInterval) {
        clearInterval(this.melodyInterval);
        this.melodyInterval = null;
      }
      this.isMelodyPlaying = false;
      onStateChange?.(false);
      return false;
    }

    try {
      this.initCtx();
      this.isMelodyPlaying = true;
      onStateChange?.(true);

      const gentleMelody = [
        [329.63, 392.00, 493.88], // E4, G4, B4
        [293.66, 369.99, 440.00], // D4, F#4, A4
        [261.63, 329.63, 392.00], // C4, E4, G4
        [392.00, 493.88, 587.33], // G4, B4, D5
      ];
      let step = 0;

      const playChord = () => {
        if (!this.isMelodyPlaying || !this.ctx) return;
        const currentChord = gentleMelody[step % gentleMelody.length];
        step++;

        currentChord.forEach((freq, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.value = freq;

          const start = this.ctx.currentTime + i * 0.12;
          gain.gain.setValueAtTime(0.001, start);
          gain.gain.linearRampToValueAtTime(0.04, start + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 2.5);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(start);
          osc.stop(start + 2.5);
        });
      };

      playChord();
      this.melodyInterval = window.setInterval(playChord, 3000);
      return true;
    } catch {
      this.isMelodyPlaying = false;
      onStateChange?.(false);
      return false;
    }
  }

  isBackgroundPlaying() {
    return this.isMelodyPlaying;
  }
}

export const soundFx = new SoundManager();

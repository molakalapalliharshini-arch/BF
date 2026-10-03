import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Mail, Luggage, Stars, Flame, BookHeart, Share2, Check } from 'lucide-react';
import { AnimatedCouple } from './components/AnimatedCouple';
import { StoryHighlights } from './components/StoryHighlights';
import { MemoryGallery } from './components/MemoryGallery';
import { GoldenTruth } from './components/GoldenTruth';
import { GratitudeJar } from './components/GratitudeJar';
import { AppreciationExplorer } from './components/AppreciationExplorer';
import { FutureConstellations } from './components/FutureConstellations';
import { LoveLetterModal } from './components/LoveLetterModal';
import { AudioBar } from './components/AudioBar';
import { soundFx } from './utils/audio';
import confetti from 'canvas-confetti';

export default function App() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCelebrate = () => {
    soundFx.playCelebration();
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#f59e0b', '#8b5cf6', '#3b82f6'],
    });
  };

  const handleCopyLink = () => {
    soundFx.playPop();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50/40 to-amber-50/30 text-slate-800 selection:bg-rose-200 selection:text-rose-900 pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">❤️</span>
            <div className="leading-tight">
              <span className="font-bold text-slate-900 text-sm sm:text-base font-serif-romantic block">
                For You, Ajhai
              </span>
              <span className="text-[10px] text-rose-600 font-semibold tracking-wider uppercase">
                Happy Boyfriend Day
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                soundFx.playChime();
                setIsLetterOpen(true);
              }}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full text-xs font-bold shadow-md shadow-rose-200 transition-all flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open Love Letter</span>
              <span className="sm:hidden">Letter</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 text-slate-600 hover:text-slate-900 bg-rose-50 rounded-full border border-rose-100 transition"
              title="Copy link to share"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto pt-8 sm:pt-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-rose-600 fill-rose-500" />
            <span>National Boyfriend Day Special</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-romantic text-slate-900 tracking-tight leading-tight">
            To the Boy Who Tries, Supports, <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
              and Loves Me With All His Heart
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-3 mb-8 leading-relaxed">
            Ajhai, this is a dedicated celebration of you: your emotional vulnerability, your practical care,
            our London adventures, and the beautiful future we are building together.
          </p>
        </motion.div>

        {/* Animated Couple Feature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <AnimatedCouple />
        </motion.div>

        {/* Quick action bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={handleCelebrate}
            className="px-5 py-2.5 rounded-2xl bg-white border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50 shadow-sm transition flex items-center gap-1.5"
          >
            <span>Celebrate Boyfriend Day! 🎉</span>
          </button>
          <a
            href="#reasons"
            className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
          >
            <BookHeart className="w-3.5 h-3.5 text-rose-400" />
            <span>Read All The Reasons</span>
          </a>
        </div>
      </section>

      {/* Section 1: The Golden Truth & Deepest Realization */}
      <GoldenTruth />

      {/* Section 2: Real Story Spotlights (Vulnerability, Moving Luggage, London) */}
      <StoryHighlights />

      {/* Section 3: Polaroid Memory Gallery (London Trips) */}
      <MemoryGallery />

      {/* Section 4: Interactive Gratitude Jar */}
      <GratitudeJar />

      {/* Section 4: Constellations of the Future */}
      <FutureConstellations />

      {/* Section 5: The Full Categorized Reasons & Support Explorer */}
      <AppreciationExplorer />

      {/* Love Letter Modal */}
      <LoveLetterModal isOpen={isLetterOpen} onClose={() => setIsLetterOpen(false)} />

      {/* Floating Audio Controller */}
      <AudioBar />

      {/* Romantic Footer */}
      <footer className="mt-20 border-t border-rose-100 bg-white/70 py-10 text-center text-xs text-slate-500">
        <div className="max-w-md mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-rose-500 font-bold text-sm">
            <span>Made with endless love for you, Ajhai</span>
            <Heart className="w-4 h-4 fill-rose-500" />
          </div>
          <p className="text-[11px] text-slate-400">
            Happy National Boyfriend Day. Thank you for never giving up on us, for your tears, your laughter, and your big heart.
          </p>
          <p className="font-handwriting text-lg text-slate-700 pt-1">
            Harshini & Ajhai, always ✨
          </p>
        </div>
      </footer>
    </div>
  );
}

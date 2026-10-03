import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Printer, Check, Music } from 'lucide-react';
import { BOYFRIEND_DATA } from '../data/boyfriendData';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({ isOpen, onClose }) => {
  const [isOpenedLetter, setIsOpenedLetter] = useState(false);

  const handleOpenEnvelope = () => {
    soundFx.playCelebration();
    setIsOpenedLetter(true);
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#e11d48', '#fda4af', '#f59e0b', '#fb7185'],
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-2xl bg-amber-50/95 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-amber-200 my-auto text-slate-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-amber-100 transition print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOpenedLetter ? (
          /* Sealed Envelope View */
          <div className="text-center py-10 flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-48 h-32 bg-amber-100 rounded-2xl shadow-xl border-2 border-amber-300 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/40 to-transparent" />
                <div className="w-14 h-14 rounded-full bg-rose-600 border-2 border-rose-700 shadow-md flex items-center justify-center text-white text-2xl font-bold cursor-pointer hover:scale-110 transition-transform">
                  💌
                </div>
              </div>
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-amber-800 mb-2">
              National Boyfriend Day
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-romantic text-slate-900 mb-2">
              A Personal Letter For Ajhai
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
              Penned with honesty, gratitude, and deep love from Harshini.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenEnvelope}
              className="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-rose-300 transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Break the Seal & Open Letter</span>
            </motion.button>
          </div>
        ) : (
          /* Unfolded Parchment Love Letter */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-amber-200/80 pb-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-amber-800 font-bold">
                  To My Beloved Ajhai
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-romantic text-slate-900">
                  Happy Boyfriend Day, My Love
                </h3>
              </div>
              <div className="flex items-center gap-2 print:hidden">
                <button
                  onClick={handlePrint}
                  className="p-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-amber-100 rounded-xl flex items-center gap-1.5 transition"
                  title="Print keepsake"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Print Keepsake</span>
                </button>
              </div>
            </div>

            <div className="font-serif-romantic text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <p>
                My dearest Ajhai,
              </p>
              <p>
                Today is Boyfriend Day, and more than anything, I wanted to create a place where you can see, without a shadow of doubt, just how much you mean to me, and how deeply I appreciate everything you do.
              </p>
              <p>
                You have repeatedly told me you love me. You keep fighting for us and saying you want this relationship to work. You've sat with me and talked about a future together, about marriage, and about what building a life looks like. You've allowed yourself to be vulnerable, crying with me, opening your heart, and letting me see you for who you truly are.
              </p>
              <p>
                I will never forget how you stepped up when I was moving: offering to check my suitcases, offering your parents' home as a refuge, and helping me with rent and practical support even when you felt nervous yourself. Or how you remind me, <em>"I am happy if you are happy."</em>
              </p>

              {/* Highlight callout box */}
              <div className="p-4 bg-amber-100/70 rounded-2xl border border-amber-300/80 my-4 text-slate-900 italic font-medium">
                "When I'm hurt, I sometimes focus on the moments where you didn't meet my needs and forget the many moments where you genuinely tried to love me. I want you to know: I see you, I honor your effort, and I cherish your heart."
              </div>

              <p>
                Thank you for the days in London that you filled with thoughtful plans and surprises, the activities you create to connect with me, and the way you never walk away from difficult conversations. You are generous, you are loving, and you are my favorite person.
              </p>
              <p className="font-handwriting text-2xl text-rose-700 pt-2">
                Forever yours,<br />
                Harshini 💕
              </p>
            </div>

            <div className="pt-4 border-t border-amber-200 flex justify-between items-center print:hidden">
              <span className="text-xs text-amber-800 font-medium">
                Wrapped with infinite love 🌸
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
              >
                Close & Explore More
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, RefreshCw, Plus, Send, X } from 'lucide-react';
import { GRATITUDE_JAR_NOTES } from '../data/boyfriendData';
import { InteractiveNote } from '../types';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

export const GratitudeJar: React.FC = () => {
  const [notes, setNotes] = useState<InteractiveNote[]>(GRATITUDE_JAR_NOTES);
  const [selectedNote, setSelectedNote] = useState<InteractiveNote | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState('Love');

  const pullRandomNote = () => {
    soundFx.playChime();
    setIsOpening(true);

    const randomIndex = Math.floor(Math.random() * notes.length);
    const chosen = notes[randomIndex];

    confetti({
      particleCount: 20,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#f59e0b'],
    });

    setTimeout(() => {
      setSelectedNote(chosen);
      setIsOpening(false);
    }, 400);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    soundFx.playCelebration();
    const created: InteractiveNote = {
      id: String(Date.now()),
      text: newText.trim(),
      category: newCategory,
      emoji: '💌',
    };

    setNotes((prev) => [created, ...prev]);
    setSelectedNote(created);
    setNewText('');
    setIsAddingCustom(false);

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 rounded-3xl p-6 sm:p-10 border border-rose-200/80 shadow-xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Interactive Love Jar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-romantic text-slate-800">
            Your Jar of Love and Support
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Tap the jar to draw a note reminding you why you are loved, respected, and appreciated.
          </p>
        </div>

        {/* Jar & Action Area */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          {/* Glass Jar SVG Visual */}
          <div
            onClick={pullRandomNote}
            className="cursor-pointer group relative flex flex-col items-center select-none"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
              whileTap={{ scale: 0.95 }}
              animate={isOpening ? { y: [-10, 0], rotate: [0, 5, -5, 0] } : {}}
              className="relative w-48 h-60"
            >
              {/* Wooden Lid with twine */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-700 rounded-t-lg shadow-md border-b-2 border-amber-900 z-20 flex items-center justify-center">
                <span className="text-[10px] text-amber-200 font-bold uppercase tracking-wider">
                  Open For Love
                </span>
              </div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-3 bg-amber-800 rounded-sm z-20" />

              {/* Glass Bottle Body */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-44 h-52 bg-white/40 backdrop-blur-md rounded-b-[40px] rounded-t-xl border-2 border-white/80 shadow-2xl overflow-hidden flex items-center justify-center z-10 group-hover:border-rose-300 transition-colors">
                {/* Glass reflection highlight */}
                <div className="absolute top-2 left-3 w-3 h-36 bg-gradient-to-b from-white/80 to-transparent rounded-full opacity-60 pointer-events-none" />

                {/* Origami heart notes inside jar */}
                <div className="relative w-full h-full flex flex-wrap gap-2 p-4 items-end justify-center">
                  {notes.slice(0, 8).map((n, i) => (
                    <motion.div
                      key={n.id}
                      animate={{
                        y: [0, -4, 0],
                        rotate: [i % 2 === 0 ? -6 : 6, i % 2 === 0 ? 6 : -6, i % 2 === 0 ? -6 : 6],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3 + (i % 3),
                        ease: 'easeInOut',
                      }}
                      className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-300 to-pink-400 shadow-sm flex items-center justify-center text-sm border border-white/60"
                    >
                      {n.emoji}
                    </motion.div>
                  ))}
                </div>

                {/* Jar Label */}
                <div className="absolute bottom-6 px-3 py-1.5 bg-amber-100/90 rounded-md border border-amber-300 shadow text-center">
                  <span className="font-handwriting text-base font-bold text-amber-900 block leading-none">
                    Reasons I Love You
                  </span>
                  <span className="text-[9px] text-amber-700 font-sans font-medium">
                    {notes.length} Sweet Notes
                  </span>
                </div>
              </div>
            </motion.div>

            <span className="mt-3 text-xs font-bold text-rose-600 group-hover:text-rose-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Tap Jar to Pull a Note
            </span>
          </div>

          {/* Opened Note Display / Control */}
          <div className="w-full sm:w-80 min-h-[220px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {selectedNote ? (
                <motion.div
                  key={selectedNote.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  className="bg-white rounded-2xl p-5 shadow-lg border border-rose-200 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      {selectedNote.category}
                    </span>
                    <span className="text-2xl">{selectedNote.emoji}</span>
                  </div>

                  <p className="font-serif-romantic text-slate-800 text-sm leading-relaxed my-2">
                    "{selectedNote.text}"
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-handwriting text-base text-rose-600 font-bold">
                      With all my love, H 💕
                    </span>
                    <button
                      onClick={pullRandomNote}
                      className="text-rose-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Next note
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white/60 rounded-2xl p-6 text-center border border-dashed border-rose-200">
                  <p className="text-xs text-slate-500 mb-4">
                    Click the jar to reveal a heartfelt reminder of your love, support, and sweetness.
                  </p>
                  <button
                    onClick={pullRandomNote}
                    className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-200 transition flex items-center justify-center gap-2 mx-auto"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Draw a Note</span>
                  </button>
                </div>
              )}
            </AnimatePresence>

            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setIsAddingCustom(true)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add another personal memory
              </button>
            </div>
          </div>
        </div>

        {/* Modal: Add custom note */}
        {isAddingCustom && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-100 relative"
            >
              <button
                onClick={() => setIsAddingCustom(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold font-serif-romantic text-slate-800 mb-1">
                Add a Special Note for You
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Write another reason, memory, or sweet gratitude to put in your jar.
              </p>

              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Words:
                  </label>
                  <textarea
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="e.g. You always make me laugh when I am tired..."
                    rows={3}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    <option value="Love">Love & Affection</option>
                    <option value="Support">Support & Moving</option>
                    <option value="Care">Care & Thoughtfulness</option>
                    <option value="London">London & Dates</option>
                    <option value="Forever">Future & Forever</option>
                  </select>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingCustom(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-rose-500 text-white rounded-xl shadow-md hover:bg-rose-600 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Drop into Jar</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

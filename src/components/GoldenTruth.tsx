import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ShieldCheck, RefreshCw, Flame, Check } from 'lucide-react';
import { BOYFRIEND_DATA } from '../data/boyfriendData';
import { soundFx } from '../utils/audio';

export const GoldenTruth: React.FC = () => {
  const [acknowledged, setAcknowledged] = useState(false);

  const reminders = [
    {
      title: "You never stopped talking about our future",
      desc: "Through every hard day, your vision of tomorrow has always included me by your side."
    },
    {
      title: "You never stopped making plans involving me",
      desc: "You consistently carve space for me in your life and look forward to what we'll share."
    },
    {
      title: "You never stopped investing in us",
      desc: "Investing time, money, vulnerability, and continuous emotional effort into our bond."
    },
    {
      title: "You continue showing up despite your own fears",
      desc: "Even when insecure or anxious, you push through to show love and be there."
    },
    {
      title: "Disappointment never erases your care",
      desc: "Sometimes execution or timing differs from expectation, but your tender heart behind it is true."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="relative rounded-3xl p-7 sm:p-10 bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-pink-500/10 border-2 border-amber-300/80 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-300 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>A Letter of Truth From My Heart</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-romantic text-slate-900 tracking-tight leading-snug">
            {BOYFRIEND_DATA.goldenTruth.headline}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm mt-2 mb-6">
            {BOYFRIEND_DATA.goldenTruth.subhead}
          </p>

          {/* Callout Quote */}
          <div className="relative bg-white/95 rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-200/80 my-6">
            <div className="text-4xl text-amber-400 font-serif-romantic leading-none select-none -mb-3">“</div>
            <p className="text-lg sm:text-xl font-medium text-slate-800 italic leading-relaxed font-serif-romantic px-2">
              {BOYFRIEND_DATA.goldenTruth.quote}
            </p>
            <div className="text-4xl text-amber-400 font-serif-romantic leading-none select-none text-right -mt-2">”</div>

            <div className="mt-4 pt-4 border-t border-amber-100 flex items-center justify-center gap-2 text-xs font-semibold text-rose-600">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Harshini's promise to you: I see how hard you try.</span>
            </div>
          </div>
        </div>

        {/* Reminders List */}
        <div className="relative z-10 mt-8">
          <h3 className="text-center text-sm font-bold uppercase tracking-wider text-amber-900 mb-4 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Things That Are Easy to Forget When Hurt, But Forever True</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {reminders.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="bg-white/80 p-4 rounded-2xl border border-amber-200/60 shadow-sm hover:shadow transition-all"
              >
                <div className="flex items-center gap-2 text-amber-600 mb-1.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">{item.title}</h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed pl-6">{item.desc}</p>
              </motion.div>
            ))}

            <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white p-4 rounded-2xl shadow-md flex flex-col justify-center text-center sm:col-span-2 md:col-span-1">
              <span className="text-2xl mb-1">❤️</span>
              <p className="text-xs font-bold">Your love is valued</p>
              <p className="text-[10px] text-rose-100 mt-0.5">Every call, every plan, every tear.</p>
            </div>
          </div>
        </div>

        {/* Sweet Reassurance Button */}
        <div className="text-center mt-8 relative z-10">
          <button
            onClick={() => {
              soundFx.playChime();
              setAcknowledged(true);
            }}
            className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 mx-auto ${
              acknowledged
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200'
            }`}
          >
            {acknowledged ? (
              <>
                <Check className="w-4 h-4" />
                <span>Held Close To Our Hearts Forever 💕</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 fill-white" />
                <span>Seal This Truth Between Us</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

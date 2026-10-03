import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Flame, Shield, Heart, Truck, Luggage, Home, Coins, Compass, ChevronRight, Gift, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

export const StoryHighlights: React.FC = () => {
  const [activeStory, setActiveStory] = useState<'vulnerability' | 'moving' | 'london'>('vulnerability');
  const [stepIndex, setStepIndex] = useState(0);

  const courageSteps = [
    {
      title: "1. Opening Your Heart",
      desc: "You open up emotionally, cry in front of me, and allow me to see the truest, tenderest parts of who you are.",
      badge: "Vulnerability",
      icon: Eye,
      color: "text-rose-600 bg-rose-100"
    },
    {
      title: "2. Sharing Insecurities",
      desc: "Even when it is difficult or scary, you share your vulnerabilities and trust me with your heart.",
      badge: "Deep Trust",
      icon: Heart,
      color: "text-amber-600 bg-amber-100"
    },
    {
      title: "3. Staying Through Hard Talks",
      desc: "You do not walk away when things get tough. Even when upset, you keep coming back to the conversation.",
      badge: "True Maturity",
      icon: Flame,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "4. 'I Am Happy If You Are Happy'",
      desc: "Saying the words that melt every worry: you genuinely care about my happiness being whole.",
      badge: "Pure Devotion",
      icon: Sparkles,
      color: "text-pink-600 bg-pink-100"
    }
  ];

  const handleNextStep = () => {
    soundFx.playChime();
    const next = (stepIndex + 1) % courageSteps.length;
    setStepIndex(next);
    if (next === courageSteps.length - 1) {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#f43f5e', '#ec4899', '#f59e0b']
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-10 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5 fill-current text-rose-500" /> Real Moments That Prove Your Love
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-romantic text-slate-800">
          Spotlights of Your Care and Support
        </h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto mt-2">
          These are not abstract thoughts, they are real memories etched into my heart forever.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => {
            soundFx.playPop();
            setActiveStory('vulnerability');
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeStory === 'vulnerability'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
              : 'bg-rose-50 text-slate-700 hover:bg-rose-100'
          }`}
        >
          <Flame className="w-4 h-4" /> Emotional Courage & Vulnerability
        </button>
        <button
          onClick={() => {
            soundFx.playPop();
            setActiveStory('moving');
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeStory === 'moving'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
              : 'bg-rose-50 text-slate-700 hover:bg-rose-100'
          }`}
        >
          <Luggage className="w-4 h-4" /> Moving Prep & Practical Care
        </button>
        <button
          onClick={() => {
            soundFx.playPop();
            setActiveStory('london');
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeStory === 'london'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
              : 'bg-rose-50 text-slate-700 hover:bg-rose-100'
          }`}
        >
          <Compass className="w-4 h-4" /> London Days & Future Talks
        </button>
      </div>

      {/* Story Content 1: Emotional Courage */}
      {activeStory === 'vulnerability' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 bg-gradient-to-br from-rose-50 to-pink-100/60 p-6 rounded-3xl border border-rose-200 text-center relative overflow-hidden">
            <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-rose-300 text-4xl mb-4">
              🫂
            </div>
            <h3 className="text-xl font-bold font-serif-romantic text-rose-950 mb-1">
              Your Emotional Courage
            </h3>
            <p className="text-xs text-rose-800 font-medium mb-4">
              "You open up emotionally, cry with me, and never walk away from our conversations."
            </p>

            <div className="p-3 bg-white/90 rounded-2xl border border-rose-200 text-left text-xs text-rose-900 shadow-sm">
              <span className="font-bold block text-rose-600 mb-0.5">What You Tell Me:</span>
              "I just want you to be happy. If you are happy, I am happy."
            </div>

            <button
              onClick={handleNextStep}
              className="mt-4 w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
            >
              <span>Tap to Advance Moment</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="md:col-span-7 space-y-3">
            {courageSteps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = stepIndex === idx;
              return (
                <motion.div
                  key={step.title}
                  animate={{ scale: isCurrent ? 1.02 : 1 }}
                  onClick={() => {
                    soundFx.playPop();
                    setStepIndex(idx);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isCurrent
                      ? 'bg-rose-50/80 border-rose-300 shadow-md ring-2 ring-rose-400/30'
                      : 'bg-white border-slate-100 hover:border-rose-200 opacity-80'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${step.color} shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-800">{step.title}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {step.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Story Content 2: Moving & Practical Support */}
      {activeStory === 'moving' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-100">
            <div className="p-3 bg-rose-500 text-white rounded-xl w-fit mb-3 shadow">
              <Luggage className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Checking My Suitcases</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              When I was packing and stressed about relocating, you offered your hands, checked my luggage, and shouldered the stress with me.
            </p>
          </div>

          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-100">
            <div className="p-3 bg-amber-500 text-white rounded-xl w-fit mb-3 shadow">
              <Home className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Your Parents' Home</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              You offered your family's warm home as a secure haven for me when I first arrived, welcoming me with genuine warmth and safety.
            </p>
          </div>

          <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100">
            <div className="p-3 bg-emerald-600 text-white rounded-xl w-fit mb-3 shadow">
              <Coins className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Rent and Financial Support</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Even when you felt anxious yourself, you never let me sink. You offered financial help and rent money when I needed it most.
            </p>
          </div>
        </div>
      )}

      {/* Story Content 3: London Days & Future */}
      {activeStory === 'london' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🇬🇧</span>
              <h4 className="text-base font-bold text-indigo-950 font-serif-romantic">
                Days Filled With Plans and Surprises
              </h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              Taking me around the city, planning sweet surprises, treating me, and creating thoughtful moments just to connect with me and make me smile.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-white/80 p-2.5 rounded-xl border border-indigo-100">
              <Gift className="w-4 h-4 text-purple-600" />
              <span>"You curate memories, not just buy things."</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-3xl border border-rose-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💍</span>
              <h4 className="text-base font-bold text-rose-950 font-serif-romantic">
                Our Future and Marriage Conversations
              </h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              You haven't stopped talking about our future together. The wedding dreams, the long road ahead, and your commitment to never give up on us.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 bg-white/80 p-2.5 rounded-xl border border-rose-100">
              <Heart className="w-4 h-4 text-rose-600 fill-current" />
              <span>Building our forever together with unwavering dedication.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

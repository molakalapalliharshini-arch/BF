import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Stars, Moon, Shield, Award } from 'lucide-react';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface StarNode {
  id: string;
  title: string;
  detail: string;
  x: number; // percentage
  y: number; // percentage
  icon: string;
}

export const FutureConstellations: React.FC = () => {
  const [activeStar, setActiveStar] = useState<StarNode | null>(null);

  const starNodes: StarNode[] = [
    {
      id: 'marriage',
      title: 'Wedding & Marriage Conversations',
      detail: 'The tender, real conversations where you painted a future of us walking down the aisle together.',
      x: 20,
      y: 35,
      icon: '💍',
    },
    {
      id: 'london',
      title: 'London Cozy Days',
      detail: 'Full days planned with surprises, laughter, and making the city feel like ours.',
      x: 45,
      y: 20,
      icon: '☕',
    },
    {
      id: 'growth',
      title: 'Emotional Courage & Growth',
      detail: 'Opening up, sharing vulnerabilities, and refusing to walk away from tough moments.',
      x: 75,
      y: 40,
      icon: '🌱',
    },
    {
      id: 'home',
      title: 'Building Our Safe Haven',
      detail: 'From offering your family home when I arrived, to dreaming of our own shared sanctuary.',
      x: 35,
      y: 65,
      icon: '🏡',
    },
    {
      id: 'forever',
      title: 'Never Stopping The Plans',
      detail: 'Investing continuously in us and showing up despite fears. The brightest star in our sky.',
      x: 65,
      y: 70,
      icon: '✨',
    },
  ];

  const handleStarClick = (star: StarNode) => {
    soundFx.playChime();
    setActiveStar(star);
    confetti({
      particleCount: 15,
      spread: 45,
      origin: { x: star.x / 100, y: star.y / 100 },
      colors: ['#fef08a', '#e0e7ff', '#f43f5e'],
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-indigo-900/60 overflow-hidden">
        {/* Ambient Moon & Stars Background */}
        <div className="absolute top-6 right-8 opacity-70">
          <Moon className="w-8 h-8 text-amber-200 fill-amber-100" />
        </div>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-900/60 text-indigo-300 border border-indigo-700/60 uppercase tracking-wider mb-2">
            <Stars className="w-3.5 h-3.5 text-amber-300" />
            <span>Our Shared Horizon</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-romantic text-amber-100">
            Constellations of Our Future
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            "You have talked about a future with me, including marriage... and you've never stopped making plans."
          </p>
        </div>

        {/* Interactive Interactive Constellation Canvas */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-900/40 border border-indigo-800/40 backdrop-blur-sm overflow-hidden select-none">
          {/* Subtle star dots */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-40 animate-pulse"
              style={{
                width: `${(i % 3) + 1.5}px`,
                height: `${(i % 3) + 1.5}px`,
                top: `${(i * 17) % 95}%`,
                left: `${(i * 23) % 95}%`,
                animationDuration: `${2 + (i % 4)}s`,
              }}
            />
          ))}

          {/* SVG connecting lines between constellations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <polyline
              points="20% 35%, 45% 20%, 75% 40%, 65% 70%, 35% 65%, 20% 35%"
              fill="none"
              stroke="#818cf8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.5"
            />
            <line x1="45%" y1="20%" x2="35%" y2="65%" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <line x1="20%" y1="35%" x2="65%" y2="70%" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          </svg>

          {/* Star Nodes */}
          {starNodes.map((star) => {
            const isSelected = activeStar?.id === star.id;
            return (
              <div
                key={star.id}
                onClick={() => handleStarClick(star)}
                style={{ top: `${star.y}%`, left: `${star.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              >
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ repeat: isSelected ? Infinity : 0, duration: 1.5 }}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-base sm:text-lg transition-all shadow-lg ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300/40'
                      : 'bg-indigo-900/80 hover:bg-indigo-700 text-white border border-indigo-400'
                  }`}
                >
                  {star.icon}
                </motion.div>
                <span className="block text-[10px] sm:text-xs font-semibold text-center mt-1 text-slate-300 whitespace-nowrap bg-slate-950/80 px-2 py-0.5 rounded-full border border-indigo-900/80">
                  {star.title.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Star Details Card */}
        <div className="mt-4 min-h-[90px] flex items-center justify-center">
          {activeStar ? (
            <motion.div
              key={activeStar.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-950/80 border border-indigo-700/60 p-4 rounded-2xl max-w-lg w-full text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xl">{activeStar.icon}</span>
                <h4 className="font-bold text-sm text-amber-200">{activeStar.title}</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{activeStar.detail}</p>
            </motion.div>
          ) : (
            <p className="text-xs text-indigo-300/70 italic text-center">
              ✦ Tap any glowing star in the sky to see a cherished dream or memory ✦
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Coffee, Compass, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

export type CoupleScene = 'selfie' | 'cuddle' | 'london' | 'future';

interface AnimatedCoupleProps {
  initialScene?: CoupleScene;
  interactive?: boolean;
}

export const AnimatedCouple: React.FC<AnimatedCoupleProps> = ({
  initialScene = 'selfie',
  interactive = true,
}) => {
  const [scene, setScene] = useState<CoupleScene>(initialScene);
  const [isBlowingKiss, setIsBlowingKiss] = useState(false);
  const [floatingKisses, setFloatingKisses] = useState<{ id: number; x: number; y: number }[]>([]);
  const [blushLevel, setBlushLevel] = useState(1);

  const handleSendKiss = () => {
    soundFx.playChime();
    setIsBlowingKiss(true);
    setBlushLevel((prev) => Math.min(prev + 0.3, 2.5));

    const newKiss = {
      id: Date.now(),
      x: 180 + Math.random() * 40,
      y: 120 + Math.random() * 30,
    };
    setFloatingKisses((prev) => [...prev, newKiss]);

    // Romantic micro confetti
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.65, x: 0.5 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fcd34d'],
    });

    setTimeout(() => {
      setIsBlowingKiss(false);
    }, 1800);
  };

  const handleAjhaiCheer = () => {
    soundFx.playPop();
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.65, x: 0.6 },
      colors: ['#3b82f6', '#ec4899', '#eab308'],
    });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-gradient-to-b from-rose-950/20 via-rose-900/10 to-transparent rounded-3xl p-4 sm:p-6 backdrop-blur-sm border border-rose-200/60 shadow-xl overflow-hidden">
      {/* Background Decor depending on scene */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        {scene === 'selfie' && (
          // Diagonal restaurant wood slats matching photo
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="woodSlats" width="80" height="80" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="80" stroke="#fcd34d" strokeWidth="1" strokeOpacity="0.25" />
                <line x1="40" y1="0" x2="40" y2="80" stroke="#fbbf24" strokeWidth="1.5" strokeOpacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#woodSlats)" />
          </svg>
        )}
        {scene === 'london' && (
          <div className="absolute inset-0 flex items-center justify-around opacity-30 text-amber-200">
            <div className="w-2 h-2 rounded-full bg-amber-300 blur-sm animate-ping" />
            <div className="w-3 h-3 rounded-full bg-rose-300 blur-sm animate-pulse" />
          </div>
        )}
      </div>

      {/* Ambient floating fairy sparkles */}
      <div className="absolute top-3 right-4 flex items-center gap-1.5 text-xs text-rose-600 bg-white/80 px-2.5 py-1 rounded-full shadow-sm border border-rose-100 backdrop-blur">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
        <span className="font-medium">Ajhai & Harshini</span>
      </div>

      {/* Animated Characters SVG Canvas */}
      <div className="relative flex justify-center items-center py-2">
        <svg
          viewBox="0 0 540 380"
          className="w-full max-h-[380px] drop-shadow-md select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skinHarshini" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dca072" />
              <stop offset="100%" stopColor="#c38356" />
            </linearGradient>
            <linearGradient id="skinAjhai" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d89666" />
              <stop offset="100%" stopColor="#bf7c4f" />
            </linearGradient>
            <linearGradient id="goldChain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="silverChain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2e1d16" />
              <stop offset="100%" stopColor="#140d09" />
            </linearGradient>
            <linearGradient id="warmLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fed7aa" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Ambient Glow */}
          <circle cx="270" cy="180" r="170" fill="url(#warmLight)" />

          {/* ================= HARSHINI (LEFT) ================= */}
          <g className="cursor-pointer" onClick={handleSendKiss}>
            {/* Long Wavy Hair Background */}
            <path
              d="M100,160 C80,220 80,310 115,350 C125,320 135,270 145,240 C140,290 155,340 180,360 C185,310 190,260 195,210 C180,140 120,130 100,160 Z"
              fill="url(#hairGrad)"
            />
            {/* Body / Black Top */}
            <path
              d="M110,340 C120,290 150,265 190,265 C220,265 240,290 250,340 Z"
              fill="#18181b"
            />
            {/* Neck */}
            <path
              d="M175,225 L175,275 C185,280 205,280 215,275 L215,225 Z"
              fill="url(#skinHarshini)"
            />
            {/* Gold Chain & Heart Pendant */}
            <path
              d="M180,250 Q195,270 210,250"
              fill="none"
              stroke="url(#goldChain)"
              strokeWidth="2.5"
            />
            {/* Heart Pendant */}
            <motion.path
              animate={{ rotate: isBlowingKiss ? [0, -12, 12, 0] : [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              d="M195,268 C192,264 188,266 188,270 C188,274 195,279 195,280 C195,279 202,274 202,270 C202,266 198,264 195,268 Z"
              fill="url(#goldChain)"
            />

            {/* Front Hair Volume Left */}
            <path
              d="M130,130 C110,180 120,250 140,290 C145,260 150,210 155,180 C145,155 138,140 130,130 Z"
              fill="url(#hairGrad)"
            />

            {/* Face */}
            <motion.path
              animate={isBlowingKiss ? { y: [-2, 2, -2] } : { y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              d="M150,140 C140,195 155,245 195,245 C235,245 250,195 240,140 C235,115 155,115 150,140 Z"
              fill="url(#skinHarshini)"
            />

            {/* Hair Framing */}
            <path
              d="M142,130 C160,110 230,105 248,135 C242,125 210,115 190,120 C170,125 150,145 142,175 C140,155 140,140 142,130 Z"
              fill="url(#hairGrad)"
            />

            {/* Gold Hoop Earring */}
            <ellipse cx="148" cy="180" rx="3" ry="5" fill="none" stroke="url(#goldChain)" strokeWidth="1.8" />

            {/* Eyes */}
            <g>
              {/* Left Eye - Big Expressive */}
              <ellipse cx="174" cy="162" rx="9" ry="10" fill="#fff" />
              <ellipse cx="175" cy="162" rx="6" ry="6.5" fill="#26150d" />
              <circle cx="177" cy="160" r="2.2" fill="#fff" />
              {/* Eyelash / Eyeliner */}
              <path d="M165,158 Q174,150 184,158" fill="none" stroke="#1c1917" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M183,158 Q187,156 189,153" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />

              {/* Right Eye */}
              <ellipse cx="216" cy="162" rx="9" ry="10" fill="#fff" />
              <ellipse cx="215" cy="162" rx="6" ry="6.5" fill="#26150d" />
              <circle cx="217" cy="160" r="2.2" fill="#fff" />
              {/* Eyelash */}
              <path d="M206,158 Q216,150 226,158" fill="none" stroke="#1c1917" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M225,158 Q229,156 231,153" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />

              {/* Eyebrows - expressive curved */}
              <path d="M163,148 Q174,142 186,147" fill="none" stroke="#2a170d" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M205,147 Q217,142 228,148" fill="none" stroke="#2a170d" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Cute Cheek Blush */}
            <ellipse cx="166" cy="180" rx="9" ry="5" fill="#f43f5e" opacity="0.35" />
            <ellipse cx="224" cy="180" rx="9" ry="5" fill="#f43f5e" opacity="0.35" />

            {/* Nose */}
            <path d="M195,165 Q198,178 193,182" fill="none" stroke="#ab6b40" strokeWidth="2" strokeLinecap="round" />

            {/* Signature Kissy Pout Lips (exact photo homage!) */}
            <g>
              <ellipse cx="196" cy="198" rx="8" ry="6.5" fill="#e11d48" />
              <ellipse cx="196" cy="198" rx="4" ry="3.5" fill="#be123c" />
              <ellipse cx="195" cy="196" rx="2" ry="1.2" fill="#fda4af" />
            </g>

            {/* Tag label */}
            <text x="195" y="365" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="700" fontFamily="sans-serif">
              Harshini 🌸
            </text>
          </g>

          {/* ================= AJHAI (RIGHT) ================= */}
          <g className="cursor-pointer" onClick={handleAjhaiCheer}>
            {/* Body - Dark Jacket & grey tee */}
            <path
              d="M300,340 C310,270 340,250 380,250 C420,250 450,270 460,340 Z"
              fill="#27272a"
            />
            {/* Grey T-Shirt Inner Collar */}
            <path
              d="M355,270 Q380,290 405,270 L400,285 Q380,305 360,285 Z"
              fill="#52525b"
            />
            {/* Silver Link Chain */}
            <path
              d="M352,272 Q380,312 408,272"
              fill="none"
              stroke="url(#silverChain)"
              strokeWidth="3.2"
              strokeDasharray="4 2"
            />

            {/* Neck */}
            <path
              d="M360,225 L360,265 C372,270 388,270 400,265 L400,225 Z"
              fill="url(#skinAjhai)"
            />

            {/* Head - Bald & Handsome (clean shape with gentle crown highlight) */}
            <motion.g
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
            >
              {/* Base Head */}
              <ellipse cx="380" cy="170" rx="46" ry="54" fill="url(#skinAjhai)" />
              {/* Soft Bald Crown Light Sheen */}
              <path
                d="M360,132 C370,124 395,124 405,133"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                opacity="0.3"
                strokeLinecap="round"
              />

              {/* Ears */}
              <ellipse cx="334" cy="176" rx="6" ry="10" fill="url(#skinAjhai)" />
              <ellipse cx="426" cy="176" rx="6" ry="10" fill="url(#skinAjhai)" />

              {/* Groomed Beard and Mustache */}
              {/* Mustache */}
              <path
                d="M362,185 Q380,181 398,185 C394,191 380,193 366,191 Z"
                fill="#261c16"
              />
              {/* Full Neat Beard Contouring Jaw */}
              <path
                d="M336,175 C336,222 360,236 380,236 C400,236 424,222 424,175 C424,188 412,216 380,216 C348,216 336,188 336,175 Z"
                fill="#261c16"
              />
              {/* Chin Soul Patch / Texture */}
              <ellipse cx="380" cy="204" rx="4" ry="5" fill="#1f1611" />

              {/* Warm Gentle Affectionate Smile */}
              <path
                d="M367,192 Q380,202 393,192"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Gentle Nose */}
              <path
                d="M380,158 Q384,174 378,177"
                fill="none"
                stroke="#a66336"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Warm Kind Eyes */}
              <ellipse cx="361" cy="162" rx="4" ry="4" fill="#23140e" />
              <circle cx="362.5" cy="160.5" r="1.3" fill="#fff" />
              {/* Smiling Eye Crinkle */}
              <path d="M352,156 Q361,151 370,156" fill="none" stroke="#23140e" strokeWidth="2.2" strokeLinecap="round" />

              <ellipse cx="399" cy="162" rx="4" ry="4" fill="#23140e" />
              <circle cx="400.5" cy="160.5" r="1.3" fill="#fff" />
              <path d="M390,156 Q399,151 408,156" fill="none" stroke="#23140e" strokeWidth="2.2" strokeLinecap="round" />

              {/* Handsome Eyebrows */}
              <path d="M350,147 Q362,143 372,147" fill="none" stroke="#261c16" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M388,147 Q398,143 410,147" fill="none" stroke="#261c16" strokeWidth="2.8" strokeLinecap="round" />

              {/* Stylish Glasses (rectangular wire frames) */}
              <g>
                {/* Bridge */}
                <path d="M373,161 L387,161" fill="none" stroke="#0f172a" strokeWidth="2" />
                {/* Left Lens Frame */}
                <rect x="345" y="150" width="28" height="22" rx="6" fill="#f8fafc" fillOpacity="0.18" stroke="#0f172a" strokeWidth="2" />
                {/* Left Lens Glare */}
                <path d="M349,154 L357,154" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />

                {/* Right Lens Frame */}
                <rect x="387" y="150" width="28" height="22" rx="6" fill="#f8fafc" fillOpacity="0.18" stroke="#0f172a" strokeWidth="2" />
                {/* Right Lens Glare */}
                <path d="M391,154 L399,154" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />

                {/* Side arms */}
                <path d="M345,158 L334,166" fill="none" stroke="#0f172a" strokeWidth="1.8" />
                <path d="M415,158 L426,166" fill="none" stroke="#0f172a" strokeWidth="1.8" />
              </g>

              {/* Blushing from kiss! */}
              <ellipse
                cx="354"
                cy="176"
                rx={6 * blushLevel}
                ry={4 * blushLevel}
                fill="#f43f5e"
                opacity={0.25 * blushLevel}
              />
              <ellipse
                cx="406"
                cy="176"
                rx={6 * blushLevel}
                ry={4 * blushLevel}
                fill="#f43f5e"
                opacity={0.25 * blushLevel}
              />
            </motion.g>

            {/* Tag label */}
            <text x="380" y="365" textAnchor="middle" fill="#0284c7" fontSize="13" fontWeight="700" fontFamily="sans-serif">
              Ajhai 💙
            </text>
          </g>

          {/* ================= PROPS / SCENE SPECIFIC ITEMS ================= */}
          {scene === 'cuddle' && (
            <g transform="translate(230, 200)">
              {/* Floating Heart between them */}
              <motion.path
                animate={{ scale: [1, 1.25, 1], y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                d="M40,25 C34,16 22,20 22,30 C22,42 40,54 40,55 C40,54 58,42 58,30 C58,20 46,16 40,25 Z"
                fill="#f43f5e"
              />
              <text x="40" y="74" textAnchor="middle" fill="#be123c" fontSize="10" fontWeight="bold">
                Always By Your Side 💕
              </text>
            </g>
          )}

          {scene === 'london' && (
            <g transform="translate(245, 230)">
              {/* Warm coffee cups */}
              <rect x="10" y="20" width="16" height="20" rx="3" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
              <path d="M26,24 C30,24 30,32 26,32" fill="none" stroke="#6366f1" strokeWidth="1.5" />
              <text x="18" y="52" textAnchor="middle" fill="#4338ca" fontSize="9" fontWeight="bold">London Cozy Date ☕</text>
            </g>
          )}

          {scene === 'future' && (
            <g transform="translate(245, 140)">
              <motion.circle
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
                cx="25"
                cy="25"
                r="18"
                fill="#fef08a"
                fillOpacity="0.25"
              />
              <text x="25" y="30" textAnchor="middle" fontSize="20">💍</text>
            </g>
          )}
        </svg>

        {/* Floating Animated Kisses overlay */}
        <AnimatePresence>
          {floatingKisses.map((kiss) => (
            <motion.div
              key={kiss.id}
              initial={{ opacity: 1, scale: 0.5, x: 200, y: 150 }}
              animate={{
                opacity: [1, 1, 0],
                scale: [0.6, 1.4, 1.1],
                x: [200, 270, 340],
                y: [150, 110, 140],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="absolute pointer-events-none text-2xl z-30"
              onAnimationComplete={() => {
                setFloatingKisses((prev) => prev.filter((k) => k.id !== kiss.id));
              }}
            >
              💋
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Interactive Controls & Scene Switcher */}
      {interactive && (
        <div className="mt-4 pt-4 border-t border-rose-100/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-rose-50/80 p-1.5 rounded-2xl border border-rose-100">
            <button
              onClick={() => {
                soundFx.playPop();
                setScene('selfie');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                scene === 'selfie'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                  : 'text-rose-700 hover:bg-rose-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5" /> Our Sweet Selfie
            </button>
            <button
              onClick={() => {
                soundFx.playPop();
                setScene('cuddle');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                scene === 'cuddle'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                  : 'text-rose-800 hover:bg-rose-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" /> Heart to Heart
            </button>
            <button
              onClick={() => {
                soundFx.playPop();
                setScene('london');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                scene === 'london'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                  : 'text-purple-800 hover:bg-purple-100'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" /> London Day Out
            </button>
            <button
              onClick={() => {
                soundFx.playPop();
                setScene('future');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                scene === 'future'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              <Stars className="w-3.5 h-3.5" /> Forever & Marriage
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendKiss}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-300 hover:shadow-rose-400 transition-all flex items-center justify-center gap-2"
          >
            <span>Send Kiss to You</span>
            <span className="text-base">💋</span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

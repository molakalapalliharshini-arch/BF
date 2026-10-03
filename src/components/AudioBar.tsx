import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const AudioBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    soundFx.toggleMelody((playing) => {
      setIsPlaying(playing);
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={handleToggle}
        className={`px-4 py-2.5 rounded-full flex items-center gap-2.5 shadow-xl backdrop-blur-md border transition-all text-xs font-semibold ${
          isPlaying
            ? 'bg-rose-500/90 text-white border-rose-300 shadow-rose-300/50'
            : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white shadow-slate-300/40'
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-white animate-pulse" />
              <span className="w-0.5 h-2 bg-white animate-pulse delay-75" />
              <span className="w-0.5 h-3.5 bg-white animate-pulse delay-150" />
            </div>
            <Volume2 className="w-4 h-4" />
            <span>Romantic Melody On</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-rose-500" />
            <span>Play Soft Melody</span>
          </>
        )}
      </button>
    </div>
  );
};

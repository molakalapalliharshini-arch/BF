import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MapPin, Calendar, Heart, X, Trash2, Sparkles, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

export interface PolaroidPhoto {
  id: string;
  url: string;
  caption: string;
  location: string;
  date: string;
  rotation: number;
  tapeColor: string;
  isCustom?: boolean;
}

const DEFAULT_POLAROIDS: PolaroidPhoto[] = [
  {
    id: 'london-1',
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    caption: 'You planned the entire day with so much thought',
    location: 'Tower Bridge, London',
    date: 'Our London Days',
    rotation: -2,
    tapeColor: 'bg-rose-200/90',
  },
  {
    id: 'london-2',
    url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=800&q=80',
    caption: 'Hot coffee, cold breeze, and your warm smile',
    location: 'Covent Garden',
    date: 'Cozy Afternoon',
    rotation: 1.5,
    tapeColor: 'bg-amber-200/90',
  },
  {
    id: 'london-3',
    url: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=800&q=80',
    caption: 'Every plan was a sweet surprise from you',
    location: 'Piccadilly & Soho',
    date: 'Day of Surprises',
    rotation: -1,
    tapeColor: 'bg-indigo-200/90',
  },
  {
    id: 'london-4',
    url: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80',
    caption: 'Walking side by side, dreaming of our future',
    location: 'Hyde Park Stroll',
    date: 'Golden Hour',
    rotation: 2,
    tapeColor: 'bg-pink-200/90',
  },
];

const LOCAL_STORAGE_KEY = 'ajhai_harshini_london_photos';

export const MemoryGallery: React.FC = () => {
  const [photos, setPhotos] = useState<PolaroidPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_POLAROIDS;
  });

  const [activePhoto, setActivePhoto] = useState<PolaroidPhoto | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newImagePreview, setNewImagePreview] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('London');
  const [date, setDate] = useState('Our Sweet Trip');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photos));
    } catch {
      // ignore
    }
  }, [photos]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImagePreview) return;

    soundFx.playCelebration();
    const tapeColors = ['bg-rose-200/90', 'bg-amber-200/90', 'bg-emerald-200/90', 'bg-sky-200/90', 'bg-purple-200/90'];
    const randomTape = tapeColors[Math.floor(Math.random() * tapeColors.length)];
    const randomRotation = (Math.random() * 4 - 2);

    const newPhoto: PolaroidPhoto = {
      id: `custom-${Date.now()}`,
      url: newImagePreview,
      caption: caption.trim() || 'A cherished memory with you',
      location: location.trim() || 'London',
      date: date.trim() || 'Our London Trip',
      rotation: Number(randomRotation.toFixed(1)),
      tapeColor: randomTape,
      isCustom: true,
    };

    setPhotos((prev) => [newPhoto, ...prev]);
    setIsAddModalOpen(false);
    setNewImagePreview('');
    setCaption('');
    setLocation('London');
    setDate('Our Sweet Trip');

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#f59e0b', '#3b82f6'],
    });
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playPop();
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (activePhoto?.id === id) {
      setActivePhoto(null);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto my-14 px-4" id="gallery">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>London Keepsake Gallery</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-romantic text-slate-900 tracking-tight">
          Our London Trip Memories
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          The days you planned with surprises, laughter, and sweet moments across the city.
          Click any polaroid to view or add our own photos.
        </p>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              soundFx.playPop();
              setIsAddModalOpen(true);
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full text-xs font-bold shadow-md shadow-rose-200 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Our Photo to the Gallery</span>
          </button>
        </div>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 sm:gap-8 pt-4 pb-6">
        {/* "+ Add Polaroid" Card */}
        <motion.div
          whileHover={{ scale: 1.03, rotate: 0 }}
          onClick={() => {
            soundFx.playPop();
            setIsAddModalOpen(true);
          }}
          className="bg-white/70 border-2 border-dashed border-rose-300 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[340px] text-center cursor-pointer hover:bg-rose-50/50 hover:border-rose-400 transition-all shadow-sm group"
        >
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Add London Photo</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-[180px]">
            Upload a picture from our London trip and write a handwritten note.
          </p>
        </motion.div>

        {/* Existing Polaroids */}
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
            style={{ transform: `rotate(${photo.rotation}deg)` }}
            onClick={() => {
              soundFx.playPop();
              setActivePhoto(photo);
            }}
            className="relative bg-white rounded-xl p-3.5 pb-6 shadow-lg hover:shadow-2xl border border-slate-100 transition-all cursor-pointer group flex flex-col"
          >
            {/* Washi Tape Accent */}
            <div
              className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 ${photo.tapeColor} backdrop-blur-sm rounded-sm shadow-sm rotate-1 opacity-85 z-10`}
            />

            {/* Photo Image Frame */}
            <div className="relative aspect-[4/3] w-full bg-slate-100 rounded-md overflow-hidden mb-3.5 shadow-inner">
              <img
                src={photo.url}
                alt={photo.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white bg-black/50 p-2 rounded-full transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Handwritten Caption & Details */}
            <div className="flex-1 flex flex-col justify-between px-1">
              <p className="font-handwriting text-xl text-slate-800 leading-tight min-h-[44px]">
                "{photo.caption}"
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-medium truncate">
                  <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                  <span className="truncate">{photo.location}</span>
                </span>
                <span className="flex items-center gap-1 shrink-0 text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{photo.date}</span>
                </span>
              </div>
            </div>

            {/* Delete button if custom */}
            {photo.isCustom && (
              <button
                onClick={(e) => handleDeletePhoto(photo.id, e)}
                className="absolute bottom-2 right-2 p-1.5 text-slate-300 hover:text-rose-600 rounded-full hover:bg-rose-50 transition"
                title="Remove photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-5 sm:p-7 max-w-lg w-full shadow-2xl relative border border-slate-100 text-slate-800"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md mb-4">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 text-center">
                <p className="font-handwriting text-2xl sm:text-3xl text-slate-900 leading-snug">
                  "{activePhoto.caption}"
                </p>

                <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-600 pt-2">
                  <span className="flex items-center gap-1.5 bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-100">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{activePhoto.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activePhoto.date}</span>
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-rose-600 font-medium">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>A memory made with you</span>
                </span>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Photo Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-slate-100 text-slate-800"
            >
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setNewImagePreview('');
                }}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold font-serif-romantic text-slate-900 mb-1">
                Add Our London Memory
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Upload a picture from our London trip and frame it with a handwritten note.
              </p>

              <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
                {/* Image Upload Area */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Photo:
                  </label>
                  {newImagePreview ? (
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 mb-2">
                      <img
                        src={newImagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setNewImagePreview('')}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-rose-300 hover:border-rose-400 bg-rose-50/40 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition"
                    >
                      <ImageIcon className="w-8 h-8 text-rose-500 mb-2" />
                      <span className="text-xs font-bold text-rose-700">Click to upload photo</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">JPEG, PNG, WEBP</span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Handwritten Caption:
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. Strolling hand in hand near the river..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    required
                  />
                </div>

                {/* Location & Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Location:
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Covent Garden"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date / Moment:
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. Day Out Together"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-2 justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setNewImagePreview('');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newImagePreview}
                    className={`px-5 py-2 text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 ${
                      newImagePreview
                        ? 'bg-rose-500 hover:bg-rose-600 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Pin to Gallery</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

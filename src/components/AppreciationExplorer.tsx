import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Shield,
  Sparkles,
  Compass,
  Award,
  Anchor,
  Search,
  Check,
  HeartHandshake,
  Flame,
  Key,
  Users,
  Sun,
  MessageCircleHeart,
  Truck,
  Luggage,
  Home,
  DoorOpen,
  Coins,
  Wallet,
  PhoneCall,
  Smile,
  Gift,
  CalendarCheck,
  Coffee,
  Image,
  ShieldCheck,
  Sunrise,
  TrendingUp,
  HeartCrack,
  Eye,
} from 'lucide-react';
import { BOYFRIEND_DATA, APPRECIATION_ITEMS } from '../data/boyfriendData';
import { StoryCategory, AppreciationItem } from '../types';
import { soundFx } from '../utils/audio';

const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Shield,
  Sparkles,
  Compass,
  Award,
  Anchor,
  HeartHandshake,
  Flame,
  Key,
  Users,
  Sun,
  MessageCircleHeart,
  Truck,
  Luggage,
  Home,
  DoorOpen,
  Coins,
  Wallet,
  PhoneCall,
  Smile,
  Gift,
  CalendarCheck,
  Coffee,
  Image,
  ShieldCheck,
  Sunrise,
  TrendingUp,
  HeartCrack,
  Eye,
};

export const AppreciationExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['app-1', 'care-2', 'sup-4']));

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playPop();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredItems = APPRECIATION_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full max-w-6xl mx-auto my-12 px-4" id="reasons">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          The Heartfelt Collection
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-romantic text-slate-900 tracking-tight">
          Everything I Love & Cherish About You
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Browse through the ways you've touched my life, stood by me, and made me feel treasured.
        </p>

        {/* Search bar */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search moments (e.g. 'move', 'London', 'support')..."
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-rose-100 shadow-sm text-xs focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => {
            soundFx.playPop();
            setSelectedCategory('all');
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Reasons ({APPRECIATION_ITEMS.length})
        </button>

        {BOYFRIEND_DATA.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              soundFx.playPop();
              setSelectedCategory(cat.id as StoryCategory);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-100'
            }`}
          >
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredItems.map((item) => {
            const Icon = ICON_MAP[item.iconName] || Heart;
            const isFav = favorites.has(item.id);

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-3xl p-5 border transition-all relative flex flex-col justify-between shadow-sm hover:shadow-lg ${
                  item.highlight
                    ? 'border-rose-200/90 ring-1 ring-rose-200 bg-gradient-to-b from-white to-rose-50/30'
                    : 'border-slate-100 hover:border-rose-200'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div
                      className={`p-2.5 rounded-2xl ${
                        item.highlight
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                          : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.tag && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {item.tag}
                        </span>
                      )}
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className={`p-1.5 rounded-full transition ${
                          isFav
                            ? 'text-rose-500 bg-rose-50'
                            : 'text-slate-300 hover:text-rose-400'
                        }`}
                        title="Save to favorites"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug mb-1.5 font-serif-romantic">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="capitalize">{item.category.replace('-', ' ')}</span>
                  {item.highlight && (
                    <span className="text-rose-500 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Extra Special
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-rose-200">
          <p className="text-sm text-slate-500">No matching reasons found for "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs text-rose-600 font-bold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};

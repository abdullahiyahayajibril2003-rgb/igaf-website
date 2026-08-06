import React, { useState, useMemo } from 'react';
import { Camera, MapPin, Maximize2, Tag } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types';
import { LightboxModal } from '../components/LightboxModal';
import { ImageWithSkeleton } from '../components/ImageWithSkeleton';

export const GalleryView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Showroom', 'On Farm', 'Deliveries', 'Spare Parts'];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO HEADER */}
      <section className="bg-emerald-950 text-white py-12 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="bg-emerald-900 text-orange-400 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-700">
            Showroom & Field Showcase
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Machinery Photo Gallery
          </h1>
          <p className="text-emerald-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Explore live photos of our machinery at the Masalacin Idi showroom in Keffi, active on farms across Nasarawa State, and during customer deliveries.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS & GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count = cat === 'All' 
              ? GALLERY_ITEMS.length 
              : GALLERY_ITEMS.filter(i => i.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-900 text-white shadow-md ring-2 ring-emerald-600'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section Header based on active filter */}
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {activeCategory === 'All' ? 'All Showcase Media' : `Showing ${activeCategory} Gallery`}
          </h2>
          <p className="text-xs text-slate-500">
            {activeCategory === 'Showroom' && 'Live photos from our Masalacin Idi, Keffi showroom floor and machine displays.'}
            {activeCategory === 'On Farm' && 'Authentic field footage of our machinery operating on farms across Nasarawa & FCT.'}
            {activeCategory === 'Deliveries' && 'Waybill packaging, truck dispatches, and client deliveries in progress.'}
            {activeCategory === 'Spare Parts' && 'Genuine engine pistons, rubber rollers, manganese blades, and grinding discs in warehouse.'}
            {activeCategory === 'All' && 'Click on any photo to view in high resolution with complete specifications.'}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const badgeColor = 
              item.category === 'Showroom' ? 'bg-emerald-800/90 text-white' :
              item.category === 'On Farm' ? 'bg-orange-600/90 text-white' :
              item.category === 'Deliveries' ? 'bg-blue-700/90 text-white' :
              'bg-slate-900/90 text-amber-300';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <ImageWithSkeleton
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    containerClassName="w-full h-full"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-emerald-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>

                  <span className={`absolute top-3 left-3 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded shadow-md ${badgeColor}`}>
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-normal">
                    {item.description}
                  </p>
                  {item.location && (
                    <div className="flex items-center gap-1 text-[11px] text-orange-600 font-semibold pt-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Lightbox Viewer */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

    </div>
  );
};

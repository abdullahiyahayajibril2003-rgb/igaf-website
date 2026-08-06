import React from 'react';
import { X, MapPin, Tag } from 'lucide-react';
import { GalleryItem } from '../types';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative max-w-4xl w-full bg-emerald-950 rounded-2xl overflow-hidden shadow-2xl border border-emerald-800 flex flex-col">
        {/* Top Control Bar */}
        <div className="p-4 bg-emerald-900/60 border-b border-emerald-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-orange-600 px-2.5 py-1 rounded text-white">
              {item.category}
            </span>
            <h3 className="font-bold text-base text-white truncate max-w-md">{item.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden">
          <ImageWithSkeleton 
            src={item.imageUrl} 
            alt={item.title}
            loading="eager"
            decoding="async"
            containerClassName="w-full h-full min-h-[300px] max-h-[60vh] flex items-center justify-center"
            className="object-contain max-h-[60vh]"
          />
        </div>

        {/* Footer Details */}
        <div className="p-4 bg-emerald-950 text-emerald-100 space-y-2 border-t border-emerald-800">
          <p className="text-sm text-emerald-200 leading-relaxed">
            {item.description}
          </p>
          {item.location && (
            <div className="flex items-center gap-1.5 text-xs text-orange-400 font-medium">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Location: {item.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

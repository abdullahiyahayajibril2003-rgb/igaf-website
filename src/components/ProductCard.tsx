import React from 'react';
import { Product } from '../types';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { 
  CheckCircle2, 
  ChevronRight, 
  MessageCircle, 
  Zap, 
  Gauge, 
  FileText,
  SlidersHorizontal,
  Check
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  onRequestQuote: (productSlug: string) => void;
  onToggleCompare?: (product: Product) => void;
  isCompared?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onRequestQuote,
  onToggleCompare,
  isCompared = false,
}) => {
  const whatsappUrl = `https://wa.me/2347047197737?text=${encodeURIComponent(
    `Hello IGAF Limited, I am inquiring about the ${product.name} (${product.category}) displayed on your website.`
  )}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-emerald-500/40">
      
      {/* Product Image Header with Badges */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onSelect(product.id)}>
        <ImageWithSkeleton
          src={product.mainImage}
          alt={product.name}
          loading="lazy"
          decoding="async"
          containerClassName="w-full h-full"
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="bg-emerald-800 text-white text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-md shadow-md border border-emerald-700">
            {product.category}
          </span>

          <div className="flex items-center gap-1.5">
            {onToggleCompare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(product);
                }}
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow transition-all flex items-center gap-1 ${
                  isCompared
                    ? 'bg-orange-600 text-white border border-orange-400 ring-2 ring-orange-500/30'
                    : 'bg-slate-900/80 hover:bg-slate-900 text-slate-200 border border-slate-700'
                }`}
              >
                {isCompared ? <Check className="w-3 h-3 stroke-[3]" /> : <SlidersHorizontal className="w-3 h-3" />}
                <span>{isCompared ? 'Compared' : 'Compare'}</span>
              </button>
            )}

            {product.isNew && (
              <span className="bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                New Line
              </span>
            )}
          </div>
        </div>

        {/* Bottom Image Overlay Specs */}
        <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex items-center justify-between">
          <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1">
            <Zap className="w-3 h-3 text-orange-400" />
            <span>{product.powerSource}</span>
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1">
            <Gauge className="w-3 h-3 text-emerald-400" />
            <span>{product.capacity}</span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 
            onClick={() => onSelect(product.id)}
            className="font-bold text-slate-900 text-lg group-hover:text-emerald-800 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {product.tagline}
          </p>

          {/* Key Specs Pills */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 font-medium block">Engine Power:</span>
              <span className="font-semibold text-slate-800 truncate block">{product.enginePower}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Warranty:</span>
              <span className="font-semibold text-emerald-700 truncate block">{product.warranty}</span>
            </div>
          </div>

          {/* Features Highlights */}
          <ul className="mt-3 space-y-1 text-xs text-slate-700">
            {product.features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1 text-slate-600">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(product.id)}
              className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors shadow-sm"
            >
              <span>View Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onRequestQuote(product.slug)}
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Get Quote</span>
            </button>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Instant WhatsApp Inquiry</span>
          </a>
        </div>

      </div>

    </div>
  );
};

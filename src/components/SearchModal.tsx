import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, PageRoute } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
  onNavigate: (route: PageRoute, params?: { category?: string }) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Real-time filter matching PRODUCTS list by name, shortName, category, machineType, tagline, or description
  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return PRODUCTS.filter(p => {
      const nameMatch = p.name.toLowerCase().includes(trimmed);
      const shortNameMatch = p.shortName.toLowerCase().includes(trimmed);
      const categoryMatch = p.category.toLowerCase().includes(trimmed);
      const machineTypeMatch = p.machineType.toLowerCase().includes(trimmed);
      const taglineMatch = p.tagline.toLowerCase().includes(trimmed);
      const descMatch = p.description.toLowerCase().includes(trimmed);
      const usesMatch = p.uses?.some(u => u.toLowerCase().includes(trimmed)) ?? false;
      const powerMatch = p.powerSource.toLowerCase().includes(trimmed);

      return nameMatch || shortNameMatch || categoryMatch || machineTypeMatch || taglineMatch || descMatch || usesMatch || powerMatch;
    });
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-start justify-center pt-12 sm:pt-20 px-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-emerald-900/20 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Header */}
        <div className="p-4 sm:p-5 bg-emerald-950 text-white space-y-3 border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-orange-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search machines (e.g. Rice Mill, Chaff Cutter, Water Pump)..."
              className="w-full bg-transparent text-white placeholder-emerald-300/60 focus:outline-none text-base sm:text-lg font-medium"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="text-emerald-300 hover:text-white bg-emerald-900/80 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
              >
                Clear
              </button>
            )}
            <button 
              onClick={onClose}
              className="text-emerald-200 hover:text-white bg-emerald-900 hover:bg-emerald-800 p-2 rounded-xl transition-colors shrink-0"
              title="Close search modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            <span className="text-emerald-400 font-bold shrink-0">Quick Filters:</span>
            {[
              'Rice Mills',
              'Grinding Machines',
              'Chaff Cutters',
              'Garri Processing',
              'Water Pumps',
              'Power Tillers',
              'Spare Parts'
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className={`px-2.5 py-0.5 rounded-full font-semibold whitespace-nowrap transition-colors ${
                  query.toLowerCase() === tag.toLowerCase()
                    ? 'bg-orange-500 text-white'
                    : 'bg-emerald-900/70 text-emerald-200 hover:bg-emerald-800 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Search Results Area */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3 bg-slate-50/50">
          {!query.trim() ? (
            <div className="py-8 space-y-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-900 text-base">Real-Time Agricultural Machinery Search</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Type any product name or category above to instantly view matching equipment specs, capacities, and direct details.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Popular Product Lines</p>
                <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                  {[
                    'Rice Mills',
                    'Chaff Cutters',
                    'Grinding Machines',
                    'Hammer Mills',
                    'Garri Processing',
                    'Water Pumps',
                    'Power Tillers',
                    'De-stoners',
                    'Spare Parts'
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setQuery(cat)}
                      className="px-3.5 py-1.5 bg-white hover:bg-emerald-950 text-slate-700 hover:text-white border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <span>{cat}</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-extrabold text-slate-800">No matching machines found for &quot;{query}&quot;</p>
                <p className="text-xs text-slate-500 mt-1">Check your spelling or try searching for broad terms like &quot;Rice Mill&quot; or &quot;Diesel&quot;</p>
              </div>
              <button
                onClick={() => setQuery('')}
                className="inline-block bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-emerald-900 transition-colors"
              >
                Clear Search Query
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                <span>Matching Products ({searchResults.length} found)</span>
                <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Real-time Filter Active
                </span>
              </div>

              <div className="space-y-2.5">
                {searchResults.map((product: Product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(product.id);
                    }}
                    className="p-3.5 bg-white hover:bg-emerald-50/90 rounded-2xl cursor-pointer border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 group"
                  >
                    <img 
                      src={product.mainImage} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-xl bg-slate-100 shrink-0 border border-slate-200 group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md">
                          {product.category}
                        </span>
                        <span className="text-[10px] text-orange-600 font-bold flex items-center gap-1">
                          <Zap className="w-3 h-3 text-orange-500" />
                          {product.capacity}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {product.tagline}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 text-emerald-800 font-bold text-xs group-hover:translate-x-1 transition-transform">
                      <span className="hidden sm:inline">View Specs</span>
                      <ArrowRight className="w-4 h-4 text-orange-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-[11px] text-slate-500 flex items-center justify-between px-5">
          <span className="flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Showing real-time results from IGAF product catalog
          </span>
          <span className="text-[10px] font-semibold text-slate-400">
            Press ESC to exit
          </span>
        </div>

      </div>
    </div>
  );
};


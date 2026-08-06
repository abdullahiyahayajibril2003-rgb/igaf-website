import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Tractor, 
  FileText,
  DollarSign,
  Tag,
  Filter
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { PageRoute, Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductsViewProps {
  initialCategory?: string;
  onSelectProduct: (productId: string) => void;
  onNavigate: (route: PageRoute, params?: { productSlug?: string }) => void;
  onToggleCompare?: (product: Product) => void;
  comparedProductIds?: string[];
  onOpenCompare?: () => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  initialCategory,
  onSelectProduct,
  onNavigate,
  onToggleCompare,
  comparedProductIds = [],
  onOpenCompare
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'All Products'
  );
  const [selectedPowerSource, setSelectedPowerSource] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'>('featured');
  const [maxPriceBudget, setMaxPriceBudget] = useState<number>(5500000);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category match
      if (selectedCategory !== 'All Products' && p.category !== selectedCategory) {
        return false;
      }
      // Power source match
      if (selectedPowerSource !== 'All' && p.powerSource !== selectedPowerSource) {
        return false;
      }
      // Price range slider match
      if (p.priceNumeric && p.priceNumeric > maxPriceBudget) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesType = p.machineType.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesUses = p.uses.some((u) => u.toLowerCase().includes(q));
        if (!matchesName && !matchesType && !matchesDesc && !matchesUses) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'price-asc') return (a.priceNumeric || 0) - (b.priceNumeric || 0);
      if (sortBy === 'price-desc') return (b.priceNumeric || 0) - (a.priceNumeric || 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedPowerSource, maxPriceBudget, searchQuery, sortBy]);

  return (
    <div className="space-y-10 pb-16">
      
      {/* PAGE HEADER */}
      <section className="bg-emerald-950 text-white py-12 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="bg-emerald-900 text-orange-400 text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-700">
            Agricultural Machinery Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Our Complete Equipment Lineup
          </h1>
          <p className="text-emerald-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Heavy-duty agricultural machinery, processing plants, irrigation water pumps, and genuine spare parts available at our Masalacin Idi, Keffi showroom.
          </p>
        </div>
      </section>

      {/* FILTER & SEARCH CONTROL BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Search & Main Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Live Search Field */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by equipment name e.g. Rice Mill, Chaff Cutter..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-10 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Power Source Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedPowerSource}
                onChange={(e) => setSelectedPowerSource(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-600"
              >
                <option value="All">Power Source: All Engines</option>
                <option value="Diesel Engine">Diesel Engine</option>
                <option value="Petrol Engine">Petrol Engine</option>
                <option value="Electric Motor">Electric Motor</option>
                <option value="Manual / PTO">Manual / PTO</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-600"
              >
                <option value="featured">Sort by: Featured First</option>
                <option value="price-asc">Sort by: Price (Low to High)</option>
                <option value="price-desc">Sort by: Price (High to Low)</option>
                <option value="name-asc">Sort by: Name (A to Z)</option>
                <option value="name-desc">Sort by: Name (Z to A)</option>
              </select>
            </div>

          </div>

          {/* PRICE RANGE SLIDER FILTER BAR */}
          <div className="pt-4 border-t border-slate-100 bg-emerald-950/5 p-4 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Price / Budget Range Filter:
                </span>
                <span className="bg-emerald-800 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-md shadow-xs">
                  Max: ₦{maxPriceBudget.toLocaleString()}
                </span>
              </div>

              {/* Quick Budget Presets */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                <span className="text-slate-400 font-bold shrink-0">Budget Presets:</span>
                {[
                  { label: 'All Budgets', val: 5500000 },
                  { label: 'Under ₦500k', val: 500000 },
                  { label: 'Under ₦1.5M', val: 1500000 },
                  { label: 'Under ₦3.0M', val: 3000000 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setMaxPriceBudget(preset.val)}
                    className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                      maxPriceBudget === preset.val
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-emerald-100 border border-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Input */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-[11px] font-bold text-slate-500 shrink-0">₦100,000</span>
              <input
                type="range"
                min={100000}
                max={5500000}
                step={100000}
                value={maxPriceBudget}
                onChange={(e) => setMaxPriceBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-800 focus:outline-none"
              />
              <span className="text-[11px] font-bold text-emerald-900 shrink-0">₦5,500,000+</span>
            </div>
          </div>

          {/* Category Pills Slider/Wrap */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
          <p>
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> equipment items
            {selectedCategory !== 'All Products' && <span> in <span className="text-emerald-800 font-bold">{selectedCategory}</span></span>}
          </p>

          <div className="flex items-center gap-4">
            {onOpenCompare && comparedProductIds.length > 0 && (
              <button
                onClick={onOpenCompare}
                className="text-orange-600 font-extrabold flex items-center gap-1 hover:underline"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Compare {comparedProductIds.length} Selected</span>
              </button>
            )}

            {(selectedCategory !== 'All Products' || selectedPowerSource !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All Products');
                  setSelectedPowerSource('All');
                  setSearchQuery('');
                }}
                className="text-slate-500 hover:text-red-600 flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <Tractor className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-lg">No machinery matched your filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try resetting your search query or selecting &quot;All Products&quot; to see our full inventory.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Products');
                setSelectedPowerSource('All');
                setSearchQuery('');
              }}
              className="mt-2 bg-emerald-800 text-white px-4 py-2 rounded-lg text-xs font-bold"
            >
              Show All Machinery
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onRequestQuote={(slug) => onNavigate('quote', { productSlug: slug })}
                onToggleCompare={onToggleCompare}
                isCompared={comparedProductIds.includes(product.id)}
              />
            ))}
          </div>
        )}

      </section>

    </div>
  );
};

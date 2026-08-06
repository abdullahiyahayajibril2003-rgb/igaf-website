import React, { useState } from 'react';
import { 
  Tractor, 
  MessageCircle, 
  Phone, 
  FileText, 
  ChevronLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Gauge, 
  Zap, 
  Wrench, 
  PackageCheck,
  ArrowRight
} from 'lucide-react';
import { Product, PageRoute } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ImageWithSkeleton } from '../components/ImageWithSkeleton';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (productId: string) => void;
  onNavigate: (route: PageRoute, params?: { productSlug?: string }) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onSelectProduct,
  onNavigate,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const gallery = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.mainImage];

  const whatsappMessage = encodeURIComponent(
    `Hello IGAF Limited, I am inquiring about purchasing the ${product.name} (${product.category}) seen on your website.`
  );

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && (p.category === product.category || p.powerSource === product.powerSource)
  ).slice(0, 3);

  return (
    <div className="space-y-12 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-emerald-900 font-bold text-xs bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Catalog</span>
          <span>/</span>
          <span className="text-emerald-800">{product.category}</span>
          <span>/</span>
          <span className="text-slate-900 font-bold line-clamp-1">{product.shortName || product.name}</span>
        </div>
      </div>

      {/* MAIN PRODUCT HERO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery Viewer */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Display Image */}
          <div className="relative aspect-[4/3] w-full bg-slate-100 rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md">
            <ImageWithSkeleton
              src={gallery[activeImageIndex]}
              alt={product.name}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              containerClassName="w-full h-full"
            />
            <div className="absolute top-4 left-4 bg-emerald-900/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow pointer-events-none">
              {product.category}
            </div>
          </div>

          {/* Gallery Thumbnails Switcher */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx 
                      ? 'border-orange-500 ring-2 ring-orange-400/50 scale-105' 
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithSkeleton
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    containerClassName="w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Key Details & Immediate CTAs */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">
              <Tractor className="w-4 h-4" />
              <span>{product.machineType}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Key Quick Highlight Box */}
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200/80 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Power Engine:</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-orange-500" />
                  <span>{product.enginePower}</span>
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Production Capacity:</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{product.capacity}</span>
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Machine Weight:</span>
                <span className="font-bold text-slate-800">{product.weight}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Warranty:</span>
                <span className="font-bold text-emerald-700">{product.warranty}</span>
              </div>
            </div>

            <p className="text-[11px] text-emerald-800/90 font-medium pt-1 border-t border-emerald-200">
              &bull; In Stock at Masalacin Idi, Keffi Store &bull; Same-Day Pickup / Waybill Available
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3 pt-2">
            
            <button
              onClick={() => onNavigate('quote', { productSlug: product.slug })}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              <span>Request Official Quotation</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/2347047197737?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Inquire WhatsApp</span>
              </a>

              <a
                href="tel:07047197737"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>Call Showroom</span>
              </a>
            </div>

          </div>

          <div className="text-xs text-slate-500 space-y-1.5 pt-2">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Guaranteed Genuine Equipment & Accessories</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Wrench className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free On-Site Setup Guidance by Experienced Mechanics</span>
            </div>
          </div>

        </div>

      </div>

      {/* TECHNICAL SPECIFICATIONS & FULL OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
        
        {/* Left Column: Full Overview & Specs Table */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Comprehensive Machine Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {product.fullOverview}
            </p>
          </div>

          {/* Specs Table */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-emerald-700" />
              <span>Technical Specifications</span>
            </h3>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="py-2.5 flex justify-between gap-4">
                  <span className="font-semibold text-slate-500">{spec.label}:</span>
                  <span className="font-bold text-slate-900 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Key Features, Uses & Included Accessories */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Key Features List */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Key Equipment Features</span>
            </h3>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Uses */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Tractor className="w-5 h-5 text-orange-600" />
              <span>Recommended Applications</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {product.uses.map((use, idx) => (
                <span key={idx} className="bg-emerald-50 text-emerald-900 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-200">
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* Included Accessories */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-emerald-700" />
              <span>Included Accessories & Toolkits</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-700">
              {product.includedAccessories.map((acc, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span className="font-medium">{acc}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* RELATED MACHINERY RECOMMENDATIONS */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Related Machinery Lines
            </h2>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>View All Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onRequestQuote={(slug) => onNavigate('quote', { productSlug: slug })}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

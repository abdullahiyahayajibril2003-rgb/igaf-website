import React, { useState } from 'react';
import { 
  Tractor, 
  ShieldCheck, 
  Wrench, 
  Award, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Building2, 
  PackageCheck, 
  FileText,
  MapPin,
  Sparkles,
  Zap,
  Check,
  SlidersHorizontal,
  GraduationCap,
  Headphones,
  Settings2,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { PageRoute, Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { FadeInElement } from '../hooks/useIntersectionObserver';
import { ImageWithSkeleton } from '../components/ImageWithSkeleton';

import riceMillImg from '../assets/images/rice-mill.jpg';
import powerTillerImg from '../assets/images/power-tiller.jpg';

interface HomeViewProps {
  onNavigate: (route: PageRoute, params?: { productId?: string; category?: string; productSlug?: string }) => void;
  onSelectProduct: (productId: string) => void;
  onToggleCompare?: (product: Product) => void;
  comparedProductIds?: string[];
  onOpenCompare?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  onNavigate, 
  onSelectProduct,
  onToggleCompare,
  comparedProductIds = [],
  onOpenCompare
}) => {
  const [activeTabCategory, setActiveTabCategory] = useState<string>('All Products');
  
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured);
  const tabFilteredProducts = activeTabCategory === 'All Products'
    ? featuredProducts
    : PRODUCTS.filter(p => p.category === activeTabCategory);

  const stats = [
    { label: 'Years Serving West Africa', value: '10+', icon: Building2 },
    { label: 'Heavy Machines Delivered', value: '5,000+', icon: Tractor },
    { label: 'Key Machine Lineups', value: '10 Series', icon: PackageCheck },
    { label: 'Genuine Spare Inventory', value: '100% Guaranteed', icon: Wrench },
  ];

  const whyChooseUs = [
    {
      title: 'Engineered for African Soil',
      desc: 'All our grinding machines, rice mills, and power tillers feature heavy-cast steel frames built specifically to handle high humidity, tough soils, and rigorous continuous operations.',
      icon: Tractor,
    },
    {
      title: '100% Original Spare Parts',
      desc: 'We stock genuine replacement parts—including diesel engine pistons, rubber rollers, manganese blades, and alloy grinding discs—right at our Masalacin Idi showroom.',
      icon: ShieldCheck,
    },
    {
      title: 'Expert On-Site Engineering',
      desc: 'Our certified agricultural mechanics provide professional machine setup, operator safety training, preventive maintenance, and quick field servicing.',
      icon: Wrench,
    },
    {
      title: 'Direct Factory Pricing',
      desc: 'By working directly with international OEM machinery manufacturers, IGAF Limited guarantees unbeatable wholesale and retail rates for Nigerian agribusinesses.',
      icon: Award,
    },
  ];

  const corePillars = [
    'Commercial Food Processing Machines',
    'Grain Milling & De-stoning Plants',
    'Crop Residue & Silage Cutters',
    'High-Pressure Water Pumps',
    'Diesel Power Tillers & Implements',
    '100% Genuine Spare Parts & Roller Supplies'
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO BANNER SECTION */}
      <section className="relative bg-emerald-950 text-white overflow-hidden border-b-4 border-orange-500">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center" 
          style={{ backgroundImage: `url(${powerTillerImg})` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/95 to-slate-900/90 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-900/90 text-orange-400 border border-emerald-700/80 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>IBRAHIMAWA GLOBAL AND FARM (IGAF) LIMITED</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Nigeria&apos;s Premier Center for <span className="text-orange-500">Heavy Agro-Machinery</span> & Spares
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
                Industrial Grinding Machines, Commercial Rice Mills, Gravity De-stoners, Chaff Cutters, Hammer Mills, Garri Processing Equipment, Water Pumps, Power Tillers & Original Engine Parts.
              </p>

              {/* Core Feature Bullet Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-emerald-200 text-left pt-1 max-w-xl mx-auto lg:mx-0">
                {corePillars.map((pillar, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => onNavigate('products')}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-7 py-3.5 rounded-xl text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Explore 10 Machinery Lines</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {onOpenCompare && (
                  <button
                    onClick={onOpenCompare}
                    className="bg-slate-900/90 hover:bg-slate-800 text-white font-bold px-5 py-3.5 rounded-xl text-base border border-slate-700 shadow-md transition-all flex items-center gap-2"
                  >
                    <SlidersHorizontal className="w-5 h-5 text-orange-400" />
                    <span>Compare Specs ({comparedProductIds.length})</span>
                  </button>
                )}

                <button
                  onClick={() => onNavigate('quote')}
                  className="bg-emerald-800/90 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl text-base border border-emerald-600 shadow-md transition-all flex items-center gap-2"
                >
                  <FileText className="w-5 h-5 text-orange-400" />
                  <span>Request Instant Quotation</span>
                </button>
              </div>

              {/* Direct Location & Hotline */}
              <div className="pt-6 border-t border-emerald-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-emerald-200 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Showroom: Masalacin Idi, Keffi, Nasarawa State</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Sales Hotlines: 07047197737 / 08100809016</span>
                </div>
              </div>
            </div>

            {/* Right Hero Feature Showcase */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative bg-emerald-900/60 rounded-3xl p-4 border border-emerald-700/60 shadow-2xl backdrop-blur-md">
                <ImageWithSkeleton
                  src={riceMillImg}
                  alt="IGAF Heavy Duty Machinery"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  containerClassName="w-full h-80 rounded-2xl overflow-hidden border border-emerald-800 shadow-md"
                  className="object-cover"
                />

                {/* Floating Badge 1 */}
                <div className="absolute -bottom-5 -left-5 bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-emerald-700 flex items-center gap-3">
                  <Award className="w-8 h-8 shrink-0 text-orange-400" />
                  <div>
                    <p className="font-extrabold text-xs uppercase tracking-wider text-orange-400">100% Genuine Quality</p>
                    <p className="text-[11px] text-slate-300">Guaranteed Machinery & Spares</p>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -top-4 -right-4 bg-orange-600 text-white px-4 py-2 rounded-xl shadow-lg border border-orange-400 flex items-center gap-2 text-xs font-extrabold">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span>Ready Stock in Keffi Depot</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK CATEGORY STRIP (10 CATEGORIES) */}
      <FadeInElement className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-orange-600 font-extrabold text-xs uppercase tracking-wider">
                Full Machinery Range
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                Explore Equipment by Agricultural Sector
              </h3>
            </div>
            <button 
              onClick={() => onNavigate('products')}
              className="text-emerald-800 hover:text-orange-600 font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <span>View All 10 Machinery Lines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
            {CATEGORIES.filter(c => c !== 'All Products').map((cat) => (
              <button
                key={cat}
                onClick={() => onNavigate('products', { category: cat })}
                className="bg-slate-50 hover:bg-emerald-950 text-slate-800 hover:text-white p-3 rounded-2xl border border-slate-200 hover:border-emerald-700 text-center transition-all group flex flex-col items-center justify-center space-y-2 shadow-xs hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 group-hover:bg-emerald-800 text-emerald-800 group-hover:text-orange-400 flex items-center justify-center transition-colors">
                  <Tractor className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold leading-tight text-center line-clamp-2">
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </div>
      </FadeInElement>

      {/* COMPANY INTRODUCTION BRIEF */}
      <FadeInElement className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-orange-400 font-bold text-xs uppercase tracking-widest bg-emerald-900 px-3 py-1 rounded-full border border-emerald-700">
                West Africa Agritech Enterprise
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Nasarawa State&apos;s Premier Agricultural Equipment Center
              </h2>
              <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-normal">
                Headquartered at Masalacin Idi, Keffi, <strong className="text-white">IBRAHIMAWA GLOBAL AND FARM (IGAF) LIMITED</strong> is committed to industrializing farming across Nigeria. We engineer, import, assemble, and support commercial food processing machinery, power tillers, diesel engines, and genuine replacement parts for thousands of agribusinesses.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-md"
                >
                  Read Corporate Overview
                </button>
                <a
                  href="tel:07047197737"
                  className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl text-xs border border-emerald-600 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>Call Keffi Showroom</span>
                </a>
              </div>
            </div>

            {/* Right Showroom Snapshot Card */}
            <div className="lg:col-span-4 bg-slate-900/90 p-6 rounded-2xl border border-slate-700/80 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Building2 className="w-5 h-5 text-orange-400" />
                <h3 className="font-extrabold text-white text-sm">Main Showroom & Hub</h3>
              </div>

              <div className="text-xs space-y-2.5 text-slate-300">
                <p><strong className="text-emerald-400">Location:</strong> Masalacin Idi, Keffi, Nasarawa State</p>
                <p><strong className="text-emerald-400">Sales Hotlines:</strong> 07047197737 / 08100809016</p>
                <p><strong className="text-emerald-400">Operating Hours:</strong> Monday – Sunday (7:00 AM – 8:00 PM)</p>
                <p><strong className="text-emerald-400">Coverage:</strong> Wholesale & Retail Delivery Across All 36 States</p>
              </div>

              <a
                href="https://wa.me/2347047197737?text=Hello%20IGAF%20Limited,%20I%20would%20like%20to%20visit%20your%20Keffi%20showroom."
                target="_blank"
                rel="noreferrer"
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Keffi Sales Team</span>
              </a>
            </div>

          </div>
        </div>
      </FadeInElement>

      {/* STATISTICS BAR */}
      <FadeInElement className="bg-slate-900 text-white py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center space-y-2 p-5 bg-slate-800/60 rounded-2xl border border-slate-700/80 hover:border-orange-500/50 transition-all">
                  <div className="w-11 h-11 mx-auto bg-orange-600/20 text-orange-400 rounded-xl flex items-center justify-center border border-orange-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">{stat.value}</h3>
                  <p className="text-xs text-slate-300 font-semibold">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </FadeInElement>

      {/* FEATURED MACHINERY CATALOG WITH TABS & REAL IMAGES */}
      <FadeInElement className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-orange-600 font-extrabold text-xs uppercase tracking-widest">
              Top Machinery Selections
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Featured Agricultural Machinery Range
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Field-tested for high efficiency, fuel economy, low maintenance, and long service lifespan in Nigeria.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {onOpenCompare && comparedProductIds.length > 0 && (
              <button
                onClick={onOpenCompare}
                className="bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Compare ({comparedProductIds.length})</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('products')}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md"
            >
              <span>Browse Full Catalog ({PRODUCTS.length} Lines)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
          {['All Products', 'Rice Mills', 'Grinding Machines', 'Chaff Cutters', 'Garri Processing', 'Power Tillers', 'De-stoners & Cleaners'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTabCategory(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTabCategory === tab
                  ? 'bg-emerald-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tabFilteredProducts.slice(0, 8).map((product) => (
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
      </FadeInElement>

      {/* WHY CHOOSE US */}
      <FadeInElement className="bg-slate-100/80 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-orange-600 font-extrabold text-xs uppercase tracking-widest">
              Why Choose IGAF Limited
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Why Farmers & Processors Choose Our Equipment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We go beyond selling equipment—we provide genuine spares, expert technical setup, and long-term machinery care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/90 space-y-3 hover:border-emerald-600 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </FadeInElement>

      {/* SERVICES WE PROVIDE (VALUE-ADDED SERVICES) */}
      <FadeInElement className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-800/80 space-y-10 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10 border-b border-slate-800 pb-8">
            <div className="space-y-2 max-w-2xl">
              <span className="bg-orange-500/20 text-orange-400 font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-orange-500/30">
                End-to-End Technical Care
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Comprehensive Services We Provide
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At IGAF Limited, buying a machine is just the beginning. We support farm owners, operators, and commercial milling processors with professional training, genuine spares, and on-site engineering support.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 shrink-0 self-start md:self-auto"
            >
              <span>Book Technical Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            
            {/* Service 1 */}
            <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/80 rounded-2xl p-6 space-y-4 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-white group-hover:text-orange-400 transition-colors">
                  Machinery Maintenance & Operator Training
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Practical hands-on instruction for machine operators covering daily engine priming, belt tensioning, sieve replacement, and safety protocols.
                </p>
              </div>

              <ul className="space-y-1.5 pt-3 border-t border-slate-800 text-[11px] text-emerald-300 font-medium">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" /> On-site operator coaching</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" /> Daily maintenance guides</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" /> Engine care & troubleshooting</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/80 rounded-2xl p-6 space-y-4 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-white group-hover:text-emerald-400 transition-colors">
                  100% Genuine Spare Parts Stock
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Off-the-shelf inventory of Changchai & Changfa engine pistons, rubber rollers, manganese blades, sieves, and gears at our Keffi warehouse.
                </p>
              </div>

              <ul className="space-y-1.5 pt-3 border-t border-slate-800 text-[11px] text-emerald-300 font-medium">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> OEM certified replacement parts</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Immediate showroom pickup</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Fast nationwide waybill delivery</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/80 rounded-2xl p-6 space-y-4 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Settings2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-white group-hover:text-orange-400 transition-colors">
                  On-Site Installation & Commissioning
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Certified technical teams travel directly to your farm or milling hub for complete frame assembly, engine mounting, and test processing runs.
                </p>
              </div>

              <ul className="space-y-1.5 pt-3 border-t border-slate-800 text-[11px] text-emerald-300 font-medium">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" /> Complete frame & bed mounting</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" /> Pulley & belt alignment test</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" /> Live trial processing run</li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/80 rounded-2xl p-6 space-y-4 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-white group-hover:text-emerald-400 transition-colors">
                  Dedicated After-Sales & Warranty Care
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Backed by our 12-Month IGAF Warranty guarantee, emergency field technician dispatch, and lifetime phone advisory line.
                </p>
              </div>

              <ul className="space-y-1.5 pt-3 border-t border-slate-800 text-[11px] text-emerald-300 font-medium">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 12-Month IGAF Warranty</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Priority technician hotline</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Free 6-month checkup audit</li>
              </ul>
            </div>

          </div>

        </div>
      </FadeInElement>

      {/* INTERACTIVE TESTIMONIAL CAROUSEL SECTION */}
      <FadeInElement className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialCarousel />
      </FadeInElement>

      {/* CALL TO ACTION BANNER */}
      <FadeInElement className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-600 via-orange-600 to-orange-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Upgrade Your Farm or Milling Operation?
            </h2>
            <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
              Visit our showroom in Masalacin Idi, Keffi, Nasarawa State, or connect with our sales engineers on WhatsApp for instant pricing & advice!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => onNavigate('quote')}
              className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-orange-400" />
              <span>Request Quote Form</span>
            </button>

            <a
              href="https://wa.me/2347047197737?text=Hello%20IGAF%20Limited,%20I%20am%20ready%20to%20order%20machinery."
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-orange-50 text-orange-900 font-bold py-3.5 px-6 rounded-xl text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Keffi Sales</span>
            </a>
          </div>
        </div>
      </FadeInElement>

    </div>
  );
};

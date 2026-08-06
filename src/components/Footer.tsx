import React from 'react';
import { 
  Tractor, 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  ChevronRight, 
  ShieldCheck, 
  Award, 
  Wrench,
  CheckCircle2
} from 'lucide-react';
import { PageRoute } from '../types';
import igafLogo from '../assets/images/igaf-logo.jpg';

interface FooterProps {
  onNavigate: (route: PageRoute, params?: { category?: string }) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const categories = [
    'Grinding Machines',
    'Chaff Cutters',
    'Rice Mills',
    'Hammer Mills',
    'Garri Processing',
    'Water Pumps',
    'Power Tillers',
    'Spare Parts'
  ];

  return (
    <footer className="bg-emerald-950 text-emerald-100 pt-16 pb-8 border-t-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-emerald-800/80 mb-12">
          <div className="flex items-center gap-4 bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/60">
            <div className="w-12 h-12 bg-orange-600/20 text-orange-400 rounded-lg flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Heavy Duty & Durable</h4>
              <p className="text-xs text-emerald-300">Built to withstand tough farming environments in Nigeria.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/60">
            <div className="w-12 h-12 bg-orange-600/20 text-orange-400 rounded-lg flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">100% Genuine Spare Parts</h4>
              <p className="text-xs text-emerald-300">Full stock of original engine parts & wear accessories.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/60">
            <div className="w-12 h-12 bg-orange-600/20 text-orange-400 rounded-lg flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Expert Technical Support</h4>
              <p className="text-xs text-emerald-300">On-site setup guidance, maintenance & operator training.</p>
            </div>
          </div>
        </div>

        {/* Footer Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-800/80">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={igafLogo} 
                alt="IGAF Limited Logo" 
                className="h-12 w-auto object-contain rounded-lg shadow-md bg-white/10 p-1 border border-emerald-700/50"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-extrabold text-xl text-white">IGAF <span className="text-orange-400">Limited</span></span>
                <p className="text-[10px] text-emerald-300 uppercase tracking-widest font-semibold">Agricultural Machinery</p>
              </div>
            </div>

            <p className="text-xs text-emerald-200/90 leading-relaxed">
              <strong className="text-white">IBRAHIMAWA GLOBAL AND FARM (IGAF) LIMITED</strong> is Nasarawa State&apos;s leading supplier of high-performance agricultural machinery, food processing equipment, water pumps, and genuine spare parts.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/2347047197737?text=Hello%20IGAF%20Limited,%20I%20want%20to%20inquire%20about%20your%20machinery."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all border border-emerald-700"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base border-b border-emerald-800 pb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>Quick Navigation</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home Page', route: 'home' },
                { label: 'About Company', route: 'about' },
                { label: 'Machinery Catalog', route: 'products' },
                { label: 'Showroom Gallery', route: 'gallery' },
                { label: 'Request Official Quote', route: 'quote' },
                { label: 'Contact Us', route: 'contact' },
              ].map((item) => (
                <li key={item.route}>
                  <button
                    onClick={() => {
                      onNavigate(item.route as PageRoute);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-orange-400 transition-colors flex items-center gap-1.5 text-emerald-200/90"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Machinery Products */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base border-b border-emerald-800 pb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>Product Range</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onNavigate('products', { category: cat });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-orange-400 transition-colors flex items-center gap-1.5 text-emerald-200/90 text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{cat}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base border-b border-emerald-800 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Store Location</span>
            </h3>

            <div className="space-y-3 text-xs text-emerald-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Main Showroom & Office:</p>
                  <p>Masalacin Idi, Keffi, Nasarawa State, Nigeria</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Phone Lines:</p>
                  <p className="space-x-2">
                    <a href="tel:07047197737" className="hover:text-orange-300 underline font-medium">07047197737</a>
                    <span>/</span>
                    <a href="tel:08100809016" className="hover:text-orange-300 underline font-medium">08100809016</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Opening Hours:</p>
                  <p>Monday – Sunday: 7:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Name Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400 text-center sm:text-left">
          <div>
            <p className="font-medium text-emerald-200">
              &copy; {new Date().getFullYear()} <strong className="text-white">IBRAHIMAWA GLOBAL AND FARM (IGAF) LIMITED</strong>. All Rights Reserved.
            </p>
            <p className="text-[11px] text-emerald-400/80 mt-0.5">
              Masalacin Idi, Keffi, Nasarawa State, Nigeria &bull; RC Certified Agricultural Machinery Supplier
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-emerald-300">
            <button onClick={() => onNavigate('about')} className="hover:text-orange-300 transition-colors">
              About Us
            </button>
            <span>&bull;</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-orange-300 transition-colors">
              Contact Store
            </button>
            <span>&bull;</span>
            <button onClick={() => onNavigate('quote')} className="hover:text-orange-300 transition-colors">
              Request Quote
            </button>
            {onOpenAdmin && (
              <button 
                onClick={onOpenAdmin} 
                className="opacity-20 hover:opacity-100 transition-opacity p-1 text-emerald-500 hover:text-orange-400"
                title="Admin Control Panel"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};

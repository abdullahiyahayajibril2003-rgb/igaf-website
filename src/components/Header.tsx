import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  Menu, 
  X, 
  MessageCircle, 
  ChevronRight,
  FileText,
  Tractor,
  SlidersHorizontal,
  Lock
} from 'lucide-react';
import { PageRoute, CompanyInfo } from '../types';
import igafLogo from '../assets/images/igaf-logo.jpg';

interface HeaderProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute, params?: { productId?: string; category?: string }) => void;
  onOpenSearch: () => void;
  comparedCount?: number;
  onOpenCompare?: () => void;
  onOpenAdmin?: () => void;
  companyInfo?: CompanyInfo;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeRoute, 
  onNavigate, 
  onOpenSearch,
  comparedCount = 0,
  onOpenCompare,
  onOpenAdmin,
  companyInfo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  // Secret Keyboard Shortcut: Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (onOpenAdmin) onOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenAdmin]);

  // Secret Triple-Click on Logo
  const handleLogoClick = () => {
    setLogoClickCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= 3) {
        if (onOpenAdmin) onOpenAdmin();
        return 0;
      }
      return nextCount;
    });

    setTimeout(() => {
      setLogoClickCount(0);
    }, 2000);

    handleNav('home');
  };

  const phoneDisplay = companyInfo?.phonePrimary || '07047197737';
  const announcementText = companyInfo?.announcement || "🇳🇬 West Africa's #1 Agricultural Machinery & Spare Parts Center • Fast Waybill Delivery Nationwide";
  const showAnnouncementBar = companyInfo ? companyInfo.showAnnouncement : true;

  const navItems: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About Us', route: 'about' },
    { label: 'Products', route: 'products' },
    { label: 'Gallery', route: 'gallery' },
    { label: 'Request Quote', route: 'quote' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-emerald-900/10">
      
      {/* Ticker / Announcement Bar */}
      {showAnnouncementBar && (
        <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800/80">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            
            <div className="flex items-center gap-2 text-emerald-200 min-w-0">
              <span className="bg-orange-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow shrink-0">
                Keffi Depot
              </span>
              <span className="truncate font-medium">
                {announcementText}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden md:flex items-center gap-1.5 text-emerald-300">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>{companyInfo?.address || 'Masalacin Idi'}, {companyInfo?.city || 'Keffi'}</span>
              </span>

              <span className="text-emerald-700 hidden md:inline">|</span>

              <a 
                href={`tel:${phoneDisplay}`}
                className="flex items-center gap-1.5 hover:text-orange-300 transition-colors font-bold text-white"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>{phoneDisplay}</span>
              </a>

              <a 
                href={`https://wa.me/234${phoneDisplay.replace(/^0/, '')}?text=Hello%20IGAF%20Limited,%20I%20am%20interested%20in%20your%20agricultural%20machinery.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-0.5 rounded text-xs font-bold transition-colors shadow"
              >
                <MessageCircle className="w-3 h-3 text-emerald-200" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Company Logo / Brand Name - Secret Triple Click for Admin */}
        <button 
          onClick={handleLogoClick}
          className="flex items-center gap-3 group text-left focus:outline-none"
          title="IGAF Limited - Agricultural Machinery"
        >
          <img 
            src={igafLogo} 
            alt="IGAF Limited Logo" 
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-12 w-auto object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-emerald-950 font-sans">
                IGAF <span className="text-orange-600">Limited</span>
              </span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-800 tracking-wider uppercase -mt-0.5">
              Agricultural Machinery Supplier
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`px-3.5 py-2 rounded-lg font-bold text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-slate-700 hover:text-emerald-900 hover:bg-emerald-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Compare Trigger */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenCompare && (
            <button
              onClick={onOpenCompare}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-extrabold transition-all border ${
                comparedCount > 0
                  ? 'bg-orange-600 text-white border-orange-500 shadow-md animate-pulse'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
              title="Compare Machines Side-by-Side"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Compare</span>
              {comparedCount > 0 && (
                <span className="bg-white text-orange-600 font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {comparedCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-lg text-slate-600 hover:text-emerald-900 hover:bg-slate-100 transition-colors"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleNav('quote')}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Request Quote</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          {onOpenCompare && comparedCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="bg-orange-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>({comparedCount})</span>
            </button>
          )}

          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-700 hover:text-emerald-900"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-800 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-900" /> : <Menu className="w-6 h-6 text-emerald-900" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950 text-white border-t border-emerald-800 animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-between ${
                  activeRoute === item.route
                    ? 'bg-orange-600 text-white'
                    : 'text-emerald-100 hover:bg-emerald-900'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            ))}

            <div className="pt-4 border-t border-emerald-800 flex flex-col gap-2">
              <button
                onClick={() => handleNav('quote')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold text-center flex items-center justify-center gap-2 shadow-md"
              >
                <FileText className="w-5 h-5" />
                <span>Request Official Quote</span>
              </button>

              <div className="flex items-center justify-between text-xs text-emerald-300 pt-2 px-1">
                <span>Phone: 07047197737</span>
                <span>Masalacin Idi, Keffi</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

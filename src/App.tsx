import React, { useState, useEffect } from 'react';
import { PageRoute, Product, CompanyInfo } from './types';
import { PRODUCTS } from './data/products';
import { getCompanyInfo } from './data/company';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SearchModal } from './components/SearchModal';
import { BackToTopButton } from './components/BackToTopButton';
import { MachineComparisonModal } from './components/MachineComparisonModal';
import { AdminModal } from './components/AdminModal';
import { LoadingSpinner } from './components/LoadingSpinner';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProductsView } from './views/ProductsView';
import { ProductDetailView } from './views/ProductDetailView';
import { GalleryView } from './views/GalleryView';
import { RequestQuoteView } from './views/RequestQuoteView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All Products');
  const [quoteProductSlug, setQuoteProductSlug] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Loading States
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isRouteLoading, setIsRouteLoading] = useState<boolean>(false);

  // Admin & Company Info State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(getCompanyInfo());

  // Comparison State
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Initial Loading Simulation & Secret Hash Detection
  useEffect(() => {
    if (window.location.hash === '#admin' || window.location.hash === '#igaf-admin' || window.location.hash === '#login') {
      setIsAdminModalOpen(true);
    }

    setIsInitialLoading(false);
  }, []);

  const handleNavigate = (
    route: PageRoute, 
    params?: { productId?: string; category?: string; productSlug?: string }
  ) => {
    setActiveRoute(route);

    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    if (params?.category) {
      setSelectedCategoryFilter(params.category);
    } else if (route === 'products' && !params?.category) {
      setSelectedCategoryFilter('All Products');
    }
    if (params?.productSlug) {
      setQuoteProductSlug(params.productSlug);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveRoute('product-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleToggleCompare = (product: Product) => {
    setComparedProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter(id => id !== product.id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare up to 3 machines at a time.');
          return prev;
        }
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setComparedProductIds((prev) => prev.filter(id => id !== productId));
  };

  const comparedProducts = PRODUCTS.filter(p => comparedProductIds.includes(p.id));
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  if (isInitialLoading) {
    return <LoadingSpinner fullScreen message="Loading IGAF Machinery & Equipment Catalog..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Sticky Top Header */}
      <Header
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
        comparedCount={comparedProductIds.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        companyInfo={companyInfo}
      />

      {/* Main Page View Area with Route Transition Loader */}
      <main className="flex-1 animate-fadeIn relative">
        {isRouteLoading ? (
          <LoadingSpinner message={`Loading ${activeRoute.toUpperCase()} View...`} />
        ) : (
          <>
            {activeRoute === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
                onToggleCompare={handleToggleCompare}
                comparedProductIds={comparedProductIds}
                onOpenCompare={() => setIsCompareModalOpen(true)}
              />
            )}

            {activeRoute === 'about' && (
              <AboutView
                onNavigate={handleNavigate}
              />
            )}

            {activeRoute === 'products' && (
              <ProductsView
                initialCategory={selectedCategoryFilter}
                onSelectProduct={handleSelectProduct}
                onNavigate={handleNavigate}
                onToggleCompare={handleToggleCompare}
                comparedProductIds={comparedProductIds}
                onOpenCompare={() => setIsCompareModalOpen(true)}
              />
            )}

            {activeRoute === 'product-detail' && (
              <ProductDetailView
                product={selectedProduct}
                onBack={() => setActiveRoute('products')}
                onSelectProduct={handleSelectProduct}
                onNavigate={handleNavigate}
              />
            )}

            {activeRoute === 'gallery' && (
              <GalleryView />
            )}

            {activeRoute === 'quote' && (
              <RequestQuoteView
                initialProductSlug={quoteProductSlug}
                onNavigate={handleNavigate}
              />
            )}

            {activeRoute === 'contact' && (
              <ContactView
                onNavigate={handleNavigate}
              />
            )}
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer 
        onNavigate={handleNavigate} 
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Back to Top Scroll Button */}
      <BackToTopButton />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onNavigate={handleNavigate}
      />

      {/* Machine Comparison Modal */}
      <MachineComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        comparedProducts={comparedProducts}
        onRemoveProduct={handleRemoveFromCompare}
        onRequestQuote={(slug) => handleNavigate('quote', { productSlug: slug })}
      />

      {/* Secure Admin Portal Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onInfoUpdated={(newInfo) => setCompanyInfo(newInfo)}
      />

    </div>
  );
}

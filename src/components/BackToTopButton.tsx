import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 flex items-center"
        >
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to Top"
            className="group relative bg-emerald-950 hover:bg-orange-600 text-white p-3.5 rounded-full shadow-2xl border border-emerald-700 hover:border-orange-500 transition-all duration-300 active:scale-90 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <ArrowUp className="w-5 h-5 text-orange-400 group-hover:text-white transition-colors group-hover:-translate-y-0.5 duration-200" />
            
            {/* Hover Tooltip */}
            <span className="absolute right-full mr-3 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-slate-700">
              Back to top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

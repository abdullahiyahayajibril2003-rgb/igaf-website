import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  CheckCircle2, 
  Tractor, 
  MapPin, 
  Pause, 
  Play, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { CustomerReview } from '../types';
import { REVIEWS } from '../data/reviews';

interface TestimonialCarouselProps {
  onSelectProductSlug?: (slug: string) => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<number>(1); // 1 for right, -1 for left

  const total = REVIEWS.length;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, total]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const currentReview = REVIEWS[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div 
      className="relative bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-emerald-800/50 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Decorative Accent Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      {/* Header Badge & Controls */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-900/80 text-orange-400 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-700/60 mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Farmers & Processors Across Nigeria
          </h2>
          <p className="text-emerald-200/80 text-xs sm:text-sm mt-1 max-w-xl">
            Real feedback from commercial agro-processors and farm owners using genuine IGAF machinery in Nasarawa, Abuja, Benue, and nationwide.
          </p>
        </div>

        {/* Carousel Control Buttons */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            title={isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"}
            className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-emerald-300 flex items-center justify-center transition-all"
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 pl-0.5" />}
          </button>

          <button
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="w-11 h-11 rounded-full bg-emerald-900/90 hover:bg-orange-600 text-white border border-emerald-700 hover:border-orange-500 flex items-center justify-center shadow-lg transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="w-11 h-11 rounded-full bg-emerald-900/90 hover:bg-orange-600 text-white border border-emerald-700 hover:border-orange-500 flex items-center justify-center shadow-lg transition-all active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="relative z-10 min-h-[320px] sm:min-h-[280px] flex items-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentReview.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-emerald-800/60 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Left Side: Reviewer Profile & Machine Tag */}
            <div className="lg:col-span-5 space-y-4 lg:border-r border-emerald-900/80 lg:pr-6">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={currentReview.avatarUrl}
                    alt={currentReview.name}
                    loading="eager"
                    decoding="async"
                    className="w-16 h-16 rounded-full object-cover border-2 border-orange-500 shadow-md bg-emerald-900"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full text-xs shadow" title="Verified Nigerian Buyer">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white leading-tight">{currentReview.name}</h3>
                  <p className="text-xs text-orange-400 font-semibold">{currentReview.role}</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{currentReview.location}</span>
                  </div>
                </div>
              </div>

              {/* Machine Purchased Card with Local Image Preview */}
              <div className="bg-emerald-950/90 p-3 rounded-2xl border border-emerald-800/80 flex items-center gap-3">
                {currentReview.machineImage && (
                  <img
                    src={currentReview.machineImage}
                    alt={currentReview.machinePurchased}
                    loading="eager"
                    decoding="async"
                    className="w-14 h-14 rounded-xl object-cover border border-emerald-700/80 shrink-0 shadow-sm"
                  />
                )}
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Tractor className="w-3 h-3 text-orange-400 shrink-0" />
                    <span>Verified Machine</span>
                  </span>
                  <p className="text-xs font-bold text-emerald-200 truncate">
                    {currentReview.machinePurchased}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-300">5.0 / 5.0 Rating</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/60">
                  100% Offline Ready
                </span>
              </div>
            </div>

            {/* Right Side: Quote Content & Action */}
            <div className="lg:col-span-7 space-y-4 relative flex flex-col justify-between">
              <Quote className="absolute -top-3 -left-2 w-12 h-12 text-emerald-800/30 pointer-events-none" />
              
              <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed relative z-10 font-normal pt-2">
                "{currentReview.comment}"
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
                <span className="text-xs text-slate-400 font-medium">
                  Verified Local Buyer • {currentReview.date}
                </span>

                <a
                  href={`https://wa.me/2347047197737?text=Hello%20IGAF%20Limited,%20I%20saw%20the%20testimonial%20from%20${encodeURIComponent(currentReview.name)}%20about%20${encodeURIComponent(currentReview.machinePurchased)}%20and%20I%20would%20like%20to%20inquire.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-orange-500/20"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Inquire About This Equipment</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Thumbnails & Pagination Indicators */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-emerald-900/60">
        
        {/* Thumbnail Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 scrollbar-none">
          {REVIEWS.map((rev, idx) => (
            <button
              key={rev.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                idx === currentIndex
                  ? 'bg-orange-600 text-white border-orange-500 shadow-md'
                  : 'bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <img
                src={rev.avatarUrl}
                alt={rev.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="truncate max-w-[100px]">{rev.name.split(' ')[1] || rev.name}</span>
            </button>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-8 bg-orange-500'
                  : 'w-2 bg-emerald-800 hover:bg-emerald-700'
              }`}
            />
          ))}
        </div>

      </div>

    </div>
  );
};

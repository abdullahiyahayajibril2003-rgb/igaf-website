import React from 'react';
import { Tractor, Cog, Loader2, Sparkles } from 'lucide-react';
import igafLogo from '../assets/images/igaf-logo.jpg';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  fullScreen = false, 
  message = 'Loading IGAF Machinery Catalog...' 
}) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900 flex flex-col items-center justify-center p-6 text-white animate-fadeIn">
        
        {/* Glow backdrop effect */}
        <div className="absolute w-72 h-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="absolute w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm">
          
          {/* Logo & Animated Gear/Spinner */}
          <div className="relative flex items-center justify-center">
            {/* Outer Spinning Ring */}
            <div className="w-28 h-28 rounded-full border-4 border-emerald-800/40 border-t-orange-500 border-r-emerald-400 animate-spin" />
            
            {/* Center Logo Box */}
            <div className="absolute w-20 h-20 rounded-2xl bg-white p-2.5 shadow-2xl flex items-center justify-center border-2 border-emerald-500/30">
              <img 
                src={igafLogo} 
                alt="IGAF Logo" 
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Floating Cog */}
            <div className="absolute -bottom-1 -right-1 bg-orange-600 text-white p-1.5 rounded-lg shadow-lg animate-spin" style={{ animationDuration: '6s' }}>
              <Cog className="w-4 h-4" />
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white tracking-wide flex items-center justify-center gap-2">
              <Tractor className="w-5 h-5 text-orange-400 animate-bounce" />
              <span>IGAF LIMITED</span>
            </h2>
            <p className="text-xs text-emerald-300/80 font-medium tracking-wider uppercase">
              Agricultural Machinery & Spare Parts
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="w-full space-y-2">
            <div className="w-full bg-emerald-900/60 h-1.5 rounded-full overflow-hidden border border-emerald-800/80">
              <div className="bg-gradient-to-r from-orange-500 via-emerald-400 to-orange-400 h-full rounded-full animate-pulse w-full transition-all duration-300" />
            </div>
            <p className="text-[11px] font-semibold text-emerald-200/90 flex items-center justify-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-400" />
              <span>{message}</span>
            </p>
          </div>

        </div>

      </div>
    );
  }

  // Inline / Overlay Spinner for View Transitions
  return (
    <div className="py-16 flex flex-col items-center justify-center space-y-3 text-slate-600 animate-fadeIn min-h-[300px]">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-3 border-emerald-200 border-t-emerald-800 animate-spin" />
        <Tractor className="w-5 h-5 text-orange-600 absolute" />
      </div>
      <p className="text-xs font-extrabold text-emerald-900 tracking-wide flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
        <span>{message}</span>
      </p>
    </div>
  );
};

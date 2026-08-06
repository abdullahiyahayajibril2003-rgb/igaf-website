import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Quick Action Popover */}
      {expanded && (
        <div className="bg-white rounded-2xl shadow-2xl border border-emerald-900/10 p-4 w-72 sm:w-80 animate-scaleUp text-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                IGAF
              </div>
              <div>
                <h4 className="font-bold text-sm text-emerald-950">IGAF Sales Support</h4>
                <p className="text-[10px] text-emerald-600 font-medium">Masalacin Idi, Keffi Store</p>
              </div>
            </div>
            <button 
              onClick={() => setExpanded(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Need urgent machinery pricing, technical advice, or spare parts inquiry? Talk directly with our team!
          </p>

          <div className="space-y-2 pt-1">
            <a
              href="https://wa.me/2347047197737?text=Hello%20IGAF%20Limited,%20I%20am%20interested%20in%20purchasing%20machinery."
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 07047197737</span>
            </a>

            <a
              href="https://wa.me/2348100809016?text=Hello%20IGAF%20Limited,%20I%20need%20a%20quote%20for%20machinery."
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 08100809016</span>
            </a>

            <a
              href="tel:07047197737"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Direct: 07047197737</span>
            </a>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20"
        title="Chat with IGAF Machinery Specialist"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600 animate-pulse" />
        <span className="hidden sm:inline font-bold text-sm tracking-wide">
          Quick Inquire
        </span>
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import riceMillImg from '../assets/images/rice-mill.jpg';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// Keffi, Nasarawa State, Nigeria coordinates
const STORE_LOCATION = { lat: 8.8471, lng: 7.8732 };

export const StoreMap: React.FC = () => {
  const [infoOpen, setInfoOpen] = useState(true);

  if (!hasValidKey) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Interactive Showroom Location Map</h3>
              <p className="text-[11px] text-slate-400">Masalacin Idi, Keffi, Nasarawa State</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-orange-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
            Keffi Store
          </span>
        </div>

        {/* Embedded Map Visual Card */}
        <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col justify-between p-5">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 filter contrast-125"
            style={{ backgroundImage: `url(${riceMillImg})` }}
          />
          <div className="relative z-10 flex justify-between items-start">
            <span className="bg-emerald-900/90 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-700/60 backdrop-blur-sm">
              📍 IGAF Showroom & Workshop
            </span>
            <a
              href="https://maps.google.com/?q=Masalacin+Idi,+Keffi,+Nasarawa+State,+Nigeria"
              target="_blank"
              rel="noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow transition-all"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="relative z-10 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-lg animate-bounce">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-xs">IBRAHIMAWA GLOBAL AND FARM (IGAF) LIMITED</h4>
                <p className="text-[11px] text-slate-300">Masalacin Idi, Keffi, Nasarawa State, Nigeria</p>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-orange-400 font-medium">
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> 07047197737</span>
                  <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> Showroom & Processing Hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-800/50 rounded-xl p-3.5 text-xs text-emerald-200 space-y-1">
          <p className="font-semibold text-emerald-300 text-xs">💡 Google Maps Platform Key Integration Active</p>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            To view the full live interactive tile map, add <code className="bg-slate-800 text-orange-300 px-1.5 py-0.5 rounded text-[10px]">GOOGLE_MAPS_PLATFORM_KEY</code> under <strong>Settings</strong> → <strong>Secrets</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 space-y-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Showroom Location Map</h3>
            <p className="text-xs text-slate-500">Masalacin Idi, Keffi, Nasarawa State</p>
          </div>
        </div>
        <a
          href="https://maps.google.com/?q=Masalacin+Idi,+Keffi,+Nasarawa+State,+Nigeria"
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
        >
          <span>Get Directions</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="h-[380px] w-full rounded-2xl overflow-hidden border border-slate-200 relative shadow-inner">
        <APIProvider apiKey={API_KEY} version="weekly">
          <Map
            defaultCenter={STORE_LOCATION}
            defaultZoom={14}
            mapId="DEMO_MAP_ID"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
          >
            <AdvancedMarker
              position={STORE_LOCATION}
              onClick={() => setInfoOpen(prev => !prev)}
              title="IGAF Limited - Masalacin Idi, Keffi"
            >
              <Pin background="#ea580c" glyphColor="#ffffff" borderColor="#9a3412" />
            </AdvancedMarker>

            {infoOpen && (
              <InfoWindow
                position={STORE_LOCATION}
                onCloseClick={() => setInfoOpen(false)}
              >
                <div className="p-1 space-y-1 max-w-xs text-slate-900 font-sans">
                  <div className="font-extrabold text-xs text-emerald-950">IGAF Limited Showroom</div>
                  <div className="text-[11px] text-slate-600">Masalacin Idi, Keffi, Nasarawa State</div>
                  <div className="text-[10px] text-orange-600 font-bold">Phone: 07047197737 / 08100809016</div>
                  <div className="text-[10px] text-slate-500">Hours: Mon-Sun 7:00 AM – 8:00 PM</div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

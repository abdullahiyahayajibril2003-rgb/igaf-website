import React from 'react';
import { 
  Building2, 
  Target, 
  Compass, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Phone, 
  Clock, 
  Wrench, 
  Tractor,
  Award,
  CheckCircle2,
  Headphones,
  Cog,
  Truck
} from 'lucide-react';
import { PageRoute } from '../types';
import igafLogo from '../assets/images/igaf-logo.jpg';
import powerTillerImg from '../assets/images/power-tiller.jpg';
import { ImageWithSkeleton } from '../components/ImageWithSkeleton';

interface AboutViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* PAGE HEADER HERO */}
      <section className="bg-emerald-950 text-white py-16 border-b-4 border-orange-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center flex flex-col items-center">
          <img 
            src={igafLogo} 
            alt="IGAF Limited Logo" 
            className="h-20 w-auto object-contain rounded-2xl shadow-xl bg-white/10 p-2 border border-emerald-700/80 mb-2"
            referrerPolicy="no-referrer"
          />
          <span className="bg-emerald-900 text-orange-400 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-700">
            About Our Company
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            IBRAHIMAWA GLOBAL AND FARM (IGAF) LIMITED
          </h1>
          <p className="text-emerald-200 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Nigeria&apos;s reliable partner in heavy-duty agricultural equipment, food processing plants, irrigation water pumps, and genuine diesel engine spare parts.
          </p>
        </div>
      </section>

      {/* CORE COMPANY OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Leading Agricultural Machinery Supplier in Nasarawa State
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>IBRAHIMAWA GLOBAL AND FARM (IGAF) LIMITED</strong> was founded with a singular purpose: to bridge the gap in access to high-quality, durable, and affordable agricultural machinery across Nasarawa State and Northern Nigeria.
              </p>
              <p>
                Headquartered at Masalacin Idi, Keffi, we specialize in supplying top-tier equipment engineered specifically for African agricultural conditions. Whether you operate a small family farm or manage a large-scale commercial rice milling cooperative, our catalog includes heavy-duty grinding machines, commercial rice mills, motorized chaff cutters, hammer mills, garri processing lines, irrigation water pumps, diesel power tillers, and a comprehensive inventory of 100% genuine spare parts.
              </p>
              <p>
                We take immense pride in offering complete end-to-end support—from machinery selection and transparent factory pricing to on-site assembly, operator safety training, and long-term maintenance support.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-emerald-900 text-sm">Physical Showroom</h4>
                <p className="text-xs text-slate-600 mt-0.5">Masalacin Idi, Keffi, Nasarawa State</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-emerald-900 text-sm">Customer Helpline</h4>
                <p className="text-xs text-slate-600 mt-0.5">07047197737 / 08100809016</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-emerald-900">
              <ImageWithSkeleton
                src={powerTillerImg}
                alt="IGAF Machinery Showroom"
                loading="lazy"
                decoding="async"
                containerClassName="w-full h-96"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase text-orange-400 font-extrabold">SHOWROOM & WAREHOUSE</span>
                <h3 className="font-extrabold text-lg">Masalacin Idi, Keffi Hub</h3>
                <p className="text-xs text-emerald-200">Open Monday – Sunday: 7:00 AM – 8:00 PM</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-xl">Our Corporate Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To equip Nigerian farmers, cooperatives, and agro-processors with heavy-duty, fuel-efficient machinery and genuine spare parts, driving food security, post-harvest efficiency, and rural economic growth across Nasarawa State and Nigeria.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-xl">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To become West Africa&apos;s most trusted brand for agricultural mechanization and food processing machinery, recognized for uncompromised machinery quality, authentic spare parts availability, and stellar technical service.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">
            The IGAF Standard
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Our Core Pillars of Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Uncompromised Quality',
              desc: 'Every machine supplied undergoes strict torque, engine efficiency, and build quality inspection.',
              icon: ShieldCheck
            },
            {
              title: '100% Genuine Spares',
              desc: 'We never compromise on replacement parts. We stock genuine diesel parts, rollers, and blades.',
              icon: Wrench
            },
            {
              title: 'Farmer Centric',
              desc: 'We offer flexible payment terms, wholesale discounts for cooperatives, and direct factory rates.',
              icon: Users
            },
            {
              title: 'On-Ground Support',
              desc: 'Our technical team in Keffi provides instant assistance, routine servicing, and field repair dispatch.',
              icon: Award
            }
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                <div className="w-10 h-10 bg-emerald-800 text-orange-400 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">{val.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICE HIGHLIGHTS */}
      <section className="bg-gradient-to-b from-slate-50 to-emerald-50/50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-orange-100 text-orange-700 font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-orange-200">
              Service Highlights
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Post-Sale Support, Installation & Maintenance
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Purchasing machinery from IGAF Limited comes with guaranteed long-term technical backing. Our certified engineers ensure your equipment operates efficiently with minimal downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service Highlight 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center">
                  <Cog className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-xl">
                  On-Site Installation & Setup
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We handle complete physical installation, engine calibration, and alignment for rice mills, garri processing units, and diesel generators across Nasarawa State.
                </p>
                <ul className="space-y-2 pt-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Foundation alignment & vibration damping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Engine oil, belt tension & safety shield checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Live test runs with actual grain/cassava batch</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Turnkey Setup Included</span>
              </div>
            </div>

            {/* Service Highlight 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                  <Truck className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-xl">
                  Maintenance & Mobile Repairs
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Prevent unexpected breakdowns during peak harvesting seasons with our routine maintenance plans and emergency technician dispatch service.
                </p>
                <ul className="space-y-2 pt-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>Mobile mechanic dispatch directly to your farm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>Scheduled engine overhaul & filter replacements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>Instant access to 100% original OEM replacement parts</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">Fast Field Response</span>
              </div>
            </div>

            {/* Service Highlight 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center">
                  <Headphones className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-xl">
                  Dedicated Post-Sale Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our technical team in Keffi provides ongoing operator training, direct telephone helpline support, and warranty troubleshooting for maximum machine longevity.
                </p>
                <ul className="space-y-2 pt-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Hands-on operator safety & maintenance training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct phone & WhatsApp technical consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Factory warranty coverage on all new equipment</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Lifetime Technical Care</span>
              </div>
            </div>

          </div>

          {/* Quick Helpline banner */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-950 text-orange-400 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Need Service or Repair Assistance?</h4>
                <p className="text-xs text-slate-600">Speak directly with an IGAF technician at our Keffi Workshop.</p>
              </div>
            </div>
            <a 
              href="tel:07047197737" 
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shrink-0 transition-colors flex items-center gap-2"
            >
              <span>Call Technician: 07047197737</span>
            </a>
          </div>

        </div>
      </section>

      {/* VISIT SHOWROOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">VISIT OUR KEFFI SHOWROOM</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Inspect Our Machinery Range Live
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed max-w-xl">
              We welcome farm managers, machine dealers, and cooperative leaders to visit our showroom in Masalacin Idi, Keffi, Nasarawa State to test-run machines before purchasing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Showroom Directions</span>
            </button>

            <button
              onClick={() => onNavigate('quote')}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs border border-emerald-600 transition-colors"
            >
              Request Price Quote
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

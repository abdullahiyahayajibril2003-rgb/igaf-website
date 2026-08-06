import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Tractor,
  Building2,
  Share2
} from 'lucide-react';
import { PageRoute } from '../types';
import { StoreMap } from '../components/StoreMap';

interface ContactViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Machinery Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* PAGE HERO */}
      <section className="bg-emerald-950 text-white py-12 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="bg-emerald-900 text-orange-400 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-700">
            Contact & Showroom Location
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Get in Touch with IGAF Limited
          </h1>
          <p className="text-emerald-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Visit our showroom in Masalacin Idi, Keffi, or contact our sales and technical team for instant machinery support.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div>
                <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
                  Main Showroom & Office
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  IBRAHIMAWA GLOBAL AND FARM (IGAF) LIMITED
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Physical Address</h4>
                    <p className="text-slate-600 mt-0.5">Masalacin Idi, Keffi, Nasarawa State, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Phone Lines</h4>
                    <p className="text-slate-600 mt-0.5 font-medium space-x-2">
                      <a href="tel:07047197737" className="hover:text-orange-600 underline">07047197737</a>
                      <span>/</span>
                      <a href="tel:08100809016" className="hover:text-orange-600 underline">08100809016</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Address</h4>
                    <p className="text-slate-600 mt-0.5">ibrahimawaglobal@gmail.com / info@igaf.com.ng</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Business Hours</h4>
                    <p className="text-slate-600 mt-0.5">Monday – Sunday: 7:00 AM – 8:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <a
                  href="https://wa.me/2347047197737?text=Hello%20IGAF%20Limited,%20I%20would%20like%20to%20visit%20your%20Keffi%20showroom."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (07047197737)</span>
                </a>

                <a
                  href="https://wa.me/2348100809016?text=Hello%20IGAF%20Limited,%20I%20have%20a%20machinery%20inquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (08100809016)</span>
                </a>
              </div>

            </div>

            {/* GOOGLE MAPS STORE SHOWROOM LOCATION */}
            <StoreMap />

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 space-y-6">
            
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Send Us a Direct Message
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Have questions about custom machines, spare parts availability, or machine delivery? Send us a message below.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                <h3 className="font-bold text-slate-900 text-lg">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formState.name}</strong>. Our team in Masalacin Idi, Keffi has received your inquiry and will call or message you promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', phone: '', email: '', subject: 'Machinery Inquiry', message: '' });
                  }}
                  className="bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Stephen Bako"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="e.g. 07047197737"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. name@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Topic</label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="Machinery Inquiry">Machinery Purchase Inquiry</option>
                      <option value="Spare Parts Request">Genuine Spare Parts Request</option>
                      <option value="Technical Support">Technical Servicing & Repairs</option>
                      <option value="Showroom Visit">Showroom Visit Appointment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write your detailed request or questions here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>

              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};

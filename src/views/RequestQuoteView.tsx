import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Send, 
  MessageCircle, 
  Phone, 
  Tractor, 
  ShieldCheck, 
  Building2,
  Clock,
  Printer
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { QuoteFormData, PageRoute } from '../types';
import { addQuoteRequest } from '../data/quotesAndUsers';

interface RequestQuoteViewProps {
  initialProductSlug?: string;
  onNavigate: (route: PageRoute) => void;
}

export const RequestQuoteView: React.FC<RequestQuoteViewProps> = ({
  initialProductSlug,
  onNavigate,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    companyName: '',
    phoneNumber: '',
    email: '',
    productSlug: initialProductSlug || PRODUCTS[0]?.slug || '',
    quantity: 1,
    state: 'Nasarawa State',
    deliveryOption: 'Pickup at Keffi Store',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [quoteRef, setQuoteRef] = useState('');

  useEffect(() => {
    if (initialProductSlug) {
      setFormData((prev) => ({ ...prev, productSlug: initialProductSlug }));
    }
  }, [initialProductSlug]);

  const selectedProduct = PRODUCTS.find((p) => p.slug === formData.productSlug) || PRODUCTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `IGAF-QT-2026-${randomNum}`;
    setQuoteRef(ref);

    // Save Quote Request to Admin Store
    try {
      addQuoteRequest({
        refCode: ref,
        fullName: formData.fullName,
        companyName: formData.companyName || 'Private Farm/Business',
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        productName: selectedProduct.name,
        productSlug: selectedProduct.slug,
        quantity: formData.quantity,
        state: formData.state,
        deliveryOption: formData.deliveryOption,
        message: formData.message,
      });
    } catch (err) {
      console.error('Failed to log quote request', err);
    }

    setSubmitted(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello IGAF Limited,\n\nI have generated an official quote request:\n*Quote Ref:* ${quoteRef}\n*Name:* ${formData.fullName}\n*Company/Farm:* ${formData.companyName || 'N/A'}\n*Phone:* ${formData.phoneNumber}\n*Machine:* ${selectedProduct.name}\n*Quantity:* ${formData.quantity}\n*State:* ${formData.state}\n*Delivery:* ${formData.deliveryOption}\n*Message:* ${formData.message || 'None'}\n\nPlease provide your best pricing and availability.`
  );

  return (
    <div className="space-y-12 pb-16">
      
      {/* PAGE HEADER HERO */}
      <section className="bg-emerald-950 text-white py-12 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="bg-emerald-900 text-orange-400 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-700">
            Official Quotation Generator
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Request Machinery Price Quote
          </h1>
          <p className="text-emerald-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Fill in your machinery requirements below to receive a formal quotation from IBRAHIMAWA GLOBAL AND FARM (IGAF) LIMITED.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {submitted ? (
          /* SUCCESS STATE */
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-emerald-600 space-y-8 animate-fadeIn">
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Quote Generated Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Quotation Reference: <span className="text-emerald-800">{quoteRef}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your quotation request for <strong>{formData.quantity}x {selectedProduct.name}</strong> has been logged.
              </p>
            </div>

            {/* QUOTE SUMMARY CARD */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs sm:text-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Tractor className="w-5 h-5 text-emerald-700" />
                  <span>{selectedProduct.name}</span>
                </div>
                <span className="font-bold text-orange-600">Qty: {formData.quantity}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                <div><strong>Client Name:</strong> {formData.fullName}</div>
                <div><strong>Company/Farm:</strong> {formData.companyName || 'Private Farmer'}</div>
                <div><strong>Phone Number:</strong> {formData.phoneNumber}</div>
                <div><strong>Email Address:</strong> {formData.email || 'N/A'}</div>
                <div><strong>Delivery Location:</strong> {formData.state} ({formData.deliveryOption})</div>
                <div><strong>Power Source:</strong> {selectedProduct.powerSource}</div>
              </div>

              {formData.message && (
                <div className="pt-2 border-t border-slate-200 text-slate-600">
                  <strong>Notes:</strong> {formData.message}
                </div>
              )}
            </div>

            {/* INSTANT ACTION BUTTONS */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/2347047197737?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Quotation Directly to WhatsApp (Instant Response)</span>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:07047197737"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span>Call Showroom Manager</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      companyName: '',
                      phoneNumber: '',
                      email: '',
                      productSlug: PRODUCTS[0]?.slug || '',
                      quantity: 1,
                      state: 'Nasarawa State',
                      deliveryOption: 'Pickup at Keffi Store',
                      message: '',
                    });
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs"
                >
                  Request Another Quote
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* QUOTE FORM */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Fill Machinery Quotation Details
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Provide your farm location and contact info so our team can provide exact delivery rates.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alhaji Ibrahim Mohammed"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Farm Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Keffi Agro Farms"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="e.g. 08012345678"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. info@yourfarm.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Machine Selection & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-8">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Select Machinery Line *
                    </label>
                    <select
                      value={formData.productSlug}
                      onChange={(e) => setFormData({ ...formData, productSlug: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.slug}>
                          {p.name} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* State & Delivery Option */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      State / Location in Nigeria *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="e.g. Nasarawa State, FCT Abuja, Plateau..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Fulfillment Option *
                    </label>
                    <select
                      value={formData.deliveryOption}
                      onChange={(e) => setFormData({ ...formData, deliveryOption: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="Pickup at Keffi Store">Pickup at Masalacin Idi, Keffi Store</option>
                      <option value="Delivery to Location">Waybill / Delivery to My Farm Location</option>
                    </select>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specific Requirements or Questions
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us if you need extra belts, rubber rollers, diesel engine options, or custom setup..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Generate Official Quotation</span>
                </button>

              </form>

            </div>

            {/* Sidebar Preview Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-emerald-950 text-white p-6 rounded-3xl space-y-4 border border-emerald-800">
                <h3 className="font-bold text-lg text-white border-b border-emerald-800 pb-2">
                  Selected Machine Preview
                </h3>

                <img 
                  src={selectedProduct.mainImage} 
                  alt={selectedProduct.name}
                  className="w-full h-44 object-cover rounded-xl border border-emerald-800 bg-emerald-900"
                  referrerPolicy="no-referrer"
                />

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-orange-400 px-2 py-0.5 bg-emerald-900 rounded">
                    {selectedProduct.category}
                  </span>
                  <h4 className="font-extrabold text-white text-base leading-tight mt-1">
                    {selectedProduct.name}
                  </h4>
                  <p className="text-xs text-emerald-200 line-clamp-2">
                    {selectedProduct.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-800 text-xs space-y-1 text-emerald-300">
                  <p><strong>Power:</strong> {selectedProduct.enginePower}</p>
                  <p><strong>Capacity:</strong> {selectedProduct.capacity}</p>
                  <p><strong>Warranty:</strong> {selectedProduct.warranty}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>IGAF Price Guarantee</span>
                </h4>
                <p>
                  All quotations generated include authentic manufacturer pricing and full warranty terms. Our sales team in Keffi will contact you via phone or WhatsApp within 1 hour.
                </p>
              </div>
            </div>

          </div>
        )}
      </section>

    </div>
  );
};

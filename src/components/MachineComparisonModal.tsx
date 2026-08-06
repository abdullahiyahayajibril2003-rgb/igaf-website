import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Tractor, ShieldCheck, Zap, Phone, MessageCircle, ArrowRight, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface MachineComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveProduct: (productId: string) => void;
  onRequestQuote: (productSlug: string) => void;
}

export const MachineComparisonModal: React.FC<MachineComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveProduct,
  onRequestQuote
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Modal Header */}
          <div className="bg-emerald-950 text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-orange-500 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center">
                <Tractor className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  Heavy Machinery Side-by-Side Comparison
                </h2>
                <p className="text-xs text-emerald-200">
                  Compare specs, engine power, capacity, and uses for informed equipment buying in Nigeria.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {comparedProducts.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <Tractor className="w-16 h-16 text-slate-300 mx-auto" />
                <h3 className="font-extrabold text-slate-800 text-lg">No Machinery Selected for Comparison</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Click the <strong>"Compare Specs"</strong> button on any product card in our catalog to compare machines side-by-side!
                </p>
                <button
                  onClick={onClose}
                  className="bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
                >
                  Return to Product Catalog
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr>
                      <th className="p-3 bg-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4 rounded-tl-xl">
                        Specification
                      </th>
                      {comparedProducts.map((prod) => (
                        <th key={prod.id} className="p-3 bg-slate-50 border-l border-slate-200 text-slate-900 w-1/3 relative">
                          <button
                            onClick={() => onRemoveProduct(prod.id)}
                            title="Remove from comparison"
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <img
                            src={prod.mainImage}
                            alt={prod.name}
                            className="w-full h-28 object-cover rounded-xl border border-slate-200 mb-2"
                          />
                          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wide block">
                            {prod.category}
                          </span>
                          <h4 className="font-extrabold text-xs text-slate-900 line-clamp-2">{prod.name}</h4>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                    <tr>
                      <td className="p-3 font-bold bg-slate-50 text-slate-900">Capacity / Output</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="p-3 border-l border-slate-200 font-extrabold text-emerald-800">{p.capacity}</td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-3 font-bold bg-slate-50 text-slate-900">Engine / Power Source</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="p-3 border-l border-slate-200">{p.enginePower} ({p.powerSource})</td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-3 font-bold bg-slate-50 text-slate-900">Machine Weight</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="p-3 border-l border-slate-200 font-medium">{p.weight}</td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-3 font-bold bg-slate-50 text-slate-900">Warranty</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="p-3 border-l border-slate-200 font-bold text-orange-600">{p.warranty}</td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-3 font-bold bg-slate-50 text-slate-900">Primary Applications</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="p-3 border-l border-slate-200">
                          <ul className="list-disc list-inside space-y-1 text-[11px]">
                            {p.uses.slice(0, 3).map((use, i) => (
                              <li key={i}>{use}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-3 font-bold bg-slate-50 text-slate-900">Included Accessories</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="p-3 border-l border-slate-200 text-[11px]">
                          {p.includedAccessories.join(', ')}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-3 font-bold bg-slate-50 text-slate-900">Inquire Action</td>
                      {comparedProducts.map((p) => (
                        <td key={p.id} className="p-3 border-l border-slate-200">
                          <button
                            onClick={() => {
                              onClose();
                              onRequestQuote(p.slug);
                            }}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 shadow"
                          >
                            <span>Request Quote</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
            <span>Showing {comparedProducts.length} of max 3 machines compared</span>
            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-1.5 rounded-lg transition-colors"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

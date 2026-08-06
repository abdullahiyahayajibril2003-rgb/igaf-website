import React, { useState } from 'react';
import { Calculator, Tractor, TrendingUp, Sparkles, Phone, MessageCircle, DollarSign, CheckCircle2 } from 'lucide-react';

interface MachineOption {
  id: string;
  name: string;
  hourlyCapacityKg: number;
  unitName: string; // e.g. "Bags (50kg)" or "Kg"
  bagWeightKg: number;
  estimatedFeePerBagNgn: number;
}

const MACHINE_OPTIONS: MachineOption[] = [
  {
    id: 'rice-mill',
    name: 'IGAF Commercial Heavy Rice Mill (2,000 kg/hr)',
    hourlyCapacityKg: 2000,
    unitName: 'Bags (50kg)',
    bagWeightKg: 50,
    estimatedFeePerBagNgn: 1500
  },
  {
    id: 'grinding-machine',
    name: 'IGAF Heavy Duty Grinding Machine (600 kg/hr)',
    hourlyCapacityKg: 600,
    unitName: 'Bags (50kg)',
    bagWeightKg: 50,
    estimatedFeePerBagNgn: 1000
  },
  {
    id: 'chaff-cutter',
    name: 'IGAF Motorized Chaff Cutter (1,500 kg/hr)',
    hourlyCapacityKg: 1500,
    unitName: 'Kg Fodder',
    bagWeightKg: 1,
    estimatedFeePerBagNgn: 25
  },
  {
    id: 'hammer-mill',
    name: 'IGAF Industrial Hammer Mill (1,200 kg/hr)',
    hourlyCapacityKg: 1200,
    unitName: 'Bags (50kg)',
    bagWeightKg: 50,
    estimatedFeePerBagNgn: 1200
  },
  {
    id: 'garri-line',
    name: 'IGAF Garri Processing Line (400 kg/hr)',
    hourlyCapacityKg: 400,
    unitName: 'Bags (50kg)',
    bagWeightKg: 50,
    estimatedFeePerBagNgn: 2000
  },
  {
    id: 'destoner',
    name: 'IGAF Gravity Grain De-stoner (1,800 kg/hr)',
    hourlyCapacityKg: 1800,
    unitName: 'Bags (50kg)',
    bagWeightKg: 50,
    estimatedFeePerBagNgn: 800
  }
];

export const MillingCalculator: React.FC = () => {
  const [selectedMachineId, setSelectedMachineId] = useState<string>('rice-mill');
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [customFeeNgn, setCustomFeeNgn] = useState<number | null>(null);

  const selectedMachine = MACHINE_OPTIONS.find(m => m.id === selectedMachineId) || MACHINE_OPTIONS[0];

  const feePerUnit = customFeeNgn !== null ? customFeeNgn : selectedMachine.estimatedFeePerBagNgn;

  const totalHourlyKg = selectedMachine.hourlyCapacityKg;
  const totalDailyKg = totalHourlyKg * hoursPerDay;
  const totalDailyUnits = Math.floor(totalDailyKg / selectedMachine.bagWeightKg);
  const estimatedDailyGrossRevenueNgn = totalDailyUnits * feePerUnit;
  const estimatedMonthlyGrossRevenueNgn = estimatedDailyGrossRevenueNgn * 26; // 26 working days

  return (
    <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-800 space-y-8">
      
      {/* Header Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-900/80 text-orange-400 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-700/60 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Agribusiness Yield & ROI Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Interactive Machinery Capacity & Revenue Calculator
          </h2>
          <p className="text-emerald-200/80 text-xs sm:text-sm mt-1 max-w-xl">
            Select an IGAF machine and input daily operating hours to estimate daily output and processing revenue for your enterprise in Nigeria.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-900/60 px-4 py-2.5 rounded-2xl border border-emerald-700/60 text-xs text-emerald-200 shrink-0">
          <TrendingUp className="w-4 h-4 text-orange-400" />
          <span>High Efficiency Machinery ROI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Select Machine Model *</label>
            <select
              value={selectedMachineId}
              onChange={(e) => {
                setSelectedMachineId(e.target.value);
                setCustomFeeNgn(null);
              }}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3.5 py-3 text-xs font-bold focus:outline-none focus:border-orange-500"
            >
              {MACHINE_OPTIONS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-300">Daily Operating Hours: <span className="text-orange-400 font-extrabold">{hoursPerDay} Hours/Day</span></label>
              <span className="text-[10px] text-slate-400">Range: 1 – 16 Hours</span>
            </div>
            <input
              type="range"
              min={1}
              max={16}
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Processing Charge Rate per {selectedMachine.unitName} (₦)
            </label>
            <input
              type="number"
              value={feePerUnit}
              onChange={(e) => setCustomFeeNgn(Number(e.target.value))}
              placeholder={`e.g. ₦${selectedMachine.estimatedFeePerBagNgn}`}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-orange-500"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Estimated average processing fee charged to farmers/customers in Nasarawa & FCT.
            </p>
          </div>
        </div>

        {/* Right Output Calculations Column */}
        <div className="lg:col-span-6 bg-emerald-900/40 rounded-2xl p-6 border border-emerald-700/60 space-y-6">
          <h3 className="font-extrabold text-white text-base border-b border-emerald-800 pb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Estimated Machine Output Summary</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Hourly Capacity</span>
              <p className="text-lg font-extrabold text-orange-400">{totalHourlyKg.toLocaleString()} kg/hr</p>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Daily Output ({hoursPerDay} hrs)</span>
              <p className="text-lg font-extrabold text-emerald-300">
                {totalDailyUnits.toLocaleString()} {selectedMachine.unitName}
              </p>
            </div>
          </div>

          {/* Revenue Calculation Pill */}
          <div className="bg-emerald-950 p-5 rounded-2xl border border-emerald-700 space-y-2">
            <span className="text-xs uppercase font-extrabold text-orange-400 tracking-wider block">
              Estimated Daily Processing Revenue
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              ₦{estimatedDailyGrossRevenueNgn.toLocaleString()} <span className="text-xs font-normal text-emerald-300">/ Day</span>
            </div>
            <div className="text-xs text-emerald-200/80 pt-1 border-t border-emerald-800/80">
              Est. Monthly Gross Revenue (26 days): <strong className="text-white">₦{estimatedMonthlyGrossRevenueNgn.toLocaleString()}</strong>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/2347047197737?text=Hello%20IGAF%20Limited,%20I%20used%20your%20capacity%20calculator%20for%20${encodeURIComponent(selectedMachine.name)}%20and%20I%20want%20to%20order.`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get Quotation for {selectedMachine.name.split('(')[0]}</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};

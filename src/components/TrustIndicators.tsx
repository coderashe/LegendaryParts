import React from 'react';
import { Globe2, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData.ts';

export const TrustIndicators: React.FC = () => {
  const getIcon = (iconName: string, index: number) => {
    const isRed = index % 2 === 1;
    const colorClass = isRed ? 'text-red-500' : 'text-blue-400';
    const bgClass = isRed ? 'bg-red-950/60 border-red-700/60' : 'bg-blue-950/60 border-blue-700/60';

    switch (iconName) {
      case 'Globe2':
        return (
          <div className={`p-3 rounded-2xl ${bgClass} border flex items-center justify-center shrink-0 shadow-md`}>
            <Globe2 className={`w-6 h-6 ${colorClass}`} />
          </div>
        );
      case 'ShieldCheck':
        return (
          <div className={`p-3 rounded-2xl ${bgClass} border flex items-center justify-center shrink-0 shadow-md`}>
            <ShieldCheck className={`w-6 h-6 ${colorClass}`} />
          </div>
        );
      case 'Truck':
        return (
          <div className={`p-3 rounded-2xl ${bgClass} border flex items-center justify-center shrink-0 shadow-md`}>
            <Truck className={`w-6 h-6 ${colorClass}`} />
          </div>
        );
      case 'Wrench':
      default:
        return (
          <div className={`p-3 rounded-2xl ${bgClass} border flex items-center justify-center shrink-0 shadow-md`}>
            <Wrench className={`w-6 h-6 ${colorClass}`} />
          </div>
        );
    }
  };

  return (
    <section id="trust-pillars" className="py-14 bg-[#07132c] border-b border-blue-900/40 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-red-500 mb-1">
            Why Motorists & Workshops Choose Us
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Built On Automotive Reliability
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            No counterfeit or degraded spares. We stand behind every part with rigorous quality protocols and local warranty coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BUSINESS_INFO.pillars.map((pillar, idx) => {
            const isRed = idx % 2 === 1;
            return (
              <div
                key={pillar.title}
                className="group relative bg-[#0b1b3e] hover:bg-[#0f2454] border border-blue-800 hover:border-red-500/80 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {getIcon(pillar.icon, idx)}
                    <span 
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        isRed 
                          ? 'bg-red-600 text-white border-red-500 shadow-sm' 
                          : 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      }`}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-blue-200 transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-xs font-bold text-red-400 mt-0.5 mb-2.5 uppercase tracking-wide">
                    {pillar.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-blue-900/60 flex items-center justify-between text-[11px] text-blue-200 group-hover:text-white transition-colors">
                  <span className="font-semibold">Legendary Standard</span>
                  <span className="text-red-400 font-black">100% Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

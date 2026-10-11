import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Crown, 
  Truck, 
  CheckCircle2
} from 'lucide-react';
import { BRANCHES, SERVICE_AREAS } from '../data/mockData.ts';
import { buildWhatsAppUrl } from '../utils/whatsapp.ts';

export const BranchDirectory: React.FC = () => {
  return (
    <section id="branches" className="py-16 bg-[#07132c] text-white border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-black uppercase tracking-widest mb-2">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Physical Branch Network & Logistics Hubs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Find Your Nearest <span className="text-red-500">Legendary Branch</span>
          </h2>
          <p className="text-slate-300 text-sm mt-2">
            Visit our fully stocked counters in Kadoma, Harare, and Karoi for on-site parts inspection, precision fitment advice, or collect counter orders.
          </p>
        </div>

        {/* Grid of Branch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCHES.map((branch) => {
            const isHQ = branch.isHQ;
            const branchWhatsAppUrl = buildWhatsAppUrl(
              branch.primaryWhatsApp,
              `Hi Legendary Parts Centre (${branch.name}), I would like to check counter stock and inquire about automotive spare parts.`
            );

            return (
              <div
                key={branch.id}
                className={`relative rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between shadow-2xl ${
                  isHQ
                    ? 'bg-gradient-to-b from-[#0f296b] via-[#0c1f54] to-[#081538] border-2 border-red-500 shadow-blue-950/60 ring-2 ring-red-500/20'
                    : 'bg-[#0a1838] border border-blue-800 hover:border-blue-600'
                }`}
              >
                {/* Visual Ribbon / Badge for HQ */}
                {isHQ && (
                  <div className="absolute -top-3.5 left-6 bg-red-600 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-white/30">
                    <Crown className="w-3.5 h-3.5 fill-white" />
                    <span>Headquarters & Main Store</span>
                  </div>
                )}

                <div>
                  {/* Branch Name & Status */}
                  <div className={`flex items-start justify-between gap-2 mb-4 ${isHQ ? 'pt-2' : ''}`}>
                    <div>
                      <h3 className="text-xl font-black text-white flex items-center gap-2">
                        <span>{branch.name}</span>
                        {isHQ && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#0f296b] font-black uppercase shadow-sm">
                            MAIN
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-blue-200 mt-0.5 font-medium">
                        {branch.openingHours}
                      </p>
                    </div>

                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Open Today" />
                  </div>

                  {/* Physical Addresses */}
                  <div className="space-y-2 mb-5">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                      Physical Address{branch.addresses.length > 1 ? 'es' : ''}:
                    </p>
                    {branch.addresses.map((addr, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-white bg-[#061026] p-2.5 rounded-xl border border-blue-900/80"
                      >
                        <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="font-semibold">{addr}</span>
                      </div>
                    ))}
                  </div>

                  {/* Phone Numbers (Tap-to-call) */}
                  <div className="space-y-2 mb-5">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                      Counter & Hotline Numbers (Tap to call):
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {branch.phoneNumbers.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s+/g, '')}`}
                          className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#081533] hover:bg-blue-900/60 border border-blue-800 hover:border-red-500 text-xs font-mono text-white transition group"
                        >
                          <span className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
                            <span className="font-bold">{phone}</span>
                          </span>
                          <span className="text-[10px] text-blue-300 font-sans group-hover:text-white font-bold">
                            Call Now →
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Serving Areas */}
                  {branch.servingAreas && (
                    <div className="mb-5">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                        Local Delivery Districts:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {branch.servingAreas.slice(0, 4).map((area) => (
                          <span
                            key={area}
                            className="text-[10px] px-2 py-0.5 rounded-lg bg-[#07132c] text-blue-200 border border-blue-800"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Branch WhatsApp Direct Action Button */}
                <div className="pt-4 border-t border-blue-900/60">
                  <a
                    href={branchWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white transition shadow-lg cursor-pointer ${
                      isHQ
                        ? 'bg-red-600 hover:bg-red-500 shadow-red-950/60'
                        : 'bg-blue-600 hover:bg-blue-500 shadow-blue-950/60'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>WhatsApp {branch.name} Counter</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4th Card: "Also Serving" Regional Courier & Logistics Card */}
        <div className="mt-8 bg-gradient-to-r from-[#0b1b3e] via-[#0d2254] to-[#0b1b3e] border-2 border-blue-700/60 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                <Truck className="w-3.5 h-3.5" />
                <span>Inter-City Courier Service</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                {SERVICE_AREAS.title}: <span className="text-blue-300">{SERVICE_AREAS.cities.join(' · ')}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                {SERVICE_AREAS.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-1 text-xs text-blue-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Next-Day Freight Arrival</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Waybill Tracking Provided</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>EcoCash & Bank Transfer Accepted</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href={buildWhatsAppUrl(
                  SERVICE_AREAS.whatsappNumber,
                  "Hi, I would like to arrange regional parts delivery to Marondera / Mutare / Kwekwe."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-950/50 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire Nationwide Dispatch</span>
              </a>

              <a
                href={`tel:${SERVICE_AREAS.contactNumber.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-bold text-white bg-[#07132c] hover:bg-blue-900 border border-blue-700 transition"
              >
                <Phone className="w-4 h-4 text-red-400" />
                <span>Call Dispatch Line ({SERVICE_AREAS.contactNumber})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

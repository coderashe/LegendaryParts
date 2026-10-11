import React from 'react';
import { 
  MessageSquare, 
  Wrench, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { BUSINESS_INFO, SUPPORTED_BRANDS, BRAND_PARTNERS } from '../data/mockData.ts';
import { buildWhatsAppUrl } from '../utils/whatsapp.ts';

interface HeroProps {
  onRequestPart: () => void;
  onBrowseCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestPart, onBrowseCatalog }) => {
  const heroWhatsAppUrl = buildWhatsAppUrl(
    BUSINESS_INFO.primaryCleanPhone,
    "Hi, I'd like to inquire about a part"
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1e4a] via-[#081533] to-[#060e22] text-white pt-12 pb-16 md:pt-16 md:pb-22 border-b border-blue-900/40">
      {/* Royal Blue & Vibrant Red Ambient Glows */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[480px] bg-blue-600/20 blur-[140px] rounded-full" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/3 right-[-80px] w-[500px] h-[500px] bg-red-600/15 blur-[150px] rounded-full" 
      />

      {/* Subtle Grid Texture */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px]" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-5 text-left">
            {/* Top Brand Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                Official Retailer
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/90 border border-blue-600/60 text-xs font-bold text-blue-200">
                <span className="text-white">Kadoma HQ · Harare · Karoi</span>
                <span className="text-blue-400">·</span>
                <span className="text-red-400">UAE · China · UK Imports</span>
              </div>
            </div>

            {/* Headline Slogans matching Facebook Banner */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6.5xl font-black tracking-tight text-white uppercase font-sans leading-[1.08]">
                Legendary <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">Parts Center</span>
              </h1>

              {/* Iconic Facebook Banner Slogan: YOUR ONE STOP SPARES SHOP */}
              <div className="inline-block bg-gradient-to-r from-red-600 via-red-600 to-rose-700 text-white px-4 sm:px-6 py-2 rounded-xl shadow-xl shadow-red-950/70 border-2 border-white/20 transform -rotate-0.5">
                <p className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wider drop-shadow-md">
                  {BUSINESS_INFO.bannerHeadline}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-200 bg-blue-950/80 px-3 py-1 rounded-lg border border-blue-800">
                  {BUSINESS_INFO.slogan}
                </span>
              </div>
            </div>

            {/* Facebook Banner Subtitle Categories Strip */}
            <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-200 bg-[#0c1e44]/80 p-3 rounded-xl border border-blue-800/60 max-w-2xl leading-relaxed">
              <span className="text-white font-bold">In-Stock Categories: </span>
              <span className="text-blue-300">Suspension Kits</span> · 
              <span className="text-red-300"> Engine Components</span> · 
              <span className="text-blue-300"> Brake & Clutch</span> · 
              <span className="text-white"> Offroad & Pimping Accessories</span> · 
              <span className="text-sky-300"> Routine Service Kits</span>
            </p>

            {/* CTAs in RED & BLUE */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary CTA: Vibrant Red "Request a Part" */}
              <button
                onClick={onRequestPart}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 active:bg-red-700 shadow-xl shadow-red-950/60 border border-red-400/50 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Wrench className="w-5 h-5 text-white" />
                <span>Request a Part</span>
                <ChevronRight className="w-4 h-4 ml-1 opacity-90" />
              </button>

              {/* Secondary CTA: Royal Blue / White "WhatsApp Us" */}
              <a
                href={heroWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 border-2 border-white/20 hover:border-white/50 transition-all transform hover:-translate-y-0.5 shadow-lg group cursor-pointer"
              >
                <div className="w-3 h-3 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform"></div>
                <MessageSquare className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>WhatsApp Us</span>
              </a>

              <button
                onClick={onBrowseCatalog}
                className="hidden xl:inline-flex items-center justify-center px-4 py-4 text-xs font-bold text-blue-200 hover:text-white transition cursor-pointer"
              >
                <span>Browse Products ↓</span>
              </button>
            </div>

            {/* Assurance Points */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Genuine Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-300 shrink-0" />
                <span>Zimbabwe-wide Swift Freight</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Active WhatsApp Response</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Card: Spares Hub & Verified Partner Badges */}
          <div className="lg:col-span-4">
            <div className="bg-[#0b1b3e]/90 border-2 border-blue-700/60 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-blue-800/60">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-red-600 text-white shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                      Branch Inventory
                    </h3>
                    <p className="text-[11px] text-blue-200">Counters & Delivery Depots</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-600 text-white shadow-sm">
                  Kadoma HQ
                </span>
              </div>

              {/* Branch quick pills */}
              <div className="mt-5 space-y-3">
                <div className="p-3.5 rounded-xl bg-[#07132c] border border-blue-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">Kadoma Central HQ</span>
                    <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded">Main Store</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">Shop 38, Baker St & 6776 Chaitezvi</p>
                  <p className="text-[11px] text-blue-300 font-mono mt-0.5">+263 77 259 1965 / +263 71 525 1525</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#07132c] border border-blue-800/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">Harare Branch</span>
                    <span className="text-[10px] font-bold text-blue-300">Direct Sales</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">1 Londonderry Ave, Harare</p>
                  <p className="text-[11px] text-blue-300 font-mono mt-0.5">+263 77 824 0751 / +263 77 483 3110</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#07132c] border border-blue-800/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">Karoi Branch</span>
                    <span className="text-[10px] font-bold text-blue-300">Farming Hub</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">469 Jubilee Lane, Karoi</p>
                  <p className="text-[11px] text-blue-300 font-mono mt-0.5">+263 77 500 0113 / +263 71 832 1081</p>
                </div>
              </div>

              {/* Verified Sourced Brands from Facebook Banner */}
              <div className="mt-5 pt-4 border-t border-blue-800/60">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300 block mb-2">
                  Stocked Leading Brands (as on banner):
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {BRAND_PARTNERS.map((brand) => (
                    <div 
                      key={brand.name}
                      className="bg-white text-[#0a1b42] rounded-lg py-1 px-1.5 text-center shadow-sm border border-slate-200"
                    >
                      <div className="text-[11px] font-black leading-tight tracking-tight">{brand.name}</div>
                      <div className="text-[8px] text-red-600 font-bold truncate leading-none">{brand.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Vehicle Brands Strip */}
        <div className="mt-12 pt-8 border-t border-blue-900/60">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-red-400">
                Vehicle Makes Supported
              </p>
              <p className="text-xs text-blue-200">
                Genuine OEM-spec parts stocked for Zimbabwe’s leading vehicle models
              </p>
            </div>
            <span className="text-[11px] font-bold text-white bg-blue-900/80 px-3 py-1 rounded-full border border-blue-600">
              Toyota · Nissan · Honda · Mazda · VW · Ford
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {SUPPORTED_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="group relative bg-[#0b1a3d] hover:bg-[#0f2352] border border-blue-800 hover:border-red-500 rounded-2xl p-3.5 transition-all text-center flex flex-col items-center justify-center gap-1.5 shadow-md"
              >
                <div className="w-9 h-9 rounded-full bg-white text-[#0f296b] border-2 border-blue-700 flex items-center justify-center text-xs font-black shadow-sm group-hover:scale-105 transition">
                  {brand.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="font-black text-white text-sm tracking-wide">
                  {brand.name}
                </div>
                <div className="text-[10px] text-blue-200 font-medium truncate max-w-full">
                  {brand.popularModels.slice(0, 2).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { 
  Mail, 
  Facebook, 
  Phone, 
  MapPin, 
  ArrowUp, 
  MessageSquare 
} from 'lucide-react';
import { BUSINESS_INFO, BRANCHES } from '../data/mockData.ts';
import { buildWhatsAppUrl } from '../utils/whatsapp.ts';
import { BrandLogo } from './BrandLogo.tsx';

interface FooterProps {
  onNavigateHome: () => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onOpenInquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const primaryWhatsAppUrl = buildWhatsAppUrl(
    BUSINESS_INFO.primaryCleanPhone,
    "Hi Legendary Parts Center, I'd like to make an inquiry regarding car parts."
  );

  return (
    <footer className="bg-[#050c1e] text-slate-300 border-t border-blue-900/60 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-blue-900/40">
          {/* Brand & Slogans Column */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={onNavigateHome} 
              className="cursor-pointer group"
            >
              <BrandLogo size="md" showText={true} />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Zimbabwe's trusted automotive spare parts retailer. Specializing in Japanese, South African, and European vehicle components directly sourced from the UAE, China, and the UK.
            </p>

            {/* Social & Contact Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-blue-900/80 hover:bg-blue-800 border border-blue-600/60 flex items-center justify-center text-white transition shadow-sm"
                title="Facebook: Legendary Parts Center"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="w-10 h-10 rounded-xl bg-blue-900/80 hover:bg-blue-800 border border-blue-600/60 flex items-center justify-center text-red-400 transition shadow-sm"
                title={`Email: ${BUSINESS_INFO.email}`}
              >
                <Mail className="w-4.5 h-4.5" />
              </a>

              <a
                href={primaryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-blue-900/80 hover:bg-blue-800 border border-blue-600/60 flex items-center justify-center text-emerald-400 transition shadow-sm"
                title="Direct WhatsApp"
              >
                <MessageSquare className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white border-l-2 border-red-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button 
                  onClick={onNavigateHome}
                  className="hover:text-white transition cursor-pointer"
                >
                  Home & Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenInquiry}
                  className="hover:text-red-400 transition cursor-pointer"
                >
                  Request a Part (Form)
                </button>
              </li>
              <li>
                <a 
                  href="#catalog"
                  onClick={onNavigateHome}
                  className="hover:text-white transition"
                >
                  Browse Products
                </a>
              </li>
              <li>
                <a 
                  href="#branches"
                  onClick={onNavigateHome}
                  className="hover:text-white transition"
                >
                  Branch Network
                </a>
              </li>
              <li>
                <a 
                  href="#trust-pillars"
                  onClick={onNavigateHome}
                  className="hover:text-white transition"
                >
                  Quality Warranties
                </a>
              </li>
            </ul>
          </div>

          {/* Branch Directory Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white border-l-2 border-blue-400 pl-2">
              Our Locations
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              {BRANCHES.map((branch) => (
                <li key={branch.id} className="space-y-0.5">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{branch.name}</span>
                    {branch.isHQ && (
                      <span className="text-[10px] text-red-400 font-mono font-bold">(HQ)</span>
                    )}
                  </div>
                  <p className="text-[11px] text-blue-200/80 pl-5">{branch.addresses[0]}</p>
                </li>
              ))}
              <li className="pt-1 text-[11px] text-slate-400 pl-5">
                Also serving: <span className="text-white font-medium">Marondera, Mutare, Kwekwe</span>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white border-l-2 border-red-500 pl-2">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2 hover:text-white transition group"
              >
                <Mail className="w-4 h-4 text-red-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="break-all">{BUSINESS_INFO.email}</span>
              </a>

              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition group"
              >
                <Facebook className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Facebook: {BUSINESS_INFO.facebook}</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.primaryWhatsAppNumber}`}
                className="flex items-center gap-2 hover:text-white transition group"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Hotline: {BUSINESS_INFO.primaryWhatsAppNumber}</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenInquiry}
                className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition shadow-lg shadow-red-950/60 cursor-pointer"
              >
                Instant Part Inquiry
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p className="font-medium">© {BUSINESS_INFO.copyrightYear} powered by IStartK. All rights reserved.</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Automotive Spare Parts & Car Maintenance Products Zimbabwe · Your One Stop Spares Shop
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-800 text-slate-200 hover:text-white transition cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

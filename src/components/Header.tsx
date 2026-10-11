import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  ArrowLeft, 
  MapPin, 
  ShieldCheck,
  Package,
  Wrench
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData.ts';
import { buildWhatsAppUrl } from '../utils/whatsapp.ts';
import { BrandLogo } from './BrandLogo.tsx';

interface HeaderProps {
  currentView: 'home' | 'inquiry';
  onNavigate: (view: 'home' | 'inquiry') => void;
  onOpenInquiryForProduct?: (productName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const primaryWhatsAppUrl = buildWhatsAppUrl(
    BUSINESS_INFO.primaryCleanPhone,
    "Hi Legendary Parts Centre, I'd like to make an inquiry regarding car spare parts."
  );

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigate('home');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#091b3e]/95 backdrop-blur-md border-b border-blue-900/60 shadow-lg shadow-blue-950/40 transition-colors">
      {/* Top Announcement Bar: Royal Blue + Red Accent */}
      <div className="bg-gradient-to-r from-[#07132c] via-[#0d2766] to-[#07132c] border-b border-blue-800/40 text-xs py-1.5 px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-bold text-white tracking-wide">
              YOUR ONE STOP SPARES SHOP
            </span>
            <span className="hidden sm:inline text-blue-300/60">|</span>
            <span className="hidden sm:inline text-slate-200">
              Kadoma HQ · Harare · Karoi (Nationwide Delivery)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href={`tel:${BUSINESS_INFO.primaryWhatsAppNumber}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span className="font-mono font-medium">{BUSINESS_INFO.primaryWhatsAppNumber}</span>
            </a>
            <a 
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-white hover:text-red-200 font-bold transition-colors bg-red-600/90 hover:bg-red-600 px-2.5 py-0.5 rounded-full"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Sales</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Brand Emblem */}
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer group select-none transition-transform active:scale-95"
          >
            <BrandLogo size="md" showText={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-200">
            {currentView === 'inquiry' ? (
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-2 text-white hover:text-blue-200 px-3.5 py-2 rounded-xl bg-blue-900/60 hover:bg-blue-900 border border-blue-700/50 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-red-400" />
                <span>Back to Parts Catalog</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('catalog')}
                  className="hover:text-white hover:underline decoration-red-500 underline-offset-8 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Package className="w-4 h-4 text-blue-300" />
                  <span>Parts Catalog</span>
                </button>
                <button
                  onClick={() => handleNavClick('trust-pillars')}
                  className="hover:text-white hover:underline decoration-red-500 underline-offset-8 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-300" />
                  <span>Quality Guarantee</span>
                </button>
                <button
                  onClick={() => handleNavClick('branches')}
                  className="hover:text-white hover:underline decoration-red-500 underline-offset-8 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-blue-300" />
                  <span>Branches & HQ</span>
                </button>
              </>
            )}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold text-white bg-blue-900/80 hover:bg-blue-800 border border-blue-500/60 rounded-xl transition shadow-md hover:shadow-blue-900/50"
              title="Chat directly on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Chat</span>
            </a>

            {currentView === 'home' ? (
              <button
                onClick={() => onNavigate('inquiry')}
                className="inline-flex items-center gap-2 px-4.5 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-xl shadow-lg shadow-red-950/60 border border-red-400/50 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                <span>Request a Part</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-800 rounded-xl border border-blue-600 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-red-400" />
                <span>View Catalog</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {currentView === 'home' ? (
              <button
                onClick={() => onNavigate('inquiry')}
                className="px-3 py-1.5 text-xs font-black text-white bg-red-600 rounded-lg shadow-sm"
              >
                Inquire
              </button>
            ) : (
              <button
                onClick={() => onNavigate('home')}
                className="px-3 py-1.5 text-xs font-bold text-white bg-blue-900 rounded-lg border border-blue-700"
              >
                Catalog
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-blue-950/80 text-white border border-blue-700/60"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#07132c] border-b border-blue-800 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick('catalog')}
            className="w-full text-left py-2.5 px-3 text-white hover:bg-blue-900/60 rounded-xl text-sm flex items-center justify-between font-medium"
          >
            <span>Browse Spare Parts Catalog</span>
            <Package className="w-4 h-4 text-blue-400" />
          </button>
          <button
            onClick={() => handleNavClick('trust-pillars')}
            className="w-full text-left py-2.5 px-3 text-white hover:bg-blue-900/60 rounded-xl text-sm flex items-center justify-between font-medium"
          >
            <span>Quality Guarantee & Sourcing</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </button>
          <button
            onClick={() => handleNavClick('branches')}
            className="w-full text-left py-2.5 px-3 text-white hover:bg-blue-900/60 rounded-xl text-sm flex items-center justify-between font-medium"
          >
            <span>Branches: Kadoma HQ, Harare, Karoi</span>
            <MapPin className="w-4 h-4 text-blue-400" />
          </button>

          <div className="pt-2 border-t border-blue-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('inquiry');
              }}
              className="w-full py-3 px-4 text-center font-black uppercase text-white bg-red-600 rounded-xl text-sm shadow-md"
            >
              Request a Part (WhatsApp Instant)
            </button>
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 text-center font-bold text-white bg-blue-900/90 border border-blue-600 rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

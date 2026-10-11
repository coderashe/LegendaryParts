import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { TrustIndicators } from './components/TrustIndicators.tsx';
import { ProductCatalog } from './components/ProductCatalog.tsx';
import { BranchDirectory } from './components/BranchDirectory.tsx';
import { PartInquiryForm } from './components/PartInquiryForm.tsx';
import { Footer } from './components/Footer.tsx';
import { MessageSquare, Wrench } from 'lucide-react';
import { BUSINESS_INFO } from './data/mockData.ts';
import { buildWhatsAppUrl } from './utils/whatsapp.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'inquiry'>('home');
  const [selectedPartForInquiry, setSelectedPartForInquiry] = useState<string>('');

  const handleOpenInquiry = (partName?: string) => {
    setSelectedPartForInquiry(partName || '');
    setCurrentView('inquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedPartForInquiry('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrowseCatalog = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setTimeout(() => {
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const floatingWhatsAppUrl = buildWhatsAppUrl(
    BUSINESS_INFO.primaryCleanPhone,
    "Hi Legendary Parts Centre, I'm checking part availability on your website."
  );

  return (
    <div className="min-h-screen bg-[#071126] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Sticky Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'home') handleBackToHome();
          else handleOpenInquiry();
        }}
      />

      {/* Main Content: View Switching */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* 1. Hero Section (Facebook Banner Theme) */}
            <Hero
              onRequestPart={() => handleOpenInquiry()}
              onBrowseCatalog={handleBrowseCatalog}
            />

            {/* 2. Trust Indicators Bar */}
            <TrustIndicators />

            {/* 3. Product Category Catalog */}
            <ProductCatalog
              onSelectForInquiry={(productName) => handleOpenInquiry(productName)}
            />

            {/* 5. Branch Directory */}
            <BranchDirectory />
          </>
        ) : (
          /* 4. Part Inquiry Form (Separate View) */
          <PartInquiryForm
            initialPartName={selectedPartForInquiry}
            onBackToHome={handleBackToHome}
          />
        )}
      </main>

      {/* Floating Action Quick Access for WhatsApp & Quick Inquiry */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {currentView === 'home' && (
          <button
            onClick={() => handleOpenInquiry()}
            className="hidden sm:inline-flex items-center gap-2 px-4.5 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider shadow-2xl shadow-red-950/80 border-2 border-white/20 transition transform hover:-translate-y-1 cursor-pointer"
            title="Open Part Request Form"
          >
            <Wrench className="w-4 h-4" />
            <span>Request a Part</span>
          </button>
        )}

        <a
          href={floatingWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4.5 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-950/90 border-2 border-white/30 transition transform hover:-translate-y-1 cursor-pointer"
          title="Direct WhatsApp Hotline"
        >
          <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform text-white" />
          <span className="text-xs font-black uppercase tracking-wide hidden sm:inline">
            WhatsApp Hotline
          </span>
        </a>
      </div>

      {/* 6. Footer */}
      <Footer
        onNavigateHome={handleBackToHome}
        onOpenInquiry={() => handleOpenInquiry()}
      />
    </div>
  );
}

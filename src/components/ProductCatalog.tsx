import React, { useState, useMemo } from 'react';
import { 
  CATEGORIES, 
  PRODUCTS, 
  BUSINESS_INFO 
} from '../data/mockData.ts';
import { ProductCategory, Product } from '../types/parts.ts';
import { buildWhatsAppUrl } from '../utils/whatsapp.ts';
import { 
  Search, 
  MessageSquare, 
  Wrench, 
  Sparkles, 
  Disc, 
  Activity, 
  Cog, 
  Radio, 
  Droplets, 
  Wind, 
  Zap, 
  Gauge, 
  Shield, 
  CircleDot, 
  Sliders, 
  Maximize2, 
  Layers, 
  Anchor, 
  SlidersHorizontal, 
  RadioTower, 
  RefreshCw, 
  ShieldAlert, 
  Cpu, 
  Flame, 
  Tv, 
  Sun, 
  BatteryCharging, 
  Video,
  Filter
} from 'lucide-react';

interface ProductCatalogProps {
  onSelectForInquiry: (productName: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectForInquiry }) => {
  const [activeTab, setActiveTab] = useState<ProductCategory>('service-kits');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  const brandOptions = ['All', 'Toyota', 'Nissan', 'Honda', 'Mazda', 'VW', 'Ford'];

  // Filter products by category, search query, and brand
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = product.category === activeTab;
      const matchesBrand = selectedBrand === 'All' || product.supportedBrands.includes(selectedBrand);
      
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        (product.details && product.details.toLowerCase().includes(query)) ||
        product.supportedBrands.some(b => b.toLowerCase().includes(query));

      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [activeTab, selectedBrand, searchQuery]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Disc': return <Disc className="w-4 h-4" />;
      case 'Activity': return <Activity className="w-4 h-4" />;
      case 'Cog': return <Cog className="w-4 h-4" />;
      case 'Radio': return <Radio className="w-4 h-4" />;
      default: return <Wrench className="w-4 h-4" />;
    }
  };

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'PackageCheck': return <Sparkles className="w-5 h-5 text-red-500" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-blue-400" />;
      case 'Wind': return <Wind className="w-5 h-5 text-sky-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-orange-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'Disc': return <Disc className="w-5 h-5 text-red-400" />;
      case 'Crosshair': return <Wrench className="w-5 h-5 text-neutral-300" />;
      case 'CircleDot': return <CircleDot className="w-5 h-5 text-amber-500" />;
      case 'Sliders': return <Sliders className="w-5 h-5 text-blue-400" />;
      case 'Maximize2': return <Maximize2 className="w-5 h-5 text-red-500" />;
      case 'Layers': return <Layers className="w-5 h-5 text-purple-400" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-blue-400" />;
      case 'SlidersHorizontal': return <SlidersHorizontal className="w-5 h-5 text-emerald-400" />;
      case 'RadioTower': return <RadioTower className="w-5 h-5 text-sky-400" />;
      case 'Cog': return <Cog className="w-5 h-5 text-red-500" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5 text-emerald-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-500" />;
      case 'Tv': return <Tv className="w-5 h-5 text-blue-400" />;
      case 'Sun': return <Sun className="w-5 h-5 text-amber-300" />;
      case 'BatteryCharging': return <BatteryCharging className="w-5 h-5 text-emerald-400" />;
      case 'Video': return <Video className="w-5 h-5 text-rose-400" />;
      default: return <Wrench className="w-5 h-5 text-red-500" />;
    }
  };

  const handleWhatsAppInquiry = (product: Product) => {
    const message = `Hi, I'm interested in ${product.name}. Do you have it available?`;
    const url = buildWhatsAppUrl(BUSINESS_INFO.primaryCleanPhone, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const activeCategoryInfo = CATEGORIES.find(c => c.id === activeTab);

  return (
    <section id="catalog" className="py-16 bg-[#061026] text-white border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-black uppercase tracking-widest mb-2">
              <Wrench className="w-3.5 h-3.5 text-red-500" />
              <span>Certified Spares Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Browse Genuine <span className="text-red-500">Auto Parts</span>
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              High-performance parts for Japanese, European & South African models. Check stock with one tap on WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Kadoma HQ & Harare Warehouse Stock Live</span>
          </div>
        </div>

        {/* Search & Brand Filter Bar */}
        <div className="bg-[#0b1b3e] border border-blue-800 rounded-2xl p-4 mb-8 space-y-3 shadow-xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by part name, brand, or model (e.g. Hilux, brake pads, timing chain)..."
                className="w-full bg-[#07132c] text-sm text-white placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-blue-700/60 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-300 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Brand Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1 mr-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-red-400" /> Filter:
              </span>
              {brandOptions.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition shrink-0 cursor-pointer ${
                    selectedBrand === brand
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-[#07132c] text-slate-200 hover:bg-blue-900/60 border border-blue-800'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Tabs (5 Required Tabs Styled with Blue & Red) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-black transition-all text-left border cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-400 shadow-xl shadow-blue-950 transform -translate-y-0.5 ring-2 ring-blue-400/30'
                    : 'bg-[#0a1838] text-slate-200 border-blue-900/80 hover:bg-[#0e214d] hover:border-blue-700'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-blue-400'}>
                  {getCategoryIcon(cat.iconName)}
                </span>
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Description Banner */}
        {activeCategoryInfo && (
          <div className="mb-8 p-4 rounded-xl bg-[#081736] border border-blue-800/80 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <p className="text-xs sm:text-sm text-slate-200 font-semibold">
                {activeCategoryInfo.description}
              </p>
            </div>
            <span className="text-xs font-mono text-blue-300 font-bold">
              Showing {filteredProducts.length} verified products
            </span>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#0a193b] rounded-3xl border border-blue-800 px-4">
            <div className="w-14 h-14 rounded-full bg-blue-950 text-blue-300 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No products found for this search</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 mb-4">
              We frequently stock specialized parts at our Kadoma HQ or can airfreight within days.
            </p>
            <button
              onClick={() => onSelectForInquiry(searchQuery ? `Custom Inquiry: ${searchQuery}` : '')}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-black uppercase tracking-wider text-white shadow-lg cursor-pointer"
            >
              Submit Custom Part Inquiry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-[#0b1b3e] hover:bg-[#0f2452] border border-blue-800/80 hover:border-red-500 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Top Badges & Origin */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2.5 rounded-xl bg-[#07132c] border border-blue-700/60 group-hover:border-red-500/60 transition-colors">
                        {getProductIcon(product.icon)}
                      </div>
                      {product.origin && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-200 border border-blue-700">
                          {product.origin} Sourced
                        </span>
                      )}
                    </div>

                    {product.badge && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600 text-white shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Name */}
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-blue-200 transition-colors">
                    {product.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                    {product.shortDescription}
                  </p>

                  {/* Details / OEM Spec */}
                  {product.details && (
                    <p className="text-[11px] text-blue-200/80 mt-2 pt-2 border-t border-blue-900/60">
                      {product.details}
                    </p>
                  )}

                  {/* Supported Brands Badges */}
                  <div className="mt-4">
                    <span className="text-[10px] font-extrabold text-blue-300 uppercase tracking-wider block mb-1.5">
                      Fits Vehicle Makes:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.supportedBrands.map((brand) => (
                        <span
                          key={brand}
                          className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-[#07132c] text-white border border-blue-700/60"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-blue-900/80 space-y-2">
                  {/* WhatsApp Direct Inquire Button */}
                  <button
                    onClick={() => handleWhatsAppInquiry(product)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition shadow-md shadow-blue-950 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-300" />
                    <span>Inquire on WhatsApp</span>
                  </button>

                  {/* Alternative Form Request */}
                  <button
                    onClick={() => onSelectForInquiry(product.name)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-blue-900/60 border border-blue-800 transition cursor-pointer"
                  >
                    <Wrench className="w-3.5 h-3.5 text-red-400" />
                    <span>Complete Part Inquiry Form</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Catalog Banner in Blue & Red */}
        <div className="mt-12 bg-gradient-to-r from-blue-950 via-[#0b1c44] to-red-950/60 border-2 border-blue-700/60 rounded-3xl p-6 text-center shadow-xl">
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-base sm:text-lg font-black text-white uppercase">
              Need a rare part or complete engine rebuild kit?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Provide your vehicle chassis/VIN or engine number and our technical counter in Kadoma & Harare will check electronic catalogs immediately.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onSelectForInquiry('')}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-black uppercase tracking-wider text-white shadow-lg cursor-pointer"
              >
                Send Chassis / Part Request
              </button>
              <a
                href={buildWhatsAppUrl(BUSINESS_INFO.primaryCleanPhone, "Hi, I have a vehicle VIN number and need assistance finding the right spare part.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-white text-[#0f296b] hover:bg-slate-100 text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Instant VIN Verification</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

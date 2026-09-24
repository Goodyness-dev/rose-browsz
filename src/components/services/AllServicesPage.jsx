import React, { useState, useEffect } from 'react';
import { 
  SERVICES, 
  SERVICE_CATEGORIES 
} from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AllServicesPage({ onOpenWizard, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'All Services' || service.category === selectedCategory;
    const title = service.title || service.name || '';
    const desc = service.description || service.shortDesc || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-black py-10 sm:py-16 px-4 sm:px-6 lg:px-8 pb-28 sm:pb-20 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Back Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-neutral-800 mb-12">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-sm sm:text-base font-bold text-gray-700 dark:text-neutral-300 hover:text-shop-red transition cursor-pointer"
          >
            <span>← Back to Home</span>
          </button>

          <div className="flex items-center space-x-3 text-sm sm:text-base">
            <span className="text-gray-500 dark:text-neutral-400 hidden sm:inline">Have questions?</span>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="text-gray-900 dark:text-white font-bold hover:text-shop-red flex items-center space-x-1.5 transition font-mono"
              aria-label={`Call ${BUSINESS_INFO.name}: ${BUSINESS_INFO.phone}`}
            >
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl sm:text-6xl font-black font-heading text-gray-900 dark:text-white tracking-tight">
            All {SERVICES.length} PMU Procedures & Academy Courses
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 mt-4 text-base sm:text-xl leading-relaxed">
            Explore our machine nano brow, ombre powder, lip blush, and PMU artist certification programs in Roseville, CA.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-12 bg-white dark:bg-[#0c0c0c] p-6 sm:p-8 rounded-3xl border-2 border-gray-200/90 dark:border-neutral-800 card-thick transition-colors">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 w-full md:w-auto justify-center md:justify-start">
            {SERVICE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-[#161616] text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#202020]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 transition"
              aria-label="Search PMU treatments and academy courses"
            />
          </div>
        </div>

        {/* Count */}
        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mb-6 px-1 font-medium">
          <span>Showing {filteredServices.length} of {SERVICES.length} treatments</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-rose-500 underline font-bold cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const numStr = (index + 1).toString().padStart(2, '0');

            return (
              <article
                key={service.id}
                className="group bg-white dark:bg-[#0c0c0c] border-2 border-gray-200/90 dark:border-neutral-800 hover:border-rose-500/50 rounded-3xl p-8 sm:p-9 transition-all card-thick-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-extrabold text-neutral-400 dark:text-neutral-600 group-hover:text-rose-500 transition-colors">
                      // {numStr}
                    </span>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-gray-100 dark:bg-[#161616] text-gray-600 dark:text-neutral-300">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors mb-3">
                    {service.title || service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
                    {service.description || service.shortDesc}
                  </p>
                </div>

                <div className="space-y-2 pt-4">
                  <a
                    href={BUSINESS_INFO.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm sm:text-base font-bold transition-all flex items-center justify-between shadow-sm active:scale-95 cursor-pointer card-thick"
                  >
                    <span>Book On GlossGenius</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform">↗</span>
                  </a>
                  <button
                    onClick={() => onOpenWizard(service.category, service.title || service.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-[#1f1f1f] text-gray-700 dark:text-neutral-300 border border-gray-200 dark:border-neutral-800 text-xs font-semibold transition"
                  >
                    Custom Consultation Inquiry
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-[#0c0c0c] rounded-3xl border border-gray-200 dark:border-neutral-800 my-8">
            <p className="text-gray-500 dark:text-neutral-400 text-base sm:text-lg mb-4">No treatments found for "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All Services'); }}
              className="text-sm sm:text-base text-rose-500 underline font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-16 bg-white dark:bg-[#0c0c0c] border-2 border-gray-200/90 dark:border-neutral-800 rounded-3xl p-9 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 card-thick transition-colors">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white">
              Ready for your brow transformation?
            </h4>
            <p className="text-gray-600 dark:text-neutral-400 text-base sm:text-lg">
              Whether you desire hyper-realistic nano strokes, an ombre powder refresh, or want to become a certified PMU artist, Jess is here to guide you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto shrink-0">
            <a
              href={BUSINESS_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base transition-all shadow-md active:scale-95 text-center cursor-pointer card-thick"
            >
              Book On GlossGenius ↗
            </a>
            <button
              onClick={onBackToHome}
              className="px-6 py-4 rounded-xl bg-gray-100 dark:bg-[#161616] hover:bg-gray-200 dark:hover:bg-[#202020] text-gray-800 dark:text-neutral-200 font-bold text-base transition text-center border border-transparent dark:border-neutral-800 cursor-pointer"
              aria-label="Navigate back to homepage"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

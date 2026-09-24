import React from 'react';
import { AMENITIES } from '../../data/amenitiesData';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AmenitiesSection({ onOpenWizard }) {
  return (
    <section id="amenities" className="py-20 sm:py-24 bg-white dark:bg-black transition-colors" aria-labelledby="amenities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Technology & Comfort Feature */}
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-neutral-800 relative group">
              <img
                src="/images/studio-interior.jpg"
                alt={`Tranquil private PMU aesthetic suite at ${BUSINESS_INFO.name} in Roseville, CA`}
                loading="lazy"
                decoding="async"
                width="640"
                height="400"
                className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                  Private Aesthetic Suite
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-editorial">Tranquil Studio Sanctuary</h4>
                <p className="text-white/85 text-xs sm:text-sm mt-1">Ergonomic memory foam treatment beds, half-moon arch lighting, and soothing audio.</p>
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border-2 border-slate-200/90 dark:border-neutral-800 card-thick-hover">
              <span className="font-mono text-xs font-bold text-rose-600 block mb-1.5">// CLIENT COMFORT & SAFETY</span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-editorial">
                Pain-Free, Relaxing Permanent Makeup Experience
              </h3>
              <p className="text-gray-600 dark:text-neutral-300 text-sm sm:text-base mt-3 leading-relaxed">
                We believe permanent makeup appointments should be calm, comfortable, and empowering. Enjoy hospital-grade barrier protection, sterile single-use micro-needles, dual-phase topical numbing, and step-by-step custom mapping before pigment application.
              </p>
            </div>
          </div>

          {/* Right: Numbered PMU Features Grid */}
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-bold text-rose-600 uppercase tracking-wider mb-3">
              <span className="font-mono font-bold text-rose-600">// MASTER PMU STANDARDS</span>
            </div>

            <h2 id="amenities-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-gray-900 dark:text-white tracking-tight mb-3">
              Why Roseville & Sacramento Choose {BUSINESS_INFO.name}
            </h2>
            <p className="text-gray-600 dark:text-neutral-400 text-base sm:text-lg mb-8">
              Recognized Li Pigments Global PRO Artist credentials, over 1,200+ healed client transformations, and accredited hands-on academy training.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {AMENITIES.map((feature, idx) => {
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-3xl border-2 border-slate-200/80 dark:border-neutral-800/90 hover:border-rose-500 bg-white dark:bg-neutral-900 card-thick-hover"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-rose-600">// 0{idx + 1}</span>
                      <span className="text-neutral-400 font-mono text-xs">→</span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1.5">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenWizard()}
                className="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 cursor-pointer"
                aria-label={`Book a consultation at ${BUSINESS_INFO.name}`}
              >
                Request Brow Consultation
              </button>
              <a
                href="/#/services"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold text-sm sm:text-base transition-all active:scale-95 cursor-pointer"
              >
                Request a visit →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

const SHOWCASE_ITEMS = [
  {
    image: '/images/nano-strokes.jpg',
    category: 'Signature PMU',
    title: 'Machine Nano Hairstrokes',
    description: 'Hyper-realistic featherweight machine hair strokes custom-mapped to facial anatomy with zero cutting or scar tissue.',
  },
  {
    image: '/images/lip-blush.jpg',
    category: 'Permanent Cosmetics',
    title: 'Aquarelle Lip Blush Studio',
    description: 'Soft rosy nude tint restoring vermilion definition, symmetry, and youthful fullness with custom Li Pigments.',
  },
  {
    image: '/images/academy-kit.jpg',
    category: 'PMU Academy',
    title: 'Certified PMU Masterclasses',
    description: 'Intensive 1-on-1 hands-on training, complete wireless machine student kit, Li Pigments, and live model supervision.',
  },
  {
    image: '/images/studio-interior.jpg',
    category: 'Roseville Studio Suite',
    title: '973 Pleasant Grove Blvd Suite',
    description: 'Boutique aesthetic suite featuring ergonomic treatment beds, hospital-grade sterilization, and glam brow lighting.',
  }
];

export default function ShowcaseSection({ onOpenWizard }) {
  return (
    <section className="py-20 sm:py-28 bg-neutral-50/50 dark:bg-black sana-grid-bg transition-colors" aria-labelledby="showcase-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-neutral-200/70 dark:border-neutral-800/70 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="sana-tag">// 03 STUDIO SPACES & ARTISTRY</span>
            <h2 id="showcase-heading" className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
              Inside Roseville's <br />
              <span className="text-stroke text-stroke-black">Premier PMU Studio.</span>
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed">
            Tour our private aesthetic sanctuary on Pleasant Grove Blvd in Roseville, CA. Where medical-grade safety meets high-fashion brow artistry.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOWCASE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onOpenWizard(item.title, item.category)}
              className="card-thick-hover rounded-3xl overflow-hidden bg-white dark:bg-neutral-950 border-2 border-neutral-200/90 dark:border-neutral-800/90 group cursor-pointer flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-950/60 backdrop-blur-xs text-[10px] font-mono tracking-wider uppercase border border-rose-500/40 text-rose-300">
                    {item.category}
                  </span>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-200 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Meta Footer */}
              <div className="p-5 flex items-center justify-between text-xs font-semibold text-neutral-600 dark:text-neutral-400 mt-auto">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Jessica | Master PMU</span>
                </span>
                <span className="group-hover:text-rose-500 font-bold uppercase tracking-wider transition-colors text-[11px]">
                  Book Now →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ReviewsSection({ onOpenWizard }) {
  // Primary highlighted editorial quote
  const spotlightReview = BUSINESS_INFO.reviews[0] || {
    author: 'Kaitlyn M.',
    location: 'Roseville, CA',
    comment: 'Jess is genuinely an artist! My nano machine brows look so natural that people honestly think I was born with full feathered brows. Zero pain and the healed results are unreal.',
    date: 'Verified Client'
  };


  const otherReviews = BUSINESS_INFO.reviews.slice(1, 4);

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white dark:bg-black sana-grid-bg transition-colors" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18 border-b border-neutral-200/70 dark:border-neutral-800/70 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="sana-tag">// 05 CLIENT EXPERIENCES & REVIEWS</span>
            <h2 id="reviews-heading" className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
              Real Brows, <br />
              <span className="text-stroke text-stroke-black">Healed Realism.</span>
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex text-amber-500 text-lg">
              {'★★★★★'.split('').map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <div className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white">
              5.0 Star Verified Rating • 8.8K+ Community
            </div>
          </div>
        </div>

        {/* Signature Editorial Hero Quote Block */}
        <div className="relative rounded-3xl p-9 sm:p-16 bg-neutral-100 dark:bg-neutral-900 border-2 border-neutral-200/90 dark:border-neutral-800 card-thick mb-12">
          {/* Giant decorative quotation mark */}
          <div className="font-serif text-6xl sm:text-8xl text-rose-300 dark:text-rose-950 leading-none select-none mb-2" aria-hidden="true">
            “
          </div>

          <p className="font-editorial text-xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-white leading-relaxed tracking-tight mb-8">
            {spotlightReview.comment || spotlightReview.text}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/80">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-sm font-editorial shadow-sm">
                {spotlightReview.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-editorial font-bold text-sm sm:text-base text-neutral-950 dark:text-white">
                  {spotlightReview.author}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {spotlightReview.location || 'Roseville, CA'} • Verified PMU Client
                </p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200 dark:border-rose-800">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Verified Healed Transformation</span>
            </div>
          </div>
        </div>

        {/* Secondary Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {otherReviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-8 sm:p-9 bg-neutral-50 dark:bg-neutral-900/50 border-2 border-neutral-200/90 dark:border-neutral-800 card-thick-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500 text-sm">
                    {'★★★★★'.split('').map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-rose-500">
                    {rev.source || 'Instagram / Google'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic mb-6">
                  "{rev.comment || rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-neutral-950 dark:text-white block">{rev.author}</span>
                  <span className="text-neutral-400 text-[11px]">{rev.location || 'Roseville, CA'}</span>
                </div>
                <span className="text-neutral-400 text-[11px]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={BUSINESS_INFO.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 inline-block cursor-pointer card-thick"
          >
            Book Your Transformation on GlossGenius →
          </a>
        </div>

      </div>
    </section>
  );
}

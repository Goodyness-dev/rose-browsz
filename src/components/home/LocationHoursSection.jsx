import React from 'react';
import { BUSINESS_INFO, isOpenNow } from '../../data/businessData';

export default function LocationHoursSection({ onOpenWizard }) {
  const shopOpen = isOpenNow();
  const currentDayIndex = new Date().getDay();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[currentDayIndex];

  return (
    <section id="location" className="scroll-mt-20 py-20 sm:py-28 bg-neutral-50/50 dark:bg-black sana-grid-bg transition-colors relative" aria-labelledby="location-heading">
      <div id="contact" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18 border-b border-neutral-200/70 dark:border-neutral-800/70 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="sana-tag">// 06 VISIT THE STUDIO, HOURS & BOOKING</span>
            <h2 id="location-heading" className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
              973 Pleasant Grove Blvd, <br />
              <span className="text-stroke text-stroke-black">Roseville, CA.</span>
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed">
            Conveniently situated in Suite #130 on Pleasant Grove Blvd in Roseville, CA with easy highway access, ample boutique parking, and private consultation suites.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Hours & Contact Card */}
          <div className="lg:col-span-5 bg-white dark:bg-neutral-900 border-2 border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-8 sm:p-11 space-y-6 card-thick flex flex-col justify-between transition-colors">
            <div>
              {/* Open/Closed Status Badge */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 mb-6">
                <div className="flex items-center space-x-3.5">
                  <span className={`w-3 h-3 rounded-full ${shopOpen ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'}`} aria-hidden="true" />
                  <div>
                    <span className={`font-bold text-sm sm:text-base block ${shopOpen ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-600 dark:text-neutral-400'}`}>
                      {shopOpen ? 'Studio Open Now' : 'Studio Currently Closed'}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Today is {currentDayName}</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider">// TUE-SAT</span>
              </div>

              {/* Hours Table */}
              <div>
                <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-3">
                  Studio & Academy Hours
                </h3>
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs sm:text-sm">
                  {BUSINESS_INFO.hours.map((h) => {
                    const isToday = h.day.toLowerCase() === currentDayName.toLowerCase();
                    const hoursString = h.hours || (h.open === 'Closed' ? 'Closed' : `${h.open} – ${h.close}`);
                    const isClosed = hoursString.toLowerCase().includes('closed');

                    return (
                      <div
                        key={h.day}
                        className={`flex items-center justify-between py-2.5 ${isToday ? 'font-bold text-neutral-950 dark:text-white' : 'text-neutral-600 dark:text-neutral-400'}`}
                      >
                        <span className="flex items-center space-x-2">
                          <span>{h.day}</span>
                          {isToday && (
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          )}
                        </span>
                        <span className={`font-mono text-xs ${isClosed ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-900 dark:text-neutral-200'}`}>
                          {hoursString}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Address & Quick Actions */}
            <div className="space-y-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-800">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 block mb-1">
                  Studio Location
                </span>
                <p className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                  973 Pleasant Grove Blvd, Suite #130, Roseville, CA 95678
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Placer County • Instagram: @rose.browsz • 8.8K+ Followers
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={BUSINESS_INFO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center transition card-thick"
                >
                  <span>Request a visit ↗</span>
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="py-3 px-5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center transition"
                >
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Google Map & Exterior Card */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-neutral-200/90 dark:border-neutral-800 card-thick relative min-h-[420px] bg-neutral-100 dark:bg-neutral-900 flex flex-col">
            <iframe
              title="Rose Browsz Roseville CA Google Map"
              src={BUSINESS_INFO.googleMapsEmbedUrl}
              className="w-full h-full min-h-[360px] lg:min-h-[420px] border-0 grayscale dark:invert dark:hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                Serving Roseville, Rocklin, Granite Bay, Lincoln, Loomis, Folsom & Sacramento, CA
              </span>
              <a
                href={BUSINESS_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-rose-500 hover:underline inline-flex items-center space-x-1"
              >
                <span>Open in Maps ↗</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

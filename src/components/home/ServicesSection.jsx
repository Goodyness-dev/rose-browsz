import React from 'react';
import { SERVICES } from '../../data/servicesData';
import { BUSINESS_INFO } from '../../data/businessData';

export default function ServicesSection({ onOpenWizard, onViewAllServices }) {
  // Key featured treatments mapped to SANA 01, 02, 03, 04 format
  const bentoServices = [
    {
      num: '01',
      title: 'Machine Nano Hairstrokes',
      category: 'Signature PMU Brows',
      tag: 'Hyper-Realistic Realism',
      desc: 'Ultra-fine 0.18mm single needle precision depositing Li Pigments to mimic individual brow hairs with zero cutting, blade trauma, or scarring.',
      features: ['Single-needle digital machine technique', 'Ideal for all skin types (even oily/sensitive)', 'Custom bone structure & arch mapping'],
      popular: true,
    },
    {
      num: '02',
      title: 'Signature Ombré Powder',
      category: 'Signature PMU Brows',
      tag: 'Airbrushed Velvet Finish',
      desc: 'Soft, airy gradient eyebrow transitioning from a sheer bulb to a velvety, high-definition tail. Waterproof, sweatproof, and lasts 2 to 3 years.',
      features: ['Pixelated powder makeup finish', 'Longest lasting brow technique (2-3+ yrs)', 'Zero daily eyebrow makeup required'],
      popular: true,
    },
    {
      num: '03',
      title: 'Aquarelle Lip Blush',
      category: 'Permanent Cosmetics',
      tag: 'Fullness & Subtle Tint',
      desc: 'Sheer wash of custom-blended Li Pigments defining the vermilion border, balancing cool tones, and restoring youthful rosy symmetry.',
      features: ['Natural nude, peach & berry blush tones', 'Dark lip neutralization available', 'Smudge-proof & kiss-proof everyday wear'],
      popular: false,
    },
    {
      num: '04',
      title: 'PMU Academy Certification',
      category: 'PMU Academy & Training',
      tag: 'Hands-On Artist Training',
      desc: 'Hands-on masterclass curriculum led directly by Li Pigments Global PRO Jess. Complete wireless machine student kit, live model work, and licensing prep.',
      features: ['Full professional student machine kit included', 'Live model supervised practice', 'Lifetime mentorship & business launch guide'],
      popular: true,
    }
  ];

  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28 bg-white dark:bg-black sana-grid-bg transition-colors" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18 border-b border-neutral-200/70 dark:border-neutral-800/70 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="sana-tag">// 02 SIGNATURE PMU & ACADEMY</span>
            <h2 id="services-heading" className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
              Architectural Beauty, <br />
              <span className="text-stroke text-stroke-black">Engineered To Heal.</span>
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed">
            Every face has unique facial symmetry and undertones. Jessica utilizes machine-led precision and Li Pigments color theory to deliver brows and lips that heal softly.
          </p>
        </div>

        {/* Bento Grid (01, 02, 03, 04) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {bentoServices.map((service) => (
            <article
              key={service.num}
              onClick={() => onOpenWizard(service.category, service.title)}
              className="group relative rounded-3xl p-8 sm:p-11 bg-white dark:bg-[#0e0e0e] border-2 border-neutral-200/90 dark:border-neutral-800/90 hover:border-rose-500 dark:hover:border-rose-500 cursor-pointer flex flex-col justify-between card-thick-hover"
            >
              <div>
                {/* Number & Tag Bar */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl sm:text-5xl font-extrabold text-neutral-300 dark:text-neutral-700 group-hover:text-rose-500 transition-colors">
                    {service.num}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 shadow-2xs">
                      {service.tag}
                    </span>
                    {service.popular && (
                      <span className="px-3 py-1.5 rounded-full text-[11px] uppercase tracking-widest font-extrabold bg-rose-600 text-white shadow-sm shadow-rose-600/30">
                        Signature
                      </span>
                    )}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mb-3 group-hover:text-rose-500 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {service.desc}
                </p>

                {/* Feature checklist */}
                <ul className="space-y-2.5 mb-8 border-t border-neutral-200/60 dark:border-neutral-800/60 pt-5">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      <span className="w-2 h-2 rounded-full bg-rose-500 mr-3 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Action Button */}
              <div className="flex items-center justify-between pt-5 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {service.category}
                </span>
                <span className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-neutral-950 dark:text-white group-hover:text-rose-500 transition-colors">
                  <span>View Details & Consult</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Clinical Quality & Performance Standards */}
        <div className="rounded-3xl p-8 sm:p-12 bg-white dark:bg-[#0c0c0c] border-2 border-neutral-200/90 dark:border-neutral-800 mb-14 card-thick">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-2">
              <span className="sana-tag">// CLINICAL PMU STANDARDS</span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                Engineered for Long-Term Healed Retention
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
                As a Li Pigments Global PRO Artist, Jessica formulates custom pigment blends tailored to your skin undertones, preventing unnatural gray, blue, or reddish shifts over time.
              </p>
            </div>

            {/* Metric Bars */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                  <span>Li Pigments True-to-Color Healed Retention</span>
                  <span className="font-mono text-rose-500">98.6%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div className="h-full rounded-full bg-rose-600" style={{ width: '98.6%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                  <span>Pain-Free Comfort Rating (Medical-Grade Numbing)</span>
                  <span className="font-mono text-rose-500">99.2%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div className="h-full rounded-full bg-neutral-900 dark:bg-white" style={{ width: '99.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                  <span>5-Star Client Satisfaction (1,500+ Healed Results)</span>
                  <span className="font-mono text-rose-500">100%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div className="h-full rounded-full bg-rose-600" style={{ width: '100%' }} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* View All Treatments CTA */}
        <div className="text-center">
          <button
            onClick={onViewAllServices}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            aria-label={`Explore all ${SERVICES.length} PMU procedures and academy courses`}
          >
            <span>Explore All {SERVICES.length} PMU Procedures & Academy Courses →</span>
          </button>
        </div>

      </div>
    </section>
  );
}

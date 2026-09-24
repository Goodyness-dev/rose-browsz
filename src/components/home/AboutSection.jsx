import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AboutSection({ onOpenWizard, onNavigateToAbout }) {
  const artists = [
    {
      name: 'Jessica (Jess Jay)',
      title: 'Founder • Master PMU Brow Artist & Lead Educator',
      education: 'Li Pigments Global PRO Artist (2024 & 2025) • Bloodborne Pathogens Certified',
      badge: 'Master Artist & Educator',
      image: '/images/jess-profile.jpg',
      bio: 'Recognized globally by Li Pigments as an industry leader in color theory and micro-pigmentation. With over 7 years perfecting machine nano hair strokes and ombre shading in Roseville, Jess has performed 1,500+ procedures and trained dozens of successful artists.'
    },
    {
      name: 'Rose Browsz Academy Team',
      title: 'Certified PMU Mentors & Studio Specialists',
      education: 'Placer County Health Dept Licensed • Sterile Single-Use Safety Protocol',
      badge: 'Certified Academy',
      image: '/images/academy-kit.jpg',
      bio: 'Dedicated to empowering the next generation of PMU entrepreneurs. Our private apprenticeships and small-group masterclasses provide complete rotary machine student kits, live model practice, and lifelong business coaching.'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0a0a0a] text-white transition-colors relative overflow-hidden" aria-labelledby="about-heading">
      {/* Background vertical lines in subtle dark mode */}
      <div className="absolute inset-0 sana-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold text-rose-400">// 04 MEET JESSICA & THE ACADEMY</span>
            <h2 id="about-heading" className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Artistry Rooted In <br />
              <span className="text-stroke text-stroke-light" style={{ WebkitTextStroke: '1.5px #ffffff' }}>Precision & Passion.</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed">
            Welcome to Rose Browsz & Beauty Academy. Master PMU brow artist Jessica combines clinical safety, advanced pigment retention, and artistic symmetry in Roseville, CA.
          </p>
        </div>

        {/* Artist Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {artists.map((doc, idx) => (
            <div 
              key={idx}
              className="rounded-3xl p-8 sm:p-11 bg-neutral-950 border-2 border-neutral-800/90 hover:border-neutral-700 card-thick-hover flex flex-col sm:flex-row gap-6 items-start"
            >
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border border-neutral-700">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute bottom-1.5 left-1.5 right-1.5 px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider text-center bg-black/85 backdrop-blur-xs text-rose-300 border border-rose-500/30">
                  {doc.badge}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-rose-500 font-bold uppercase tracking-wider mt-0.5">
                    {doc.title}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    {doc.education}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {doc.bio}
                </p>

                <div className="pt-2">
                  <a
                    href={BUSINESS_INFO.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                  >
                    <span>Book Session With Jess →</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Heritage & Founder Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-9 sm:p-12 bg-neutral-950 border-2 border-neutral-800/90 card-thick">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-bold text-rose-400 uppercase tracking-wider font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Li Pigments Global PRO 24 & 25</span>
            </div>
            
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
              Roseville's PMU Authority
            </h3>

            <blockquote className="border-l-2 border-rose-600 pl-4 py-1 text-sm italic text-neutral-300">
              "{BUSINESS_INFO.owner.quote}"
              <footer className="text-xs font-bold text-rose-500 mt-2 not-italic">
                — {BUSINESS_INFO.owner.name}
              </footer>
            </blockquote>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Located at 973 Pleasant Grove Blvd in Roseville, Rose Browsz is designed as a relaxing oasis where every treatment is custom tailored to your facial bone structure and natural undertones. Whether you desire waterproof effortless nano brows or are launching your own PMU business, Jess provides unparalleled expertise.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4 border-t lg:border-t-0 lg:border-l border-neutral-800 pt-6 lg:pt-0 lg:pl-8">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400 mb-4">
              Studio & Academy Timeline
            </h4>
            <div className="space-y-4 mb-6">
              {BUSINESS_INFO.history.map((h, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-xs font-bold text-rose-400 shrink-0">
                    {h.year}
                  </span>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-white">{h.title}</h5>
                    <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 leading-relaxed">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={BUSINESS_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider transition flex items-center space-x-2 cursor-pointer card-thick"
              >
                <span>Book On GlossGenius →</span>
              </a>
              <button
                onClick={() => onOpenWizard("PMU Academy & Training", "Complete PMU Brow Mastery & Certification")}
                className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                <span>Inquire About Academy Courses</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

const CLIENT_GUIDES = [
  {
    title: 'Pre-Procedure Preparation Protocol',
    description: 'Essential 7-day pre-care guidelines (avoiding caffeine, blood thinners, Botox, and active retinols).',
    url: '#',
    type: 'Client Guide'
  },
  {
    title: 'Medical Contraindications & Health History',
    description: 'Skin sensitivity evaluation, allergy assessment, and health contraindication verification.',
    url: '#',
    type: 'Intake Form'
  },
  {
    title: 'Healed Pigment Aftercare Protocol',
    description: 'Day 1–14 day-by-day healing roadmap, washing instructions, and balm application technique.',
    url: '#',
    type: 'Aftercare'
  },
  {
    title: 'Aquarelle Lip Blush Preparation & Pre-Care',
    description: 'Exfoliation, deep hydration routines, and cold sore preventative protocol for lip blush clients.',
    url: '#',
    type: 'Client Guide'
  },
  {
    title: 'PMU Academy Syllabus & Starter Kit Manifest',
    description: 'Complete curriculum for 3-Day Nano Brows & Ombré Powder certifications with Li Pigments PRO kit.',
    url: '#',
    type: 'Academy Syllabus'
  }
];

export default function AboutPracticePage({ onOpenWizard, onBackToHome }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black sana-grid-bg transition-colors pb-24">
      
      {/* Breadcrumb Header */}
      <div className="border-b border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/70 dark:bg-neutral-900/50 backdrop-blur-sm sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
            <button 
              onClick={onBackToHome}
              className="hover:text-rose-600 transition font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <span>← Back to Home</span>
            </button>
            <span className="text-neutral-400">/</span>
            <span className="font-bold text-neutral-900 dark:text-white">About Rose Browsz & Academy</span>
          </div>

          <a 
            href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="flex items-center space-x-1.5 font-bold text-rose-600 hover:underline font-mono"
          >
            <span>{BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
        <div className="max-w-4xl space-y-4">
          <span className="sana-tag">// ABOUT THE ARTIST & ACADEMY • ROSEVILLE, CA</span>
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
            Master Brow Artistry, <br />
            <span className="text-stroke text-stroke-black">Globally Recognized Technique.</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed pt-2">
            Led by Master PMU Artist and Educator Jessica, Rose Browsz delivers high-precision machine nano brows, velvet ombré shading, and natural lip blush in Roseville, CA. Recognized as a prestigious <strong>Li Pigments Global PRO Artist for 2024 & 2025</strong>, Jess pairs facial architecture with medical-grade organic pigments to create effortless beauty that heals true to tone.
          </p>
        </div>
      </section>

      {/* Main Narrative & Imagery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-8 text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg">
            
            {/* Story Card 1: Master Technique */}
            <div className="p-9 sm:p-12 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border-2 border-neutral-200/90 dark:border-neutral-800 card-thick space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
                <span>// 01 PHILOSOPHY & ARTISTRY</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                Facial Architecture Over One-Size-Fits-All Stencils
              </h2>
              <p>
                Every face possesses distinct skeletal bone structure, muscle movement, and natural hair growth patterns. At Rose Browsz, we reject rigid cookie-cutter brow stencils. Instead, Jess utilizes caliper-measured <strong>Golden Ratio mapping</strong> to harmonize your arches with your unique facial anatomy.
              </p>
              <p>
                Whether you need featherlight machine nano hair strokes for sparse brows or velvet ombré powder shading for everyday elegance, your custom design is hand-drawn and approved by you before a single pigment droplet enters the dermis.
              </p>
            </div>

            {/* Story Card 2: Li Pigments Global PRO */}
            <div className="p-9 sm:p-12 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border-2 border-neutral-200/90 dark:border-neutral-800 card-thick space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
                <span>// 02 CLINICAL PIGMENT EXCELLENCE</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                Official Li Pigments Global PRO Artist (2024 & 2025)
              </h2>
              <p>
                Poor quality pigments degrade into unnatural blue, gray, or salmon pink tones over time. As an internationally certified <strong>Li Pigments Global PRO Artist</strong>, Jess exclusively utilizes premium, gamma-sterilized, heavy-metal-free cosmetic pigments engineered for stable longevity.
              </p>
              <p>
                Our formulation methodology analyzes your biological skin undertones (warm, cool, neutral, or olive) to formulate bespoke pigment blends that fade naturally without color distortion over 18 to 36 months.
              </p>
            </div>

            {/* Story Card 3: PMU Academy & Student Mentorship */}
            <div className="p-9 sm:p-12 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border-2 border-neutral-200/90 dark:border-neutral-800 card-thick space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
                <span>// 03 THE PMU ACADEMY</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                Accredited 1-on-1 & Small Group Masterclasses
              </h2>
              <p>
                Beyond serving clinical clients, Jess mentors aspiring artists through the <strong>Rose Browsz PMU Academy</strong>. Our intensive curriculum combines skin histology, machine speed control, needle configuration, live model demonstrations, and business scaling guidance.
              </p>
              <p className="font-medium text-neutral-900 dark:text-white">
                Students receive a comprehensive pro starter kit, lifetime post-graduate mentorship, and hands-on confidence to build profitable independent beauty careers.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenWizard()}
                  className="px-7 py-3.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
                >
                  Consultation / Academy Inquiry
                </button>
                <a
                  href="https://rosebrowsz.glossgenius.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Book on GlossGenius →
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Photos, Providers & Info */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Studio Suite Photo Card */}
            <div className="rounded-3xl overflow-hidden border-2 border-neutral-200/90 dark:border-neutral-800 card-thick">
              <img 
                src="/images/studio-interior.jpg" 
                alt="Rose Browsz Aesthetic Suite Roseville CA"
                className="w-full h-72 object-cover"
              />
              <div className="p-7 bg-neutral-50 dark:bg-neutral-900">
                <h3 className="font-editorial font-bold text-lg text-neutral-900 dark:text-white">
                  973 Pleasant Grove Blvd, Ste 130, Roseville, CA
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Private, tranquil aesthetic suite with hospital-grade sanitization, ergonomic memory foam beds, and studio ring lighting.
                </p>
              </div>
            </div>

            {/* Master Artist Profile Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 text-white border-2 border-neutral-800/90 card-thick space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                // MASTER PMU ARTIST & EDUCATOR
              </span>

              {/* Jess */}
              <div className="flex items-center space-x-4 border-b border-neutral-800 pb-5">
                <img 
                  src="/images/jess-profile.jpg" 
                  alt="Jessica Jess Master PMU Artist"
                  className="w-16 h-16 rounded-2xl object-cover border border-neutral-700 shrink-0"
                />
                <div>
                  <h4 className="font-editorial font-bold text-lg text-white">
                    Jessica (Jess)
                  </h4>
                  <p className="text-xs text-rose-500 font-bold uppercase tracking-wider">
                    Founder • Master PMU Artist & Educator
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Li Pigments Global PRO Artist (2024 & 2025)
                  </p>
                </div>
              </div>

              {/* Studio Highlights */}
              <div className="space-y-2 text-xs text-neutral-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Over 1,200+ Healed Brow & Lip Procedures</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>100+ Certified PMU Academy Graduates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Bloodborne Pathogens Certified & County Health Permitted</span>
                </div>
              </div>
            </div>

            {/* Office Hours & Schedule */}
            <div className="p-8 sm:p-9 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border-2 border-neutral-200/90 dark:border-neutral-800 card-thick space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                  Studio Schedule
                </h3>
                <span className="text-xs font-mono text-neutral-400 font-bold">// HOURS</span>
              </div>

              <div className="divide-y divide-neutral-200/60 dark:divide-neutral-800 text-xs sm:text-sm">
                <div className="py-2 flex justify-between">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">Monday:</span>
                  <span className="font-bold text-neutral-500">Closed (Academy Prep)</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">Tuesday:</span>
                  <span className="font-bold text-neutral-900 dark:text-white">9:00 AM – 6:00 PM</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">Wednesday:</span>
                  <span className="font-bold text-neutral-900 dark:text-white">9:00 AM – 6:00 PM</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">Thursday:</span>
                  <span className="font-bold text-neutral-900 dark:text-white">9:00 AM – 6:00 PM</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">Friday:</span>
                  <span className="font-bold text-neutral-900 dark:text-white">9:00 AM – 6:00 PM</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">Saturday:</span>
                  <span className="font-bold text-neutral-900 dark:text-white">10:00 AM – 4:00 PM</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">Sunday:</span>
                  <span className="font-bold text-neutral-500">Closed</span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 space-y-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
                  className="w-full py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center transition font-mono"
                >
                  <span>Text or Call {BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Client Preparation & Academy Manifest */}
      <section id="client-guides" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-3xl p-9 sm:p-14 bg-neutral-100 dark:bg-neutral-900 border-2 border-neutral-200/90 dark:border-neutral-800 card-thick">
          
          <div className="max-w-2xl mb-10 space-y-2">
            <span className="sana-tag">// CLIENT & STUDENT PROTOCOLS</span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white">
              Preparation Protocols & Academy Manifests
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Review our pre-care, healing protocols, and training curriculum guidelines to ensure the best retention and aesthetic outcome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_GUIDES.map((form, idx) => (
              <div
                key={idx}
                className="group p-7 sm:p-8 rounded-2xl bg-white dark:bg-neutral-950 border-2 border-neutral-200/90 dark:border-neutral-800 hover:border-rose-500 transition-all flex flex-col justify-between card-thick-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-rose-50 text-rose-600 border border-rose-200">
                      PROTOCOL
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {form.type}
                    </span>
                  </div>

                  <h3 className="font-editorial font-bold text-base text-neutral-900 dark:text-white group-hover:text-rose-600 transition-colors mb-1.5">
                    {form.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {form.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between text-xs font-bold text-rose-600">
                  <span onClick={() => onOpenWizard()} className="cursor-pointer hover:underline">Request Document Details</span>
                  <span className="font-mono">→</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-3xl p-9 sm:p-14 bg-neutral-950 text-white border-2 border-neutral-800/90 card-thick flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold">
              Ready for your brow transformation or academy certification?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg">
              Experience customized semi-permanent artistry with Jess. Book online instantly through GlossGenius or submit your consultation inquiry.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://rosebrowsz.glossgenius.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
            >
              Book on GlossGenius
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="px-6 py-3.5 rounded-full border border-neutral-700 hover:bg-neutral-900 font-bold text-xs uppercase tracking-wider transition"
            >
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}


import React from 'react';
import SmileScrollHero from './SmileScrollHero';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Hero({ onOpenWizard }) {
  return (
    <div>
      {/* Pinned Interactive GSAP Scroll Lips & Teeth Reveal with Cinematic Video */}
      <SmileScrollHero onOpenWizard={onOpenWizard} />

      {/* Rose Browsz Accreditation & Industry Standards Strip */}
      <section className="bg-white dark:bg-black py-10 border-b border-neutral-200/70 dark:border-neutral-800/70 sana-grid-bg transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] uppercase tracking-[0.25em] font-bold text-neutral-400 dark:text-neutral-500 mb-6">
            Industry Standards & Certified PMU Accreditations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-85 hover:opacity-100 transition-all duration-300">
            <div className="flex items-center space-x-2 font-bold text-sm tracking-wider text-neutral-800 dark:text-neutral-200">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 font-mono border border-rose-300 dark:border-rose-900">LI PIGMENTS</span>
              <span>Global PRO Artist '24 & '25</span>
            </div>
            <div className="flex items-center space-x-2 font-bold text-sm tracking-wider text-neutral-800 dark:text-neutral-200">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 font-mono">BBP</span>
              <span>Bloodborne Pathogens Certified</span>
            </div>
            <div className="flex items-center space-x-2 font-bold text-sm tracking-wider text-neutral-800 dark:text-neutral-200">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 font-mono">ACADEMY</span>
              <span>Accredited Master Trainer</span>
            </div>
            <div className="flex items-center space-x-2 font-bold text-sm tracking-wider text-neutral-800 dark:text-neutral-200">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 font-mono">PLACER CO.</span>
              <span>Dept of Public Health Licensed</span>
            </div>
            <div className="flex items-center space-x-2 font-bold text-sm tracking-wider text-neutral-800 dark:text-neutral-200">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 font-mono border border-rose-300 dark:border-rose-900">8.8K+</span>
              <span>Instagram @rose.browsz</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

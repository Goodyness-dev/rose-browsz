import React from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

export default function Footer({ onOpenWizard, onNavigate, onScrollToSection }) {
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (target === 'services') {
      if (onScrollToSection) onScrollToSection('services');
      else if (onNavigate) onNavigate('services');
      return;
    }

    if (target === 'services-all') {
      if (onNavigate) onNavigate('services');
      return;
    }

    if (target === 'about') {
      if (onNavigate) onNavigate('about');
      return;
    }

    if (target === 'location' || target === 'contact') {
      if (onScrollToSection) onScrollToSection(target);
      return;
    }

    if (onScrollToSection) {
      onScrollToSection(target.replace('#', ''));
    } else if (onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs sm:text-sm pb-16 sm:pb-0 border-t border-neutral-900 sana-grid-bg" role="contentinfo">
      {/* Pre-footer CTA Bar */}
      <div className="border-b border-neutral-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-rose-500">// READY FOR FLAWLESS HEALED BROWS?</span>
            <h3 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              Wake Up With <br />
              <span className="text-stroke" style={{ WebkitTextStroke: '1.5px #ffffff' }}>Effortless Confidence.</span>
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Machine Nano Brows, Ombré Powder, Aquarelle Lip Blush & Accredited Artist Masterclasses in Roseville, CA.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full md:w-auto shrink-0">
            <a
              href={BUSINESS_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 text-center cursor-pointer flex items-center justify-center space-x-2 card-thick"
              aria-label="Book on GlossGenius"
            >
              <span>Book On GlossGenius →</span>
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="px-7 py-4 rounded-full bg-transparent hover:bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider transition border border-neutral-800 flex items-center justify-center space-x-2 active:scale-95 text-center"
              aria-label={`Call Rose Browsz at ${BUSINESS_INFO.phone}`}
            >
              <span>Call {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-mono font-bold text-xs border border-rose-400/40">
              RB
            </div>
            <span className="font-editorial font-bold text-white text-base sm:text-lg tracking-tight">
              ROSE BROWSZ & ACADEMY
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Northern California's premier PMU destination, founded by Li Pigments Global PRO Artist Jessica. Specializing in machine nano hair strokes, soft ombre powder, and certified artist training.
          </p>
          <div className="text-xs text-neutral-500 space-y-1 font-mono">
            <p className="text-rose-400">Li Pigments Global PRO Artist '24 & '25</p>
            <p>5.0 Rating • 8,800+ Instagram Followers</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-4">
            Procedures & Academy
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={(e) => handleLinkClick(e, 'about')}
                className="hover:text-rose-400 transition flex items-center space-x-1.5 cursor-pointer font-bold text-neutral-300"
              >
                <span>Meet Jess & Academy Story →</span>
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleLinkClick(e, 'services-all')}
                className="hover:text-rose-400 transition flex items-center space-x-1.5 cursor-pointer text-neutral-400"
              >
                <span>Full Services & Academy Catalog →</span>
              </button>
            </li>
            {['Machine Nano Brows', 'Signature Ombré Powder', 'Nano Combo Brows', 'Aquarelle Lip Blush', 'PMU Brow Certification'].map((s) => (
              <li key={s}>
                <button
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="hover:text-rose-400 transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>{s}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-4">
            Studio Hours
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Tuesday – Saturday:</span>
              <span className="text-white font-medium font-mono">9:00 AM – 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday:</span>
              <span className="text-neutral-500 font-medium font-mono">Academy Masterclasses</span>
            </div>
            <div className="flex justify-between">
              <span>Monday:</span>
              <span className="text-neutral-500 font-medium font-mono">Private Apprenticeships</span>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-4">
            Studio Location
          </h4>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider font-mono">Address</span>
              <span>{BUSINESS_INFO.address.formatted}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider font-mono">Telephone</span>
              <a href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`} className="hover:text-rose-400 text-neutral-300 font-bold font-mono">
                {BUSINESS_INFO.phone}
              </a>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider font-mono">Instagram</span>
              <a href={BUSINESS_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 text-neutral-300 font-mono">
                @rose.browsz (8.8K+ followers)
              </a>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider font-mono">Email</span>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-rose-400 truncate block font-mono">
                {BUSINESS_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-neutral-900 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} Rose Browsz LLC. All rights reserved. Roseville, CA.</p>
        <p>
          <button 
            onClick={() => onNavigate('admin')} 
            className="text-neutral-500 hover:text-white transition cursor-pointer"
          >
            Studio Management Portal
          </button>
        </p>
      </div>
    </footer>
  );
}

import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../../data/businessData';

function SunIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MenuIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Navbar({ onOpenWizard, currentPage = 'home', onNavigate, onScrollToSection, darkMode, onToggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (target === '#' || target === 'home') {
      if (currentPage !== 'home') {
        if (onNavigate) onNavigate('home');
      } else {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      return;
    }

    if (target === 'services') {
      if (currentPage === 'services') {
        if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (onScrollToSection) {
        onScrollToSection('services');
      } else {
        const el = document.getElementById('services');
        if (window.__lenis && el) {
          window.__lenis.scrollTo(el, { offset: -75, duration: 1.2 });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    if (target === 'services-all') {
      if (onNavigate) onNavigate('services');
      return;
    }

    if (target === 'about') {
      if (onScrollToSection) {
        onScrollToSection('about');
      } else {
        const el = document.getElementById('about');
        if (window.__lenis && el) {
          window.__lenis.scrollTo(el, { offset: -75, duration: 1.2 });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    if (target === 'location') {
      if (onScrollToSection) {
        onScrollToSection('location');
      } else {
        const el = document.getElementById('location');
        if (window.__lenis && el) {
          window.__lenis.scrollTo(el, { offset: -75, duration: 1.2 });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    if (target === 'contact') {
      if (onScrollToSection) {
        onScrollToSection('contact');
      } else {
        const el = document.getElementById('contact') || document.getElementById('location');
        if (window.__lenis && el) {
          window.__lenis.scrollTo(el, { offset: -75, duration: 1.2 });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }
  };

  const navLinks = [
    { name: 'PMU Services', target: 'services', active: currentPage === 'services' },
    { name: 'Meet Jess', target: 'about', active: currentPage === 'about' },
    { name: 'Roseville Studio', target: 'location', active: false },
    { name: 'Reviews', target: 'reviews', active: false },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md shadow-xs py-3 border-b border-neutral-200/80 dark:border-neutral-800/80' 
          : 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xs py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center space-x-3 group"
          aria-label="Rose Browsz & Beauty Academy Home"
        >
          <div className="w-9 h-9 rounded-full bg-rose-600 flex items-center justify-center text-white font-mono font-black text-xs tracking-wider shadow-sm group-hover:scale-105 transition border border-rose-400/40">
            RB
          </div>
          <div>
            <span className="font-heading font-black text-base sm:text-lg tracking-tight text-neutral-950 dark:text-white leading-none block">
              {BUSINESS_INFO.name}
            </span>
            <span className="text-[10px] text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono font-bold block mt-0.5">
              PMU Studio & Academy
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (minimalist pill) */}
        <nav className="hidden md:flex items-center space-x-1 border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 p-1 rounded-full backdrop-blur-xs">
          {navLinks.map((link) => {
            const isActive = link.active;
            return (
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold shadow-xs' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-neutral-800/60'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTAs & Dark Mode Toggle */}
        <div className="hidden md:flex items-center space-x-3.5">
          {/* Dark Mode Toggle Pill */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:border-rose-500 transition cursor-pointer active:scale-95"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="w-4 h-4 text-amber-400" />
            ) : (
              <MoonIcon className="w-4 h-4 text-rose-600" />
            )}
          </button>

          {/* Instagram Link */}
          <a
            href={BUSINESS_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center space-x-1.5 text-neutral-700 dark:text-neutral-200 hover:text-rose-500 text-xs uppercase tracking-wider font-bold transition px-3 py-2 font-mono"
            aria-label="Instagram @rose.browsz"
          >
            <span>{BUSINESS_INFO.instagramHandle}</span>
          </a>

          {/* GlossGenius Direct Booking Button */}
          <a
            href={BUSINESS_INFO.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer card-thick"
          >
            Book On GlossGenius →
          </a>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 text-gray-700 dark:text-neutral-300"
            aria-label="Toggle theme"
          >
            {darkMode ? <SunIcon className="w-4 h-4 text-amber-400" /> : <MoonIcon className="w-4 h-4 text-rose-600" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-black px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.target)}
              className="block w-full text-left py-2 text-base font-bold text-gray-800 dark:text-neutral-200 hover:text-rose-500 cursor-pointer"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={(e) => handleNavClick(e, 'services-all')}
            className="block w-full text-left py-1 text-sm font-semibold text-neutral-500 dark:text-neutral-400 hover:text-rose-500 pl-3 cursor-pointer"
          >
            ↳ All Services & Academy Courses
          </button>
          <div className="pt-3 border-t border-gray-100 dark:border-neutral-800 space-y-3">
            <a
              href={BUSINESS_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 rounded-xl bg-rose-600 text-white font-bold text-sm shadow-md"
            >
              Book On GlossGenius ↗
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white font-bold text-sm font-mono"
            >
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

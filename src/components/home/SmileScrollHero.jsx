import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO } from '../../data/businessData';

gsap.registerPlugin(ScrollTrigger);

export default function SmileScrollHero({ onOpenWizard }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Detect desktop vs mobile for selective video scrubbing vs lightweight instant image fallback
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 768;
  });

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop GSAP Video Scrubbing ScrollTrigger
  useEffect(() => {
    if (!isDesktop) return;

    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    let scrubTrigger;

    const setupScrollAnimation = () => {
      video.currentTime = 0;

      // GSAP ScrollTrigger to smoothly scrub video currentTime across a generous scroll distance on desktop only
      scrubTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=350%',
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Scrub video playback seamlessly
          if (video && video.duration && !video.seeking) {
            const targetTime = Math.min(progress * video.duration, video.duration - 0.05);
            if (Math.abs(video.currentTime - targetTime) > 0.03) {
              video.currentTime = targetTime;
            }
          }

          // Fade out scroll indicator as user begins scrolling
          if (scrollIndicatorRef.current) {
            if (progress > 0.04) {
              scrollIndicatorRef.current.style.opacity = Math.max(0, 1 - (progress - 0.04) * 8).toString();
            } else {
              scrollIndicatorRef.current.style.opacity = '1';
            }
          }

          // Transition top headline subtly as video reaches final white screen
          if (headlineRef.current) {
            if (progress > 0.68) {
              headlineRef.current.style.opacity = Math.max(0, 1 - (progress - 0.68) * 5).toString();
            } else {
              headlineRef.current.style.opacity = '1';
            }
          }

          // Fade in and scale active booking CTA as smile reveals
          if (ctaContainerRef.current) {
            if (progress > 0.42) {
              const ctaProgress = Math.min((progress - 0.42) / 0.25, 1);
              ctaContainerRef.current.style.opacity = ctaProgress.toString();
              ctaContainerRef.current.style.transform = `translateY(${(1 - ctaProgress) * 15}px)`;
              ctaContainerRef.current.style.pointerEvents = 'auto';
            } else {
              ctaContainerRef.current.style.opacity = '0';
              ctaContainerRef.current.style.transform = 'translateY(15px)';
              ctaContainerRef.current.style.pointerEvents = 'none';
            }
          }
        },
      });
    };

    if (video.readyState >= 1) {
      setupScrollAnimation();
    } else {
      video.addEventListener('loadedmetadata', setupScrollAnimation);
    }

    return () => {
      if (scrubTrigger) scrubTrigger.kill();
      video.removeEventListener('loadedmetadata', setupScrollAnimation);
    };
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${isDesktop ? 'h-screen overflow-hidden' : 'min-h-[100svh] py-16'} bg-neutral-950 text-white select-none`}
      aria-label="Rose Browsz PMU Brow Transformation & Beauty Academy"
    >
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {isDesktop ? (
          // Desktop: Cinematic Video scrubbed via GSAP ScrollTrigger
          <>
            <video
              ref={videoRef}
              src="/A_cinematic_second_beauty_ad.mp4"
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center opacity-100"
            />
            <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          </>
        ) : (
          // Mobile: High-Speed Cinematic Poster Fallback (zero video load, zero touch-scroll lag)
          <>
            <img
              src="/images/hero-brows.jpg"
              alt="Rose Browsz Permanent Makeup and Nano Brow Artistry"
              fetchPriority="high"
              className="w-full h-full object-cover object-center brightness-90 contrast-105"
            />
            {/* Multi-layered cinematic gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/55 to-black/75 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/85 pointer-events-none" />
          </>
        )}
      </div>

      {/* Foreground Content Wrapper */}
      {isDesktop ? (
        // Desktop Layout (Interactive progressive scroll reveal)
        <div className="relative z-10 w-full h-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pointer-events-none">
          {/* Top Headline & Branding */}
          <div
            ref={headlineRef}
            className="max-w-4xl mx-auto text-center space-y-3 transition-opacity duration-300 pt-4"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-rose-500/30 text-[11px] font-bold tracking-[0.2em] uppercase text-rose-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>// 01 LI PIGMENTS GLOBAL PRO • 8.8K+ COMMUNITY • ROSEVILLE, CA</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Architectural Brows, <br />
              <span className="text-stroke" style={{ WebkitTextStroke: '1.5px #ffffff' }}>Flawless Healed Realism.</span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-xl mx-auto leading-relaxed font-medium">
              Roseville's premier permanent makeup studio & academy. Specializing in machine Nano Brows, velvet Ombré Powder, Aquarelle Lip Blush, and accredited artist certifications.
            </p>
          </div>

          {/* Center / Lower Third Interactive Action Buttons */}
          <div
            ref={ctaContainerRef}
            className="max-w-xl mx-auto text-center space-y-3.5 opacity-0 transform translate-y-4 transition-all duration-300 pointer-events-none"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pointer-events-auto">
              <a
                href={BUSINESS_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-2xl border border-rose-400/40 active:scale-95 cursor-pointer card-thick-hover"
                aria-label="Request a visit"
              >
                <span>Request a visit →</span>
              </a>

              <button
                onClick={() => onOpenWizard()}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/95 hover:bg-white text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition active:scale-95 card-thick-hover"
              >
                <span>Custom Consultation</span>
              </button>
            </div>

            <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-neutral-200 font-medium">
              <span className="text-amber-400 tracking-wider">★★★★★</span>
              <span>5.0 Verified • Li Pigments Global PRO • 1,500+ Happy Clients</span>
            </div>
          </div>

          {/* Bottom Scroll Prompt */}
          <div
            ref={scrollIndicatorRef}
            className="flex flex-col items-center space-y-1 text-[11px] uppercase tracking-[0.25em] font-bold text-neutral-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pb-2 transition-opacity duration-300 font-mono"
          >
            <span>Scroll to explore treatments ↓</span>
          </div>
        </div>
      ) : (
        // Mobile Layout: Instant presentation with fully interactive CTAs, no scroll trapping
        <div className="relative z-10 w-full min-h-[100svh] flex flex-col justify-between items-center px-4 py-8 text-center">
          {/* Top Tag */}
          <div className="pt-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-rose-500/30 text-[10px] font-bold tracking-[0.18em] uppercase text-rose-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>// 01 ROSEVILLE, CA • 8.8K+ COMMUNITY</span>
            </div>
          </div>

          {/* Middle Body & Value Proposition */}
          <div className="my-auto py-8 space-y-4 max-w-lg">
            <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.12] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Architectural Brows, <br />
              <span className="text-stroke" style={{ WebkitTextStroke: '1.2px #ffffff' }}>Flawless Realism.</span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed font-medium px-2">
              Roseville's premier PMU brow studio & academy. Machine Nano Brows, Ombré Powder, Aquarelle Lip Blush, and accredited 1-on-1 artist certifications.
            </p>

            {/* Mobile Immediate CTAs */}
            <div className="pt-4 flex flex-col gap-3 w-full max-w-xs mx-auto">
              <a
                href={BUSINESS_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-2xl transition active:scale-95 cursor-pointer card-thick"
                aria-label="Request a visit"
              >
                Request a visit →
              </a>

              <button
                onClick={() => onOpenWizard()}
                className="w-full px-6 py-3.5 rounded-full bg-black/75 backdrop-blur-md hover:bg-black text-white font-bold text-xs uppercase tracking-wider border border-white/30 shadow-xl transition active:scale-95"
              >
                Custom Consultation
              </button>
            </div>

            {/* Mobile Social Proof Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] text-neutral-200 font-medium">
                <span className="text-amber-400 tracking-wider">★★★★★</span>
                <span>5.0 Rating • Li Pigments Global PRO • 7+ Yrs</span>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Guidance */}
          <div className="pb-2 flex flex-col items-center space-y-1 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 font-mono">
            <span className="animate-bounce">↓</span>
            <span>Scroll for services & academy</span>
          </div>
        </div>
      )}
    </section>
  );
}

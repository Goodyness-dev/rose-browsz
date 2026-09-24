import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO as business } from '../../data/businessData';
import './EditorialHome.css';

const services = [
  { title: 'Your brows.\nBeautifully refined.', label: '01 / BROW ARTISTRY', image: 'nano-strokes.jpg', alt: 'Close-up of fine, natural-looking brow hairstrokes', text: 'Featherlight nano strokes. Soft ombré shading. A shape that feels unmistakably you.', detail: 'Nano brows · Ombré powder · Combination brows', action: 'Explore brow treatments' },
  { title: 'A little colour.\nA lovely difference.', label: '02 / LIP BLUSH', image: 'lip-blush.jpg', alt: 'Close-up of softly tinted lips', text: 'A soft wash of colour, thoughtfully blended to bring out your natural lip shape.', detail: 'Aquarelle lip blush · Lip neutralization', action: 'Explore lip blush' },
  { title: 'An eye for beauty.\nA craft for life.', label: '03 / THE ACADEMY', image: 'academy-kit.jpg', alt: 'Professional permanent makeup training equipment', text: 'Learn the art of permanent makeup with Jess. Personal guidance, hands-on practice, lasting mentorship.', detail: 'Private training · Professional kit · Live models', action: 'Discover the academy' },
];

export default function EditorialHome({ onOpenWizard, onNavigate, onScrollToSection, darkMode, onToggleDarkMode }) {
  const root = useRef(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.rb-hero-copy > *', { y: 28, opacity: 0, duration: 1.1, stagger: .13, ease: 'power3.out' });
        gsap.utils.toArray('.rb-reveal').forEach(el => {
          gsap.from(el, { y: 35, opacity: 0, duration: .9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
        });
      }, root);
      return () => ctx.revert();
    });
    media.add('(min-width: 850px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.rb-card').slice(0, -1).forEach((card, i) => {
          gsap.to(card.querySelector('.rb-card-inner'), { scale: .95, ease: 'none', scrollTrigger: { trigger: card.nextElementSibling, start: 'top 85%', end: 'top ' + (115 + i * 18), scrub: true } });
        });
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);
  const jump = id => onScrollToSection(id);
  return <div ref={root} className="rb-site">
    <div>
      <section className="rb-hero">
        <div className="rb-hero-copy">
          <p className="rb-eyebrow">ROSEVILLE, CALIFORNIA / BY JESS</p>
          <h1>Beautifully you.<br/><em>Only effortless.</em></h1>
          <p className="rb-intro">Considered brows. Softly tinted lips.<br/>Permanent beauty with a personal touch.</p>
          <div className="rb-hero-actions"><button className="rb-button" onClick={() => onOpenWizard()}>Find your signature look <span aria-hidden="true">↗</span></button><button className="rb-text-link" onClick={() => onOpenWizard()}>Let's talk first</button></div>
          <div className="rb-hero-note"><span className="rb-note-line"/><span>THE ART OF WAKING UP READY.</span></div>
        </div>
        <div className="rb-hero-photo"><img src="/images/hero-brows.jpg" alt="Softly defined brows and natural beauty" fetchPriority="high"/><div className="rb-photo-caption"><span>LESS ROUTINE.<br/>MORE YOU.</span><span>RB / 01</span></div></div>
        <div className="rb-hero-bottom"><span>PERMANENT MAKEUP, PERSONALLY CONSIDERED.</span><button onClick={() => jump('services')}>Discover the studio <span aria-hidden="true">↓</span></button></div>
      </section>
      <section id="services" className="rb-services">
        <div className="rb-section-heading rb-reveal"><p className="rb-eyebrow">THE SIGNATURE COLLECTION</p><h2>Small details.<br/><em>Beautiful impact.</em></h2><p>Enhance what makes you, you.<br/>Explore your next everyday essential.</p></div>
        <div className="rb-stack">{services.map((s, i) => <article className="rb-card" key={s.label} style={{ '--card-index': i }}>
          <div className="rb-card-inner card-thick">
            <div className="rb-card-copy"><p className="rb-eyebrow">{s.label}</p><h3>{s.title.split('\n').map((line, index) => <React.Fragment key={line}>{index > 0 && <br/>}{index ? <em>{line}</em> : line}</React.Fragment>)}</h3><p>{s.text}</p><small>{s.detail}</small><button className="rb-card-link" onClick={() => i === 2 ? onOpenWizard('PMU Academy & Training') : onNavigate('services')}>{s.action}<span aria-hidden="true">↗</span></button></div>
            <div className="rb-card-photo"><img src={'/images/' + s.image} alt={s.alt} loading="lazy" width="1200" height="896"/><span className="rb-image-number">0{i + 1}</span></div>
          </div>
        </article>)}</div>
        <div className="rb-services-end"><span>Not sure where to begin? We'll find your fit.</span><button className="rb-text-link" onClick={() => onNavigate('services')}>View all treatments ↗</button></div>
      </section>
      <section id="artist" className="rb-artist rb-reveal"><div className="rb-artist-image"><img src="/images/jess-profile.jpg" alt="Jess in her permanent makeup studio" loading="lazy" width="1200" height="896"/></div><div className="rb-artist-copy"><p className="rb-eyebrow">THE ARTIST BEHIND THE DETAIL</p><h2>A personal touch.<br/><em>Always, Jess.</em></h2><p>Beauty should feel like you. I combine careful mapping, a love of detail, and a little intuition to create a look that belongs to your face.</p><p className="rb-credential">JESSICA / FOUNDER & PMU EDUCATOR<br/>Li Pigments Global PRO Artist · 2024 & 2025</p><button className="rb-text-link" onClick={() => onNavigate('about')}>Meet Jess & the studio ↗</button></div></section>
      <section className="rb-quote rb-reveal"><p className="rb-eyebrow">A NOTE FROM THE CHAIR</p><blockquote>“They look so natural everyone thinks I was just born with perfect arches.”</blockquote><p>BRIANNA M. <span>/</span> NANO COMBO BROWS</p></section>
      <section id="location" className="rb-visit rb-reveal"><div><p className="rb-eyebrow">YOUR LITTLE MOMENT OF ME-TIME</p><h2>See you<br/><em>in the studio.</em></h2><button className="rb-button" onClick={() => onOpenWizard()}>Make time for you <span aria-hidden="true">↗</span></button></div><div className="rb-visit-details"><p>ROSE BROWSZ & BEAUTY ACADEMY</p><address>973 Pleasant Grove Blvd, Suite #130<br/>Roseville, CA 95678</address><p>Tuesday–Saturday / 9am–4pm<br/>Sunday & Monday / Closed</p><a className="rb-text-link" href={business.googleMapsLink} target="_blank" rel="noreferrer">Find the studio ↗</a><a href="tel:9166262076">{business.phone}</a></div></section>
    </div>

  </div>;
}

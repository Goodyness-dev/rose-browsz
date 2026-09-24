import React from 'react';
import { BUSINESS_INFO as business } from '../../data/businessData';
export default function AboutPracticePage({ onOpenWizard, onBackToHome }) {
  return <div className="rb-inner rb-enter">
    <button className="rb-text-link" onClick={onBackToHome}>← Back to the studio</button>
    <section className="rb-about-intro"><div><p className="rb-eyebrow">ROSE BROWSZ / ROSEVILLE, CA</p><h1>Good beauty.<br/><em>Great company.</em></h1><p>A quiet space for a little transformation. A personal approach to every face. Welcome to the studio.</p><button className="rb-button" onClick={() => onOpenWizard()}>Come as you are ↗</button></div><img src="/images/hero-brows.jpg" alt="Softly defined brows and natural beauty" fetchPriority="high"/></section>
    <section className="rb-about-artist"><img src="/images/jess-profile.jpg" alt="Jessica in her studio" loading="lazy"/><div><p className="rb-eyebrow">MEET YOUR ARTIST</p><h2>Care in every detail.<br/><em>Jess, in every look.</em></h2><p>I'm Jessica, founder of Rose Browsz and your artist behind the chair. My approach starts with listening, then thoughtful mapping and colour selection to complement your features.</p><p>From your first consultation to your next colour refresh, we'll make the details feel personal.</p><p className="rb-eyebrow">LI PIGMENTS GLOBAL PRO ARTIST / 2024 & 2025</p></div></section>
    <section className="rb-academy-panel"><div><p className="rb-eyebrow">FOR THE NEXT GENERATION OF ARTISTS</p><h2>Your eye for beauty.<br/><em>Our craft to share.</em></h2><p>Private mentorship and hands-on PMU training, with technique, live-model practice, and support for your next chapter.</p><button className="rb-button" onClick={() => onOpenWizard('PMU Academy & Training')}>Ask about the academy ↗</button></div><img src="/images/academy-kit.jpg" alt="Tools for hands-on permanent makeup training" loading="lazy"/></section>
    <section className="rb-studio-notes"><p className="rb-eyebrow">BEFORE YOUR VISIT</p>{[
      ['How do I choose a treatment?', 'Start with a consultation. Tell Jess the look you have in mind, and she will help you choose a suitable approach.'],
      ['What if I have previous permanent makeup?', 'Mention previous work in your request so Jess can discuss an assessment before you book.'],
      ['How do I prepare?', 'The studio will share preparation and aftercare instructions specific to your treatment.'],
    ].map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</section>
    <section className="rb-inline-cta"><div><p className="rb-eyebrow">YOUR CHAIR IS WAITING</p><h2>A moment<br/><em>just for you.</em></h2><p>{business.address.formatted}</p></div><button className="rb-button" onClick={() => onOpenWizard()}>Request a visit ↗</button></section>
  </div>;
}

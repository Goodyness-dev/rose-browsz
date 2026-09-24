import React, { useState } from 'react';
import { SERVICES, SERVICE_CATEGORIES } from '../../data/servicesData';

const labels = ['All treatments', 'Brows', 'Lips & cosmetics', 'The academy', 'Studio extras'];
const summaries = {
 'nano-brows':'Fine, individual hairstrokes for softly defined, natural-looking brows.',
 'ombre-powder':'A sheer-to-defined gradient, inspired by the softness of brow powder.',
 'nano-combo':'Delicate hairstrokes meet soft shading for a little extra definition.',
 'brow-touchup':'Refresh your colour or refine your brows after the initial healing period.',
 'lip-blush':'A custom-blended wash of colour to enhance your natural lips.',
 'dark-lip-neutralization':'A tailored colour-correction consultation for uneven lip tones.',
 'lash-line-enhancement':'Subtle definition along the lash line.',
 'pmu-brow-certification':'Learn brow mapping, colour theory, machine technique, and client care with Jess.',
 'private-apprenticeship':'Individual coaching shaped around your experience and creative goals.',
 'teeth-whitening':'An in-studio cosmetic whitening session. Ask Jess about suitability.',
 'permanent-jewelry':'A custom-fitted chain, finished with a delicate clasp-free weld.',
 'tiny-tattoos':'Small, meaningful designs with a fine-line finish.'
};
export default function AllServicesPage({ onOpenWizard, onBackToHome }) {
  const [category, setCategory] = useState('All Services');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const filtered = SERVICES.filter(s => (category === 'All Services' || s.category === category) && (s.title + ' ' + s.shortDesc).toLowerCase().includes(search.toLowerCase()));
  return <div className="rb-inner rb-enter">
    <button className="rb-text-link" onClick={onBackToHome}>← Back to the studio</button>
    <header className="rb-page-heading"><div><p className="rb-eyebrow">THE TREATMENT MENU</p><h1>Find your<br/><em>everyday beautiful.</em></h1></div><p>Considered treatments. Individual artistry.<br/>A little less routine, a little more you.</p></header>
    <div className="rb-catalog-tools"><div className="rb-tabs" aria-label="Filter treatments">{SERVICE_CATEGORIES.map((c, i) => <button key={c} aria-pressed={category === c} onClick={() => { setCategory(c); setExpanded(null); }}>{labels[i]}</button>)}</div><label className="rb-search">Find a treatment<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search the collection" type="search"/></label></div>
    <p className="rb-result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'treatment' : 'treatments'}</p>
    <div className="rb-treatment-stack">{filtered.map((s, i) => <article className="rb-treatment card-thick" key={s.id}>
      <button className="rb-treatment-heading" aria-expanded={expanded === s.id} aria-controls={'details-' + s.id} onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
        <span className="rb-eyebrow">{String(i + 1).padStart(2, '0')}</span><span><small>{s.category}</small><span className="rb-treatment-title">{s.title}</span></span><span className="rb-treatment-time">{s.turnaround}</span><span className="rb-expand" aria-hidden="true">{expanded === s.id ? '−' : '+'}</span>
      </button>
      <div id={'details-' + s.id} hidden={expanded !== s.id} className="rb-treatment-details"><p>{summaries[s.id] || 'A personal consultation to refine colour, shape, and your next treatment.'}</p><p className="rb-muted">We’ll discuss suitability, pricing, and the details at your consultation.</p><button className="rb-button" onClick={() => onOpenWizard(s.category, s.title)}>Request this treatment <span aria-hidden="true">↗</span></button></div>
    </article>)}</div>
    {!filtered.length && <div className="rb-empty"><h2>Nothing here just yet.</h2><p>Try a different treatment or browse the full collection.</p><button className="rb-text-link" onClick={() => { setSearch(''); setCategory('All Services'); }}>Clear filters</button></div>}
    <section className="rb-inline-cta"><h2>A little guidance?<br/><em>That's what we're here for.</em></h2><button className="rb-button" onClick={() => onOpenWizard()}>Let's find your fit ↗</button></section>
  </div>;
}

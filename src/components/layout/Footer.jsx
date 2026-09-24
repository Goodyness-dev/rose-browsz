import React from 'react';
import { BUSINESS_INFO as business } from '../../data/businessData';
export default function Footer({ onNavigate, onOpenWizard }) {
  return <footer className="rb-footer">
    <div className="rb-footer-top"><button className="rb-logo" onClick={() => onNavigate('home')}>rose browsz<span>BEAUTY STUDIO & ACADEMY</span></button><div><button onClick={() => onNavigate('about')}>The studio</button><button onClick={() => onOpenWizard()}>Book a visit</button><a href={business.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><button onClick={() => onNavigate('admin')}>Studio login</button></div></div>
    <div className="rb-footer-bottom"><span>© {new Date().getFullYear()} Rose Browsz LLC</span><span>BEAUTY, IN YOUR OWN WAY.</span><button onClick={() => window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'instant' })}>Back to top ↑</button></div>
  </footer>;
}

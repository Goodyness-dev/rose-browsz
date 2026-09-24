import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenWizard, currentPage = 'home', onNavigate, onScrollToSection, darkMode, onToggleDarkMode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [currentPage]);
  useEffect(() => {
    if (!open) return;
    const escape = e => { if (e.key === 'Escape') { setOpen(false); document.querySelector('.rb-menu-toggle')?.focus(); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open]);
  const navigate = page => { setOpen(false); onNavigate(page); };
  const links = <>
    <button aria-current={currentPage === 'services' ? 'page' : undefined} onClick={() => navigate('services')}>The treatments</button>
    <button aria-current={currentPage === 'about' ? 'page' : undefined} onClick={() => navigate('about')}>The studio</button>
    <button onClick={() => { setOpen(false); onScrollToSection('location'); }}>Visit us</button>
  </>;
  return <header className="rb-nav">
    <button className="rb-logo" onClick={() => navigate('home')} aria-label="Rose Browsz home">rose browsz<span>BEAUTY STUDIO & ACADEMY</span></button>
    <nav className="rb-desktop-nav" aria-label="Main navigation">{links}</nav>
    <div className="rb-nav-actions">
      <button className="rb-theme" onClick={onToggleDarkMode} aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}>{darkMode ? 'Light' : 'Dark'}</button>
      <button className="rb-button rb-nav-book" onClick={() => onOpenWizard()}>Book a visit <span aria-hidden="true">↗</span></button>
      <button className="rb-menu-toggle" aria-expanded={open} aria-controls="rb-mobile-menu" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
    </div>
    {open && <nav className="rb-mobile-nav" id="rb-mobile-menu" aria-label="Mobile navigation">{links}<button onClick={() => { setOpen(false); onOpenWizard(); }}>Book a visit ↗</button></nav>}
  </header>;
}

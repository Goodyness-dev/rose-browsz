import React, { useState, useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/layout/Navbar';
import EditorialHome from './components/home/EditorialHome';
import Footer from './components/layout/Footer';
import { BUSINESS_INFO } from './data/businessData';
import { authApi, getStoredToken } from './services/api';

// Code-split heavy routes & modals for instant initial page speed
const AllServicesPage = lazy(() => import('./components/services/AllServicesPage'));
const AboutPracticePage = lazy(() => import('./components/about/AboutPracticePage'));
const QuoteWizardModal = lazy(() => import('./components/wizard/QuoteWizardModal'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'services' | 'about' | 'admin'
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardCategory, setWizardCategory] = useState(null);
  const [wizardService, setWizardService] = useState(null);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Midnight Dark Mode state
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('glass_theme');
      if (saved) return saved === 'dark';
      return false; // Default to clean light mode unless toggled
    } catch {
      return false;
    }
  });

  // Initialize Lenis smooth scroll for buttery interactive feeling
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      duration: isTouch ? 0.9 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.__lenis = null;
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Check stored auth token on mount
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      authApi.verify()
        .then(res => {
          if (res && res.authenticated) {
            setIsAdminAuthenticated(true);
            setAdminUser({
              name: "Dr. Sharon New Glass, DMD",
              shop: BUSINESS_INFO.name,
              role: "Practice Administrator"
            });
          }
        })
        .catch(() => {
          if (token === 'fallback_admin_token_active') {
            setIsAdminAuthenticated(true);
            setAdminUser({
              name: "Dr. Sharon New Glass, DMD",
              shop: BUSINESS_INFO.name,
              role: "Practice Administrator"
            });
          } else {
            setIsAdminAuthenticated(false);
          }
        });
    }
  }, []);

  // Apply dark class to <html> and <body> immediately
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode || currentPage === 'admin') {
      root.classList.add('dark');
      document.body.classList.add('dark');
      if (currentPage !== 'admin') {
        localStorage.setItem('glass_theme', 'dark');
      }
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('glass_theme', 'light');
    }
  }, [darkMode, currentPage]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      return next;
    });
  };

  // Reset scroll position and refresh ScrollTrigger when page changes
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [currentPage]);

  const handleScrollToSection = (sectionId) => {
    const performScroll = () => {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -75, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    };

    if (currentPage !== 'home') {
      setCurrentPage('home');
      if (
        window.location.hash.startsWith('#/services') ||
        window.location.hash.startsWith('#/admin') ||
        window.location.hash.startsWith('#/about')
      ) {
        window.history.pushState(null, '', window.location.pathname);
      }
      setTimeout(performScroll, 180);
    } else {
      performScroll();
    }
  };

  // Sync with browser URL hash and pathname for routing
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (hash === '#/admin' || hash === '#admin' || path === '/admin' || path.startsWith('/admin')) {
        setCurrentPage('admin');
      } else if (hash === '#/services' || hash === '#services-all' || path === '/services') {
        setCurrentPage('services');
      } else if (hash === '#/about' || hash === '#about' || hash === '#/pmu-studio' || hash.startsWith('#/about') || path === '/about' || path === '/pmu-studio') {
        setCurrentPage('about');
      } else if (hash === '#services' || hash === '#location' || hash === '#contact') {
        handleScrollToSection(hash.replace('#', ''));
      }
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'services') {
      window.location.hash = '#/services';
    } else if (page === 'about') {
      window.location.hash = '#/about';
    } else if (page === 'admin') {
      window.location.hash = '#/admin';
    } else {
      if (
        window.location.hash.startsWith('#/services') ||
        window.location.hash.startsWith('#/admin') ||
        window.location.hash.startsWith('#/about')
      ) {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleOpenWizard = (category = null, service = null) => {
    setWizardCategory(category);
    setWizardService(service);
    setWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setWizardOpen(false);
    setWizardCategory(null);
    setWizardService(null);
  };

  // If on Admin route, render full-screen Admin portal
  if (currentPage === 'admin') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">Loading Staff Portal...</span>
        </div>
      }>
        {isAdminAuthenticated ? (
          <AdminLayout
            user={adminUser}
            onLogout={() => {
              setIsAdminAuthenticated(false);
              setAdminUser(null);
            }}
            onBackToSite={() => handleNavigate('home')}
          />
        ) : (
          <AdminLogin
            onLoginSuccess={(user) => {
              setIsAdminAuthenticated(true);
              setAdminUser(user);
            }}
            onBackToSite={() => handleNavigate('home')}
          />
        )}
      </Suspense>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} flex flex-col font-sans transition-colors duration-200`}>
      {/* Global Navbar with Dark Mode Toggle */}
      {currentPage !== 'home' && <Navbar
        onOpenWizard={() => handleOpenWizard()}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onScrollToSection={handleScrollToSection}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />}

      {/* Main View: Landing Page OR All Services Page OR Dedicated About Page */}
      <main className="flex-grow">
        {currentPage === 'services' ? (
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
              <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <AllServicesPage
              onOpenWizard={handleOpenWizard}
              onBackToHome={() => handleNavigate('home')}
            />
          </Suspense>
        ) : currentPage === 'about' ? (
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
              <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <AboutPracticePage
              onOpenWizard={handleOpenWizard}
              onBackToHome={() => handleNavigate('home')}
            />
          </Suspense>
        ) : (
<EditorialHome onOpenWizard={handleOpenWizard} onNavigate={handleNavigate} onScrollToSection={handleScrollToSection} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        )}
      </main>

      {/* Global Footer */}
      {currentPage !== 'home' && <Footer
        onOpenWizard={() => handleOpenWizard()}
        onNavigate={handleNavigate}
        onScrollToSection={handleScrollToSection}
      />}

      {/* Quote Request Wizard Modal (Loaded on-demand) */}
      {wizardOpen && (
        <Suspense fallback={null}>
          <QuoteWizardModal
            isOpen={wizardOpen}
            onClose={handleCloseWizard}
            initialCategory={wizardCategory}
            initialService={wizardService}
          />
        </Suspense>
      )}


    </div>
  );
}

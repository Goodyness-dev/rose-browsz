import React, { useState, useEffect } from 'react';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import InboxView from './InboxView';
import AdminSettings from './AdminSettings';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';
import { authApi, quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

function getInitials(name) {
  if (!name) return 'RB';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AdminLayout({ user, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'orders' | 'inbox' | 'settings'
  const [modalQuote, setModalQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });

  useEffect(() => {
    quotesApi.getStats().then(setStats).catch(() => {});
  }, [activeTab]);

  const handleLogout = async () => {
    await authApi.logout();
    onLogout();
  };

  const navItems = [
    { id: 'dashboard', label: 'Studio Overview', tag: '// 01' },
    { id: 'orders', label: 'Consultations & Inquiries', tag: '// 02', badge: stats.total > 0 ? stats.total : null },
    { id: 'inbox', label: 'Client Messages', tag: '// 03', badge: stats.pending > 0 ? stats.pending : null },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900 font-sans flex antialiased overflow-x-hidden">
      {/* ------------------------------------------------------------- */}
      {/* LEFT SIDEBAR (Desktop & Mobile Drawer)                        */}
      {/* ------------------------------------------------------------- */}
      {/* Backdrop for mobile */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-5 sm:p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Logo Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-shop-red text-white flex items-center justify-center shadow-md shadow-shop-red/30 font-bold font-mono text-sm">
                RB
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-heading font-black text-sm sm:text-base tracking-tight text-slate-900 block leading-tight truncate" title={BUSINESS_INFO.name}>
                  {BUSINESS_INFO.name}
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono font-semibold uppercase tracking-wider block">
                  Studio Management
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 flex items-center justify-center font-bold text-sm shrink-0 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* MENU Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest px-3 block">
              // NAVIGATION
            </span>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-shop-red text-white shadow-md shadow-shop-red/25'
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={`font-mono text-[10px] ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                        {item.tag}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-shop-light text-shop-red border border-shop-border'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* GENERAL Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest px-3 block">
              // MANAGEMENT
            </span>
            <nav className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-shop-red text-white shadow-md shadow-shop-red/25'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <span className={`font-mono text-[10px] ${activeTab === 'settings' ? 'text-white/80' : 'text-slate-400'}`}>
                  // 04
                </span>
                <span>Studio Settings</span>
              </button>

              <button
                onClick={onBackToSite}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 transition cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono text-[10px] text-slate-400">// 05</span>
                  <span>View Public Site</span>
                </div>
                <span className="text-slate-400 text-xs">↗</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2.5 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50 transition cursor-pointer font-mono"
              >
                <span>[LOGOUT]</span>
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Banner Card */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-shop-red to-shop-redHover text-white space-y-2 shadow-lg shadow-shop-red/20">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded">MOBILE READY</span>
          </div>
          <p className="text-[11px] text-white/90 leading-snug">
            Manage client consultations, brow assessments, and academy applications on mobile or desktop.
          </p>
          <button
            onClick={onBackToSite}
            className="w-full py-2 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs rounded-xl transition shadow-xs cursor-pointer font-mono"
          >
            Visit Public Website →
          </button>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT CANVAS & TOP BAR                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-16 sm:h-20 bg-white border-b border-slate-200/80 px-3.5 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          {/* Left: Mobile hamburger & Search */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0 max-w-md">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold text-base shrink-0 cursor-pointer"
              aria-label="Open navigation menu"
            >
              ☰
            </button>

            <div className="relative flex-1 hidden sm:block">
              <input
                type="text"
                placeholder="Search consultations, clients, procedures, students..."
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-shop-red focus:bg-white rounded-2xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none transition"
              />
            </div>

            <span className="sm:hidden font-heading font-black text-sm text-slate-900 truncate">
              {activeTab === 'dashboard' ? 'Overview' : activeTab === 'orders' ? 'Consultations' : activeTab === 'inbox' ? 'Inbox' : 'Settings'}
            </span>
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Quick Inbox Shortcut */}
            <button
              onClick={() => setActiveTab('inbox')}
              className="h-9 sm:h-10 px-3 rounded-2xl border border-slate-200/80 hover:bg-slate-50 flex items-center space-x-1.5 text-slate-700 text-xs font-mono font-bold transition cursor-pointer"
              title="Client Inbox"
            >
              <span>✉</span>
              <span className="hidden sm:inline">INBOX</span>
              {stats.pending > 0 && (
                <span className="w-4 h-4 rounded-full bg-shop-red text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {stats.pending}
                </span>
              )}
            </button>

            {/* Admin Profile Card */}
            <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-shop-red to-shop-redHover text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-sm shrink-0 font-mono">
                {getInitials(BUSINESS_INFO.owner?.name || BUSINESS_INFO.name)}
              </div>
              <div className="hidden md:block text-left">
                <h4 className="text-xs font-black text-slate-900 leading-tight truncate max-w-[130px]">
                  {BUSINESS_INFO.owner?.name || 'Jessica (Jess)'}
                </h4>
                <span className="text-[10px] text-slate-400 block leading-tight truncate max-w-[130px] font-mono">
                  {BUSINESS_INFO.address?.city || 'Roseville'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* BODY CANVAS */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectQuote={(q) => setModalQuote(q)}
              onOpenNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'orders' && <OrdersView />}

          {activeTab === 'inbox' && (
            <InboxView onOpenFullQuote={(q) => setModalQuote(q)} />
          )}

          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>

      {/* Quote Detail Modal */}
      {modalQuote && (
        <QuoteDetailModal
          quote={modalQuote}
          onClose={() => setModalQuote(null)}
          onUpdate={(updated) => setModalQuote(updated)}
        />
      )}

      {/* New Manual Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onCreated={() => {
          quotesApi.getStats().then(setStats).catch(() => {});
        }}
      />
    </div>
  );
}


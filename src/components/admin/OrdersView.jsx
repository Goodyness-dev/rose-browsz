import React, { useState, useEffect } from 'react';
import { quotesApi } from '../../services/api';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';

export default function OrdersView() {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  useEffect(() => {
    loadData();
    // Auto-poll every 12 seconds for real-time order synchronization
    const interval = setInterval(loadData, 12000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  const loadData = async () => {
    try {
      const [quotesRes, statsRes] = await Promise.all([
        quotesApi.getQuotes({ status: statusFilter, search: searchTerm }),
        quotesApi.getStats()
      ]);
      setQuotes(quotesRes.quotes || []);
      setStats(statsRes || { total: 0, pending: 0, quoted: 0, completed: 0 });
    } catch (err) {
      console.warn('Error fetching quotes from backend (checking localStorage fallback):', err);
      try {
        const local = JSON.parse(localStorage.getItem('biz_quotes') || '[]');
        setQuotes(local);
        setStats({
          total: local.length,
          pending: local.filter(q => q.status === 'pending' || !q.status).length,
          quoted: local.filter(q => q.status === 'quoted').length,
          completed: local.filter(q => q.status === 'completed').length
        });
      } catch (e) {
        console.error(e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleQuoteUpdated = (updatedQuote) => {
    if (updatedQuote._deleted) {
      setQuotes(prev => prev.filter(q => q.id !== updatedQuote.id));
    } else {
      setQuotes(prev => prev.map(q => q.id === updatedQuote.id ? updatedQuote : q));
    }
    quotesApi.getStats().then(setStats).catch(() => {});
  };

  const handleNewOrderCreated = (newQuote) => {
    setQuotes(prev => [newQuote, ...prev]);
    quotesApi.getStats().then(setStats).catch(() => {});
  };

  const filteredQuotes = quotes.filter(q => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (q.name && q.name.toLowerCase().includes(term)) ||
      (q.email && q.email.toLowerCase().includes(term)) ||
      (q.phone && q.phone.includes(term)) ||
      (q.detailedService && q.detailedService.toLowerCase().includes(term)) ||
      (q.serviceCategory && q.serviceCategory.toLowerCase().includes(term)) ||
      (q.id && q.id.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6 pb-16">
      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Quotes */}
        <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-6 sm:p-7 card-thick-hover transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider">// TOTAL REQUESTS</span>
            <span className="text-xs font-mono font-bold text-slate-400">[ALL]</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-slate-900">{stats.total}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">All incoming consultation requests</span>
        </div>

        {/* Pending Awaiting Quote */}
        <div className="bg-white border-2 border-amber-300/90 rounded-2xl p-6 sm:p-7 card-thick-hover transition">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider">// AWAITING REVIEW</span>
            <span className="text-xs font-mono font-bold text-amber-600">[PENDING]</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-amber-600">{stats.pending}</div>
          <span className="text-[11px] text-amber-600/80 mt-1 block font-medium">Needs practice review & response</span>
        </div>

        {/* Quoted */}
        <div className="bg-white border-2 border-blue-300/90 rounded-2xl p-6 sm:p-7 card-thick-hover transition">
          <div className="flex items-center justify-between text-blue-700 mb-2">
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider">// ESTIMATES SENT</span>
            <span className="text-xs font-mono font-bold text-blue-600">[QUOTED]</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-blue-600">{stats.quoted}</div>
          <span className="text-[11px] text-blue-600/80 mt-1 block font-medium">Estimate delivered to client</span>
        </div>

        {/* Completed */}
        <div className="bg-white border-2 border-emerald-300/90 rounded-2xl p-6 sm:p-7 card-thick-hover transition">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider">// COMPLETED</span>
            <span className="text-xs font-mono font-bold text-emerald-600">[CLOSED]</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-600">{stats.completed}</div>
          <span className="text-[11px] text-emerald-600/80 mt-1 block font-medium">Care completed & closed</span>
        </div>
      </div>

      {/* Control Bar: Search, Filter Tabs, Action CTAs */}
      <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-4 card-thick">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <span className="text-slate-400 font-mono text-xs absolute left-3.5 top-1/2 -translate-y-1/2">🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search client name, procedure, or #ID..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition"
            />
          </form>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => { setIsLoading(true); loadData(); }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition font-mono text-xs cursor-pointer"
              title="Refresh Quotes"
            >
              <span className={isLoading ? 'animate-spin inline-block text-shop-red' : ''}>↻</span>
            </button>

            <button
              onClick={() => setIsNewOrderOpen(true)}
              className="py-2.5 px-4 bg-shop-red hover:bg-shop-redHover text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-shop-red/20 flex items-center space-x-1.5 active:scale-95 cursor-pointer shrink-0"
            >
              <span>+ Record Appointment</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          {[
            { id: 'all', label: 'All Orders', count: stats.total },
            { id: 'pending', label: 'Needs Review', count: stats.pending },
            { id: 'quoted', label: 'Estimates Sent', count: stats.quoted },
            { id: 'completed', label: 'Completed', count: stats.completed },
            { id: 'archived', label: 'Archived' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center space-x-1.5 font-mono cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-shop-red text-white shadow-xs shadow-shop-red/25'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  statusFilter === tab.id ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List / Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200/80 rounded-2xl text-slate-400 space-y-3 font-mono text-xs">
          <span className="text-xl animate-spin text-shop-red">↻</span>
          <span>Loading consultation records from database...</span>
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white border border-slate-200/80 rounded-2xl text-slate-500 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto font-mono text-base font-bold">
            RB
          </div>
          <h3 className="text-base font-bold text-slate-900">No Client Requests Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm ? 'No client records matched your search query.' : 'When clients submit consultation requests on the website, they will appear here in real-time.'}
          </p>
          <button
            onClick={() => setIsNewOrderOpen(true)}
            className="inline-flex items-center space-x-1 text-xs font-bold text-shop-red hover:underline pt-2 cursor-pointer font-mono"
          >
            <span>+ Create manual consultation entry</span>
          </button>
        </div>
      ) : (
        <div className="bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden card-thick">
          {/* Desktop Table (Visible on md and larger) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200 text-[11px] font-mono">
                <tr>
                  <th className="py-3.5 px-4">Quote ID / Date</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Treatment / Procedure</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Estimate ($)</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQuotes.map((q) => {
                  const status = q.status || 'pending';
                  return (
                    <tr 
                      key={q.id}
                      onClick={() => setSelectedQuote(q)}
                      className="hover:bg-slate-50/80 cursor-pointer transition"
                    >
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-shop-red text-xs block">#{q.id}</span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(q.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">{q.name}</div>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                          {q.phone && <span className="font-mono">{q.phone}</span>}
                          {q.phone && q.email && <span>•</span>}
                          <span className="truncate max-w-[160px]">{q.email}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800">{q.detailedService || q.serviceCategory || 'PMU Brow Consultation'}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[200px]">{q.timeline || 'Flexible schedule'}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                          status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          status === 'quoted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {status === 'pending' ? 'NEEDS REVIEW' :
                           status === 'quoted' ? 'QUOTED' :
                           status === 'completed' ? 'COMPLETED' : 'ARCHIVED'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-sm">
                        {q.quotedPrice ? (
                          <span className="text-emerald-600">${q.quotedPrice}</span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuote(q);
                          }}
                          className="py-1.5 px-3.5 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-shop-red hover:border-red-200 border border-slate-200 text-xs font-bold transition text-slate-700 cursor-pointer font-mono"
                        >
                          {status === 'pending' ? 'Review & Estimate' : 'View Details →'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List (Visible on <md) */}
          <div className="block md:hidden divide-y divide-slate-100">
            {filteredQuotes.map((q) => {
              const status = q.status || 'pending';
              return (
                <div 
                  key={q.id}
                  onClick={() => setSelectedQuote(q)}
                  className="p-5 sm:p-6 active:bg-slate-50 transition cursor-pointer space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono font-bold text-shop-red text-xs">#{q.id}</span>
                      <h4 className="font-bold text-slate-900 text-base mt-0.5">{q.name}</h4>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      status === 'quoted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {status === 'pending' ? 'PENDING' : status === 'quoted' ? 'QUOTED' : status.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 font-medium">
                    {q.detailedService || q.serviceCategory || 'PMU Brow Consultation'}
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-mono">{q.phone || q.email || 'No contact'}</span>
                    {q.quotedPrice ? (
                      <span className="font-mono font-bold text-emerald-600">${q.quotedPrice}</span>
                    ) : (
                      <span className="text-slate-400 font-mono text-[11px]">Awaiting price</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
          onUpdate={handleQuoteUpdated}
        />
      )}

      {/* New Manual Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onCreated={handleNewOrderCreated}
      />
    </div>
  );
}

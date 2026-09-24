import React, { useState, useEffect, useRef } from 'react';
import { quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function InboxView({ onOpenFullQuote }) {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Reply Composer State
  const [replyText, setReplyText] = useState('');
  const [attachPrice, setAttachPrice] = useState(false);
  const [quotePrice, setQuotePrice] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadThreads();
    const interval = setInterval(loadThreads, 10000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  const loadThreads = async () => {
    try {
      const res = await quotesApi.getInbox({ status: statusFilter, search: searchTerm });
      const threadList = res.threads || [];
      setThreads(threadList);

      // Only auto-select thread 0 on desktop viewports (>= 768px) so mobile users see their inbox list
      if (!selectedThread && threadList.length > 0) {
        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
          selectThread(threadList[0]);
        }
      } else if (selectedThread) {
        // Keep updated thread in sync
        const updated = threadList.find(t => t.id === selectedThread.id);
        if (updated) setSelectedThread(updated);
      }
    } catch (err) {
      console.warn('Error loading inbox threads:', err);
    } finally {
      setIsLoadingThreads(false);
    }
  };

  const selectThread = async (thread) => {
    setSelectedThread(thread);
    setIsLoadingMessages(true);
    setSendError('');
    try {
      const res = await quotesApi.getMessages(thread.id);
      setMessages(res.messages || []);
      scrollToBottom();
    } catch (err) {
      console.error('Error loading messages for thread:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleSendReply = async (e) => {
    e?.preventDefault();
    if (!replyText.trim() && !quotePrice.trim()) return;

    setIsSending(true);
    setSendError('');

    try {
      const res = await quotesApi.sendMessage(selectedThread.id, {
        message: replyText.trim(),
        quotePrice: attachPrice && quotePrice ? quotePrice.trim() : null
      });

      if (res.message) {
        setMessages(prev => [...prev, res.message]);
        setReplyText('');
        if (attachPrice) {
          setQuotePrice('');
          setAttachPrice(false);
        }
        scrollToBottom();
        loadThreads();
      }
    } catch (err) {
      setSendError(err.data?.error || err.message || 'Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedThread) return;
    try {
      await quotesApi.updateStatus(selectedThread.id, newStatus);
      setSelectedThread(prev => ({ ...prev, status: newStatus }));
      setThreads(prev => prev.map(t => t.id === selectedThread.id ? { ...t, status: newStatus } : t));
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const filteredThreads = threads.filter(t => {
    if (!searchTerm.trim()) return true;
    const s = searchTerm.toLowerCase();
    return (
      t.name?.toLowerCase().includes(s) ||
      t.email?.toLowerCase().includes(s) ||
      t.detailedService?.toLowerCase().includes(s) ||
      t.serviceCategory?.toLowerCase().includes(s) ||
      t.id?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="bg-white border-2 border-slate-200/90 rounded-3xl overflow-hidden card-thick flex flex-col md:flex-row h-[calc(100dvh-130px)] sm:h-[80vh] min-h-[500px]">
      {/* ------------------------------------------------------------- */}
      {/* LEFT PANE: CONVERSATION LIST                                  */}
      {/* ------------------------------------------------------------- */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-white ${selectedThread ? 'hidden md:flex' : 'flex'} h-full min-h-0`}>
        {/* Search & Header */}
        <div className="p-4 border-b border-slate-200/80 space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-shop-red">// INBOX</span>
              <h2 className="font-heading font-black text-sm uppercase tracking-wider text-slate-900">
                Client Inquiries
              </h2>
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {threads.length} total
            </span>
          </div>

          <div className="relative">
            <span className="text-slate-400 font-mono text-xs absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search client name, procedure, or #ID..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none transition"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none font-mono">
            {['all', 'pending', 'quoted', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-2.5 py-1 rounded-lg font-bold transition capitalize cursor-pointer ${
                  statusFilter === f
                    ? 'bg-shop-red text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200/60'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Threads List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {isLoadingThreads ? (
            <div className="p-8 text-center text-slate-400 text-xs flex flex-col items-center space-y-2 font-mono">
              <span className="animate-spin text-shop-red text-lg">↻</span>
              <span>Loading messages...</span>
            </div>
          ) : filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-mono">
              No conversations found.
            </div>
          ) : (
            filteredThreads.map(thread => {
              const isSelected = selectedThread?.id === thread.id;
              const status = thread.status || 'pending';
              const initials = (thread.name || 'C')
                .split(' ')
                .map(n => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={thread.id}
                  onClick={() => selectThread(thread)}
                  className={`p-4 sm:p-5 cursor-pointer transition flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-red-50/70 border-l-4 border-l-red-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Initials Avatar */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>
                        {thread.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                        {new Date(thread.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-700 font-medium truncate mt-0.5">
                      {thread.detailedService || thread.serviceCategory || 'Signature PMU Brow Consultation'}
                    </div>

                    <p className="text-[11px] text-slate-500 truncate mt-1">
                      {thread.lastMessage ? thread.lastMessage.preview : (thread.additionalNotes || 'New client consultation submitted')}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        status === 'quoted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {status === 'pending' ? 'Needs Review' : status === 'quoted' ? 'Scheduled / Quoted' : status}
                      </span>

                      {thread.quotedPrice && (
                        <span className="font-mono text-[11px] font-bold text-emerald-600">
                          ${thread.quotedPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT PANE: ACTIVE THREAD & COMPOSER                          */}
      {/* ------------------------------------------------------------- */}
      {selectedThread ? (
        <div className="flex-1 flex flex-col bg-slate-50/60 min-w-0">
          {/* Thread Header */}
          <div className="px-4 sm:px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
            {/* Back button for mobile */}
            <button
              onClick={() => setSelectedThread(null)}
              className="md:hidden px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              ← Back to Inbox
            </button>

            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 truncate">
                  {selectedThread.name}
                </h3>
                <span className="font-mono text-xs font-bold text-shop-red bg-red-50 px-2 py-0.5 rounded-md border border-red-200 shrink-0">
                  #{selectedThread.id}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                <span className="font-medium text-slate-700">{selectedThread.detailedService || selectedThread.serviceCategory || 'PMU Brow Consultation'}</span>
                <span>•</span>
                <a href={`tel:${selectedThread.phone?.replace(/[^0-9]/g, '')}`} className="text-shop-red hover:underline font-mono">
                  {selectedThread.phone || 'No phone'}
                </a>
                <span>•</span>
                <span className="truncate max-w-[180px] font-mono">{selectedThread.email}</span>
              </div>
            </div>

            {/* Status Control */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <select
                value={selectedThread.status || 'pending'}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl px-3 py-2 text-slate-800 outline-none cursor-pointer hover:border-slate-300 transition"
              >
                <option value="pending">⏳ Pending (Needs Review)</option>
                <option value="in_review">🔍 In Review</option>
                <option value="quoted">📧 Consultation Scheduled</option>
                <option value="completed">✅ Treatment Completed</option>
                <option value="archived">📦 Archived</option>
              </select>

              {onOpenFullQuote && (
                <button
                  onClick={() => onOpenFullQuote(selectedThread)}
                  className="py-2 px-3.5 rounded-xl bg-shop-red hover:bg-red-700 text-white font-bold text-xs transition shadow-xs shadow-shop-red/20 shrink-0 cursor-pointer"
                >
                  Treatment Studio →
                </button>
              )}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Customer Inquiry Summary Banner Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200/90 text-xs text-slate-700 space-y-3 card-thick">
              <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-100 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] text-shop-red bg-red-50 border border-red-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider">// CLIENT INTAKE</span>
                  <span className="font-bold text-slate-900">Aesthetic Consultation Request</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono font-normal">
                  {new Date(selectedThread.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold font-mono">Procedure Focus</span>
                  <span className="text-slate-900 font-medium">{selectedThread.detailedService || selectedThread.serviceCategory || 'Signature PMU Brows'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold font-mono">Preferred Schedule</span>
                  <span className="text-slate-900 font-medium">{selectedThread.timeline || 'Flexible'} {selectedThread.specificDate ? `(${selectedThread.specificDate})` : ''}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold font-mono">Studio Location</span>
                  <span className="text-slate-900 font-medium">Roseville, CA Studio</span>
                </div>
              </div>

              {selectedThread.additionalNotes && (
                <div className="pt-2 border-t border-slate-100 text-slate-600">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold font-mono mb-1">Client Notes</span>
                  <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed text-[11px] italic">
                    "{selectedThread.additionalNotes}"
                  </p>
                </div>
              )}
            </div>

            {/* Conversation Messages */}
            {isLoadingMessages ? (
              <div className="py-8 text-center text-xs text-slate-400 flex flex-col items-center space-y-2 font-mono">
                <span className="animate-spin text-shop-red text-xl">↻</span>
                <span>Loading consultation messages...</span>
              </div>
            ) : (
              messages.map(msg => {
                const isAdmin = msg.sender === 'admin';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1 px-1 text-[11px] text-slate-400">
                      <span className="font-bold text-slate-700">{isAdmin ? (msg.senderName || BUSINESS_INFO.owner?.name || BUSINESS_INFO.name) : selectedThread.name}</span>
                      <span>•</span>
                      <span className="font-mono">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isAdmin
                        ? 'bg-shop-red text-white rounded-tr-xs shadow-md shadow-shop-red/15'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                    }`}>
                      {msg.isQuote && (
                        <div className={`inline-flex items-center space-x-1.5 font-bold font-mono text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 ${
                          isAdmin ? 'bg-white/20 text-white' : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          <span>[ESTIMATE / SCHEDULE CONFIRMED]</span>
                        </div>
                      )}
                      <p>{msg.message}</p>
                    </div>

                    <span className="text-[10px] text-slate-400 px-1 mt-1 font-mono">
                      {isAdmin ? `Delivered via Email to ${selectedThread.email}` : 'Received via Website Client Intake'}
                    </span>
                  </div>
                );
              })
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Reply Composer Bar */}
          <div className="p-4 border-t border-slate-200 bg-white space-y-3">
            {sendError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2 font-mono">
                <span>[!]</span>
                <span>{sendError}</span>
              </div>
            )}

            {/* Quick Price Quote Tool Toggle */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 cursor-pointer text-slate-600 hover:text-slate-900 transition">
                <input
                  type="checkbox"
                  checked={attachPrice}
                  onChange={(e) => setAttachPrice(e.target.checked)}
                  className="rounded bg-slate-100 border-slate-300 text-shop-red focus:ring-shop-red"
                />
                <span className="font-bold flex items-center space-x-1">
                  <span className="font-mono text-emerald-600">$</span>
                  <span>Attach Procedure Estimate ($)</span>
                </span>
              </label>

              {attachPrice && (
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-500 font-bold font-mono">$</span>
                  <input
                    type="text"
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value.replace(/[^0-9.]/g, ''))}
                    placeholder="e.g. 350.00"
                    className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-mono font-bold outline-none focus:border-shop-red focus:bg-white"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Composer Input Form */}
            <form onSubmit={handleSendReply} className="flex items-end space-x-2">
              <textarea
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handleSendReply(e);
                  }
                }}
                placeholder={`Reply to ${selectedThread.name}... (Press Ctrl+Enter to send)`}
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-2xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none resize-none leading-relaxed transition"
              />

              <button
                type="submit"
                disabled={isSending || (!replyText.trim() && !quotePrice.trim())}
                className="py-3 px-5 bg-shop-red hover:bg-red-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-2xl transition shadow-md shadow-shop-red/20 flex items-center space-x-1.5 shrink-0 active:scale-95 cursor-pointer"
              >
                {isSending ? (
                  <span className="animate-spin text-sm">↻</span>
                ) : (
                  <>
                    <span>Send</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Client receives this message directly in their email inbox.</span>
              <span className="hidden sm:inline font-mono text-[10px]">Ctrl + Enter to send</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-400 space-y-2 bg-slate-50/50">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-mono font-black text-slate-400 text-lg border border-slate-200/60">
            ✉
          </div>
          <h4 className="text-sm font-bold text-slate-800">No Client Conversation Selected</h4>
          <p className="text-xs max-w-xs text-center text-slate-500 font-sans">
            Pick a consultation request from the list on the left to review PMU and academy inquiries and send direct client replies.
          </p>
        </div>
      )}
    </div>
  );
}

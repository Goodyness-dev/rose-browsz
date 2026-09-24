import React, { useState } from 'react';
import { quotesApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function QuoteDetailModal({ quote, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState('quote_studio'); // 'quote_studio' | 'full_details'
  const [status, setStatus] = useState(quote?.status || 'pending');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Quote Studio State
  const [price, setPrice] = useState(quote?.quotedPrice || '');
  const [turnaround, setTurnaround] = useState(quote?.estimatedTurnaround || 'Prompt appointment scheduling');
  const [warranty, setWarranty] = useState(quote?.warrantyNote || 'Rose Browsz Artistry & Healed Retention Guarantee');
  const [message, setMessage] = useState(
    quote?.adminMessage || 
    `Hi ${quote?.name || 'Client'}, thank you for reaching out to ${BUSINESS_INFO.name}! Jess reviewed your consultation request for ${quote?.detailedService || quote?.serviceCategory || 'PMU artistry'}. We would love to welcome you into our Roseville studio. Please text or call us at ${BUSINESS_INFO.phone} or reply here to finalize your appointment.`
  );
  
  const [isSendingQuote, setIsSendingQuote] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!quote) return null;

  const handleStatusChange = async (newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const updated = await quotesApi.updateStatus(quote.id, newStatus);
      setStatus(newStatus);
      if (onUpdate) onUpdate(updated);
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSendQuote = async (e) => {
    e.preventDefault();
    if (!price.trim()) {
      setSendError('Please enter an estimate amount or consultation fee before sending.');
      return;
    }

    setIsSendingQuote(true);
    setSendError('');
    setSendSuccess(false);

    try {
      const result = await quotesApi.sendQuote(quote.id, {
        price,
        turnaround,
        warranty,
        message
      });

      setSendSuccess(true);
      setStatus('quoted');
      if (onUpdate && result.quote) {
        onUpdate(result.quote);
      }
    } catch (err) {
      setSendError(err.data?.error || err.message || 'Failed to send estimate email.');
    } finally {
      setIsSendingQuote(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete Consultation Record #${quote.id}?`)) return;
    setIsDeleting(true);
    try {
      await quotesApi.deleteQuote(quote.id);
      if (onUpdate) onUpdate({ ...quote, _deleted: true });
      onClose();
    } catch (err) {
      alert('Error deleting record: ' + err.message);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white border-2 border-slate-300 rounded-3xl card-thick shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-shop-red font-mono font-black text-sm shadow-xs shrink-0">
              MC
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-shop-red bg-red-50 px-2.5 py-0.5 rounded-md border border-red-200">
                  #{quote.id}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(quote.createdAt).toLocaleDateString()} at {new Date(quote.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black font-heading text-slate-900 mt-0.5">
                {quote.name} — {quote.detailedService || quote.serviceCategory || 'Consultation'}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            {/* Status Selector */}
            <select
              value={status}
              disabled={isUpdatingStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition outline-none cursor-pointer ${
                status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                status === 'quoted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              <option value="pending">⏳ Pending (Needs Review)</option>
              <option value="in_review">🔍 In Review</option>
              <option value="quoted">📧 Estimate Sent</option>
              <option value="completed">✅ Appointment Completed</option>
              <option value="archived">📦 Archived</option>
            </select>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition flex items-center justify-center font-bold text-base cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Quick Contact & Info Bar */}
        <div className="px-5 sm:px-6 py-3 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-600">
          <a 
            href={`tel:${quote.phone?.replace(/[^0-9]/g, '')}`}
            className="flex items-center space-x-1.5 hover:text-slate-900 text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition font-mono"
          >
            <span className="font-semibold">{quote.phone || 'No Phone'}</span>
            <span className="text-slate-400">↗</span>
          </a>

          <a 
            href={`mailto:${quote.email}`}
            className="flex items-center space-x-1.5 hover:text-slate-900 text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition font-mono"
          >
            <span className="font-semibold">{quote.email}</span>
            <span className="text-slate-400">↗</span>
          </a>

          <div className="text-slate-500 font-mono">
            <span>Roseville, CA Studio</span>
          </div>

          <div className="text-slate-500 font-mono">
            <span>Timeline: <strong>{quote.timeline || 'Prompt'}</strong></span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 px-5 sm:px-6 bg-white overflow-x-auto">
          <button
            onClick={() => setActiveTab('quote_studio')}
            className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'quote_studio'
                ? 'border-shop-red text-shop-red'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>// 01</span>
            <span>Treatment Estimate & Response</span>
          </button>
          <button
            onClick={() => setActiveTab('full_details')}
            className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'full_details'
                ? 'border-shop-red text-shop-red'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>// 02</span>
            <span>Client Consultation Details</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50/40">
          {activeTab === 'quote_studio' ? (
            /* TAB 1: Estimate Studio */
            <div className="space-y-6">
              {/* Previous Quote Alert Banner */}
              {quote.quotedPrice && (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start space-x-3 text-xs sm:text-sm text-blue-800 shadow-xs">
                  <span className="font-mono font-bold text-blue-600 mt-0.5">✓</span>
                  <div>
                    <div className="font-bold text-blue-900">Estimate Previously Sent on {quote.quoteSentAt ? new Date(quote.quoteSentAt).toLocaleString() : 'N/A'}</div>
                    <div className="mt-0.5">Amount: <strong className="text-blue-900 font-mono">${quote.quotedPrice}</strong> • Scheduling: {quote.estimatedTurnaround || 'N/A'}</div>
                    <div className="text-blue-600 text-xs mt-1">You can update the estimate or notes below and re-send anytime.</div>
                  </div>
                </div>
              )}

              {/* Success Banner */}
              {sendSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-3 shadow-xs">
                  <span className="font-mono font-bold text-emerald-600 text-lg">✓</span>
                  <div>
                    <strong className="block text-emerald-900 font-bold">Estimate Dispatched to {quote.email}!</strong>
                    <span>An official branded summary email with your consultation estimate has been delivered to the client.</span>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {sendError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center space-x-3 font-mono">
                  <span className="font-bold text-shop-red">[!]</span>
                  <span>{sendError}</span>
                </div>
              )}

              <form onSubmit={handleSendQuote} className="space-y-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                {/* Price & Turnaround Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                      Estimated Procedure / Visit Fee ($ USD) <span className="text-shop-red">*</span>
                    </label>
                    <div className="relative">
                      <span className="font-mono font-bold text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2">$</span>
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                        placeholder="e.g. 275.00"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl pl-9 pr-4 py-3 text-base text-slate-900 placeholder-slate-400 outline-none font-bold font-mono transition"
                        required
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">Includes examination, diagnostic imaging, and clinical evaluation.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                      Recommended Appointment Window
                    </label>
                    <input
                      type="text"
                      value={turnaround}
                      onChange={(e) => setTurnaround(e.target.value)}
                      placeholder="e.g. Same Day emergency or Thursday 9:30 AM"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Provides the client with scheduling availability.</span>
                  </div>
                </div>

                {/* Guarantee Note */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                    Artistry & Retention Assurance
                  </label>
                  <input
                    type="text"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    placeholder="e.g. Rose Browsz Artistry & Healed Retention Guarantee"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                  />
                </div>

                {/* Personal Message / Note to Client */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                    Direct Note to Client
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a custom explanation, pre-appointment preparation, or pigment notes..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 outline-none leading-relaxed transition"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    This note is prominently highlighted in the client's confirmation email.
                  </span>
                </div>

                {/* Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 font-mono">
                    Recipient: <strong className="text-slate-800">{quote.email}</strong>
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingQuote}
                    className="w-full sm:w-auto py-3 px-6 bg-shop-red hover:bg-shop-redHover disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-shop-red/20 flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
                  >
                    {isSendingQuote ? (
                       <span className="flex items-center space-x-2">
                         <span className="animate-spin">↻</span>
                         <span>Dispatching Estimate...</span>
                       </span>
                    ) : (
                      <span>Dispatch Estimate to Client →</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* TAB 2: Full Client Consultation Details */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Clinical Request Specs */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    // CLINICAL INTAKE DETAILS
                  </span>
                  <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Service Requested:</span>
                    <span className="text-slate-900 font-bold">{quote.detailedService || quote.serviceCategory || 'Signature PMU Brow Consultation'}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Category:</span>
                    <span className="text-slate-900 font-bold">{quote.serviceCategory || 'Signature PMU Brows & Academy'}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Studio Location:</span>
                    <span className="text-slate-900 font-medium">Roseville, CA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Timeline Preference:</span>
                    <span className="text-slate-900 font-medium">{quote.timeline || 'Flexible'} {quote.specificDate ? `(${quote.specificDate})` : ''}</span>
                  </div>
                </div>

                {/* Client Contact Specs */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-xs">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    // CLIENT CONTACT
                  </span>
                  <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Full Name:</span>
                    <span className="text-slate-900 font-bold">{quote.name}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Email:</span>
                    <span className="text-slate-900 font-medium font-mono">{quote.email}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Phone:</span>
                    <span className="text-slate-900 font-medium font-mono">{quote.phone || 'None provided'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Initial Status:</span>
                    <span className="text-shop-red font-mono font-bold uppercase">{quote.status || 'Pending'}</span>
                  </div>
                </div>
              </div>

              {/* Client Notes */}
              {(quote.details || quote.additionalNotes) && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-xs">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">// CLIENT COMMENTS & AESTHETIC GOALS</span>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{quote.details || quote.additionalNotes}</p>
                </div>
              )}

              {/* Custom Inquiries if applicable */}
              {quote.customIssue && quote.customIssue !== 'N/A' && (
                <div className="bg-red-50/50 border border-red-200 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold text-shop-red uppercase tracking-wider block font-mono">// SPECIFIC AESTHETIC CONCERN</span>
                  <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{quote.customIssue}</p>
                </div>
              )}

              {/* Delete Button */}
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition flex items-center space-x-1.5 border border-red-200 cursor-pointer font-mono"
                >
                  <span>[DELETE]</span>
                  <span>{isDeleting ? 'Removing...' : 'Delete Consultation Record'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


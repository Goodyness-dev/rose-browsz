import React, { useState, useEffect } from 'react';
import { quotesApi } from '../../services/api';

export default function DashboardOverview({ onNavigateTab, onSelectQuote, onOpenNewOrder }) {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, quoted: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Operatory Live Timer State
  const [timerSeconds, setTimerSeconds] = useState(5048); // 01:24:08 initial
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const loadData = async () => {
    try {
      const [quotesRes, statsRes] = await Promise.all([
        quotesApi.getQuotes({ limit: 10 }),
        quotesApi.getStats()
      ]);
      setQuotes(quotesRes.quotes || []);
      setStats(statsRes || { total: 0, pending: 0, quoted: 0, completed: 0 });
    } catch (err) {
      console.warn('Dashboard load note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const urgentOrder = quotes.find(q => q.status === 'pending') || quotes[0];

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER: Title & Quick Actions                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900">
            Studio & Academy Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Plan, prioritize, and manage PMU client consultations, brow assessments, and academy enrollments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <button
            onClick={onOpenNewOrder}
            className="flex-1 sm:flex-initial py-2.5 px-4 bg-shop-red hover:bg-shop-redHover text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-shop-red/20 flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
          >
            <span>+ Record Consultation</span>
          </button>

          <button
            onClick={() => onNavigateTab('orders')}
            className="flex-1 sm:flex-initial py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm rounded-xl transition shadow-xs active:scale-95 text-center cursor-pointer"
          >
            <span>Consultations Table</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4 STAT CARDS (Card 1: Solid Red Hero, Cards 2-4: Clean White)  */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Card 1: Solid Shop Red Fill */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-gradient-to-br from-shop-red to-shop-redHover text-white rounded-3xl p-7 sm:p-8 card-thick-hover cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-red-100">// TOTAL CONSULTATIONS</span>
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-mono text-xs">↗</span>
          </div>
          <div className="my-3 sm:my-4">
            <div className="text-3xl sm:text-4xl font-black font-heading tracking-tight">{stats.total}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-red-100 bg-white/15 px-2.5 py-1 rounded-full w-max font-medium">
            <span>↑ 22%</span>
            <span>client volume this month</span>
          </div>
        </div>

        {/* Card 2: Completed Treatments */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white border-2 border-slate-200/90 rounded-3xl p-7 sm:p-8 card-thick-hover cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-500">// COMPLETED PROCEDURES</span>
            <span className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center font-mono text-xs text-slate-700">↗</span>
          </div>
          <div className="my-3 sm:my-4">
            <div className="text-3xl sm:text-4xl font-black font-heading text-slate-900">{stats.completed}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full w-max font-medium">
            <span>✓ 100%</span>
            <span>5-star client satisfaction</span>
          </div>
        </div>

        {/* Card 3: Quotes Sent */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className="bg-white border-2 border-slate-200/90 rounded-3xl p-7 sm:p-8 card-thick-hover cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-500">// ESTIMATES SENT</span>
            <span className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center font-mono text-xs text-slate-700">↗</span>
          </div>
          <div className="my-3 sm:my-4">
            <div className="text-3xl sm:text-4xl font-black font-heading text-slate-900">{stats.quoted}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full w-max font-medium">
            <span>In discussion</span>
            <span>with clients</span>
          </div>
        </div>

        {/* Card 4: Pending Needs Review */}
        <div 
          onClick={() => onNavigateTab('inbox')}
          className="bg-white border-2 border-shop-border/90 rounded-3xl p-7 sm:p-8 card-thick-hover cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-shop-red">// AWAITING REVIEW</span>
            <span className="w-7 h-7 rounded-full border border-shop-border bg-shop-light flex items-center justify-center font-mono text-xs text-shop-red">↗</span>
          </div>
          <div className="my-3 sm:my-4">
            <div className="text-3xl sm:text-4xl font-black font-heading text-shop-red">{stats.pending}</div>
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full w-max font-medium">
            <span>Needs Assessment</span>
            <span>awaiting studio response</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECOND ROW: Weekly Analytics + Active Bay Reminder + Quick Projects */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weekly Consultation Volume (5 Cols) */}
        <div className="lg:col-span-5 bg-white border-2 border-slate-200/90 rounded-3xl p-7 sm:p-8 card-thick flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 block">// ANALYTICS</span>
              <h3 className="font-heading font-black text-sm uppercase tracking-wider text-slate-900">
                Weekly Consultation Volume
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-bold font-mono">This Week</span>
          </div>

          {/* Bar Chart Visual */}
          <div className="flex items-end justify-between gap-2 sm:gap-3 h-36 sm:h-40 pt-4 px-1 sm:px-2">
            {[
              { day: 'Sun', height: '25%', count: 2, solid: false },
              { day: 'Mon', height: '40%', count: 4, solid: false },
              { day: 'Tue', height: '85%', count: 9, solid: true, highlight: '34%' },
              { day: 'Wed', height: '95%', count: 11, solid: true },
              { day: 'Thu', height: '75%', count: 8, solid: true },
              { day: 'Fri', height: '90%', count: 10, solid: true },
              { day: 'Sat', height: '80%', count: 8, solid: true }
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                {bar.highlight && (
                  <span className="absolute -top-7 text-[10px] font-mono font-bold text-shop-red bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full shadow-xs">
                    {bar.highlight}
                  </span>
                )}
                <div 
                  className={`w-full max-w-[32px] sm:max-w-[36px] rounded-full transition-all duration-300 ${
                    bar.solid 
                      ? 'bg-gradient-to-t from-shop-red to-shop-redHover shadow-xs' 
                      : 'bg-slate-100 border border-slate-200/80'
                  }`}
                  style={{ height: bar.height }}
                />
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 mt-2">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-slate-100 mt-2 text-xs">
            <span className="flex items-center space-x-2 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-shop-red" />
              <span>Confirmed Visits</span>
            </span>
            <span className="flex items-center space-x-2 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <span>In Consultation</span>
            </span>
          </div>
        </div>

        {/* Middle: Priority Consultation Reminder (3 Cols) */}
        <div className="lg:col-span-3 bg-white border-2 border-slate-200/90 rounded-3xl p-7 sm:p-8 card-thick flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
              <span>// PRIORITY CASE</span>
              <span className="w-2 h-2 rounded-full bg-shop-red animate-ping" />
            </div>

            {urgentOrder ? (
              <div className="space-y-2">
                <h4 className="text-base font-black font-heading text-slate-900 leading-tight">
                  {urgentOrder.name}
                </h4>
                <div className="text-xs text-shop-red font-bold font-mono">
                  {urgentOrder.detailedService || urgentOrder.serviceCategory || 'Signature PMU Brow Consultation'}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {urgentOrder.details || urgentOrder.customIssue || 'Client requested consultation and appointment date.'}
                </p>
                <div className="text-[11px] text-slate-400 pt-1 font-mono">
                  <span>Timeline: {urgentOrder.timeline || 'Upcoming Cohort / Session'}</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 py-6">No priority requests currently waiting.</div>
            )}
          </div>

          <button
            onClick={() => urgentOrder && onSelectQuote(urgentOrder)}
            className="w-full mt-4 py-3 px-4 bg-shop-red hover:bg-shop-redHover text-white font-bold text-xs rounded-2xl transition shadow-md shadow-shop-red/20 flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95"
          >
            <span>Review Consultation Case →</span>
          </button>
        </div>

        {/* Right: Quick Recent Orders List (4 Cols) */}
        <div className="lg:col-span-4 bg-white border-2 border-slate-200/90 rounded-3xl p-7 sm:p-8 card-thick flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 block">// INCOMING</span>
              <h3 className="font-heading font-black text-sm uppercase tracking-wider text-slate-900">
                Recent Inquiries
              </h3>
            </div>
            <button
              onClick={onOpenNewOrder}
              className="text-xs font-bold text-shop-red hover:underline font-mono"
            >
              + New
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {quotes.slice(0, 4).map(q => (
              <div 
                key={q.id}
                onClick={() => onSelectQuote(q)}
                className="py-2.5 flex items-center justify-between hover:bg-slate-50 rounded-xl px-2 -mx-2 transition cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="font-bold text-xs text-slate-900 truncate">
                    {q.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {q.detailedService || q.serviceCategory || 'PMU Brow Consultation'}
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  q.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  q.status === 'quoted' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                  q.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {q.status ? q.status.toUpperCase() : 'PENDING'}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('orders')}
            className="w-full text-center text-xs font-bold text-shop-red hover:underline pt-3 border-t border-slate-100 mt-2 flex items-center justify-center space-x-1 cursor-pointer"
          >
            <span>View all {quotes.length} client inquiries →</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* THIRD ROW: Customer Inquiries + Turnaround + Operatory Timer */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left: Customer Inquiries (5 Cols) */}
        <div className="lg:col-span-5 bg-white border-2 border-slate-200/90 rounded-3xl p-7 sm:p-8 card-thick">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 block">// MESSAGES</span>
              <h3 className="font-heading font-black text-sm uppercase tracking-wider text-slate-900">
                Client Leads & Consultations
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('inbox')}
              className="text-xs font-bold text-slate-600 hover:text-shop-red flex items-center space-x-1 border border-slate-200 px-2.5 py-1 rounded-xl cursor-pointer"
            >
              <span>Open Inbox →</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {quotes.slice(0, 4).map(q => {
              const initials = (q.name || 'Client').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
              return (
                <div 
                  key={q.id}
                  onClick={() => onSelectQuote(q)}
                  className="p-3 bg-slate-50/70 hover:bg-slate-100/80 border border-slate-100 rounded-2xl flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-shop-red font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-xs text-slate-900 truncate">{q.name}</h5>
                      <span className="text-[11px] text-slate-500 truncate block">
                        {q.detailedService || q.serviceCategory || 'Consultation'}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    q.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                    q.status === 'quoted' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {q.status === 'completed' ? 'COMPLETED' : q.status === 'quoted' ? 'QUOTED' : 'NEEDS ASSESSMENT'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle: Turnaround Rate (3 Cols) */}
        <div className="lg:col-span-3 bg-white border-2 border-slate-200/90 rounded-3xl p-7 sm:p-8 card-thick flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 block">// METRICS</span>
            <h3 className="font-heading font-black text-sm uppercase tracking-wider text-slate-900 mb-2">
              Booking Rate
            </h3>
          </div>

          <div className="relative flex flex-col items-center justify-center py-2">
            <svg className="w-36 h-20" viewBox="0 0 100 50">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 10 50 A 40 40 0 0 1 75 20"
                fill="none"
                stroke="#dc2626"
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center -mt-6">
              <div className="text-3xl font-black font-heading text-slate-900 font-mono">92%</div>
              <span className="text-[11px] font-bold text-slate-400">Consultation Conversion</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100 font-mono">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-shop-red" />
              <span>Confirmed</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span>In Assessment</span>
            </span>
          </div>
        </div>

        {/* Right: Studio Procedure Timer (4 Cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-black text-white border-2 border-slate-800 rounded-3xl p-7 sm:p-8 card-thick flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            <span>Procedure Timer</span>
            <span className="text-emerald-400 font-mono text-[11px]">● ACTIVE</span>
          </div>

          <div className="my-4 text-center">
            <div className="text-3xl sm:text-4xl font-mono font-black tracking-widest text-white">
              {formatTimer(timerSeconds)}
            </div>
            <span className="text-xs text-slate-400 mt-1 block font-mono">Active Mapping & Numbing Clock</span>
          </div>

          <div className="flex items-center justify-center space-x-3 pt-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-200 transition active:scale-95 cursor-pointer font-mono"
            >
              {isTimerRunning ? '⏸ Pause' : '▶ Resume'}
            </button>
            <button
              onClick={() => setTimerSeconds(0)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:text-white hover:bg-slate-700 transition active:scale-95 cursor-pointer font-mono"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

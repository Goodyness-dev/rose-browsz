import React, { useState, useRef, useEffect } from 'react';
import { SERVICES, SERVICE_CATEGORIES } from '../../data/servicesData';
import { submitQuoteRequest } from '../../services/quoteService';
import useDialog from '../../hooks/useDialog';

export default function QuoteWizardModal({ isOpen, onClose, initialCategory, initialService }) {
  const ref = useRef(null);
  const heading = useRef(null);
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({ serviceCategory: initialCategory || 'Signature PMU Brows', detailedService: initialService || '', timeline: 'Flexible / next available', specificDate: '', name: '', email: '', phone: '', details: '' });
  useDialog(ref, onClose, isOpen);
  useEffect(() => { if (result) ref.current?.querySelector('[role="status"]')?.focus(); }, [result]);
  if (!isOpen) return null;
  const change = e => { const {name,value} = e.target; setForm(f => ({...f,[name]:value,...(name === 'serviceCategory' ? {detailedService:''} : {})})); setError(''); };
  const move = value => { setStep(value); setError(''); requestAnimationFrame(() => heading.current?.focus()); };
  const submit = async e => {
    e.preventDefault();
    if (step < 3) { move(step + 1); return; }
    if (busy) return;
    setBusy(true); setError('');
    try { setResult(await submitQuoteRequest({...form, detailedService: form.detailedService || 'Help me choose', location:'Roseville, CA'})); }
    catch { setError("Your request wasn't sent. Please try again, or call (916) 626-2076. Your details are still here."); }
    finally { setBusy(false); }
  };
  const now = new Date();
  const today = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
  const titles = ['What brings you in?', 'Make it personal.', 'One last little detail.'];
  return <div className="rb-modal-backdrop" data-lenis-prevent>
    <section ref={ref} className="rb-booking rb-enter" role="dialog" aria-modal="true" aria-labelledby="rb-booking-title">
      <header><span className="rb-eyebrow">ROSE BROWSZ / YOUR NEXT VISIT</span><button type="button" onClick={onClose} aria-label="Close booking request">Close</button></header>
      <div className="rb-booking-body">
        {result ? <div className="rb-booking-success" role="status" tabIndex={-1}><p className="rb-eyebrow">REQUEST RECEIVED</p><h2 id="rb-booking-title">A lovely<br/><em>first step.</em></h2><p>Thank you, {form.name.split(' ')[0]}. The studio will follow up to discuss your treatment and confirm availability.</p><p className="rb-muted">This is an appointment request, not a confirmed booking.</p><small>Reference: {result.quoteId}</small><button className="rb-button" onClick={onClose}>Back to the studio ↗</button></div> : <>
          <ol className="rb-steps" aria-label="Request progress">{['Your treatment','Your preferences','Your details'].map((label,i)=><li key={label} aria-current={step===i+1?'step':undefined}><span>{String(i+1).padStart(2,'0')}</span>{label}</li>)}</ol>
          <h2 id="rb-booking-title" ref={heading} tabIndex={-1}>{titles[step-1]}</h2>
          <form onSubmit={submit}>
            {step===1 && <div className="rb-fields"><label>Treatment category<select name="serviceCategory" value={form.serviceCategory} onChange={change}>{SERVICE_CATEGORIES.slice(1).map(c=><option key={c}>{c}</option>)}</select></label><label>A treatment you have in mind<select name="detailedService" value={form.detailedService} onChange={change}><option value="">I'd love some guidance</option>{SERVICES.filter(s=>s.category===form.serviceCategory).map(s=><option key={s.id} value={s.title}>{s.title}</option>)}</select></label><p className="rb-muted">Not sure? That's perfectly fine. Jess will help you find the right fit.</p></div>}
            {step===2 && <div className="rb-fields"><div className="rb-field-pair"><label>Your preferred timing<select name="timeline" value={form.timeline} onChange={change}><option>Flexible / next available</option><option>Weekday / Tuesday–Thursday</option><option>Weekend / Friday–Saturday</option><option>Upcoming academy course</option></select></label><label>Preferred date (optional)<input type="date" name="specificDate" min={today} value={form.specificDate} onChange={change}/></label></div><label>Anything you'd like Jess to know? (optional)<textarea name="details" value={form.details} onChange={change} rows={4} maxLength={2000} placeholder="Your desired look, previous work, or a question for Jess…"/></label><p className="rb-muted">We'll confirm available dates with you personally.</p></div>}
            {step===3 && <div className="rb-fields"><div className="rb-request-summary"><span>{form.detailedService || form.serviceCategory}</span><small>{form.timeline}{form.specificDate ? ' / ' + form.specificDate : ''}</small><button type="button" className="rb-text-link" onClick={()=>move(1)}>Edit preferences</button></div><label>Your name<input name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={change}/></label><div className="rb-field-pair"><label>Email address<input type="email" name="email" autoComplete="email" required maxLength={180} value={form.email} onChange={change}/></label><label>Phone number<input type="tel" name="phone" autoComplete="tel" required maxLength={30} value={form.phone} onChange={change}/></label></div><p className="rb-muted">The studio will use these details to respond to your request.</p></div>}
            {error && <p className="rb-error" role="alert">{error}</p>}
            <footer className="rb-booking-controls"><button type="button" className="rb-text-link" onClick={()=>step===1?onClose():move(step-1)} disabled={busy}>{step===1?'Maybe later':'← Back'}</button><button className="rb-button" type="submit" disabled={busy}>{busy?'Sending…':step===3?'Send appointment request ↗':'Continue →'}</button></footer>
          </form>
        </>}
      </div>
    </section>
  </div>;
}

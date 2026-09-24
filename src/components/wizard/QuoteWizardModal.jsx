import React, { useState, useEffect } from 'react';
import { submitQuoteRequest } from '../../services/quoteService';

export default function QuoteWizardModal({ isOpen, onClose, initialCategory = null, initialService = null }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const [formData, setFormData] = useState({
    serviceCategory: 'Signature PMU Brows',
    detailedService: 'Virgin Brow Machine Nano Transformation',
    urgency: 'Next available appointment',
    browHistory: 'Virgin Brows (Never had PMU)',
    skinType: 'Normal / Dry Skin',
    details: '',
    location: 'Roseville, CA',
    instagramHandle: '',
    email: '',
    name: '',
    phone: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialCategory) {
        setFormData(prev => ({
          ...prev,
          serviceCategory: initialCategory,
          detailedService: initialService || 'Signature PMU Brow Consultation'
        }));
      }
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => {
        setCurrentStep(1);
        setSubmissionResult(null);
        setErrorMsg('');
      }, 300);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, initialCategory, initialService]);

  if (!isOpen) return null;

  const pmuCategories = [
    {
      id: 'Signature PMU Brows',
      tag: '// 01',
      title: 'Signature Nano Brows',
      desc: 'Feathered machine hair strokes with organic Li Pigments for hyper-realistic fullness.',
      defaultService: 'Virgin Brow Machine Nano Transformation'
    },
    {
      id: 'Ombré Powder Brows',
      tag: '// 02',
      title: 'Ombré Powder Brows',
      desc: 'Velvet soft gradient shading with defined tails and airy bulb transitions.',
      defaultService: 'Ombré Powder Brow Consultation'
    },
    {
      id: 'Combo Brows',
      tag: '// 03',
      title: 'Combo Brows (Hybrid)',
      desc: 'Hairstrokes at the front bulb combined with powder depth along the body and arch.',
      defaultService: 'Hybrid Combo Brow Artistry'
    },
    {
      id: 'Aquarelle Lip Blush',
      tag: '// 04',
      title: 'Aquarelle Lip Blush',
      desc: 'Semi-permanent tinted lip contour, symmetry balance, and melanin neutralization.',
      defaultService: 'Aquarelle Lip Blush Treatment'
    },
    {
      id: 'PMU Academy Training',
      tag: '// 05',
      title: 'PMU Academy & Certification',
      desc: 'Intensive 1-on-1 and small cohort masterclasses with Li Pigments Pro Jess.',
      defaultService: '3-Day Beginner Nano Machine Brow Course'
    },
    {
      id: 'Lamination & Shaping',
      tag: '// 06',
      title: 'Brow Lamination & Shaping',
      desc: 'Keratin lift, precision mapping, custom tinting, and botanical wax sculpting.',
      defaultService: 'Brow Lamination + Keratin Tint + Wax'
    }
  ];

  const commonAestheticGoals = [
    'Sparse or over-plucked brows seeking natural realistic fullness',
    'Previous microblading/PMU that requires correction or color coverup',
    'Asymmetrical arches that need golden ratio architectural balancing',
    'Wanting a soft everyday powder makeup look without morning brow pencil',
    'Pale, uneven lip borders or wanting subtle natural berry/rose blush tint',
    'Dark lips requiring melanin neutralization before target color saturation',
    'Interested in launching a 6-figure PMU business with Jess’s certification'
  ];

  const urgencyLevels = [
    {
      id: 'weekend',
      label: '✨ Weekend Slot (Friday or Saturday)',
      sub: 'Most popular slots — recommended to book 2-3 weeks in advance',
      val: 'Weekend Appointment (Fri / Sat)'
    },
    {
      id: 'weekday',
      label: '🗓️ Weekday Slot (Tuesday – Thursday)',
      sub: 'Flexible daytime appointments at our Roseville studio',
      val: 'Weekday Appointment (Tue – Thu)'
    },
    {
      id: 'academy',
      label: '🎓 Upcoming Academy Cohort',
      sub: 'Enrolling in the next hands-on certification training session',
      val: 'Academy Certification Next Cohort'
    }
  ];

  const browHistoryTypes = [
    { label: 'Virgin Brows (Never had PMU)', desc: 'Blank canvas — ideal for nano machine hair strokes or ombré powder.' },
    { label: 'Previous PMU / Microblading (Coverup/Correction)', desc: 'Requires photo assessment to ensure old pigment is faded enough (70%+ faded).' },
    { label: 'Returning Rose Browsz Client (Touch-Up / Refresh)', desc: '6-8 week perfecting touch-up or 12-24 month annual color boost.' },
    { label: 'Academy Student Applicant', desc: 'Seeking professional certification and hands-on live model training.' }
  ];

  const skinTypes = [
    'Normal to Dry Skin (Ideal for Nano Strokes & Powder)',
    'Combination Skin (T-zone oiliness / normal cheeks)',
    'Oily or Large Pores (Ombré Powder strongly recommended for crisp retention)',
    'Sensitive, Thin, or Mature Skin'
  ];

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 6) {
      handleSubmit();
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please provide your full name, phone number, and email.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceCategory: formData.serviceCategory,
        detailedService: formData.detailedService,
        timeline: formData.urgency,
        modelAndYear: `${formData.browHistory} • ${formData.skinType}`,
        location: formData.location || 'Roseville, CA',
        details: `${formData.details || 'No additional notes.'}\nIG Handle: ${formData.instagramHandle || 'N/A'}\nPreferred Timing: ${formData.urgency}`
      };

      const res = await submitQuoteRequest(payload);
      setSubmissionResult(res);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit consultation request. Please call or text Jess directly at (916) 626-2076.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white border-2 border-neutral-300 dark:border-neutral-700 rounded-3xl card-thick shadow-2xl overflow-hidden my-auto transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[10px] font-mono font-bold text-rose-600 uppercase tracking-wider mb-1">
              Step {currentStep} of {totalSteps}
            </div>
            <h3 className="text-base sm:text-lg font-heading font-black text-neutral-900 leading-tight">
              {currentStep === 1 && "Which PMU service or academy program interests you?"}
              {currentStep === 2 && "Select your specific aesthetic treatment"}
              {currentStep === 3 && "When would you prefer your appointment?"}
              {currentStep === 4 && "Tell us about your brow history & skin type"}
              {currentStep === 5 && "Select your aesthetic goals & specific requests"}
              {currentStep === 6 && "Where should Jess send your consultation details?"}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/70 transition font-mono text-sm cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-neutral-100 h-1">
          <div 
            className="bg-rose-600 h-1 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[65vh] overflow-y-auto">
          {submissionResult ? (
            /* Success State */
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-xs text-xl font-bold font-mono">
                ✓
              </div>
              <h4 className="text-2xl font-black font-heading text-neutral-900">
                Consultation Request Received!
              </h4>
              <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Jess and the Rose Browsz studio team have received your inquiry for <strong>{formData.detailedService}</strong>. We will review your notes and reach out at <strong>{formData.phone}</strong> or Instagram DM within 24 hours.
              </p>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 max-w-sm mx-auto space-y-1 text-left font-mono">
                <p><span className="text-neutral-400 font-sans">Studio:</span> 973 Pleasant Grove Blvd Ste 130, Roseville, CA 95678</p>
                <p><span className="text-neutral-400 font-sans">Direct Text:</span> (916) 626-2076</p>
                <p><span className="text-neutral-400 font-sans">Instagram:</span> @rose.browsz</p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://rosebrowsz.glossgenius.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-rose-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-rose-700 transition cursor-pointer shadow-md"
                >
                  Book Instantly on GlossGenius →
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition cursor-pointer"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <span className="font-bold shrink-0">!</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: Care Category */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pmuCategories.map((cat) => {
                    const isSelected = formData.serviceCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            serviceCategory: cat.id,
                            detailedService: cat.defaultService
                          }));
                          setCurrentStep(2);
                        }}
                        className={`p-5 sm:p-6 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-rose-600 bg-rose-50/50 ring-2 ring-rose-600/20 card-thick'
                            : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 card-thick-hover'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[11px] font-bold text-rose-600">{cat.tag}</span>
                          <span className="text-xs text-neutral-400 font-mono">→</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 text-sm">{cat.title}</h4>
                          <p className="text-xs text-neutral-500 mt-0.5 leading-snug">{cat.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 2: Detailed Service */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs text-neutral-500">
                    <span className="font-mono text-rose-600">// CATEGORY:</span>
                    <strong className="text-neutral-900">{formData.serviceCategory}</strong>
                  </div>
                  <div className="space-y-2">
                    {[
                      'Virgin Brow Machine Nano Transformation ($550)',
                      'Ombré Powder Brows — Velvet Soft Gradient ($500)',
                      'Hybrid Combo Brows — Nano Hairstrokes + Shading ($575)',
                      'Aquarelle Lip Blush Saturation ($500)',
                      'Dark Lip Melanin Neutralization ($525)',
                      '6-8 Week Perfecting Brow Touch-Up ($150)',
                      'Annual Brow Color Boost (12-24 Months) ($275)',
                      'Brow Lamination + Keratin Tint + Wax Sculpt ($110)',
                      '3-Day Beginner Nano Machine Masterclass ($2,800)',
                      '2-Day Ombré Powder Brow Certification ($2,200)',
                      '1-on-1 Private Mentorship & Live Model Day ($1,500)'
                    ].map((srv) => {
                      const isSelected = formData.detailedService === srv;
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, detailedService: srv }))}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold flex items-center justify-between transition cursor-pointer ${
                            isSelected
                              ? 'border-rose-600 bg-rose-50/60 text-rose-600 ring-1 ring-rose-600/20'
                              : 'border-neutral-200 hover:bg-neutral-50 text-neutral-800'
                          }`}
                        >
                          <span>{srv}</span>
                          {isSelected && <span className="font-mono text-xs font-bold text-rose-600">✓ Selected</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Timing */}
              {currentStep === 3 && (
                <div className="space-y-3">
                  {urgencyLevels.map((lvl) => {
                    const isSelected = formData.urgency === lvl.val;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, urgency: lvl.val }))}
                        className={`w-full p-5 rounded-2xl border-2 text-left transition cursor-pointer ${
                          isSelected
                            ? 'border-rose-600 bg-rose-50/50 ring-2 ring-rose-600/20 card-thick'
                            : 'border-neutral-200 hover:bg-neutral-50 card-thick-hover'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            isSelected ? 'bg-rose-600 text-white border-rose-600' : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                          }`}>
                            {lvl.id.toUpperCase()}
                          </span>
                          {isSelected && <span className="text-xs font-mono font-bold text-rose-600">✓</span>}
                        </div>
                        <h4 className="font-bold text-neutral-900 text-sm mt-1">{lvl.label}</h4>
                        <p className="text-xs text-neutral-500 mt-0.5">{lvl.sub}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 4: Brow History & Skin Type */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">// BROW & COSMETIC HISTORY</label>
                    <div className="space-y-2">
                      {browHistoryTypes.map((pt) => {
                        const isSelected = formData.browHistory === pt.label;
                        return (
                          <button
                            key={pt.label}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, browHistory: pt.label }))}
                            className={`w-full p-3.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'border-rose-600 bg-rose-50 text-rose-600'
                                : 'border-neutral-200 hover:bg-neutral-50 text-neutral-800'
                            }`}
                          >
                            <div>
                              <span className="font-bold text-xs sm:text-sm block">{pt.label}</span>
                              <span className="text-[11px] text-neutral-500">{pt.desc}</span>
                            </div>
                            {isSelected && <span className="font-mono text-xs font-bold text-rose-600 shrink-0">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">// SKIN TYPE & SENSITIVITY</label>
                    <select
                      value={formData.skinType}
                      onChange={(e) => setFormData(prev => ({ ...prev, skinType: e.target.value }))}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 outline-none focus:border-rose-600 focus:bg-white"
                    >
                      {skinTypes.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 5: Goals & Notes */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
                      // YOUR AESTHETIC GOALS (SELECT ALL THAT APPLY):
                    </label>
                    <div className="space-y-1.5">
                      {commonAestheticGoals.map((sym) => (
                        <label 
                          key={sym}
                          className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 cursor-pointer text-xs sm:text-sm text-neutral-700"
                        >
                          <input
                            type="checkbox"
                            checked={formData.details.includes(sym)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({ ...prev, details: prev.details ? `${prev.details}, ${sym}` : sym }));
                              } else {
                                setFormData(prev => ({ ...prev, details: prev.details.replace(sym, '').replace(', ,', ',').trim() }));
                              }
                            }}
                            className="rounded text-rose-600 focus:ring-rose-600 w-4 h-4"
                          />
                          <span>{sym}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      // ADDITIONAL NOTES / QUESTIONS FOR JESS:
                    </label>
                    <textarea
                      rows={2}
                      value={formData.details}
                      onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                      placeholder="e.g. Seeking soft natural blonde ash tones, previous microblading done 3 years ago..."
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs sm:text-sm text-neutral-900 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* STEP 6: Contact Information */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-neutral-700 flex items-center space-x-2.5">
                    <span className="font-mono font-bold text-rose-600 text-xs">// CONFIDENTIAL</span>
                    <span>Your contact details and consultation request are kept strictly private.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Jessica Taylor"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 outline-none focus:border-rose-600 focus:bg-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-1">Phone Number (Cell/SMS) *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(916) 000-0000"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 outline-none focus:border-rose-600 focus:bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="jessica@example.com"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 outline-none focus:border-rose-600 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-1">Instagram Handle (Optional - for brow photo review)</label>
                    <input
                      type="text"
                      value={formData.instagramHandle}
                      onChange={(e) => setFormData(prev => ({ ...prev, instagramHandle: e.target.value }))}
                      placeholder="@yourhandle"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Controls */}
        {!submissionResult && (
          <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 rounded-xl hover:bg-neutral-200/70 transition flex items-center space-x-1 cursor-pointer"
              >
                <span>← Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold transition shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer flex items-center space-x-1.5"
            >
              {isSubmitting ? (
                <span>Submitting request...</span>
              ) : currentStep === totalSteps ? (
                <span>Request Consultation & Quote →</span>
              ) : (
                <span>Next →</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


import { useEffect } from 'react';
export default function useDialog(ref, onClose, active = true) {
  useEffect(() => {
    if (!active) return;
    const dialog = ref.current;
    if (!dialog) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const lenis = window.__lenis;
    lenis?.stop();
    const controls = () => [...dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')].filter(el => el.getClientRects().length);
    controls()[0]?.focus();
    const keydown = e => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      if (e.key === 'Tab') {
        const items = controls(), first = items[0], last = items[items.length - 1];
        if (!items.length) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    dialog.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = overflow; lenis?.start(); dialog.removeEventListener('keydown', keydown); previous?.focus(); };
  }, [active, ref, onClose]);
}

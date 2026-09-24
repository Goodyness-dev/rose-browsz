# Antigravity Project Intelligence & Permanent Memory
> **Dr. Sharon New Glass, DMD (Glass Family & Cosmetic Dentistry) Web Platform & Staff Portal**
> This file is loaded automatically by Antigravity at the start of every session and new chat.

---

## ⚡ RAPID ITERATION & ACCELERATION DIRECTIVE
When the user asks for new features, design iterations, or new websites, DO NOT start from scratch or spend hours reinventing solutions. Follow these proven principles to build, test, and ship at 10x speed:

1. **Autonomous Verification Before Completion**: Always run `npm run build` locally to catch syntax errors or broken imports before committing.
2. **One-Command Pipeline (Windows PowerShell)**: Never use bash `&&` syntax. Always chain commands with `;`:
   ```powershell
   git add . ; git commit -m "<message>" ; git push origin master ; npx vercel --prod --yes
   ```
3. **Keep Ground Truth Synchronized**:
   - Location: 105 Medical Center Dr., Clanton, AL 35045-2331 | (205) 755-1111
   - Production URL: `https://glass-dentistry.vercel.app`
   - Catalog: `#/services` | Admin: `#/admin` | Practice: `#/about`

---

## 🎨 AESTHETICS & UI STANDARDS (THE "THICK & ALIVE" SYSTEM)
- **Zero Flat Cards**: Every card must feel tactile, premium, and alive.
  - Classes: `card-thick` or `card-thick-hover` (multi-layered drop shadow defined in `src/index.css`).
  - Outlines: `border-2 border-neutral-200/90 dark:border-neutral-800/90` with rounded corners (`rounded-3xl` or `rounded-2xl`).
  - Internal Breathing Room: Generous padding (`p-7` to `p-12`). Never use cramped `p-3` or `p-4` for primary content cards.
- **Zero Lucide-React / External Icon Libraries**:
  - NEVER import from `lucide-react` or other icon libraries. They create bloat, missing export crashes, and generic visuals.
  - ALWAYS use lightweight, semantic, inline SVGs crafted directly into components.
- **Dark & Light Mode Harmony**:
  - Support high-contrast dark mode (`dark:bg-black`, `dark:text-white`, `dark:border-neutral-800`).

---

## 🎬 HERO VIDEO SCROLL & SMOOTH SCROLL ARCHITECTURE
- **Full-Screen Video Scroller (Desktop)**:
  - Video asset: `/A_cinematic_second_beauty_ad.mp4` in `public/`.
  - Scrubbed via GSAP `ScrollTrigger` (`pin: true`, `scrub: 1.5`, `start: "top top"`, `end: "+=350%"`).
  - Never replace with SVG mouth illustrations when the user provides cinematic video.
- **Mobile Hero Fallback Rule (< 768px)**:
  - NEVER pin or force 350% scroll scrubbing on mobile touch devices. Mobile browser address bar resizes cause severe scroll jitter and trap users.
  - On mobile screens, provide an instantaneous, high-contrast poster image fallback (`/images/hero-smile-poster.jpg` with `fetchpriority="high"`) and native 60/120Hz touch scrolling.
  - Both CTA buttons ("Book Your Smile Appointment" and "Call (520) 836-7111") must be immediately visible and clickable on mobile load without requiring scrolling.
- **Lightning Load Speed & Code-Splitting Directive**:
  - Always code-split heavy secondary pages (`AdminLayout`, `AdminLogin`, `AllServicesPage`, `AboutPracticePage`) and modals (`QuoteWizardModal`) using `React.lazy()` and `<Suspense>`.
  - Configure manual chunks in `vite.config.js` (`vendor`, `animations`).
  - Preconnect & dns-prefetch fonts, and preload mobile hero poster image in `index.html`.
- **Lenis Smooth Scrolling Rule**:
  - Lenis is initialized in `src/App.jsx` and exposed globally on `window.__lenis = lenis`.
  - When scrolling to anchors (`#services`, `#contact`, `#location`), ALWAYS use `window.__lenis.scrollTo(el, { offset: -75, duration: 1.2 })`.
  - Calling native `scrollIntoView()` gets cancelled by Lenis RAF ticker and gets trapped in GSAP pinned spacer sections.
  - If user is on a subpage (`/about`, `/services`, `/admin`), switch `currentPage` to `'home'` first, push clear pathname, and scroll after a brief DOM mount delay.

---

## 🤖 2026 AI-ACCESSIBILITY & LOCAL GEO SEO STANDARD
Whenever building or updating this site or ANY new website:
1. **Machine-Readable AI Knowledge Endpoints**:
   - Maintain `public/llms.txt` (concise practice summary for LLMs) and `public/llms-full.txt` (complete procedures and doctor bios).
2. **AI Crawler Permissions in `robots.txt`**:
   - Explicitly permit `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `cohere-ai`, and `Meta-ExternalAgent`.
   - Link `LLM-Text: /llms.txt`.
3. **Zero-JavaScript Semantic Fallback (`<noscript>`)**:
   - Many AI bots (e.g. ChatGPT link reader, Python scrapers) do NOT run client-side JavaScript.
   - Always maintain a comprehensive semantic `<noscript>` block in `index.html` containing address, phone, doctors, treatments, and hours so AI tools read 100% of the site without needing JS.
4. **Local SEO & Geo Meta**:
   - `geo.region`, `geo.placename`, `geo.position`, and `ICBM`.
   - Schema.org `Dentist` JSON-LD with coordinates, phone, hours, and doctors.
   - OpenGraph `og:image` (1200x630) and `twitter:card: summary_large_image`.

---

## 📱 RESPONSIVE ADMIN DASHBOARD
- Route: `#/admin` (component: `src/components/admin/AdminDashboard.jsx`).
- Must support mobile screens, tablets, and desktop:
  - Collapsible drawer sidebar with backdrop blur on mobile.
  - Responsive KPI cards, consultation queue, real-time message inbox, and practice configuration.

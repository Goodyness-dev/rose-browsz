/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#000000',
          pure: '#000000',
          card: '#0a0a0a',
          cardHover: '#111111',
          border: '#1e1e1e',
          subtle: '#2a2a2a',
        },
        shop: {
          red: '#e11d48',        // Signature Velvet Rose
          redHover: '#be123c',   // Deep Rose Noir
          gold: '#c59b27',       // Luxury Academy Champagne Gold
          dark: '#0a0a0a',
          charcoal: '#121212',
          body: '#4a4a4a',
          muted: '#717171',
          light: '#fff1f2',
          border: '#ffe4e6',
        }
      },
      fontFamily: {
        editorial: ['"Plus Jakarta Sans"', '"Playfair Display"', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

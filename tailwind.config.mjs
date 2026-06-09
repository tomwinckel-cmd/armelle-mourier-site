/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Palette pilotable : chaque couleur pointe vers une variable CSS
        // (canaux RGB) définie dans src/styles/global.css et surchargée par
        // src/data/theme.ts via Base.astro. Le format « rgb(var(--x) /
        // <alpha-value>) » préserve les opacités Tailwind (ex. bg-encre/10).
        // Pour CHANGER les couleurs : éditer src/data/theme.ts (le cockpit).
        paper: 'rgb(var(--c-paper) / <alpha-value>)',        // fond ivoire chaud
        brume: 'rgb(var(--c-brume) / <alpha-value>)',        // fond secondaire
        white: 'rgb(var(--c-white) / <alpha-value>)',        // blanc pur
        encre: 'rgb(var(--c-encre) / <alpha-value>)',        // bleu profond
        blueSoft: 'rgb(var(--c-blue-soft) / <alpha-value>)', // bleu clair (carte)
        cendre: 'rgb(var(--c-cendre) / <alpha-value>)',      // gris-bleu cendré
        or: 'rgb(var(--c-or) / <alpha-value>)',              // or doux — accent
        noir: 'rgb(var(--c-noir) / <alpha-value>)',          // noir doux — texte
      },
      borderRadius: {
        // Rayon des cartes piloté par le thème (src/data/theme.ts).
        card: 'var(--radius-card)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
      },
      fontFamily: {
        // Pilotées par theme.typography via les variables CSS (Base.astro).
        // Fraunces (serif douce, titres/signature) ; Mulish (sans, texte).
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Échelle typographique posée, pensée pour la respiration
        'display': ['clamp(2.6rem, 7vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.01em' }],
        'h1': ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '1.08' }],
        'h2': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15' }],
        'h3': ['clamp(1.2rem, 2vw, 1.5rem)', { lineHeight: '1.25' }],
        'eyebrow': ['0.78rem', { lineHeight: '1', letterSpacing: '0.22em' }],
      },
      maxWidth: {
        prose: '64ch',
        shell: '78rem',
      },
      spacing: {
        section: 'clamp(4rem, 9vw, 8rem)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

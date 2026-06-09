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
        paper: 'rgb(var(--c-paper) / <alpha-value>)',        // papier chaud / carnet
        paperRaw: 'rgb(var(--c-paper-raw) / <alpha-value>)', // papier brut
        brume: 'rgb(var(--c-brume) / <alpha-value>)',        // fond secondaire (= papier brut)
        white: 'rgb(var(--c-white) / <alpha-value>)',        // blanc cassé papier
        encre: 'rgb(var(--c-encre) / <alpha-value>)',        // bleu nuit pictural
        bluePigment: 'rgb(var(--c-blue-pigment) / <alpha-value>)', // outremer / Collioure
        blueSoft: 'rgb(var(--c-blue-soft) / <alpha-value>)', // bleu clair aquatique
        cendre: 'rgb(var(--c-cendre) / <alpha-value>)',      // bleu-gris cendre
        or: 'rgb(var(--c-or) / <alpha-value>)',              // ocre-pigment
        noir: 'rgb(var(--c-noir) / <alpha-value>)',          // noir encre
        charcoal: 'rgb(var(--c-charcoal) / <alpha-value>)',  // charbon / masse
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

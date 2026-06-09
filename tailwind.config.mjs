/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Palette « Bleu Cendres » — issue de l'univers réel de l'artiste
        // (le bleu profond et l'or de la série/recueil Bleu Cendres).
        paper: '#F5F2EB',  // fond ivoire, chaud
        brume: '#E9E5DA',  // section alternée, ivoire plus profond
        encre: '#173039',  // bleu profond (cendre/mer) — couleur principale sombre
        cendre: '#6F7C82', // gris-bleu cendré — texte secondaire, filets
        or: '#A9791F',     // or cendré — accent (jamais terracotta)
        noir: '#211F1B',   // noir doux — texte courant
      },
      fontFamily: {
        // Fraunces : serif caractérielle et douce pour les titres.
        // Mulish : sans-serif humaniste, calme et lisible, pour le texte.
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Mulish', 'system-ui', 'sans-serif'],
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

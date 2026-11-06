import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// URL canonique du site (SEO, plan du site, robots.txt, partage).
// Ordre de priorité :
//  1. SITE_URL, si elle est définie (variable d'environnement Vercel ou locale) ;
//  2. le domaine de production fourni par Vercel au build
//     (VERCEL_PROJECT_PRODUCTION_URL) : il bascule TOUT SEUL sur le nom de
//     domaine dès qu'il est ajouté au projet Vercel — aucune modification ici ;
//  3. sinon (CI, poste local) l'adresse vercel.app actuelle.
const SITE_URL =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://armelle-mourier-site.vercel.app');

// https://astro.build
export default defineConfig({
  site: SITE_URL,
  integrations: [
    tailwind({ applyBaseStyles: false }), // on garde la main sur le CSS de base
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});

import type { APIRoute } from 'astro';
import { detailArtworks } from '../data/artworks';
import { site } from '../data/site';

// Plan du site — généré au build (statique), sans dépendance externe.
// ⚠️ Les pages INTERNES (/cockpit-roadmap, /admin) sont volontairement exclues.
// Le domaine vient de `site.url` (src/data/site.ts) — à mettre à jour le jour J.
const staticPaths = [
  '/',
  '/oeuvres',
  '/disponibles',
  '/biographie',
  '/demarche',
  '/bleu-cendres',
  '/expositions',
  '/contact',
];

export const GET: APIRoute = () => {
  const paths = [...staticPaths, ...detailArtworks.map((a) => `/oeuvres/${a.slug}`)];
  const urls = paths
    .map((p) => `  <url><loc>${new URL(p, site.url).href}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

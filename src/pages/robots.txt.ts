import type { APIRoute } from 'astro';
import { site } from '../data/site';

// robots.txt — généré au build pour pointer vers le bon domaine
// (celui de astro.config.mjs, qui suit le domaine de production Vercel).
// /cockpit-roadmap reste autorisé au crawl pour que sa balise
// « noindex » soit lue par les moteurs (ne pas le bloquer ici).
export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '# Back-office (non destiné au référencement).',
    'Disallow: /admin/',
    '',
    `Sitemap: ${new URL('/sitemap.xml', site.url).href}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

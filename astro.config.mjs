import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// ⚠️ Remplacez cette URL par le domaine définitif une fois en ligne
// (ex. https://www.armellemourier.com). Elle sert au SEO et aux liens absolus.
const SITE_URL = 'https://www.armellemourier.fr';

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

# SEO & partage social — aide-mémoire

Ce site est **statique (Astro)** : le référencement et les aperçus de partage
(Open Graph / Twitter) sont gérés dans **`src/layouts/Base.astro`** et alimentés
par **`src/data/site.ts`**. Chaque page passe ses propres `title` / `description`
/ `keywords` / `image` à `Base`.

## 1. Domaine définitif (à faire le jour de la mise en ligne)

Le domaine sert aux **URLs canoniques**, à l'**Open Graph**, au **sitemap** et au
**robots.txt**. À mettre à jour à **trois** endroits :

| Fichier | Quoi changer |
|---|---|
| `astro.config.mjs` | `const SITE_URL = 'https://www.armellemourier.fr'` |
| `src/data/site.ts` | `url: 'https://www.armellemourier.fr'` |
| `public/robots.txt` | la ligne `Sitemap: https://.../sitemap.xml` |

> `src/data/site.ts` → `site.url` est la source de vérité utilisée par `Base.astro`
> (canonical, og:url, og:image absolue) et par `/sitemap.xml`.

## 2. Image de partage (Open Graph / Twitter) — **1200 × 630**

- Image par défaut : **`public/images/og/og-default.svg`** (master vectoriel, palette atelier).
- ⚠️ **Recommandé** : exporter un **PNG ou JPG 1200×630** (les robots de Facebook /
  LinkedIn ne rastérisent pas toujours le SVG) :
  1. Ouvrir `og-default.svg` (navigateur, Figma, Inkscape…).
  2. Exporter en **1200×630** → `public/images/og/og-default.jpg` (ou `.png`).
  3. Dans `src/layouts/Base.astro`, repasser la valeur par défaut de `image` à
     `'/images/og/og-default.jpg'` (ou `.png`).
- **Par page** : on peut passer une image dédiée via la prop `image` de `Base`
  (les **fiches œuvres** utilisent déjà l'image de l'œuvre quand elle existe,
  sinon l'image par défaut).
- Poids : viser **< 300 Ko**. Texte lisible, marges confortables.

## 3. Métadonnées par page (déjà en place)

`Base.astro` génère pour **chaque** page :
- `title`, `meta description`, `meta keywords`, `meta author` ;
- `link rel=canonical` (absolu) ;
- **Open Graph** : `og:type`, `og:locale` (fr_FR), `og:site_name`, `og:title`,
  `og:description`, `og:url`, `og:image` (+ `:type`, `:width`, `:height`, `:alt`) ;
- **Twitter** : `summary_large_image`, `twitter:title/description/image/:alt` ;
- `theme-color`, `link rel=sitemap`.

Pages publiques couvertes : Accueil, Œuvres, Fiches œuvres, Disponibles,
Biographie, Démarche, Bleu Cendres, Expositions, Contact.

## 4. Données structurées (JSON-LD)

- **Accueil** : `WebSite` + `VisualArtist`.
- **Fiches œuvres** : `VisualArtwork` + `BreadcrumbList` (Accueil › Œuvres › œuvre).
- **Œuvres** : `CollectionPage` / `ItemList`.
- **Bleu Cendres** : `Book`. **Expositions** : `ExhibitionEvent` (dates réelles).
- ⚠️ **Aucun prix** n'est exposé en données structurées (vente douce : « Prix sur demande »).

## 5. Indexation / pages internes

- **Public** : indexable (pas de `noindex`).
- **`/cockpit-roadmap`** : `noindex, nofollow` via `Base` (`noindex={true}`) —
  **laissé crawlable** dans `robots.txt` pour que le `noindex` soit lu.
- **`/admin/`** (Decap) : `Disallow` dans `robots.txt` (+ noindex propre).

## 6. Sitemap & robots

- **`/sitemap.xml`** : généré au build par `src/pages/sitemap.xml.ts`
  (pages publiques + fiches œuvres ; **exclut** `/cockpit-roadmap` et `/admin`).
- **`public/robots.txt`** : autorise le public, `Disallow: /admin/`, pointe le sitemap.

## 7. Tester le partage (après mise en ligne)

- **Facebook / Open Graph** : <https://developers.facebook.com/tools/debug/>
- **Twitter/X Cards** : <https://cards-dev.twitter.com/validator>
- **LinkedIn** : <https://www.linkedin.com/post-inspector/>
- **Données structurées** : <https://search.google.com/test/rich-results>
- **Sitemap** : ouvrir `https://<domaine>/sitemap.xml` et le soumettre dans la
  Google Search Console.

> Astuce : après changement d'image OG, **revalider** dans le debugger Facebook
> pour forcer le rafraîchissement du cache d'aperçu.

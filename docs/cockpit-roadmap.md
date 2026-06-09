# Cockpit — feuille de route éditoriale

Ce document décrit **où se modifie chaque élément du site aujourd'hui**, et
**ce qu'un futur cockpit** (back-office d'édition) pourra piloter — sans avoir
à recoder l'interface. Le cockpit n'est **pas** développé maintenant : cette
page sert de carte.

> Principe : tout le contenu pilotable vit dans `src/data/` et `src/content/`.
> Les composants (`src/components`, `src/layouts`) **consomment** ces données
> et ne contiennent pas de texte important codé en dur.

## Où modifier quoi (aujourd'hui)

| Domaine | Fichier | Contenu pilotable |
|---|---|---|
| **Identité & nav** | `src/data/site.ts` | Nom, rôle, manifeste, ville/région, **Carnet** (nav : `label`/`href`/`index`/`note` + `carnet.eyebrow`/`intro`), e-mail public, réseaux, SEO par défaut |
| **Design / DA** | `src/data/theme.ts` | Couleurs (palette pigment), typographie, identité `artist-studio` (boutons, cartes, hero, fragment), tokens (or, bleu, papier, texture) |
| **Vente douce** | `src/data/shop.ts` | Mode `soft-contact`, `showPrices`, `defaultPriceLabel`, devise future, réservation/catalogue on-off, libellés CTA, **objets de contact** |
| **Œuvres** | `src/data/artworks.ts` | Liste des œuvres : `title`, `slug`, `status`, `price?`, `image`/`images`, `alt`, `dimensions`, `technique`, `series`, `featured`, `showInAvailable` + helpers |
| **Expositions** | `src/data/exhibitions.ts` | Chronologie (dates, lieux, types) |
| **Textes bio** | `src/content/bio.ts` | Biographie, démarche, projet Bleu Cendres |
| **Textes de pages** | `src/content/pages.ts` | Récit éditorial de l'accueil et des œuvres |
| **Images** | `public/images/{artworks,portraits,projects,og}/` | Fichiers + chemins renseignés dans `artworks.ts` / `bio.ts` (voir `public/images/README.md`) |

## Ce qu'un futur cockpit pourra éditer

- **Textes** : nav/Carnet, récits de pages (`pages.ts`), bio (`bio.ts`).
- **Couleurs & DA** : palette et tokens de `theme.ts` (déjà injectés en variables CSS — un changement de valeur suffit).
- **Œuvres** : ajout/édition, **statut** (`available` / `reserved` / `sold` / `on-request`), visibilité (`featured`, `showInAvailable`), images et `alt`.
- **Expositions** : ajout de dates et lieux.
- **Contact** : e-mail public, objets de contact (`shop.contactSubjects`).
- **Vente douce** : `showPrices`, libellés CTA, activation réservation/catalogue (jamais de paiement tant que `enableCheckout = false`).
- **Images** : association fichier ↔ œuvre/portrait/projet.

### Fiches œuvre
`artworks.ts` expose : `getArtworkBySlug`, `getAvailableArtworks`,
`getFeaturedArtworks`, `getArtworkRequestUrl(a, objet)`. La route
**`src/pages/oeuvres/[slug].astro`** génère **une fiche par œuvre** (slug stable)
: visuel/placeholder, série, technique, dimensions, année, statut, « Prix sur
demande », description, et **acquisition douce** (Demander / Réserver / Catalogue
→ `/contact` prérempli). `images[]` reste prévu pour des vues secondaires.
Un futur cockpit édite les œuvres dans `artworks.ts` ; les fiches se régénèrent
au build, sans toucher au composant.

## Ce qui ne doit JAMAIS entrer dans le cockpit (ni dans le repo)

- 🔒 **Secrets**, **tokens**, **clés API**, **mots de passe**.
- Identifiants de paiement / webhooks signés.
- Données personnelles sensibles, **numéro de téléphone** tant qu'il n'est pas
  validé pour publication.

Ces éléments, le jour venu, vivront dans les **Variables/Secrets** de GitHub ou
de Vercel — **jamais** dans `src/data`, `src/content` ni dans un commit.

## Garde-fous produit (à conserver)

- **Vente douce** : pas de panier, pas de paiement en ligne ; acquisition par
  contact direct (`shop.mode = 'soft-contact'`, `enableCheckout = false`).
- **Aucun prix inventé** : sans `price`, on affiche « Prix sur demande ».
- **Pas de téléphone** publié sans validation humaine explicite.
- Identité **artist-studio** (cartels, boutons handline, Carnet d'atelier).

---

## Vision — un outil d'émancipation pour Armelle

Le site doit être livré **clé en main**. À terme, Armelle Mourier pilote
elle-même ses œuvres, ses images, ses textes, ses expositions, ses
disponibilités, sa vente douce et la **préparation** de ses publications
réseaux sociaux — **sans dépendre du code**. Le cockpit doit rester **simple,
clair, humain et progressif**, pensé pour une personne non développeuse :
labels humains, descriptions courtes, actions évidentes, zéro jargon.

> Le schéma des modules vit dans `src/data/cockpit.ts` (description, pas un
> admin). L'assistant réseaux sociaux (modèles de légendes, formats, mots-clés)
> vit dans `src/data/social.ts`. Une page interne **non listée** présente la
> feuille de route : `/cockpit-roadmap`.

### Modules prévus (`src/data/cockpit.ts`)
1. **Œuvres** — ajouter / modifier / organiser les tableaux.
2. **Disponibilités** — disponible / réservée / vendue / sur demande.
3. **Pages** — modifier les textes principaux.
4. **Expositions** — ajouter une date / un événement.
5. **Réseaux sociaux** — préparer des publications Instagram (copier-coller).
6. **Ambiance visuelle** — ajuster quelques couleurs et intensités.

## Chemin progressif (du plus simple au plus avancé)

1. **Fichiers de configuration éditables** (état actuel) — `src/data/`, `src/content/`.
2. **Mini-cockpit local / admin statique** — une interface simple qui écrit ces fichiers.
3. **Stockage des images** — dépôt et association aux œuvres.
4. **Édition œuvres / textes** — formulaires humains (labels du module).
5. **Assistant Instagram** — légendes + mots-clés + format conseillé, à copier-coller.
6. **Authentification** *(éventuelle)* — accès privé à l'édition.
7. **CMS / headless ou base de données** *(éventuel)* — si le besoin grandit.

## Versions du cockpit

| Version | Contenu |
|---|---|
| **V1** *(actuel)* | **Prototype** — lecture & préparation. Page interne `/cockpit-roadmap` (noindex, hors nav) : visualiser œuvres/disponibilités/pages/expositions, préparer des légendes Instagram (copier-coller) et un bloc d'œuvre à coller. **Ne sauvegarde rien.** |
| **V2** | **Édition réelle** des œuvres et des textes (écriture dans les fichiers de données). |
| **V3** | **Upload** et association des images. |
| **V4** | **Assistant réseaux sociaux avancé**. |
| **V5** | **Authentification**, si nécessaire. |

> 🧭 **Choix de l'outil pour la V2** : voir l'étude comparative
> **[`docs/cockpit-architecture-decision.md`](./cockpit-architecture-decision.md)**.
> Recommandation : un **CMS git-backed (Decap) + Cloudinary** pour les images —
> garder Astro/Vercel, coût quasi nul, données dans le dépôt ; alternative
> **Sanity** si l'on privilégie le confort d'édition.

### Phase 2A — structure Decap préparée *(fait)*
- `public/admin/` (Decap + `config.yml`, 7 collections) + `content/cms/` (exemples)
  + docs (`decap-cms-setup.md`, `cloudinary-setup.md`).
- ⚠️ **Le site public n'utilise pas encore les contenus CMS** : la source de vérité
  reste `src/data` / `src/content`. Auth **non branchée** (volontaire), aucun secret.
- **Prochaine phase (2B)** : brancher l'auth (Netlify Identity recommandé) +
  **migrer une collection pilote** (Œuvres) sans casser le site.

## Roadmap opérationnelle (centre opérationnel)

Lecture **orientée opérations** : le cockpit doit d'abord **simplifier la vie**
d'Armelle et de Tom, avant d'ajouter des services. Modèle : `src/data/operations.ts`.

| Version | Objectif |
|---|---|
| **V1 — Prototype (actuel)** | Lecture · préparation · copier-coller · **pas de sauvegarde**. |
| **V2 — Centre opérationnel assisté** | **Générer** : fiche œuvre complète · checklist upload image · légende Instagram · **fiche de preuve de création** · demande d'acquisition · **facture brouillon** · fiche logistique. |
| **V3 — Cockpit éditorial réel** | Édition œuvres · textes · statuts · expositions · images. |
| **V4 — Cockpit commercial doux** | Demandes entrantes · réservation · suivi prospect · catalogue · **devis/facture brouillon** · conditions de retrait/livraison. |
| **V5 — Automatisations optionnelles** | Cloudinary · CMS · paiement · Instagram API — **seulement si bénéfice net**. |

> Garde-fou : **aucune action sensible automatisée sans validation humaine**
> (Armelle décide · Tom valide · Claude Code exécute).

## Volontairement exclu maintenant

- 💳 **Paiement en ligne** / panier / checkout.
- 📲 **Publication Instagram automatique** / API Meta / tokens.
- 🔒 **Stockage de secrets, tokens, clés API, mots de passe** dans le repo.
- 🧩 Toute **complexité inutile** : on avance par petites étapes utiles.


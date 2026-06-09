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

### Architecture déjà prête pour les fiches œuvre
`artworks.ts` expose : `getArtworkBySlug`, `getAvailableArtworks`,
`getFeaturedArtworks`, `getArtworkRequestUrl(a, objet)`. Le `slug` est stable et
`images[]` est prévu pour des vues secondaires — une future route
`/oeuvres/[slug]` pourra être branchée sans refonte des données.

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

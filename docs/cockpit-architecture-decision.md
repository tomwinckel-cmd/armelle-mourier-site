# Décision d'architecture — le « vrai » cockpit d'Armelle

> Étude comparative. **Aucun code n'est ajouté ici** : on choisit la voie la
> plus simple, fiable et peu coûteuse pour qu'Armelle Mourier (non
> développeuse) puisse gérer son site elle-même — sans usine à gaz.

## Le besoin, en clair

Armelle doit pouvoir, depuis une interface simple :
- **déposer des images** d'œuvres (le point sensible) ;
- **ajouter / modifier des œuvres** (titre, série, technique, dimensions, prix) ;
- **changer les statuts** (disponible / réservée / vendue / sur demande) ;
- **modifier les textes** des pages (accroche, bio, démarche, Bleu Cendres) ;
- **gérer les expositions** ;
- **préparer ses publications Instagram** (déjà en place, copier-coller) ;
- **ajuster l'ambiance visuelle** (quelques couleurs / intensités).

Contraintes du projet : rester **Astro + Vercel (statique)**, **coût faible**,
**pas de complexité inutile**, **sauvegarde/export faciles**, pas de
dépendance risquée, pas de secrets dans le repo.

## Aujourd'hui : « git-backed files »

Les contenus vivent dans des fichiers (`src/data/*.ts`, `src/content/*.ts`).
Modifier = éditer un fichier → commit → Vercel reconstruit.
- ✅ Gratuit, robuste, **données dans le repo** (sauvegarde = le dépôt),
  zéro dépendance, parfait pour un développeur.
- ❌ **Inutilisable seule pour une artiste** (Git/PR), **pas d'upload d'images**,
  pas d'édition conviviale.

→ C'est la base saine, mais il manque **une interface d'édition + l'upload d'images**.

## Options comparées

| Option | Édition non-dev | Upload images | Données dans le repo | Coût | Auth | Astro/Vercel | Risque de lock-in | Verdict |
|---|---|---|---|---|---|---|---|---|
| **Git-backed (actuel)** | ❌ | ❌ | ✅ | 0 | — | ✅ natif | aucun | Base, insuffisant seul |
| **Decap CMS** (ex-Netlify CMS) | ✅ bonne | ✅ (médias dans le repo) | ✅ | 0 | OAuth GitHub / Netlify Identity | ✅ (static) | **faible** (open-source, git) | **Recommandé** |
| **TinaCMS** | ✅ très bonne (visuel) | ✅ (Tina Cloud) | ✅ (git) | 0 → faible | Tina Cloud | ⚠️ correct (moins mûr qu'avec Next) | moyen (Tina Cloud) | Bon, surtout pour l'édition visuelle |
| **Sanity** | ✅ excellente | ✅ **natif (CDN images)** | ❌ (hébergé chez Sanity) | 0 → faible | géré (Sanity) | ✅ (fetch au build) | **moyen/élevé** (contenu hors repo) | Le plus simple à éditer, mais dépendance |
| **Supabase + Storage** | ⚠️ (à construire) | ✅ | ❌ (base de données) | 0 → faible | géré | ⚠️ rend le site dynamique | élevé | **Hors périmètre** (introduit une DB) |
| **Cloudinary** (images) | — | ✅ **excellent** (widget + optimisation) | ❌ (images chez Cloudinary) | 0 → faible | clé API | ✅ (URLs) | moyen | **Complément images** idéal |
| **Cockpit custom (Astro + API)** | ✅ sur-mesure | ✅ (via GitHub API) | ✅ | dev + maintenance | à construire | ✅ | aucun | Plus tard, si besoin précis |
| **Shopify / Stripe** | — | — | — | % + abo | géré | via lien | élevé | **Uniquement paiement futur**, hors périmètre |

### Lecture des critères clés
- **Simplicité pour Armelle** : Sanity ≈ TinaCMS > Decap > git brut.
- **Upload d'images** : Sanity & Cloudinary natifs ; Decap (médias dans le repo) ;
  Tina (Tina Cloud). Le git brut n'en a pas.
- **Sauvegarde / export / souveraineté** : Decap & Tina (git) gardent **tout dans
  le repo** → export trivial, pas de prison. Sanity/Supabase = contenu hébergé
  (export possible mais via leur outil).
- **Sécurité / secrets** : git-backed n'a **aucun secret au runtime** (le site
  reste statique). Sanity/Cloudinary/Supabase ajoutent une **clé** (à mettre dans
  les **Variables Vercel**, jamais dans le repo).
- **Coût** : tous ont un palier gratuit suffisant pour une artiste ; le git-backed
  reste à **0 €** de bout en bout.
- **Compatibilité Astro/Vercel** : Decap et Sanity s'intègrent bien à un build
  statique ; Tina est un peu moins mûr côté Astro ; Supabase pousserait vers du
  dynamique.
- **Auth** : c'est la principale friction de Decap sur Vercel (Git Gateway est une
  brique **Netlify**). Solution propre : héberger **l'éditeur Decap sur Netlify
  (Identity + Git Gateway, gratuit)** pointant vers le **dépôt GitHub**, pendant que
  **le site public reste sur Vercel**. Sanity/Tina gèrent l'auth pour vous.

## Recommandation

**Aller vers un CMS git-backed, en gardant les données dans le dépôt.**

### Option recommandée (souveraineté + coût zéro)
**Decap CMS + Cloudinary pour les images.**
- **Decap** édite œuvres, statuts, textes, expositions → **commits dans le repo**
  → Vercel reconstruit. Données = **toujours dans le dépôt** (sauvegarde = clone).
- **Cloudinary** gère l'**upload et l'optimisation des images** via un widget
  simple (évite d'alourdir le dépôt avec des fichiers lourds). Seule une **clé**
  est nécessaire, stockée dans les **Variables Vercel** (pas dans le repo).
- Auth : éditeur Decap hébergé sur **Netlify (Identity, gratuit)**, site sur Vercel.
- **Pourquoi** : gratuit/quasi-gratuit, simple, pas de base de données, pas de
  prison technologique, export trivial, on **garde Astro + Vercel** tels quels.

### Alternative (édition la plus simple possible)
**Sanity** — si l'objectif n°1 est l'**édition la plus fluide** pour Armelle, avec
**upload d'images natif** et zéro infrastructure côté images. Contrepartie : le
contenu vit **chez Sanity** (dépendance + une clé au build). À choisir si la
simplicité d'usage prime sur la souveraineté des données.

> En une phrase : **Decap (+Cloudinary)** pour rester maître de ses données à coût
> nul ; **Sanity** si l'on préfère le confort d'édition au prix d'une dépendance.

## Risques & garde-fous

- **Auth Decap sur Vercel** : prévoir l'éditeur sur Netlify Identity (ou un petit
  proxy OAuth GitHub). À cadrer avant la Phase 2.
- **Images dans le repo** (si on n'utilise pas Cloudinary) : peut alourdir le dépôt
  → préférer Cloudinary, ou un dossier média discipliné + compression.
- **Clés de service** (Sanity/Cloudinary) : **toujours** dans les Variables
  Vercel/GitHub, **jamais** committées.
- **Lock-in** : privilégier les solutions **git-backed** pour pouvoir partir à tout
  moment avec ses données.
- **Sur-ingénierie** : ne pas introduire de base de données ni d'auth « maison »
  tant qu'un CMS éprouvé suffit.

## Trajectoire progressive recommandée

1. **Phase 1 — Cockpit V1 (fait)** : lecture & préparation (page interne `/cockpit-roadmap`).
2. **Phase 2 — CMS éditorial** : **Decap (+Cloudinary)** pour œuvres / textes / images / expositions → l'artiste édite, le site se reconstruit.
3. **Phase 3 — Assistant Instagram avancé** : à partir des modèles existants (`src/data/social.ts`), génération de légendes et de visuels prêts à poster — **toujours en copier-coller**, sans API.
4. **Phase 4 — Analytics & demandes** : suivi simple des visites et des demandes (acquisition / réservation / catalogue), sans données personnelles superflues.
5. **Phase 5 — Paiement / réservation avancée** : **seulement si l'artiste le souhaite** (Stripe/Shopify), en complément de la vente douce — jamais imposé.

## Hors périmètre maintenant (rappel)
Paiement en ligne · API Instagram/Meta · base de données · authentification réelle ·
secrets dans le repo · services externes branchés. Cette mission **documente** la
décision ; elle n'ajoute aucun de ces éléments.

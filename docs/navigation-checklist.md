# Navigation — routes & liens attendus

Référence des **routes** du site et des **liens** internes, pour vérifier qu'aucun
CTA ne pointe au mauvais endroit.

## Routes (10 pages)

| Page | Route |
|---|---|
| Accueil | `/` |
| Œuvres | `/oeuvres` |
| Disponibles | `/disponibles` |
| Biographie | `/biographie` |
| Démarche | `/demarche` |
| Bleu Cendres | `/bleu-cendres` |
| Expositions | `/expositions` |
| Contact | `/contact` |
| Mentions légales | `/mentions-legales` |
| Confidentialité | `/confidentialite` |

## Navigation (source unique : `src/data/site.ts → nav`)

Header (desktop), **Carnet** (mobile) et **Footer** consomment tous le même
tableau `nav` (`label` + `href`). Chaque entrée ferme le Carnet au clic
(`data-nav-close`) puis navigue.

| Carnet | Route |
|---|---|
| 01 Œuvres | `/oeuvres` |
| 02 Disponibles | `/disponibles` |
| 03 Biographie | `/biographie` |
| 04 Démarche | `/demarche` |
| 05 Bleu Cendres | `/bleu-cendres` |
| 06 Expositions | `/expositions` |
| 07 Contact | `/contact` |

- Logo / signature (Header) → `/`
- Footer (bas) → `/mentions-legales`, `/confidentialite`

## CTA Accueil (`src/pages/index.astro`)

| CTA | Route |
|---|---|
| Découvrir les œuvres | `/oeuvres` |
| Voir les tableaux disponibles | `/disponibles` |
| Écrire à l'artiste | `/contact` |
| Voir toute la galerie | `/oeuvres` |
| (bloc vente) | `/disponibles` |
| Entrer dans Bleu Cendres | `/bleu-cendres` |
| Voir la chronologie | `/expositions` |
| Lire la biographie / Découvrir la démarche | `/biographie`, `/demarche` |

## Vente douce — liens de demande (centralisés via `getArtworkRequestUrl`)

| Action | Route |
|---|---|
| Demander une œuvre (carte) | `/contact?objet=acquisition&oeuvre=<slug>` |
| Réserver une œuvre | `/contact?objet=reservation&oeuvre=<slug>` *(depuis une fiche)* / `/contact?objet=reservation` *(général)* |
| Demander le catalogue | `/contact?objet=catalogue` |
| Recevoir les informations | `/contact?objet=acquisition` |

> Le paramètre `oeuvre` porte le **slug** (stable). La page `/contact` résout
> slug → titre pour préremplir un message lisible ; sans correspondance, elle
> affiche la valeur brute. Sans JS, le formulaire reste utilisable (mailto).

## Règles

- Tous les `href` internes commencent par `/` et correspondent à une route existante.
- **Fiches œuvre** : `/oeuvres/<slug>` (une par œuvre, générées depuis `artworks.ts`).
  Les cartes et la galerie y mènent ; chaque fiche renvoie vers `/oeuvres`,
  `/disponibles` (si disponible) et `/contact` (demande/réservation/catalogue).
- Pas de `tel:` (aucun téléphone), pas de lien de paiement, pas de panier.

## Test du Carnet (ouverture en haut de page)

Chaque entrée du Carnet est un `<a href>` standard (pas de JS de navigation,
pas de `preventDefault`). Au clic : le panneau se ferme et le navigateur ouvre
la route attendue **en haut de page**.

> Garde-fou (`Base.astro`) : `history.scrollRestoration = 'manual'` + remise en
> haut sur `pageshow` (couvre aussi le retour bfcache). Aucune position de
> scroll ancienne n'est conservée ; la navigation des liens n'est pas bloquée.

| Carnet → | Doit ouvrir | En haut ? |
|---|---|---|
| Œuvres | `/oeuvres` | ✅ |
| Disponibles | `/disponibles` | ✅ |
| Biographie | `/biographie` | ✅ |
| Démarche | `/demarche` | ✅ |
| Bleu Cendres | `/bleu-cendres` | ✅ |
| Expositions | `/expositions` | ✅ |
| Contact | `/contact` | ✅ |

## Carnet mobile / tablette (overlay & fiabilité)

Le Carnet (`< 1024px`) est une **superposition fixe** au-dessus de toute la page.
Architecture (voir `src/components/Header.astro`) :

- **Panneau** `.atelier-menu` : `position: fixed`, ancré sous la barre
  (`top: var(--header-h)`), **fond papier opaque**, `overflow-y: auto`,
  `overscroll-behavior: contain`, **`z-index: 60`**.
- **Fond neutralisé** `.nav-scrim` : `position: fixed` **derrière** le panneau
  (**`z-index: 55`**), déclaré **avant** le panneau dans le DOM. Capte le clic
  « extérieur » pour fermer — **sans jamais recouvrir les liens**.
- **Verrou du scroll** : `documentElement.overflow = 'hidden'` quand le Carnet
  est ouvert (rétabli à la fermeture).

> ⚠️ Régression historique corrigée : le scrim était peint **au-dessus** du
> panneau (déclaré après, sans `z-index`) et **interceptait les taps** → cliquer
> « Biographie » fermait le menu **sans naviguer** (on restait sur `/oeuvres`).
> Le scrim est désormais **sous** le panneau.

**Scénario de test (depuis `/oeuvres`, en mobile)** :

1. Ouvrir le Carnet → le panneau **couvre proprement** l'écran sous la barre,
   fond papier **lisible**, **aucun bloc noir** par-dessus, pas de scroll horizontal.
2. Cliquer **Biographie** → l'URL devient **`/biographie`** et la page s'ouvre **en haut**.
3. Refaire pour **Disponibles, Démarche, Bleu Cendres, Expositions, Contact** →
   chaque lien ouvre **la bonne route, en haut**.
4. Fermetures : **Échap**, **clic sur le fond (scrim)**, **bouton Carnet**, et
   **clic sur un lien** ferment toutes le panneau.
5. États ARIA : le bouton porte `aria-expanded` (true/false), `aria-controls="menu-atelier"`,
   et un libellé qui passe à « Fermer le carnet » à l'ouverture ; focus visible au clavier.

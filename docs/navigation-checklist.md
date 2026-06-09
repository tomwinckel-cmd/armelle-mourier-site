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

- Tous les `href` internes commencent par `/` et correspondent à une route ci-dessus.
- Aucune route dynamique `/oeuvres/[slug]` n'existe encore : ne pas lier vers une
  page détail tant qu'elle n'est pas créée (les demandes passent par `/contact`).
- Pas de `tel:` (aucun téléphone), pas de lien de paiement.

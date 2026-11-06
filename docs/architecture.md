# Architecture — site d'Armelle Mourier

> Document de référence (novembre 2026). Remplace les anciennes notes
> « cockpit » / « Decap » archivées dans `docs/archive/`.

## En une phrase

Un site **statique** (Astro, hébergé chez Vercel) dont **tout le contenu vit
dans des fichiers JSON** du dépôt. Armelle les modifie depuis une **interface
d'édition** ; chaque enregistrement est **validé automatiquement** avant d'être
publié. Une saisie erronée ne peut pas casser le site en ligne.

## Le circuit d'une modification

```
Armelle (admin)  ──enregistre──▶  branche `contenu`
                                       │
                     publication-contenu.yml (GitHub Actions)
                       1. intègre `main` dans `contenu`
                       2. astro check + build  ──✗──▶ rien n'est publié,
                       3. statut « validation » ✓      le site reste intact
                       4. PR contenu → main, fusion
                                       │
                                       ▼
                                 branche `main`  ──▶  Vercel  ──▶  site en ligne
                                                     (≈ 2-3 min au total)
```

- `main` reste **protégée** (PR + check `validation` obligatoires) : rien ne change
  pour le code. Les PR de code (Claude Code / Tom) suivent le circuit habituel.
- `synchro-contenu.yml` reporte chaque évolution de `main` dans `contenu`, pour
  que l'éditeur travaille toujours sur la version à jour.

### Prérequis (une seule fois, réglages GitHub du dépôt)

- **Settings → Actions → General → Workflow permissions** : cocher
  « Allow GitHub Actions to create and approve pull requests » (sinon la
  publication s'arrête à l'étape 4, avec un message explicite).

## Où vit chaque contenu

| Contenu | Fichier(s) | Collection de l'admin |
|---|---|---|
| Œuvres | `src/data/artworks/<slug>.json` | Œuvres |
| Expositions | `src/data/exhibitions/<id>.json` | Expositions |
| Textes (accueil, page Œuvres, biographie, démarche, Bleu Cendres) | `src/content/textes/*.json` | Textes des pages |
| E-mail, réseaux, manifeste, mentions légales | `src/data/settings/site.json` | Réglages → Site & mentions légales |
| Vente douce (prix affichés, boutons, objets du contact) | `src/data/settings/shop.json` | Réglages → Vente douce |
| Photos | `public/uploads/` (œuvres : `public/uploads/oeuvres/`) | glisser-déposer |

Les modules TypeScript (`src/data/*.ts`, `src/content/*.ts`) **lisent** ces
fichiers, les normalisent (champ vide = non renseigné) et exposent une API
stable aux pages. Ils ne contiennent plus de texte éditorial.

**Restent dans le code, volontairement** : menu, mots-clés SEO, identité
technique, garde-fous commerciaux (pas de paiement en ligne), hébergeur
(mentions légales).

## Règles de robustesse (à conserver)

- **Rien d'obligatoire de technique pour Armelle** : slug, identifiant, année
  d'exposition, date affichée et texte alternatif se déduisent si vides.
- **Aucun prix inventé** : sans prix → « Prix sur demande ».
- **Une œuvre vendue** n'apparaît pas dans « Disponibles » (déduit du statut).
- **Photos** : versions web uniquement, jamais la HD (protection des œuvres).
- **Aucun secret** dans le dépôt (public) : identifiants de connexion et clés
  vivent dans les réglages GitHub / Vercel / du service de connexion.

## Connexion d'Armelle à l'éditeur

**En cours de choix** (Tom, Armelle, EGA). Le circuit ci-dessus fonctionne
quel que soit l'outil retenu, tant qu'il enregistre sur la branche `contenu` :

| Outil | Ce qu'il faut brancher | Config |
|---|---|---|
| Sveltia CMS | script dans `public/admin/index.html` + relais OAuth GitHub | `public/admin/config.yml` (tel quel) |
| Decap Turbo | backend `turbo-github` + `turbo_site_id` | `public/admin/config.yml` |
| Pages CMS | app GitHub + `.pages.yml` à la racine | à générer depuis `config.yml` |

`public/admin/config.yml` est la **description de référence** des champs
éditables ; toute autre configuration doit en être dérivée.

## Ce qui est gelé

- `/cockpit` et `/cockpit-roadmap` (prototype « préparer / copier », sans
  enregistrement) : conservés, non indexés, hors navigation, plus développés.
  L'éditeur devient l'unique tableau de bord d'Armelle.

## Vérifications

- CI `validation` : `npm ci` → `astro check` → `astro build` sur chaque PR.
- La même validation conditionne chaque publication de contenu.
- Les migrations de données se vérifient par comparaison stricte des données
  exposées aux pages, avant / après.

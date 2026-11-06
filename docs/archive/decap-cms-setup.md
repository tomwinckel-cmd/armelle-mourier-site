# Decap CMS — mise en place (Phase 2A → 2B)

## Objectif
Donner à Armelle une **interface d'édition simple** (œuvres, expositions, textes,
réglages) qui **commit dans le dépôt GitHub** — données versionnées, sauvegarde =
le repo, **pas de base de données**, **pas de lock-in**. Le site reste **Astro +
Vercel (statique)**.

## Architecture
```
public/admin/index.html     → charge Decap CMS (CDN officiel), noindex
public/admin/config.yml      → collections + backend + médias (sans secret)
src/data/artworks/<slug>.json → ŒUVRES : source de vérité, lue par le site
public/uploads/oeuvres/      → photos uploadées depuis l'admin
content/cms/…                → autres collections (préparation, voir README)
docs/cloudinary-setup.md     → images (option future)
```
- Decap est une **app statique** servie à `/admin` : aucun build Astro requis.
- **Œuvres** : la collection écrit/lit **directement** `src/data/artworks/*.json`,
  qui est la **source de vérité du site public** (lue au build par
  `src/data/artworks.ts`). Éditer une œuvre dans l'admin = modifier réellement la base.
- Les **autres collections** (expositions, pages, réglages) écrivent encore dans
  `content/cms/…` (préparation, non lues par le site pour l'instant).

## Pourquoi Decap
- **Git-backed** : les contenus restent dans le dépôt (export trivial, pas de prison).
- **Gratuit**, open-source, sans base de données.
- S'intègre à un site statique sans le complexifier.
- Alternative étudiée : **Sanity** (édition plus fluide mais contenu hébergé) —
  voir `docs/cockpit-architecture-decision.md`.

## Accéder à `/admin` (quand l'auth sera prête)
`https://<domaine>/admin/` → écran de connexion Decap → édition → publication.
**Phase 2A : l'auth n'est pas branchée**, donc l'écran s'affiche mais ne publie pas.

## Choix d'authentification (un seul à brancher)
1. **Netlify Identity + Git Gateway** *(recommandé, simple)*
   - Héberger l'éditeur sur **Netlify** (gratuit), activer **Identity** + **Git
     Gateway**, inviter Armelle par e-mail. Le **site public reste sur Vercel**.
   - `backend: { name: git-gateway, branch: main }` (déjà en place).
2. **OAuth GitHub (proxy)**
   - Déployer un petit **proxy OAuth** (ex. fonction serverless) ; `backend:
     { name: github, repo: tomwinckel-cmd/armelle-mourier-site, base_url: <proxy> }`.
   - L'**API key/secret OAuth** vit dans les **Variables** du proxy, jamais dans le repo.
3. **Autre proxy OAuth** (services tiers d'auth Git) — même principe.

## Limites actuelles
- **Pas d'auth active** → `/admin` affiche l'interface mais **ne peut pas
  encore enregistrer** (il manque le backend d'authentification, voir ci-dessous).
  C'est la **seule** étape restante pour qu'Armelle édite réellement en ligne.
- Médias : upload **local** vers `public/uploads/oeuvres/` (aucun service externe,
  aucune clé). Cloudinary reste une option future commentée.
- `content/cms/…` (hors œuvres) n'est **pas** encore lu par le site (préparation).

## Prochaines étapes
- **2A** : structure Decap + exemples + docs. *(fait)*
- **2B — Base œuvres fonctionnelle (cette PR)** : la collection « Œuvres » est
  branchée sur la **vraie source** `src/data/artworks/*.json` (un fichier par
  œuvre), avec **upload d'images** (`/uploads/oeuvres/`), **galerie** et **champs
  vidéo**. Le site lit cette base. *(fait — rendu public identique)*
- **2C — Activer l'accès artiste** : brancher l'auth (option 1 recommandée) puis
  inviter Armelle → elle ajoute/modifie une œuvre, l'admin **commit** le JSON,
  Vercel redéploie. *(à faire — configuration côté service, sans secret dans le repo)*
- **2D+** : migrer les autres collections (expositions, pages) une à une.

## Création de l'accès artiste (invitation, sans mot de passe dans le repo)

> ⚠️ Aucun e-mail/mot de passe n'est stocké dans le dépôt ni transmis à Claude Code.
> L'artiste définit son propre mot de passe via le lien d'invitation.

1. **Choisir l'e-mail artiste** (celui qu'Armelle utilisera pour se connecter).
2. **Inviter l'artiste** depuis le fournisseur d'auth (ex. Netlify Identity →
   *Invite users*, ou l'app OAuth GitHub) : un e-mail d'invitation lui est envoyé.
3. **L'artiste crée son mot de passe elle-même** via le lien reçu (jamais partagé,
   jamais committé).
4. **Vérifier l'accès** : elle ouvre `/admin/`, se connecte, voit ses collections.
5. **Ne jamais stocker le mot de passe** (ni l'e-mail) dans le repo ni dans un fichier
   de configuration — uniquement côté fournisseur d'auth.

## Checklist sécurité
- [ ] Aucun secret/token/clé/cloud_name privé committé.
- [ ] Clés (Cloudinary, OAuth) **uniquement** dans Variables Netlify/Vercel.
- [ ] `/admin` en **noindex**.
- [ ] Auth restreinte aux personnes invitées.
- [ ] Une seule **source de vérité** par donnée lors de chaque migration.

# Site d’Armelle Mourier — artiste peintre & plasticienne

Site vitrine artistique, rapide, élégant et facile à maintenir. Construit avec **Astro**,
**TypeScript** et **Tailwind CSS**. Aucune dépendance à Wix, aucun compte requis pour fonctionner.

---

## 1. Pourquoi ce choix technique

- **Astro** génère un site **statique** (pages HTML pré-calculées) : chargement quasi instantané,
  excellent référencement, hébergement gratuit possible. Le JavaScript est réduit au strict minimum
  (apparition au défilement, filtres de galerie, formulaire) — tout le reste est du HTML/CSS pur.
- **Tailwind CSS** : un style cohérent et léger, sans feuille de style à maintenir à la main.
- **Données séparées du code** : les œuvres, expositions et textes vivent dans des fichiers simples
  (`src/data`, `src/content`). On peut les modifier sans toucher à la mise en page.

### Direction artistique « Bleu Cendres »

La palette et la typographie découlent de l’univers réel de l’artiste (la série et le recueil
*Bleu Cendres*, en bleus profonds et or) — volontairement loin des modèles génériques.

| Rôle | Couleur | Code |
|---|---|---|
| Fond ivoire | papier | `#F5F2EB` |
| Fond alterné | brume | `#E9E5DA` |
| Bleu profond (principal) | encre | `#173039` |
| Gris-bleu (secondaire) | cendre | `#6F7C82` |
| Or cendré (accent) | or | `#A9791F` |
| Noir doux (texte) | noir | `#211F1B` |

Titres en **Fraunces** (serif), textes en **Mulish** (sans-serif). Élément signature : le
**trait bleu** dessiné à la main (clin d’œil à la résidence « Trait Bleu »).

---

## 2. Installation et lancement

Prérequis : **Node.js 18+**.

```bash
npm install      # installe les dépendances
npm run dev      # serveur local sur http://localhost:4321
npm run build    # génère le site dans le dossier /dist
npm run preview  # prévisualise le site généré
```

---

## 3. Mise en ligne (déploiement)

Le site étant statique, l’hébergement est **gratuit** chez Vercel ou Netlify.

**Vercel** — le plus simple : connectez le dépôt, Vercel détecte Astro automatiquement.
**Netlify** : commande de build `npm run build`, dossier de publication `dist`.

> 🔧 **CI, auto-merge des PR Claude et étapes Vercel détaillées** : voir
> [`GITHUB_SETUP.md`](./GITHUB_SETUP.md). En résumé : le workflow `validation`
> (`npm ci` → `npm run check` → `npm run build`) garde `main` vert, le ruleset
> `.github/repository-ruleset-main.json` protège `main`, et
> `claude-auto-merge.yml` fusionne en squash les PR `[claude]` **uniquement**
> quand tous les checks requis sont au vert.

> ⚠️ **Avant la mise en ligne**, remplacez l’URL provisoire par le **domaine définitif** à
> **deux endroits** :
> 1. `astro.config.mjs` → constante `SITE_URL`
> 2. `public/robots.txt` et `public/sitemap.xml` → domaine
>
> (L’e-mail et le menu se règlent, eux, dans `src/data/site.ts`.)

---

## 4. Modifier le contenu (sans être technique)

Tout se passe dans des fichiers texte clairs et commentés.

### Ajouter / modifier une œuvre → `src/data/artworks.ts`
Copiez un bloc `{ ... }` existant et changez les valeurs.
- Pour **afficher la photo** : déposez le fichier dans `public/images/` puis renseignez
  `image: '/images/mon-fichier.jpg'`. (Sans photo, un visuel d’attente s’affiche.)
- Pour **mettre en vente** : `status: 'available'` et, si souhaité, `price: '850 €'`.
  Statuts possibles : `available` (disponible), `reserved` (réservée), `sold` (vendue),
  `on-request` (sur demande, par défaut).
- `featured: true` met l’œuvre en avant sur la page d’accueil.

### Ajouter une exposition → `src/data/exhibitions.ts`
Copiez un bloc et indiquez une `startDate` au format `'AAAA-MM-JJ'`. Les dates **futures**
apparaissent automatiquement dans « À venir », les dates passées dans la chronologie.

### Modifier la biographie, la démarche, Bleu Cendres → `src/content/bio.ts`
Textes restructurés à partir des mots de l’artiste. Modifiez-les librement.

### Régler l’e-mail, le menu, les réseaux sociaux → `src/data/site.ts`
Les liens réseaux sociaux sont **désactivés par défaut** (placeholders en commentaire).
Décommentez-les et mettez les vrais comptes pour les afficher.

---

## 5. Formulaire de contact

Par défaut, le formulaire **ouvre la messagerie** du visiteur avec un message pré-rempli
(robuste, sans serveur). Pour **recevoir les messages directement**, deux options dans
`src/pages/contact.astro` :

- **Formspree** : créez un formulaire sur formspree.io et collez votre URL dans la constante
  `FORM_ENDPOINT`.
- **Netlify Forms** : ajoutez `data-netlify="true"` à la balise `<form>` (si hébergé sur Netlify).

Une protection anti-spam discrète (champ « honeypot ») est déjà en place.

---

## 6. Ce qu’il reste à compléter (placeholders)

- 📷 **Photos** des œuvres + portrait + couverture (voir `public/images/README.md`).
- 🖼️ **Image de partage** `og-default.jpg` (1200 × 630 px).
- 💶 **Prix et statuts** réels des œuvres à vendre (`artworks.ts`).
- 🔗 **Liens réseaux sociaux** réels (`site.ts`).
- 🌐 **Domaine définitif** (`astro.config.mjs` + `robots.txt`).
- ⚖️ **Mentions légales & confidentialité** : compléter les champs entre crochets.

---

## 7. Tests manuels avant publication

- [ ] Affichage mobile, tablette, desktop
- [ ] Navigation au clavier (Tab) et lien « Aller au contenu »
- [ ] Tous les liens du menu et du pied de page fonctionnent
- [ ] Le formulaire ouvre bien un e-mail pré-rempli
- [ ] Le bouton « Demander cette œuvre » reprend le titre de l’œuvre
- [ ] Les filtres de la galerie fonctionnent
- [ ] Les visuels d’attente s’affichent proprement là où il manque des photos

### Objectifs Lighthouse (Chrome DevTools → Lighthouse)
- Performance > 90 · Accessibilité > 90 · SEO > 90 · Best Practices > 90

La base statique d’Astro, le CSS minimal, le lazy-loading des images et les données structurées
(Schema.org) placent ces scores à portée dès l’ajout des vraies photos optimisées.

---

## 8. Structure du projet

```
src/
  components/   éléments réutilisables (cartes, grille, en-tête, pied de page…)
  content/      textes éditoriaux (bio, démarche, Bleu Cendres)
  data/         œuvres, expositions, configuration du site
  layouts/      gabarit commun (Base.astro)
  pages/        une page = un fichier .astro
  styles/       styles de base
public/         fichiers servis tels quels (images, robots.txt, favicon)
audit/          rapport d’audit du site précédent + stratégie
```

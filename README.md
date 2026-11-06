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

**Tout le contenu éditable vit dans des fichiers JSON**, modifiables depuis l’admin
(`/admin`) ou à la main. Le code (`.ts`, `.astro`) ne contient plus de texte éditorial.

| Contenu | Fichier(s) | Dans l’admin |
|---|---|---|
| Œuvres (photos, textes, disponibilité, prix) | `src/data/artworks/<slug>.json` | Œuvres |
| Expositions, résidences, performances | `src/data/exhibitions/<id>.json` | Expositions |
| Textes : accueil, page Œuvres, biographie, démarche, Bleu Cendres | `src/content/textes/*.json` | Textes des pages |
| E-mail, réseaux sociaux, manifeste, mentions légales | `src/data/settings/site.json` | Réglages → Site & mentions légales |
| Vente douce (prix affichés, boutons, objets du contact) | `src/data/settings/shop.json` | Réglages → Vente douce |
| Photos déposées | `public/uploads/` (œuvres : `public/uploads/oeuvres/`) | (glisser-déposer) |

Règles utiles :
- **Œuvre sans photo** → visuel d’attente élégant. **Sans prix** → « Prix sur demande ».
- **Exposition** : seules la date de début (`AAAA-MM-JJ` ou `AAAA-MM`) et le titre sont
  nécessaires ; la date affichée et l’année se déduisent automatiquement. Les dates futures
  passent seules dans « À venir ».
- **Réseaux sociaux** : un lien incomplet n’est pas affiché.
- Le menu, les mots-clés SEO et les garde-fous (pas de paiement en ligne) restent dans le
  code (`src/data/site.ts`, `src/data/shop.ts`).

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

---

## 9. Livraison artiste

Documentation **clé en main** pour présenter le site et le cockpit à Armelle :

- **[`docs/livraison-artiste.md`](docs/livraison-artiste.md)** — guide de livraison :
  ce qui est prêt, ce qu'elle peut voir, ce qu'elle pourra piloter, l'accès artiste,
  la propriété intellectuelle, les prochaines activations.
- **[`docs/demo-script.md`](docs/demo-script.md)** — script de présentation en 5 minutes.
- **[`docs/cockpit-roadmap.md`](docs/cockpit-roadmap.md)** — feuille de route du cockpit.
- **[`docs/decap-cms-setup.md`](docs/decap-cms-setup.md)** — futur accès d'édition (Decap).
- **[`docs/ip-protection-artist.md`](docs/ip-protection-artist.md)** — protéger ses œuvres.

# Images du site — guide d'intégration

Ce dossier contient toutes les images servies telles quelles (sans
re-traitement au build). **Optimisez-les avant de les déposer.**

## Arborescence (convention de nommage)

```
public/images/
├── artworks/    → photos des tableaux (catalogue / galerie)
├── portraits/   → portraits d'Armelle Mourier
├── projects/    → couvertures & projets (Bleu Cendres, performances, résidences)
└── og/          → images de partage réseaux sociaux (Open Graph)
```

Chaque dossier contient un fichier `.gitkeep` pour exister dans le dépôt ;
ne le supprimez pas (sauf si le dossier contient déjà des images).

## Formats recommandés

| Usage | Format conseillé | Repli |
|------|------------------|-------|
| Œuvres, portraits, projets | **`.webp`** (ou `.avif`) | `.jpg` |
| Partage social (OG) | **`.jpg`** | `.png` |

> `.webp` offre le meilleur rapport qualité/poids et est lu par tous les
> navigateurs récents. Évitez le `.png` pour les photos (trop lourd).

## Dimensions & poids maximum

| Type | Dimensions (bord long) | Poids max conseillé |
|------|------------------------|---------------------|
| Œuvre (`artworks/`) | 1600–2000 px | ~ 300 Ko |
| Portrait (`portraits/`) | 1200–1600 px | ~ 250 Ko |
| Projet (`projects/`) | 1200–1600 px | ~ 250 Ko |
| OG (`og/`) | **1200 × 630 px** (exact) | ~ 200 Ko |

Les cartes d'œuvres s'affichent en ratio **4:5** (portrait). Une image plus
grande est automatiquement recadrée (`object-cover`) et centrée ; pas besoin
de la recadrer vous-même, mais un cadrage proche du 4:5 donne le meilleur rendu.

## Nommage des fichiers

- **minuscules, sans accents ni espaces**, mots séparés par des traits d'union ;
- pour une œuvre, utilisez **le `slug` défini dans `src/data/artworks.ts`** ;
- vues secondaires : suffixe `-detail`, `-mur`, `-2`…

Exemples :
```
artworks/renaissance.webp
artworks/renaissance-detail.webp
artworks/lor-bleu.webp
portraits/armelle-mourier.webp
projects/bleu-cendres-couverture.webp
og/og-default.jpg
```

## Ajouter une œuvre (avec photo)

1. Optimisez la photo (voir tableau ci-dessus) et nommez-la d'après le `slug`.
2. Déposez-la dans `public/images/artworks/`.
3. Dans `src/data/artworks.ts`, copiez un bloc `{ ... }` existant et renseignez :
   ```ts
   {
     id: 'mon-oeuvre',
     title: 'Mon œuvre',
     slug: 'mon-oeuvre',
     dimensions: '60 × 80 cm',          // ne pas inventer : laisser vide si inconnu
     technique: 'Acrylique sur toile',
     series: 'Bleu Cendres',
     image: '/images/artworks/mon-oeuvre.webp',
     images: ['/images/artworks/mon-oeuvre-detail.webp'], // vues secondaires (optionnel)
     alt: 'Description sensible et précise de la toile (couleurs, format).',
     status: 'available',               // available | reserved | sold | on-request
     // price: '850 €',                 // OPTIONNEL — sinon « Prix sur demande »
     featured: true,                    // visible/mise en avant sur l'accueil
     // showInAvailable: true,          // forcer/retirer de la page Disponibles
   }
   ```
4. C'est tout : le site se reconstruit avec la vraie image.

> **Ne jamais inventer de prix ni de dimensions.** En l'absence de prix,
> la mention « Prix sur demande » s'affiche (vente douce, par contact).

## Remplacer une image d'attente (placeholder)

Tant que `image: ''`, un visuel d'attente élégant s'affiche automatiquement.
Pour le remplacer :

1. Déposez le fichier optimisé dans le bon dossier (`artworks/`, `portraits/`…).
2. Renseignez le chemin correspondant :
   - œuvre → `image` dans `src/data/artworks.ts` ;
   - portrait → `bio.portrait` dans `src/content/bio.ts` ;
   - couverture Bleu Cendres → `bleuCendres.cover` dans `src/content/bio.ts` ;
   - image de partage → remplacez `og/og-default.jpg` (gardez le nom).
3. Vérifiez que le texte `alt` reste juste et descriptif.

## Accessibilité & performance (déjà gérées par le code)

- Chaque image a un texte `alt` obligatoire (défini dans les données).
- Les images de galerie sont en **chargement différé** (`loading="lazy"`),
  avec `sizes` responsive et un ratio réservé (pas de saut de mise en page).
- L'image du hero (accueil) est chargée en priorité.
- Si une image manque, le visuel d'attente prend le relais sans casser la page.

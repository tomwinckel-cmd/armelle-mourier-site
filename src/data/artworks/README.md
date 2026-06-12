# Base des œuvres — un fichier JSON par œuvre

Ce dossier est la **source de vérité** des œuvres du site public. Chaque œuvre
est un fichier `<slug>.json`. Le site les lit au build via
`src/data/artworks.ts` (`import.meta.glob`), les trie par `order`, puis les
affiche sur `/oeuvres`, `/disponibles`, l'accueil et les fiches
`/oeuvres/<slug>`.

## Deux façons d'éditer

1. **Depuis l'admin (recommandé)** : `/admin` → « Œuvres » → « Nouveau »
   (nécessite l'accès artiste — voir `docs/decap-cms-setup.md`).
2. **À la main** : copier un fichier existant, changer les valeurs, garder un
   `slug` **unique**.

## Champs

| Champ | Rôle |
|---|---|
| `id`, `slug` | identifiants (slug = adresse `/oeuvres/<slug>` + nom de fichier) |
| `title` | titre affiché |
| `order` | ordre d'affichage (10, 20, 30… — plus petit d'abord) |
| `series`, `year`, `dimensions`, `technique` | informations (laisser vide si inconnu — **ne pas inventer**) |
| `status` | `available` · `reserved` · `sold` · `on-request` |
| `featured` | mise en avant sur l'accueil |
| `showInAvailable` | présence sur `/disponibles` (défaut : tout sauf « vendue ») |
| `detailEnabled` | génère ou non la page détail `/oeuvres/<slug>` |
| `image` | photo principale (`/uploads/oeuvres/…` ; vide = visuel d'attente) |
| `images` | galerie (liste de chemins d'images) |
| `alt` | description de l'image (accessibilité + SEO) |
| `description` | description courte |
| `descriptionLong` | description longue (optionnelle) |
| `price` | prix (vide = « Prix sur demande » — **ne pas inventer**) |
| `videoEnabled` + `videoUrl` + `videoProvider` + `videoTitle` + `videoCaption` | vidéo univers (rien ne s'affiche si vide/désactivée) |

> Un champ vide est traité comme « non renseigné » (il ne s'affiche pas).
> Ne jamais inventer de dimensions, de prix ni d'URL vidéo.

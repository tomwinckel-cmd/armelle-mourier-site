// =====================================================================
//  CATALOGUE DES ŒUVRES — base éditoriale fonctionnelle
//  ---------------------------------------------------------------------
//  La SOURCE DE VÉRITÉ est désormais un fichier JSON par œuvre dans
//    src/data/artworks/<slug>.json
//  Ces fichiers sont la base éditable depuis l'admin (/admin → Decap CMS,
//  collection « Œuvres »). Ce module les charge au build (import.meta.glob),
//  les trie par `order`, puis expose EXACTEMENT la même API qu'avant :
//  le site public n'a pas changé d'un octet.
//
//  Pour AJOUTER une œuvre :
//   • depuis l'admin (recommandé) : /admin → Œuvres → « Nouveau » ;
//   • ou à la main : copier un fichier src/data/artworks/<slug>.json,
//     changer les valeurs, garder un `slug` unique.
//
//  Pour AJOUTER LA PHOTO : déposer le fichier dans public/uploads/oeuvres/
//   (ou public/images/artworks/) puis renseigner
//     "image": "/uploads/oeuvres/mon-fichier.webp"
//   (tant que image est vide, un visuel d'attente élégant s'affiche).
//
//  Pour une GALERIE : "images": ["/uploads/oeuvres/x-detail.webp", …].
//  Pour un PRIX : "price": "850 €" (sinon « Prix sur demande »).
//  DISPONIBILITÉ : "status": "available" | "reserved" | "sold" | "on-request".
//  VISIBILITÉ : "featured" (accueil), "showInAvailable" (page Disponibles),
//    "detailEnabled" (page détail /oeuvres/<slug>), "order" (ordre d'affichage).
//  VIDÉO (optionnelle, masquée si vide) : "videoEnabled" + "videoUrl" +
//    "videoProvider" (youtube|vimeo|other) + "videoTitle" + "videoCaption".
//
//  ⚠️ INTÉGRITÉ DES DONNÉES — ne jamais inventer dimensions ni prix :
//   laisser vide tant qu'Armelle ne les a pas fournis.
// =====================================================================

export type ArtworkStatus = 'available' | 'sold' | 'reserved' | 'on-request';

export type VideoProvider = 'youtube' | 'vimeo' | 'other' | '';

export type Artwork = {
  id: string;
  title: string;
  slug: string;
  year?: string;
  dimensions?: string; // ex. '60 × 73 cm' — laisser vide si inconnu
  technique?: string;
  series?: string;
  description?: string; // description COURTE (carte, fiche)
  descriptionLong?: string; // description LONGUE (optionnelle, fiche détail)

  // --- Visuels ------------------------------------------------------
  /** Image principale. '' = visuel d'attente ; sinon '/uploads/oeuvres/fichier.webp'. */
  image: string;
  /** Galerie : vues secondaires (détail, mise en situation). Optionnel. */
  images?: string[];
  /** Texte alternatif (accessibilité + SEO). Toujours renseigné. */
  alt: string;

  // --- Commerce (vente douce : pas de prix imposé) ------------------
  status: ArtworkStatus;
  price?: string; // ex. '850 €' — laisser vide pour « Prix sur demande »

  // --- Visibilité ---------------------------------------------------
  /** Mise en avant sur la page d'accueil. */
  featured?: boolean;
  /**
   * Affichage sur la page « Tableaux disponibles ».
   * Si non renseigné : déduit du statut (tout sauf « vendue »).
   */
  showInAvailable?: boolean;
  /** Page détail activée (/oeuvres/<slug>). Défaut : true. */
  detailEnabled?: boolean;
  /** Ordre d'affichage (croissant). Les plus petits d'abord. */
  order?: number;

  // --- Vidéo (préparation univers — rien ne s'affiche si vide) ------
  videoEnabled?: boolean;
  videoUrl?: string;
  videoProvider?: VideoProvider;
  videoTitle?: string;
  videoCaption?: string;
};

// ---------------------------------------------------------------------
//  CHARGEMENT — un fichier JSON par œuvre, trié par `order` puis titre.
//  import.meta.glob (eager) intègre les données au build : aucune requête,
//  aucune dépendance externe, rendu 100 % statique.
// ---------------------------------------------------------------------
const modules = import.meta.glob('./artworks/*.json', { eager: true, import: 'default' });

/** Chaîne non vide, sinon undefined (un champ vide = « non renseigné »). */
function str(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() !== '' ? v : undefined;
}
function bool(v: unknown): boolean | undefined {
  return typeof v === 'boolean' ? v : undefined;
}

/** Normalise un objet JSON brut en Artwork typé (vides → undefined). */
function toArtwork(raw: Record<string, unknown>): Artwork {
  const images = Array.isArray(raw.images)
    ? (raw.images.filter((s): s is string => typeof s === 'string' && s.trim() !== '') as string[])
    : undefined;
  return {
    id: String(raw.id ?? raw.slug ?? ''),
    title: String(raw.title ?? ''),
    slug: String(raw.slug ?? ''),
    year: str(raw.year),
    dimensions: str(raw.dimensions),
    technique: str(raw.technique),
    series: str(raw.series),
    description: str(raw.description),
    descriptionLong: str(raw.descriptionLong),
    image: typeof raw.image === 'string' ? raw.image : '',
    images: images && images.length ? images : undefined,
    alt: String(raw.alt ?? ''),
    status: (raw.status as ArtworkStatus) ?? 'on-request',
    price: str(raw.price),
    featured: bool(raw.featured),
    showInAvailable: bool(raw.showInAvailable),
    detailEnabled: bool(raw.detailEnabled),
    order: typeof raw.order === 'number' ? raw.order : undefined,
    videoEnabled: bool(raw.videoEnabled),
    videoUrl: str(raw.videoUrl),
    videoProvider: str(raw.videoProvider) as VideoProvider | undefined,
    videoTitle: str(raw.videoTitle),
    videoCaption: str(raw.videoCaption),
  };
}

export const artworks: Artwork[] = (Object.values(modules) as Record<string, unknown>[])
  .map(toArtwork)
  .sort(
    (a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) ||
      a.title.localeCompare(b.title, 'fr'),
  );

// ---------- Aides (pas besoin de les modifier) ----------
export const allSeries = Array.from(
  new Set(artworks.map((a) => a.series).filter(Boolean))
) as string[];

/** Une image principale est-elle disponible (sinon visuel d'attente) ? */
export function hasImage(a: Artwork): boolean {
  return Boolean(a.image && a.image.trim());
}

/** Toutes les images (principale + galerie), sans les vides. */
export function artworkImages(a: Artwork): string[] {
  return [a.image, ...(a.images ?? [])].filter((src) => src && src.trim());
}

/** Œuvre proposée à l'acquisition (page Disponibles) : flag explicite,
 *  sinon déduit du statut (tout sauf « vendue »). */
export function isForSale(a: Artwork): boolean {
  return a.showInAvailable ?? a.status !== 'sold';
}

/** Œuvre dont la page détail est active (défaut : oui). */
export function hasDetailPage(a: Artwork): boolean {
  return a.detailEnabled !== false;
}

export const featuredArtworks = artworks.filter((a) => a.featured);

// Œuvres présentables à l'acquisition (respecte showInAvailable).
export const availableArtworks = artworks.filter(isForSale);

// Œuvres ayant une page détail (alimente getStaticPaths + sitemap).
export const detailArtworks = artworks.filter(hasDetailPage);

export const statusLabel: Record<ArtworkStatus, string> = {
  available: 'Disponible',
  sold: 'Vendue',
  reserved: 'Réservée',
  'on-request': 'Sur demande',
};

export function priceLabel(a: Artwork): string {
  if (a.status === 'sold') return 'Vendue';
  return a.price && a.price.trim() ? a.price : 'Prix sur demande';
}

// ---------- Helpers « commerce doux » (fiches œuvre) ----------
/** Œuvres mises en avant (accueil). */
export const getFeaturedArtworks = (): Artwork[] => artworks.filter((a) => a.featured);

/** Œuvres proposées à l'acquisition (respecte le statut + showInAvailable). */
export const getAvailableArtworks = (): Artwork[] => artworks.filter(isForSale);

/** Retrouve une œuvre par son slug. */
export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

/** Lien de contact prérempli depuis une œuvre (objet + slug stable de l'œuvre).
 *  La page /contact résout le slug → titre pour un message lisible. */
export function getArtworkRequestUrl(
  a: Artwork,
  objet: 'acquisition' | 'reservation' | 'catalogue' = 'acquisition',
): string {
  return `/contact?objet=${objet}&oeuvre=${encodeURIComponent(a.slug)}`;
}

// ---------- Vidéo : embed propre, sobre, sans autoplay ----------
/** Bloc vidéo à afficher ? (videoEnabled true ET URL non vide). */
export function hasVideo(a: Artwork): boolean {
  return Boolean(a.videoEnabled && a.videoUrl && a.videoUrl.trim());
}

/**
 * Transforme une URL YouTube/Vimeo en URL d'embed sobre (sans autoplay,
 * sans tracking renforcé via youtube-nocookie). Renvoie null si non
 * reconnue → on affichera alors un lien externe propre.
 * Générique : utilisable hors œuvre (pages univers).
 */
export function getVideoEmbedUrl(rawUrl: string, provider?: VideoProvider): string | null {
  const url = (rawUrl ?? '').trim();
  if (!url) return null;

  // YouTube : watch?v=, youtu.be/, /embed/
  const yt =
    url.match(/[?&]v=([\w-]{6,})/) ||
    url.match(/youtu\.be\/([\w-]{6,})/) ||
    url.match(/youtube\.com\/embed\/([\w-]{6,})/);
  if ((provider === 'youtube' || (!provider && /youtu/.test(url))) && yt) {
    return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  }

  // Vimeo : vimeo.com/<id>
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d{6,})/);
  if ((provider === 'vimeo' || (!provider && /vimeo/.test(url))) && vm) {
    return `https://player.vimeo.com/video/${vm[1]}`;
  }

  return null; // URL non embeddable → lien externe
}

/** Variante pratique pour une œuvre. */
export function videoEmbedUrl(a: Artwork): string | null {
  return getVideoEmbedUrl(a.videoUrl ?? '', a.videoProvider || undefined);
}

// =====================================================================
//  CATALOGUE DES ŒUVRES
//  ---------------------------------------------------------------------
//  Pour AJOUTER une œuvre : copiez un bloc { ... } et changez les valeurs.
//  Pour AJOUTER LA PHOTO : déposez le fichier dans /public/images/oeuvres/
//    puis renseignez  image: '/images/oeuvres/mon-fichier.webp'
//    (tant que image est vide, un visuel d'attente élégant s'affiche).
//  Pour fixer un PRIX : renseignez  price: '850 €'  (sinon « Prix sur demande »).
//  Pour changer la DISPONIBILITÉ : status: 'available' | 'reserved' | 'sold' | 'on-request'.
//
//  ⚠️ INTÉGRITÉ DES DONNÉES
//  Toutes les œuvres ci-dessous proviennent du site existant d'Armelle Mourier.
//  • Les 8 toiles de la série « Bleu Cendres » et leurs dimensions sont citées
//    telles quelles sur la page du recueil (« tableaux que vous pouvez encore acquérir »).
//  • Pour les autres œuvres, les DIMENSIONS n'étaient pas communiquées : elles sont
//    laissées vides et marquées « à compléter ». Ne pas inventer de dimensions :
//    renseignez-les quand Armelle les fournit.
// =====================================================================

export type ArtworkStatus = 'available' | 'sold' | 'reserved' | 'on-request';

export type Artwork = {
  id: string;
  title: string;
  slug: string;
  year?: string;
  dimensions?: string; // ex. '60 × 73 cm' — laisser vide si inconnu
  technique?: string;
  series?: string;
  description?: string; // court texte sensible (optionnel)
  image: string; // '' = visuel d'attente ; sinon '/images/oeuvres/fichier.webp'
  alt: string;
  status: ArtworkStatus;
  price?: string; // ex. '850 €' — laisser vide pour « Prix sur demande »
  featured?: boolean;
};

export const artworks: Artwork[] = [
  // --------------------------------------------------------------
  //  SÉRIE « BLEU CENDRES » — toiles citées sur la page du recueil
  //  comme encore disponibles à l'acquisition (dimensions exactes).
  // --------------------------------------------------------------
  {
    id: 'renaissance',
    title: 'Renaissance',
    slug: 'renaissance',
    dimensions: '60 × 73 cm',
    technique: 'Acrylique sur toile',
    series: 'Bleu Cendres',
    description:
      'Le bleu se répand, l’or transcende : un chemin vers l’apaisement, au cœur de la série Bleu Cendres.',
    image: '',
    alt: 'Toile abstraite aux dominantes de bleu profond et d’or, série Bleu Cendres, 60 × 73 cm.',
    status: 'available',
    featured: true,
  },
  {
    id: 'lor-bleu',
    title: 'L’Or Bleu',
    slug: 'lor-bleu',
    dimensions: '50 × 100 cm',
    technique: 'Acrylique sur toile',
    series: 'Bleu Cendres',
    description:
      'Grand format en longueur où l’or et le bleu se répondent d’un bord à l’autre de la toile.',
    image: '',
    alt: 'Grand format abstrait en longueur, dominantes bleu et or, série Bleu Cendres, 50 × 100 cm.',
    status: 'available',
    featured: true,
  },
  {
    id: 'nidification',
    title: 'Nidification',
    slug: 'nidification',
    dimensions: '60 × 80 cm',
    technique: 'Acrylique sur toile',
    series: 'Bleu Cendres',
    description: 'Les pigments posés s’assemblent comme un refuge. Série Bleu Cendres.',
    image: '',
    alt: 'Toile abstraite bleu et or évoquant un nid, série Bleu Cendres, 60 × 80 cm.',
    status: 'available',
    featured: true,
  },
  {
    id: 'transcendance',
    title: 'Transcendance',
    slug: 'transcendance',
    dimensions: '29 × 29 cm',
    technique: 'Acrylique sur toile',
    series: 'Bleu Cendres',
    description:
      'L’or qui s’élève au-dessus du bleu — la lumière que l’artiste aime s’approprier pour mieux la restituer.',
    image: '',
    alt: 'Petite toile carrée abstraite, bleu profond et or, série Bleu Cendres, 29 × 29 cm.',
    status: 'available',
    featured: true,
  },
  {
    id: 'neverland',
    title: 'Neverland',
    slug: 'neverland',
    dimensions: '40 × 30 cm',
    technique: 'Acrylique sur toile',
    series: 'Bleu Cendres',
    description: 'Petit format de la série Bleu Cendres, entre matière et lumière.',
    image: '',
    alt: 'Petite toile abstraite, dominantes bleu et or, série Bleu Cendres, 40 × 30 cm.',
    status: 'available',
  },
  {
    id: 'la-vie',
    title: 'La Vie',
    slug: 'la-vie',
    dimensions: '30 × 40 cm',
    technique: 'Acrylique sur toile',
    series: 'Bleu Cendres',
    description: 'Un geste vital condensé dans un petit format — coucher l’émotion sur la toile.',
    image: '',
    alt: 'Petite toile abstraite, série Bleu Cendres, dominantes bleu et or, 30 × 40 cm.',
    status: 'available',
  },
  {
    id: 'gold-and-blue-flowers',
    title: 'Gold and Blue Flowers',
    slug: 'gold-and-blue-flowers',
    dimensions: '24 × 30 cm',
    technique: 'Acrylique sur toile',
    series: 'Bleu Cendres',
    description: 'L’or et le bleu en floraison — la signature chromatique du recueil Bleu Cendres.',
    image: '',
    alt: 'Petite toile florale abstraite, or et bleu, série Bleu Cendres, 24 × 30 cm.',
    status: 'available',
  },
  {
    id: 'interstellar-iii',
    title: 'Interstellar III',
    slug: 'interstellar-iii',
    // dimensions : non communiquées sur le site source — à compléter
    technique: 'Acrylique sur toile',
    series: 'Bleu Cendres',
    description: 'Le bleu profond comme un ciel, l’or comme une trouée de lumière.',
    image: '',
    alt: 'Toile abstraite bleu profond traversée d’or, série Bleu Cendres.',
    status: 'available',
  },

  // --------------------------------------------------------------
  //  AUTRES ŒUVRES — titres réels issus du site existant.
  //  Dimensions non communiquées : à compléter, ne pas inventer.
  // --------------------------------------------------------------
  {
    id: 'sous-le-soleil-de-bodega',
    title: 'Sous le soleil de Bodéga',
    slug: 'sous-le-soleil-de-bodega',
    year: '2023',
    technique: 'Acrylique sur toile — création en performance',
    series: 'Performances',
    description:
      'Toile née en direct le 20 juillet 2023, lors d’une performance mêlant peinture et danse.',
    image: '',
    alt: 'Toile abstraite créée en direct lors d’une performance peinture et danse, « Sous le soleil de Bodéga », 2023.',
    status: 'on-request',
  },
  {
    id: 'impression-collioure',
    title: 'Impression Collioure',
    slug: 'impression-collioure',
    // dimensions : à compléter
    technique: 'Acrylique sur toile',
    series: 'Impressions',
    description:
      'La lumière de Collioure, cité des peintres chère à l’artiste, affleure d’elle-même, portée par la couleur.',
    image: '',
    alt: 'Toile aux couleurs de la lumière méditerranéenne de Collioure.',
    status: 'on-request',
  },
  {
    id: 'pollution-marine',
    title: 'Pollution marine',
    slug: 'pollution-marine',
    // dimensions : à compléter
    technique: 'Acrylique sur toile',
    series: 'Impressions',
    // description : non communiquée sur le site source — à compléter par l'artiste
    image: '',
    alt: 'Toile abstraite d’Armelle Mourier, « Pollution marine ».',
    status: 'on-request',
  },
  {
    id: 'la-victoire-de-mandela',
    title: 'La victoire de Mandela',
    slug: 'la-victoire-de-mandela',
    // dimensions : à compléter
    technique: 'Acrylique sur toile',
    series: 'Impressions',
    // description : non communiquée sur le site source — à compléter par l'artiste
    image: '',
    alt: 'Toile abstraite d’Armelle Mourier, « La victoire de Mandela ».',
    status: 'on-request',
  },
];

// ---------- Aides (pas besoin de les modifier) ----------
export const allSeries = Array.from(
  new Set(artworks.map((a) => a.series).filter(Boolean))
) as string[];

export const featuredArtworks = artworks.filter((a) => a.featured);

// Œuvres présentables à l'acquisition (tout sauf « vendue »)
export const availableArtworks = artworks.filter((a) => a.status !== 'sold');

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

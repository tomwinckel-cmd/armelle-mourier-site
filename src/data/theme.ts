// =====================================================================
//  THÈME / DESIGN TOKENS — « cockpit » du site (source unique de la DA)
//  ---------------------------------------------------------------------
//  Objectif : un futur panneau d'administration n'aura qu'à modifier les
//  valeurs de ce fichier pour piloter couleurs, typographie, mise en page,
//  hero, cartes d'œuvres, boutons, texture, contact et mode de vente —
//  SANS toucher au reste du code.
//
//  Mécanique :
//   • Couleurs en hexadécimal (lisibles) → converties en variables CSS
//     (canaux RGB) par Base.astro, pour préserver les opacités Tailwind.
//   • Les drapeaux (booléens / chaînes) sont lus par les composants et
//     les pages pour activer/désactiver des éléments ou changer un texte.
//   • global.css déclare des valeurs par défaut identiques en secours.
//
//  Âme de la carte de visite d'Armelle Mourier : blanc/ivoire, bleu
//  profond, bleu clair, or, geste, respiration, signature.
// =====================================================================

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
// Palette d'ARTISTE (pigment/papier/encre), pas une palette de marque.
// Inspirée de l'œuvre imprimée sur la carte de visite : bleus picturaux,
// ocre pigment, noir encre, papier chaud.
export type ThemeColors = {
  paper: string;        // papier chaud / carnet (fond principal)
  paperRaw: string;     // papier brut (fond secondaire, plus profond)
  white: string;        // blanc cassé papier (pas un blanc pur premium)
  bluePigment: string;  // bleu outremer / Collioure — bleu vivant pictural
  blueDeep: string;     // bleu nuit pictural — masses sombres
  blueWash: string;     // bleu clair aquatique — lavis
  ochreGold: string;    // ocre-pigment — trace, pas accent luxe
  inkBlack: string;     // noir encre — signature, texte
  charcoal: string;     // noir doux / charbon — masses sombres
  ashBlue: string;      // bleu-gris cendre — texte secondaire, filets
};

export type ThemeTypography = {
  /** Police des titres / signature (doit être chargée dans Base.astro). */
  serif: string;
  /** Police du texte courant. */
  sans: string;
  /** Style de la signature : 'serif-italic' (sobre) ou 'serif-upright'. */
  signature: 'serif-italic' | 'serif-upright';
};

export type ThemeLayout = {
  /** Rayon des cartes et visuels (ex. '0.5rem'). */
  radiusCard: string;
  /** Épaisseur des filets de galerie (ex. '1px'). */
  borderHair: string;
};

export type ThemeHero = {
  /** 'living-card' = esprit carte de visite vivante ; 'plain' = sobre. */
  mode: 'living-card' | 'plain';
  /** Trait au pinceau sous le nom (signature). */
  showSignatureLine: boolean;
  /** Fragment d'œuvre encadré (filet or + lueur bleu clair). */
  showArtworkFragment: boolean;
  eyebrow: string;
  lead: string;
};

export type ThemeArtworkCards = {
  /** Style de carte. 'gallery-card' = filet galerie + survol pictural. */
  variant: 'gallery-card' | 'plain';
  showStatus: boolean;     // pastille de disponibilité
  showTechnique: boolean;  // ligne technique/dimensions/année
};

export type ThemeButtons = {
  /** 'full' = pilule ; 'card' = même rayon que les cartes. */
  radius: 'full' | 'card';
  /** 'line-gold' = filet or discret ; 'solid' = aplat simple. */
  style: 'line-gold' | 'solid';
};

export type ThemeTexture = {
  enabled: boolean;
  /** Force du voile de matière. */
  intensity: 'none' | 'subtle' | 'medium';
};

export type ThemeContact = {
  /** N'affiche le téléphone QUE si true ET phone renseigné (off par défaut). */
  showPhone: boolean;
  phone: string;
};

export type ThemeSaleMode = {
  /** 'soft-contact' = vente douce : pas de panier, contact direct. */
  type: 'soft-contact';
  /** Affiche un prix chiffré ? false = toujours « Prix sur demande ». */
  showPrices: boolean;
  /** Libellé du bouton de demande d'œuvre. */
  cta: string;
  /** Met en avant le bloc vente sur l'accueil. */
  highlightOnHome: boolean;
};

export type ThemeFragment = {
  /**
   * Rendu du visuel d'attente (ArtworkPlaceholder) :
   * 'fragment' = fragment pictural (bleu/or, matière, cadre carte de visite) ;
   * 'plain' = aplat sobre.
   */
  placeholderStyle: 'fragment' | 'plain';
  /** Intensité des couches picturales (placeholder + halo du hero). */
  intensity: 'subtle' | 'medium' | 'vivid';
  /** Trait de geste doré (SVG léger) sur le fragment. */
  accentStroke: boolean;
};

// Identité visuelle « atelier-galerie » — modes futurs + tokens picturaux.
// Pensé pour piloter une DA d'artiste (carnet/cartel/galerie), pas un template.
export type ThemeIdentity = {
  visualIdentity: 'artist-studio' | 'atelier-gallery' | 'clean';
  textureMode: 'pictorial' | 'flat';
  /** Composition du hero. 'business-card-fragment' = carte de visite agrandie. */
  heroComposition: 'business-card-fragment' | 'plain';
  /** Menu mobile. 'atelier-notebook' = carnet d'atelier (papier, lignes, n°). */
  menuMode: 'atelier-notebook' | 'bar';
  /** Boutons. 'handline' = liens d'atelier soulignés à la main (filet or). */
  buttonMode: 'handline' | 'artist-line' | 'pill';
  /** Cartes. 'exhibition-label' = cartel/fiche d'atelier sur papier. */
  cardMode: 'exhibition-label' | 'cartel' | 'card';
  heroMode: 'living-atelier' | 'living-card';
  accentMode: 'blue-gold-trace' | 'plain';
  /** Fragment pictural. 'blue-gold-rectangles' = blocs verticaux bleu/noir + or. */
  fragmentStyle: 'blue-gold-rectangles' | 'wash';
  /** Ambiance du fond. 'raw-ivory' = ivoire vivant, matière inégale. */
  paperMood: 'raw-ivory' | 'flat';
  /** Usage de l'or. 'pigment-trace' = trace/pigment, pas accent luxe. */
  goldUse: 'pigment-trace' | 'accent';
  /** Usage du bleu. 'paint-matter' = matière picturale, pas couleur de marque. */
  blueUse: 'paint-matter' | 'brand';

  // Tokens picturaux (0 → 1, sauf indication). Injectés en variables CSS.
  borderIrregularity: number;       // 0 = filets nets ; 1 = coins organiques
  paperTexture: number;             // grain/matière du papier ivoire
  brushStrokeIntensity: number;     // force des gestes/traits
  artworkFragmentIntensity: number; // densité picturale des fragments
  goldTraceOpacity: number;         // l'or comme trace, pas comme luxe
  blueDepth: number;                // profondeur du bleu (masses sombres)
  softBlueWash: number;             // lavis bleu clair des sections
};

export type Theme = {
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
  identity: ThemeIdentity;
  hero: ThemeHero;
  artworkCards: ThemeArtworkCards;
  buttons: ThemeButtons;
  texture: ThemeTexture;
  fragment: ThemeFragment;
  contact: ThemeContact;
  saleMode: ThemeSaleMode;
};

/* ------------------------------------------------------------------ */
/*  Configuration active                                               */
/* ------------------------------------------------------------------ */
export const theme: Theme = {
  colors: {
    paper: '#F4EFE3',       // papier chaud / carnet
    paperRaw: '#E7DECB',    // papier brut
    white: '#FBF9F3',       // blanc cassé papier
    bluePigment: '#2B4C92', // outremer / Collioure
    blueDeep: '#15223B',    // bleu nuit pictural
    blueWash: '#8FB7C7',    // bleu clair aquatique
    ochreGold: '#A2762E',   // ocre-pigment
    inkBlack: '#1A1613',    // noir encre
    charcoal: '#2C2A2B',    // charbon / masse sombre
    ashBlue: '#73808B',     // bleu-gris cendre
  },
  typography: {
    serif: 'Fraunces',
    sans: 'Mulish',
    signature: 'serif-italic',
  },
  layout: {
    radiusCard: '0.5rem',
    borderHair: '1px',
  },
  identity: {
    visualIdentity: 'artist-studio',
    textureMode: 'pictorial',
    heroComposition: 'business-card-fragment',
    menuMode: 'atelier-notebook',
    buttonMode: 'handline',
    cardMode: 'exhibition-label',
    heroMode: 'living-atelier',
    accentMode: 'blue-gold-trace',
    fragmentStyle: 'blue-gold-rectangles',
    paperMood: 'raw-ivory',
    goldUse: 'pigment-trace',
    blueUse: 'paint-matter',
    borderIrregularity: 0.7,
    paperTexture: 0.8,
    brushStrokeIntensity: 0.85,
    artworkFragmentIntensity: 1,
    goldTraceOpacity: 0.7,
    blueDepth: 0.8,
    softBlueWash: 0.45,
  },
  hero: {
    mode: 'living-card',
    showSignatureLine: true,
    showArtworkFragment: true,
    eyebrow: 'Artiste peintre & plasticienne',
    lead:
      'Une peinture de la couleur et de la matière, entre la lumière de Collioure et la terre de Bourgogne.',
  },
  artworkCards: {
    variant: 'gallery-card',
    showStatus: true,
    showTechnique: true,
  },
  buttons: {
    radius: 'full',
    style: 'solid',
  },
  texture: {
    enabled: true,
    intensity: 'subtle',
  },
  fragment: {
    placeholderStyle: 'fragment',
    intensity: 'medium',
    accentStroke: true,
  },
  contact: {
    showPhone: false,
    phone: '',
  },
  saleMode: {
    type: 'soft-contact',
    showPrices: false,
    cta: 'Demander cette œuvre',
    highlightOnHome: true,
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers (consommés par Base.astro)                                 */
/* ------------------------------------------------------------------ */

/** Convertit un hex (#RRGGBB) en canaux RGB « r g b » pour les vars CSS. */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '').trim();
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/** Mappe la palette d'artiste vers les variables CSS consommées par Tailwind.
 *  Les noms historiques (--c-encre, --c-or, --c-cendre, --c-noir, --c-brume)
 *  sont conservés pour ne rien casser, mais pointent vers les nouveaux pigments.
 *  De nouveaux tokens (--c-blue-pigment, --c-charcoal, --c-paper-raw) s'ajoutent. */
export function themeColorVars(colors: ThemeColors): Record<string, string> {
  return {
    '--c-paper': hexToRgbChannels(colors.paper),
    '--c-brume': hexToRgbChannels(colors.paperRaw),       // fond secondaire
    '--c-paper-raw': hexToRgbChannels(colors.paperRaw),
    '--c-white': hexToRgbChannels(colors.white),
    '--c-encre': hexToRgbChannels(colors.blueDeep),       // masses sombres / dark
    '--c-blue-pigment': hexToRgbChannels(colors.bluePigment),
    '--c-blue-soft': hexToRgbChannels(colors.blueWash),   // lavis aquatique
    '--c-or': hexToRgbChannels(colors.ochreGold),         // ocre-pigment
    '--c-cendre': hexToRgbChannels(colors.ashBlue),
    '--c-noir': hexToRgbChannels(colors.inkBlack),
    '--c-charcoal': hexToRgbChannels(colors.charcoal),
  };
}

const TEXTURE_STRENGTH: Record<ThemeTexture['intensity'], string> = {
  none: '0',
  subtle: '0.05',
  medium: '0.09',
};

// Force des couches picturales du fragment (placeholder + halo hero).
const FRAGMENT_STRENGTH: Record<ThemeFragment['intensity'], string> = {
  subtle: '0.55',
  medium: '0.8',
  vivid: '1',
};

/** Construit l'ensemble des variables CSS injectées dans :root par Base. */
export function themeCssVars(t: Theme): Record<string, string> {
  // Voile de matière : combine l'ancien réglage texture et le grain papier.
  const textureBase = t.texture.enabled ? Number(TEXTURE_STRENGTH[t.texture.intensity]) : 0;
  const textureStrength = Math.max(textureBase, t.identity.paperTexture * 0.06);
  // Densité picturale des fragments : piloté par l'identité (fallback enum).
  const fragmentStrength = t.identity.artworkFragmentIntensity || Number(FRAGMENT_STRENGTH[t.fragment.intensity]);
  return {
    ...themeColorVars(t.colors),
    '--radius-card': t.layout.radiusCard,
    '--border-hair': t.layout.borderHair,
    '--btn-radius': t.buttons.radius === 'full' ? '999px' : 'var(--radius-card)',
    '--texture-strength': String(textureStrength),
    '--fragment-strength': String(fragmentStrength),
    // Tokens identité « atelier-galerie ».
    '--border-irregular': String(t.identity.borderIrregularity),
    '--brush-strength': String(t.identity.brushStrokeIntensity),
    '--gold-trace': String(t.identity.goldTraceOpacity),
    '--soft-blue-wash': String(t.identity.softBlueWash),
    '--paper-grain': String(t.identity.paperTexture),
    '--blue-depth': String(t.identity.blueDepth),
    '--font-serif': `'${t.typography.serif}', Georgia, serif`,
    '--font-sans': `'${t.typography.sans}', system-ui, sans-serif`,
  };
}

// =====================================================================
//  AMBIANCES VISUELLES activables PLUS TARD (préparation, pas de switch global)
//  ---------------------------------------------------------------------
//  Données seulement : un futur cockpit pourra proposer ces ambiances.
//  Aujourd'hui, l'ambiance active reste `theme.identity` (artist-studio).
// =====================================================================
export const designModes = [
  {
    id: 'artist-studio',
    label: 'Atelier pigment',
    description: 'Papier, bleu pigment, ocre, cartels.',
  },
  {
    id: 'gallery-minimal',
    label: 'Galerie claire',
    description: 'Plus blanc, plus sobre, priorité aux œuvres.',
  },
  {
    id: 'blue-cendres',
    label: 'Bleu Cendres',
    description: 'Bleus profonds, or, paysages intérieurs.',
  },
] as const;

// =====================================================================
//  MODES VISUELS — présentation pour le cockpit (PRÉPARATION, pas un switch)
//  ---------------------------------------------------------------------
//  Décrit chaque ambiance pour aider l'artiste à CHOISIR une direction.
//  Le cockpit ne change PAS le thème : il prépare une demande à valider,
//  puis Tom/Claude ajustent theme.ts après accord humain.
// =====================================================================
export type VisualMode = {
  id: string;
  label: string;
  intention: string;
  colors: string[];
  sensation: string;
  usage: string;
  active: boolean;
};

export const visualModes: VisualMode[] = [
  {
    id: 'artist-studio',
    label: 'Atelier pigment',
    intention: 'L’atelier vivant : papier chaud, bleu pigment, ocre trace, cartels d’exposition.',
    colors: ['Papier chaud', 'Bleu pigment', 'Ocre trace'],
    sensation: 'Chaleureux, incarné, fait main.',
    usage: 'Identité actuelle — équilibre entre matière et lisibilité.',
    active: true,
  },
  {
    id: 'gallery-minimal',
    label: 'Galerie claire',
    intention: 'Plus de blanc, plus de silence — priorité aux œuvres.',
    colors: ['Blanc cassé', 'Gris cendre', 'Or discret'],
    sensation: 'Calme, épuré, contemplatif.',
    usage: 'Idéal quand les vraies images HD seront intégrées.',
    active: false,
  },
  {
    id: 'blue-cendres',
    label: 'Bleu Cendres',
    intention: 'Bleus profonds, or discret, paysages intérieurs.',
    colors: ['Bleu nuit', 'Bleu pigment', 'Or'],
    sensation: 'Profond, poétique, intériorisé.',
    usage: 'Lien fort avec le recueil Bleu Cendres.',
    active: false,
  },
];

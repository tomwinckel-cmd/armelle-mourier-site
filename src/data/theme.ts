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
export type ThemeColors = {
  paper: string;     // fond principal (ivoire chaud)
  brume: string;     // fond secondaire (ivoire plus profond)
  white: string;     // blanc pur (cartes, contrastes)
  blueDeep: string;  // bleu profond — sombre principal (« encre »)
  blueSoft: string;  // bleu clair — accent lumineux de la carte
  gold: string;      // or doux — accent discret (jamais criard)
  ash: string;       // gris-bleu cendré — texte secondaire, filets
  ink: string;       // noir doux — texte courant
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

export type Theme = {
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
  hero: ThemeHero;
  artworkCards: ThemeArtworkCards;
  buttons: ThemeButtons;
  texture: ThemeTexture;
  contact: ThemeContact;
  saleMode: ThemeSaleMode;
};

/* ------------------------------------------------------------------ */
/*  Configuration active                                               */
/* ------------------------------------------------------------------ */
export const theme: Theme = {
  colors: {
    paper: '#F5F2EB',
    brume: '#E9E5DA',
    white: '#FFFFFF',
    blueDeep: '#173039',
    blueSoft: '#7FAEC6',
    gold: '#A9791F',
    ash: '#6F7C82',
    ink: '#211F1B',
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
    style: 'line-gold',
  },
  texture: {
    enabled: true,
    intensity: 'subtle',
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

/** Mappe les couleurs du thème vers les variables CSS attendues. */
export function themeColorVars(colors: ThemeColors): Record<string, string> {
  return {
    '--c-paper': hexToRgbChannels(colors.paper),
    '--c-brume': hexToRgbChannels(colors.brume),
    '--c-white': hexToRgbChannels(colors.white),
    '--c-encre': hexToRgbChannels(colors.blueDeep),
    '--c-blue-soft': hexToRgbChannels(colors.blueSoft),
    '--c-or': hexToRgbChannels(colors.gold),
    '--c-cendre': hexToRgbChannels(colors.ash),
    '--c-noir': hexToRgbChannels(colors.ink),
  };
}

const TEXTURE_STRENGTH: Record<ThemeTexture['intensity'], string> = {
  none: '0',
  subtle: '0.05',
  medium: '0.09',
};

/** Construit l'ensemble des variables CSS injectées dans :root par Base. */
export function themeCssVars(t: Theme): Record<string, string> {
  return {
    ...themeColorVars(t.colors),
    '--radius-card': t.layout.radiusCard,
    '--border-hair': t.layout.borderHair,
    '--btn-radius': t.buttons.radius === 'full' ? '999px' : 'var(--radius-card)',
    '--texture-strength': t.texture.enabled ? TEXTURE_STRENGTH[t.texture.intensity] : '0',
    '--font-serif': `'${t.typography.serif}', Georgia, serif`,
    '--font-sans': `'${t.typography.sans}', system-ui, sans-serif`,
  };
}

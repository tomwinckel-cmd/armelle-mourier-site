// =====================================================================
//  THÈME / DESIGN TOKENS — source unique de la direction artistique
//  ---------------------------------------------------------------------
//  Ce fichier est pensé pour devenir le « cockpit » du site : un futur
//  panneau d'administration n'aura qu'à modifier les valeurs ci-dessous
//  pour changer couleurs, arrondis, style des boutons, textures et le
//  wording du hero — SANS toucher au reste du code.
//
//  Comment ça marche :
//   • Les couleurs sont écrites en hexadécimal (faciles à lire/éditer).
//   • Le layout Base.astro convertit ces hex en variables CSS
//     (canaux RGB) injectées dans :root, ce qui permet à Tailwind de
//     garder les opacités (ex. bg-encre/10) tout en restant pilotable.
//   • global.css déclare des valeurs par défaut identiques en secours.
//
//  Palette inspirée de la carte de visite d'Armelle Mourier :
//  ivoire chaud, bleu profond, bleu clair, or doux, noir doux.
// =====================================================================

export type ThemeColors = {
  paper: string;     // fond principal (ivoire chaud)
  brume: string;     // fond secondaire (ivoire plus profond)
  white: string;     // blanc pur (cartes, contrastes)
  blueDeep: string;  // bleu profond — couleur sombre principale (« encre »)
  blueSoft: string;  // bleu clair — accent lumineux de la carte
  gold: string;      // or doux — accent discret (jamais criard)
  ash: string;       // gris-bleu cendré — texte secondaire, filets
  ink: string;       // noir doux — texte courant
};

export type ThemeUI = {
  /** Rayon des cartes et visuels (ex. '0.5rem', '1rem', '1.5rem'). */
  radiusCard: string;
  /** Épaisseur des filets de galerie (ex. '1px'). */
  borderHair: string;
  /** 'soft' = légère ombre portée ; 'flat' = pur trait de galerie. */
  cardStyle: 'soft' | 'flat';
  /** Active le voile de matière très subtil (effet toile/peinture). */
  showTexture: boolean;
};

export type ThemeHome = {
  /** Présentation du hero. 'artwork-card' = fragment d'œuvre encadré. */
  heroMode: 'artwork-card' | 'plain';
  /** Met en avant le bloc « Tableaux disponibles » sur l'accueil. */
  highlightSale: boolean;
  /** Petit intitulé au-dessus du nom dans le hero. */
  heroEyebrow: string;
  /** Phrase d'accroche éditable du hero (sinon, fallback sur site.baseline). */
  heroLead: string;
};

export type Theme = {
  colors: ThemeColors;
  ui: ThemeUI;
  home: ThemeHome;
};

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
  ui: {
    radiusCard: '0.5rem',
    borderHair: '1px',
    cardStyle: 'soft',
    showTexture: true,
  },
  home: {
    heroMode: 'artwork-card',
    highlightSale: true,
    heroEyebrow: 'Artiste peintre & plasticienne',
    heroLead:
      'Une peinture de la couleur et de la matière, entre la lumière de Collioure et la terre de Bourgogne.',
  },
};

// ---------------------------------------------------------------------
//  Utilitaire : convertit un hex (#RRGGBB) en canaux RGB « r g b »
//  pour les variables CSS consommées par Tailwind avec opacité.
//  Ex. '#173039' -> '23 48 57'
// ---------------------------------------------------------------------
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '').trim();
  const full =
    clean.length === 3
      ? clean.split('').map((c) => c + c).join('')
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

// Mappe les couleurs du thème vers les noms de variables CSS attendus.
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

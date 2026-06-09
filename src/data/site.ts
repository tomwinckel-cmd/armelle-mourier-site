// =====================================================================
//  CONFIGURATION GÉNÉRALE DU SITE
//  Ce fichier regroupe les informations qui reviennent partout :
//  identité, navigation, contact. C'est ici qu'on modifie l'e-mail,
//  les liens sociaux ou le menu, sans toucher au reste du code.
// =====================================================================

export const site = {
  artistName: 'Armelle Mourier',
  role: 'Artiste peintre & plasticienne',
  // Phrase manifeste courte, fidèle à ses propres mots (voir bio).
  manifesto: 'Peindre comme on respire, transmettre la joie d’être en vie.',
  baseline:
    'Une peinture de la couleur et de la matière, entre la lumière de Collioure et la terre de Bourgogne.',
  // ⚠️ Domaine définitif à mettre à jour ici ET dans astro.config.mjs
  url: 'https://www.armellemourier.fr',
  locale: 'fr_FR',
  lang: 'fr',
  city: 'Dijon',
  region: 'Bourgogne',
  country: 'France',
};

export const contact = {
  email: 'armellemourier02@gmail.com',
  // ⚠️ PLACEHOLDERS — à remplacer par les vrais comptes d'Armelle, ou à laisser
  // vides (les liens vides ne s'affichent pas). NE PAS réutiliser les comptes
  // de démonstration Wix de l'ancien site.
  social: [
    // { label: 'Instagram', href: 'https://instagram.com/votre_compte' },
    // { label: 'Facebook', href: 'https://facebook.com/armelle.mourier' },
  ] as { label: string; href: string }[],
  // Objets proposés dans le formulaire de contact
  subjects: [
    'Acquisition d’une œuvre',
    'Demande de catalogue',
    'Exposition',
    'Résidence',
    'Atelier',
    'Presse',
    'Commande spéciale',
    'Autre',
  ],
};

// Navigation principale (ordre = ordre du menu)
export const nav = [
  { label: 'Œuvres', href: '/oeuvres' },
  { label: 'Disponibles', href: '/disponibles' },
  { label: 'Biographie', href: '/biographie' },
  { label: 'Démarche', href: '/demarche' },
  { label: 'Bleu Cendres', href: '/bleu-cendres' },
  { label: 'Expositions', href: '/expositions' },
  { label: 'Contact', href: '/contact' },
];

// Mots-clés SEO par défaut (complétés page par page)
export const defaultKeywords = [
  'Armelle Mourier',
  'artiste peintre Dijon',
  'artiste plasticienne Bourgogne',
  'peinture abstraite',
  'peinture acrylique',
  'tableaux contemporains',
  'acheter tableau artiste peintre',
  'œuvre originale artiste française',
  'Bleu Cendres',
  'ArtDi',
  'artiste Collioure',
  'expositions artistiques Dijon',
];

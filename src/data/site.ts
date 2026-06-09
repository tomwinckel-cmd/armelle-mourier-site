// =====================================================================
//  CONFIGURATION GÉNÉRALE DU SITE
//  Ce fichier regroupe les informations qui reviennent partout :
//  identité, navigation, contact. C'est ici qu'on modifie l'e-mail,
//  les liens sociaux ou le menu, sans toucher au reste du code.
// =====================================================================
import { shop } from './shop';

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
  // Objets proposés dans le formulaire de contact (source unique : shop.ts)
  subjects: shop.contactSubjects,
};

// =====================================================================
//  NAVIGATION ÉDITORIALE — « Le Carnet »
//  Chaque entrée = une porte d'atelier : numéro, titre, et une courte note
//  qui donne envie d'entrer dans la page (et non un simple lien).
//  ➜ Pour MODIFIER un libellé ou une note : éditez ce tableau, c'est tout.
//     (label/href servent aussi au menu desktop et au pied de page.)
// =====================================================================
export type NavItem = {
  label: string;
  href: string;
  index: string; // numéro de carnet (01, 02, …)
  note: string;  // courte note éditoriale (carnet)
};

export const nav: NavItem[] = [
  { label: 'Œuvres', href: '/oeuvres', index: '01', note: 'Galerie complète, séries, formats et matières.' },
  { label: 'Disponibles', href: '/disponibles', index: '02', note: 'Sélection d’atelier à découvrir ou réserver.' },
  { label: 'Biographie', href: '/biographie', index: '03', note: 'Le parcours, les lieux, les épreuves et la couleur.' },
  { label: 'Démarche', href: '/demarche', index: '04', note: 'Pigments, gestes, toile, danse et catharsis.' },
  { label: 'Bleu Cendres', href: '/bleu-cendres', index: '05', note: 'Le recueil, les bleus, les ors et les paysages intérieurs.' },
  { label: 'Expositions', href: '/expositions', index: '06', note: 'Chronologie, lieux, rencontres et projets.' },
  { label: 'Contact', href: '/contact', index: '07', note: 'Écrire à l’artiste pour une œuvre, une exposition ou une rencontre.' },
];

// Textes éditoriaux du Carnet (modifiables sans toucher au composant).
export const carnet = {
  eyebrow: 'Carnet d’atelier',
  intro: 'Un carnet pour entrer dans l’atelier, les œuvres et les paysages intérieurs.',
};

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

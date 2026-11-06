// =====================================================================
//  CONFIGURATION GÉNÉRALE DU SITE
//  Ce fichier regroupe les informations qui reviennent partout :
//  identité, navigation, contact.
//
//  ÉDITABLE PAR L'ARTISTE (admin → Réglages → « Site & mentions légales ») :
//    src/data/settings/site.json — manifeste, accroche, e-mail public,
//    réseaux sociaux, informations des mentions légales.
//  Le reste (menu, mots-clés, identité technique) reste ici, dans le code.
// =====================================================================
import { shop } from './shop';
import settings from './settings/site.json';

type SocialLink = { label: string; href: string };

/** Champ texte nettoyé ('' si vide). */
const clean = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

export const site = {
  artistName: 'Armelle Mourier',
  role: 'Artiste peintre & plasticienne',
  // Phrase manifeste courte, fidèle à ses propres mots (voir bio).
  manifesto: settings.manifesto,
  baseline: settings.baseline,
  // ⚠️ Domaine définitif à mettre à jour ici ET dans astro.config.mjs
  url: 'https://www.armellemourier.fr',
  locale: 'fr_FR',
  lang: 'fr',
  city: 'Dijon',
  region: 'Bourgogne',
  country: 'France',
};

export const contact = {
  email: settings.email,
  // Réseaux sociaux : uniquement les comptes réels d'Armelle (jamais les
  // comptes de démonstration Wix de l'ancien site). Un lien incomplet
  // (nom ou adresse vide) n'est pas affiché.
  social: ((settings.social ?? []) as SocialLink[])
    .map((s) => ({ label: clean(s.label), href: clean(s.href) }))
    .filter((s) => s.label && s.href),
  // Objets proposés dans le formulaire de contact (source unique : shop.ts)
  subjects: shop.contactSubjects,
};

/**
 * MENTIONS LÉGALES — informations de l'éditrice (Armelle).
 * Champ vide ⇒ la page affiche « [à compléter] » et un bandeau de rappel.
 */
export const legal = {
  address: clean(settings.legal?.address),
  status: clean(settings.legal?.status),
  photoCredits: clean(settings.legal?.photoCredits),
  siteCredits: clean(settings.legal?.siteCredits),
};

/** Hébergeur du site (obligation légale, LCEN). Source : vercel.com/legal. */
export const host = {
  name: 'Vercel Inc.',
  address: '440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis',
  phone: '+1 559 288 7060',
  url: 'https://vercel.com',
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

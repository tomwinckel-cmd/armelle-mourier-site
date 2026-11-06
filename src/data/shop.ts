// =====================================================================
//  COMMERCE DOUX — configuration de la « vente par contact »
//  ---------------------------------------------------------------------
//  Aucune boutique automatique, aucun paiement en ligne, aucun prix imposé.
//  L'acquisition se fait EN LIEN DIRECT avec l'artiste (contact / réservation
//  / demande d'informations / catalogue). Ce fichier centralise les réglages
//  commerciaux et les libellés.
//
//  ⚠️ Ne JAMAIS mettre ici de secret, token, clé API ou mot de passe.
//
//  ÉDITABLE PAR L'ARTISTE (admin → Réglages → « Vente douce ») :
//    src/data/settings/shop.json — affichage des prix, libellés des boutons,
//    réservation / catalogue, objets du formulaire de contact.
//  Les GARDE-FOUS (mode, paiement en ligne désactivé) restent ici, dans le code.
// =====================================================================
import settings from './settings/shop.json';

export type SaleMode = 'soft-contact';

export const shop = {
  /** Mode de vente : contact direct (jamais de panier/checkout pour l'instant). */
  mode: 'soft-contact' as SaleMode,

  /** Afficher des prix chiffrés ? false ⇒ toujours « Prix sur demande ». */
  showPrices: settings.showPrices === true,
  /** Libellé affiché à la place d'un prix. */
  defaultPriceLabel: settings.defaultPriceLabel || 'Prix sur demande',

  /** Devise prévue pour plus tard (aucun affichage tant que showPrices = false). */
  currency: 'EUR',

  /** Garde-fous d'extension future. */
  enableCheckout: false, // paiement en ligne — NON (garde-fou, non éditable)
  enableReservation: settings.enableReservation !== false, // réserver une œuvre par contact
  enableCatalogRequest: settings.enableCatalogRequest !== false, // demander le catalogue

  /** Libellés d'appel à l'action (vente douce). */
  cta: {
    artwork: settings.cta?.artwork || 'Demander cette œuvre',
    info: settings.cta?.info || 'Recevoir les informations',
    catalog: settings.cta?.catalog || 'Demander le catalogue',
    reserve: settings.cta?.reserve || 'Réserver cette œuvre',
  },

  /** Objets proposés dans le formulaire de contact (source unique). */
  contactSubjects: (settings.contactSubjects ?? []).filter(
    (s): s is string => typeof s === 'string' && s.trim() !== '',
  ),
};

/** Correspondance ?objet=… (URL) → libellé du formulaire (préremplissage). */
export const contactSubjectByKey: Record<string, string> = {
  acquisition: 'Acquisition d’une œuvre',
  reservation: 'Réservation d’une œuvre',
  catalogue: 'Demande de catalogue',
  exposition: 'Exposition',
  residence: 'Résidence',
  atelier: 'Atelier',
  presse: 'Presse',
  commande: 'Commande spéciale',
  'bleu-cendres': 'Demande de catalogue',
};

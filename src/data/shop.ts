// =====================================================================
//  COMMERCE DOUX — configuration de la « vente par contact »
//  ---------------------------------------------------------------------
//  Aucune boutique automatique, aucun paiement en ligne, aucun prix imposé.
//  L'acquisition se fait EN LIEN DIRECT avec l'artiste (contact / réservation
//  / demande d'informations / catalogue). Ce fichier centralise les réglages
//  commerciaux et les libellés — futur point d'édition du « cockpit ».
//
//  ⚠️ Ne JAMAIS mettre ici de secret, token, clé API ou mot de passe.
// =====================================================================

export type SaleMode = 'soft-contact';

export const shop = {
  /** Mode de vente : contact direct (jamais de panier/checkout pour l'instant). */
  mode: 'soft-contact' as SaleMode,

  /** Afficher des prix chiffrés ? false ⇒ toujours « Prix sur demande ». */
  showPrices: false,
  /** Libellé affiché à la place d'un prix. */
  defaultPriceLabel: 'Prix sur demande',

  /** Devise prévue pour plus tard (aucun affichage tant que showPrices = false). */
  currency: 'EUR',

  /** Garde-fous d'extension future (désactivés aujourd'hui). */
  enableCheckout: false,      // paiement en ligne — NON (futur, hors-scope)
  enableReservation: true,    // possibilité de réserver une œuvre par contact
  enableCatalogRequest: true, // possibilité de demander le catalogue

  /** Libellés d'appel à l'action (vente douce). */
  cta: {
    artwork: 'Demander cette œuvre',
    info: 'Recevoir les informations',
    catalog: 'Demander le catalogue',
    reserve: 'Réserver cette œuvre',
  },

  /** Objets proposés dans le formulaire de contact (source unique). */
  contactSubjects: [
    'Acquisition d’une œuvre',
    'Réservation d’une œuvre',
    'Demande de catalogue',
    'Exposition',
    'Résidence',
    'Atelier',
    'Presse',
    'Commande spéciale',
    'Autre',
  ],
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

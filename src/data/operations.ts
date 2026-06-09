// =====================================================================
//  CENTRE OPÉRATIONNEL — modèle (PAS un système actif)
//  ---------------------------------------------------------------------
//  Décrit, en langage humain, les modules « opérations » du cockpit :
//  protéger une œuvre, préparer une publication, répondre à une demande,
//  préparer une facture brouillon, organiser une remise, faire un catalogue.
//
//  Principe : le cockpit ORCHESTRE le travail (repo + Claude Code + validation
//  humaine). Aucun service externe n'est ajouté sans bénéfice net. Aucune
//  action sensible n'est automatisée sans validation humaine.
//
//  ⚠️ Ni avis juridique, ni comptabilité légale, ni secret, ni service branché.
// =====================================================================

export type OperationStatus = 'planned' | 'prototype' | 'active';
export type OperationComplexity = 'low' | 'medium' | 'high';

export type OperationModule = {
  id: string;
  label: string;
  description: string;
  actions: string[];
  status: OperationStatus;
  complexity: OperationComplexity;
  /** Nécessite-t-il un service externe (à éviter tant que pas de bénéfice net) ? */
  requiresExternalService: boolean;
  /** Une validation humaine est-elle requise avant toute action ? */
  humanValidationRequired: boolean;
};

export const operations: OperationModule[] = [
  {
    id: 'ip',
    label: 'Propriété intellectuelle',
    description:
      "Constituer une preuve de création claire pour chaque œuvre (sans publier les fichiers HD).",
    actions: [
      'Créer une fiche œuvre complète (titre, dimensions, technique, date, série, description)',
      'Conserver une photo HD privée + une version web compressée',
      'Ajouter des photos de détails',
      'Préparer un rappel de dépôt de preuve (e-Soleau / INPI) pour les œuvres importantes',
      'Appliquer un filigrane léger sur les images web',
      'Tenir un registre interne des œuvres',
    ],
    status: 'planned',
    complexity: 'medium',
    requiresExternalService: false, // e-Soleau est une démarche manuelle externe, hors cockpit
    humanValidationRequired: true,
  },
  {
    id: 'soft-sale',
    label: 'Vente douce',
    description:
      "Accompagner une demande d'acquisition en lien direct avec l'artiste, sans boutique.",
    actions: [
      "Préparer une réponse à une demande d'information",
      'Préparer une réservation',
      'Préparer l’envoi du catalogue',
      "Mettre à jour le statut d'une œuvre (disponible / réservée / vendue / sur demande)",
      'Noter un suivi de prospect',
      'Compléter les conditions de vente (à valider avec un professionnel)',
    ],
    status: 'prototype',
    complexity: 'low',
    requiresExternalService: false,
    humanValidationRequired: true,
  },
  {
    id: 'invoicing',
    label: 'Facturation (brouillon)',
    description:
      "Préparer un BROUILLON de facture. Le cockpit n'assure pas la comptabilité légale.",
    actions: [
      'Générer un brouillon de facture (œuvre, montant à valider)',
      'Lister les mentions obligatoires à compléter',
      'Proposer un numéro de facture à valider',
      'Indiquer le moyen de paiement à définir',
      'Suivre le statut : brouillon / envoyée / réglée',
    ],
    status: 'planned',
    complexity: 'high',
    requiresExternalService: false,
    humanValidationRequired: true,
  },
  {
    id: 'logistics',
    label: 'Logistique / récupération',
    description:
      "Organiser la remise d'une œuvre : retrait atelier, livraison locale, expédition.",
    actions: [
      'Préparer un retrait à l’atelier',
      'Préparer une livraison locale',
      'Noter le transporteur à définir et l’emballage',
      'Rappeler l’assurance éventuelle',
      "Noter l'état de l'œuvre avant départ",
      'Préparer une preuve de remise (en main propre)',
    ],
    status: 'planned',
    complexity: 'medium',
    requiresExternalService: false,
    humanValidationRequired: true,
  },
  {
    id: 'social',
    label: 'Réseaux sociaux',
    description:
      "Préparer une publication (légende, format, mots-clés) à copier-coller. Pas d'API.",
    actions: [
      'Générer une légende Instagram',
      'Proposer des hashtags',
      'Choisir un format (carré / portrait / story)',
      'Rappeler les droits d’auteur',
      'Utiliser la version web avec filigrane',
      'Copier-coller vers Instagram (publication manuelle)',
    ],
    status: 'prototype',
    complexity: 'low',
    requiresExternalService: false,
    humanValidationRequired: true,
  },
  {
    id: 'catalog',
    label: 'Catalogue',
    description:
      "Composer une sélection d'œuvres pour un collectionneur ou une exposition.",
    actions: [
      'Choisir une sélection d’œuvres',
      'Préparer une version collectionneur',
      'Préparer une version exposition',
      'Préparer un PDF (futur)',
      'Répondre à une demande de catalogue par e-mail',
    ],
    status: 'planned',
    complexity: 'medium',
    requiresExternalService: false,
    humanValidationRequired: true,
  },
  {
    id: 'human-relation',
    label: 'Relation humaine / validation',
    description:
      "La règle qui encadre tout le reste : Armelle décide, Tom valide, Claude Code exécute.",
    actions: [
      'Armelle décide de ce qui est publié, vendu, protégé',
      'Tom valide chaque étape sensible (intermédiaire humain)',
      'Claude Code exécute les tâches répétitives',
      'Aucun automatisme irréversible sans validation humaine',
    ],
    status: 'active',
    complexity: 'low',
    requiresExternalService: false,
    humanValidationRequired: true,
  },
];

/** Principe directeur des services externes. */
export const operationsPrinciple =
  "Un service externe n'est ajouté que s'il retire plus de charge mentale qu'il n'en crée.";

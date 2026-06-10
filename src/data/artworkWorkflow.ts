// =====================================================================
//  PARCOURS « AJOUTER UNE ŒUVRE » — modèle (prototype, ne sauvegarde rien)
//  ---------------------------------------------------------------------
//  Décrit les étapes pour saisir une œuvre SANS erreur avant publication.
//  Le cockpit GUIDE et VÉRIFIE ; il ne publie pas, ne sauvegarde pas,
//  ne téléverse pas. Toute publication passe par une validation humaine.
//
//  ⚠️ Aucun prix inventé · « Prix sur demande » par défaut · pas d'API ·
//     ne jamais publier les fichiers HD pleine résolution.
// =====================================================================

export type WorkflowStep = {
  id: string;
  label: string;
  description: string;
  /** Champs à préparer pour cette étape (libellés humains). */
  requiredFields: string[];
  /** Phrase d'aide simple. */
  helperText: string;
  /** Erreurs fréquentes à éviter. */
  commonMistakes: string[];
};

export const artworkWorkflow: WorkflowStep[] = [
  {
    id: 'identify',
    label: 'Identifier l’œuvre',
    description: 'Le minimum pour reconnaître l’œuvre.',
    requiredFields: ['Titre', 'Série', 'Année', 'Statut'],
    helperText: 'Un titre clair, la série si elle existe, l’année si connue.',
    commonMistakes: ['Titre vague ou en double', 'Oublier la série', 'Inventer une année'],
  },
  {
    id: 'describe',
    label: 'Décrire l’œuvre',
    description: 'Format, matière et quelques mots.',
    requiredFields: ['Dimensions', 'Technique', 'Support', 'Description courte', 'Mots-clés / ambiance'],
    helperText: 'Dimensions exactes (sinon laisser vide), technique et support (ex. toile recyclée).',
    commonMistakes: ['Inventer des dimensions', 'Description trop commerciale', 'Oublier le support'],
  },
  {
    id: 'images',
    label: 'Images',
    description: 'Une belle photo, et la version privée gardée à l’abri.',
    requiredFields: ['Image principale', 'Images de détail', 'Version web compressée', 'HD privée conservée', 'Alt text'],
    helperText: 'Publier une version web compressée ; garder la HD originale hors du site.',
    commonMistakes: ['Publier la HD pleine résolution', 'Alt text vide ou générique', 'Oublier les photos de détail'],
  },
  {
    id: 'soft-sale',
    label: 'Vente douce',
    description: 'Acquisition par contact, sans boutique.',
    requiredFields: ['Statut (disponible / réservée / vendue / sur demande)', 'Prix sur demande par défaut'],
    helperText: 'Sans prix validé, on garde « Prix sur demande ». Possibilité de demande d’informations ou de catalogue.',
    commonMistakes: ['Inventer un prix', 'Marquer disponible une œuvre vendue', 'Promettre un délai non confirmé'],
  },
  {
    id: 'protection',
    label: 'Protection',
    description: 'Constituer une preuve de création (sans publier la HD).',
    requiredFields: ['Fiche œuvre complète', 'Date de création', 'Photos originales (privées)', 'Preuve pour œuvre importante'],
    helperText: 'Pour une œuvre importante : penser à un dépôt de preuve daté (e-Soleau / INPI). Voir docs/ip-protection-artist.md.',
    commonMistakes: ['Publier la HD complète', 'Oublier la date', 'Ne garder aucune preuve datée'],
  },
  {
    id: 'social',
    label: 'Réseaux sociaux',
    description: 'Préparer une publication à copier-coller (pas d’API).',
    requiredFields: ['Légende Instagram (brouillon)', 'Hashtags', 'Format conseillé'],
    helperText: 'Un brouillon de légende + des hashtags ; publication manuelle par l’artiste.',
    commonMistakes: ['Publier la HD', 'Légende trop longue', 'Oublier de créditer l’œuvre'],
  },
  {
    id: 'recap',
    label: 'Récapitulatif garde-fou',
    description: 'Vérifier avant de transmettre — validation humaine.',
    requiredFields: ['Champs manquants vérifiés', 'Validation humaine'],
    helperText: 'On relit, on coche, on copie le récapitulatif. Rien n’est publié automatiquement.',
    commonMistakes: ['Publier sans relire', 'Oublier l’alt text', 'Laisser un champ vide important'],
  },
];

/** Étiquettes de niveau de préparation (gamification douce). */
export const preparationLevels = [
  { id: 'draft', label: 'Brouillon', min: 0 },
  { id: 'almost', label: 'Presque prêt', min: 40 },
  { id: 'ready', label: 'Prêt à valider', min: 80 },
];

/** Badges encourageants (calculés côté client). */
export const workflowBadges = [
  { id: 'fiche', label: 'Fiche complète' },
  { id: 'image', label: 'Image prête' },
  { id: 'protection', label: 'Protection pensée' },
  { id: 'social', label: 'Publication préparée' },
  { id: 'sale', label: 'Vente douce prête' },
];

// =====================================================================
//  MINI-ASSISTANT « AJOUTER UNE ŒUVRE » EN 3 ÉTAPES (cockpit V1)
//  ---------------------------------------------------------------------
//  Version simple et guidée pour une artiste non technique. Le module
//  PRÉPARE seulement (aucune sauvegarde, aucun envoi). Aides très courtes.
// =====================================================================
export type AddArtworkStep = {
  id: string;
  n: string;
  label: string;
  /** Aide très courte (une phrase). */
  help: string;
  /** Champs à préparer pour l'étape (libellés humains). */
  fields: string[];
};

export const addArtworkSteps: AddArtworkStep[] = [
  {
    id: 'essentials',
    n: '1',
    label: 'Informations essentielles',
    help: 'L’identité de l’œuvre. Ne rien inventer : laisser vide si on ne sait pas.',
    fields: ['Titre', 'Série', 'Année', 'Dimensions', 'Technique', 'Support', 'Statut'],
  },
  {
    id: 'images',
    n: '2',
    label: 'Images & description',
    help: 'Une image web (compressée), la HD gardée à l’abri, et quelques mots.',
    fields: ['Image principale', 'Images détails', 'Description courte', 'Alt text', 'Version web compressée', 'HD privée conservée'],
  },
  {
    id: 'check',
    n: '3',
    label: 'Vérification avant ajout',
    help: 'On relit, on coche, on copie le résumé. Rien n’est publié automatiquement.',
    fields: ['Prix non inventé', 'Statut vérifié', 'Image web prête', 'HD conservée', 'Alt text descriptif', 'Validation humaine'],
  },
];

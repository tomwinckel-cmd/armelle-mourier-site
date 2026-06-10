// =====================================================================
//  FICHE ŒUVRE + PREUVE DE CRÉATION — modèle (prototype)
//  ---------------------------------------------------------------------
//  Aide Armelle à DOCUMENTER, PROTÉGER et ARCHIVER une œuvre en quelques
//  minutes : fiche complète, preuve de création, checklist image,
//  rappels de protection, bloc copiable.
//
//  ⚠️ Le cockpit ORGANISE et PRÉPARE. Il ne protège pas juridiquement à
//     lui seul, ne sauvegarde rien, ne téléverse rien, ne publie rien.
//     Aucun prix inventé · « Prix sur demande » par défaut · pas d'API.
//     Toute diffusion passe par une validation humaine.
// =====================================================================

export type ProofSection = {
  id: string;
  label: string;
  /** Champs à préparer pour cette partie de la fiche (libellés humains). */
  fields: string[];
  /** Aide courte, facultative. */
  note?: string;
};

export const artworkProof = {
  title: 'Fiche œuvre + preuve de création',
  intro:
    'Un dossier texte à compléter en quelques minutes pour documenter une œuvre, ' +
    'préparer sa protection et garder une trace datée — avant toute diffusion.',
  disclaimer:
    'Ceci n’est pas un avis juridique. C’est une aide pratique et prudente pour ' +
    'organiser ses preuves. Pour un cas important ou sensible (litige, contrat, ' +
    'cession de droits), consulter un professionnel (avocat / conseil en propriété ' +
    'intellectuelle).',

  /** Repères de propriété intellectuelle (prudents, non définitifs). */
  legalPoints: [
    'En France, le droit d’auteur naît automatiquement dès la création d’une œuvre originale : aucun dépôt n’est nécessaire pour être titulaire des droits.',
    'L’enjeu pratique n’est donc pas d’« acquérir » le droit, mais de pouvoir prouver une date et une paternité en cas de contestation.',
    'Pour une œuvre importante, envisager un dépôt daté / horodatage adapté — par exemple e-Soleau (INPI) ou un autre service de preuve datée.',
    'Ne pas publier les fichiers HD pleine résolution sans nécessité : mettre en ligne une version web compressée (filigrane léger possible).',
    'Conserver les originaux (photos HD privées) et les échanges importants (vente, exposition, prêt).',
  ],

  /** Parties de la fiche (rendu structuré dans le cockpit). */
  sections: [
    {
      id: 'identity',
      label: 'Fiche identité',
      fields: ['Titre', 'Série', 'Année'],
      note: 'Le minimum pour reconnaître l’œuvre.',
    },
    {
      id: 'description',
      label: 'Description',
      fields: ['Description courte', 'Mots-clés / ambiance'],
      note: 'Quelques mots justes, sans surenchère commerciale.',
    },
    {
      id: 'technical',
      label: 'Données techniques',
      fields: ['Dimensions', 'Technique', 'Support'],
      note: 'Dimensions exactes ou laisser vide — ne pas inventer.',
    },
    {
      id: 'images',
      label: 'Images à conserver',
      fields: ['HD originale (privée)', 'Version web compressée', 'Photos de détail', 'Alt text'],
      note: 'Garder la HD hors du site ; publier la version web.',
    },
    {
      id: 'proof',
      label: 'Preuve de création',
      fields: ['Date de création', 'Lieu de création', 'Preuve datée (e-Soleau / autre) si œuvre importante'],
      note: 'Une preuve datée aide à démontrer la paternité.',
    },
    {
      id: 'history',
      label: 'Historique',
      fields: ['Historique d’exposition', 'Échanges importants archivés'],
      note: 'Trace des expositions, prêts, ventes.',
    },
    {
      id: 'sale',
      label: 'Vente / statut',
      fields: ['Statut', 'Prix (sur demande par défaut)', 'Demande / acquéreur', 'Remise / logistique'],
      note: 'Vente douce : « Prix sur demande » tant que rien n’est validé.',
    },
    {
      id: 'web',
      label: 'Publication web',
      fields: ['Image web recommandée', 'Alt text', 'Notes de protection'],
      note: 'Version compressée uniquement ; alt text descriptif.',
    },
    {
      id: 'social',
      label: 'Réseaux sociaux',
      fields: ['Légende (brouillon)', 'Hashtags', 'Format conseillé'],
      note: 'Brouillon à copier-coller ; publication manuelle par l’artiste.',
    },
  ] as ProofSection[],
};

/** Recommandations pour la publication web (rappel protection). */
export const webPublicationTips = [
  'Publier une version web compressée, pas le fichier HD complet.',
  'Filigrane léger possible (discret, sans dénaturer l’œuvre).',
  'Alt text descriptif : décrire vraiment l’œuvre (accessibilité + SEO).',
  'Conserver la HD originale hors du site, en lieu sûr et privé.',
];

/** Checklist de protection (garde-fou — à cocher avant diffusion). */
export const protectionChecklist = [
  'Fiche œuvre complète',
  'Date renseignée',
  'HD conservée hors site',
  'Version web préparée',
  'Photos de détail conservées',
  'Preuve de création organisée',
  'Échanges importants archivés',
  'Statut de l’œuvre vérifié',
  'Aucun fichier HD publié sans nécessité',
  'Horodatage / dépôt envisagé si œuvre importante',
  'Validation humaine',
];

/** Badges encourageants (gamification douce, calculée côté client). */
export const proofBadges = [
  { id: 'fiche', label: 'Fiche complète' },
  { id: 'images', label: 'Images sécurisées' },
  { id: 'proof', label: 'Preuve organisée' },
  { id: 'web', label: 'Web maîtrisé' },
  { id: 'horodatage', label: 'Horodatage envisagé' },
];

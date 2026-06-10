// =====================================================================
//  CATALOGUE / DOSSIER COLLECTIONNEUR — modèle (prototype)
//  ---------------------------------------------------------------------
//  Aide Armelle à PRÉPARER une sélection d'œuvres à transmettre (dossier
//  clair, copiable, réutilisable) : collectionneur, galerie, exposition,
//  presse, ou catalogue des œuvres disponibles.
//
//  ⚠️ Le cockpit PRÉPARE des textes et des checklists. Il ne sauvegarde
//     rien, ne téléverse rien, ne génère PAS de PDF, ne connecte aucun
//     service externe, n'envoie rien. Aucun prix inventé · « Prix sur
//     demande » par défaut · ne jamais inclure de fichier HD complet.
//     Validation humaine obligatoire avant tout envoi.
// =====================================================================

export type CatalogType = {
  id: string;
  label: string;
  description: string;
  /** Champs utiles pour ce type de dossier (libellés humains). */
  fields: string[];
};

export const catalogTypes: CatalogType[] = [
  {
    id: 'collector',
    label: 'Sélection collectionneur',
    description: 'Quelques œuvres choisies pour une personne précise.',
    fields: ['Destinataire', 'Contexte', 'Œuvres sélectionnées', 'Message d’introduction', 'Conditions', 'Contact'],
  },
  {
    id: 'gallery',
    label: 'Dossier galerie',
    description: 'Présentation d’un ensemble cohérent pour une galerie.',
    fields: ['Galerie', 'Contexte', 'Série / ensemble', 'Œuvres', 'Démarche', 'Contact'],
  },
  {
    id: 'exhibition',
    label: 'Dossier exposition',
    description: 'Sélection pensée pour un lieu et un accrochage.',
    fields: ['Lieu', 'Dates', 'Œuvres', 'Scénographie / accrochage', 'Conditions de prêt', 'Contact'],
  },
  {
    id: 'press',
    label: 'Dossier presse',
    description: 'Éléments clairs pour un journaliste ou un média.',
    fields: ['Média / journaliste', 'Angle', 'Visuels web (compressés)', 'Biographie courte', 'Citations', 'Contact'],
  },
  {
    id: 'available',
    label: 'Catalogue œuvres disponibles',
    description: 'Vue d’ensemble des œuvres encore disponibles.',
    fields: ['Œuvres disponibles', 'Statuts', 'Dimensions', 'Technique', 'Prix sur demande', 'Contact'],
  },
];

/** Checklist de préparation (garde-fous images / prix / statuts). */
export const catalogChecklist = [
  'La sélection d’œuvres est claire et adaptée au destinataire.',
  'Les statuts sont vérifiés (disponible / réservée / vendue / sur demande).',
  'Aucun fichier HD complet n’est inclus — images web compressées uniquement.',
  'Aucun prix inventé : « Prix sur demande » si rien n’est validé.',
  'L’orthographe des titres et des séries est vérifiée.',
  'Les dimensions ne sont pas inventées (laisser vide si inconnues).',
  'Le message d’introduction est relu (ton juste, sans surenchère).',
  'Le contact est correct.',
  'La validation humaine est faite avant envoi.',
];

/** Modèles de message d'envoi (ton professionnel, humain, sobre). */
export type CatalogMessage = { id: string; label: string; body: string };

export const catalogMessages: CatalogMessage[] = [
  {
    id: 'collector',
    label: 'Envoi à un collectionneur',
    body:
      'Bonjour {destinataire},\n\n' +
      'Je me permets de vous adresser une sélection d’œuvres qui, je crois, ' +
      'pourrait faire écho à votre regard. Vous trouverez pour chacune ses ' +
      'informations principales ; je reste à votre disposition pour tout détail.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
  {
    id: 'gallery',
    label: 'Envoi à une galerie',
    body:
      'Bonjour,\n\n' +
      'Je vous transmets un dossier présentant un ensemble cohérent de mon travail, ' +
      'en vue d’un éventuel accrochage ou d’une collaboration. Je serais ravie ' +
      'd’échanger sur les œuvres et la démarche.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
  {
    id: 'exhibition',
    label: 'Envoi à un lieu d’exposition',
    body:
      'Bonjour,\n\n' +
      'Dans la perspective d’une exposition, je vous adresse une sélection d’œuvres ' +
      'et quelques éléments de scénographie. Je reste ouverte à adapter l’ensemble ' +
      'au lieu et à vos contraintes.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
  {
    id: 'reply',
    label: 'Réponse à une demande de catalogue',
    body:
      'Bonjour {destinataire},\n\n' +
      'Merci pour votre intérêt. Voici une sélection d’œuvres avec leurs informations. ' +
      'Dites-moi ce qui retient votre attention : je vous donnerai volontiers tous les détails.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
  {
    id: 'follow-up',
    label: 'Relance douce',
    body:
      'Bonjour {destinataire},\n\n' +
      'Je me permets un petit mot pour savoir si le dossier que je vous ai transmis a ' +
      'retenu votre attention. Sans aucune pression : je reste disponible si vous ' +
      'souhaitez en parler.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
];

/** Badges encourageants (gamification douce, calculée côté client). */
export const catalogBadges = [
  { id: 'selection', label: 'Sélection claire' },
  { id: 'status', label: 'Statuts vérifiés' },
  { id: 'images', label: 'Images prêtes' },
  { id: 'message', label: 'Message préparé' },
  { id: 'ready', label: 'Catalogue prêt à valider' },
];

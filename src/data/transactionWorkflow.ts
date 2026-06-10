// =====================================================================
//  APRÈS UNE DEMANDE D'ACQUISITION — modèle (prototype)
//  ---------------------------------------------------------------------
//  Aide Armelle et Tom à préparer la SUITE d'une demande d'acquisition :
//  informations client, réservation, BROUILLON de facture, logistique de
//  remise/livraison, preuve de remise, archivage.
//
//  ⚠️ Le cockpit PRÉPARE des textes et des checklists. Il ne sauvegarde
//     rien, ne téléverse rien, n'encaisse aucun paiement, ne fait pas de
//     comptabilité légale. Aucun prix inventé · « Prix sur demande » /
//     « à valider » par défaut. Toute facture est un BROUILLON à vérifier
//     humainement avant envoi. Pour la comptabilité : voir un professionnel.
// =====================================================================

export type TransactionSection = {
  id: string;
  label: string;
  description: string;
  /** Champs à préparer (libellés humains). */
  fields: string[];
  /** Points à cocher pour cette étape. */
  checklist: string[];
  /** Erreurs fréquentes à éviter. */
  commonMistakes: string[];
  /** Validation humaine requise avant d'agir ? (toujours vrai ici). */
  humanValidationRequired: boolean;
};

export const transactionWorkflow: TransactionSection[] = [
  {
    id: 'request',
    label: 'Demande client',
    description: 'Recueillir clairement la demande et les coordonnées utiles.',
    fields: ['Nom du client', 'E-mail', 'Objet (information / réservation / catalogue)', 'Message'],
    checklist: ['Demande comprise', 'Coordonnées confirmées', 'Objet identifié'],
    commonMistakes: ['Oublier de confirmer l’e-mail', 'Mal cerner la demande', 'Répondre trop tard'],
    humanValidationRequired: true,
  },
  {
    id: 'artwork',
    label: 'Œuvre concernée',
    description: 'Identifier précisément l’œuvre demandée.',
    fields: ['Titre', 'Série', 'Dimensions', 'Technique', 'Statut actuel'],
    checklist: ['Œuvre identifiée', 'Statut vérifié (disponible / réservée / vendue)', 'Fiche œuvre à jour'],
    commonMistakes: ['Confondre deux œuvres proches', 'Proposer une œuvre déjà vendue', 'Inventer des dimensions'],
    humanValidationRequired: true,
  },
  {
    id: 'reservation',
    label: 'Réservation',
    description: 'Poser une réservation claire, sans engagement de paiement en ligne.',
    fields: ['Œuvre réservée', 'Durée de réservation', 'Conditions', 'Date'],
    checklist: ['Réservation confirmée par écrit', 'Statut œuvre mis à « réservée »', 'Délai communiqué'],
    commonMistakes: ['Réserver sans confirmer par écrit', 'Oublier de changer le statut', 'Promettre un délai non tenable'],
    humanValidationRequired: true,
  },
  {
    id: 'invoice',
    label: 'Brouillon de facture',
    description: 'Préparer un BROUILLON de facture — jamais un document officiel définitif.',
    fields: ['Artiste', 'Client', 'Œuvre', 'Prix (à valider)', 'Numéro (à compléter)', 'Conditions'],
    checklist: ['Mentions à compléter listées', 'Prix validé par l’artiste', 'Document marqué « brouillon »'],
    commonMistakes: ['Inventer un prix', 'Générer un vrai numéro automatique', 'Envoyer sans relecture'],
    humanValidationRequired: true,
  },
  {
    id: 'payment',
    label: 'Paiement à définir',
    description: 'Le mode de paiement se définit hors ligne. Aucun encaissement ici.',
    fields: ['Mode de paiement (à définir)', 'Échéance', 'Statut (à régler / réglé)'],
    checklist: ['Mode de paiement choisi avec le client', 'Aucun lien de paiement dans le cockpit', 'Suivi noté'],
    commonMistakes: ['Afficher « payer maintenant »', 'Ajouter un lien Stripe/PayPal', 'Confondre brouillon et reçu'],
    humanValidationRequired: true,
  },
  {
    id: 'delivery',
    label: 'Remise / livraison',
    description: 'Organiser la remise : retrait atelier, livraison locale, transporteur à définir.',
    fields: ['Mode de remise', 'Adresse / lieu', 'Date prévue', 'Emballage', 'Assurance', 'Responsable'],
    checklist: ['Lieu et date confirmés', 'Emballage vérifié', 'Assurance évoquée si nécessaire'],
    commonMistakes: ['Partir sans emballage adapté', 'Oublier de confirmer l’adresse', 'Aucune trace de l’organisation'],
    humanValidationRequired: true,
  },
  {
    id: 'proof',
    label: 'Preuve de remise',
    description: 'Garder une trace de la remise (photos, état, confirmation).',
    fields: ['Photos avant départ', 'État de l’œuvre', 'Signature / confirmation', 'Date de remise'],
    checklist: ['Œuvre photographiée avant départ', 'État noté', 'Confirmation de remise obtenue'],
    commonMistakes: ['Ne pas photographier avant départ', 'Oublier la confirmation', 'Aucune note d’état'],
    humanValidationRequired: true,
  },
  {
    id: 'archive',
    label: 'Archivage',
    description: 'Classer la transaction au propre : fiche, brouillon, logistique, échanges.',
    fields: ['Dossier client', 'Brouillon de facture', 'Fiche logistique', 'Échanges importants'],
    checklist: ['Brouillon archivé', 'Fiche logistique archivée', 'Échanges importants conservés'],
    commonMistakes: ['Ne rien archiver', 'Disperser les documents', 'Perdre la trace des échanges'],
    humanValidationRequired: true,
  },
];

/** Checklist : avant d'envoyer une facture (brouillon). */
export const invoiceChecklist = [
  'Le prix est validé par l’artiste (jamais inventé).',
  'Le client et l’œuvre sont corrects.',
  'Le numéro de facture est à compléter (pas généré automatiquement).',
  'Le mode de paiement est à définir avec le client.',
  'Les mentions obligatoires sont à compléter / vérifier.',
  'Le document est marqué « brouillon — à vérifier avant envoi ».',
  'La comptabilité légale est confiée à un professionnel si nécessaire.',
  'La validation humaine est faite.',
];

/** Checklist : avant remise ou livraison. */
export const deliveryChecklist = [
  'L’œuvre est photographiée avant départ.',
  'L’emballage est vérifié.',
  'Les coordonnées sont confirmées.',
  'Le lieu et la date sont confirmés.',
  'L’état de l’œuvre est noté.',
  'Une preuve de remise est prévue.',
  'La facture / le brouillon est vérifié.',
  'La validation humaine est faite.',
];

/** Modèles de message client (ton humain, professionnel, chaleureux). */
export type MessageTemplate = { id: string; label: string; body: string };

export const messageTemplates: MessageTemplate[] = [
  {
    id: 'info',
    label: 'Réponse à une demande d’informations',
    body:
      'Bonjour {client},\n\n' +
      'Merci pour votre message et pour l’intérêt que vous portez à mon travail. ' +
      'L’œuvre « {oeuvre} » est {statut}. Je serais heureuse de vous en dire davantage : ' +
      'dimensions, technique, et conditions d’acquisition.\n\n' +
      'N’hésitez pas à me dire ce qui vous guiderait le mieux.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
  {
    id: 'reservation',
    label: 'Confirmation de réservation',
    body:
      'Bonjour {client},\n\n' +
      'Avec plaisir : je vous confirme la réservation de « {oeuvre} ». ' +
      'Je la garde pour vous le temps que nous précisions ensemble les détails ' +
      '(remise ou livraison, et modalités).\n\n' +
      'Je reste à votre écoute.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
  {
    id: 'delivery',
    label: 'Préparation remise / livraison',
    body:
      'Bonjour {client},\n\n' +
      'Pour organiser la remise de « {oeuvre} », pourriez-vous me préciser ce qui vous convient : ' +
      'un retrait à l’atelier, une remise locale, ou un envoi par transporteur (à définir) ? ' +
      'Je prépare l’œuvre avec soin et nous fixons ensemble un lieu et une date.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
  {
    id: 'coordinates',
    label: 'Demande de coordonnées',
    body:
      'Bonjour {client},\n\n' +
      'Afin de préparer la suite sereinement, pourriez-vous me communiquer les informations utiles ' +
      '(nom complet, adresse de remise si livraison, et le créneau qui vous arrange) ? ' +
      'Je m’occupe du reste.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
  {
    id: 'catalog',
    label: 'Envoi des informations / catalogue',
    body:
      'Bonjour {client},\n\n' +
      'Je vous transmets avec plaisir une sélection d’œuvres et leurs informations. ' +
      'Dites-moi ce qui retient votre regard : je vous donnerai volontiers tous les détails.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
];

/** Badges encourageants (gamification douce, calculée côté client). */
export const transactionBadges = [
  { id: 'request', label: 'Demande claire' },
  { id: 'invoice', label: 'Facture préparée' },
  { id: 'logistics', label: 'Logistique prête' },
  { id: 'delivery', label: 'Remise sécurisée' },
  { id: 'archive', label: 'Archive prévue' },
];

// =====================================================================
//  RÉPONDRE À UNE DEMANDE — mini-assistant (prototype, copier-coller)
//  ---------------------------------------------------------------------
//  Préparer une réponse claire, humaine et vérifiée à une demande entrante,
//  puis l'envoyer À LA MAIN. Aucun envoi automatique, aucune sauvegarde,
//  aucun CRM réel. Ton : humain, professionnel, sans pression, sobre,
//  chaleureux. Placeholders {contact}/{oeuvre} remplacés côté client.
// =====================================================================
export type RequestType = { id: string; label: string };

export const requestTypes: RequestType[] = [
  { id: 'info', label: 'Information sur une œuvre' },
  { id: 'reservation', label: 'Réservation' },
  { id: 'catalogue', label: 'Catalogue' },
  { id: 'exhibition', label: 'Exposition / résidence' },
  { id: 'press', label: 'Presse' },
  { id: 'commission', label: 'Commande spéciale' },
  { id: 'other', label: 'Autre' },
];

export type RequestResponse = { id: string; label: string; body: string };

export const requestResponses: RequestResponse[] = [
  {
    id: 'info',
    label: 'Information sur une œuvre',
    body:
      'Bonjour {contact},\n\n' +
      'Merci pour votre message et pour l’intérêt porté à « {oeuvre} ». Je vous transmets ' +
      'volontiers ses informations (dimensions, technique, disponibilité). L’acquisition se ' +
      'fait en lien direct avec moi — prix sur demande.\n\n' +
      'Dites-moi ce qui vous guiderait le mieux.\n\nBien à vous,\nArmelle Mourier',
  },
  {
    id: 'reservation',
    label: 'Réservation',
    body:
      'Bonjour {contact},\n\n' +
      'Avec plaisir : je peux réserver « {oeuvre} » pour vous, le temps que nous précisions ' +
      'ensemble les détails (remise ou livraison, modalités). Je vous confirme la réservation ' +
      'dès votre accord.\n\nBien à vous,\nArmelle Mourier',
  },
  {
    id: 'catalogue',
    label: 'Envoi catalogue',
    body:
      'Bonjour {contact},\n\n' +
      'Merci pour votre intérêt. Je vous adresse une sélection d’œuvres et leurs informations. ' +
      'Dites-moi ce qui retient votre regard : je vous donnerai volontiers tous les détails.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
  {
    id: 'exhibition',
    label: 'Proposition exposition / résidence',
    body:
      'Bonjour,\n\n' +
      'Merci pour votre proposition. Je serais ravie d’échanger autour d’une exposition ou d’une ' +
      'résidence — mon travail mêle la peinture, et parfois la poésie et la danse. Précisons ' +
      'ensemble le lieu, les dates et le cadre.\n\nBien à vous,\nArmelle Mourier',
  },
  {
    id: 'press',
    label: 'Presse',
    body:
      'Bonjour,\n\n' +
      'Merci pour votre intérêt. Je vous transmets volontiers des visuels web, une biographie ' +
      'courte et quelques éléments de démarche. Dites-moi l’angle et vos délais.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
  {
    id: 'commission',
    label: 'Commande spéciale',
    body:
      'Bonjour {contact},\n\n' +
      'Merci pour votre confiance. Une commande se construit dans l’échange : format, couleurs, ' +
      'intention, délai. Parlons-en pour voir ensemble ce qui est possible, sans engagement.\n\n' +
      'Bien à vous,\nArmelle Mourier',
  },
  {
    id: 'follow-up',
    label: 'Relance douce',
    body:
      'Bonjour {contact},\n\n' +
      'Un petit mot, sans aucune pression, pour savoir si ma précédente réponse vous convient ou ' +
      'si vous avez des questions. Je reste à votre disposition.\n\nBien à vous,\nArmelle Mourier',
  },
];

/** Statuts de suivi MANUEL (aucun CRM, aucune sauvegarde). */
export const requestStatuses = [
  'à répondre',
  'répondu',
  'en attente',
  'à relancer',
  'réservé',
  'clôturé',
];

/** Badges (gamification douce). */
export const requestBadges = [
  { id: 'identified', label: 'Demande identifiée' },
  { id: 'response', label: 'Réponse prête' },
  { id: 'pieces', label: 'Pièces vérifiées' },
  { id: 'status', label: 'Statut noté' },
  { id: 'followup', label: 'Suivi prévu' },
];

// =====================================================================
//  ASSISTANT RÉSEAUX SOCIAUX — préparation éditoriale (PAS d'API)
//  ---------------------------------------------------------------------
//  Objectif : aider Armelle à PRÉPARER ses publications (légende +
//  mots-clés + format conseillé), puis COPIER-COLLER vers Instagram.
//
//  ⚠️ Volontairement EXCLU pour l'instant :
//   • aucune API Instagram / Meta ; aucun token ; aucune publication
//     automatique ; aucun secret. Uniquement des modèles de texte.
//
//  Les placeholders {titre}, {serie}, {ville}, {date}, {lien} sont
//  remplacés à la main (ou par un futur cockpit) avant publication.
// =====================================================================

export type SocialFormat = {
  id: 'square' | 'portrait' | 'story';
  label: string;
  ratio: string;
  size: string; // indication de taille (px) pour préparer l'image
};

export type SocialTemplate = {
  id: string;
  label: string;        // type de publication, en clair
  description: string;
  format: SocialFormat['id'];
  caption: string;      // modèle de légende (FR) avec placeholders
  hashtags?: string[];  // mots-clés spécifiques (en plus des hashtags par défaut)
};

export const socialPublishing = {
  // Plateformes prévues (Facebook optionnel plus tard).
  platforms: ['instagram'] as const,
  facebookOptional: true,

  // Consigne affichée à l'artiste.
  instruction:
    'Choisissez une œuvre et un modèle, ajustez le texte, puis copiez-collez la légende et les mots-clés dans Instagram. Préparez l’image au format conseillé.',

  // Formats de publication conseillés.
  formats: [
    { id: 'square', label: 'Carré', ratio: '1:1', size: '1080 × 1080 px' },
    { id: 'portrait', label: 'Portrait', ratio: '4:5', size: '1080 × 1350 px' },
    { id: 'story', label: 'Story', ratio: '9:16', size: '1080 × 1920 px' },
  ] as SocialFormat[],

  // Mots-clés de base — modifiables.
  defaultHashtags: [
    '#ArmelleMourier',
    '#ArtistePeintre',
    '#PeintureContemporaine',
    '#ArtDijon',
    '#Bourgogne',
    '#Collioure',
    '#BleuCendres',
  ],

  // Modèles de publication (légendes en français, à ajuster).
  templates: [
    {
      id: 'new-artwork',
      label: 'Nouvelle œuvre',
      description: 'Présenter une toile qui sort de l’atelier.',
      format: 'portrait',
      caption:
        'Nouvelle toile : « {titre} »{serie}.\nLa couleur d’abord, puis la matière — peindre comme on respire.\nDécouvrir : {lien}',
      hashtags: ['#NouvelleŒuvre', '#AtelierDeLArtiste'],
    },
    {
      id: 'available-artwork',
      label: 'Œuvre disponible',
      description: 'Annoncer une œuvre que l’on peut acquérir (vente douce).',
      format: 'portrait',
      caption:
        '« {titre} » est disponible.\nAcquisition en lien direct avec l’artiste — prix sur demande.\nÉcrire pour les informations : {lien}',
      hashtags: ['#ŒuvreDisponible', '#ArtÀAcquérir'],
    },
    {
      id: 'exhibition',
      label: 'Exposition',
      description: 'Annoncer une exposition, une performance ou une date.',
      format: 'square',
      caption:
        'Rendez-vous : {titre}\n{date} — {ville}.\nAu plaisir de vous y rencontrer.\nInfos : {lien}',
      hashtags: ['#Exposition', '#ArtContemporain'],
    },
    {
      id: 'studio',
      label: 'Coulisse d’atelier',
      description: 'Un moment d’atelier : pigments, gestes, matière.',
      format: 'square',
      caption:
        'Dans l’atelier : pigments, couteaux, rouleaux, la matière qui se cherche.\nLe plaisir de peindre, simplement.',
      hashtags: ['#DansLAtelier', '#Pigments', '#MatièrePicturale'],
    },
    {
      id: 'bleu-cendres',
      label: 'Extrait Bleu Cendres',
      description: 'Faire dialoguer une toile et un mot du recueil.',
      format: 'portrait',
      caption:
        'Bleu Cendres — là où la peinture rencontre la poésie.\nBleus profonds, ors, paysages intérieurs.\nEn savoir plus : {lien}',
      hashtags: ['#BleuCendres', '#PeintureEtPoésie'],
    },
    {
      id: 'contact-reminder',
      label: 'Rappel contact / catalogue',
      description: 'Inviter à écrire ou à demander le catalogue.',
      format: 'square',
      caption:
        'Une œuvre vous touche ? Écrivez à l’artiste : acquisition, réservation, ou demande de catalogue.\nTout se fait dans l’échange : {lien}',
      hashtags: ['#ContactArtiste', '#Catalogue'],
    },
  ] as SocialTemplate[],

  // Champ FUTUR : export d'une image « prête à poster » — NON implémenté.
  imageExport: {
    enabled: false,
    note: 'Génération/export d’images sociales prévu plus tard (pas maintenant, pas d’API).',
  },
};

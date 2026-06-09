// =====================================================================
//  COCKPIT ARTISTE — schéma (PAS un vrai admin)
//  ---------------------------------------------------------------------
//  Ce fichier DÉCRIT, en langage humain, ce qu'Armelle pourra piloter
//  elle-même dans un futur cockpit. Il ne contient aucune logique
//  d'authentification ni de base de données : c'est une carte des
//  modules et des champs, pensée pour une personne NON développeuse.
//
//  But : un outil d'autonomie (modifier le site, gérer les œuvres,
//  préparer ses publications) — pas un back-office technique.
//
//  ⚠️ Aucun secret / token / clé / mot de passe ici (ni ailleurs dans le repo).
// =====================================================================

/** Type de champ — pensé « humain », pas « base de données ». */
export type CockpitFieldType =
  | 'text'        // une ligne
  | 'longtext'    // un paragraphe
  | 'image'       // un fichier image à déposer
  | 'images'      // plusieurs images
  | 'choice'      // un choix dans une liste
  | 'toggle'      // oui / non
  | 'date'        // une date
  | 'price'       // un prix (optionnel — sinon « Prix sur demande »)
  | 'color'       // une couleur
  | 'range';      // une intensité (curseur)

export type CockpitField = {
  id: string;
  label: string;        // libellé clair pour l'artiste
  type: CockpitFieldType;
  help?: string;        // phrase d'aide simple
  choices?: string[];   // pour 'choice'
  optional?: boolean;
  /** Où cette donnée vit aujourd'hui (pour les développeurs). */
  source?: string;
};

export type CockpitModule = {
  id: string;
  label: string;
  description: string;
  /** Actions simples proposées à l'artiste. */
  actions: string[];
  fields: CockpitField[];
};

export const cockpit = {
  version: '0.1',
  philosophy:
    'Un cockpit simple pour permettre à l’artiste de piloter son site sans dépendre du code.',
  // État de chaque module : ce qui est déjà éditable dans les fichiers de données.
  status: 'Étape 1 — fichiers de configuration éditables (pas encore d’interface).',
  modules: [
    {
      id: 'artworks',
      label: 'Œuvres',
      description: 'Ajouter, modifier et organiser les tableaux.',
      actions: ['Ajouter une œuvre', 'Modifier une œuvre', 'Mettre une photo', 'Réordonner'],
      fields: [
        { id: 'title', label: 'Titre', type: 'text', source: 'src/data/artworks.ts' },
        { id: 'image', label: 'Photo de l’œuvre', type: 'image', help: 'Sinon, un fragment d’atelier s’affiche.', source: 'public/images/artworks/' },
        { id: 'images', label: 'Photos secondaires', type: 'images', optional: true },
        { id: 'series', label: 'Série', type: 'text', optional: true, help: 'Ex. Bleu Cendres, Impressions…' },
        { id: 'technique', label: 'Technique', type: 'text', optional: true, help: 'Ex. Acrylique sur toile.' },
        { id: 'dimensions', label: 'Dimensions', type: 'text', optional: true, help: 'Ex. 60 × 73 cm. Laisser vide si inconnu — ne pas inventer.' },
        { id: 'year', label: 'Année', type: 'text', optional: true },
        { id: 'description', label: 'Quelques mots', type: 'longtext', optional: true },
        { id: 'alt', label: 'Description de l’image', type: 'text', help: 'Pour l’accessibilité : décrire la toile en une phrase.' },
        { id: 'price', label: 'Prix', type: 'price', optional: true, help: 'Laisser vide = « Prix sur demande ». Ne pas inventer de prix.' },
        { id: 'featured', label: 'Mettre en avant sur l’accueil', type: 'toggle' },
      ],
    },
    {
      id: 'availability',
      label: 'Disponibilités',
      description: 'Choisir quelles œuvres sont disponibles, réservées ou vendues.',
      actions: ['Marquer disponible', 'Marquer réservée', 'Marquer vendue', 'Retirer de la sélection'],
      fields: [
        { id: 'status', label: 'Statut de l’œuvre', type: 'choice', choices: ['Disponible', 'Réservée', 'Vendue', 'Sur demande'], source: 'src/data/artworks.ts' },
        { id: 'showInAvailable', label: 'Afficher sur « Tableaux disponibles »', type: 'toggle', help: 'Sinon, déduit du statut.' },
      ],
    },
    {
      id: 'pages',
      label: 'Pages',
      description: 'Modifier les textes principaux du site.',
      actions: ['Modifier l’accroche', 'Modifier une page', 'Modifier la biographie'],
      fields: [
        { id: 'manifesto', label: 'Phrase d’accroche (accueil)', type: 'text', source: 'src/data/site.ts' },
        { id: 'home', label: 'Textes de l’accueil', type: 'longtext', source: 'src/content/pages.ts' },
        { id: 'oeuvres', label: 'Introduction de la galerie', type: 'longtext', source: 'src/content/pages.ts' },
        { id: 'bio', label: 'Biographie', type: 'longtext', source: 'src/content/bio.ts' },
        { id: 'demarche', label: 'Démarche', type: 'longtext', source: 'src/content/bio.ts' },
        { id: 'bleuCendres', label: 'Bleu Cendres', type: 'longtext', source: 'src/content/bio.ts' },
      ],
    },
    {
      id: 'exhibitions',
      label: 'Expositions',
      description: 'Ajouter une exposition ou une date à venir.',
      actions: ['Ajouter une date', 'Modifier une exposition'],
      fields: [
        { id: 'title', label: 'Titre / événement', type: 'text', source: 'src/data/exhibitions.ts' },
        { id: 'dateLabel', label: 'Date (texte affiché)', type: 'text', help: 'Ex. « Juin 2025 ».' },
        { id: 'startDate', label: 'Date de début', type: 'date', optional: true },
        { id: 'location', label: 'Lieu', type: 'text', optional: true },
        { id: 'city', label: 'Ville', type: 'text', optional: true },
        { id: 'type', label: 'Type', type: 'choice', choices: ['Personnelle', 'Collective', 'Résidence', 'Performance', 'Événement'] },
      ],
    },
    {
      id: 'social',
      label: 'Réseaux sociaux',
      description: 'Préparer des publications Instagram à partir des œuvres.',
      actions: ['Choisir une œuvre', 'Choisir un modèle', 'Copier la légende', 'Coller dans Instagram'],
      fields: [
        { id: 'postType', label: 'Type de publication', type: 'choice', choices: ['Nouvelle œuvre', 'Œuvre disponible', 'Exposition', 'Coulisse d’atelier', 'Extrait Bleu Cendres', 'Rappel contact / catalogue'], source: 'src/data/social.ts' },
        { id: 'format', label: 'Format', type: 'choice', choices: ['Carré 1:1', 'Portrait 4:5', 'Story 9:16'] },
        { id: 'caption', label: 'Légende', type: 'longtext', help: 'Modèle pré-rempli, à ajuster avant de copier.' },
        { id: 'hashtags', label: 'Mots-clés (#)', type: 'longtext' },
      ],
    },
    {
      id: 'theme',
      label: 'Ambiance visuelle',
      description: 'Ajuster quelques couleurs et intensités sans casser le design.',
      actions: ['Changer une couleur', 'Régler une intensité'],
      fields: [
        { id: 'bluePigment', label: 'Bleu pigment', type: 'color', source: 'src/data/theme.ts' },
        { id: 'ochreGold', label: 'Ocre / or', type: 'color', source: 'src/data/theme.ts' },
        { id: 'paper', label: 'Papier (fond)', type: 'color', source: 'src/data/theme.ts' },
        { id: 'goldTraceOpacity', label: 'Présence de l’or', type: 'range', help: 'Plus ou moins de trace dorée.' },
        { id: 'paperTexture', label: 'Matière du papier', type: 'range' },
      ],
    },
  ] as CockpitModule[],
};

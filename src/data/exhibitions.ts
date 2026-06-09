// =====================================================================
//  EXPOSITIONS, RÉSIDENCES & PERFORMANCES
//  ---------------------------------------------------------------------
//  Pour AJOUTER une date à venir : copiez un bloc, mettez une startDate
//  au format 'AAAA-MM-JJ'. Les dates futures apparaissent automatiquement
//  dans « À venir » ; les dates passées dans la chronologie.
// =====================================================================

export type ExhibitionType = 'solo' | 'group' | 'residence' | 'performance' | 'event';

export type Exhibition = {
  id: string;
  title: string;
  location?: string;
  city?: string;
  startDate?: string; // 'AAAA-MM-JJ' ou 'AAAA-MM' — sert au tri et au SEO
  endDate?: string;
  dateLabel: string; // texte affiché (souple, ex. « Mars → mai 2022 »)
  year: number;
  type?: ExhibitionType;
  description?: string;
};

export const exhibitions: Exhibition[] = [
  // ---------------- 2025 ----------------
  {
    id: '2025-au-fil-de-louche',
    title: 'Au fil de l’Ouche — 2ᵉ édition',
    location: 'Au bord de l’eau, en collaboration avec quinze artistes',
    city: 'Neuilly-lès-Dijon',
    startDate: '2025-09-07',
    dateLabel: '7 septembre 2025',
    year: 2025,
    type: 'group',
    description:
      'Exposition au bord de l’eau organisée par Armelle Mourier en tant que présidente de l’association ArtDi : art abstrait, tissage, céramique, bijoux, crochet, barbotine, photographie, osier, cyanotypie. Accompagnement musical du Duo Déca.',
  },
  {
    id: '2025-cote-cour-cote-jardin',
    title: 'Côté Cour et Côté Jardin — 3ᵉ édition',
    location: 'Montorge, en collaboration avec Alain Hannecart et Gaëtan Hannecart',
    city: 'Montagny-lès-Buxy (71)',
    startDate: '2025-08-23',
    dateLabel: '23 août 2025',
    year: 2025,
    type: 'group',
    description:
      'Exposition familiale avec Alain Hannecart (artiste peintre) et Gaëtan Hannecart (créateur de lampes en bois flotté), avec des installations dans le cadre du jardin.',
  },
  {
    id: '2025-balade-en-bleu',
    title: 'Balade en Bleu',
    location: 'Médiathèque de Chevigny-Saint-Sauveur',
    city: 'Chevigny-Saint-Sauveur',
    startDate: '2025-03-19',
    endDate: '2025-04-06',
    dateLabel: '19 mars → 6 avril 2025',
    year: 2025,
    type: 'solo',
    description:
      'Installation immersive : trois tentes de 2,20 m à 2,40 m de hauteur, étoiles de mer géantes, vagues, sable. Ateliers poésie avec les adultes et les étudiants du CIEF, ateliers land art et peinture sur galets avec les enfants du centre de loisirs.',
  },

  // ---------------- 2024 ----------------
  {
    id: '2024-musee-arts-table',
    title: 'Musée des Arts de la table',
    location: 'Musée des Arts de la table',
    city: 'Arnay-le-Duc',
    startDate: '2024-12',
    dateLabel: 'Décembre 2024',
    year: 2024,
    type: 'group',
  },
  {
    id: '2024-hotel-de-vogue',
    title: 'Hôtel de Vogüé',
    location: 'En collaboration avec l’Atelier des Noyers',
    city: 'Dijon',
    startDate: '2024-12-16',
    endDate: '2024-12-22',
    dateLabel: '16 → 22 décembre 2024',
    year: 2024,
    type: 'group',
  },
  {
    id: '2024-chapelle-oratoire',
    title: 'Exposition caritative — Chapelle de l’Oratoire',
    location: 'Chapelle de l’Oratoire, au profit du Collectif Odyssée Beaune',
    startDate: '2024-11-29',
    endDate: '2024-12-01',
    dateLabel: '29, 30 novembre & 1ᵉʳ décembre 2024',
    year: 2024,
    type: 'event',
  },
  {
    id: '2024-icare',
    title: 'Icare à 38 ans et plus',
    location: 'Théâtre de la Fontaine d’Ouche, chorégraphie de Miradi Koko',
    city: 'Dijon',
    startDate: '2024-11-09',
    dateLabel: '9 novembre 2024',
    year: 2024,
    type: 'performance',
    description: 'Spectacle de danse-théâtre.',
  },
  {
    id: '2024-etrange-etrangete',
    title: 'Étrange étrangeté',
    location: 'La Coupole, 1 rue Sainte-Anne — partenariat Nord/Sud Bourgogne–Mali',
    city: 'Dijon',
    startDate: '2024-09-17',
    endDate: '2024-09-29',
    dateLabel: '17 → 29 septembre 2024',
    year: 2024,
    type: 'group',
    description: 'Exposition collective.',
  },
  {
    id: '2024-au-fil-de-louche',
    title: 'Au fil de l’Ouche',
    location: 'Au bord de l’eau, avec l’association ArtDi (dix artistes)',
    city: 'Neuilly-lès-Dijon',
    startDate: '2024-09-08',
    dateLabel: '8 septembre 2024',
    year: 2024,
    type: 'group',
    description:
      'Avec dix artistes (tissage, céramique, bijoux, lampes, barbotine, photographie, osier). Déambulation dansée sur la lecture de poésies, accompagnée d’une saxophoniste.',
  },
  {
    id: '2024-cote-cour-cote-jardin',
    title: 'Côté Cour et Côté Jardin — 2ᵉ édition',
    location: 'Montorge, avec Alain Hannecart et Gaëtan Hannecart',
    city: 'Montagny-lès-Buxy (71)',
    startDate: '2024-08-24',
    dateLabel: '24 août 2024',
    year: 2024,
    type: 'group',
  },
  {
    id: '2024-residence-sennecey-2',
    title: 'Résidence à Sennecey-lès-Dijon',
    location: 'Travail en parallèle avec le centre de loisirs, suivi d’une restitution',
    city: 'Sennecey-lès-Dijon',
    startDate: '2024-04',
    endDate: '2024-06',
    dateLabel: 'Avril → juin 2024',
    year: 2024,
    type: 'residence',
  },
  {
    id: '2024-residence-trait-bleu',
    title: 'Résidence — projet « Trait Bleu »',
    location: 'Projet intergénérationnel autour des œuvres d’Armelle Mourier',
    city: 'Sennecey-lès-Dijon',
    startDate: '2024-03',
    endDate: '2024-04',
    dateLabel: 'Mars → avril 2024',
    year: 2024,
    type: 'residence',
    description:
      'Projet intergénérationnel mêlant poésie et peinture, autour des œuvres dorées et bleues issues du recueil Bleu Cendres.',
  },
  {
    id: '2024-bleu-cendres-sortie',
    title: 'Sortie du recueil « Bleu Cendres »',
    location: 'Éditions L’Atelier des Noyers, avec l’éditrice Claire Delbard',
    startDate: '2024-03',
    dateLabel: 'Mars 2024',
    year: 2024,
    type: 'event',
    description:
      'Recueil où les tableaux d’Armelle Mourier sont associés aux poèmes de Louise Dupré, poétesse et philosophe québécoise.',
  },
  {
    id: '2024-lecture-dansee',
    title: 'Lecture dansée — Nuit de la lecture',
    location: 'Médi@lude de Saint-Apollinaire, avec ArtDi et Perspective de la danse',
    city: 'Saint-Apollinaire',
    startDate: '2024-01-19',
    dateLabel: '19 janvier 2024',
    year: 2024,
    type: 'performance',
    description:
      'Chorégraphies en collaboration avec l’association ArtDi et Perspective de la danse (danseurs : Mijo Gros, Annick Augros, Alain Badier, Vincent Bouillet, Pascale Denis et Armelle Mourier). Année de la création de l’association ArtDi.',
  },

  // ---------------- 2023 ----------------
  {
    id: '2023-besancon-micropolis',
    title: 'Exposition collective — Micropolis',
    location: 'Parc des expositions Micropolis',
    city: 'Besançon (25)',
    startDate: '2023-12-09',
    dateLabel: '9 décembre 2023',
    year: 2023,
    type: 'group',
  },
  {
    id: '2023-atelier-pagina',
    title: 'Atelier Pagina',
    location: '7 rue Berlier',
    city: 'Dijon',
    startDate: '2023-11-14',
    endDate: '2023-11-30',
    dateLabel: '14 → 30 novembre 2023',
    year: 2023,
    type: 'solo',
  },
  {
    id: '2023-halles-de-beaune',
    title: 'Halles de Beaune',
    city: 'Beaune',
    startDate: '2023-11-04',
    endDate: '2023-11-05',
    dateLabel: '4 & 5 novembre 2023',
    year: 2023,
    type: 'event',
  },
  {
    id: '2023-journee-des-artistes',
    title: 'Journée des artistes — 4ᵉ édition',
    location: 'Quais de Saône, association Les Zartistes — démonstration à 4 mains avec Alain Hannecart',
    city: 'Seurre',
    startDate: '2023-08-27',
    dateLabel: '27 août 2023',
    year: 2023,
    type: 'group',
  },
  {
    id: '2023-cote-cour-cote-jardin',
    title: 'Côté cour, côté jardin',
    location: '3 rue de Collonge, Montorge, avec Alain Hannecart et Gaëtan Hannecart (bois flotté)',
    city: 'Montagny-lès-Buxy',
    startDate: '2023-08-26',
    dateLabel: '26 août 2023',
    year: 2023,
    type: 'group',
  },
  {
    id: '2023-performance-bodega',
    title: 'Performance peinture & danse — « Sous le soleil de Bodéga »',
    startDate: '2023-07-20',
    dateLabel: '20 juillet 2023',
    year: 2023,
    type: 'performance',
    description: 'Création en direct du tableau « Sous le soleil de Bodéga ».',
  },
  {
    id: '2023-ille-sur-tet',
    title: 'Côté cour, côté jardin',
    location: 'Rue Joffre',
    city: 'Ille-sur-Têt (66)',
    startDate: '2023-07-12',
    endDate: '2023-07-15',
    dateLabel: '12 → 15 juillet 2023',
    year: 2023,
    type: 'group',
  },
  {
    id: '2023-galerie-bdmc',
    title: 'Galerie BDMC',
    location: 'Quartier des antiquaires (15ᵉ), 12 rue Alasseur',
    city: 'Paris (75)',
    startDate: '2023-05-26',
    endDate: '2023-06-26',
    dateLabel: '26 mai → 26 juin 2023',
    year: 2023,
    type: 'solo',
  },
  {
    id: '2023-espace-bien-etre',
    title: 'Salon Espace Bien-être',
    location: '12 rue Georges Lavier',
    city: 'Dijon',
    startDate: '2023-02',
    endDate: '2023-05',
    dateLabel: 'Février → mai 2023',
    year: 2023,
    type: 'solo',
  },

  // ---------------- 2022 ----------------
  {
    id: '2022-moulin-hauterive',
    title: 'Moulin d’Hauterive — hôtel 3 étoiles',
    city: 'Saint-Gervais-en-Vallière (71)',
    startDate: '2022-12',
    dateLabel: 'Décembre 2022',
    year: 2022,
    type: 'solo',
  },
  {
    id: '2022-divio',
    title: 'DIVIO, centre de rééducation',
    location: 'Et quelques toiles au restaurant « L’un des Sens », rue Jeannin',
    city: 'Dijon',
    startDate: '2022-09',
    dateLabel: 'Septembre 2022',
    year: 2022,
    type: 'solo',
  },
  {
    id: '2022-buxy-larome',
    title: 'Cave des vignerons de Buxy & restaurant « L’Arôme »',
    location: 'Cave des vignerons de Buxy (71) et restaurant « L’Arôme », rue Jean-Jacques Rousseau',
    city: 'Buxy / Dijon',
    startDate: '2022-07',
    endDate: '2022-08',
    dateLabel: 'Mi-juillet → fin août 2022',
    year: 2022,
    type: 'solo',
  },
  {
    id: '2022-mediatheque-sennecey',
    title: 'Médiathèque de Sennecey-lès-Dijon',
    city: 'Sennecey-lès-Dijon',
    startDate: '2022-06',
    endDate: '2022-07',
    dateLabel: 'Juin → mi-juillet 2022',
    year: 2022,
    type: 'solo',
  },
  {
    id: '2022-couleur-des-sentiments',
    title: 'La couleur des sentiments',
    location: 'CGFL (Centre Georges-François Leclerc)',
    city: 'Dijon (21)',
    startDate: '2022-03',
    endDate: '2022-05',
    dateLabel: 'Mars → mai 2022',
    year: 2022,
    type: 'solo',
    description: 'Première grande exposition personnelle.',
  },
];

// ---------- Aides ----------
function dateValue(e: Exhibition): number {
  const d = e.startDate ?? `${e.year}-01`;
  return new Date(d.length === 7 ? `${d}-01` : d).getTime();
}

export const exhibitionsByDateDesc = [...exhibitions].sort((a, b) => dateValue(b) - dateValue(a));

export function splitExhibitions(now: Date = new Date()) {
  const t = now.getTime();
  const upcoming = exhibitionsByDateDesc
    .filter((e) => dateValue(e) >= t)
    .sort((a, b) => dateValue(a) - dateValue(b));
  const past = exhibitionsByDateDesc.filter((e) => dateValue(e) < t);
  return { upcoming, past };
}

export const exhibitionYears = Array.from(new Set(exhibitions.map((e) => e.year))).sort(
  (a, b) => b - a
);

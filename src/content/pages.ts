// =====================================================================
//  TEXTES ÉDITORIAUX DES PAGES (modifiables sans toucher aux composants)
//  ---------------------------------------------------------------------
//  Cockpit-ready : on centralise ici le « récit » des pages dont le texte
//  était auparavant codé en dur (accueil, œuvres). Les pages biographie,
//  démarche et Bleu Cendres tirent déjà leur contenu de src/content/bio.ts.
//  ⚠️ Ne rien inventer : ces textes encadrent l'univers réel de l'artiste
//  (couleur, matière, Collioure, Bourgogne, séries existantes).
// =====================================================================

export const pages = {
  // ----- ACCUEIL : un parcours, pas une landing -----
  home: {
    // B — Signature d'univers : qui elle est / ce qu'elle peint, en un regard.
    universe: {
      eyebrow: 'L’univers',
      title: 'La couleur, d’abord',
      text:
        'Née d’une nécessité vitale, sa peinture pose la couleur et la matière comme on pose le souffle. Des bleus profonds, des ors, la lumière de Collioure et la terre de Bourgogne : l’abstraction laisse affleurer la mémoire des lieux — et la joie d’être en vie.',
      // Mots d'atelier (concrets, pas des slogans).
      signs: [
        'Couleur & matière',
        'Bleus profonds & or',
        'Acrylique, pigments, couteau',
        'Toile recyclée',
        'Collioure · Bourgogne',
        'Peindre comme on respire',
      ],
    },
    // C — Entrées principales : trois portes pour entrer dans l'œuvre.
    doors: {
      eyebrow: 'Par où entrer',
      title: 'Trois portes vers l’atelier',
      items: [
        { index: '01', label: 'Explorer les œuvres', note: 'La galerie complète : séries, formats, matières.', href: '/oeuvres', cta: 'Voir la galerie' },
        { index: '02', label: 'Tableaux disponibles', note: 'La sélection d’atelier à découvrir ou à réserver.', href: '/disponibles', cta: 'Voir les disponibles' },
        { index: '03', label: 'Biographie & démarche', note: 'Le parcours, les lieux, la matière et le geste.', href: '/biographie', cta: 'Lire l’histoire' },
      ],
    },
    gallery: {
      eyebrow: 'Entrer dans l’atelier',
      title: 'Œuvres mises en lumière',
      lead:
        'Une première traversée : la couleur d’abord, puis la matière et la mémoire des lieux — la lumière de Collioure, la terre de Bourgogne. Peindre, ici, comme on respire.',
      more: 'Voir toute la galerie',
    },
    sale: {
      eyebrow: 'Sélection d’atelier',
      title: 'Tableaux disponibles',
      text:
        'Certaines œuvres quittent l’atelier. L’acquisition reste une conversation, en lien direct avec l’artiste — jamais un panier, jamais une vitrine.',
      cta: 'Voir les tableaux disponibles',
    },
    bleu: {
      eyebrow: 'Livre & poésie',
      title: 'Bleu Cendres',
      text:
        'Un recueil où les bleus profonds et les ors d’Armelle Mourier dialoguent avec les poèmes de Louise Dupré — des paysages intérieurs partagés entre peinture et écriture.',
      cta: 'Entrer dans Bleu Cendres',
    },
    exhib: {
      eyebrow: 'Présence',
      title: 'Expositions & rencontres',
      lead:
        'Une chronologie vivante : expositions, performances, résidences et rencontres, entre la Bourgogne, Paris et Collioure.',
      cta: 'Voir la chronologie',
    },
    // F — Contact doux : une invitation simple, en lien direct avec l'artiste.
    closing: {
      eyebrow: 'Écrire à l’artiste',
      title: 'Une œuvre, une exposition, une rencontre',
      text:
        'L’acquisition reste une conversation, en lien direct avec l’artiste — jamais un panier, jamais une vitrine. Pour une œuvre, une exposition, un catalogue, ou simplement pour parler peinture : la porte de l’atelier est ouverte.',
      // Intentions claires (le visiteur sait pourquoi écrire).
      intents: ['Acquérir une œuvre', 'Proposer une exposition', 'Demander le catalogue', 'Rencontrer l’artiste'],
      links: [
        { label: 'Écrire à l’artiste', href: '/contact' },
        { label: 'Lire la biographie', href: '/biographie' },
      ],
    },
  },

  // ----- ŒUVRES : une galerie / un carnet de séries -----
  oeuvres: {
    eyebrow: 'Le portfolio',
    title: 'Les œuvres',
    intro:
      'Une peinture de la couleur et de la matière, le plus souvent à l’acrylique, sur toile recyclée, achetée ou créée. Du grand format — jusqu’à 2,50 × 1,10 m — au plus petit, chaque toile naît d’un même élan : coucher l’émotion, transmettre la joie d’être en vie.',
    seriesNote:
      'Les toiles se regroupent en séries — Bleu Cendres, Impressions, Performances — où la couleur cherche, à chaque fois, son paysage intérieur.',
    filterNote: 'Filtrez par série ou par disponibilité pour parcourir l’atelier.',
    pendingNote:
      'Les visuels haute définition seront ajoutés prochainement ; un fragment d’attente s’affiche en attendant. Pour le prix ou la disponibilité d’une œuvre, écrivez directement à l’artiste.',
  },
};

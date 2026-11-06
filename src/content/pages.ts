// =====================================================================
//  TEXTES ÉDITORIAUX DES PAGES (accueil, œuvres)
//  ---------------------------------------------------------------------
//  SOURCE DE VÉRITÉ : src/content/textes/accueil.json et oeuvres.json,
//  éditables depuis l'admin (/admin → Textes des pages) ou à la main.
//  Les pages biographie, démarche et Bleu Cendres lisent src/content/bio.ts.
//  ⚠️ Ne rien inventer : ces textes encadrent l'univers réel de l'artiste.
// =====================================================================
import accueil from './textes/accueil.json';
import oeuvres from './textes/oeuvres.json';

// Dans le fichier, les notes de séries sont une liste { series, note }
// (plus simple à éditer) ; les pages les lisent comme un dictionnaire.
const seriesNotes: Record<string, string> = Object.fromEntries(
  oeuvres.seriesNotes
    .filter((s) => s.series && s.series.trim())
    .map((s): [string, string] => [s.series.trim(), s.note ?? '']),
);

export const pages = {
  home: accueil,
  oeuvres: { ...oeuvres, seriesNotes },
};

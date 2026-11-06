// =====================================================================
//  CONTENUS RÉDACTIONNELS — Biographie, démarche et Bleu Cendres
//  ---------------------------------------------------------------------
//  SOURCE DE VÉRITÉ : les fichiers JSON de src/content/textes/
//    biographie.json · demarche.json · bleu-cendres.json
//  Éditables depuis l'admin (/admin → Textes des pages) ou à la main.
//  Textes restructurés à partir des mots de l'artiste, sans rien inventer.
//  Ce module ne fait que les exposer aux pages (aucun texte ici).
// =====================================================================
import bioData from './textes/biographie.json';
import demarcheData from './textes/demarche.json';
import bleuCendresData from './textes/bleu-cendres.json';

export const bio = bioData;
export const demarche = demarcheData;
export const bleuCendres = bleuCendresData;

// =====================================================================
//  EXPOSITIONS, RÉSIDENCES & PERFORMANCES — base éditable
//  ---------------------------------------------------------------------
//  SOURCE DE VÉRITÉ : un fichier JSON par exposition dans
//    src/data/exhibitions/<id>.json
//  Éditable depuis l'admin (/admin → Expositions) ou à la main.
//
//  Les dates futures apparaissent automatiquement dans « À venir » ;
//  les dates passées dans la chronologie.
//  - startDate / endDate : 'AAAA-MM-JJ' ou 'AAAA-MM' (jour inconnu).
//  - dateLabel (texte affiché) : facultatif — s'il est vide, il est
//    généré à partir des dates (ex. « 19 mars → 6 avril 2025 »).
//  - year : facultatif — déduit de startDate s'il est vide.
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

// ---------------------------------------------------------------------
//  CHARGEMENT
// ---------------------------------------------------------------------
const modules = import.meta.glob('./exhibitions/*.json', { eager: true, import: 'default' });

const TYPES: ExhibitionType[] = ['solo', 'group', 'residence', 'performance', 'event'];
const MONTHS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

/** Chaîne non vide, sinon undefined (un champ vide = « non renseigné »). */
function str(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined;
}

/** 'AAAA-MM-JJ' → « 7 septembre 2025 » ; 'AAAA-MM' → « septembre 2025 ». */
function formatDate(d: string, withYear = true): string {
  const [y, m, day] = d.split('-');
  const month = MONTHS[Number(m) - 1] ?? '';
  const parts = [day ? String(Number(day)) : '', month, withYear ? y : ''].filter(Boolean);
  return parts.join(' ');
}

/** Libellé lisible généré à partir des dates (utilisé si dateLabel est vide). */
function labelFromDates(start?: string, end?: string): string {
  if (!start) return '';
  if (!end || end === start) {
    const label = formatDate(start);
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
  const sameYear = start.slice(0, 4) === end.slice(0, 4);
  const sameMonth = sameYear && start.slice(0, 7) === end.slice(0, 7);
  const startDay = start.split('-')[2];
  // « 16 → 22 décembre 2024 » si même mois, sinon « 19 mars → 6 avril 2025 »
  const from = sameMonth && startDay ? String(Number(startDay)) : formatDate(start, !sameYear);
  const label = `${from} → ${formatDate(end)}`;
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/** Normalise un objet JSON brut en Exhibition typée (vides → undefined). */
function toExhibition(raw: Record<string, unknown>, file: string): Exhibition {
  const startDate = str(raw.startDate);
  const endDate = str(raw.endDate);
  const type = str(raw.type);
  const year =
    typeof raw.year === 'number' && raw.year > 0
      ? raw.year
      : Number((startDate ?? '').slice(0, 4)) || new Date().getFullYear();
  return {
    id: str(raw.id) ?? file,
    title: String(raw.title ?? ''),
    location: str(raw.location),
    city: str(raw.city),
    startDate,
    endDate,
    dateLabel: str(raw.dateLabel) ?? labelFromDates(startDate, endDate),
    year,
    type: TYPES.includes(type as ExhibitionType) ? (type as ExhibitionType) : undefined,
    description: str(raw.description),
  };
}

function fileId(p: string): string {
  return p.split('/').pop()!.replace(/\.json$/, '');
}

// ---------- Aides ----------
function dateValue(e: Exhibition): number {
  const d = e.startDate ?? `${e.year}-01`;
  return new Date(d.length === 7 ? `${d}-01` : d).getTime();
}
function endValue(e: Exhibition): number {
  const d = e.endDate ?? e.startDate ?? `${e.year}-01`;
  return new Date(d.length === 7 ? `${d}-01` : d).getTime();
}

/** Ordre de référence : la plus récente d'abord ; à date de début égale,
 *  celle qui se termine le plus tard d'abord, puis par identifiant. */
export const exhibitions: Exhibition[] = Object.entries(modules)
  .map(([p, raw]) => toExhibition(raw as Record<string, unknown>, fileId(p)))
  .sort((a, b) => dateValue(b) - dateValue(a) || endValue(b) - endValue(a) || a.id.localeCompare(b.id));

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

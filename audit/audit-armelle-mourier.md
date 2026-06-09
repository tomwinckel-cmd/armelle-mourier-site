# Audit & stratégie — Site d'Armelle Mourier

**Artiste peintre & plasticienne**
Site audité : `https://armellemourier02.wixsite.com/armellemourier`
Date de l'audit : juin 2026

> Méthode : analyse des pages réellement servies (accueil, bio, portfolio, Bleu Cendres,
> « la couleur des sentiments », contact). Les galeries Wix étant rendues en JavaScript,
> certaines listes d'œuvres ne sont pas inspectables à distance ; les constats portent sur
> la structure, le code livré, les métadonnées et le contenu accessible.

---

## 1. Diagnostic synthétique

Le site **contient une vraie matière artistique et humaine** — une biographie sincère et
poétique, un parcours d'expositions dense et crédible (2022 → 2025), un univers reconnaissable
(Collioure, Bourgogne, danse, poésie, la série *Bleu Cendres*). **Le problème n'est pas le fond,
c'est l'emballage.** Le site souffre de trois maux qui sabotent une matière de qualité :

1. **Des résidus de gabarit Wix non personnalisés** qui détruisent la crédibilité. La page
   *« Bleu Cendres — Tableaux originaux »* repose sur un modèle d'entreprise jamais nettoyé :
   des tableaux y portent des intitulés de postes (« Directrice technique », « Responsable RH »,
   « Responsable produit ») et la page affiche une fausse section *« Nos clients »* avec des logos
   de démonstration. C'est l'erreur la plus grave du site.
2. **Une bannière publicitaire Wix** (« Ce site a été créé sur Wix ») et le marquage Wix visibles
   sur chaque page : pour un site qui doit inspirer assez de confiance pour vendre une œuvre
   originale, c'est disqualifiant.
3. **Une architecture désordonnée** : la navigation mélange des rubriques de niveaux différents
   (séries, formats, œuvres isolées) sans hiérarchie claire ; il n'existe **aucune page « Œuvres
   disponibles »**, **aucun prix**, **aucun parcours d'achat**, et les **liens sociaux du pied de
   page pointent vers les comptes de démonstration de Wix** (`facebook.com/wix`, `instagram.com/wix`…).

En l'état, le site **expose** des contenus mais ne **raconte** pas. Il ne transforme pas la visite
en émotion, ni l'émotion en confiance, ni la confiance en prise de contact. La refonte ne consiste
pas à réécrire l'artiste — elle consiste à **lui donner le cadre qu'elle mérite**.

---

## 2. Les 10 problèmes prioritaires

1. **Gabarit d'entreprise non nettoyé** sur la page Bleu Cendres (postes fictifs « Responsable RH »,
   fausse section « Nos clients »). Crédibilité gravement atteinte.
2. **Marque et bannière Wix visibles partout.** Casse l'effet « galerie » et l'image professionnelle.
3. **Aucune page de vente, aucun prix, aucun statut d'œuvre.** Impossible de savoir quoi est à vendre.
4. **Liens sociaux factices** (comptes de démo Wix) sur la page contact.
5. **Navigation incohérente** : séries, formats et œuvres uniques au même niveau, libellés en
   désordre, fautes dans les intitulés (« Taleaux », « Très or bleu »).
6. **Pas de fiche œuvre structurée** : ni dimensions normalisées, ni technique, ni statut, ni CTA.
7. **SEO embryonnaire** : titres génériques (« Accueil | Armelle Mourier »), aucune meta description,
   image Open Graph unique pour toutes les pages, pas de données structurées, pas de mots-clés locaux
   (« artiste peintre Dijon », « plasticienne Bourgogne »).
8. **Accessibilité faible** : textes alternatifs manquants ou non descriptifs, contrastes non maîtrisés,
   structure de titres approximative, formulaire peu labellisé.
9. **Performance** : empilement JS Wix, galeries lourdes, pas de stratégie d'images maîtrisée côté éditeur.
10. **Aucun récit d'accueil** : la home se limite au nom + e-mail ; pas de phrase manifeste, pas
    d'œuvre forte mise en avant, pas d'appels à l'action.

---

## 3. Les 10 opportunités majeures

1. **Un récit fort, déjà écrit.** La bio (famille d'artistes, Collioure, la maladie transmuée en
   peinture, « transmettre la joie d'être en vie ») est un matériau rare. Bien mis en page, c'est le
   cœur émotionnel du site.
2. **Une signature visuelle évidente : *Bleu Cendres*** — le bleu profond et l'or. Un fil chromatique
   authentique (les tableaux du recueil sont « dorés et bleus ») qui peut structurer toute l'identité.
3. **Une caution culturelle réelle** : recueil publié aux éditions L'Atelier des Noyers, poèmes de
   Louise Dupré, association ArtDi, performances danse + peinture, résidences. À valoriser comme
   preuves de sérieux.
4. **Un ancrage local** (Dijon / Bourgogne) + un imaginaire méditerranéen (Collioure) : deux territoires
   SEO et deux publics.
5. **Une page « Œuvres disponibles »** sobre, pensée comme une galerie privée → première source de
   demandes d'achat.
6. **Des fiches œuvres** propres (titre, dimensions, technique, série, statut, prix ou « sur demande »).
7. **Une page « Démarche »** pour donner de la profondeur (couleur, catharsis, matière, recyclage de
   la toile, dialogue peinture/écriture).
8. **Une chronologie d'expositions** claire (passées / à venir) — données déjà disponibles, faciles à
   tenir à jour.
9. **Demande de catalogue / prise de contact qualifiée** par objet (acquisition, exposition, presse…).
10. **Socle technique léger** (statique) → notes Lighthouse élevées, coût d'hébergement quasi nul,
    base prête pour ajouter un paiement (Stripe) plus tard.

---

## 4. Notes (sur 100) — site actuel

| Axe            | Note | Commentaire court |
|----------------|:----:|-------------------|
| UX / parcours  | 42   | Navigation confuse, pas de parcours d'achat, pas de CTA. |
| UI / direction artistique | 38 | Résidus de gabarit, bannière Wix, mise en valeur faible des œuvres. |
| SEO            | 30   | Titres génériques, pas de meta, pas de données structurées, pas de mots-clés locaux. |
| Performance    | 45   | JS Wix lourd ; galeries non maîtrisées côté éditeur. |
| Accessibilité  | 35   | Alt text et contrastes non maîtrisés, structure sémantique faible. |
| Branding       | 40   | Univers présent mais non incarné ; identité visuelle absente. |
| Conversion     | 22   | Aucun chemin vers l'achat, prix absents, contacts factices. |
| **Moyenne**    | **36** | Fond solide, exécution à reconstruire. |

---

## 5. Recommandation stratégique

**Reconstruire de zéro un site vitrine statique, sobre et rapide, organisé autour d'un récit et d'un
parcours d'achat doux.** Conserver intégralement l'âme du texte existant, corriger la forme,
supprimer tout résidu de gabarit, et donner aux œuvres la place centrale. Objectif : *découverte →
émotion → confiance → demande de contact*. Aucun paiement en ligne au départ — priorité à la mise en
relation directe avec l'artiste.

---

# Phase 2 — Proposition stratégique

## Positionnement

> **Armelle Mourier — peindre comme on respire.**
> Une peinture de la couleur et de la matière, née d'une nécessité vitale, entre la lumière de
> Collioure et la terre de Bourgogne. Des œuvres originales, sensibles, à découvrir et à acquérir
> en lien direct avec l'artiste.

Le site doit ressembler à un **espace d'exposition et de rencontre**, pas à une boutique. On vend
par l'émotion et la confiance, jamais par la pression.

## Arborescence cible

```
Accueil
├── Œuvres            (galerie complète, filtres série/format/technique/année/statut)
│    └── (fiche par œuvre)
├── Œuvres disponibles (galerie privée, sobre, orientée acquisition)
├── Biographie
├── Démarche
├── Bleu Cendres       (le recueil et sa série dorée et bleue)
├── Expositions        (chronologie passées / à venir)
├── Contact            (formulaire qualifié par objet + e-mail direct)
├── Mentions légales
└── Confidentialité
```

## Tonalité éditoriale

Élégante, humaine, jamais pathétique, jamais « marketing ». Phrases courtes, respiration, vocabulaire
sensible (lumière, matière, souffle, couleur). On dit ce que l'on contrôle (« Demander cette œuvre »),
jamais le jargon technique. La maladie est évoquée avec **pudeur et dignité**, comme une force
créatrice, jamais comme un argument.

## Recommandations SEO

- **Titres uniques par page** : `Œuvres disponibles — Armelle Mourier, artiste peintre à Dijon`.
- **Meta descriptions** rédigées, distinctes, < 160 caractères.
- **Mots-clés** : Armelle Mourier · artiste peintre Dijon · artiste plasticienne Bourgogne · peinture
  abstraite / acrylique · tableaux contemporains · acheter tableau artiste peintre · œuvre originale
  artiste française · Bleu Cendres · ArtDi · Collioure · expositions Dijon.
- **Données structurées Schema.org** : `VisualArtist` (la personne) + `VisualArtwork` avec `offers`
  (prix ou « sur demande ») pour chaque tableau.
- **`sitemap.xml`** généré automatiquement + **`robots.txt`**.
- **Textes alternatifs descriptifs** sur chaque œuvre (« Toile abstraite bleu profond et or, série
  Bleu Cendres, 60 × 73 cm »).

## Recommandations design

Cf. la direction artistique détaillée dans le `README.md`. En résumé : fond ivoire, **bleu profond
+ or cendré** comme signature (issus de *Bleu Cendres*), typographies *Fraunces* (titres) + *Mulish*
(texte), beaucoup d'espace, **les œuvres priment**, une seule signature visuelle (le « trait bleu »),
animations subtiles, respect de `prefers-reduced-motion`.

## Stratégie de vente sobre

1. **Pas de paiement obligatoire** au lancement. Tout converge vers la **demande de contact** ou la
   **demande de catalogue**.
2. Chaque œuvre porte un **statut** (*disponible / réservée / vendue / sur demande*) et un **prix** ou
   « **Prix sur demande** ».
3. CTA constants et humains : **« Demander cette œuvre »**, **« Recevoir le catalogue »**,
   **« Contacter l'artiste »**.
4. La page *Œuvres disponibles* est pensée comme une **galerie privée** : peu de texte, beaucoup d'air,
   une invitation, pas une vitrine commerciale.
5. **Évolutif** : la structure de données prévoit l'ajout ultérieur d'un bouton de paiement (Stripe
   Payment Link ou Shopify Buy Button) par œuvre, sans refonte.

---

*Ce document accompagne la refonte technique livrée dans ce dépôt. Voir `README.md` pour l'installation,
le déploiement et la maintenance par une personne non technique.*

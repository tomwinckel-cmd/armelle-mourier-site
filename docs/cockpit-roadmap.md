# Cockpit — feuille de route éditoriale

Ce document décrit **où se modifie chaque élément du site aujourd'hui**, et
**ce qu'un futur cockpit** (back-office d'édition) pourra piloter — sans avoir
à recoder l'interface. Le cockpit n'est **pas** développé maintenant : cette
page sert de carte.

> 🧭 **Accès au cockpit.** L'entrée interne **principale** est désormais **`/cockpit`**
> (centre opérationnel V1). **`/cockpit-roadmap`** reste accessible comme page
> **secondaire / documentation** (même contenu, composant partagé
> `src/components/CockpitDashboard.astro`). **Les deux sont `noindex` et hors
> navigation publique.**
>
> ⚠️ **Préparation ≠ sauvegarde réelle.** Le cockpit **prépare** et **copie** des
> contenus (fiches, légendes, checklists, brouillons). La **sauvegarde réelle**
> sera activée **par étapes**. **Aucune action sensible n'est automatisée sans
> validation humaine** (Armelle décide · Tom valide · Claude Code exécute).

> Principe : tout le contenu pilotable vit dans `src/data/` et `src/content/`.
> Les composants (`src/components`, `src/layouts`) **consomment** ces données
> et ne contiennent pas de texte important codé en dur.

## Où modifier quoi (aujourd'hui)

| Domaine | Fichier | Contenu pilotable |
|---|---|---|
| **Identité & nav** | `src/data/site.ts` | Nom, rôle, manifeste, ville/région, **Carnet** (nav : `label`/`href`/`index`/`note` + `carnet.eyebrow`/`intro`), e-mail public, réseaux, SEO par défaut |
| **Design / DA** | `src/data/theme.ts` | Couleurs (palette pigment), typographie, identité `artist-studio` (boutons, cartes, hero, fragment), tokens (or, bleu, papier, texture) |
| **Vente douce** | `src/data/shop.ts` | Mode `soft-contact`, `showPrices`, `defaultPriceLabel`, devise future, réservation/catalogue on-off, libellés CTA, **objets de contact** |
| **Œuvres** | `src/data/artworks.ts` | Liste des œuvres : `title`, `slug`, `status`, `price?`, `image`/`images`, `alt`, `dimensions`, `technique`, `series`, `featured`, `showInAvailable` + helpers |
| **Expositions** | `src/data/exhibitions.ts` | Chronologie (dates, lieux, types) |
| **Textes bio** | `src/content/bio.ts` | Biographie, démarche, projet Bleu Cendres |
| **Textes de pages** | `src/content/pages.ts` | Récit éditorial de l'accueil et des œuvres |
| **Images** | `public/images/{artworks,portraits,projects,og}/` | Fichiers + chemins renseignés dans `artworks.ts` / `bio.ts` (voir `public/images/README.md`) |

## Ce qu'un futur cockpit pourra éditer

- **Textes** : nav/Carnet, récits de pages (`pages.ts`), bio (`bio.ts`).
- **Couleurs & DA** : palette et tokens de `theme.ts` (déjà injectés en variables CSS — un changement de valeur suffit).
- **Œuvres** : ajout/édition, **statut** (`available` / `reserved` / `sold` / `on-request`), visibilité (`featured`, `showInAvailable`), images et `alt`.
- **Expositions** : ajout de dates et lieux.
- **Contact** : e-mail public, objets de contact (`shop.contactSubjects`).
- **Vente douce** : `showPrices`, libellés CTA, activation réservation/catalogue (jamais de paiement tant que `enableCheckout = false`).
- **Images** : association fichier ↔ œuvre/portrait/projet.

### Fiches œuvre
`artworks.ts` expose : `getArtworkBySlug`, `getAvailableArtworks`,
`getFeaturedArtworks`, `getArtworkRequestUrl(a, objet)`. La route
**`src/pages/oeuvres/[slug].astro`** génère **une fiche par œuvre** (slug stable)
: visuel/placeholder, série, technique, dimensions, année, statut, « Prix sur
demande », description, et **acquisition douce** (Demander / Réserver / Catalogue
→ `/contact` prérempli). `images[]` reste prévu pour des vues secondaires.
Un futur cockpit édite les œuvres dans `artworks.ts` ; les fiches se régénèrent
au build, sans toucher au composant.

## Ce qui ne doit JAMAIS entrer dans le cockpit (ni dans le repo)

- 🔒 **Secrets**, **tokens**, **clés API**, **mots de passe**.
- Identifiants de paiement / webhooks signés.
- Données personnelles sensibles, **numéro de téléphone** tant qu'il n'est pas
  validé pour publication.

Ces éléments, le jour venu, vivront dans les **Variables/Secrets** de GitHub ou
de Vercel — **jamais** dans `src/data`, `src/content` ni dans un commit.

## Garde-fous produit (à conserver)

- **Vente douce** : pas de panier, pas de paiement en ligne ; acquisition par
  contact direct (`shop.mode = 'soft-contact'`, `enableCheckout = false`).
- **Aucun prix inventé** : sans `price`, on affiche « Prix sur demande ».
- **Pas de téléphone** publié sans validation humaine explicite.
- Identité **artist-studio** (cartels, boutons handline, Carnet d'atelier).

---

## Vision — un outil d'émancipation pour Armelle

Le site doit être livré **clé en main**. À terme, Armelle Mourier pilote
elle-même ses œuvres, ses images, ses textes, ses expositions, ses
disponibilités, sa vente douce et la **préparation** de ses publications
réseaux sociaux — **sans dépendre du code**. Le cockpit doit rester **simple,
clair, humain et progressif**, pensé pour une personne non développeuse :
labels humains, descriptions courtes, actions évidentes, zéro jargon.

> Le schéma des modules vit dans `src/data/cockpit.ts` (description, pas un
> admin). L'assistant réseaux sociaux (modèles de légendes, formats, mots-clés)
> vit dans `src/data/social.ts`. Une page interne **non listée** présente la
> feuille de route : `/cockpit-roadmap`.

### Modules prévus (`src/data/cockpit.ts`)
1. **Œuvres** — ajouter / modifier / organiser les tableaux.
2. **Disponibilités** — disponible / réservée / vendue / sur demande.
3. **Pages** — modifier les textes principaux.
4. **Expositions** — ajouter une date / un événement.
5. **Réseaux sociaux** — préparer des publications Instagram (copier-coller).
6. **Ambiance visuelle** — ajuster quelques couleurs et intensités.

## Chemin progressif (du plus simple au plus avancé)

1. **Fichiers de configuration éditables** (état actuel) — `src/data/`, `src/content/`.
2. **Mini-cockpit local / admin statique** — une interface simple qui écrit ces fichiers.
3. **Stockage des images** — dépôt et association aux œuvres.
4. **Édition œuvres / textes** — formulaires humains (labels du module).
5. **Assistant Instagram** — légendes + mots-clés + format conseillé, à copier-coller.
6. **Authentification** *(éventuelle)* — accès privé à l'édition.
7. **CMS / headless ou base de données** *(éventuel)* — si le besoin grandit.

## Versions du cockpit

| Version | Contenu |
|---|---|
| **V1** *(actuel)* | **Prototype** — lecture & préparation. Page interne `/cockpit-roadmap` (noindex, hors nav) : visualiser œuvres/disponibilités/pages/expositions, préparer des légendes Instagram (copier-coller) et un bloc d'œuvre à coller. **Ne sauvegarde rien.** |
| **V2** | **Édition réelle** des œuvres et des textes (écriture dans les fichiers de données). |
| **V3** | **Upload** et association des images. |
| **V4** | **Assistant réseaux sociaux avancé**. |
| **V5** | **Authentification**, si nécessaire. |

> 🧭 **Choix de l'outil pour la V2** : voir l'étude comparative
> **[`docs/cockpit-architecture-decision.md`](./cockpit-architecture-decision.md)**.
> Recommandation : un **CMS git-backed (Decap) + Cloudinary** pour les images —
> garder Astro/Vercel, coût quasi nul, données dans le dépôt ; alternative
> **Sanity** si l'on privilégie le confort d'édition.

### Phase 2A — structure Decap préparée *(fait)*
- `public/admin/` (Decap + `config.yml`, 7 collections) + `content/cms/` (exemples)
  + docs (`decap-cms-setup.md`, `cloudinary-setup.md`).
- ⚠️ **Le site public n'utilise pas encore les contenus CMS** : la source de vérité
  reste `src/data` / `src/content`. Auth **non branchée** (volontaire), aucun secret.
- **Prochaine phase (2B)** : brancher l'auth (Netlify Identity recommandé) +
  **migrer une collection pilote** (Œuvres) sans casser le site.

## Roadmap opérationnelle (centre opérationnel)

Lecture **orientée opérations** : le cockpit doit d'abord **simplifier la vie**
d'Armelle et de Tom, avant d'ajouter des services. Modèle : `src/data/operations.ts`.

| Version | Objectif |
|---|---|
| **V1 — Prototype (actuel)** | Lecture · préparation · copier-coller · **pas de sauvegarde**. |
| **V2 — Centre opérationnel assisté** | **Générer** : fiche œuvre complète · checklist upload image · légende Instagram · **fiche de preuve de création** · demande d'acquisition · **facture brouillon** · fiche logistique. |
| **V3 — Cockpit éditorial réel** | Édition œuvres · textes · statuts · expositions · images. |
| **V4 — Cockpit commercial doux** | Demandes entrantes · réservation · suivi prospect · catalogue · **devis/facture brouillon** · conditions de retrait/livraison. |
| **V5 — Automatisations optionnelles** | Cloudinary · CMS · paiement · Instagram API — **seulement si bénéfice net**. |

> Garde-fou : **aucune action sensible automatisée sans validation humaine**
> (Armelle décide · Tom valide · Claude Code exécute).

## Assistant « Ajouter une œuvre » (prototype)

Parcours guidé dans `/cockpit-roadmap` (modèle : `src/data/artworkWorkflow.ts`) :
**identifier → décrire → images → vente douce → protection → réseaux → récapitulatif**.

- **Garde-fou récapitulatif** : checklist « Avant de publier cette œuvre, vérifier »
  + bloc copiable **« Fiche œuvre prête à transmettre »** + bloc `artworks.ts`.
- **Gamification douce** (encourage, n'infantilise pas) : niveau de préparation
  (*brouillon / presque prêt / prêt à valider*), score de complétude indicatif,
  badges (Fiche complète · Image prête · Protection pensée · Publication préparée
  · Vente douce prête). Calcul **côté client**, rien n'est enregistré.
- **Designs activables plus tard** : `theme.designModes` (Atelier pigment · Galerie
  claire · Bleu Cendres) — **préparation**, pas de switch global actif.
- **Validation humaine obligatoire** : aucun bouton « Publier », aucune sauvegarde,
  aucun envoi. Armelle décide · Tom valide · Claude Code exécute.

## Générateur « Fiche œuvre + preuve de création » (prototype)

Section opérationnelle dans `/cockpit-roadmap` (modèle : `src/data/proof.ts`) pour
**documenter, protéger et archiver** une œuvre en quelques minutes.

- **Fonctionnement** : pré-remplir depuis une œuvre existante (ou modèle vide) →
  compléter identité, technique, **preuve de création**, images, vente, web,
  réseaux → **copier la fiche** + **copier la checklist**. Calcul **côté client**,
  **aucune sauvegarde**, **aucun upload**.
- **Fiche copiable** : bloc texte structuré « FICHE ŒUVRE — PREUVE DE CRÉATION »
  (titre, série, année, dimensions, technique, support, description, date/lieu,
  images conservées HD/web/détails, statut, **« Prix sur demande » par défaut**,
  publication web, alt text, notes de protection, historique, demande/acquéreur,
  logistique, réseaux, hashtags, **« Validation humaine : à vérifier avant
  publication »**).
- **Checklist de protection** (12 points) + blocs d'aide « Images à conserver »
  et « Publication web recommandée ».
- **Garde-fous PI** : ce n'est **pas un avis juridique** ; le droit d'auteur naît
  à la création ; l'enjeu pratique est la **preuve de date et de paternité** ;
  pour une œuvre importante, envisager **e-Soleau** ou un autre service de preuve
  datée ; **ne pas publier la HD complète** ; conserver originaux et échanges.
- **Gamification douce** (adulte, sobre) : préparation du dossier (brouillon /
  presque prêt / prêt à valider) + badges (Fiche complète · Images prêtes ·
  Protection pensée · Web prêt · Réseaux prêts · Vente douce prête).
- **Limite assumée** : le cockpit **organise**, il ne **protège pas** à lui seul.
  L'artiste garde la décision. Voir `docs/ip-protection-artist.md`.

## Module « Facture & remise » (prototype, mini-assistant 3 étapes)

Mini-assistant **3 étapes** dans `/cockpit` (modèle : `src/data/transactionWorkflow.ts`)
pour préparer la **suite d’une acquisition**, sans jamais encaisser ni émettre de
facture officielle.

- **Étape 1 — Préparer les informations** : client & œuvre (artiste, client, e-mail,
  statut, œuvre, dimensions, technique) · facture (prix à valider, date, numéro à
  compléter, mode de paiement à définir, conditions, notes) · remise/livraison (mode,
  date prévue, adresse, emballage, état, photos, assurance, responsable, signature).
- **Étape 2 — Générer les brouillons** : blocs copiables **« BROUILLON DE FACTURE —
  À VÉRIFIER »**, **« FICHE LOGISTIQUE — REMISE D’ŒUVRE »** et **« Message client —
  remise / livraison »** (Copier la facture brouillon / la fiche logistique / le message).
- **Étape 3 — Vérifier avant envoi / remise** : checklist (prix validé humainement ·
  numéro à compléter · mode de paiement à définir · œuvre photographiée avant départ ·
  emballage vérifié · lieu/date confirmés · preuve de remise prévue · **validation
  humaine obligatoire**).
- **Badges** : Informations prêtes · Brouillon prêt · Logistique prête · Preuve prévue ·
  Validation humaine.

### Garde-fous — « Ce module ne remplace pas un comptable »
- Il prépare un **brouillon** ; les informations doivent être **vérifiées humainement**.
- **Aucun paiement** n’est déclenché (**pas de Stripe / PayPal**, aucun « payer maintenant »,
  **aucun bouton « Payer »**).
- **Aucune facture officielle définitive** n’est émise automatiquement (numéro « à
  compléter », montant « à valider », paiement « à définir »).
- **Aucun envoi automatique**, **aucune sauvegarde, aucun upload, aucune base de données** :
  tout est calculé côté navigateur ; boutons **Copier** uniquement.
- Pour la comptabilité : **consulter un professionnel** si nécessaire.
- 🔮 **Futur possible** (hors scope) : **modèle de facture validé par un professionnel**.

## Module « Préparer un catalogue » (prototype, mini-assistant 3 étapes)

Mini-assistant **3 étapes** dans `/cockpit` (modèle : `src/data/catalogWorkflow.ts`)
pour préparer un **dossier clair et digne** à envoyer.

- **Étape 1 — Choisir le type de dossier** : Collectionneur · Galerie · Exposition ·
  Presse · Œuvres disponibles ; + destinataire / contexte / date / message
  d’introduction / conditions / contact.
- **Étape 2 — Sélectionner les œuvres** : **cocher** les œuvres existantes ; rappel
  de vérifier **statut · image web · dimensions · technique**.
- **Étape 3 — Copier le dossier** : checklist « Avant d’envoyer » + blocs copiables
  **« DOSSIER À ENVOYER — BROUILLON »**, **« Liste d’œuvres sélectionnées »**
  (titre, série, dimensions, technique, statut, **prix**, lien fiche) et **message
  d’accompagnement** (collectionneur, galerie, exposition, réponse, relance douce).
- **Garde-fous** : **images web uniquement** (jamais la HD complète), **statuts
  vérifiés** (une œuvre **vendue** n’est pas présentée comme disponible), **aucun
  prix inventé** (« Prix sur demande »), titres relus, **validation humaine avant
  envoi**. Badges : Sélection claire · Statuts vérifiés · Images prêtes · Message
  prêt · Catalogue prêt à valider.
- **Limites volontaires** : **aucun PDF réel** pour l’instant, **aucun bouton
  « Envoyer »**, **aucune sauvegarde, aucun upload, aucun service externe**. Boutons
  **Copier le dossier / Copier la liste / Copier le message** uniquement.
- 🔮 **Futur possible** (hors scope) : **export PDF** du dossier — seulement si
  bénéfice net, jamais d’API ni de secret.

## Tableau de bord interne (`/cockpit-roadmap`)

La page est organisée en **tableau de bord** lisible en quelques secondes :

- **« Que veux-tu faire aujourd’hui ? »** : 6 actions rapides (ajouter une œuvre,
  préparer une fiche, une publication, un catalogue, une demande client, une
  remise) qui ouvrent directement le module visé.
- **Navigation interne** (ancres, libellés courts, **sticky**, responsive).
- **Vue d’ensemble** avec le statut des modules : **Actifs (prototype) · En
  préparation · Prochaines activations** (ton adulte, sans infantilisation).
- **Modules lourds repliables** (`<details>/<summary>` natif, accessible clavier) :
  *Ajouter une œuvre*, *Fiche œuvre + preuve*, *Facture & remise*, *Catalogue* —
  fermés par défaut, ouverts à la demande via les actions rapides ou la
  navigation. Les sections de référence (disponibilités, pages, expositions,
  réseaux, ambiance, roadmap) restent ouvertes.

Objectif : **réduire la charge mentale**, pas la déplacer dans une page trop
longue. Aucune sauvegarde, aucun service externe — comportement inchangé.

## Module « Préparer une publication » (prototype)

Mini-assistant **3 étapes** dans `/cockpit` (modèle : `src/data/social.ts`) pour
préparer une publication réseaux **en copier-coller**, sans complexité technique :

- **Étape 1 — Choisir le contexte** : nouvelle œuvre · œuvre disponible · exposition ·
  coulisse d'atelier · Bleu Cendres · rappel catalogue (pré-remplit légende + format).
- **Étape 2 — Préparer** : format conseillé (carré 1:1 · portrait 4:5 · story 9:16),
  ton (sobre / poétique / informatif), œuvre/sujet, **légende proposée** (ajustable),
  **hashtags**, image web.
- **Étape 3 — Copier & publier manuellement** : checklist « Avant de publier » +
  bloc copiable **« PUBLICATION À PRÉPARER »** + boutons **Copier la légende /
  Copier les hashtags / Copier la publication**.

**Garde-fous** : image **web compressée** (jamais la HD complète), légende relue,
hashtags sobres, **statut vérifié** (une œuvre vendue n'est pas présentée comme
disponible), **aucun prix inventé**, **validation humaine**. Badges : Légende prête ·
Hashtags prêts · Image web prête · Statut vérifié · Publication prête à copier.

- ❌ **Pas d'API Instagram / Meta**, **aucune publication automatique**, aucun « Publier ».
  Tout est **copié-collé à la main** par l'artiste — « À publier manuellement sur :
  Instagram ».
- 🔮 **Futur possible** (hors scope) : **export d'image sociale** « prête à poster »
  et **calendrier éditorial** — seulement si bénéfice net, jamais d'API ni de secret.

## Module « Répondre à une demande » (prototype, mini-assistant 3 étapes)

Mini-assistant **3 étapes** dans `/cockpit` (modèle : `src/data/transactionWorkflow.ts`)
pour préparer une réponse **claire, humaine et vérifiée** à une demande entrante,
puis l'**envoyer à la main**.

- **Étape 1 — Identifier la demande** : type (information œuvre · réservation ·
  catalogue · exposition/résidence · presse · commande spéciale · autre) + contact,
  e-mail (à copier à la main), œuvre concernée, contexte, priorité.
- **Étape 2 — Préparer la réponse** : **réponse proposée** (modèle pré-rempli,
  ajustable), informations à vérifier, **pièces à joindre** (fiche œuvre · catalogue ·
  photos web · conditions · disponibilité).
- **Étape 3 — Copier & suivre** : checklist « Avant de répondre » + **statut manuel**
  (à répondre · répondu · en attente · à relancer · réservé · clôturé) + prochaine
  action + bloc copiable **« RÉPONSE À UNE DEMANDE — BROUILLON »**.

- **Modèles de réponse** (ton humain, professionnel, sans pression, sobre, chaleureux) :
  information œuvre · réservation · envoi catalogue · proposition exposition/résidence ·
  presse · commande spéciale · relance douce.
- **Garde-fous** : nom du contact correct · œuvre **bien disponible** si réservation ·
  **aucun prix inventé** · images **web** uniquement · message relu · pièces vérifiées ·
  statut noté · **validation humaine avant envoi**. Badges : Demande identifiée ·
  Réponse prête · Pièces vérifiées · Statut noté · Suivi prévu.
- **Limites volontaires** : **aucun envoi e-mail automatique**, **aucun CRM réel**,
  aucun bouton « Envoyer », **aucune sauvegarde, aucun service externe**. Boutons
  **Copier la réponse / Copier le brouillon** uniquement ; **suivi manuel**.
- 🔮 **Futur possible** (hors scope) : **boîte de demandes / CRM léger** — seulement
  si bénéfice net, jamais d'API ni de secret.

## Volontairement exclu maintenant

- 💳 **Paiement en ligne** / panier / checkout.
- 📲 **Publication Instagram automatique** / API Meta / tokens.
- 🔒 **Stockage de secrets, tokens, clés API, mots de passe** dans le repo.
- 🧩 Toute **complexité inutile** : on avance par petites étapes utiles.


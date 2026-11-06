# Guide de livraison — Site & cockpit Armelle Mourier

Bienvenue Armelle. Ce site a été pensé pour **vous** : présenter votre travail
avec dignité, et vous donner peu à peu la main sur vos contenus, **sans dépendre
du code**. Ce guide explique, en langage simple, **ce qui est prêt**, **ce que
vous pouvez voir**, **ce que vous pourrez bientôt piloter**, et **ce qu'il ne
faut pas encore toucher**.

> En une phrase : **le site public est prêt et stable** ; le **cockpit** (votre
> futur tableau de bord) existe déjà en **prototype** — il prépare le travail
> mais ne publie encore rien tout seul.

---

## 1. Vue d'ensemble

| Espace | À quoi ça sert | État |
|---|---|---|
| **Site public** | Ce que voient les visiteurs : œuvres, biographie, expositions, contact. | ✅ **Prêt et stable** |
| **Cockpit interne** (`/cockpit`) | Votre tableau de bord pour **préparer** œuvres, fiches, légendes, catalogue, factures brouillon, logistique. | 🟡 **Prototype** (prépare, ne sauvegarde pas) |
| **Admin éditorial** (`/admin/`) | Renseigner vos **œuvres** vous-même : photos, galerie, vidéo, textes. La **base est fonctionnelle** ; il reste à **activer votre accès**. | 🟡 **Base prête, accès à activer** |

- **Ce qui est prêt** : tout le site public (pages, fiches d'œuvres, contact,
  SEO et partage social) **et** la **base éditable des œuvres** (un fichier par
  œuvre, photos dans `/uploads/oeuvres/`, champ vidéo) — voir `docs/acces-armelle.md`.
- **Ce qui reste prototype** : le cockpit *prépare* des textes et des
  vérifications, mais **n'enregistre rien** et **ne publie rien** automatiquement.

---

## 2. Liens utiles

| Lien | Pour qui | Note |
|---|---|---|
| **Production** : <https://armelle-mourier-site.vercel.app> | Tout le monde | Le site public en ligne. |
| **Cockpit** : `/cockpit` | Armelle & Tom | **Entrée interne principale** — par **URL directe** (non listé, non indexé). |
| **Cockpit (alias)** : `/cockpit-roadmap` | Documentation | Même contenu, page secondaire (non listé, non indexé). |
| **Admin éditorial** : `/admin/` | Armelle (bientôt) | Base œuvres **fonctionnelle** ; l'écran s'affiche mais **n'enregistre pas** tant que votre accès n'est pas activé. |
| **GitHub / Vercel** | **Tom / développement** | Gestion technique — pas nécessaire pour l'artiste. |

> Le domaine définitif (ex. `armellemourier.fr`) remplacera l'adresse Vercel le
> jour de la mise en ligne officielle (voir `docs/seo-checklist.md`).

---

## 3. Parcours de démonstration conseillé

À parcourir dans cet ordre pour tout comprendre en quelques minutes :

1. **Accueil** — qui est Armelle, son univers, les trois portes d'entrée.
2. **Carnet** — le menu d'atelier (la navigation).
3. **Œuvres** — la galerie, les séries (Bleu Cendres, Impressions, Performances).
4. **Fiche œuvre** — ouvrir une œuvre : format, technique, « Prix sur demande ».
5. **Disponibles** — la sélection d'atelier à acquérir.
6. **Biographie** — le récit, les repères.
7. **Démarche** — matières, gestes, fils du travail.
8. **Bleu Cendres** — le recueil, le bleu, l'or, la poésie.
9. **Expositions** — le parcours, dates et lieux réels.
10. **Contact** — écrire à l'artiste (acquisition, catalogue, exposition…).
11. **Cockpit** (`/cockpit`) — votre futur tableau de bord.

---

## 4. Ce que le site permet déjà

- **Présenter l'artiste** (accueil, biographie, démarche).
- **Présenter les œuvres** (galerie, séries, fiches détaillées).
- **Afficher les œuvres disponibles** (sélection d'atelier).
- **Demander une œuvre** (contact prérempli depuis chaque fiche).
- **Demander un catalogue** (lien dédié).
- **Préparer une acquisition douce** (pas de panier ni de paiement : une
  conversation directe avec l'artiste).
- **Afficher le parcours et les expositions** (chronologie réelle).
- **Préparer les contenus** dans le cockpit.

---

## 5. Ce que le cockpit permet déjà (prototype)

Dans `/cockpit`, l'écran s'ouvre sur « **Que voulez-vous faire
aujourd'hui ?** » et propose de :

- **Préparer une nouvelle œuvre** (assistant pas à pas) ;
- **Vérifier les erreurs avant publication** (garde-fou récapitulatif) ;
- **Générer une fiche œuvre** ;
- **Préparer une preuve de création** ;
- **Préparer une légende Instagram** (à copier-coller) ;
- **Préparer un catalogue** (dossier collectionneur) ;
- **Préparer un brouillon de facture** ;
- **Organiser la remise / livraison** ;
- **Réduire la charge mentale** : tout est rangé au même endroit.

> Tout se fait **dans le navigateur**, en **copier-coller**. Rien n'est envoyé,
> rien n'est enregistré : on **prépare**, un humain **valide**.

---

## 6. Ce que le cockpit ne fait pas encore

- ❌ **Sauvegarde réelle** des contenus.
- ❌ **Upload réel** d'images.
- ❌ **Publication automatique** (réseaux ou site).
- ❌ **Paiement** en ligne.
- ❌ **Facture officielle** (les factures sont des **brouillons** à vérifier).
- ❌ **Connexion Instagram** (aucune API).
- ❌ **Protection juridique automatique** (le cockpit *organise* vos preuves).
- ❌ **Comptabilité** (à confier à un professionnel si besoin).

---

## 7. Accès artiste (sécurité)

L'accès d'édition (`/admin/`) sera créé **plus tard**, proprement et en sécurité :

- 🔒 **Aucun mot de passe n'est stocké dans le projet (repo).**
- 🔒 **Aucun mot de passe n'est transmis à Tom ni à Claude Code.**
- ✅ **Armelle créera elle-même son mot de passe** via un **lien d'invitation**
  reçu par e-mail (jamais partagé, jamais écrit dans le code).
- ⏳ L'accès `/admin/` sera **activé plus tard** (voir `docs/decap-cms-setup.md`).
- 👁️ `/cockpit` est, lui, **déjà visible par URL directe** pour la phase
  prototype (non listé dans le menu, non indexé par les moteurs).

---

## 8. Propriété intellectuelle (résumé prudent)

> ⚠️ **Ceci n'est pas un avis juridique** — c'est une aide pratique et prudente.
> En cas d'enjeu réel, consulter un professionnel.

- En France, le **droit d'auteur naît automatiquement** à la création d'une
  œuvre originale.
- L'enjeu pratique est de pouvoir **prouver une date et une paternité** : gardez
  une **preuve datée**.
- **Conservez les fichiers HD en privé** (hors du site).
- **Publiez une version web compressée** (jamais la HD pleine résolution).
- Pour une **œuvre importante**, envisagez **e-Soleau (INPI)** ou un autre
  **service de preuve datée / horodatée**.
- Détails : `docs/ip-protection-artist.md`.

---

## 9. Prochaines activations

1. **Accès artiste** (invitation, mot de passe créé par Armelle) — **seule étape**
   restante pour éditer en ligne ; la base et l'upload sont déjà en place.
2. **Upload d'œuvres** depuis l'admin → `/uploads/oeuvres/` *(mécanisme prêt,
   s'active avec l'accès)*.
3. **Migration d'une collection pilote** (les Œuvres en premier).
4. **Images HD** (photos définitives des toiles).
5. **Domaine définitif** (ex. `armellemourier.fr`).
6. **Image Open Graph réelle** (1200×630 pour le partage social).
7. **Guide « ajouter une œuvre »** pas à pas pour l'artiste.

---

## 10. Rôle de chacun

- 🎨 **Armelle décide** — ce qui est publié, vendu, protégé.
- 🧭 **Tom valide** humainement chaque étape sensible.
- 🤖 **Claude Code exécute** techniquement les tâches répétitives.
- 🔒 **Aucune action sensible** n'est automatisée **sans validation humaine**.

---

*Pour aller plus loin : `docs/demo-script.md` (présentation en 5 minutes),
`docs/cockpit-roadmap.md` (feuille de route du cockpit),
`docs/decap-cms-setup.md` (futur accès d'édition),
`docs/ip-protection-artist.md` (protéger ses œuvres).*

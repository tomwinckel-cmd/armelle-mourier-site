# Protéger ses œuvres — repères pratiques pour l'artiste

> ⚠️ **Ceci n'est pas un avis juridique.** C'est une aide pratique et prudente.
> Pour un cas important ou sensible (litige, contrat, cession de droits),
> **consulter un professionnel** (avocat / conseil en propriété intellectuelle).

## L'essentiel

- En France, le **droit d'auteur naît automatiquement** dès la création d'une
  œuvre originale : pas besoin de « déposer » pour être titulaire des droits.
- Le **problème pratique** n'est donc pas d'« acquérir » le droit, mais de pouvoir
  **prouver une date** et une **paternité** en cas de contestation.
- Une **preuve datée** antérieure aide à démontrer qu'on est bien à l'origine de
  l'œuvre à une certaine date.

## Constituer une preuve datée

- **e-Soleau (INPI)** : service en ligne de l'INPI permettant d'**horodater** et
  de conserver un document/preuve daté. Utile pour les œuvres importantes.
- ℹ️ L'ancienne **enveloppe Soleau papier** n'est **plus commercialisée depuis
  avril 2024** ; la voie actuelle est **e-Soleau** (en ligne).
- D'autres moyens de **preuve datée** existent (constat, dépôt chez un tiers de
  confiance, horodatage). e-Soleau reste simple et abordable pour commencer.

> e-Soleau **ne crée pas** le droit d'auteur (il est déjà à vous) : il aide à
> **dater** votre preuve.

## Pour chaque œuvre, garder (registre interne)

- **Photo HD originale, privée** (haute résolution, non publiée) ;
- **photo web compressée** (pour le site / réseaux) ;
- **titre** · **dimensions** · **technique** · **date** · **série** ;
- **description** ;
- **photos de détails** (matière, signature, dos de la toile) ;
- **preuve de création** (e-Soleau ou autre, pour les œuvres importantes) ;
- **historique d'exposition** ;
- **statut de vente** et, si vendue, **propriétaire**.

## Bonnes pratiques de publication

- **Ne jamais publier les fichiers HD pleine résolution** sans nécessité.
- Mettre en ligne une **version web compressée**, idéalement avec un
  **filigrane léger** (discret, qui ne dénature pas l'œuvre).
- **Conserver les échanges importants** (e-mails de vente, d'exposition, de prêt).

## Protection « en 3 clics » (via le cockpit, à terme)

1. **Créer la fiche œuvre complète** dans le cockpit (titre, dimensions,
   technique, date, série, description, photos).
2. **Exporter / conserver** la fiche + les **images datées** (HD privée + web).
3. **Déposer / horodater** via un service de preuve (ex. **e-Soleau**) **si
   l'œuvre est importante**.

## Module « Protéger une œuvre » (cockpit, prototype — 3 étapes)

Dans `/cockpit` (interne, noindex, hors nav), un **mini-assistant 3 étapes**
**« Protéger une œuvre »** aide à organiser un **dossier de preuve**. Modèle :
`src/data/proof.ts`.

- **Comment l'utiliser** : **1.** identifier l'œuvre (titre, dimensions, technique,
  **date/lieu de création**, description) — pré-remplissage possible depuis une
  œuvre existante ; **2.** préparer les preuves (où sont la HD privée, la version
  web, les photos de détails, l'historique, les expositions ; cases de
  conservation) ; **3.** copier le dossier (**FICHE PREUVE DE CRÉATION**,
  **CHECKLIST PROTECTION**, **NOTES POUR HORODATAGE**). Tout se calcule **côté
  navigateur** ; **rien n'est sauvegardé, téléversé, publié ni déposé** — l'éventuel
  **horodatage (e-Soleau / INPI) est une démarche manuelle, non connectée**.
- **Pourquoi conserver la HD** : c'est l'original de référence (qualité, preuve,
  réédition). On la **garde hors du site**, en privé.
- **Pourquoi préparer une version web** : on publie une **image compressée**
  (site / réseaux), jamais le fichier HD pleine résolution — pour limiter la
  réutilisation non souhaitée.
- **Pourquoi garder une preuve datée** : le droit d'auteur est déjà à l'artiste ;
  une **preuve datée** (e-Soleau ou autre) aide surtout à **démontrer la date et
  la paternité** en cas de contestation, pour une **œuvre importante**.
- **Limites juridiques** : le cockpit **organise et prépare** ; il **ne protège
  pas juridiquement à lui seul** et ne remplace ni un dépôt officiel, ni un
  avocat. En cas d'enjeu réel : **consulter un professionnel**.
- **Décision humaine** : l'artiste garde la main. Rien n'est diffusé sans
  **validation humaine** (Armelle décide · Tom valide · Claude Code exécute).

## Limites (à garder en tête)

- Aucune méthode ne garantit une **protection absolue** ni n'empêche toute copie.
- Le cockpit **prépare et organise** ; il ne remplace ni un avocat, ni un dépôt
  officiel, ni la comptabilité.
- En cas de doute ou d'enjeu réel : **demander conseil à un professionnel**.

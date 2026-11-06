# Cloudinary — préparation des images (Phase 2)

Cloudinary héberge et **optimise les images** (upload depuis le cockpit, sans
alourdir le dépôt). **Aucune clé n'est committée** : elles vivent dans les
réglages Decap / Variables Netlify-Vercel.

## 1. Créer un compte
1. Aller sur [cloudinary.com](https://cloudinary.com) → créer un compte **gratuit**.
2. Dans le Dashboard, noter le **Cloud name** (ce n'est pas un secret, mais on ne
   le met pas en dur dans le repo : il sera renseigné côté config, hors commit).

## 2. Créer un upload preset
1. **Settings → Upload → Upload presets → Add upload preset**.
2. Mode :
   - **Unsigned** (le plus simple pour Decap) — pratique, mais l'upload est
     ouvert : limiter le dossier et activer la modération si besoin.
   - **Signed** (plus sûr) — nécessite l'API key/secret côté serveur (à garder
     **hors repo**, dans les Variables).
3. Définir un **dossier** cible (ex. `armelle/artworks`) et un nommage cohérent.

## 3. Connecter à Decap
Dans `public/admin/config.yml`, décommenter le bloc `media_library` :
```yaml
media_library:
  name: cloudinary
  config:
    cloud_name: VOTRE_CLOUD_NAME   # renseigné ici au moment du branchement
    # api_key géré par Decap / variables — JAMAIS de secret committé
```
> Tant que ce bloc reste commenté (Phase 2A), Decap utilise le dossier local
> `public/images/uploads` (préparation).

## 4. Formats & nommage recommandés
- **Œuvres** : bord long 1600–2000 px, **`.webp`**, ~300 Ko ; cadrage proche du 4:5.
- **OG / partage** : 1200 × 630 px, `.jpg`.
- **Nommage** : minuscules, sans accents, tirets ; idéalement le **slug** de l'œuvre.

## 5. Workflow de l'artiste
1. Dans le cockpit, ajouter/éditer une œuvre.
2. **Déposer la photo** → Cloudinary l'héberge et l'optimise automatiquement.
3. Publier → Decap commit la fiche ; Vercel reconstruit ; l'œuvre apparaît.

## Sécurité (rappel)
- ❌ **Jamais** d'API key / secret Cloudinary dans le dépôt.
- ✅ Clés dans les **Variables** Netlify/Vercel (ou réglages Decap).
- ✅ Preset limité à un dossier ; modération si upload non signé.

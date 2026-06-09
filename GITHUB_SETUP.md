# Mise en place GitHub : CI, auto-merge Claude & déploiement

Ce guide décrit la chaîne complète : intégration continue (`validation`),
auto-merge des PR Claude une fois les checks au vert, protection de `main`
et déploiement Vercel.

---

## 0. État de la protection & décisions (à jour)

Synthèse de la configuration **réellement adoptée** pour ce dépôt.

### Décision : dépôt **public** pour un enforcement gratuit du ruleset
Les *rulesets* (et la *branch protection* classique) ne sont **enforced sur un
dépôt privé** qu'avec un plan payant (GitHub Pro pour la protection classique,
ou une organisation GitHub Team/Enterprise pour les rulesets privés). Sur un
**compte personnel en plan Free**, un repo **privé** affiche l'avertissement
« *won't be enforced … until you move to GitHub Team* » : la règle existe mais
**ne s'applique pas**.

➡️ **Décision : rendre le dépôt public.** Le site est de toute façon déployé
publiquement (Vercel) et le repo **ne contient aucun secret** (voir plus bas).
La visibilité publique rend le ruleset `main-protection` **enforced sans coût**.

### `main-protection` (ruleset actif et enforced)
Défini dans `.github/repository-ruleset-main.json`, ciblant la branche par
défaut (`main`) :
- **Pull request obligatoire** — pas de push direct sur `main` ;
- **Required status check : `validation`** (mode strict : branche à jour) ;
- **Pas de force-push** (`non_fast_forward`) ;
- **Pas de suppression** de `main` (`deletion`) ;
- **Résolution des fils de revue** requise.

### Check requis : `validation`
Job du workflow `.github/workflows/validation.yml` (`npm ci` → `npm run check`
→ `npm run build`). C'est **l'unique check requis** par le ruleset. Le nom doit
rester exactement `validation` (sinon mettre à jour le ruleset).

### Auto-merge Claude
`.github/workflows/claude-auto-merge.yml` met en **auto-merge squash** les PR
dont le titre contient `[claude]` (ou portant le label `claude-auto-merge`).
Avec le ruleset enforced, la fusion **n'intervient qu'après `validation` au
vert** — les checks ne sont jamais contournés.

> Note : tant que le repo était privé sans enforcement, l'auto-merge fusionnait
> parfois avant la fin de `validation`. Le passage en public corrige ce point :
> le check requis devient bloquant.

### Vercel — production
Déploiement déclenché par le **webhook GitHub de Vercel** (indépendant des
Actions) à chaque push sur `main` → **production**. Chaque PR reçoit une
*Preview Deployment*. Preset `Astro`, build `npm run build`, sortie `dist`,
install `npm ci`. Voir §6 pour la connexion et le domaine.

### Procédure : PR obligatoire (flux de travail)
1. Créer une branche dédiée (ex. `claude/ma-tache`) — **jamais de commit direct
   sur `main`**.
2. Ouvrir une **Pull Request** vers `main`.
3. `validation` s'exécute (`npm ci` / `check` / `build`).
4. Fusion **uniquement** quand `validation` est **vert** (auto-merge pour les PR
   `[claude]`, sinon merge manuel) — en **squash**.
5. `main` reste toujours déployable ; Vercel redéploie la production.

### Rappel sécurité : aucun secret dans le repo
Audit avant passage en public : **aucun** `.env` commité (ni dans l'historique),
**aucune** clé/token/API, **aucun** mot de passe, **aucun** numéro de téléphone
publié. `.gitignore` exclut `.env`, `.env.*`, `node_modules/`, `dist/`, `.astro/`.
Seule donnée de contact publiée : l'**e-mail public** de l'artiste (volontaire).
**Ne jamais committer** de secret ; utiliser les *Variables/Secrets* GitHub ou
Vercel si un jour un service en exige.

---

## 1. Créer le dépôt (si besoin)

```bash
gh auth login
gh repo create armelle-mourier-site --private --source=. --remote=origin --push
```

Ou en public :

```bash
gh repo create armelle-mourier-site --public --source=. --remote=origin --push
```

---

## 2. Intégration continue : `validation`

Le workflow `.github/workflows/validation.yml` s'exécute à chaque PR vers `main`
(et sur push `main`). Il enchaîne :

```text
npm ci          # installation reproductible depuis package-lock.json
npm run check   # astro check (TypeScript + diagnostics Astro)
npm run build   # build statique
```

Le **job s'appelle `validation`** : c'est ce nom qui sert de *required status check*
dans la protection de branche (étape 4). Ne pas le renommer sans mettre à jour
le ruleset.

---

## 3. Activer l'auto-merge au niveau du dépôt

L'auto-merge doit être **activé sur le dépôt**, sinon l'action ne pourra pas
mettre une PR en file d'attente de fusion.

### Via l'interface GitHub
`Settings` → `General` → section **Pull Requests** :
- cocher **Allow auto-merge**
- cocher **Allow squash merging** (la fusion auto se fait en squash)
- (optionnel) cocher **Automatically delete head branches**

### Via la CLI

```bash
gh repo edit --enable-auto-merge --enable-squash-merge --delete-branch-on-merge
```

---

## 4. Protéger `main` avec le check obligatoire

Le fichier `.github/repository-ruleset-main.json` définit la protection de `main` :
- **pull request obligatoire** (pas de push direct) ;
- **required status check : `validation`** (strict : la branche doit être à jour) ;
- **pas de force push** (`non_fast_forward`) ;
- **pas de suppression** de `main` (`deletion`) ;
- résolution des fils de revue requise.

Appliquer le ruleset **après un premier passage** de la GitHub Action `validation`
(pour que GitHub connaisse le contexte du check) :

```bash
OWNER_REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
gh api --method POST "repos/$OWNER_REPO/rulesets" --input .github/repository-ruleset-main.json
```

> On peut aussi importer le ruleset dans l'interface :
> `Settings` → `Rules` → `Rulesets` → `New ruleset` → `Import a ruleset`,
> puis sélectionner le fichier JSON.

---

## 5. Auto-merge des PR Claude

Le workflow `.github/workflows/claude-auto-merge.yml` met une PR en **auto-merge
squash** dès qu'elle n'est pas en brouillon et qu'elle satisfait l'une de ces
conditions :
- son **titre contient `[claude]`**, ou
- elle porte le **label `claude-auto-merge`**, ou
- son auteur est un compte dont le login contient `claude`.

Déclencheurs : `opened`, `synchronize`, `reopened`, `ready_for_review`, `labeled`.

```bash
gh pr merge --auto --squash "$PR_URL"
```

### Les checks ne sont jamais contournés
`gh pr merge --auto` ne fait que **demander** la fusion : GitHub ne fusionne
réellement que lorsque **tous les checks requis** (ici `validation`) sont au vert
et que les règles de la branche `main` sont satisfaites. Si `validation` échoue,
la PR reste ouverte et n'est pas fusionnée.

---

## 6. Connecter Vercel (déploiement)

Le site est **100 % statique** (`astro build` → dossier `dist/`).

1. Sur [vercel.com](https://vercel.com), **Add New… → Project**, puis importer le
   dépôt GitHub `armelle-mourier-site`.
2. Vercel détecte Astro automatiquement. Sinon, régler manuellement :
   - **Framework Preset** : `Astro`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm ci`
3. **Deploy**. Chaque push sur `main` redéploie la production ; chaque PR reçoit
   une *Preview Deployment* automatique.
4. **Domaine** : `Settings` → `Domains`, ajouter le domaine définitif
   (ex. `www.armellemourier.fr`). Penser à mettre à jour `SITE_URL` dans
   `astro.config.mjs`, ainsi que `src/data/site.ts`, `public/robots.txt` et
   `public/sitemap.xml`.

> Astuce : la *Preview Deployment* Vercel d'une PR peut apparaître comme un check.
> Si vous voulez qu'elle soit bloquante pour l'auto-merge, ajoutez son contexte
> à `required_status_checks` dans le ruleset.

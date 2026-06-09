# Mise en place GitHub : CI, auto-merge Claude & déploiement

Ce guide décrit la chaîne complète : intégration continue (`validation`),
auto-merge des PR Claude une fois les checks au vert, protection de `main`
et déploiement Vercel.

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

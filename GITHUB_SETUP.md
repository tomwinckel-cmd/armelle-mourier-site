# Création GitHub + auto-merge Claude

## 1. Créer le dépôt

```bash
gh auth login
gh repo create armelle-mourier-site --private --source=. --remote=origin --push
```

Ou en public :

```bash
gh repo create armelle-mourier-site --public --source=. --remote=origin --push
```

## 2. Activer l'auto-merge du dépôt

```bash
gh repo edit --enable-auto-merge --enable-squash-merge --delete-branch-on-merge
```

## 3. Protéger `main` avec les checks obligatoires

Après un premier passage de la GitHub Action `validation`, appliquer le ruleset :

```bash
OWNER_REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
gh api --method POST "repos/$OWNER_REPO/rulesets" --input .github/repository-ruleset-main.json
```

Le check requis s'appelle `validation`, comme le job du workflow `.github/workflows/ci.yml`.

## 4. Auto-merge pour Claude

Le workflow `.github/workflows/claude-auto-merge.yml` active l'auto-merge uniquement si la PR :
- vient d'un acteur dont le login contient `claude`, ou
- contient `[claude]` dans le titre, ou
- porte le label `claude-auto-merge`.

L'auto-merge ne contourne pas la protection : GitHub ne fusionne que lorsque tous les checks requis sont au vert.

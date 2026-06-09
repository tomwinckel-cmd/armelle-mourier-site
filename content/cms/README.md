# content/cms — préparation Decap (NON utilisé par le site pour l'instant)

⚠️ **Ces fichiers sont une PRÉPARATION.** Le site public **ne les lit pas
encore** : la source de vérité reste, aujourd'hui, les fichiers TypeScript
(`src/data/*.ts`, `src/content/*.ts`).

## Pourquoi ce dossier ?

Decap CMS édite naturellement du **YAML / JSON / Markdown**. On prépare donc ici
le futur format éditable, **sans migrer brutalement** le site. Cela permet à
Decap d'avoir des collections cohérentes dès maintenant, tout en gardant le site
public **intact et fonctionnel**.

## Structure

```
content/cms/
├── artworks/        → une œuvre = un fichier .md (frontmatter + description)
├── exhibitions/     → une exposition = un fichier .md
├── pages/           → textes éditoriaux (accueil, bio, démarche, Bleu Cendres, contact)
└── settings/        → réglages (site.yml, shop.yml, social.yml, theme.yml)
```

## Stratégie de transition (TypeScript → contenus Decap)

1. **Aujourd'hui (Phase 2A)** : Decap écrit dans `content/cms/…`. Le site lit
   toujours `src/data` / `src/content`. **Deux mondes séparés, aucun risque.**
2. **Phase 2B (collection pilote)** : on choisit UNE collection (ex. *Œuvres*),
   on fait lire au site les fichiers `content/cms/artworks/*.md` (via un petit
   chargeur dans `artworks.ts` ou une content collection Astro), et on retire la
   liste TypeScript correspondante. On valide le cycle complet sur cette seule
   collection.
3. **Phases suivantes** : on migre les autres collections une à une, chacune dans
   sa propre PR, en gardant toujours le site déployable.

> Règle d'or : **une seule source de vérité par donnée à la fois.** Tant qu'une
> collection n'est pas migrée, son `content/cms/…` reste un exemple/préparation
> documenté, pas la source active.

## Sécurité

Aucun secret, token, clé API ou mot de passe ici (ni ailleurs dans le repo).
Les clés (Cloudinary, auth) vivront dans les **Variables Netlify/Vercel**.

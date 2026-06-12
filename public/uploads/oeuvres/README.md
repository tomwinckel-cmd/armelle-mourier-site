# Photos des œuvres — dossier d'upload

Les images ajoutées **depuis l'admin** (`/admin` → Œuvres → champ « Photo
principale » ou « Galerie ») sont déposées **ici**, dans
`public/uploads/oeuvres/`, et servies depuis l'URL `/uploads/oeuvres/<fichier>`.

On peut aussi y déposer une image **à la main** (glisser le fichier dans ce
dossier), puis renseigner le chemin dans le fichier de l'œuvre, par exemple :

```json
"image": "/uploads/oeuvres/renaissance.webp"
```

## Conseils

- **Formats** : `.webp` (recommandé), `.jpg` ou `.png`.
- **Poids** : viser < 400 Ko par image (le site n'optimise pas pour vous en V1).
- **Nom de fichier** : lettres minuscules et tirets, sans accent ni espace
  (ex. `bleu-renaissance.webp`).
- **Texte alternatif** : toujours renseigner le champ « Description de l'image »
  de l'œuvre (accessibilité + référencement).

> Aucune image lourde « pleine résolution » ne doit être publiée ici :
> garder les fichiers HD en privé (voir `docs/ip-protection-artist.md`).

# Expositions — un fichier par exposition

Chaque fichier `<id>.json` décrit une exposition, une résidence, une performance
ou un événement. Ils se modifient depuis l'admin (**Expositions**) ou à la main.

Champs utiles :
- `title` — titre ou nom de l'événement (obligatoire) ;
- `startDate` — `AAAA-MM-JJ` (ou `AAAA-MM` si le jour est inconnu) ;
- `endDate` — facultatif, même format ;
- `type` — `solo`, `group`, `residence`, `performance` ou `event` ;
- `location`, `city`, `description` — facultatifs.

Calculés automatiquement s'ils sont vides : `dateLabel` (date affichée), `year`, `id`.
Les dates futures apparaissent seules dans « À venir ».

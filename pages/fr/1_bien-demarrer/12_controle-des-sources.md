# Utiliser la gestion de versions

Le gestion des versions vous permet de créer des points de contrôle dans votre projet, de comparer d'anciennes révisions avec de nouvelles ainsi que de sauvegarder votre travail sur un hôte distant tel que [GitHub](https://github.com/) ou [Bitbucket](https://bitbucket.org/).

Les projets Superpowers peuvent être aisément maintenus via une [gestion des versions](https://fr.wikipedia.org/wiki/Gestion_de_versions). Bien qu'il n'y ait pas de support intégré pour le moment, des outils existants comme Git ou Mercurial fonctionnent parfaitement.

<div class="note">
  <b>Consultez "Terminaisons de ligne et Git"</b> plus bas si vous rencontrez des problèmes d'édition des scripts avec Git sur Windows.
</div>

## Délai lors des modifications

De façon à minimiser son impact sur les performances, le serveur Superpowers n'écrit pas immédiatement sur le disque tous les changements que vous faites à un projet. L'enregistrement sur le disque peut être retardé d'une durée allant jusqu'à 60 secondes.

Lorsque vous créez une nouvelle révision pour votre projet, vous pouvez soit attendre 60 secondes, soit arrêter votre serveur afin de vous assurer que tout a été correctement inscrit sur le disque (nous ajouterons probablement un bouton à l'appli dans cette optique à un moment donné).

## Que ne faut-il pas mettre dans la gestion des versions ?

Il y a certains fichiers que vous ne voudrez sans doute pas commiter sur votre dépôt :

  * `internals.json` change tout le temps et peut être reconstruit automatiquement
  * Le répertoire `rooms/` contient votre historique de chat récent
  * `members.json` contient les informations des membres du projet que vous voudrez, ou non, conserver

Vous pouvez utiliser un fichier `.gitignore` ou `.hgignore` pour les ignorer.

## Terminaisons de ligne et Git

Quand vous utilisez Git sur Windows avec l'option `core.autocrlf` initialisée à `true`, vous devrez commiter un fichier `.gitattributes` à la racine de votre projet avec le contenu suivant :

```
*.txt text eol=lf
```

Cela empèchera Git de jouer avec les terminaisons de ligne automatiquement, ce qui pourrait causer des soucis lors de l'édition de vos scripts.

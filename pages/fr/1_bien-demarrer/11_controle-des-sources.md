# Utiliser la gestion de versions

La [gestion des versions](https://fr.wikipedia.org/wiki/Gestion_de_versions) permet de créer des points de contrôle dans votre projet, de comparer d'anciennes révisions avec de nouvelles ainsi que de sauvegarder votre travail sur un service tel que [GitHub](https://github.com/) ou [Bitbucket](https://bitbucket.org/).

Les projets Superpowers sont bien adaptés pour être utilisés avec un outil de gestion de versions. Bien qu'il n'y ait pas de support intégré pour le moment, des outils existants comme Git ou Mercurial fonctionnent parfaitement.

<div class="note">
  <b>Consultez "Fins de ligne et Git"</b> plus bas si vous rencontrez des problèmes d'édition des scripts avec Git sur Windows.
</div>

## Délai lors des modifications

De façon à minimiser son impact sur les performances, le serveur Superpowers n'écrit pas immédiatement sur le disque tous les changements que vous faites à un projet. L'écriture sur le disque peut avoir un délai allant jusqu'à 60 secondes.

Lorsque vous créez une nouvelle révision pour votre projet, vous pouvez soit attendre 60 secondes, soit arrêter votre serveur afin de vous assurer que tout a été correctement écrit sur le disque (nous ajouterons probablement à terme un bouton pour forcer la sauvegarde sur le disque).

## Fichiers à ne pas versionner

Il y a quelques répertoires que vous ne voudrez sans doute pas sauvegarder dans votre dépôt :

  * Le répertoire `rooms/` contient votre historique de chat récent
  * Le répertoire `trashedAssets/` contient les assets supprimés

Vous pouvez utiliser un fichier `.gitignore` ou `.hgignore` pour les ignorer.

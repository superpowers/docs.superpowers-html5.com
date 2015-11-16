# Préfabs et instanciation

Les jeux ont souvent des projectiles, des entités ou des bonus en tout genre qui sont créés 
("instanciés", comme on dit en programmation) et détruits à de nombreuses reprises.

Ils peuvent être constitués d'une hiérarchie d'acteurs complexe, ou simplement avoir plusieurs composants.
Plutôt que de les construire en code, vous pouvez utiliser des scènes comme éléments préfabriqués réutilisables ("préfabs").

## Instancier le contenu d'une scène

Vous pouvez utiliser `Sup.appendScene("Scene Asset")` pour ajouter tous les acteurs décrits dans une scène au plateau de jeu.
Les acteurs existants ne seront pas supprimés.

<div class="note">
  **Dans les coulisses**, un appel à `Sup.loadScene(...)` équivaut à utiliser `Sup.destroyAllActors()` suivi de `Sup.appendScene(...)`.
</div>

Vous pouvez ajouter une scène autant de fois que vous voulez, et optionnellement spécifier un acteur parent en second argument.

## Utiliser les préfabs dans l'éditeur de scène

Il y a un bouton `New Prefab` à coté du bouton `New Actor` dans l'éditeur de scène.
Il vous permet d'attacher d'autres scènes à votre scène courante.

<div class="note">
  **Les préfabs fonctionnent même de manière récursive**, vous pouvez donc avoir une scène référençant une seconde,
  qui elle même en référençe une troisième et ainsi de suite... Superpowers interdit automatiquement les références circulaires.
</div>

Pour qu'une scène soit utilisable comme préfab, elle doit n'avoir qu'un seul acteur à sa racine.
Lorsqu'elle est utilisée dans une autre scène, le nom de l'acteur sera remplacé par celui du préfab.
Par exemple, vous pouvez avoir une scène nommée `Bonus de santé` avec un acteur nommé `Bonus Actor`, et
l'utiliser en tant que préfab avec un nom tel que `Bonus de santé secret`, `Bonus de santé 3`, etc.

<div class="note">
  **Les composants des acteurs d'un préfab seront personnalisables** dans une version future.
  Pour l'instant, vous pouvez obtenir le nom du préfab (en utilisant `Sup.Actor.getName()`) dans un comportement pour y appliquer des paramètres personnalisés.
  C'est pas l'idéal, mais c'est mieux que rien !
</div>
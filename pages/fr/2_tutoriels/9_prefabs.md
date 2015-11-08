# Prefabs et instanciation

Les jeux ont souvent des projectiles, des entités ou des bonus en tout genre qui sont créés 
("instanciés" en language de programation) et détruits à de nombreuses reprises.

Ils peuvent être constitués d'une hiérarchie d'acteurs complexe, ou simplement plusieurs composants.
Afin d'éviter de les construire dans le code, vous pouvez utiliser des assets préfabriqués (Prefab) réutilisables.

## Instanciation des contenus de la scène

Vous pouvez utiliser `Sup.appendScene("Scene Asset")` pour ajouter à la scène courant tous les acteurs décrits dans une autre.
Les acteurs existants ne seront pas supprimés.

<div class="note">
  **Under the hood**, `Sup.loadScene(...)` équivaut à utiliser `Sup.destroyAllActors()` suivi de `Sup.appendScene(...)`.
</div>

Vous pouvez ajouter une scène autant de fois que vous voulez, et optionnelement spécifier un acteur parent en second argument.

## Utiliser les prefabs dans l'éditeur de scène

Il y a un bouton `New Prefab` à coté du bouton `New Actor` dans l'éditeur de scène.
Il vous permet d'attacher d'autres scènes dans votre scène courante.

<div class="note">
  **Les Prefabs fonctionnent de manière récursive**, vous pouvez donc avoir une scène référençant une seconde,
  elle même référençant une troisième et ainsi de suite... Superpowers évite automatiquement les références circulaires.
</div>

Pour qu'une scène soit utilisable comme prefab, elle doit n'avoir qu'un seul acteur à sa racine.
Lorsqu'elle est utilisée dans une autre scène, le nom de l'acteur sera remplacé par celui du prefab.
Par exemple, vous pouvez avoir une scène nommée `Bonus de santé` avec un acteur nommé `Bonus Actor`, et
l'utiliser en tant que prefab avec un nom tel que `Bonus de santé secret`, `Bonus de santé 3` et caetera.

<div class="note">
  **Les composants des acteurs d'un préfab seront personnalisable** dans une future version.
  Pour l'instant, vous pouvez obtenir le nom du prefab (en utilisant `Sup.Actor.getName()`) dans un comportement (behavior) pour y appliquer des paramètres personnalisés.
  Ce n'est pas idéal mais c'est mieux que rien !
</div>
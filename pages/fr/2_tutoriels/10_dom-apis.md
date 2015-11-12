# Utiliser les APIs du DOM

## Pourquoi Superpowers n'expose pas les APIs du DOM par défaut ?

Les APIs du DOM sont les fonctions standard disponibles pour les scripts dans un navigateur Web.
Elles incluent les objets `window`, `document`, `XMLHttpRequest` et beaucoup d'autres choses.

On a décidé de protéger les jeux Superpowers de toutes ces choses par défaut pour deux raisons :

 * Premièrement, car Superpowers fournit des alternatives haut niveaux qui sont plus simples à utiliser et qui fonctionnent bien ensemble.
   Par exemple, Superpowers founri l'API `Sup.Storage` pour remplacer l'API `window.localStorage` du DOM.

 * Deuxièmement, car cela laisse la porte ouverte à, un jour, fournir un runtime alternatif qui n'implique pas un contexte de navigateur Web.
   Il pourrait y avoir un player natif optimisé, par exemple. Ce n'est pas quelque chose qu'on cherche à faire activement cela dit.

## Comment les utiliser quand même

La bonne nouvelle est que vous pouvez toujours choisir d'acceder au DOM si vous le désirez.  
Vous avez juste à ajouter un unique `declare var window;` au tout début de votre premier script et ensuite vous pouvez utiliser les APIs non typées avec `new window.XMLHttpRequest(...);` par exemple.

Si vous les utilisez beaucoup, avoir une vérification du typage correct peut être utile.  
Heureusement, Florent Poujol a écrit un [Plugin de DOM pour SuperPowers](https://github.com/florentpoujol/superpowers-dom-plugin)
qui va exposer toute l'API typée pour vous.

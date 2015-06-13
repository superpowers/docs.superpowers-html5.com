# Déboguer votre jeu

Quand vous utilisez Superpowers depuis l'application, vous pouvez ouvrir les outils de débogguage en cliquant sur le bouton `Debug game` (ou en appuyant sur `F6`). La plupart des navigateurs vous permettes d'ouvrir des outils similaire en appuyant sur `F12` quand le jeu se lance.

Depuis que l'application Superpowers utilise NW.js, qui est basé sur le moteur de Chrome, les outils de débogage sont les même que sur Chrome.

Les deux onglets principaux que vous utiliserez sont :

 * L'onglet `Console`, qui vous fournit les erreurs d'éxecution et le résultat de tous les appels a `Sup.log`.

 * L'onglet `Sources`, est l'endroit où vous pouvez trouver tous vos scripts et l'ensemble du moteur.

## Déboguer et inspecter l'état de votre jeu

<div class="note">
  <p>Regardez [cette présentation des outils de développement de Chrome](https://developer.chrome.com/devtools) et aussi [cette introduction au débogage Javascript](https://developer.chrome.com/devtools/docs/javascript-debugging). Alors que Superpowers utilise actuellement TypeScript, qui est une surcouche de Javascript, la plupart des informations peuvent être appliqué.
</div>

Avec le Débogueur ouvert, vous pouvez utiliser `Ctrl+P` et taper le nom d'un de vos script pour y aller directement. [Placer un point d'arrêt](https://developer.chrome.com/devtools/docs/javascript-debugging#add-remove-breakpoints) dans la méthode `update` de votre comportement par exemple, et votre jeu va s'arrêter dés qu'il atteindra a nouveau cette ligne.

Quand votre point d'arrêt est atteint, le panneau de droite vous montre le `Call Stack` (qui vous montre comment votre jeu a atteint la méthode actuelle) et aussi `Scope Variables`, qui vous permet de voir le contenue de toutes les variable actuellement accessible.

`F10` vous permet de voir une instruction à la fois (utile si vous voulez inspecter les détails d'une fonction étape par étape), et `F8` va reprendre l'éxecution de votre jeu.

Vous pouvez aussi [activer "Pause on uncaught exceptions"](https://developer.chrome.com/devtools/docs/javascript-debugging#pause-on-uncaught-exceptions) cela va permettre à votre jeu de s'arrêter automatiquement a la ligne où il y a eu une erreur d'éxecution et cela vous permettra d'inspecter le call stack et l'état du programme. Cela n'a effet que si le débogueur est ouvert.

# Déboguer votre jeu

Quand vous utilisez Superpowers depuis l'application, vous pouvez ouvrir les outils de débogage en cliquant sur le bouton `Debug game` (ou en appuyant sur `F6`). La plupart des navigateurs vous permettent d'ouvrir des outils similaires en appuyant sur `F12` pendant que le jeu tourne.

Comme l'application Superpowers utilise NW.js, qui est basé sur le moteur de Chrome, les outils de débogage sont les même que sur Chrome.

Les deux onglets principaux que vous utiliserez sont :

 * L'onglet `Console`, qui vous fournit les erreurs d'éxecution et le résultat de tous les appels a `Sup.log`.

 * L'onglet `Sources`, est l'endroit où vous pouvez trouver tous vos scripts et l'ensemble du moteur.

## Déboguer et inspecter l'état de votre jeu

<div class="note">
  <p>Regardez [cette présentation des outils de développement de Chrome](https://developer.chrome.com/devtools) et aussi [cette introduction au débogage JavaScript](https://developer.chrome.com/devtools/docs/javascript-debugging). Bien que Superpowers utilise en réalité TypeScript, c'est un surensemble de JavaScript donc la plupart des informations peuvent être appliqué.
</div>

Avec le débogueur ouvert, vous pouvez utiliser `Ctrl+P` et taper le nom d'un de vos scripts pour y aller directement. [Placez un point d'arrêt](https://developer.chrome.com/devtools/docs/javascript-debugging#add-remove-breakpoints) dans la méthode `update` de votre comportement par exemple, et votre jeu s'arrêtera dés qu'il atteindra a nouveau cette ligne.

Quand votre point d'arrêt est atteint, le panneau de droite vous montre la pile d'appel (`Call Stack`) (qui vous montre comment votre jeu a atteint la méthode actuelle) et aussi le contenue des variables actuellement accessibles (`Scope Variables`).

`F10` vous permet de voir une instruction à la fois (utile si vous voulez inspecter les détails d'une fonction étape par étape), et `F8` reprendre l'éxecution de votre jeu.

Vous pouvez aussi [activer "Pause on uncaught exceptions"](https://developer.chrome.com/devtools/docs/javascript-debugging#pause-on-uncaught-exceptions) pour que votre jeu s'arrêter automatiquement a la ligne où une erreur d'éxecution est rencontrée et cela vous permettra d'inspecter la pile d'appel et l'état du programme. Cela n'a effet que si le débogueur est ouvert.

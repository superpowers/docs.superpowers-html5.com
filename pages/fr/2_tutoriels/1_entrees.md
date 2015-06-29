# Clavier, souris, manettes...

Toutes les fonctions liées aux entrées utilisateur peuvent être trouvées dans l'espace de nom `Sup.Input`.

## Vérifier si une touche a été pressée

Vous pouvez passer les valeurs spéciales `"ANY"` et `"NONE"` à `Sup.Input.wasKeyJustPressed()` (et d'autres fonctions similaires) pour savoir si respectivement n'importe quelle touche ou aucune touche (n')a été pressée lors de la dernière image du jeu.

La liste complète des noms de touche peut être trouvée dans le navigateur d'API TypeScript, situé dans Superpowers.

## Utiliser les manettes

L'API Web présente quelques bizarreries, émanantes du fait que le navigateur ne doit pas donner trop de contrôle ou d'informations à des sites web rencontrés au hasard. Par exemple, pour éviter l'identification d'un utilisateur, le Web ne vous laisse pas lister toutes les manettes connectées. Vous devrez demander à l'utilisateur d'appuyer sur un bouton pour utiliser sa manette.

Vous pouvez utiliser le [testeur de manette de HTML5 Rocks](http://www.html5rocks.com/en/tutorials/doodles/gamepad/gamepad-tester/tester.html) pour connaître la façon dont les boutons de la manette sont liés à des indices.

## Coordonnées de la souris

`Sup.Input.getMousePosition()` retourne les coordonnées `x` et `y` normalisées (amplitude de `-1` à `1`), avec `y` augmentant lorsque la souris bouge vers le haut.

Si vous avez besoin des coordonnées en pixel, vous pouvez utiliser la portion de code suivante pour la conversion:

```
let { x, y } = Sup.Input.getMousePosition();

x = (x + 1) / 2 * Sup.Input.getScreenSize().x;
y = (1 - (y + 1) / 2) * Sup.Input.getScreenSize().y;
```

Téléchargez [le projet exemple](https://bitbucket.org/sparklinlabs/superpowers-mouse-pixels/) pour une démonstration.

## Verrouiller la souris et passer en plein-écran

`Sup.Input.lockMouse()` vous permet de désactiver le pointeur de la souris. C'est parfait pour les jeux de tir en vue subjective, aux mouvements de caméra liés à la souris.

`Sup.Input.goFullscreen()` peut être utilisée pour passer en plein-écran.

Comme pour les manettes, pour des raisons de sécurité, un jeu Web ne peut pas verrouiller le pointeur de la souris ou passer en plein-écran à volonté, mais seulement via la gestion d'un événement clic de souris, ou autre entrée utilisateur similaire. Superpowers enlève ces limitations de votre jeu en vous permettant d'appeler `.lockMouse()` et `.goFullscreen()` à n'importe quel moment, mais sachez que l'action en elle-même sera retardée jusqu'à ce qu'un bouton de la souris soit pressé ou relâché.

Un modèle utile consiste à paramétrer le verrouillage de la souris ou le plein-écran lorsqu'un bouton de la souris a été pressé, et l'action sera effectivement exécutée par Superpowers dans son gestionnaire interne de l'événement lâché de bouton de souris :

```
if (Sup.Input.wasMouseButtonJustPressed(0)) {
  Sup.Input.lockMouse();
}
```

Dans le navigateur, le joueur peut également quitter le plein-écran ou déverrouiller le pointeur de la souris à tout moment en appuyant sur `Échap`. Superpowers va automatiquement reverrouiller la souris et/ou revenir en plein-écran aussitôt que l'utilisateur clique dans le jeu, et ce jusqu'à ce que vous appeliez explicitement `Sup.unlockMouse()` et/ou `Sup.exitFullscreen()`.

Vous pourrez vouloir mettre le jeu en pause lorsque le verrouillage de la souris ou le plein-écran a été suspendu.
Pour réaliser cela, vous pouvez utiliser un gestionnaire d'événement (handler) tel que celui-ci :

```
class MyBehavior extends Sup.Behavior {

  awake() {
    Sup.Input.on("mouseLockStateChange", this.onLockChange);
    // Pour surveiller le plein-écran, l'événement serait "fullscreenStateChange" à la place
  }

  onDestroy() {
    // Il est important que vous effaciez vos gestionnaires d'événements
    // lorsque le comportement est détruit (ce qui arrive
    // lorsque l'on change de scène par exemple), autrement,
    // cela pourrait mener à des fuites de mémoire ou des erreurs
    Sup.Input.off("mouseLockStateChange", this.onLockChange);
  }

  onLockChange(state) {
    if (state === "suspended") {
      // Le verrouillage a été suspendu
      // ... Mettre le jeu en pause ...
    } else {
      // Le verrouillage a été repris (l'état est "active")
      // ... Reprendre le jeu ...
    }
  }

}
Sup.registerBehavior(MyBehavior);
```

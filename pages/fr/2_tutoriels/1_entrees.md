# Clavier, souris, manettes...

Toutes les fonctions liées aux entrées utilisateur peuvent être trouvées dans l'espace de nom `Sup.Input`.

## Vérifier si une touche a été pressée

Vous pouvez passer les valeurs spéciales `"ANY"` et `"NONE"` à `Sup.Input.wasKeyJustPressed()` (et fonctions similaires) pour savoir, respectivement, si n'importe quelle touche ou aucune touche n'a été pressée lors de la dernière image du jeu.

La liste complète des noms de touche peut être trouvée dans le navigateur d'API TypeScript, situé dans Superpowers.

## Utiliser les manettes

Les APIs Web présentent quelques bizarreries, émanant du fait que le navigateur ne doit pas donner trop de contrôle ou d'informations à des sites Web quelconques. Par exemple, pour éviter de faciliter l'identification d'un utilisateur, les navigateurs ne permettent pas de lister toutes les manettes connectées. Vous devrez demander à l'utilisateur d'appuyer sur un bouton pour utiliser sa manette.

Vous pouvez utiliser [l'outil de test de manette de HTML5 Rocks](http://www.html5rocks.com/en/tutorials/doodles/gamepad/gamepad-tester/tester.html) pour voir les indices associés à chaque bouton d'une manette.

## Coordonnées de la souris

`Sup.Input.getMousePosition()` retourne les coordonnées `x` et `y` normalisées (entre `-1` et `1`), avec `y` qui augmente lorsque la souris bouge vers le haut.

Si vous avez besoin des coordonnées en pixel, vous pouvez utiliser le code suivant pour faire la conversion :

```
let { x, y } = Sup.Input.getMousePosition();

x = (x + 1) / 2 * Sup.Input.getScreenSize().x;
y = (1 - (y + 1) / 2) * Sup.Input.getScreenSize().y;
```

Téléchargez [le projet exemple](https://bitbucket.org/sparklinlabs/superpowers-mouse-pixels/) pour une démonstration.

## Verrouiller la souris et passer en plein écran

`Sup.Input.lockMouse()` vous permet de désactiver le pointeur de la souris. C'est parfait pour les jeux de tir en vue subjective où l'on contrôle l'orientation de la caméra avec la souris.

`Sup.Input.goFullscreen()` peut être utilisée pour passer en plein écran.

Comme pour les manettes, pour des raisons de sécurité, un jeu Web ne peut pas verrouiller le pointeur de la souris ou passer en plein écran à volonté, mais seulement en réponse à un événement clic de souris, ou autre interaction similaire. Superpowers s'occupe de gérer ces limitations pour vous et vous permet d'appeler `.lockMouse()` et `.goFullscreen()` à n'importe quel moment, mais sachez que l'action en elle-même sera retardée jusqu'à ce qu'un bouton de la souris soit pressé ou relâché.

Une bonne façon de procéder consiste à activer le verrouillage de la souris ou le plein écran lorsqu'un bouton de la souris vient d'être enfoncé. Le changement sera en réalité exécuté par Superpowers quand le bouton est relâché un instant plus tard.

```
if (Sup.Input.wasMouseButtonJustPressed(0)) {
  Sup.Input.lockMouse();
}
```

Dans le navigateur, le joueur peut également quitter le plein écran ou déverrouiller le pointeur de la souris à tout moment en appuyant sur `Échap`. Superpowers reverrouillera automatiquement la souris et/ou repassera en plein écran dès que l'utilisateur clique dans la fenêtre de jeu, et ce jusqu'à ce que vous appeliez explicitement `Sup.unlockMouse()` et/ou `Sup.exitFullscreen()`.

Vous voudrez sans doute mettre le jeu en pause lorsque le verrouillage de la souris ou le plein écran a été suspendu.
Pour réaliser cela, vous pouvez utiliser un gestionnaire d'événement comme suit :

```
class MyBehavior extends Sup.Behavior {

  awake() {
    Sup.Input.on("mouseLockStateChange", this.onLockChange);
    // Pour surveiller le plein écran, l'événement serait "fullscreenStateChange" à la place
  }

  onDestroy() {
    // Il est important que vous nettoyiez vos gestionnaires d'événements
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
      // Le verrouillage a été repris (state a pour valeur "active")
      // ... Reprendre le jeu ...
    }
  }

}
Sup.registerBehavior(MyBehavior);
```

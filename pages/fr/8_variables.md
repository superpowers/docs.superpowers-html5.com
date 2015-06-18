# Manipuler des états

Les variables vous permettent de stocker, lire ou changer des données pendant que votre jeu est lancé. Elle peuvent être utilisées pour stocker dans quel niveau le joueur est, combien de vie un monstre possède, la vitesse d'un objet, quels items sont dans l'inventaire d'une personnage ou vraiment n'importe quoi d'autre.

Vous pouvez déclarer et initialiser une variable globale à la racine d'un script :

```
// Niveau actuel
let currentLevel  = 1;
```

Quand un événement a lieu, vous pouvez incrémenter la valeur :

```
// ... Quand le joueur atteint la sortie ...
currentLevel++;
Sup.loadScene("Level" + currentLevel);
```

Quand vous déclarez une variable dans une fonction, elle n'existe que pendant que cette fonction s'exécute :

```
function doSomething() {
	let i = 0;
	i++;
	// `i` est maintenant égal à 1
}
```

Peu importe combien de fois vous appelez `doSomething`, la variable `i` sera initialisée à `0` puis incrémentée à `1`. Elle n'ira pas plus haut.

De même, si une variable déclarée dans une fonction existe seulement pendant que cette fonction est executée, vous ne pouvez pas l'utiliser dans une autre fonction.

```
class MyClass {

	doSomething() {
    let i = 0;
  }

  doSomethingElse() {
    // Essayer d'accéder à `i` ici renverrait une erreur.
    // Il n'y a pas de variable `i` dans le contexte de `doSomethingElse()`.
  }
}
```

Afin de maintenir des états associés à un comportement particulier (la vie d'un personnage par exemple), vous pouvez utiliser des variables membres.

```
class MyBehavior extends Sup.Behavior {

  // Les variables membres doivent être déclarées sans utiliser le mot clé `let`,
  // directement dans la classe :
  health = 100;

  takeDamage(amount) {
    // Les variables membres sont initialisées quand le comportement est créé.
    // Vous pouvez accéder au comportement lui-même et à ses variables membres avec `this`.
    this.health -= amount;
    if (this.health <= 0) {
      // Il est mort !
      this.actor.destroy();
    }
  }

}
Sup.registerBehavior(MyBehavior);
```

## Personnalisation des propriétés de comportements

Quand vous ajoutez un comportement à un acteur dans une scène, vous pouvez personnaliser les valeurs initiales de ses variables membres, permettant de créer des personnages avec différentes vitesses, points de vie, etc.

Vous pouvez réaliser la même chose en script en passant un objet en second paramètre de `Sup.Actor.addBehavior`.

```
let collectedPoints = 0;

class BonusBehavior extends Sup.Behavior {

  // Un bonus donne 10 points par défaut.
  points = 10;

  ramasser() {
    // Cette méthode doit être appelée par notre joueur quand il rencontre un bonus
    collectedPoints += this.points;
    this.actor.destroy();
  }

}
Sup.registerBehavior(BonusBehavior);

let bigBonusActor = new Sup.Actor("Gros Bonus");
// ... ici on rajoutait probablement un rendu de sprite ou de modèle ...

// C'est un gros bonus, donc nous remplaçons la valeur de points par défaut avec 50.
bigBonusActor.addBehavior(BonusBehavior, { points : 50 });
```

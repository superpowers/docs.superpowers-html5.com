# Manipuler des états

Les variables vous permettent de stocker, lire ou changer des données pendant que votre jeu est lancé. Elle peuvent être utilisées pour stocker dans quel niveau le joueur est, combien de health un monstre possède, la vitesse d'un objet, quel objets sont dans l'inventaire du personnage ou vraiment n'importe quoi d'autre.

Vous pouvez déclarer et initialiser une variable globale à la racine d'un script :

```
let currentLevel  = 1;
```

Quand un évenement a lieu, vous pouvez incrémenter la valeur :

```
// ... Quand le joueur atteint la sortie ...
currentLevel++;
Sup.loadScene("Level" + currentLevel);
```

Quand vous déclarez une variable dans une fonction, elle n'existe seulement quand la fonction s'exécute :

```
function doSomething() {
	let i = 0;
	i++;
	// `i` est maintenant égal à 1
}
```

Peu importe combien de fois vous appelez `doSomething`, la variable `i` sera initialisée à `0` puis incrémentée à `1`. Elle n'ira pas plus haut.

De même, si une variable déclarée dans une fonction existe seulement pendant que cette fonction est executée, vous ne pouvez l'utiliser dans une autre fonction.

```
class MyClass {

	doSomething() {
    let i = 0;
  }

  doSomethingElse() {
    // Essayer d'utiliser `i` ici renverrait une erreur.
    // Il n'y a pas de variable `i` dans le contexte de `doSomethingElse()`.
  }
}
```

Afin de garder des états associés à un comportement particulier (comme, la vie d'un personnage), vous pouvez utiliser des variables membres.

```
class MyBehavior extends Sup.Behavior {

  // Les variables de membres doivent être déclarées sans utiliser le mot clé `let`,
  // directement dans la classe :
  health = 100;

  takeDamage(amount) {
    // Les variables membres sont initialisées quand les comportement sont initialisés
    // Vous pouvez accéder au comportement lui même et à ses variables membres avec `this`.
    this.health -= amount;
    if (this.health <= 0) {
      // Meurt!
      this.actor.destroy();
    }
  }

}
Sup.registerBehavior(MyBehavior);
```

## Personnalisation des propriétés de comportements

Quand vous ajoutez un comportement à un acteur dans une scène, vous pouvez personnaliser les valeurs initiales pour ses variables membres, permettant de créer des personnages avec des vitesses, health, etc différentes.

Vous pouvez réaliser la même chose en passant un objet en second paramètre de `Sup.Actor.addBehavior`.

```
let pointsCollectes = 0;

class ComportementBonus extends Sup.Behavior {

  // Un bonus donne 10 points par défaut.
  points = 10;

  ramasser() {
    // Cette méthode doit être appelée par notre joueur quand il rencontre un bonus
    pointsCollectes += this.points;
    this.actor.destroy();
  }

}
Sup.registerBehavior(ComportementBonus);

let acteurGrosBonus = new Sup.Actor("Gros Bonus");
// ... initialisation d'un gestionnaire de sprite, de model ...

// C'est un gros bonus, donc nous écrasons la valeur par defaut pour qu'elle soit égale à 50.
acteurGrosBonus.addBehavior(ComportementBonus, { points : 50 });
```

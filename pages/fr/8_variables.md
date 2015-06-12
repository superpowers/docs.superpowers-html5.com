# Manipulation de données

Les variables vous permettent de stocker, lire ou changer des données pendant que votre jeu est lancé. Elle peuvent être utilisées pour stocker dans quel niveau le joueur est, combien de vie un monstre possède, la vitesse d'un objet, quel objets sont dans l'inventaire du personnage ou vraiment n'importe quoi d'autre.

Vous pouvez déclarer et initialiser une variable globale à la racine d'un script:

```
let niveauActuel  = 1;
``` 

Quand un évenement a lieu, vous pouvez incrémenter la valeur:

```
// ... Quand le joueur atteind la sortie ...
niveauActuel++;
Sup.loadScene("Niveau"+niveauActuel);
```

Quand vous déclarer une variable dans une fonction, elle n'existe seulement quand la fonction est éxecutée:

```
function faireQuelquechose() {
	let i = 0;
	i++;
	// `i` est maintenant égal à 1
}
```

Le nombre de fois que vous appelez `faireQuelquechose` n'a pas d'importance, `i` sera remis à `0` et `1`, mais n'ira pas plus haut.

Réciproquement, si une variable déclaré dans une fonction existe seulement pendant que cette fonction est executé, vous ne pouvez l'utilisé dans une autre fonction.

```
class MaClasse {

  faireQuelquechose() {
    let i = 0;
  }

  faireQuelquechoseDAutre() {
    // Essayer d'utiliser `i` ici renvoyerai une erreur.
    // Il n'y a pas de variable `i` dans le contexte de `faireQuelquechoseDAutre()`.
  }
}
```

Afin de maintenir les données liés à un comportement particulier (comme, une vie de personnage), vous pouvez utilisé les variables membres.

```
class MonComportement extends Sup.Behavior {

  // Les variables de membres doivent être déclaré sans utiliser le mot clé `let`,
  // directement dans la classe:
  vie = 100;

  takeDamage(let quantite) {
    // Les variables de membres sont initialisées quand les comportement sont initialisés
    // Vous pouvez accéder au comportement lui même et à ses variables membres avec `this`.
    this.vie -= quantite;
    if (this.vie <= 0) {
      // Meurt!
      this.actor.destroy();
    }
  }

}
Sup.registerBehavior(MonComportement);
```

## Customisation des propriétés de comportements

Quand vous ajoutez un comportement à un acteur dans une scène, vous pouvez customisé les valeurs initiales pour ses variables membres, permettant de créer des personnages avec des vitesses, vie, etc différentes.

Vous pouvez réaliser la même chose en passant un objet en second paramètres de `Sup.Actor.addBehavior`.

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
acteurGrosBonus.addBehavior(ComportementBonus, { points: 50 });
```

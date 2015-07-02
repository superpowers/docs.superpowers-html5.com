# Collision de base en 2D

La gestion de collision est souvent difficile à mettre en place.
Superpowers est fourni avec le plugin - ArcadePhysics2D - pour rendre les choses plus facile.

Il n'est pas parfait, mais fait très bien son travail et est très rapide à mettre en place lors d'un prototypage de jeu.

Le plugin ajoute un nouveau type de composant dans l'éditeur de scène qui vous propose deux types de corps:

## Corps de type Box

Le corps de type `Box` vous permet de définir une boîte avec une taille spécifique et un offset.

![](/images/collision-box.png)

Assurez-vous de décocher `Movable` pour que celui ci devienne statique.

## Corps de type Tile map

Le corps de type `Tile Map` vous permet définir la collision avec le tile map.

Par défaut, un tile non vide entrera en collision avec d'autres corps. Vous pouvez définir un nom de propriété dans le champ `Tile Set Property` afin de limiter les collisions aux tiles qui auront cette propriété particulière. Vous pouvez configurer ces propriétés de tile dans l'éditeur de Tile Set.

Vous pouvez également spécifier une liste de calques, séparés par des virgules, devant entrer en collision. Par exemple, vous pouvez définir le calque '0' comme calque de collision, ainsi les autres calques seront ignorés.

![](/images/collision-map.png)

## Utilisation des collisions

Pour que votre personnage puisse entrer en collision avec l'environnement, vous devez mettre le code suivant dans la fonction `update` du behavior de votre acteur:

```
Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
```

Le deuxième argument de la fonction est une liste de corps. Dans ce cas présent, nous utilisons tous les corps existant dans l'environnement, mais vous pouvez également conserver votre propre liste de corps.

Depuis la fonction `.collides` du ArcadePhysics2D, celui ci mettra à jour la position de votre acteur lors de la manipulation des collisions, vous ne pouvez en aucun cas le bouger par vous-même.

Au lieu de cela, obtenez la vélocité de votre corps avec `this.actor.arcadeBody2D.getVelocity()`, mettez à jour les valeurs `.x` et `.y` et appliquez les avec `this.actor.arcadeBody2D.setVelocity(...)`.

## Création d'un jeu de plateforme

<div class="action">
  Premièrement, nous devons mettre en place la gravité.
</div>

```
Sup.ArcadePhysics2D.setGravity(new Sup.Math.Vector3(0, -0.02, 0));
```

Assez simple, non ?


<div class="action">
  Afin de contrôler votre personnage, créer un script behavior appelé `Player Behavior`.
</div>

```
class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());

    // Comme expliqué ci-dessus, on obtient la vélocité du corps de notre acteur
    let velocity = this.actor.arcadeBody2D.getVelocity();

    //Nous redéfinissons la valeur `.x` basé sur l'appuie de la flêche gauche du clavier
    if (Sup.Input.isKeyDown("LEFT")) velocity.x = -this.speed;
    else if (Sup.Input.isKeyDown("RIGHT")) velocity.x = this.speed;
    else velocity.x = 0;

    // Si le joueur est sur le sol, et veut sauter,
    // nous mettons à jour la valeur `.y` en conséquence
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    if (touchBottom && Sup.Input.wasKeyJustPressed("UP")) velocity.y = this.jumpSpeed;

    // Et pour finir, nous appliquons la veclocité ainsi modifié a notre corps
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
```

`.getTouches()` renvoie les informations de contact pour chaque côté de la boite de collision du corps. Nous l'utilisons pour s'assurer que joueur est bien sur en contact avec le sol avant de le laisser sauter.

Vous pouvez [télécharger un projet de démonstration](https://bitbucket.org/sparklinlabs/superpowers-collison-demo) et l'essayer!
Il dispose d'une version améliorée du behavior, qui gère l'animation et l'orientation du joueur.

![](http://i.imgur.com/v4tWyIN.gif)

Plus de méthodes sont disponibles sur le composant `.arcadeBody2D`. Soyez sûr de vérifier le "TypeScript API browser" dans Superpowers.
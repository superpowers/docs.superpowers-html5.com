# Collision de base en 2D

La gestion de collision est souvent difficile à mettre en place.
Le plugin ArcadePhysics2D, fourni avec Superpowers, gère les cas les plus courants.

Ce n'est pas une solution parfaite à tous vos problèmes, mais il fait bien son travail et est très rapide à mettre en place, idéal quand vous prototypez un jeu.

Le plugin ajoute un nouveau type de composant dans l'éditeur de scène qui vous propose deux types de corps :

## Boite de collision

Le corps de type `Box` définit une boite avec une taille spécifique et un éventuel décalage par rapport à l'origine de l'acteur.

![](/images/2d-collision/collision-box.png)

Assurez-vous de décocher `Movable` pour les éléments de décor qui devraient être statiques.

## Collision avec les tile maps

Le corps de type `Tile Map` définit des collisions avec un tile map.

Par défaut, toute case (*tile*) non vide engendrera une collision avec d'autres corps. Vous pouvez spécifier un nom de propriété dans le champ `Tile Set Property` afin de limiter les collisions aux tiles qui auront cette propriété. Vous pouvez configurer ces propriétés pour chaque type de tile dans l'éditeur de tile set.

Vous pouvez également spécifier une liste de calques, séparés par des virgules, devant entrer en collision. Par exemple, vous pouvez définir le calque `0` comme calque de collision, et les autres calques seront ignorés.

![](/images/2d-collision/collision-map.png)

## Répondre aux collisions

Pour que votre personnage puisse entrer en collision avec l'environnement, placez le code suivant dans la fonction `update` d'un comportement attaché à votre acteur :

```
Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
```

Le deuxième argument de la fonction est une liste de corps. Dans cet exemple, nous utilisons tous les corps existant dans l'environnement, mais vous pouvez également construire votre propre liste de corps.

<div class="note">
  Comme la fonction `.collides` d'ArcadePhysics2D met à jour la position de votre acteur, **vous ne pouvez plus utiliser `.move` ou `.setPosition` directement**.

  Pour téléporter votre acteur, utilisez `this.actor.arcadeBody2D.warpPosition(...)`.
</div>

Au lieu de cela, récupérez la vélocité de votre corps avec `this.actor.arcadeBody2D.getVelocity()`, mettez à jour les composantes `.x` ou `.y` et appliquez le changement avec `this.actor.arcadeBody2D.setVelocity(...)`.

## Création d'un jeu de plateforme

<div class="action">
  Commençons par définir la gravité.
</div>

```
Sup.ArcadePhysics2D.setGravity(0, -0.02);
```

Assez simple, non ?

<div class="action">
  Afin de contrôler votre personnage, créer un script de comportement appelé `Player Behavior`.
</div>

```
class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());

    // Comme expliqué ci-dessus, on récupère la vélocité du corps de notre acteur
    let velocity = this.actor.arcadeBody2D.getVelocity();

    // On écrase la composante `.x` en fonction des entrées du joueur
    if (Sup.Input.isKeyDown("LEFT")) velocity.x = -this.speed;
    else if (Sup.Input.isKeyDown("RIGHT")) velocity.x = this.speed;
    else velocity.x = 0;

    // Si le joueur est sur le sol, et veut sauter,
    // nous mettons à jour la composante `.y` en conséquence
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    if (touchBottom && Sup.Input.wasKeyJustPressed("UP")) velocity.y = this.jumpSpeed;

    // Et pour finir, nous appliquons la velocité ainsi modifiée à notre corps
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
```

`.getTouches()` renvoie les informations de contact pour chaque côté de la boite de collision du corps. Nous l'utilisons pour confirmer que joueur est bien en contact avec le sol avant de le laisser sauter.

Vous pouvez [télécharger le projet de démonstration](https://bitbucket.org/sparklinlabs/superpowers-collision-demo) et l'essayer !
Il comporte une version améliorée du comportement ci-dessus, qui gère l'animation et l'orientation du joueur.

![](http://i.imgur.com/v4tWyIN.gif)

Plus de méthodes sont disponibles sur le composant `.arcadeBody2D`. Jetez un oeil dans le "TypeScript API browser" dans Superpowers pour les découvrir.

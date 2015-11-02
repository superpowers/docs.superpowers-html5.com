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

<div class="note">
  L'échelle de l'acteur n'est pas pris en compte. Vous devriez laisser l'échelle à 1 et utiliser le réglage `Pixels / unit` sur le tile map.
</div>

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

## Making it look nice

<div class="note">
  Le reste de cette page n'a pas encore été traduit. [Vous pouvez contribuer à sa traduction sur Bitbucket](https://bitbucket.org/superpowers/docs.sparklinlabs.com/src/tip/pages/fr/?at=default).
</div>

To make it look better, let's add some animations and flip the player's sprite based on the movement direction.

We'll use the `.setAnimation` and `.setHorizontalFlip` methods on the sprite renderer to do so.

```
class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());

    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();

    // We override the `.x` component based on the player's input
    if (Sup.Input.isKeyDown("LEFT")) {
      velocity.x = -this.speed;
      // When going left, we flip the sprite
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      velocity.x = this.speed;
      // When going right, we clear the flip
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else velocity.x = 0;

    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    if (touchBottom) {
      if (Sup.Input.wasKeyJustPressed("UP")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } else {
        // Here, we should play either "Idle" or "Run" depending on the horizontal speed
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else {
      // Here, we should play either "Jump" or "Fall" depending on the vertical speed
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }

    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
```

We choose the animation to play based on the velocity of the player and whether we are touching the ground or not.

## Going further

One thing you probably want to add now is one-way platforms: platforms that you can jump through from below.

To do so, we will start by making two groups of actors in the scene.

![](/images/2d-collision/scene.png)

We'll have a group for solid bodies, containing the map and the T-Rex, and another for our one-way platforms.
Here is what it looks like in code.

```
Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  solidBodies: Sup.ArcadePhysics2D.Body[] = [];
  platformBodies: Sup.ArcadePhysics2D.Body[] = [];

  awake() {
    // We get and store all the bodies in two arrays, one for each group
    let solidActors = Sup.getActor("Solids").getChildren();
    for (let solidActor of solidActors) this.solidBodies.push(solidActor.arcadeBody2D);
    let platformActors = Sup.getActor("Platforms").getChildren();
    for (let platformActor of platformActors) this.platformBodies.push(platformActor.arcadeBody2D);
  }

  update() {
    // First, we'll check for collision with solid bodies
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.solidBodies);
    let touchSolids = this.actor.arcadeBody2D.getTouches().bottom;
    let velocity = this.actor.arcadeBody2D.getVelocity();

    // Then we'll check for collision with one-way platforms,
    // ... but only when falling! That's the trick.
    let touchPlatforms = false;
    if (velocity.y < 0) {
      let position = this.actor.getLocalPosition();
      // We must change the size of the player body so only the feet are checked
      // To do so, we decrease the height of the body and adapt the offset
      this.actor.arcadeBody2D.setSize(1.5, 0.4);
      this.actor.arcadeBody2D.setOffset({ x: 0, y: 0.2 });
      // Then we override the body position using the current actor position
      this.actor.arcadeBody2D.warpPosition(position);

      // Now, check against every platform
      for (let platformBody of this.platformBodies) {
        Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, platformBody);
        if (this.actor.arcadeBody2D.getTouches().bottom) {
          touchPlatforms = true;
          velocity.y = 0;
          break;
        }
      }

      // Once done, reset the body to its full size
      position = this.actor.getLocalPosition();
      this.actor.arcadeBody2D.setSize(1.5, 1.8);
      this.actor.arcadeBody2D.setOffset({ x: 0, y: 0.9 });
      this.actor.arcadeBody2D.warpPosition(position);
    }

    // We override the velocity's `.x` component based on the player's input
    if (Sup.Input.isKeyDown("LEFT")) {
      velocity.x = -this.speed;
      // When going left, we have to flip the sprite
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      velocity.x = this.speed;
      // When going right, we cancel the flip
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else velocity.x = 0;

    // If the player is on the ground and wants to jump,
    // we update the velocity's `.y` component accordingly
    let touchBottom = touchSolids || touchPlatforms;
    if (touchBottom) {
      if (Sup.Input.wasKeyJustPressed("UP")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } else {
        // Here, we should play either "Idle" or "Run" depending on the horizontal speed
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else {
      // Here, we should play either "Jump" or "Fall" depending on the vertical speed
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }

    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
```

Vous pouvez [télécharger le projet de démonstration](https://bitbucket.org/sparklinlabs/superpowers-collision-demo) et l'essayer !
Il comporte une version améliorée du comportement ci-dessus, qui gère l'animation et l'orientation du joueur.

![](http://i.imgur.com/v4tWyIN.gif)

D'autres méthodes sont disponibles sur le composant `.arcadeBody2D`. Jetez un oeil dans le "TypeScript API browser" dans Superpowers pour les découvrir.

# Basic collision in 2D

Collision is often tricky to set up.
Superpowers ships with the ArcadePhysics2D plugin to make the common cases easier.

It's not perfect, but it does a decent job and it's very quick to set up when prototyping a game.

The plugin adds a new type of component in the scene editor, offering two types of bodies:

## Box body type

The `Box` body type lets you define a box with a specific size and offset.

![](/images/2d-collision/collision-box.png)

Make sure to untick `Movable` for props that should be static.

## Tile map body type

The `Tile Map` body type lets you collide with a tile map.

By default, any non-empty tile will collide with other bodies. You can set a property name in `Tile Set Property` to limit collisions to tiles that have this particular property. You can set up these tile properties in the tile set editor.

You can also specify a comma-separated list of layer indices that should collide. For instance, you can set layer `0` as the collision layer and other layers will be ignored.

![](/images/2d-collision/collision-map.png)

<div class="note">
  The scale of the actor isn't taken into account. You should leave it to 1 and use the pixels / unit setting on the map instead.
</div>

## Making things collide

In order for your character to collide with the environment, you should put the following code in the update of a behavior attached to it:

```
Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
```

The second argument of the function is a list a bodies. In this case, we're using all of them, but you can also maintain your own list of collidables.

<div class="note">
  Since ArcadePhysics2D's `.collides` function will update your actor's position while handling collisions, **you can't use `.move` or `.setPosition` directly anymore**.

  If you need to teleport your actor, use `this.actor.arcadeBody2D.warpPosition(...)`.
</div>

Instead, get the body's current velocity with `this.actor.arcadeBody2D.getVelocity()`, update its `.x` or `.y` component and then apply it back with `this.actor.arcadeBody2D.setVelocity(...)`.

## Building a simple platformer

<div class="action">
  First, you'll need to setup the gravity.
</div>

```
Sup.ArcadePhysics2D.setGravity(0, -0.02);
```

Pretty straightforward right?

<div class="action">
  In order to control your character, create a behavior script called `Player Behavior`.
</div>

```
class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());

    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();

    // We override the `.x` component based on the player's input
    if (Sup.Input.isKeyDown("LEFT")) velocity.x = -this.speed;
    else if (Sup.Input.isKeyDown("RIGHT")) velocity.x = this.speed;
    else velocity.x = 0;

    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    if (touchBottom && Sup.Input.wasKeyJustPressed("UP")) velocity.y = this.jumpSpeed;

    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
```

`.getTouches()` returns contact information for each side of the box body. We use it to ensure the player is on the ground before letting them jump.

## Making it look nice

To make it look better, we will support some animations and flip the player depending on the movement direction.

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
      // When going left, we have to flip the sprite
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      velocity.x = this.speed;
      // When going right, we cancel the flip
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
        // There we should play either 'Idle' or 'Run' depending on the horizontal speed
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else {
      // There we should play either 'Jump' or 'Fall' depending on the vertical speed
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }

    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
```

There we use the methods `.setHorizontalFlip` and `.setAnimation` on the sprite renderer.

The animation is choosed based on the velocity of the player and whether we are touching the ground or not.

## Going further

One thing you probably want to add now is one-way platforms.
To do so, we will start by making two groups of actors in the scene.

![](/images/2d-collision/scene.png)

We have the group of solids bodies, containing the map and the T-Rex and we have the group of platforms.

Now here is what the code looks like.
```
Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  solidBodies: Sup.ArcadePhysics2D.Body[] = [];
  platformBodies: Sup.ArcadePhysics2D.Body[] = [];

  awake() {
    // We get and store all the bodies in two lists
    let solidActors = Sup.getActor("Solids").getChildren();
    for (let solidActor of solidActors) this.solidBodies.push(solidActor.arcadeBody2D);
    let platformActors = Sup.getActor("Platforms").getChildren();
    for (let platformActor of platformActors) this.platformBodies.push(platformActor.arcadeBody2D);
  }

  update() {
    // First, we do the check with solid bodies
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.solidBodies);
    let touchSolids = this.actor.arcadeBody2D.getTouches().bottom;
    let velocity = this.actor.arcadeBody2D.getVelocity();

    // When falling, we do the check with one-way platforms
    let touchPlatforms = false;
    if (velocity.y < 0) {
      let position = this.actor.getLocalPosition();
      // We must change the size of the player body so only the feet are checked
      // To do so, we reduce the height of the body and adapt the offset
      this.actor.arcadeBody2D.setSize(1.5, 0.4);
      this.actor.arcadeBody2D.setOffset({ x: 0, y: 0.2 });
      // Then we override the body position using the current actor position
      this.actor.arcadeBody2D.warpPosition(position);

      // Now, we can do check with every platform
      for (let platformBody of this.platformBodies) {
        Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, platformBody);
        if (this.actor.arcadeBody2D.getTouches().bottom) {
          touchPlatforms = true;
          velocity.y = 0;
          break;
        }
      }

      // After the check, we have to reset the body to its normal size
      position = this.actor.getLocalPosition();
      this.actor.arcadeBody2D.setSize(1.5, 1.8);
      this.actor.arcadeBody2D.setOffset({ x: 0, y: 0.9 });
      this.actor.arcadeBody2D.warpPosition(position);
    }

    // We override the `.x` component based on the player's input
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
    // we update the `.y` component accordingly
    let touchBottom = touchSolids || touchPlatforms;
    if (touchBottom) {
      if (Sup.Input.wasKeyJustPressed("UP")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } else {
        // There, we should play either 'Idle' or 'Run' depending on the horizontal speed
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else {
      // There, we should play either 'Jump' or 'Fall' depending on the vertical speed
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }

    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
```

You can [download the demo project](https://bitbucket.org/sparklinlabs/superpowers-collision-demo) and try it out!

![](http://i.imgur.com/v4tWyIN.gif)

More methods are available on the `.arcadeBody2D` component. Be sure to check the API browser within Superpowers.

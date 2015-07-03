# Basic collision in 2D

Collision is often tricky to set up.
Superpowers ships with the ArcadePhysics2D plugin to make the common cases easier.

It's not perfect, but it does a decent job and it's very quick to set up when prototyping a game.

The plugin adds a new type of component in the scene editor, offering two types of bodies:

## Box body type

The `Box` body type lets you define a box with a specific size and offset.

![](/images/collision-box.png)

Make sure to untick `Movable` for props that should be static.

## Tile map body type

The `Tile Map` body type lets you collide with a tile map.

By default, any non-empty tile will collide with other bodies. You can set a property name in `Tile Set Property` to limit collisions to tiles that have this particular property. You can set up these tile properties in the tile set editor.

You can also specify a comma-separated list of layer indices that should collide. For instance, you can set layer `0` as the collision layer and other layers will be ignored.

![](/images/collision-map.png)

## Making things collide

In order for your character to collide with the environment, you should put the following code in the update of a behavior attached to it:

```
Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
```

The second argument of the function is a list a bodies. In this case, we're using all of them, but you can also maintain your own list of collidables.

Since ArcadePhysics2D's `.collides` function will update your actor's position while handling collisions, you can't move it yourself directly anymore.

Instead, get the body's current velocity with `this.actor.arcadeBody2D.getVelocity()`, update its `.x` or `.y` component and then apply it back with `this.actor.arcadeBody2D.setVelocity(...)`.

## Building a simple platformer

<div class="action">
  First, you'll need to setup the gravity.
</div>

```
Sup.ArcadePhysics2D.setGravity(new Sup.Math.Vector3(0, -0.02, 0));
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

You can [the demo project](https://bitbucket.org/sparklinlabs/superpowers-collision-demo) and try it out!
It features an improved version of the behavior that handles animation and orientation of the player as well.

![](http://i.imgur.com/v4tWyIN.gif)

More methods are available on the `.arcadeBody2D` component. Be sure to check the API browser within Superpowers.

# Basic collision in 2D

Collision is often tricky to set up.
Superpowers is shipped with a plugin - ArcadePhysics2D - to make things easier.

It's not perfect, but it does a decent job and very quick to set up when prototyping a game.

The plugin add a new type of component in the scene editor. It offers you two types of body:
  * <div style="display: inline-flex">
      <p style="width: 300px">Box comes with several settings which should be pretty self explanatory.</p>
      <img src="/images/collision-box.png" />
    </div>
  * <div style="display: inline-flex">
      <p style="width: 300px">Tile Map comes with two options.
      You can either give a tile set property name to find on the tile.
      Or you can give specific layers, separated with a comma.
      For instance, you can have the layer 0 to be the "collision" layer.</p>
      <img src="/images/collision-map.png" />
    </div>

A little bit of code is then needed to make the collision works.
You need to actively tell which body should be checked and against which bodies.

To do so, you have to put the following code in the update of a behavior attached to the moving body:
```
Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
```

`this.actor.arcadeBody2D` refers to the body of the moving actor.
The second argument of the function collides is a list a bodies.
You can use every bodies in world (like in the example) but you can also setup more complex schemas with your own lists. 

<div class="note">
  <b>When you work with ArcadePhysics, every function to move an actor won't work anymore.</b>
  You need to use the speed of the arcadeBody2D with "getVelocity" and "setVelocity" methods.
  You will also find a "warpPosition" method to teleport your body.
</div>

# Plateformer demo

We will see the basics to build a plateformer. It will handle the player movement and jump.

First, we need to setup the gravity.
```
Sup.ArcadePhysics2D.setGravity(new Sup.Math.Vector3(0, -0.02, 0));
```
Pretty straightforward right ?

Then, we have the behavior of the player. 

```
class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    
    let velocity = this.actor.arcadeBody2D.getVelocity();

    if (Sup.Input.isKeyDown("LEFT")) velocity.x = -this.speed;
    else if (Sup.Input.isKeyDown("RIGHT")) velocity.x = this.speed;
    else velocity.x = 0;

    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    if (touchBottom && Sup.Input.wasKeyJustPressed("UP")) velocity.y = this.jumpSpeed;

    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
```

At the beginning of the update, we get the velocity.
Then we apply some changes based on the input the user gives.

The jump part is a bit more complex. We need to check if the player is on the ground.
The method `getTouches` gives you info of the current collision's state on each side.

Finally, we need to apply the updated speed to the body.

You can [download a demo project](https://bitbucket.org/sparklinlabs/superpowers-collison-demo) and try it out!
You will find an improved version of the behavior. It handle the animation and the orientation of the player as well. 

![](http://i.imgur.com/v4tWyIN.gif)

More methods are available on the arcadeBody2D component. Be sure to check the API browser within Superpowers.

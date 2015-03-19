# Scripted behaviors

Reusable behaviors can be defined so that you can put them on multiple actors.  
This is how a behavior definition might look like:

```
class MyBehavior extends Sup.Behavior {
  // Declare properties here.

  awake() {
    // Put initialization logic here.
    // this.actor represents the actor the behavior is attached to.
  }

  update() {
    // Put logic that should be executed 60x per second here.
  }

}
// Don't forget to register your behavior class
Sup.registerBehavior(MyBehavior);
```

Inside the behavior's methods (`awake`, `update` and others you might define yourself), you can reference the current behavior component with `this` and the actor it is attached to with `this.actor`.

Let's add a behavior to our main character from the previous chapter.

<div class="action">
  <p>Go back to your `Game` script and add the following code at the bottom:
</div>


```
class CharacterBehavior extends Sup.Behavior {

  update() {
    if (Sup.Input.isKeyDown("LEFT")) {
      // Move the current behavior's actor by a small negative offset on the X axis
      this.actor.move(new Sup.Math.Vector3(-0.1, 0, 0));
    }

    if (Sup.Input.isKeyDown("RIGHT")) {
      // Same but positive to go to the right
      this.actor.move(new Sup.Math.Vector3(0.1, 0, 0));
    }
  }

}
Sup.registerBehavior(CharacterBehavior);

// Once the behavior class is defined,
// we need to attach it to our character
mainCharacterActor.addBehavior(CharacterBehavior);
```

`Sup.Input.isKeyDown(...)` returns `true` only when the specified key is pressed.

<div class="note">
  **There are many other functions** available to read input from the player and react to it.  
  They are all listed in **the <abbr title="Application Programming Interface">API</abbr> browser** available from within Superpowers.
</div>

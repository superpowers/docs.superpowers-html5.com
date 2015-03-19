# Working with scenes

Scenes lets you visually build a configuration of actors and their components (renderers, behaviors, etc.).

We're going to rebuild our movie set from before but using a scene instead of writing them up.

<div class="action">
  <p>Create a new Scene asset named `Main Scene` and open it up.
</div>

<div class="action">
  <p>Create an actor named `Main Character` and place it in (0, 0, 0).  
  Add a SpriteRenderer component on it and enter `Leonard` as the sprite to use.  
  Add another component, this time of type Behavior and enter `CharacterBehavior` as the class to use.
</div>

<div class="action">
  <p>Click anywhere in the scene tree to unselect the actor you just created.  
  Create another actor named `Camera Man` and place it in (0, 0, 5).  
  Add a Camera component on it.
</div>

<div class="note">
  <p>**Make sure the `Camera Man` actor isn't parented to the `Main Character` actor** in the scene tree.<br>
  If it is, simply use drag'n'drop to clear the parenting.
</div>

Now that our scene is all set, let's go back to our script. We can get rid of all the code that created our actors and instead replace it with a single instruction to load our scene. We still need to declare the `CharacterBehavior` though.

<div class="action">
  <p>Replace the content of the `Game` script with the following:
</div>

```
class CharacterBehavior extends Sup.Behavior {
  update() {
    if (Sup.Input.isKeyDown("LEFT")) this.actor.move(new Sup.Math.Vector3(-0.1, 0, 0));
    if (Sup.Input.isKeyDown("RIGHT")) this.actor.move(new Sup.Math.Vector3(0.1, 0, 0));
  }
}
Sup.registerBehavior(CharacterBehavior);

Sup.loadScene(Sup.get("Main Scene", Sup.Scene));
```

<div class="note">
  <p>**It is important that you declare the `CharacterBehavior` class before  loading the scene with `Sup.loadScene`** (i.e. higher up, in the script), or Superpowers will complain that it doesn't know (yet) what the behavior is.
</div>

When working with several behavior classes, it is common to put each of them in their own script for organizational purposes. Since scripts will be read in order, make sure you're loading your scene in a script placed below all the behavior scripts it uses.

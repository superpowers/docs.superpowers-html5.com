# Working with scenes

Scenes lets you visually build a configuration of actors and their components (renderers, behaviors, etc.).

We're going to rebuild our movie set from before but using a scene instead of writing them up.

<div class="action">
  <p>Create a new Scene asset named `Main Scene` and open it up.
</div>

<div class="note">
  <p>**In the scene editor, use `WASD`** to move forward, backward, left and right, `Space` to go up and `Shift` to go down.
</div>

<div class="action">
  <p>Create an actor named `Main Character` and place it in (0, 0, 0).  
  Add a `Sprite Renderer` component on it and enter `Leonard` as the sprite to use.  
  Add another component, this time of type `Behavior` and select `CharacterBehavior` as the class to use.
</div>

<div class="action">
  <p>Click anywhere in the scene tree to unselect the actor you just created.  
  Create another actor named `Camera Man` and place it in (0, 0, 5).  
  Add a Camera component on it.
</div>

<div class="note">
  <p>**Make sure the `Camera Man` actor isn't parented to the `Main Character` actor** in the scene tree.  
  If it is, simply use drag'n'drop to clear the parenting.
</div>

Now that our scene is all set, let's go back to our script. We can get rid of all the code that created our actors and instead replace it with a single instruction to load our scene. We still need to declare the `CharacterBehavior` though.

<div class="action">
  <p>Replace the content of the `Game` script with the following:
</div>

```
class CharacterBehavior extends Sup.Behavior {
  update() {
    if (Sup.Input.isKeyDown("LEFT")) this.actor.move(-0.1, 0, 0);
    if (Sup.Input.isKeyDown("RIGHT")) this.actor.move(0.1, 0, 0);
  }
}
Sup.registerBehavior(CharacterBehavior);

Sup.loadScene("Main Scene");
```

<div class="note">
  <p>**It is important that you declare the `CharacterBehavior` class before  loading the scene with `Sup.loadScene`** (i.e. higher up, in the script), or Superpowers will complain that it doesn't know (yet) what the behavior is.
</div>

When working with several behavior classes, it is common to put each of them in their own script for organizational purposes. Since scripts will be read in order, make sure you're loading your scene in a script placed below all the behavior scripts it uses.

## Loading a scene when the game starts without any code

You can define a scene that will automatically be loaded by Superpowers after reading all your scripts in the `Game` section of the `Settings` tool.

![](http://i.imgur.com/DaWYJqS.png)

It's entirely equivalent to inserting a call to `Sup.loadScene` at the end of your last script, but it's more convenient since you'll always know where to change it if you need to.

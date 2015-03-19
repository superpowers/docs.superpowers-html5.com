# Component accessors

Most component types will expose an accessor property so that you can change their state.

For instance, sprite renderers are exposed on actors as the `spriteRenderer` property:

```
class MyBehavior extends Sup.Behavior {

  update(amount) {
    // When the space key has just been pressed
    if (Sup.Input.wasKeyJustPressed("SPACE")) {
      // Play an animation on the sprite renderer
      // of the actor this behavior is attached to.
      this.actor.spriteRenderer.setAnimation("Wave");
    }
  }

}
Sup.registerBehavior(MyBehavior);
```

You can find a list of all accessors in the <abbr title="Application Programming Interface">API</abbr> browser inside of Superpowers, specifically in the `Sup.Actor` section.
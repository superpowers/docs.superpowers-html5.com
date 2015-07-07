# Saving game data

You can use `Sup.Storage.get` and `.set` to save and restore strings of data.  
This data is saved locally to the player's disk.

Additionally, `Sup.Storage.clear` lets you clear all stored data for your game.

<div class="note">
  Internally, Superpowers uses the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) so it has the same browser-dependent size limitations. It is best suited for small amounts of data. In any case, you probably shouldn't use it to store more than a few megabytes of data, as it is synchronous and will block the game while saving or loading.
</div>

## Storing more than strings

To store and retrieve complex objects, you can (de)serialize them using `JSON.stringify` and `.parse`.

## Saving on exit

You can use a `Sup.Input` `"exit"` event handler to automatically save when the game closes.

```
Sup.Input.on("exit", () => {
  Sup.Storage.set("key", value);
});
```

## Storage demo

This simple demo lets you move around a sprite and automatically saves its position when the game is closed.

You can [download the demo project](https://bitbucket.org/sparklinlabs/superpowers-storage-demo).

```
class CharacterBehavior extends Sup.Behavior {
  speed = 0.1;

  update() {
    if (Sup.Input.isKeyDown("LEFT")) this.actor.moveX(-this.speed);
    if (Sup.Input.isKeyDown("RIGHT")) this.actor.moveX(this.speed);
    if (Sup.Input.isKeyDown("UP")) this.actor.moveY(this.speed);
    if (Sup.Input.isKeyDown("DOWN")) this.actor.moveY(-this.speed);

    if (Sup.Input.isKeyDown("ESCAPE")) this.actor.setPosition(0, 0, 0);
  }
}
Sup.registerBehavior(CharacterBehavior);


// Setup our character and camera
let actor = new Sup.Actor("Character");
new Sup.SpriteRenderer(actor, Sup.get("Sprite", Sup.Sprite));
actor.addBehavior(CharacterBehavior);

let cameraActor = new Sup.Actor("Camera");
new Sup.Camera(cameraActor);
cameraActor.setLocalPosition(0, 0, 10);


// Save character position on exit
Sup.Input.on("exit", () => {
  // Sup.Storage stores strings so we have to serialize as JSON to save our position
  Sup.Storage.set("myCharacterPosition", JSON.stringify({ x: actor.getX(), y: actor.getY() }));
});


// Restore saved character position on load
let savedPositionJSON = Sup.Storage.get("myCharacterPosition");

if (savedPositionJSON != null) {
  // Conversely, when loading, we need to deserialize
  // from a JSON string to our x and y number values
  let { x, y } = JSON.parse(savedPositionJSON);
  actor.setPosition(x, y, 0);
}
```

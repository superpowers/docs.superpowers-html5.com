# Saving game data

You can use `Sup.Storage.get` and `.set` to save and restore strings of data.  
This data is saved locally to the player's disk.

```
// ... When the player chooses a name
Sup.Storage.set("characterName", "Leonard");

// ... When loading the game again later
let characterName = Sup.Storage.get("characterName");
```

You can also pass a default value as a second parameter to `Sup.Storage.get`.
It will be returned if no value was found for the requested key.

```
let characterName = Sup.Storage.get("characterName", "Unnamed");
```

Additionally, `Sup.Storage.clear` lets you clear all stored data for your game.

<div class="note">
  Internally, Superpowers uses the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) so it has the same browser-dependent size limitations. It is best suited for small amounts of data. In any case, you probably shouldn't use it to store more than a few megabytes of data, as it is synchronous and will block the game while saving or loading.
</div>

## Storing more than strings

To store and retrieve numbers, arrays or complex objects, you can use `Sup.Storage.setJSON` and `.getJSON`.  
Internally, it will (de)serialize them using `JSON.stringify` and `.parse`.

```
let weapon = {
  name: "Hand blender",
  damage: 9001,
  mode: "manual"
};

Sup.Storage.setJSON("weapon", weapon);

// ... Later
let weapon = Sup.Storage.getJSON("weapon");
```

Class information isn't saved, only the various properties. So for instance, if you store a `Sup.Math.Vector2` object,
you'll only get back an object of type `{ x: number; y: number; }` and you'll need to rebuild a vector from it.

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
  Sup.Storage.setJSON("myCharacterPosition", { x: actor.getX(), y: actor.getY() });
});


// Restore saved character position on load
let savedPosition = Sup.Storage.getJSON("myCharacterPosition", { x: 0, y: 0 });
actor.setPosition(savedPosition.x, savedPosition.y, 0);
```

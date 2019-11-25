# Saving game data

Вы можете использовать `Sup.Storage.get` и `.set` чтобы сохранять и восстанавливать строки данных.  
Эти данные сохраняются локально на диске игрока.

```
// ... Когда игрок выбирает имя
Sup.Storage.set("characterName", "Leonard");

// ... При загрузке игры снова позже
let characterName = Sup.Storage.get("characterName");
```

Вы также можете передать значение по умолчанию в качестве второго параметра `Sup.Storage.get`.
Будет возвращено, если для запрошенного ключа не найдено значение.

```
let characterName = Sup.Storage.get("characterName", "Unnamed");
```

Кроме того, `Sup.Storage.clear` позволяет вам очистить все сохраненные данные для вашей игры.

<div class="note">
  Internally, Superpowers uses the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) so it has the same browser-dependent size limitations. Лучше всего подходит для небольших объемов данных.. В любом случае, вам, вероятно, не следует использовать его для хранения более нескольких мегабайт данных, поскольку он является синхронным и заблокирует игру во время сохранения или загрузки.
</div>

## Хранить больше, чем строки

Для хранения и извлечения чисел, массивов или сложных объектов вы можете использовать `Sup.Storage.setJSON` и `.getJSON`.  
Внутренне, он будет (де) сериализовать их, используя `JSON.stringify` и `.parse`.

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

Информация о классе не сохраняется, только различные свойства. Так, например, если вы храните `Sup.Math.Vector2` object,
вы получите только объект типа `{ x: number; y: number; }` и вам нужно будет восстановить вектор из него.

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

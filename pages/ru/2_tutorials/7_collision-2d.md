# Основные столкновения в 2D

Столкновение часто сложно настроить.
Superpowers поставляется с плагином ArcadePhysics2D чтобы облегчить общие вещи.
Он не идеален, но делает достойную работу и очень быстро настраивается при создании прототипа игры..

Плагин добавляет новый тип компонента в scene editor,предлагая два типа тел:

## Тип тела box

Тип тел `Box` позволяет определить бокс с определенным размером и смещением.

![](/images/2d-collision/collision-box.png)

Обязательно снимите флажок `Movable` для объектов, которые должны быть статичными.

## тип тела Tile map

Тип тел `Tile Map` позволяет столкновения с tile map.

По умолчанию любая непустая плитка сталкивается с другими телами. Вы можете установить имя свойства в `Tile Set Property` ограничить столкновения с плитками, которые имеют это конкретное свойство. Вы можете установить эти свойства плитки в редакторе набора плиток..

Вы также можете указать список разделенных запятыми индексов слоев, которые должны сталкиваться. Например, вы можете установить слой `0` как слой столкновения, и другие слои будут игнорироваться.

![](/images/2d-collision/collision-map.png)

<div class="note">
  Масштаб актера не учитывается. Вы должны оставить его равным 1 и вместо него использовать анстройку `Pixels / unit` карты.
</div>

## Заставить вещи сталкиваться

Чтобы ваш персонаж сталкивался с окружающей средой, вы должны поместить следующий код в обновление поведения, прикрепленного к нему:

```
Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
```

Второй аргумент функции - это список тел. В этом случае мы используем все из них, но вы также можете вести свой список списков.

<div class="note">
  Посольку функция ArcadePhysics2D's `.collides` обновит позицию вашего актера при обработке столкновений, **вы не можете использовать `.move` или `.setPosition` напрямую больше**.

  Если вам нужно телепортировать вашего актера, используйте `this.actor.arcadeBody2D.warpPosition(...)`.
</div>

Вместо этого, получите текущую скорость тела с `this.actor.arcadeBody2D.getVelocity()`, обновите ее `.x` или `.y` компоненту и затем примените ее обратно `this.actor.arcadeBody2D.setVelocity(...)`.

## Сборка простого платформера

<div class="action">
  Во-первых, вам нужно настроить гравитацию.
</div>

```
Sup.ArcadePhysics2D.setGravity(0, -0.02);
```

Довольно просто, правда?

<div class="action">
  Чтобы управлять своим персонажем, создайте сценарий поведения с именем `Player Behavior`.
</div>

```
class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());

    // Как объяснено выше, мы получаем текущую скорость
    let velocity = this.actor.arcadeBody2D.getVelocity();

    // Мы перезаписываем компонент `.x` на основе ввода игрока
    if (Sup.Input.isKeyDown("LEFT")) velocity.x = -this.speed;
    else if (Sup.Input.isKeyDown("RIGHT")) velocity.x = this.speed;
    else velocity.x = 0;

    // Если игрок на земле и хочет прыгать,
    // мы обновляем компоненту `.y` соответственно
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    if (touchBottom && Sup.Input.wasKeyJustPressed("UP")) velocity.y = this.jumpSpeed;

    //Наконец, мы применяем скорость обратно к телу ArcadePhysics
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
```

`.getTouches()` возвращает контактную информацию для каждой стороны корпуса коробки. Мы используем его, чтобы убедиться, что игрок на земле, прежде чем позволить им прыгать.

## Улучшим то как все выглядит

Чтобы он выглядел лучше, давайте добавим анимацию и перевернем спрайт игрока в зависимости от направления движения..

Мы будем использовать методы `.setAnimation` и `.setHorizontalFlip` на рендере спрайта, чтобы сделать это.

```
class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());

    // Как объяснено выше, мы получаем текущую скорость
    let velocity = this.actor.arcadeBody2D.getVelocity();

    // Мы перекрываем компоненту `.x` на основе ввода игрока
    if (Sup.Input.isKeyDown("LEFT")) {
      velocity.x = -this.speed;
      // Идя налево, мы переворачиваем спрайт
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      velocity.x = this.speed;
      //Когда идем направо, мы очищаем флип
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else velocity.x = 0;

    // Если игрок находится на земле и хочет прыгнуть,
    // обновляем его `.y` cкомпоненту
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    if (touchBottom) {
      if (Sup.Input.wasKeyJustPressed("UP")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } else {
        // Здесь мы должны играть либо "Idle" либо "Run" в зависимости от горизонтальной скорости
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else {
      // Здесь мы должны играть либо "Jump" либо "Fall" в зависимости от вертикальной скорости
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }

    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
```

Мы выбираем анимацию для воспроизведения в зависимости от скорости игрока и от того, касаемся ли мы земли или нет.

## Идем дальше

Одна вещь, которую вы, вероятно, захотите добавить, это односторонние платформы: платформы, через которые вы можете прыгать снизу.

Для этого мы начнем с создания двух групп актеров на сцене..

![](/images/2d-collision/scene.png)

У нас будет группа для твердых тел, содержащая карту и T-Rex, и еще одна для наших односторонних платформ.
Вот как это выглядит в коде.

```
Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  solidBodies: Sup.ArcadePhysics2D.Body[] = [];
  platformBodies: Sup.ArcadePhysics2D.Body[] = [];

  awake() {
    // Мы получаем и храним все тела в двух массивах, по одному для каждой группы.
    let solidActors = Sup.getActor("Solids").getChildren();
    for (let solidActor of solidActors) this.solidBodies.push(solidActor.arcadeBody2D);
    let platformActors = Sup.getActor("Platforms").getChildren();
    for (let platformActor of platformActors) this.platformBodies.push(platformActor.arcadeBody2D);
  }

  update() {
    // Сначала проверим на столкновение с твердыми телами.
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.solidBodies);
    let touchSolids = this.actor.arcadeBody2D.getTouches().bottom;
    let velocity = this.actor.arcadeBody2D.getVelocity();

    // Затем мы проверим на столкновение с односторонними платформами,
    // ... но только при падении! Вот и вся хитрость.
    let touchPlatforms = false;
    if (velocity.y < 0) {
      let position = this.actor.getLocalPosition();
      // Мы должны изменить размер тела игрока, чтобы проверялись только ноги
      // Для этого мы уменьшаем высоту тела и адаптируем смещение
      this.actor.arcadeBody2D.setSize(1.5, 0.4);
      this.actor.arcadeBody2D.setOffset({ x: 0, y: 0.2 });
      // Затем мы переопределяем положение тела, используя текущую позицию актера.
      this.actor.arcadeBody2D.warpPosition(position);

      // Теперь проверьте по каждой платформе
      for (let platformBody of this.platformBodies) {
        Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, platformBody);
        if (this.actor.arcadeBody2D.getTouches().bottom) {
          touchPlatforms = true;
          velocity.y = 0;
          break;
        }
      }

      // После того, как сделано, сбросьте тело до его полного размера
      position = this.actor.getLocalPosition();
      this.actor.arcadeBody2D.setSize(1.5, 1.8);
      this.actor.arcadeBody2D.setOffset({ x: 0, y: 0.9 });
      this.actor.arcadeBody2D.warpPosition(position);
    }

    // Мы перезаписываем компонент скорости .x на основе ввода игрока
    if (Sup.Input.isKeyDown("LEFT")) {
      velocity.x = -this.speed;
      // Идя налево, мы должны флипнуть спрайт
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      velocity.x = this.speed;
      // При движении вправо мы отменяем флип
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else velocity.x = 0;

    // Если игрок на земле и хочет прыгать,
    // мы соответственно обновляем компонент скорости `.y`
    let touchBottom = touchSolids || touchPlatforms;
    if (touchBottom) {
      if (Sup.Input.wasKeyJustPressed("UP")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } else {
        // Здесь мы должны сыграть либо «холостой ход», либо «бег» в зависимости от горизонтальной скорости
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else {
      // Здесь мы должны играть либо «Прыжок», либо «Падение» в зависимости от вертикальной скорости.
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }

    // Наконец, мы применяем скорость обратно к телу ArcadePhysics
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(PlayerBehavior);
```

Вы можете [загрузить демо проект](https://bitbucket.org/sparklinlabs/superpowers-collision-demo) и попробовать его сами!

![](http://i.imgur.com/v4tWyIN.gif)

Дополнительные методы доступне в компоненте `.arcadeBody2D` . Обязательно проверьте API-браузер в Superpowers.

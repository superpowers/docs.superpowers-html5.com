# Компоненты доступа

Большинство типов компонентов предоставляют свойство аксессора, чтобы вы могли изменить их состояние.

Например, средства отображения спрайтов отображаются на актерах как свойство `spriteRenderer`:

```
class MyBehavior extends Sup.Behavior {

  update() {
    // Когда клавиша пробела только что была нажата
    if (Sup.Input.wasKeyJustPressed("SPACE")) {
      // Воспроизвести анимацию на рендере спрайтов
      // актера к которому это поведение прилагается.
      this.actor.spriteRenderer.setAnimation("Wave");
    }
  }

}
Sup.registerBehavior(MyBehavior);
```

Вы можете найти список всех аксессоров в <abbr title="Application Programming Interface">API</abbr> браузере внутри Superpowers, в разделе `Sup.Actor`.
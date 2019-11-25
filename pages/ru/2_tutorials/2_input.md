# Клавиши, мышки, геймпады...

Все входные функции можно найти в `Sup.Input` namespace.

## Проверка, была ли нажата какая-либо клавиша

Вы можете передать специальные значения `"ANY"` и `"NONE"` в `Sup.Input.wasKeyJustPressed()` (и другие подобные функции) выяснить, была ли нажата какая-либо клавиша в течение последнего кадра.

Полный список имен клавиш можно найти в браузере TypeScript API внутри Superpowers.

## Работа с геймпадами

The Web APIs have some quirks stemming from the fact that the browser must not
give too much control or information to random websites. For instance,
to avoid user fingerprinting, the Web doesn't let you list all connected gamepads.
You'll need to ask the user to press a button to use their gamepad.

You can use [HTML5gamepad.com's test tool](http://html5gamepad.com/)
to find out how gamepad buttons are mapped to indices.

## Mouse coordinates

`Sup.Input.getMousePosition()` возвращет нормалитзованные `x` и `y` координаты (в диапазоне `-1` to `1`), где `y` увеличивается при движении мыши вверх.

Если вам нужны пиксельные координаты, вы можете использовать следующий фрагмент для преобразования:

```
let { x, y } = Sup.Input.getMousePosition();

x = (x + 1) / 2 * Sup.Input.getScreenSize().x;
y = (1 - (y + 1) / 2) * Sup.Input.getScreenSize().y;
```

Скачайие [пример проекта](https://bitbucket.org/sparklinlabs/superpowers-mouse-pixels/) для демо.

## Блокировка мыши и переход в полноэкранный режим

`Sup.Input.lockMouse()` позволяет отключить указатель мыши. Отлично подходит для игр от первого лица с мышью.

`Sup.Input.goFullscreen()` можно использовать для перехода в полноэкранный режим.

Как и в случае с геймпадами, по соображениям безопасности веб-игра не может блокировать указатель мыши или работать в полноэкранном режиме по желанию, а только как часть обратного вызова события щелчка мышью или аналогичного пользовательского ввода. Superpowers абстрагирует эти ограничения от вашей игры, позволяя вам вызвать `.lockMouse` и `.goFullscreen` в любой момент времени, но знайте, что фактическое действие будет отложено до следующего нажатия или отпускания кнопки мыши.

Полезный шаблон - установить блокировку мыши или полноэкранный режим, когда кнопка мыши только что была нажата, и Superpowers будет эффективно применять это действие в своем обработчике события, выпущенного внутренней кнопкой мыши:

```
if (Sup.Input.wasMouseButtonJustPressed(0)) {
  Sup.Input.lockMouse();
}
```

В браузере игрок также может выйти из полноэкранного режима или разблокировать указатель мыши в любой момент времени, нажав клавишу «Escape». Superpowers автоматически повторно заблокирует мышь и / или переключится обратно в полноэкранный режим, как только пользователь вернется в игру, пока вы явно не вызовете `Sup.unlockMouse ()` и / или `Sup.exitFullscreen ()`.

Возможно, вы захотите приостановить игру, когда блокировка мыши или полноэкранный режим были приостановлены.
Для этого вы можете использовать обработчик событий следующим образом:

```
class MyBehavior extends Sup.Behavior {

  awake() {
    Sup.Input.on("mouseLockStateChange", this.onLockChange);
    // Для монитора в полноэкранном режиме событие должно быть «fullscreenStateChange»
  }

  onDestroy() {
    // Важно, чтобы вы очистили свои обработчики событий
    // когда поведение разрушается (что происходит
    // например, при переключении на другую сцену),
    // в противном случае это может привести к утечке памяти или ошибкам
    Sup.Input.off("mouseLockStateChange", this.onLockChange);
  }

  onLockChange(state) {
    if (state === "suspended") {
      // Блокировка была приостановлена
      // ... игра на апаузе ...
    } else {
      // Блокировка была возобновлена (state is "active")
      // ... возобновление игры ...
    }
  }

}
Sup.registerBehavior(MyBehavior);
```

## Ввод текста

Вы можете получить текст, введенный в течение последнего обновления с `Sup.Input.getTextEntered()`. Вы можете зациклить это так:

```
for (let character of Sup.Input.getTextEntered()) {
  if (character === "\b") { /* Backspace был нажат, возможно стереть последний символ */ }
  else { /* Введен другой символ, добавьте его в свой текст */ }
}
```

![](http://i.imgur.com/MWG8yPe.gif)

See the [демонстрационный проект ввода текста](https://bitbucket.org/sparklinlabs/superpowers-text-input-demo/src).

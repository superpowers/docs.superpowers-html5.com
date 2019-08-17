# Keys, mouse, gamepads...

All input-related functions can be found in the `Sup.Input` namespace.

## Checking if any key has been pressed

You can pass the special values `"ANY"` and `"NONE"` to `Sup.Input.wasKeyJustPressed()` (and other similar functions) to find out if any/no key has been pressed during the last frame.

The full list of key names can be found in the TypeScript API browser inside Superpowers.

## Working with gamepads

The Web APIs have some quirks stemming from the fact that the browser must not
give too much control or information to random websites. For instance,
to avoid user fingerprinting, the Web doesn't let you list all connected gamepads.
You'll need to ask the user to press a button to use their gamepad.

You can use [HTML5gamepad.com's test tool](http://html5gamepad.com/)
to find out how gamepad buttons are mapped to indices.

## Mouse coordinates

`Sup.Input.getMousePosition()` returns normalized `x` and `y` coordinates (range `-1` to `1`), with `y` increasing as the mouse moves up.

If you need pixel coordinates, you can use the following snippet to convert:

```
let { x, y } = Sup.Input.getMousePosition();

x = (x + 1) / 2 * Sup.Input.getScreenSize().x;
y = (1 - (y + 1) / 2) * Sup.Input.getScreenSize().y;
```

Download [the example project](https://bitbucket.org/sparklinlabs/superpowers-mouse-pixels/) for a demo.

## Locking the mouse and going fullscreen

`Sup.Input.lockMouse()` lets you disable the mouse pointer. It's great for first-person games with mouse look.

`Sup.Input.goFullscreen()` can be used to go fullscreen.

As with gamepads, for security reasons, a Web game can't go lock the mouse pointer or go fullscreen at will, but only as part of a mouse click event callback or similar user input. Superpowers abstracts these limitations from your game by letting you call `.lockMouse` and `.goFullscreen` at any point in time but know that the actual action will be delayed until the next time a mouse button is pressed or released.

A useful pattern is to setup the mouse lock or fullscreen when a mouse button has just been pressed, and the action will be effectively applied by Superpowers in its internal mouse button released event handler:

```
if (Sup.Input.wasMouseButtonJustPressed(0)) {
  Sup.Input.lockMouse();
}
```

In the browser, the player can also exit fullscreen or unlock the mouse pointer at any point in time by hitting `Escape`. Superpowers will automatically re-lock the mouse and/or switch back to fullscreen as soon as the user clicks back in the game, until you explicitely call `Sup.unlockMouse()` and/or `Sup.exitFullscreen()`.

You might want to pause your game when the mouse lock or fullscreen mode has been suspended.  
To do so, you can use an event handler like so:

```
class MyBehavior extends Sup.Behavior {

  awake() {
    Sup.Input.on("mouseLockStateChange", this.onLockChange);
    // To monitor fullscreen, the event should be "fullscreenStateChange" instead
  }

  onDestroy() {
    // It is important that you clear your event handlers
    // when the behavior gets destroyed (which happens
    // when switching to another scene for instance),
    // otherwise it might lead to memory leaks or errors
    Sup.Input.off("mouseLockStateChange", this.onLockChange);
  }

  onLockChange(state) {
    if (state === "suspended") {
      // Lock has been suspended
      // ... pause the game ...
    } else {
      // Lock has been resumed (state is "active")
      // ... resume the game ...
    }
  }

}
Sup.registerBehavior(MyBehavior);
```

## Text Input

You can get the text entered over the course of the last update with `Sup.Input.getTextEntered()`. You can loop over it like so:

```
for (let character of Sup.Input.getTextEntered()) {
  if (character === "\b") { /* Backspace was hit, maybe erase the last character */ }
  else { /* Another character was entered, append it to your text */ }
}
```

![](http://i.imgur.com/MWG8yPe.gif)

See the [text input demo project](https://bitbucket.org/sparklinlabs/superpowers-text-input-demo/src).

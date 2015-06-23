# Keyboard, mouse, gamepads

All input-related functions can be found in the `Sup.Input` namespace.

## Checking if any key has been pressed

You can pass the special values `"ANY"` and `"NONE"` to `Sup.Input.wasKeyJustPressed()` (and other similar functions) to find out if any/no key has been pressed during the last frame.

## Working with gamepads

The Web APIs have some quirks stemming from the fact that the browser must not
give too much control or information to random websites. For instance,
to avoid user fingerprinting, the Web doesn't let you list all connected gamepads.
You'll need to ask the user to press a button to use their gamepad.

You can use [HTML5 Rocks' game pad tester](http://www.html5rocks.com/en/tutorials/doodles/gamepad/gamepad-tester/tester.html)
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

# Debugging your game

When using Superpowers from the app, you can open up the debugging tools by clicking on the "Debug game" button (or by pressing `F6`). Most browsers will let you open similar debugging tools by hitting the `F12` key while running the game.

Since the Superpowers app is built on NW.js, which is based on Chrome's runtime, the built-in debugging tools are those of Chrome too.

The two main tabs you'll care about when starting are:

 * The `Console` tab, which provides runtime error reporting and will contain the result of any call to `Sup.log`.

 * The `Sources` tab, where you'll find your scripts as well as the whole engine powering your game.

## Debugging and inspecting your game's state

<div class="note">
  <p>Check out [this overview of the Chrome DevTools](https://developer.chrome.com/devtools) as well as [this introduction to debugging JavaScript](https://developer.chrome.com/devtools/docs/javascript-debugging). While Superpowers actually uses TypeScript, it is a superset of JavaScript so most of the information there should apply.
</div>

With the debugger open, you can use `Ctrl+P` and type the name of one of your script assets to jump directly to it. [Place a breakpoint](https://developer.chrome.com/devtools/docs/javascript-debugging#add-remove-breakpoints) in the `update` method of a behavior for instance, and your game will stop as soon it reaches that line again.

When a breakpoint is hit, the right pane will show the `Call Stack` (showing you how your game reached the current function/method, like breadcrumbs) as well as `Scope Variables`, letting you inspect the content of all variables currently accessible.

`F10` lets you step forward one instruction at a time (useful if you want to inspect the details of a function one step at a time), while `F8` will resume the game's execution.

You may want to [enable "Pause on uncaught exceptions"](https://developer.chrome.com/devtools/docs/javascript-debugging#pause-on-uncaught-exceptions) so that your game will automatically stop at the specific line a runtime error is encountered and let you inspect the call stack and program state. This only has an effect when the debugger is open.

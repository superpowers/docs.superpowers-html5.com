# Using the DOM APIs

## Why doesn't Superpowers expose the DOM APIs by default?

The DOM APIs are the standard functions and objects available to scripts in a Web browser.
They include things like the `window` or `document` objects, `XMLHttpRequest` and so much more.

We've decided to shield Superpowers games from all that stuff by default for two reasons:

 * First, because Superpowers often provides higher-level alternatives that are simpler to use and work great together.  
   For instance, Superpowers provides the `Sup.Storage` API to replace the DOM's `window.localStorage` API.

 * Second, because it leaves the door open to one day provide an alternative runtime that doesn't involve a Web browser context.  
   There could be an optimized native player, for instance. It's not something we're actively pursuing though.

## How to use them anyway

The good news is, you can still choose to access the DOM anyway.
You could just do a one-off `declare var window;` at the top of your first script
and then use the APIs untyped with `new window.XMLHttpRequest(...);` for instance.

If you use it a lot though, having proper type checks would be useful.
Thankfully, Florent Poujol has written a [Superpowers DOM plugin](https://github.com/florentpoujol/superpowers-dom-plugin)
that will expose all the typed APIs for you.

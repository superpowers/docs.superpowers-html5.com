# Используем DOM APIs

## Почему Superpowers не выставляет DOM API по умолчанию?

DOM API - это стандартные функции и объекты, доступные для сценариев в веб-браузере.
Они включают в себя такие вещи, как объекты `window` или `document` , `XMLHttpRequest` и т.п.

Мы решили защитить игры Superpowers от всего этого по умолчанию по двум причинам.:

 * First, because Superpowers often provides higher-level alternatives that are simpler to use and work great together.  
   For instance, Superpowers provides the `Sup.Storage` API to replace the DOM's `window.localStorage` API.

 * Second, because it leaves the door open to one day provide an alternative runtime that doesn't involve a Web browser context.  
   There could be an optimized native player, for instance. It's not something we're actively pursuing though.

## Как их использовать в любом случае

The good news is, you can still choose to access the DOM anyway.
You could just do a one-off `declare var window;` at the top of your first script
and then use the APIs untyped with `new window.XMLHttpRequest(...);` for instance.

If you use it a lot though, having proper type checks would be useful.
Thankfully, Florent Poujol has written a [Superpowers DOM plugin](https://github.com/florentpoujol/superpowers-dom-plugin)
that will expose all the typed APIs for you.

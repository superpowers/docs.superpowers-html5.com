# Building Superpowers 

  * Install [Node.js](http://nodejs.org/) 4.x and a Git client like [SourceTree](https://www.sourcetreeapp.com/) or [GitHub Desktop](https://desktop.github.com/)
  * Clone [Superpowers's core repository](https://github.com/superpowers/superpowers) under the name `superpowers`
  * Clone the [Superpowers Game repository](https://github.com/superpowers/superpowers-game) as `superpowers/systems/supGame` (you might need to create the `systems` folder manually)
  * Open a terminal in the `superpowers` folder and run `npm run build`
  
It will take a few minutes to build everything.

 * Once it's done, run `node server`
 * Open `http://localhost:4237/` in your browser
 * You can use `Ctrl+C` to stop the server later

## Rebuilding all or parts of Superpowers

You can use `npm run build` to rebuild all of Superpowers. You can optionally add an argument to only rebuild paths containing it.

For instance `npm run build supGame` will only rebuild stuff within the `supGame` folder.

## Enabling development mode

In order to catch as many runtime errors as possible while working on Superpowers,
you can run enable development mode.
When development mode is enabled, the project header in the top-left corner
will be blue. When it turns red, it's a good sign that you should
open your browser's dev tools and look for errors in the Console tab.

Enabling development mode will also add the `None` language to the language selector, which is useful for finding strings that need to be internationalized.

To enable development mode, open your server in your browser, open the dev tools with `F12` and type the following in the console:  and type the following in the Console:

    localStorage.setItem("superpowers-dev-mode", "true");

Reload the page for the change to take effect.
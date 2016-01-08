# Building Superpowers 

## GitHub and Git

First of all, if you are not already familiar with it, you'll need to
[learn a bit about GitHub (and its underlying revision control system, Git)](https://google.com/search?q=learn+git+github).

You can either [use the command line version of Git](http://git-scm.com/) or install a Git client app
like [GitExtensions](http://gitextensions.github.io/), [SourceTree](https://www.sourcetreeapp.com/) or [GitHub Desktop](https://desktop.github.com/).

  1. Install [Node.js](http://nodejs.org/) 4.x.
  2. Clone [Superpowers's core repository](https://github.com/superpowers/superpowers) under the name `superpowers`
  3. Clone the [Superpowers Game repository](https://github.com/superpowers/superpowers-game) as `superpowers/systems/supGame` (you might need to create the `systems` folder manually)
  4. Since Superpowers Game uses a [submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to reference the [Common Superpowers plugins repository](https://github.com/superpowers/superpowers-common-plugins),
    make sure submodules are initialized in `superpowers/systems/supGame`.
    GitExtensions does it by default. When using the command line, you'll need to run `git submodule update --init`.
  5. Open a terminal in the `superpowers` folder and run `npm run build`
  
It will take a few minutes to build everything.

 * Once it's done, run `node server`
 * Open `http://localhost:4237/` in your browser
 * Later, you can hit `Ctrl+C` in the terminal to stop the server

## Rebuilding all or parts of Superpowers

You can use `npm run build` to rebuild all of Superpowers. You can optionally specify a filter to only rebuild some paths.

For instance `npm run build supGame` will only rebuild stuff within the `supGame` folder.


## Enabling development mode

In order to catch as many runtime errors as possible while working on Superpowers,
you can enable development mode.
When development mode is enabled, the project header in the top-left corner
will be blue. When it turns red, it's a good sign that you should
open your browser's dev tools and look for errors in the Console tab.

Enabling development mode will also add the `None` language to the language selector, which is useful for finding strings that need to be internationalized.

To enable development mode, open your server in your browser, open the dev tools with `F12` and type the following in the console:  and type the following in the Console:

    localStorage.setItem("superpowers-dev-mode", "true");

Reload the page for the change to take effect.

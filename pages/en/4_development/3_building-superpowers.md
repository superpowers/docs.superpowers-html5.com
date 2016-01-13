# Building Superpowers 

## Prerequisites

You'll need to install [Node.js](http://nodejs.org/) 4.x and a Git client.

If you are not already familiar with Git and GitHub,
[we recommend reading up on them](https://google.com/search?q=learn+git+github).  
You can either [use the command line version of Git](http://git-scm.com/) or a Git client app
like [GitExtensions](http://gitextensions.github.io/), [SourceTree](https://www.sourcetreeapp.com/) or [GitHub Desktop](https://desktop.github.com/).

## Cloning Superpowers and Superpowers Game

In a terminal, run the following commands:

```bash
# Clone Superpowers's core repository in "superpowers"
git clone https://github.com/superpowers/superpowers superpowers

cd superpowers
mkdir systems

# Clone the Superpowers Game repository in "superpowers/systems/game"
# Make sure its submodules are initialized
git clone https://github.com/superpowers/superpowers/superpowers-game systems/game
git submodule update --init systems/game

# Build everything 
npm run build
```

It will take a few minutes to build everything.

 * Once it's done, run `node server`
 * Open `http://localhost:4237/` in your browser
 * Later, you can hit `Ctrl+C` in the terminal to stop the server

## Running the app with Electron

```bash
# Only needed the first time or everytime you want to update Electron
npm install -g electron-prebuilt

cd superpowers/launcher
electron .
```

## Rebuilding all or parts of Superpowers

```bash
# Rebuild it all
cd superpowers
npm run build

# To rebuild only parts of Superpowers, you can filter paths
npm run build game
```

## Enabling development mode

In order to catch as many runtime errors as possible while working on Superpowers,
you can enable development mode.
When development mode is enabled, the project header in the top-left corner
will be blue. When it turns red, it's a good sign that you should
open your browser's dev tools and look for errors in the Console tab.

Enabling development mode will also add the `None` language to the language selector, which is useful for finding strings that need to be internationalized.

To enable development mode, open your server in your browser, open the dev tools with `F12` and type the following in the console:

    localStorage.setItem("superpowers-dev-mode", "true");

Reload the page for the change to take effect.

# Building Superpowers 

## Prerequisites

You'll need to install the latest version of [Node.js](http://nodejs.org/) and a Git client.

If you are not already familiar with Git and GitHub,
[we recommend reading up on them](https://google.com/search?q=learn+git+github).  
You can either [use the command line version of Git](http://git-scm.com/) or a Git client app
like [GitExtensions](http://gitextensions.github.io/), [SourceTree](https://www.sourcetreeapp.com/) or [GitHub Desktop](https://desktop.github.com/).

We also recommend using a text editor with good TypeScript support like [Visual Studio Code](https://code.visualstudio.com/) for development.

## Building Superpowers and Superpowers Game

In a terminal, run the following commands:

```bash
# Clone Superpowers's core repository in "superpowers"
git clone https://github.com/superpowers/superpowers superpowers

cd superpowers
mkdir systems

pushd systems

# Clone the Superpowers Game repository in "superpowers/systems/game"
git clone https://github.com/superpowers/superpowers-game game

pushd game

# Make sure its submodules are initialized
git submodule update --init

popd
popd

# Build everything. This will take a few minutes. 
npm run build
```

Once it's done, you can start a local server with:

```bash
node server start
```

Open `http://localhost:4237/` in your browser.
Later, you can hit `Ctrl+C` in the terminal to stop the server.

## Rebuilding all or parts of Superpowers

```bash
# Rebuild it all
cd superpowers
npm run build

# To rebuild only parts of Superpowers, you can filter paths
npm run build game

# To build in verbose mode
# (Notice you need twice the double dashes)
npm run build -- --verbose
```

## Building the desktop app

The desktop app is powered by [Electron](http://electron.atom.io/).

In a terminal, run the following commands:

```bash
git clone https://github.com/superpowers/superpowers-app superpowers-app
cd superpowers-app
npm run build

# Run this everytime you want to update Electron
npm install -g electron-prebuilt
```

Once it's done, you can start the app by running:

```bash
npm run start
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

# Building Superpowers 

## Prerequisites

You'll need to install the latest version of [Node.js](http://nodejs.org/) and a Git client.

If you are not already familiar with Git and GitHub,
[we recommend reading up on them](https://google.com/search?q=learn+git+github).  
You can either [use the command line version of Git](http://git-scm.com/) or a Git client app
like [GitExtensions](http://gitextensions.github.io/), [SourceTree](https://www.sourcetreeapp.com/) or [GitHub Desktop](https://desktop.github.com/).

We also recommend using a text editor with good TypeScript support like [Visual Studio Code](https://code.visualstudio.com/) for development.

## Building Superpowers core and systems

In a terminal, run the following commands:

```bash
# Clone the core repository in superpowers/core
git clone https://github.com/superpowers/superpowers-core superpowers/core
cd superpowers/core

# Clone the Superpowers Game system in superpowers/core/systems/game
git clone --recursive https://github.com/superpowers/superpowers-game systems/game

# Build it all. This will take a few minutes.
npm run build
```

### Running the server

Once it's done, you can start the server with:

```bash
node server start
```

Open `http://localhost:4237/` in your browser.
Later, you can hit `Ctrl+C` in the terminal to stop the server.

### Rebuilding selectively

After updating the Git repositories or making changes, you'll need to rebuild.

```bash
cd superpowers/core

# You can rebuild core and all systems with one command
npm run build
# Or rebuild only some specific folders like SupCore
npm run build SupCore
# or a particular system
npm run build systems/game

# To build in verbose mode
# (Notice there are two pairs of double dashes)
npm run build -- --verbose
```

## Building the desktop app

The desktop app is powered by [Electron](http://electron.atom.io/).

In a terminal, run the following commands:

```bash
git clone https://github.com/superpowers/superpowers-app superpowers/app
cd superpowers/app
npm run build
```

Once it's done, you can start the app by running:

```bash
# Install Electron the first time (and then everytime you want to update it)
npm install -g electron-prebuilt

npm run start
```

## Enabling development mode

In order to catch as many runtime errors as possible while working on Superpowers,
you can enable development mode.
When development mode is enabled, the project header in the top-left corner
will be blue. When it turns red, it's a good sign that you should
open your browser's dev tools and look for errors in the Console tab.

Enabling development mode will also add the `None` language to the language selector, which is useful for finding strings that need to be internationalized.

To enable development mode, open a Superpowers project, press `F12` to open the dev tools and type the following in the console:

    localStorage.setItem("superpowers-dev-mode", "true");

Reload for the change to take effect.

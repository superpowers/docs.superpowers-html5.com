# Publishing your game

Starting with v0.4, Superpowers comes with a one-click `Export Game` button, located right next to the `Debug` and `Run` buttons.

!["Export game" button](/images/export-game-button.png)

<div class="note">
  <p>**Exporting is only available from the app**, not when accessing Superpowers through the browser,
  because browsers do not let Web apps access the filesystem directly for security reasons.
</div>

## Publishing your game for the Web

You can upload the exported folder to any Web host, or zip it up and upload it as HTML5 to an online game portal like <a href="http://itch.io/" target="_blank">itch.io</a> or <a href="http://gamejolt.com" target="_blank">Game Jolt</a>.

## Packaging for desktop

<div class="note">
  <p>**Double check your project's name**, it will appear in the title bar of stand-alone builds of your game.
</div>

<div class="note">
  <p>We hope to automate all of these packaging steps in a future version.
</div>

If you want to make stand-alone, downloadable versions of your game, you can use NW.js. NW.js is basically Chrome's browser engine customized to run stand-alone HTML5 apps and games rather than a full-blown Web browser.

<div class="action">
  <p>Download the appropriate builds of <a href="http://nwjs.io/" target="_blank">NW.js</a>. We recommend you support Windows in both 64-bit or 32-bit but you'll probably be fine with only 64-bit versions for Linux and OS X (Apple hasn't been shipping 32-bit hardware for several years).
</div>

### package.json

NW.js uses manifest files called `package.json` to determine how to launch your game. Here's what it should look like:

```
{
  "name": "My Game",
  "main": "app://my-game/game/player/index.html",
  "window": {
    "width": 1000,
    "height": 600,
    "toolbar": false,
    "frame": true,
    "resizable": true
  }
}
```

Make sure to replace `My Game` and `my-game` with your game's name.

You can, of course, tweak the window settings. Read on to see where to put it.

### Packaging for Windows (32-bit and 64-bit)

<div class="action">
  <p>Unpack the NW.js ZIP archive for each architecture and rename the folders to something like `my-game-win-ia32` (32-bit) and `my-game-win-x64` (64-bit).

  <p>For both of these folders:

  <ul>
    <li>Remove `nwjc.exe` and `pdf.dll`, we don't need those
    <li>Put a copy of your exported game folder at the root, renaming it `game`
    <li>Rename `nw.exe` to something like `My Game.exe`. This is the executable players will click on
    <li>Create a `package.json` file, as detailed above, at the root
  </ul>

  <p>That's it, pack it all up  into a ZIP archive and upload.
</div>

### Packaging for Linux

<div class="action">
  <p>Unpack the NW.js tarball and rename the folder to something like `my-game-linux-x64`.

  <ul>
    <li>Remove `nwjc`, we don't need it
    <li>Put a copy of your exported game folder at the root, renaming it `game`
    <li>Rename `nw` to something like `My Game`. This is the executable players will click on
    <li>Create a `package.json` file, as detailed above, at the root
  </ul>

  <p>That's it, pack it all up into a tarball and upload.
</div>

### Packaging for OS X

<div class="action">
  <p>Unpack the NW.js ZIP archive and rename the folder to something like `my-game-osx-x64`.

  <ul>
    <li>Remove `nwjc`, we don't need it
    <li>Create a folder name `app.nw` in `nwjs.app/Contents/Resources`
    <li>Put a copy of your exported game folder inside `app.nw`, renaming it `game`
    <li>Rename `nwjs.app` to something like `My Game.app`. This is the executable players will click on
    <li>Create a `package.json` file, as detailed above, inside `My Game.app/Contents/Resources/app.nw`
  </ul>

  <p>That's it, pack it all up into a ZIP archive and upload.
</div>

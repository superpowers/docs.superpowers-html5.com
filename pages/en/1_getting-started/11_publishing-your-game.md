# Publishing your game

Superpowers comes with a one-click `Publish project` button, located in the top-left corner.

!["Publish project" button](/images/publishing-your-game/publish-project-button.png)

<div class="note">
  <p>**Exporting is only available from the app**, not when accessing Superpowers through the browser,
  because browsers do not let Web apps access the filesystem directly for security reasons.
</div>

## Publishing your game for the Web

You can upload the exported folder to any Web host, or zip it up and upload it as HTML5 to an online game portal
like <a href="http://itch.io/" target="_blank">itch.io</a> or <a href="http://gamejolt.com" target="_blank">Game Jolt</a>.

## Packaging for desktop

<div class="note">
  <p>**Double check your project's name**, it will appear in the title bar of stand-alone builds of your game.
</div>

<div class="note">
  <p>We hope to automate all of these packaging steps in a future version.
</div>

If you want to make stand-alone, downloadable versions of your game, you can use Electron.
Electron is basically Chrome's browser engine customized to run stand-alone HTML5 apps and games rather than a full-blown Web browser.

<div class="action">
  <p>Download the appropriate builds of <a href="https://github.com/atom/electron/releases" target="_blank">Electron</a>.
  We recommend you support Windows in both 64-bit or 32-bit but you'll probably be fine with only 64-bit versions
  for Linux and OS X (Apple hasn't been shipping 32-bit hardware for several years).
</div>

Electron requires that you create two files in order to run your game:

### package.json

```
{
  "name": "my-game",
  "version": "1.0.0",
  "main": "main.js"
}
```

Make sure to replace `my-game` with your game's name.

### main.js

```
const electron = require("electron");
var mainWindow = null;

electron.app.on("window-all-closed", () => {
  if (process.platform != "darwin") electron.app.quit();
});

electron.app.on("ready", () => {
  mainWindow = new electron.BrowserWindow({
    width: 1280, height: 720,
    useContentSize: true,
    // NOTE: You can enable those if you want
    // resizable: false,
    // icon: `${__dirname}/icon.png`
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on("closed", () => { mainWindow = null; });
});
```

You can, of course, tweak the window settings.
Read on to see where to put those two files.

### Packaging for Windows (32-bit and 64-bit)

<div class="action">
  <p>Unpack the Electron ZIP archive for each architecture and rename the folders to something like `my-game-win-ia32` (32-bit) and `my-game-win-x64` (64-bit).

  <p>For both of these folders:

  <ul>
    <li>Remove `locales`, `pdf.dll` and `version`, we don't need those
    <li>Put a copy of your exported game folder in `resources`, renaming it `app`
    <li>Rename `electron.exe` to something like `My Game.exe`. This is the executable players will click on
    <li>Create `package.json` and `main.js`, as detailed above, in `resources/app`
  </ul>

  <p>That's it, pack it all up  into a ZIP archive and upload.
</div>

### Packaging for Linux

<div class="action">
  <p>Unpack the Electron ZIP archive and rename the folder to something like `my-game-linux-x64`.

  <ul>
    <li>Remove `locales` and `version`, we don't need those
    <li>Put a copy of your exported game folder in `resources`, renaming it `app`
    <li>Rename `electron` to something like `My Game`. This is the executable players will click on
    <li>Create `package.json` and `main.js`, as detailed above, in `resources/app`
  </ul>

  <p>That's it, pack it all up into a ZIP archive and upload.
</div>

### Packaging for OS X

<div class="action">
  <p>Unpack the Electron ZIP archive and rename the folder to something like `my-game-osx-x64`.

  <ul>
    <li>Remove `version`, we don't need it
    <li>Put a copy of your exported game folder in `Electron.app/Contents/Resources/`, renaming it `app/`
    <li>Rename `Electron.app` to something like `My Game.app`. This is the executable players will click on
    <li>Create `package.json` and `main.js`, as detailed above, inside `My Game.app/Contents/Resources/app`
  </ul>

  <p>That's it, pack it all up into a ZIP archive and upload.
</div>

## Packaging for mobile

Do a regular export and use the [Intel XDK](https://software.intel.com/en-us/intel-xdk)
to generate a platform-specific app that you can submit to a store.

On Android, it seems like the minimum version required for WebGL support is 4.4.
Accordingly, you should set up `Projects/Build Settings/Minimum Android Version` to `19` in Intel XDK.

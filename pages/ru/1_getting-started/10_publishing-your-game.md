# Публикация вашей игры

Superpowers поставляется с публикацией в один клик по кнопке `Publish project`, расположенной в верхнем левом углу.

![Кнопка "Publish project"](/images/publishing-your-game/publish-project-button.png)

<div class="note">
  <p>**Экспорт доступен только из приложения**, не при доступе Superpowers через браузер,
  потому что браузеры не позволяют веб-приложениям обращаться к файловой системе напрямую из соображений безопасности.
</div>

## Публикация вашей игры для Интернета

Вы можете загрузить экспортированную папку на любой веб-хостинг или заархивировать ее и загрузить как HTML5 на портал онлайн-игр.
лайк <a href="http://itch.io/" target="_blank">itch.io</a> или <a href="http://gamejolt.com" target="_blank">Game Jolt</a>.

## Упаковка для desktop

<div class="note">
  <p>**Дважды проверьте название вашего проекта**, он появится в строке заголовка отдельных сборок вашей игры.
</div>

<div class="note">
  <p>Мы надеемся автоматизировать все эти этапы упаковки в будущей версии.
</div>

Если вы хотите создавать автономные загружаемые версии вашей игры, вы можете использовать Electron.
Electron - это в основном браузерный движок Chrome, предназначенный для запуска автономных приложений и игр HTML5, а не полноценного веб-браузера.

<div class="action">
  <p>Загрузите соответствующие сборки <a href="https://github.com/atom/electron/releases" target="_blank">Electron</a>.
  Мы рекомендуем вам поддерживать Windows как в 64-битной, так и в 32-битной версиях, но, вероятно, вам подойдут только 64-битные версии.
  для Linux и OS X (Apple несколько лет не поставляла 32-битное оборудование).
</div>

Electron требует, чтобы вы создали два файла, чтобы запустить вашу игру:

### package.json

```
{
  "name": "my-game",
  "version": "1.0.0",
  "main": "main.js"
}
```

Не забудьте заменить `my-game` с названием вашей игры, используя строчные слова, разделенные тире.

### main.js

```
"use strict";

const electron = require("electron");
var mainWindow = null;

electron.app.on("window-all-closed", () => {
  if (process.platform != "darwin") electron.app.quit();
});

electron.app.on("ready", () => {
  mainWindow = new electron.BrowserWindow({
    width: 1280, height: 720,
    useContentSize: true,
    // NOTE: Вы можете включить их, если хотите
    // resizable: false,
    // icon: `${__dirname}/icon.png`
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on("closed", () => { mainWindow = null; });
});
```

### Упаковка для окон (32-bit и 64-bit)

<div class="action">
  <p>Распакуйте ZIP-архив Electron для каждой архитектуры и переименуйте папки в «my-game-win-ia32» (32-разрядная версия) и «my-game-win-x64» (64-разрядная версия).

  <p>Для обеих этих папок:

  <ul>
    <li>Удалите `locales`,` pdf.dll` и `version`, они нам не нужны
    <li>Поместите копию вашей экспортированной папки с игрой в `resources`, переименовав ее в` app`
    <li>Переименуйте «Electron.exe» в нечто вроде «My Game.exe». Это исполняемые игроки будут нажимать на
    <li>Создайте `package.json` и` main.js`, как описано выше, в `resources / app`
  </ul>

  <p>Вот и все, упакуйте все это в ZIP-архив и загрузите.
</div>

### Упаковка для Linux

<div class="action">
  <p>Распакуйте ZIP-архив Electron и переименуйте папку в нечто вроде `my-game-linux-x64`.

  <ul>
    <li>Удалите `locales` и` version`, они нам не нужны
    <li>Поместите копию вашей экспортированной папки с игрой в `resources`, переименовав ее в` app`
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

Регулярно экспортируйте и используйте [Intel XDK](https://software.intel.com/en-us/intel-xdk)
создать приложение для конкретной платформы, которое вы можете отправить в магазин.

На Android кажется, что минимальная версия, необходимая для поддержки WebGL - 4.4.
Соответственно, вы должны настроить `Projects/Build Settings/Minimum Android Version` на `19` в Intel XDK.

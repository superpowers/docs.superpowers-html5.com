# Setting up Superpowers

<div class="action">
  <p>Download the correct ZIP for your platform from <a href="https://sparklinlabs.com/account" target="_blank">your account page</a>.  
  Unzip it in a convenient location and double-click on `Superpowers`.  
  The launcher will start. Click anywhere to dismiss the splash screen.
</div>

You'll see a list of servers and your own local server should start up right away.

<div class="note">
  <p>**Superpowers uses TCP ports 4237 (for serving the client) and 4238 (for serving builds)** by default, because port 80 requires special privileges on Linux &amp; OS X. Additionally, programs like Skype might already be listening on it. You can change the ports used by Superpowers in the launcher's Settings tab.

  <p>If you do so, make sure to also edit the address of the "My Server" entry in the servers list to use the correct port (Syntax is `ip:port`).
</div>

Double-click on "My Server" and a window will open. You'll be asked to choose a username.  
This is not yet linked to your Superpowers account but you probably want to use the same.

## Where's my data stored?

By default, your server configuration and projects are stored in the following places, depending on your operating system:

  * On Windows: `%APPDATA%\Superpowers`
  * On OS X: `~/Library/Superpowers` (Use Finder's "Go to folder" menu item)
  * On Linux: `~/.local/share/Superpowers`

To make Superpowers self-contained (if you want to carry Superpowers on an USB stick for example), you can move the `config.json` file and the `projects` folder to Superpowers's `app` folder and it will automatically start using those. Be careful when upgrading though, you'll need to move those files from the old version to the new version manually.

## Running a Superpowers server from the command line

It might be useful to run Superpowers on a headless server so that you don't have to keep your desktop computer on at all times.  
This should work on any Linux server including a Raspberry Pi.

  * Install <a href="https://nodejs.org/" target="_blank">node.js v4.x</a>.
  * Download the latest Superpowers release for Linux and `unzip` it. You can get rid of all files at the root except the `app` folder.
  * Use `cd` to navigate at the root of the Superpowers folder.
  * Run `node app/server`.

By default, Superpowers will store configuration and projects files in `$XDG_DATA_HOME/Superpowers` (or `~/.local/share/Superpowers` if `$XGD_DATA_HOME` is undefined). You can use the `--data-path=` option to override that behavior.

<div class="note">
  **Until Superpowers has authentication built-in**, after launching your server for the first time, you'll need to stop it (with Ctrl+C) and go edit the generated `config.json` file to set a password, then start the server up again. You can also customize the ports it'll be listening on.
</div>

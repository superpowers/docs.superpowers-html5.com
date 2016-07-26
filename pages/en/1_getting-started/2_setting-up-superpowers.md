# Setting up Superpowers

<div class="action">
  <p>Download the correct ZIP for your platform from <a href="https://sparklinlabs.itch.io/superpowers" target="_blank">the download page</a>.  
  Unzip it in a convenient location and double-click on `Superpowers`.  
  The app will start.
</div>

You'll see a list of servers and your own local server should start up right away.

<div class="note">
  <p>**Superpowers uses TCP ports 4237 (for serving the client) and 4238 (for serving builds)** by default, because port 80 requires special privileges on Linux &amp; OS X. Additionally, programs like Skype might already be listening on it. You can change the ports used by Superpowers in the app's server settings tab.

  <p>If you do so, make sure to also edit the address of the "My Server" entry in the servers list to use the correct port.
</div>

Double-click on "My Server" and a tab will open. You'll be asked to choose a username.

## Where's my data stored?

By default, your server configuration and projects are stored in the following places, depending on your operating system:

  * On Windows: `%APPDATA%\Superpowers`
  * On OS X: `~/Library/Superpowers` (Use Finder's "Go to folder" menu item)
  * On Linux: `~/.local/share/Superpowers`

To make Superpowers self-contained (if you want to carry Superpowers on an USB stick for example), you can move the `config.json` file and the `projects` folder to Superpowers's `app` folder and it will automatically start using those. Be careful when upgrading though, you'll need to move those files from the old version to the new version manually.

## Letting others join your server

By default, your server will only accept connections from the computer it is running on.

<div class="action">
  <p>To open up your server to others, setup a password in the Settings and stop/start the server.
</div>

<div class="note">
  <p>**You'll probably need to <a href="https://www.google.com/search?q=setting%20up%20port%20forwarding" target="_blank">configure your home router</a>** and/or firewall
  to allow (or forward) inbound TCP connections on the port numbers your server is listening on (4237 and 4238 by default).
</div>

Once your server is open, <a href="https://www.google.com/search?q=my%20ip" target="_blank">get your public IP address</a> and you can send a link of the form `ip:port` to the people you want to work with (e.g.&nbsp;`1.2.3.4:4237`). They can either paste this link in their browser's address bar to join without installing anything or add it to their Superpowers servers list from the app.

<div class="note">
  <p>**Make sure to share your public IP address** with those you want to collaborate with. `127.0.0.1` is a special address that always points to the computer you're using it on, so others won't be able to connect to your server with it.

  <p>The simplest way to get your public IP address is to <a href="https://www.google.com/search?q=my%20ip" target="_blank">ask Google</a>.
</div>

## Running a Superpowers server from the command line

It might be useful to run Superpowers on a headless server so that you don't have to keep your desktop computer on at all times.  
This should work on any Linux server including a Raspberry Pi.

  * Install the latest version of <a href="https://nodejs.org/" target="_blank">Node.js</a>.
  * Download the latest Superpowers release for Linux and `unzip` it. You can get rid of all files at the root except the `resources/app` folder.
  * Use `cd resources/app` from the root of the Superpowers folder.
  * Run `node server start`.

By default, Superpowers will store configuration and projects files in `$XDG_DATA_HOME/Superpowers` (or `~/.local/share/Superpowers` if `$XGD_DATA_HOME` is undefined). You can use the `--data-path=` option to override that behavior.

<div class="note">
  **Until Superpowers has authentication built-in**, after launching your server for the first time,
  you'll need to stop it (with `Ctrl+C`) and go edit the generated `config.json` file to set a password,
  then start the server up again. You can also customize the ports it'll be listening on.
</div>

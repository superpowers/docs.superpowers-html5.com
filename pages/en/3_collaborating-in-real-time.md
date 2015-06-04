# Collaborating in real-time

By default, your server will only accept connections from the computer it is running on.  

<div class="action">
  <p>To open up your server to others, setup a password in the Settings and stop/start the server.
</div>

<div class="note">
  <p>**You'll probably need to <a href="https://www.google.com/search?q=setting%20up%20port%20forwarding" target="_blank">configure your home router</a>** and/or firewall to allow (or forward) inbound TCP connections on the port number your server is listening on (80 by default).
</div>

Once your server is open, <a href="https://www.google.com/search?q=my%20ip" target="_blank">get your public IP address</a> and you can send a link of the form `ip:port` to the people you want to work with (e.g.&nbsp;`1.2.3.4:4237`). They can either paste this link in their browser's address bar to join without installing anything or add it to their Superpowers servers list from the launcher.

<div class="note">
  <p>**Make sure to share your public IP address** with those you want to collaborate with. `127.0.0.1` is a special address that always points to the computer you're using it on, so others won't be able to connect to your server with it.

  <p>The simplest way to get your public IP address is to <a href="https://www.google.com/search?q=my%20ip" target="_blank">ask Google</a>.
</div>

## Running a Superpowers server from the command line

It might be useful to run Superpowers on a headless server so that you don't have to keep your desktop computer on at all times.  
This should work on any Linux server including a Raspberry Pi.

  * Install <a href="https://github.com/joyent/node/wiki/installing-node.js-via-package-manager" target="_blank">node.js v0.12.x</a> or <a href="https://iojs.org/" target="_blank">io.js v1.x</a>.
  * Download the latest Superpowers release for Linux and `unzip` it. You can get rid of all files at the root except the `app` folder.
  * Use `cd` to navigate at the root of the Superpowers folder.
  * Run `node app/server`.

By default, Superpowers will store configuration and projects files in `$XDG_DATA_HOME/Superpowers` (or `~/.local/share/Superpowers` if `$XGD_DATA_HOME` is undefined). Starting with v0.3, you can use the `--data-path=` option to override that behavior.

<div class="note">**Until Superpowers has authentication built-in**, after launching your server for the first time, you'll need to stop it (with Ctrl+C) and go edit the generated `config.json` file to set a password, then start the server up again. You can also customize the port it'll be listening on.</div>

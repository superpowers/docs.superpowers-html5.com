# Setting up Superpowers

<div class="action">
<p>Download the correct ZIP for your platform from <a href="https://sparklinlabs.com/account" target="_blank">your account page</a>.  
Unzip it in a convenient location and double-click on `Superpowers`.  
The launcher will start. Click anywhere to dismiss the splash screen.
</div>

<div class="note">
  <p>**On Windows, the built-in Windows unzipper** might fail to unzip Superpowers because we currently have some overly long paths.  
  If it doesn't work, try [7-zip](http://www.7-zip.org/). We should be able to fix this when `npm 3.0` is released.
</div>

You'll see a list of servers and your own local server should start up right away.

<div class="note">
  <p>**Superpowers uses TCP ports 4237 (for serving the client) and 4238 (for serving builds)** by default, because port 80 requires special privileges on Linux &amp; OS X. Additionally, programs like Skype might already be listening on it. You can change the ports used by Superpowers in the launcher's Settings tab.

  <p>If you do so, make sure to also edit the address of the "My Server" entry in the servers list to use the correct port (Syntax is `ip:port`).
</div>

Double-click on "My Server" and a window will open. You'll be asked to choose a username.  
This is not yet linked to your Superpowers account but you probably want to use the same.

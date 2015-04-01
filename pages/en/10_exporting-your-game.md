# Exporting your game

Superpowers doesn't have an export button just yet. If you can't wait,
you can follow those manual steps:

<div class="note">
  <p><b>IMPORTANT:</b> Mind the difference between "a copy of the contents of a folder" and "a copy of a folder".</p>
</div>

<div class="action">
  <ol>
    <li>Create a `game` folder on your desktop, for instance
    <li>In this `game` folder, copy the contents of `superpowers/app/public` except for the `builds` subfolder
    <li>In the same `game` folder, add a copy of the `superpowers/app/plugins` folder
    <li>In each subfolder in `game/plugins`
    <ol>
      <li>Remove everything except the `public` subfolder
      <li>Move all the contents of the `public` subfolder one level up
      <li>You can then get rid of the empty `public` subfolder
    </ol>
    <li>From the latest build of your game (`superpowers/app/public/builds/.../...`), copy `game.json` and the `assets` folder to your `game` folder.
    <li>Create an `index.html` file in your `game` folder, fill it to your heart's content and put an `<iframe src="player/index.html">` somewhere in the body.
</div>

You can then upload the `game` folder to any Web host, or zip it up and upload it to an online game portal like <a href="http://itch.io/" target="_blank">itch.io</a> or <a href="http://gamejolt.com" target="_blank">Game Jolt</a>.

If you find all of this confusing, wait a few weeks and Superpowers will have a one-click export button.
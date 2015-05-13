# Your first (almost) game

<div class="action">
<p>**Create a Sprite asset**, name it `Leonard`, open it up by double-clicking and upload a small image.  
</div>

Make sure to set the grid size correctly so that your entire image is visible in the preview pane (bottom).

<div class="action">
<p>**Create a TypeScript asset** named `Game` and open it up.
</div>

Scripts are used to tell Superpowers what to do with your assets. When you run your game, **Superpowers reads each script in order from top to bottom** and executes the instructions in them. Superpowers comes with <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a> as its scripting language.

Metaphorically, your game is a movie set and you're the director. With your scripts, you will be enlisting actors, giving them costumes to put on and telling them how to behave. If you have no scripts, nobody will show up and the screen will stay black.


<div class="action">
<p>In the script editor, clear the default text and type the following (or copy/paste, but you'll learn faster if you type it up yourself):
</div>

```
// Summon our first actor, he'll play the main character
let mainCharacterActor = new Sup.Actor("Main Character");
// Tell our actor to slip into the "Leonard" costume (sprite)
new Sup.SpriteRenderer(mainCharacterActor, Sup.get("Leonard", Sup.Sprite));

// Summon a second person on stage, he'll be the camera man
let cameraManActor = new Sup.Actor("Camera Man");
// Give the man a camera!
new Sup.Camera(cameraManActor);

// Place our actors. The main character actor is at the center of the stage
mainCharacterActor.setPosition(new Sup.Math.Vector3(0,0,0));

// The camera man will be looking at the main actor from a distance
cameraManActor.setPosition(new Sup.Math.Vector3(0,0,5));
```

<p>Lines beginning with // are comments. Superpowers doesn't care about them, I only put them here to explain what's happening.</p>

<div class="note">
  <p><b>IMPORTANT:</b> Make sure to press `Ctrl+S` to apply the changes made to your script. You'll notice the little `draft` indicator in the asset tree will disappear when your script is saved.</p>
</div>

<p>Superpowers can detect some scripting errors (syntax, reference and type errors) on the fly so if you see some words in red when you're done, you'll know that you need to check this line and the lines around it again. Detailed error messages are displayed at the bottom of the editor.</p>

<p>When you're done, run the game with the `Run game` button and you should see our little actor appear!</p>

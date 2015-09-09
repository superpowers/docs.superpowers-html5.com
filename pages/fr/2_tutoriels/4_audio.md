# Sons et musique

<div class="note">
  **Heads up!** `Sup.Audio.SoundInstance` was renamed to `Sup.Audio.SoundPlayer` in Superpowers v0.12, for clarity.
</div>

## Playing a sound effect

Playing a one-shot sound effect is very straightforward:

```
// Just play the sound!
Sup.Audio.playSound("My Sound Asset");

// Or, play the sound at half volume
Sup.Audio.playSound("My Sound Asset", 0.5);
```

You can control pitch, pan (anywhere between -1.0 for left, 1.0 for right) and whether to loop:

```
let player = Sup.Audio.playSound("My Sound Asset", 0.5, { pitch: 0.5, pan: -1, loop: true });

// Later on, you can stop the sound with:
player.stop();
```

### Creating a sound player for later usage

If you want to create a sound without playing it right away,
you can use the `Sup.Audio.SoundPlayer` constructor.

```
let sfxPlayer = new Sup.Audio.SoundPlayer("My Sound Asset");

// Set it up how you wish
sfxPlayer.setVolume(0.8);

// ... Later on ...
sfxPlayer.play();
```

## Looping background music (or a machine gun...)

For looping sound effects or music, you'll want to hold onto the sound player
so that you can stop playback later on.

For instance, you can put this at the root of a script:

```
let inGameMusicPlayer = new Sup.Audio.SoundPlayer("In-Game Music", 1.0, { loop: true });

// ... When entering the game, from some behavior ...
inGameMusicPlayer.play();

// ... When returning to the menu ...
inGameMusicPlayer.stop();
``` 

And if you have multiple actors with each their own looping sound effect when they shoot,
you can store the sound player as a member variable of their behavior, like so:

```
class SoldierBehavior {
  sfxPlayer = new Sup.Audio.SoundInstance("Shoot", 1.0, { loop: true });

  update() {
    if (/* some condition for shooting */) {
      // If the sound is already playing, play() does nothing so we can call it repeatedly
      this.sfxPlayer.play();
    } else {
      this.sfxPlayer.stop();
    }
  }
};
Sup.register(SoldierBehavior);
```

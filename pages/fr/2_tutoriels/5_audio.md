# Sons et musique

<div class="note">
  **Heads up!** Pour plus de clarté, `Sup.Audio.SoundInstance` a été rennomé en `Sup.Audio.SoundPlayer` dans Superpowers v0.12.
</div>

## Jouer un effet sonore

Jouer un effet sonore 'one-shot' est très simple :

```
// Il suffis de jouer le son !
Sup.Audio.playSound("My Sound Asset");

// Ou, jouer le son à demi-volume
Sup.Audio.playSound("My Sound Asset", 0.5);
```

Vous pouvez controler le pitch (hauteur) et le pan (n'importe où entre -1.0 pour gauche et 1.0 pour droite) et définir si le son doit se répéter :

```
let player = Sup.Audio.playSound("My Sound Asset", 0.5, { pitch: 0.5, pan: -1, loop: true });

// Plus tard, vous pouvez arreter le son avec :
player.stop();
```

### Creation d'un lecteur audio pour un usage ultérieur

SI vous voulez créer un son sans le jouer tout de suite,
vous pouvez utiliser le constructeur `Sup.Audio.SoundPlayer`.

```
let sfxPlayer = new Sup.Audio.SoundPlayer("My Sound Asset");

// Mettre en place les options que vous souhaitez
sfxPlayer.setVolume(0.8);

// ... Plus tard ...
sfxPlayer.play();
```

## Boucler un musique en fon (ou une mitraillette...)

Pour boucler un effet sonore ou une musique, vous devrez garder le lecteur audio ouvert
de sorte à pouvoir arrêter la lecture plus tard.

Par exemple, vous pouvez le mettre à la racine d'un script :

```
let inGameMusicPlayer = new Sup.Audio.SoundPlayer("In-Game Music", 1.0, { loop: true });

// ... En entrant dans le jeu, en fonctione d'un comportement ...
inGameMusicPlayer.play();

// ... En retournant au menu ...
inGameMusicPlayer.stop();
``` 

Et si vous avez plusieurs acteurs ayant chacun leur propre effet sonore en boucle quand ils tiren,
vous pouvez stocker le lecteur audio dans une variable membre d'un comportement, comme ceci :

```
class SoldierBehavior {
  sfxPlayer = new Sup.Audio.SoundInstance("Shoot", 1.0, { loop: true });

  update() {
    if (/* Les conditions pour tire */) {
      // Si le son est déjà lancé, play() ne fait rien donc vous pouvez l'appeler à plusieurs reprise
      this.sfxPlayer.play();
    } else {
      this.sfxPlayer.stop();
    }
  }
};
Sup.register(SoldierBehavior);
```

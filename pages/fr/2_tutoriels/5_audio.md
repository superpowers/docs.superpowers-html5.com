# Sons et musique

<div class="note">
  **A noter !** Pour plus de clarté, `Sup.Audio.SoundInstance` a été renommé en `Sup.Audio.SoundPlayer` dans Superpowers v0.12.
</div>

## Jouer un effet sonore

Jouer un effet sonore 'one-shot' est très simple :

```
// Il suffit de jouer le son !
Sup.Audio.playSound("My Sound Asset");

// Ou, jouer le son à mi-volume
Sup.Audio.playSound("My Sound Asset", 0.5);
```

Vous pouvez contrôler le pitch (hauteur) et le pan (entre -1.0 pour gauche et 1.0 pour droite) et définir si le son doit se répéter :

```
let player = Sup.Audio.playSound("My Sound Asset", 0.5, { pitch: 0.5, pan: -1, loop: true });

// Plus tard, vous pouvez arreter le son avec :
player.stop();
```

### Création d'un lecteur audio pour un usage ultérieur

Si vous voulez créer un son sans le jouer tout de suite,
vous pouvez utiliser le constructeur `Sup.Audio.SoundPlayer`.

```
let sfxPlayer = new Sup.Audio.SoundPlayer("My Sound Asset");

// Mettre en place les options que vous souhaitez
sfxPlayer.setVolume(0.8);

// ... Plus tard ...
sfxPlayer.play();
```

## Répéter une musique en fond (ou une mitraillette...)

Pour répéter un effet sonore ou une musique, vous devrez garder une référence au lecteur audio
de sorte à pouvoir arrêter la lecture plus tard.

Par exemple, vous pouvez placer ce qui suit  à la racine d'un script :

```
let inGameMusicPlayer = new Sup.Audio.SoundPlayer("In-Game Music", 1.0, { loop: true });

// ... Quand on lance le jeu, dans un comportement ...
inGameMusicPlayer.play();

// ... Quand on retourne au menu ...
inGameMusicPlayer.stop();
``` 

Et si vous avez plusieurs acteurs avec chacun leur propre effet sonore qui boucle quand ils tirent,
vous pouvez stocker le lecteur audio dans une variable membre d'un comportement, comme ceci :

```
class SoldierBehavior {
  sfxPlayer = new Sup.Audio.SoundInstance("Shoot", 1.0, { loop: true });

  update() {
    if (/* la condition du tir */) {
      // Si le son est déjà lancé, play() ne fait rien donc on peut l'appeler à plusieurs reprises
      this.sfxPlayer.play();
    } else {
      this.sfxPlayer.stop();
    }
  }
};
Sup.register(SoldierBehavior);
```

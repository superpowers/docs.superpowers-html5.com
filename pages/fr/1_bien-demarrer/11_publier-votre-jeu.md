# Publier votre jeu

Superpowers inclut un bouton `Export Game`, situé juste à côté des boutons `Debug` et `Run`.

![Bouton "Export game"](/images/export-game-button.png)

<div class="note">
  <p>**L'export est uniquement disponible depuis l'application**, et non lorsque vous accédez à Superpowers depuis le navigateur,
  car les navigateurs n'autorisent pas l'accès direct au système de fichiers par les applications Web, pour des raisons de sécurité.
</div>

## Publier votre jeu sur le Web

Vous pouvez mettre en ligne le dossier exporté sur n'importe quel hébergeur Web, ou le compresser et l'héberger en tant qu'application HTML5 sur un portail de jeu en ligne, tel qu'<a href="http://itch.io/" target="_blank">itch.io</a> ou <a href="http://gamejolt.com" target="_blank">Game Jolt</a>.

## Publier votre jeu sur PC

<div class="note">
  <p>**Relisez bien le nom de votre projet**, il apparaîtra dans la barre de titre de la fenêtre de votre jeu.
</div>

<div class="note">
  <p>Nous espérons automatiser la préparation des paquets pour chaque plateforme dans une version future.
</div>

Si vous souhaitez proposer en téléchargement une version exécutable de votre jeu, vous pouvez utiliser NW.js. NW.js est simplement une version retravaillée du moteur de Chrome pour lancer des applications et jeux HTML5 autonomes, en lieu et place d'un navigateur complet.

<div class="action">
  <p>Téléchargez la version appropriée de <a href="http://nwjs.io/" target="_blank">NW.js</a>. Nous recommandons de supporter Windows à la fois en 32 et 64-bits, mais les versions 64-bits devrait suffire pour Linux et OS X (Ca fait des années qu'Apple n'a pas sorti de matériel 32-bits).
</div>

### package.json

NW.js utilise un fichier nommé `package.json` pour déterminer comment lancer votre jeu. Voici comment il devrait se présenter :

```
{
  "name": "Mon Jeu",
  "main": "app://mon-jeu/game/player/index.html",
  "window": {
    "width": 1000,
    "height": 600,
    "toolbar": false,
    "frame": true,
    "resizable": true
  }
}
```

Assurez-vous de remplacer `Mon Jeu` et `mon-jeu` par le nom de votre jeu.

Vous pouvez bien sûr modifier les paramètres de la fenêtre. Lisez la suite pour voir que faire de ce fichier.

### Packaging pour Windows (32-bits et 64-bits)

<div class="action">
  <p>Décompressez l'archive NW.js pour chaque architecture et renommez les dossiers selon le modèle `mon-jeu-win-ia32` (32-bits) et `mon-jeu-win-x64` (64 bits).

  <p>Pour chacun de ces dossiers :

  <ul>
    <li>Supprimez `nwjc.exe` et `pdf.dll`, on n'en a pas besoin
    <li>Placez une copie du dossier de votre jeu exporté à la racine, en le renommant `game`
    <li>Renommez `nw.exe` par exemple en `Mon Jeu.exe`. Il s'agit de l'exécutable qu'utiliseront les joueurs
    <li>Créez un fichier `package.json`, comme décrit plus haut, à la racine
  </ul>

  <p>C'est terminé, créez une archive ZIP de ce dossier et mettez-la en ligne.
</div>

### Packaging pour Linux

<div class="action">
  <p>Décompressez l'archive NW.js et renommez le dossier selon le modèle `mon-jeu-linux-x64`.

  <ul>
    <li>Supprimez `nwjc`, on n'en a pas besoin
    <li>Placez une copie de votre dossier de jeu exporté à la racine, en le renommant `game`
    <li>Renommez `nw` par exemple en `Mon Jeu`. Il s'agit de l'exécutable qu'utiliseront les joueurs
    <li>Créez un fichier `package.json`, comme décrit plus haut, à la racine
  </ul>

  <p>C'est terminé, créez une archive de ce dossier et mettez-la en ligne.
</div>

### Packaging pour OS X

<div class="action">
  <p>Décompressez l'archive NW.js et renommez le dossier selon le modèle `mon-jeu-osx-x64`.

  <ul>
    <li>Supprimez `nwjc`, on n'en a pas besoin
    <li>Créez un dossier `app.nw` dans `nwjs.app/Contents/Resources`
    <li>Placez une copie de votre dossier de jeu exporté dans `app.nw`, en le renommant `game`
    <li>Renommez `nwjs.app` par exemple en `Mon Jeu.app`. Il s'agit de l'exécutable qu'utiliseront les joueurs
    <li>Créez un fichier `package.json`, comme décrit ci-dessus, dans `Mon Jeu.app/Contents/Resources/app.nw`
  </ul>

  <p>C'est terminé, créez une archive ZIP de ce dossier et mettez-la en ligne.
</div>

## Packaging pour mobile

Faites un export de votre jeu et utilisez l'[Intel XDK](https://software.intel.com/en-us/intel-xdk)
pour générer des apps pour les plateformes de votre choix, puis soumettez-les.

Sur Android, il semble que la version minimale requise (avec support de WebGL) est la 4.4.
En conséquence, vous devriez paramétrer `Projects/Build Settings/Minimum Android Version` à `19` dans votre projet Intel XDK.

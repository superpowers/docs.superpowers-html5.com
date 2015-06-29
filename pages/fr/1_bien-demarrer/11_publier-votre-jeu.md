# Publier votre jeu

Superpowers inclut un bouton `Export Game`, situé juste à côté des boutons `Debug` et `Run`.

![Bouton "Export game"](/images/export-game-button.png)

<div class="note">
  <p>**L'export est uniquement disponible depuis l'application**, et non lorsque vous accédez à Superpowers depuis le navigateur,
  car les navigateurs n'autorisent pas l'accès direct au système de fichiers par les applications Web, pour des raisons de sécurité.
</div>

## Publier votre jeu pour le Web

Vous pouvez téléverser le répertoire exporté sur n'importe quel hébergeur Web, ou le zipper et l'héberger en tant qu'application HTML5 sur un portail de jeu en ligne, tel que <a href="http://itch.io/" target="_blank">itch.io</a> ou <a href="http://gamejolt.com" target="_blank">Game Jolt</a>.

## Publier votre jeu pour le Bureau

<div class="note">
  <p>**Vérifiez bien le nom de votre projet**, il va apparaître dans la barre de titre des versions autonomes de votre jeu.
</div>

<div class="note">
  <p>Nous espérons automatiser les étapes de packaging dans une future version.
</div>

Si vous souhaitez créer une version autonome et téléchargeable de votre jeu, vous pouvez utiliser NW.js. NW.js est simplement une version customisée du moteur de Chrome pour lancer des applications et jeux HTML5 autonomes, en lieu et place d'un navigateur complet.

<div class="action">
  <p>Téléchargez la version appropriée de <a href="http://nwjs.io/" target="_blank">NW.js</a>. Nous recommandons que vous supportiez Windows à la fois en 32 et 64-bits, mais il sera sans doute suffisant d'utiliser la version 64-bits pour Linux et OS X (Apple n'a pas sorti de matériel 32-bits depuis plusieurs années).
</div>

### package.json

NW.js utilise des fichiers manifestes appelés `package.json` pour déterminer comment lancer votre jeu. Voici comment ils devraient se présenter :

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

Vous pouvez, bien sûr, modifier les paramètres de la fenêtre. Continuez la lecture pour voir comment.

### Packaging pour Windows (32-bits et 64-bits)

<div class="action">
  <p>Dézipper l'archive NW.js pour chaque architecture et renommez les répertoires selon le modèle `mon-jeu-win-ia32` (32-bits) et `mon-jeu-win-x64` (64 bits).

  <p>Pour chacun de ces répertoires :

  <ul>
    <li>Supprimez `nwjc.exe` et `pdf.dll`, nous n'en avons pas l'utilité
    <li>Placez une copie de votre répertoire de jeu exporté à la racine, en le renommant `game`
    <li>Renommez `nw.exe` par exemple en `Mon Jeu.exe`. Il s'agit de l'exécutable qu'utiliseront les joueurs
    <li>Créer un fichier `package.json`, comme décrit ci-dessus, à la racine
  </ul>

  <p>C'est terminé, créez une archive ZIP de ce répertoire et hébergez-la.
</div>

### Packaging pour Linux

<div class="action">
  <p>Décompressez le tarball NW.js et renommez le répertoire selon le modèle `mon-jeu-linux-x64`.

  <ul>
    <li>Supprimez `nwjc`, nous n'en avons pas l'utilité
    <li>Placez une copie de votre répertoire de jeu exporté à la racine, en le renommant `game`
    <li>Renommez `nw` par exemple en `Mon Jeu`. Il s'agit de l'exécutable qu'utiliseront les joueurs
    <li>Créer un fichier `package.json`, comme décrit ci-dessus, à la racine
  </ul>

  <p>C'est terminé, créez un tarball de ce répertoire et hébergez-le.
</div>

### Packaging pour OS X

<div class="action">
  <p>Décompressez l'archive NW.js et renommez le répertoire selon le modèle `mon-jeu-osx-x64`.

  <ul>
    <li>Supprimez `nwjc`, nous n'en avons pas l'utilité
    <li>Créez un répertoire `app.nw` dans `nwjs.app/Contents/Resources`
    <li>Placez une copie de votre répertoire de jeu exporté dans `app.nw`, en le renommant `game`
    <li>Renommez `nwjs.app` par exemple en `Mon Jeu.app`. Il s'agit de l'exécutable qu'utiliseront les joueurs
    <li>Créer un fichier `package.json`, comme décrit ci-dessus, dans `Mon Jeu.app/Contents/Resources/app.nw`
  </ul>

  <p>C'est terminé, créez une archive ZIP de ce répertoire et hébergez-la.
</div>

## Packaging pour mobile

Faites un export de votre jeu et utilisez [Intel XDK](https://software.intel.com/en-us/intel-xdk)
pour générer une application spécifique à une plateforme que vous pourrez soumettre à un store.

Sur Android, il semble que la version minimale requise du support de WebGL est la 4.4.
En conséquence, vous devriez paramétrer `Projects/Build Settings/Minimum Android Version` à `19` dans Intel XDK.

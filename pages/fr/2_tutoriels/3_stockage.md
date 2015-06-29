# Sauvegarder les données de jeu

Vous pouvez utiliser `Sup.Storage.get` et `.set` pour sauvegarder et restaurer des chaînes de caractères de données.
Ces données sont sauvegardées localement sur le disque du joueur.

De plus, `Sup.Storage.clear` vous permet d'effacer toutes les données stockées pour votre jeu.

<div class="note">
  En interne, Superpowers utilise l'[API Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), donc il possède les même limitations de taille dépendantes du navigateur. Cette API est bien mieux adaptée pour de faibles nombres de données. Dans tous les cas, vous ne devriez probablement pas l'utiliser pour stocker plus de quelques méga-octets de données, car elle est synchrone et bloquera le jeu lors de la sauvegarde ou du chargement.
</div>

## Stocker plus que des chaînes de caractères

Pour stocker ou retrouver des objets complexes, vous pouvez les (dé)sérialiser en utilisant `JSON.stringify` et `.parse`.

## Sauvegarder en quittant

Vous pouvez utiliser un gestionnaire d'événement `Sup.Input` `"exit"` pour sauvegarder automatiquement quand le jeu se ferme.

```
Sup.Input.on("exit", () => {
  Sup.Storage.set("key", value);
});
```

## Démo de la sauvegarde

Cette petite démo vous permet de déplacer une image et de sauvegarder automatiquement sa position quand le jeu est fermé.

Vous pouvez [télécharger le projet démo](https://bitbucket.org/sparklinlabs/superpowers-storage-demo).

```
class CharacterBehavior extends Sup.Behavior {
  speed = 0.1;

  update() {
    if (Sup.Input.isKeyDown("LEFT")) this.actor.moveX(-this.speed);
    if (Sup.Input.isKeyDown("RIGHT")) this.actor.moveX(this.speed);
    if (Sup.Input.isKeyDown("UP")) this.actor.moveY(this.speed);
    if (Sup.Input.isKeyDown("DOWN")) this.actor.moveY(-this.speed);

    if (Sup.Input.isKeyDown("ESCAPE")) this.actor.setPosition(0, 0, 0);
  }
}
Sup.registerBehavior(CharacterBehavior);


// Paramétrer notre personnage et notre caméra
let actor = new Sup.Actor("Character");
new Sup.SpriteRenderer(actor, Sup.get("Sprite", Sup.Sprite));
actor.addBehavior(CharacterBehavior);

let cameraActor = new Sup.Actor("Camera");
new Sup.Camera(cameraActor);
cameraActor.setLocalPosition(0, 0, 10);


// Sauvegarde de la position du personnage en quittant
Sup.Input.on("exit", () => {
  // Sup.Storage stocke des chaînes de caractères,
  // donc nous devons sérialiser un JSON pour sauvegarder la position
  Sup.Storage.set("myCharacterPosition", JSON.stringify({ x: actor.getX(), y: actor.getY() }));
});


// Restaure la position du personnage en chargeant
let savedPositionJSON = Sup.Storage.get("myCharacterPosition");

if (savedPositionJSON != null) {
  // Inversement, en chargeant, nous devons désérialiser
  // une chaîne de caractères JSON en nos valeurs numériques x et y
  let { x, y } = JSON.parse(savedPositionJSON);
  actor.setPosition(x, y, 0);
}
```

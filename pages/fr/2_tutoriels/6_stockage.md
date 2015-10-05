# Sauvegarde et chargement

Vous pouvez utiliser `Sup.Storage.get` et `.set` pour sauvegarder et restaurer des chaînes de caractères de données.
Ces données sont sauvegardées localement sur le disque du joueur.

```
// ... Quand le joueur choisit un nom
Sup.Storage.set("characterName", "Leonard");

// ... Quand il relance le jeu plus tard
let characterName = Sup.Storage.get("characterName");
```

Vous pouvez aussi passer une valeur par défaut comme second paramètre à `Sup.Storage.get`.
Elle sera retournée si aucune valeur stockée n'est trouvée pour la clé demandée.

```
let characterName = Sup.Storage.get("characterName", "Sans nom");
```

De plus, `Sup.Storage.clear` vous permet d'effacer toutes les données stockées pour votre jeu.

<div class="note">
  En interne, Superpowers utilise l'[API Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), donc il hérite des mêmes limitations de taille en fonction du navigateur. Cette API a été pensée pour stocker de faibles quantités de données. Dans tous les cas, vous ne devriez probablement pas l'utiliser pour stocker plus de quelques méga-octets de données, car elle est synchrone et bloquera le jeu lors de la sauvegarde ou du chargement.
</div>

## Stocker plus que des chaînes de caractères

Pour stocker ou récupérer des nombres, tableaux ou objets complexes, vous pouvez utiliser `Sup.Storage.setJSON` et `.getJSON`.
En interne, ils seront (dé)sérialiser avec `JSON.stringify` et `.parse`.

```
let weapon = {
  name: "Mélangeur à main",
  damage: 9001,
  mode: "manual"
};

Sup.Storage.setJSON("weapon", weapon);

// ... Plus tard
let weapon = Sup.Storage.getJSON("weapon");
```

La classe d'un objet n'est pas sauvegardée, seulement ses différentes propriétés. Si par exemple, vous stockez un objet `Sup.Math.Vector2`,
vous recupérerez seulement un objet de type `{ x: number; y: number; }` et vous devrez recréer un vecteur à partir de celui-ci. 

## Sauvegarder en quittant

Vous pouvez utiliser un gestionnaire d'événement `Sup.Input` `"exit"` pour sauvegarder automatiquement quand le jeu se ferme.

```
Sup.Input.on("exit", () => {
  Sup.Storage.set("key", value);
});
```

## Démo de la sauvegarde

Cette petite démo vous permet de déplacer un sprite et de sauvegarder automatiquement sa position quand on ferme le jeu.

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


// Sauvegarder la position du personnage en quittant
Sup.Input.on("exit", () => {
  Sup.Storage.setJSON("myCharacterPosition", { x: actor.getX(), y: actor.getY() });
});


// Restaurer la position du personnage au lancement
let savedPosition = Sup.Storage.getJSON("myCharacterPosition", { x: 0, y: 0 });
actor.setPosition(savedPosition.x, savedPosition.y, 0);
```

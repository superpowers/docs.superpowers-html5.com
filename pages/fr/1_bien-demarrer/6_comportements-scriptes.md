# Comportements scriptés

Des comportements réutilisables peuvent être définis et assignés à plusieurs acteurs.  
Voici comment définir un comportement :

```
class MyBehavior extends Sup.Behavior {
  // Déclarez les propriétés ici

  awake() {
	  // L'initialisation se passe ici
    // this.actor représente l'acteur sur lequel est attaché le comportement
  }

  update() {
    // Le code placé ici sera exécuté 60x par seconde
  }

}
// N'oubliez pas d'enregistrer votre classe de comportement
Sup.registerBehavior(MyBehavior);
```

Dans les méthodes du comportement (`awake`, `update` et celles que vous définissez vous-même), vous pouvez faire référence au comportement actif avec `this` et à l'acteur rattaché avec `this.actor`.

Ajoutez un comportement à votre personnage principal du chapitre précédent.

<div class="action">
  <p>Retournez sur votre script `Game` et ajoutez le code suivant à la fin :
</div>

```
class CharacterBehavior extends Sup.Behavior {

  update() {
    if (Sup.Input.isKeyDown("LEFT")) {
      // Déplacer l'acteur du comportement actif sur l'axe X (en négatif)
      this.actor.move(new Sup.Math.Vector3(-0.1, 0, 0));
    }

    if (Sup.Input.isKeyDown("RIGHT")) {
      // La même chose, mais en positif, pour un déplacement vers la droite
      this.actor.move(new Sup.Math.Vector3(0.1, 0, 0));
    }
  }

}
Sup.registerBehavior(CharacterBehavior);

// Après avoir défini la classe de comportement,
// nous devons l'attacher à notre personnage
mainCharacterActor.addBehavior(CharacterBehavior);
```

`Sup.Input.isKeyDown(...)` retourne `true` seulement si la touche spécifiée est enfoncée.

<div class="note">
  **Il y a plein d'autres fonctions** disponibles pour lire les entrées du joueur et pour y réagir.  
  Elles sont toutes listées dans l'outil **TypeScript <abbr title="Application Programming Interface">API</abbr> browser** disponible dans Superpowers.
</div>

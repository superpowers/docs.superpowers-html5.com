# Comportements scriptés

Des comportements réutilisables peuvent être définit et vous pourrez les assignés à plusieurs acteurs.  
Voilà comment un comportement doit être définit:

```
class MyBehavior extends Sup.Behavior {
  // Déclarez les propriétés ici.

  awake() {
	// Mettre les instructions d'initialisation ici.
    // this.actor représente l'acteur sur lequel est attaché le comportement.
  }

  update() {
	// Mettre les instructions qui doivent être executées 60x par secondes.
  }

}
// N'oubliez pas d'enregistrer votre classe de comportement.
Sup.registerBehavior(MyBehavior);
```

Dans les méthodes de comportements (`awake`, `update` et celles que vous définissez vous-même), vous pouvez faire référence au comportement courant avec `this` et à l'acteur rattaché avec `this.actor`.

Ajoutez un comportement a votre personnage principal du chapitre précédent.

<div class="action">
  <p>Retournez sur votre script `Game` et ajoutez le code suivant a la fin:
</div>


```
class CharacterBehavior extends Sup.Behavior {

  update() {
    if (Sup.Input.isKeyDown("LEFT")) {
      // Déplacez le comportement de l'acteur actuel sur l'axe X négativement
      this.actor.move(new Sup.Math.Vector3(-0.1, 0, 0));
    }

    if (Sup.Input.isKeyDown("RIGHT")) {
      // Faites pareil, mais positivement, pour un déplacement vers la droite
      this.actor.move(new Sup.Math.Vector3(0.1, 0, 0));
    }
  }

}
Sup.registerBehavior(CharacterBehavior);

// Après avoir définit la classe de comportement,
// nous avons besoin de l'assigné a notre personnage
mainCharacterActor.addBehavior(CharacterBehavior);
```

`Sup.Input.isKeyDown(...)` retourne `true` seulement si la touche spécifié est appuyée.

<div class="note">
  **Il y a pleins d'autres fonctions** disponible pour lire les entrées du joueur et pour réagir avec lui.  
  Elles sont toutes listées dans **le navigateur d'<abbr title="Application Programming Interface">API</abbr> TypeScript** disponible dans Superpowers.
</div>

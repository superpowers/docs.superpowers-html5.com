# Les composants

La plupart des types de composants expose une propriété afin que vous puissiez changer leur état.

Par exemple, les gestionnaires de sprites sont exposés aux acteurs comme la propriété `spriteRenderer` :

```
class MonComportement extends Sup.Behavior {

  update(amount) {
    // Quand la barre d'espace vient d'être pressée
    if (Sup.Input.wasKeyJustPressed("SPACE")) {
      // Joue une animation sur le gestionnaire de sprite
      // de l'acteur sur lequel ce comportement est attaché
      this.actor.spriteRenderer.setAnimation("Vague");
    }
  }

}
Sup.registerBehavior(MonComportement);
``` 

Vous pouvez trouver une liste de toutes les propriétés d'acteur dans le navigateur d'<abbr title="Interface de Programmation">API</abbr> au sein de Superpowers, en particulier dans la section `Sup.Actor`.
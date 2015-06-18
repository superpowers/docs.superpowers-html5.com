# Accesseurs de composants

La plupart des types de composants exposent une propriété afin que vous puissiez changer leur état.

Par exemple, les rendus de sprites sont exposés aux acteurs sous la propriété `spriteRenderer` :

```
class MyBehavior extends Sup.Behavior {

  update(amount) {
    // Quand la barre d'espace vient d'être pressée
    if (Sup.Input.wasKeyJustPressed("SPACE")) {
      // Joue une animation sur le gestionnaire de sprite
      // de l'acteur sur lequel ce comportement est attaché
      this.actor.spriteRenderer.setAnimation("Wave");
    }
  }

}
Sup.registerBehavior(MyBehavior);
```

Vous pouvez trouver une liste de toutes les propriétés d'acteur dans le navigateur d'<abbr title="Interface de Programmation">API</abbr> au sein de Superpowers, en particulier dans la section `Sup.Actor`.

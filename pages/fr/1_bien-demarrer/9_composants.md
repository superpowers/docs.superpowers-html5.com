# Accesseurs de composants

La plupart des types de composants exposent une propriété sur les acteurs afin que vous puissiez modifier leur état.

Par exemple, les rendus de sprites sont exposés aux acteurs sous le nom `spriteRenderer` :

```
class MyBehavior extends Sup.Behavior {

  update() {
    // Quand la barre d'espace vient d'être pressée
    if (Sup.Input.wasKeyJustPressed("SPACE")) {
      // Joue une animation sur le rendu de sprite
      // de l'acteur sur lequel ce comportement est attaché
      this.actor.spriteRenderer.setAnimation("Wave");
    }
  }

}
Sup.registerBehavior(MyBehavior);
```

Vous trouverez une liste de toutes les propriétés d'acteur dans le navigateur d'<abbr title="Interface de Programmation">API</abbr> directement dans Superpowers, dans la section `Sup.Actor`.

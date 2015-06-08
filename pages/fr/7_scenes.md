# Travailler avec des scènes

Les scènes vous permettent de faire une configuration des acteurs et de leurs composants (rendu, comportements, etc.).

Nous allons reconstruire notre film depuis le début mais en utilisant les scènes au lieu de le faire par script.

<div class="action">
  <p>Créez une nouvelle scène, nommez la `Main Scene` et ouvrez la.
</div>

<div class="action">
  <p>Créez un nouvel acteur, nommez le `Main Character` et placez le en (0, 0, 0).  
  Ajoutez un composant 'SpriteRenderer' et entrez le nom `Leonard` pour le sprite a utiliser.  
  Ajoutez un autre composant, cette fois-ci de type 'Behavior' et entrez `CharacterBehavior` comme classe a utiliser.
</div>

<div class="action">
  <p>Cliquez n'importe ou dans l'arborescence de la scène pour déselectionner l'acteur que vous venez de créer.  
  Créez un autre acteur nommé `Camera Man` et placez le en (0, 0, 5).  
  Ajoutez un composant caméra dessus.
</div>

<div class="note">
  <p>**Soyez sur que l'acteur `Camera Man` n'est pas parenté a l'acteur `Main Character` ** dans l'arborescence de la scène.<br>
  Si c'est le cas, utilisez simplement le glisser-déposer pour enlever le parentage.
</div>

Maintenant que notre scène est prête, retournons dans notre script. Nous pouvons nous débarrasser de tous notre code qui créé nos acteurs et le remplacer par une seul instruction pour charger la scène. Nous avons toujours besoin de déclerer notre `CharacterBehavior`.

<div class="action">
  <p>Remplacez le contenu du script `Game` avec le code suivant:
</div>

```
class CharacterBehavior extends Sup.Behavior {
  update() {
    if (Sup.Input.isKeyDown("LEFT")) this.actor.move(new Sup.Math.Vector3(-0.1, 0, 0));
    if (Sup.Input.isKeyDown("RIGHT")) this.actor.move(new Sup.Math.Vector3(0.1, 0, 0));
  }
}
Sup.registerBehavior(CharacterBehavior);

Sup.loadScene("Main Scene");
```

<div class="note">
  <p>**Il est important de déclarer la classe `CharacterBehavior` avant de charger la scène avec `Sup.loadScene`** (ex: le mettre plus haut dans le script), ou Superpowers va vous signalez qu'il ne connait (pas encore) le comportement.
</div>

Lorsque vous travaillez avec beaucoup de classe de comportement, il est possible de mettre chacun d'eux dans leurs propres scripts pour des raisons d'organisation. Assuré vous de placer les scripts utilisés par la scène au dessus de celle-ci.

# Travailler avec des scènes

Les scènes vous permettent de construire visuellement une configuration d'acteurs et de composants (rendu, comportement, etc.).

Nous allons reconstruire notre plateau depuis le début mais en utilisant une scène au lieu de le faire par script.

<div class="action">
  <p>Créez une nouvelle scène, nommez-la `Main Scene` et ouvrez-la.
</div>

<div class="action">
  <p>Créez un nouvel acteur, nommez-le `Main Character` et placez-le en (0, 0, 0).  
  Ajoutez un composant `SpriteRenderer` et entrez le nom `Leonard` pour le sprite à utiliser.  
  Ajoutez un autre composant, cette fois-ci de type `Behavior` et entrez `CharacterBehavior` comme classe à utiliser.
</div>

<div class="action">
  <p>Cliquez n'importe où dans l'arborescence de la scène pour désélectionner l'acteur que vous venez de créer.  
  Créez un autre acteur nommé `Camera Man` et placez-le en (0, 0, 5).  
  Ajoutez un composant `Camera` dessus.
</div>

<div class="note">
  <p>**Assurez-vous que l'acteur `Camera Man` n'est pas parenté à l'acteur `Main Character`** dans l'arborescence de la scène.  
  Si c'est le cas, glissez-le à la racine pour le détacher.
</div>

Maintenant que notre scène est prête, retournons dans notre script. Nous pouvons nous débarrasser de tout notre code de création d'acteurs et le remplacer par une unique instruction pour charger la scène. Nous avons cependant toujours besoin de déclarer notre `CharacterBehavior`.

<div class="action">
  <p>Remplacez le contenu du script `Game` par le code suivant :
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
  <p>**Il est important de déclarer la classe `CharacterBehavior` avant de charger la scène avec `Sup.loadScene`** (c'est-à-dire, le mettre plus haut dans le script), ou Superpowers vous indiquera qu'il ne connait (pas encore) le comportement utilisé par la scène au moment de son chargement.
</div>

Lorsque vous travaillez avec beaucoup de classes de comportement, vous pouvez mettre chacune dans son propre script pour mieux vous organiser. Comme les scripts sont lus dans l'ordre, assurez-vous de charger votre scène dans un script placé en dessous de vos scripts définissant vos comportements.

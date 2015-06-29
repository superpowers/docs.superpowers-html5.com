# Travailler avec des modèles 3D

## Importer des modèles

Superpowers supporte actuellement un sous-ensemble des formats de fichier OBJ (statique) et glTF (animé).

<div class="note">
  <b>Pour l'instant, seul un plaquage diffus (diffuse map) est supporté pour chaque modèle.</b>
  Le support des matériaux et des shaders arrivera bientôt.
</div>

### Modèles glTF animés

<a href="https://github.com/KhronosGroup/glTF">glTF</a> est un nouveau format supporté par le Khronos Group (les personnes derrière OpenGL et Vulkan).  
La plupart des outils n'ont pas un support natif pour le moment, donc vous aurez besoin d'exporter le COLLADA et ensuite d'utiliser [le COLLADA2glTF converter](https://github.com/KhronosGroup/glTF/wiki/Converter-builds).

Les instructions suivantes partent du principe que vous utilisez Blender, mais les autres outils devraient avoir un fonctionnement similaire.

<div class="note">
  <p><b>Assurez-vous d'avoir un seul mesh et un seul matériau.</b> Votre mesh devrait être apparenté à une armature et être à l'origine (0,0,0).
</div>

<div class="action">
  <p>Assurez-vous que votre modèle soit dans sa bind pose sans action active.<br>
  Depuis le menu `File`, sélectionnez `Export > Collada (Default) (.dae)`.<br>
  Cochez la case `Triangulate`.

  <p>Glissez-déplacez le fichier `.dae` résultant sur l'exécutable du [COLLADA2glTF converter](https://github.com/KhronosGroup/glTF/wiki/Converter-builds).<br>
  Vous obtiendrez plusieurs fichiers, nous aurons seulement besoin du `.gltf` et du `.bin`.

  <p>Répétez le processus pour chaque action que vous souhaitez exporter, en activant l'action auparavant.
</div>

Maintenant, importons votre modèle dans Superpowers.

<div class="action">
  <p>Créez un nouveau modèle 3D et cliquez sur le bouton `Upload`.<br>
  Sélectionnez à la fois les fichiers `.gltf` et `.bin` dans la fenêtre de sélection des fichiers (maintenir `Ctrl` vous permet de sélectionner plusieurs fichiers sous Windows).

  <p>Utilisez le bouton `New` pour créer une animation et chargez-la avec le bouton `Upload` juste à côté.
</div>

![](http://i.imgur.com/niveyoP.gif)

## Attacher un objet à la main d'un personnage

Il est assez simple d'attacher un objet à un os animé, que ce soit une arme, un chapeau ou un sac à dos.

Utilisez simplement `Sup.ModelRenderer.getBoneTransform` pour obtenir la position et l'orientation globale actuelle d'un os et appliquez-la à l'acteur que vous voulez attacher.

```
class CharacterHandBehavior extends Sup.Behavior {

  itemActor: Sup.Actor;

  awake() {
    // Paramétrez `this.itemActor` ici
    // ou lorsque vous créez le CharacterHandBehavior
  }

  update() {
    let handTransform = this.actor.modelRenderer.getBoneTransform("Left Hand");

    this.itemActor.setPosition(handTransform.position);
    this.itemActor.setOrientation(handTransform.orientation);
  }
}
Sup.registerBehavior(CharacterHandBehavior);
```

Voici une petite démo. Vous pouvez télécharger [le projet source](https://bitbucket.org/sparklinlabs/superpowers-model-demo/) et l'exécuter pour vous-même.

![](http://i.imgur.com/gep1b6u.gif)

Si l'objet ne se place pas bien, vous pouvez ajouter un écart avec `this.itemActor.moveOriented(...)` ou `this.itemActor.rotateLocalEulerAngles(...)`.

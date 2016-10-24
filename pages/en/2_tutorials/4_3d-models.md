# Working with 3D models

## Importing models

Superpowers currently supports a subset of the OBJ (static) and glTF (animated) file formats.

<div class="note">
  <b>At the moment, only a single diffuse map is supported for each model.</b>
  Material and shader support is coming soon.
</div>

### Animated glTF models

<a href="https://github.com/KhronosGroup/glTF">glTF</a> is a new format supported by the Khronos Group (the people behind OpenGL and Vulkan).  
Most tools don't have native support right now, so you'll need to export COLLADA and then use [the COLLADA2glTF converter](https://github.com/KhronosGroup/glTF/wiki/Converter-builds).

The following instructions assume you're using Blender, but other tools should work similarly.

<div class="note">
  <p><b>Make sure you have a single mesh and a single material.</b> Your mesh should be parented to an armature and be at the origin (0,0,0).
</div>

<div class="action">
  <p>Make sure your model is in its bind pose with no active action.<br>
  From the `File` menu, select `Export > Collada (Default) (.dae)`.<br>
  Check the `Triangulate` box.

  <p>Drag and drop the resulting `.dae` file onto the [the COLLADA2glTF converter](https://github.com/KhronosGroup/glTF/releases)'s executable.<br>
  You'll get several files, we only care about the `.gltf` and the `.bin` ones.

  <p>Repeat the process for each action you want to export, making the action active beforehand.
</div>

Now let's import a model in Superpowers. You can find an example model in the [Superpowers asset packs](https://github.com/sparklinlabs/superpowers-asset-packs/tree/master/3d-character/character/animation/bind-pose).

<div class="action">
  <p>Create a new 3D Model asset and click the `Upload` button.<br>
  Select both the `.gltf` and `.bin` file at once in the file selection dialog (Holding down `Ctrl` lets you select multiple files on Windows).

  <p>Use the `New` button to create animation and upload it with the `Upload` button next to it.
</div>

![](http://i.imgur.com/niveyoP.gif)

## Attaching an item to a character's hand

It's pretty easy to attach an object to an animated bone, whether it's a weapon,
a hat or a backpack.

Just use `Sup.ModelRenderer.getBoneTransform` to get a bone's current global position and orientation and apply it to the actor you want to attach.

```
class CharacterHandBehavior extends Sup.Behavior {

  itemActor: Sup.Actor;

  awake() {
    // Setup `this.itemActor` here
    // or when creating the CharacterHandBehavior
  }

  update() {
    let handTransform = this.actor.modelRenderer.getBoneTransform("Left Hand");

    this.itemActor.setPosition(handTransform.position);
    this.itemActor.setOrientation(handTransform.orientation);
  }
}
Sup.registerBehavior(CharacterHandBehavior);
```

Here's a little demo. You can download [the source project](https://bitbucket.org/sparklinlabs/superpowers-model-demo/) and run it for yourself.

![](http://i.imgur.com/gep1b6u.gif)

If the item doesn't fit right, you can add an offset with `this.itemActor.moveOriented(...)` or `this.itemActor.rotateLocalEulerAngles(...)`.

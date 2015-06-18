# Working with 3D models

Superpowers currently supports a subset of the OBJ and glTF file formats,
respectively for static and animated 3D models.

<div class="note">
  <b>At the moment, only a single diffuse map is supported for each model.</b>
  Material and shader support is coming soon.
</div>

## Static OBJ models

The OBJ format is pretty straightforward and should work great.

<div class="note">
  <p><b>Make sure you only use triangles and quad faces</b>, or triangulate before exporting
  from your 3D authoring software.
</div>

## Animated glTF models

<a href="https://github.com/KhronosGroup/glTF">glTF</a> is a fairly new format supported by the Khronos Group (the people behind OpenGL).

Most tools don't support it directly at the moment, so you'll need to export COLLADA and then use [the COLLADA2glTF converter](https://github.com/KhronosGroup/glTF/wiki/Converter-builds). We have tested COLLADA models exported by recent versions of [Blender](http://www.blender.org/) to work properly with it.

The following instructions assume you're using Blender too.

<div class="note">
  <p><b>Make sure you have a single mesh and a single material.</b> Your mesh should be parented to an armature and both of them should be located at the origin (0,0,0) when viewed in object mode, otherwise you might end up with weird deformations.
</div>

<div class="action">
  <p>Make sure your model is in its bind pose with no action active.<br>
  From the `File` menu, select `Export > Collada (Default) (.dae)`.<br>
  You probably want to check the `Triangulate` box.

  <p>Drag and drop the resulting `.dae` file onto the [the COLLADA2glTF converter](https://github.com/KhronosGroup/glTF/wiki/Converter-builds)'s executable.<br>
  You'll get several files, we only care about the `.gltf` and the `.bin` ones.

  <p>Repeat the process for each action you want to export, making the action active beforehand.
</div>

<div class="action">
  <p>To import your model in Superpowers, create a new 3D Model asset and click the `Upload` button.<br>
  Select both the `.gltf` and `.bin` file at once in the file selection dialog.

  <p>Use the `New` button to create animation and upload them with the `Upload` button next to it.
</div>

<div class="note">
  <b>If the import fails</b>, you can use the Console tab in the development tools (F12) to find details about what might have gone wrong.
</div>

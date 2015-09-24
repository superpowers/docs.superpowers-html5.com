# Cameras, viewports and UI

## Perspective versus Orthographic

A camera can either be in perspective or orthographic projection mode.

![](/images/cameras/camera-modes.png)

When using a perspective projection, objects farther away from the camera will look smaller, just like in real life.
It's great for most 3D games. Conversely, an orthographic projection is best for 2D or 3D-isometric games,
as well as 2D user interfaces in 3D games. 

### Configuring a perspective camera

![](/images/cameras/perspective-settings.png)

The `Field of view` (often abbreviated FOV) controls how wide of an angle your camera will see vertically.
The resulting horizontal field of view will depend on the game window's ratio (you can enforce a fixed ratio like 16:9 through your project's settings, in the `Game` settings pane).

### Configuring an orthographic camera

![](/images/cameras/orthographic-settings.png)

The `Orthographic Scale` controls the vertical extent of what your camera will look at, in scene units.
Just like for the field of view, the horizontal extent will depend on the game window's ratio.

### Other settings

The `Near` and `Far plane` control the extent of the camera's [viewing frustum](https://en.wikipedia.org/wiki/Viewing_frustum).
When rendering a 3D object, your GPU stores and compares the depth of any previously rendered object for each of the pixels
occupied on screen to determine whether the object is occluded or not.

## Rendering with multiple cameras

You can set up a camera's `Viewport` so that it renders only to an area of the game's window. This is useful for split-screen multiplayer games, for instance.
The values should be in the 0-1 range.

The `Depth` setting is used to order cameras when multiple viewports are overlapping. Cameras with higher depth values will appear in front.  

## Layers

Render layers allows you to only render some actors for a given camera.
You can set up your game's layers from the `Game` pane in the `Settings`.
You can then choose which layer(s) a camera should render.

This could be used to have an orthographic camera that only renders user interface-related actors,
while the main camera renders everything else.

<div class="note">
  **Setting a camera's layers isn't implemented yet** as of Superpowers v0.12.  
  Until it is, the recommended (and hacky) way to do user interface is to move the UI camera and its actors far away on one axis.
</div>

# Камеры, вьюпорты и UI

## Перспектива против Орфографии

Камера может находиться в режиме перспективного или ортографического проецирования..

![](/images/cameras/camera-modes.png)

При использовании перспективной проекции объекты, находящиеся дальше от камеры, будут выглядеть меньше, как в реальной жизни.
Это отлично подходит для большинства 3D-игр. И наоборот, ортографическая проекция лучше всего подходит для 2D или 3D-изометрических игр,
а также 2D пользовательские интерфейсы в 3D играх. 

### Настройка перспективной камеры

![](/images/cameras/perspective-settings.png)

 `Field of view` (FOV) определяет, насколько широко угол зрения ваша камера будет видеть вертикально.
Результирующее горизонтальное поле зрения будет зависеть от соотношения окна игры (Вы можете установить фиксированное соотношение, например, 16: 9, в настройках своего проекта на панели настроек `Game`).

### Настройка орфографической камеры

![](/images/cameras/orthographic-settings.png)

The `Orthographic Scale` controls the vertical extent of what your camera will look at, in scene units.
Just like for the field of view, the horizontal extent will depend on the game window's ratio.

### Other settings

The `Near` and `Far plane` control the extent of the camera's [viewing frustum](https://en.wikipedia.org/wiki/Viewing_frustum).
When rendering a 3D object, your GPU stores and compares the depth of any previously rendered object for each of the pixels
occupied on screen to determine whether the object is occluded or not.

## Рендеринг с несколькими камерами

You can set up a camera's `Viewport` so that it renders only to an area of the game's window. This is useful for split-screen multiplayer games, for instance.
The values should be in the 0-1 range.

The `Depth` setting is used to order cameras when multiple viewports are overlapping. Cameras with higher depth values will appear in front.  

## Слои

Render layers позволяет рендерить только некоторых актеров для данной камеры.
Вы можете настроить слои своей игры на панели `Game` в `Settings`.
Затем вы можете выбрать, какой слой (слои) должна отображать камера..

Это может быть использовано для создания орфографической камеры, которая воспроизводит только актеров, связанных с пользовательским интерфейсом,
в то время как основная камера делает все остальное.

<div class="note">
  **Настройка слоев камеры еще не реализована** as of Superpowers v0.12.  
  До тех пор, пока это не так, рекомендуемый (и хакерский) способ создания пользовательского интерфейса - это перемещение камеры пользовательского интерфейса и ее актеров далеко на одной оси.
</div>

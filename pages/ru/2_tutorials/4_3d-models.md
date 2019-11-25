# Работа с 3D моделями

## Importing models

Superpowers поддерживает пока подмножество OBJ (static) и glTF (анимированный) форматы файлов.

<div class="note">
  <b>На данный момент для каждой модели поддерживается только одна диффузная карта..</b>
  Material and shader support is coming soon.
</div>

### Анимированные glTF модели

<a href="https://github.com/KhronosGroup/glTF">glTF</a> это новый формат поддерживаемый Khronos Group (люди стоящие за OpenGL и Vulkan).  
Большинство инструментов сейчас не имеют встроенной поддержки, так что вам нужно будет экспортировать COLLADA а затем использовать [конвертер COLLADA2glTF](https://github.com/KhronosGroup/glTF/wiki/Converter-builds).

Следующие инструкции предполагают, что вы используете Blender, но другие инструменты должны работать аналогично.

<div class="note">
  <p><b>Убедитесь, что у вас есть одна сетка и один материал.</b> Ваша сетка должна быть связана с арматурой и находиться в начале координат (0,0,0).
</div>

<div class="action">
  <p>Убедитесь, что ваша модель находится в позе привязки без активных действий.<br>
  Из меню `File` , выберите `Export > Collada (Default) (.dae)`.<br>
  Отметьте `Triangulate`.

  <p>Перетащите получившийся `.dae` файл в [COLLADA2glTF конвертер](https://github.com/KhronosGroup/glTF/releases)'s executable.<br>
  Вы получите несколько файлов, мы заботимся только о `.gltf` и `.bin` .

  <p>Повторите процесс для каждого действия, которое вы хотите экспортировать, предварительно сделав его активным..
</div>

Теперь давайте импортируем модель в Superpowers. Вы можете найти пример модели в [Superpowers asset packs](https://github.com/sparklinlabs/superpowers-asset-packs/tree/master/3d-character/character/animation/bind-pose).

<div class="action">
  <p>Создайте 3D Model asset и кликните `Upload` .<br>
  Выделите оба файла и `.gltf` и `.bin` сразу в диалоге выбора файла (удерживая `Ctrl` можно выделить несколько файлов Windows).

  <p>Используйте кнопку `New` для создания анимации и загрузки ее по кнопке `Upload` .
</div>

![](http://i.imgur.com/niveyoP.gif)

## Прикрепление предмета к руке персонажа

Довольно просто прикрепить объект к анимированной кости, будь то оружие,
шляпа или рюкзак.

Просто используйте `Sup.ModelRenderer.getBoneTransform` чтобы получить текущую глобальную позицию и ориентацию кости и применить ее к актору который вы хотите присоединить.

```
class CharacterHandBehavior extends Sup.Behavior {

  itemActor: Sup.Actor;

  awake() {
    // настраивайте `this.itemActor` здесь
    // или при создании CharacterHandBehavior
  }

  update() {
    let handTransform = this.actor.modelRenderer.getBoneTransform("Left Hand");

    this.itemActor.setPosition(handTransform.position);
    this.itemActor.setOrientation(handTransform.orientation);
  }
}
Sup.registerBehavior(CharacterHandBehavior);
```

Вот небольшая демонстрация. Вы можете скачать [the source project](https://bitbucket.org/sparklinlabs/superpowers-model-demo/) и запустить его для себя.

![](http://i.imgur.com/gep1b6u.gif)

Если элемент не подходит, вы можете добавить смещение с помощью `this.itemActor.moveOriented(...)` или `this.itemActor.rotateLocalEulerAngles(...)`.

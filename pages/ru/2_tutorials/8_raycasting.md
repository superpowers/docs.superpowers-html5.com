# Отброс лучей, сбор мыши

Raycasting позволяет обнаруживать пересечения между лучом и геометрическими объектами.
Его можно использовать, например, для проверки попадания пули в игрока или, если мышь парит над кнопкой..

## Настройка луча

```
let ray = new Sup.Math.Ray();

// Вы можете выбрать происхождение и направление
ray.setOrigin(0, 1, 2);
ray.setDirection(0, 0, 1);

// Или вы можете настроить его с камеры и позиции мыши
ray.setFromCamera(someCameraComponent, Sup.Input.getMousePosition());
```

## Проверка на пересечение с актерами

```
let hits = ray.intersectActors([ /* a list of actors */ ]);

// Пересечения отсортированы по расстоянию от ближайшего к дальнему
for (let hit of hits) {
  Sup.log(`Actor ${hit.actor.getName()} was hit by ray at ${hit.distance}`);
  // объект `hit` также имеет точку координат и нормаль столкновения
}
```

## Проверка на пересечение с плоскостью

```
// Плоскость может быть установлена ​​с нормалью и расстоянием от этой нормали
// (В качестве альтернативы, вы можете использовать `plane.setFromPoint(normal, point);`)
let plane = new Sup.Math.Plane(Sup.Math.Vector3.forward(), 10);

let hit = ray.intersectPlane(plane);
if (hit != null) Sup.log(`Луч попал в плосколсть в ${hit.point}`);
```

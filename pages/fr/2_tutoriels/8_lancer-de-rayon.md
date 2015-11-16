# Rayons et sélection à la souris

Le lancer de rayon permet de détecter les intersections entre un rayon et des objets géométriques.
On peut l'utiliser pour vérifier si une balle à toucher un joueur ou si la souris survole un bouton, par exemple.

## Préparer un rayon

```
let ray = new Sup.Math.Ray();

// Vous pouvez définir l'origine et la destination
ray.setOrigin(0, 1, 2);
ray.setDirection(0, 0, 1);

// Ou vous pouvez le définir en fonction de la position de la souris par rapport à une caméra
ray.setFromCamera(someCameraComponent, Sup.Input.getMousePosition());
```

## Intersection avec des acteurs

```
let hits = ray.intersectActors([ /* une liste d'acteurs */ ]);

// Les intersections sont triées par distance, de la plus courte à la plus longue
for (let hit of hits) {
  Sup.log(`L'acteur ${hit.actor.getName()} a été frappé par le rayon à ${hit.distance}`);
  // L'objet `hit` contient également les coordonnées du point ainsi que la normale
}
```

## Intersection avec un plan

```
// Un plan peut être défini avec une normale et la distance à partir de celle-ci
// (Sinon, vous pouvez utiliser `plane.setFromPoint(normal, point);`)
let plane = new Sup.Math.Plane(Sup.Math.Vector3.forward(), 10);

let hit = ray.intersectPlane(plane);
if (hit != null) Sup.log(`Le rayon a frappé le plan en ${hit.point}`);
```

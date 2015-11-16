# Casting rays, mouse picking

Raycasting lets you detect intersections between a ray and geometrical objects.
It can be used to check if a bullet hit a player or if the mouse is hovering a button, for instance.

## Setting up a ray

```
let ray = new Sup.Math.Ray();

// You can choose an origin and direction
ray.setOrigin(0, 1, 2);
ray.setDirection(0, 0, 1);

// Or you can set it up from a camera and mouse position
ray.setFromCamera(someCameraComponent, Sup.Input.getMousePosition());
```

## Checking for intersection with actors

```
let hits = ray.intersectActors([ /* a list of actors */ ]);

// The hits are sorted by distance from closest to farthest
for (let hit of hits) {
  Sup.log(`Actor ${hit.actor.getName()} was hit by ray at ${hit.distance}`);
  // The `hit` object also has the point coordinates and normal of the hit
}
```

## Checking for intersection with a plane

```
// A plane can be set with a normal and distance from that normal
// (Alternatively, you could use `plane.setFromPoint(normal, point);`)
let plane = new Sup.Math.Plane(Sup.Math.Vector3.forward(), 10);

let hit = ray.intersectPlane(plane);
if (hit != null) Sup.log(`The ray hit the plane at ${hit.point}`);
```

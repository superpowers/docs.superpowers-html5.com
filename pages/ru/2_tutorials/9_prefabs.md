# Prefabs and instantiation

Games often have projectiles, mobs or bonuses that get created
("instantiated" in programming speak) and destroyed many times over.

They can be made up of a complex hierarchy of actors, or at the very least have multiple components.
Rather than build them in code, you can use `Scene` assets as reusable prefabs.

## Instantiating the contents of a scene

You can use `Sup.appendScene("Scene Asset")` to add all the actors described in a scene to your stage.
Existing actors won't be removed.

<div class="note">
  **Under the hood**, `Sup.loadScene(...)` is equivalent to a call to `Sup.destroyAllActors()` followed by `Sup.appendScene(...)`.
</div>

You can append a scene as many times as you want, and optionally specify a parent actor as a second argument.

## Using prefabs in the scene editor

There's a `New Prefab` button next to the `New Actor` button in the scene editor.
It lets you attach other scenes as part of your main scene.

<div class="note">
  **Prefabs even work recursively**, meaning you can have a scene referencing a second scene,
  itself referencing a third scene and so on... Superpowers will automatically prevent circular references.
</div>

In order for a scene to be usable as a prefab, it must have a single actor at its root.
When used from another scene, this root actor's name will be overwritten by the prefab's name.
For instance, you could have a scene named `Health Bonus` with a root actor named `Bonus Root`, and
use it as a prefab under various names like `Secret Health Bonus`, `Health Bonus 3` and so on.

<div class="note">
  **Actor components in prefabs will be customizable** in a future version.
  For now, you might get the prefab's name (using `Sup.Actor.getName()`) in a behavior to apply custom settings.
  It's not ideal but hey, better than nothing!
</div>
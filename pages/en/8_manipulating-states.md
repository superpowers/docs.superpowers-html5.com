# Manipulating states

Variables let you store, read and change state while your game is running. They can be used to store what level the player is on, how much health a monster has, an object's velocity, what objects are in a character's inventory or anything, really.

You can declare and initialize a global variable at the root of a script:

```
let currentLevel = 1;
```

When some event happens, you can increase the value:

```
// ... When the player reaches the exit ...
currentLevel++;
Sup.loadScene("Level " + currentLevel);
```

When you declare a variable inside a function, it only exists while that function is executed:

```
function doSomething() {
  let i = 0;
  i++;
  // `i` now equals 1
}
```

No matter how many times you call `doSomething()`, `i` will be reset to `0` and then `1` but will not go higher.

Similarly, since a variable declared inside a method only exists while that method is being executed, you cannot reference it from another method:

```
class MyClass {

  doSomething() {
    let i = 0;
  }

  doSomethingElse() {
    // Trying to use `i` here would result in an error.
    // There is no `i` variable in the context of `doSomethingElse()`.
  }
}
```

In order to maintain state linked to a particular behavior component (like, a character's health), you can use member variables:

```
class MyBehavior extends Sup.Behavior {

  // Member variables should be declared without the `let` keyword,
  // right inside the class body:
  health = 100;

  takeDamage(amount) {
    // Member variables are initialized when the behavior component is created
    // You can access the behavior itself and its member variables through `this`.
    this.health -= amount;
    if (this.health <= 0) {
      // Die!
      this.actor.destroy();
    }
  }

}
Sup.registerBehavior(MyBehavior);
```

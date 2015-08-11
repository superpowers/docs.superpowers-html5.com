# TypeScript primer

Superpowers scripts are written in TypeScript.
It's a nice-to-use, powerful language, with a convoluted history.

Here's some background, and an intro to get you started.

## From JavaScript to TypeScript

JavaScript is a [quirky, flawed language](https://www.destroyallsoftware.com/talks/wat) that's recently been getting much better.
It is actually standardized under the name ECMAScript, for complicated reasons.
The latest version of JavaScript, ECMAScript 2015 (previously known as ECMAScript 6), fixes many of the frustrations people had and adds lots of new features.

It's [going to take a year or two](https://kangax.github.io/compat-table/es6/) for all those improvements to make their way into the browsers.
In the meantime, Web developers have created various tools like [Babel.js](https://babeljs.io/)
or languages like [TypeScript](http://www.typescriptlang.org/), [Flow](http://flowtype.org/) and [CoffeeScript](http://coffeescript.org/)
that let you use new language features right now and will automatically rewrite ("transpile") your scripts down to ECMAScript 5, the version of JavaScript currently supported by the browsers.

## Why TypeScript?

We chose TypeScript specifically, because it's a typed superset of the latest version of JavaScript. That means two things:

  * When making games in Superpowers, millions of Web developers can reuse their hard-earned knowledge of JavaScript.
  * TypeScript's powerful and fast type system allows Superpowers to provide real-time error reporting and great auto-completion.

![](http://i.imgur.com/vnJU8Tt.gif)

As an added bonus, the developers of TypeScript are working with the standard committee to inform the design of upcoming JavaScript versions,
so it's a great investment all around.

## Block-scoped variables

<div class="note">
  If you don't know too much about variables or functions, you should probably [take an intro to JavaScript](http://www.codecademy.com/en/tracks/javascript) first.
</div>

<abbr title="ECMAScript 2015">ES2015</abbr> lets you declare block-scoped variables with the new `let` keyword.
As a general rule, you should no longer use the old `var` keyword, which has less convenient, function-scoped semantics.

```
// myVariable doesn't exist here

if (someCondition) {
  // myVariable can't be accessed here (before its declaration)
  let myVariable = 10;
  // myVariable lives until the block is closed
}

// myVariable doesn't exist here either
// All of those comments would be false if you used `var` instead.
```

## Typed variables and functions

When declaring a variable, TypeScript can infer its type from the value you assign to it:

```
let myVariable = 10; // myVariable's type is `number`

// TypeScript will return an error if you do incorrect things like adding a number and a string 
myVariable += "a string";
```

You can explicitely define a variable's type even if you don't initialize it right away:

```
let myVariable: string; // myVariable's type is `string`, with `undefined` as its initial value
```

When declaring a function, you can annotate its parameters and return type:

```
function repeat(what: string, times: number): string {
  let result = "";
  for (let i = 0; i < times; i++) result += what;
  return result;
} 

let coolThrice = repeat("cool", 3); // This will return "coolcoolcool"
repeat(3, "cool"); // Error, because of the incorrect argument types
```

In many cases, TypeScript can also infer a function's return type based on the value returned.

Superpowers will even be able to auto-complete `repeat` for you and display its signature (parameters and return type). 

[Read more about types](http://www.typescriptlang.org/Handbook#basic-types).

## Classes

ES5 only had prototype-based inheritance which is pretty flexible but hard to both write and read.
ES2015 brings classes for a more traditional object-oriented paradigm, and TypeScript augments them once again with powerful type checking.

Here's a look at the syntax:

```
class Lift {

  // TypeScript lets you declare members and their type
  floor: number;
  
  // You can use default parameter values
  constructor(initialFloor=1) {
    this.floor = initialFloor;
  }
  
  goUp() {
    if (this.floor < 10) this.floor++;
  }
  
  goDown() {
    if (this.floor > 0) this.floor--;
  }
}

let myLift = new Lift();
myLift.goUp(); // myLift.floor is now 2
```

[Read more about TypeScript classes](http://www.typescriptlang.org/Handbook#classes).

## Better anonymous functions

In ECMAScript 5, when passing a function as a callback to another function, you used to have to do a little dance
involving `Function.bind` to make sure the value of `this` was preserved.

With ECMAScript 2015, you can now use the new fat-arrow `() =>` syntax to create anonymous functions ("lambdas")
that preserve `this` automatically. 

```
// Assuming we're in some context where `this` has a `saving` property.
this.saving = true;

// In this example, `saveToDisk` would be a long-running asynchronous function
saveToDisk(() => {
  // `this` is still the same. With `function() { ... }`, you'd have no guarantee
  this.saving = false;
});
```

With ECMAScript 2015 classes, methods also preserve the value of `this` for you.

[Read more about lambdas and `this`](http://www.typescriptlang.org/Handbook#functions-lambdas-and-using-39this39).

## Iterating over arrays

Another long-standing painpoint of JavaScript involves iterating over arrays.

```
let myArray = [ 100, 10, 1 ];

// With ECMAScript 2015's new `of` keyword, it's easy
for (let value of myArray) console.log(value);

// Previously, you would have written:
// for (var i = 0; i < myArray.length; i++) console.log(myArray[i]);
```

## Learning more

  * [Codecademy's JavaScript course](http://www.codecademy.com/en/tracks/javascript)
  * [Learning ES6](https://github.com/ericdouglas/ES6-Learning)
  * [es6-features.org](http://es6-features.org/)
  * [TypeScript Handbook](http://www.typescriptlang.org/Handbook)

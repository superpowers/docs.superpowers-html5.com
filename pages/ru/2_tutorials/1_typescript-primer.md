# TypeScript primer

Superpowers scripts пишут на TypeScript.
Это удобный, мощный язык с запутанной историей.

Вот некоторая предыстория и введение, чтобы вы начали.

## От JavaScript к TypeScript

JavaScript это [причудливый, некорректный язык](https://www.destroyallsoftware.com/talks/wat) это недавно становилось намного лучше.
Это на самом деле стандартизировано под названием ECMAScript, по сложным причинам.
Последняя версия JavaScript, ECMAScript 2015 (ранее известный как ECMAScript 6), исправляет многие разочарования, которые были у людей, и добавляет множество новых функций.

Это [собирается занять год или два](https://kangax.github.io/compat-table/es6/) для всех этих улучшений, чтобы пробиться в браузеры.
В это время, Web разработчики создали различные инструменты, такие как [Babel.js](https://babeljs.io/)
или такие языки, как [TypeScript](http://www.typescriptlang.org/), [Flow](http://flowtype.org/) и [CoffeeScript](http://coffeescript.org/)
это позволяет вам прямо сейчас использовать новые языковые функции и автоматически переписывает («переносит») ваши скрипты до ECMAScript 5, версии JavaScript, поддерживаемой в настоящее время браузерами.

## почему TypeScript?

Мы специально выбрали TypeScript, потому что это типизированное надмножество последней версии JavaScript. Это означает две вещи:

  * При создании игр в Superpowers, миллионы Web разработчиков могут повторно использовать свои с трудом заработанные знания JavaScript.
  * TypeScript's мощная и быстрая система типов позволяет Superpowers предоставлять отчеты об ошибках в реальном времени и отличное автозаполнение.

![](http://i.imgur.com/vnJU8Tt.gif)

В качестве дополнительного бонуса разработчики TypeScript работают со стандартным комитетом, чтобы сообщить дизайн будущих версий JavaScript,
так что это отличное вложение.

## Блочные переменные

<div class="note">
  Если вы не знаете слишком много о переменных или функциях, вам, вероятно, следует [познакомиться с JavaScript](http://www.codecademy.com/en/tracks/javascript).
</div>

<abbr title="ECMAScript 2015">ES2015</abbr> позволяет объявлять блочные переменные с помощью нового ключевого слова let.
Как правило, вам больше не следует использовать старое ключевое слово `var`, которое имеет менее удобную семантику в функциональной области.

```
// myVariable не существует здесь

if (someCondition) {
  // myVariable здесь нельзя получить доступ (до его объявления)
  let myVariable = 10;
  // myVariable живет до закрытия блока
}

// myVariable здесь тоже не существует
// Все эти комментарии были бы ложными, если бы вы использовали вместо этого `var`.
```

## Типизированные переменные и функции

При объявлении переменной TypeScript может определить ее тип по значению, которое вы ей присваиваете.:

```
let myVariable = 10; // myVariable's type is `number`

// TypeScript вернет ошибку, если вы сделаете неправильные вещи, такие как добавление числа и строки
myVariable += "a string";
```

Вы можете явно определить тип переменной, даже если вы не инициализируете ее сразу:

```
let myVariable: string; // Тип myVariable это `string`, с` undefined` в качестве начального значения
```

При объявлении функции вы можете аннотировать ее параметры и возвращать тип:

```
function repeat(what: string, times: number): string {
  let result = "";
  for (let i = 0; i < times; i++) result += what;
  return result;
} 

let coolThrice = repeat("cool", 3); // This will return "coolcoolcool"
repeat(3, "cool"); // Error, because of the incorrect argument types
```

Во многих случаях TypeScript также может выводить тип возвращаемого значения функции на основе возвращаемого значения.

Superpowers сможет даже автозаполнение `repeat` для вас и отображать свою сигнатуру (параметры и тип возвращаемого значения). 

[Узнайте больше о типах](http://www.typescriptlang.org/Handbook#basic-types).

## Классы

ES5 имелось только наследование на основе прототипов, которое довольно гибкое, но трудное как для записи, так и для чтения.
ES2015 приносит классы для более традиционной объектно-ориентированной парадигмы, а TypeScript еще раз дополняет их мощной проверкой типов.

Вот посмотрите на синтаксис:

```
class Lift {

  // TypeScript позволяет вам объявить членов и их тип
  floor: number;
  
  // Вы можете использовать значения параметров по умолчанию
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

[Узнайте больше о TypeScript классах](http://www.typescriptlang.org/Handbook#classes).

## Лучшие анонимные функции

В ECMAScript 5 при передаче функции в качестве обратного вызова другой функции вам приходилось немного танцевать
задействуя `Function.bind`, чтобы убедиться, что значение` this` было сохранено.

В ECMAScript 2015, Теперь вы можете использовать новый синтаксис жирной стрелки `() =>` ("lambdas")
это сохранит `this` автоматически. 

```
// Предполагая, что мы находимся в некотором контексте, где `this` имеет свойство` save`.
this.saving = true;

// В этом примере `saveToDisk` будет длительной асинхронной функцией
saveToDisk(() => {
  // `this` все тот же. С `function() { ... }`, у тебя нет гарантии
  this.saving = false;
});
```

C классами ECMAScript 2015, методы также сохраняют значение `this` для вас.

[Узнайте больше о лямбдах и `this`](http://www.typescriptlang.org/Handbook#functions-lambdas-and-using-39this39).

## Перебор массивов

Другая давняя проблема JavaScript заключается в переборе массивов.

```
let myArray = [ 100, 10, 1 ];

// С ECMAScript 2015's новое ключевое слово `of`, это просто
for (let value of myArray) console.log(value);

// Ранее вы бы написали:
// for (var i = 0; i < myArray.length; i++) console.log(myArray[i]);
```

## Learning more

  * [Codecademy's JavaScript course](http://www.codecademy.com/en/tracks/javascript)
  * [Learning ES6](https://github.com/ericdouglas/ES6-Learning)
  * [es6-features.org](http://es6-features.org/)
  * [TypeScript Handbook](http://www.typescriptlang.org/Handbook)

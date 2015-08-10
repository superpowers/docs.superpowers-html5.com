# Introduction à TypeScript

Dans Superpowers, les scripts sont écrits en TypeScript. C'est un langage sympa et productif, dont l'histoire est complexe.

Cette page explique comment TypeScript a émergé et vous introduira aux concepts principaux.

## De JavaScript à TypeScript

JavaScript est un [langage excentrique et imparfait](https://www.destroyallsoftware.com/talks/wat) qui est récemment devenu bien meilleur. Il est acuellement standardisé sous le nom d'ECMAScript, pour diverses raisons. La dernière version de JavaScript, ECMAScript 2015 (précédement connu sous le nom ECMAScript 6), corrige beaucoup de frustrations que les gens avaient et ajoute beaucoup de nouvelles particularités.

Ca [va prendre une année ou deux](https://kangax.github.io/compat-table/es6/) pour que toutes ces améliorations fassent leur chemin dans les navigateurs.
Pendant ce temps, les développeurs Web ont créé divers outils comme [Babel.js](https://babeljs.io/) ou des langages comme [TypeScript](http://www.typescriptlang.org/), [Flow](http://flowtype.org/) et [CoffeeScript](http://coffeescript.org/) qui vous permettent d'utiliser les nouvelles fonctionnalités du langage dès maintenant et qui ré-écriront ("transpileront") automatiquement vos script en ECMAScript 5, la version de JavaScript actuellement supportée par les navigateurs.

## Pourquoi TypeScript ?

Nous avons choisi TypeScript spécifiquement, parce'que c'est un sur-ensemble typé de la dernière version de JavaScript. Cela signifie deux choses:
* En faisant des jeux dans SuperPowers, des millions de développeurs Web peuvent réutiliser leurs connaissances durement acquises de JavaScript.
* Le système de type de TypeScript étant rapide et puissance, il permet à SuperPowers de fournir un rapport d'erreur en temps réel et une bonne auto-completion.

![](http://i.imgur.com/vnJU8Tt.gif)

Comme un bonus supplémentaire, les développeurs de TypeScript travaillent avec le comité de standardisation pour aviser la conception des versions de JavaScript à venir, donc c'est un excellent investissement pour tous les partis.

## Variable à portée locale

<div class="note">
    Si vous n'y connaissez pas grand chose au sujet des variables et des fonctions, vous devriez probablement [lire une introduction au JavaScript](http://www.codecademy.com/en/tracks/javascript) avant toute chose.
</div>

<abbr title="ECMAScript 2015">ES2015</abbr> vous permet de déclarrer des variables à portée locale avec le nouveau mot-clé `let`.
En règle générale, vous n'utiliserez plus le vieux mot-clé `var`, qui possède une sémantique moins pratique des fonctions locales.

```
// myVariable n'existe pas introduction

if (someCondition) {
  // myVariable ne peut être consultée ici (avant sa déclaration)
  let myVariable = 10;
  // myVariable sera accessible jusqu'à ce que le bloc soit fermé
}

// myVariable n'existe pas non plus ici
// Tout ces commentaires seraient faux si vous aviez utilisé var.
```

## Variables et fonctions typées

Quand vous déclarez une variable, TypeScript peut déduire le type de la valeur qui lui est assignée:

```
let myVariable = 10; // Le type de myVariable est `number`

// TypeScript retournera une erreur si vous faites des choses erronées comme additionner un nombre et une chaîne de caractères.
myVariable += "une chaîne de caractères";
```

Vous pouvez définir explicitement le type d'une variable même si vous ne l'initialisez pas tout de suite:

```
let myVariable: string; // Le type de myVariable est `string`, avec `undefined` comme valeur initiale.
```

Quand une fonction est déclarée, vous pouvez définir les type des paramètres et de ce qu'elle retournera:

```
function repeat(what: string, times: number): string {
  let result = "";
  for(let i = 0; i < times; i++) result += what;
  return result;
}

let coolThrice = repeat("cool", 3); // Ca va retourner "coolcoolcool"
repeat(3, "cool");
```

Dans de nombreux cas, Typescript peut aussi déduire le type de valeur retournée par une fonction.

Superpowers sera même capable d'auto-compléter `repeat` pour vous et d'afficher sa signature (types des paramètres et du retour).

[En savoir plus sur les types](http://www.typescriptlang.org/Handbook#basic-types).

## Classes

ES5 avait l'héritage assez flexible basé sur des prototypes, mais difficile à la fois à l'écriture et à la lecture.
ES2015 apporte des classes pour un paradime orienté-objet plus traditionel et TypeScript les améliore une fois de plus avec une puissante vérification de type.

Voici un exemple de la syntaxe:

```
class Lift {

  // TypeScript vous laisse déclarer les attributs et leurs types
  floor: number;

  // Vous pouvez utiliser des valeurs par défaut pour les paramètres
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
myLift.goUp(); // myLift.floor vaut maintenant 2
```

[En savoir plus sur les classes TyopeScript](http://www.typescriptlang.org/Handbook#classes).

## Meilleurs fonctions anonymes

ECMAScript 5, lors du passage d'une fonction comme callback à une autre fonction, vous deviez utiliser une petite danse incluant 'Function.bind' pour s'assurer que la value de `this` était préservée.

Avec ECMAScript 2015, vous pouvez utiliser la nouvelle syntaxe fat-arrow `() =>`
pour créer une fonction anonyme ("lambdas") qui préserve automatiquement la valeur `this`.

```
// Supposant être dans un context où `this` a une propriété `saving`.
this.saving = true;

// Dans cet exemple, `saveToDisk` va être une fonction asynchone
saveToDisk(() => {
  // `this` est toujours le même. Avec `function() { ... }`, vous n'auriez aucune garantie
  this.saving = false;
});
```

Les méthodes de classe d'ECMAScript 2015 préservent aussi la valeur de `this`.

[En savoir plus au sujet des lambdas et de this](http://www.typescriptlang.org/Handbook#functions-lambdas-and-using-39this39).

## Itérer sur les tableaux

Un autre point douloureux présent de longue date en JavaScript implique les itérations sur les tableaux.

```
let myArray = [ 100, 10, 1 ];

// Avec le nouveau mot-clé `of` de ECMAScript 2015, c'est facile.
for (let value of myArray) console.log(value);

// Précédement, nous aurions dû écrire:
// for (var i = 0; i < myArray.length; i++) console.log(myArray[i]);
```

## En apprendre plus

  * [Les cours JavaScript de CodeCademy](http://www.codecademy.com/en/tracks/javascript)
  * [Apprendre ES6](https://github.com/ericdouglas/ES6-Learning)
  * [es6-features.org](http://es6-features.org/)
  * [TypeScript Handbook](http://www.typescriptlang.org/Handbook)

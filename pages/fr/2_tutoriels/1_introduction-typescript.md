# Introduction à TypeScript

Dans Superpowers, les scripts sont écrits en TypeScript. C'est un langage sympa et productif, dont l'histoire est complexe.

Cette page explique comment TypeScript a émergé et vous introduira aux concepts principaux.

## De JavaScript à TypeScript

JavaScript est un [langage excentrique aux nombreuses imperfections](https://www.destroyallsoftware.com/talks/wat) qui s'améliore avec le temps. Il est en réalité standardisé sous le nom d'ECMAScript, pour diverses raisons. La dernière version de JavaScript, ECMAScript 2015 (précédement connu sous le nom ECMAScript 6), corrige beaucoup de frustrations que les gens avaient et ajoute un bon tas de nouvelles fonctionnalités.

Ca [va prendre une année ou deux](https://kangax.github.io/compat-table/es6/) pour que toutes ces améliorations trouvent leur chemin jusque dans les navigateurs.
Pendant ce temps, les développeurs Web ont créé divers outils comme [Babel.js](https://babeljs.io/) ou des langages comme [TypeScript](http://www.typescriptlang.org/), [Flow](http://flowtype.org/) et [CoffeeScript](http://coffeescript.org/) qui vous permettent d'utiliser les nouvelles fonctionnalités du langage dès maintenant et qui ré-écrivent ("transpilent") automatiquement vos scripts en ECMAScript 5, la version de JavaScript actuellement supportée par les navigateurs.

## Pourquoi TypeScript ?

Nous avons choisi TypeScript spécifiquement, parce que c'est un sur-ensemble typé de la dernière version de JavaScript. Cela signifie deux choses :

  * Des millions de développeurs Web peuvent réutiliser leur connaissance de JavaScript durement acquise quand ils créent des jeux avec Superpowers.
  * Le système de type de TypeScript étant rapide et puissant, il permet à Superpowers de fournir un rapport d'erreurs en temps réel et une auto-completion intelligente.

![](http://i.imgur.com/vnJU8Tt.gif)

Bonus supplémentaire, les développeurs de TypeScript travaillent avec le comité de standardisation pour aviser la conception des versions de JavaScript à venir, donc c'est un excellent investissement pour le futur.

## Variables à portée locale

<div class="note">
  Si vous n'y connaissez pas grand chose au sujet des variables et des fonctions, vous devriez probablement [lire une introduction au JavaScript](http://www.codecademy.com/en/tracks/javascript) avant de continuer.
</div>

<abbr title="ECMAScript 2015">ES2015</abbr> vous permet de déclarer des variables à portée locale avec le nouveau mot-clé `let`.
En règle générale, vous n'utiliserez plus le vieux mot-clé `var`, qui définit des variables dont la portée s'étend à toute la fonction, un comportement surprenant et parfois source de bugs.

```
// myVariable n'existe pas ici

if (someCondition) {
  // myVariable ne peut être utilisée ici (avant sa déclaration)
  let myVariable = 10;
  // myVariable sera accessible jusqu'à ce que le bloc soit fermé
}

// myVariable n'existe pas non plus ici
// Tous ces commentaires seraient faux si vous aviez utilisé `var`.
```

## Variables et fonctions typées

Quand vous déclarez une variable, TypeScript peut déduire son type à partir de la valeur qui lui est assignée :

```
let myVariable = 10; // Le type de myVariable est `number`

// TypeScript retournera une erreur si vous faites des choses erronées comme additionner un nombre et une chaîne de caractères
myVariable += "une chaîne de caractères";
```

Vous pouvez définir explicitement le type d'une variable même si vous ne l'initialisez pas tout de suite :

```
let myVariable: string; // Le type de myVariable est `string`, de valeur initiale `undefined`
```

Quand une fonction est déclarée, vous pouvez définir les types de ses paramètres et de sa valeur de retour :

```
function repeat(what: string, times: number): string {
  let result = "";
  for(let i = 0; i < times; i++) result += what;
  return result;
}

let coolThrice = repeat("cool", 3); // Retourne "coolcoolcool"
repeat(3, "cool"); // Erreur, à cause du type incorrect des arguments
```

Dans de nombreux cas, TypeScript peut aussi déduire le type de valeur retournée par une fonction.

Superpowers sera en outre capable d'auto-compléter `repeat` pour vous et d'afficher sa signature (types des paramètres et de la valeur retournée).

[En savoir plus sur les types](http://www.typescriptlang.org/Handbook#basic-types).

## Classes

ES5 proposait uniquement l'héritage basé sur des prototypes, assez flexible mais difficile à la fois à écrire et à lire.
ES2015 apporte les classes pour un paradigme orienté objet plus traditionel et TypeScript les améliore une fois de plus avec la puissante de la validation des types.

Voici un exemple de la syntaxe :

```
class Lift {

  // TypeScript vous laisse déclarer les membres et leurs types
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

[En savoir plus sur les classes TypeScript](http://www.typescriptlang.org/Handbook#classes).

## Meilleures fonctions anonymes

Avec ECMAScript 5, lors du passage d'une fonction de rappel en argument à une autre fonction, il fallait faire une petite danse avec 'Function.bind' pour s'assurer que la value de `this` était préservée.

Avec ECMAScript 2015, vous pouvez utiliser la syntaxe de la grosse flèche `() =>`
pour créer une fonction anonyme ("lambda") qui préserve automatiquement la valeur `this`.

```
// Disons que dans ce contexte, `this` a une propriété `saving`.
this.saving = true;

// Dans cet exemple, `saveToDisk` serait une fonction asynchrone qui prend du temps
saveToDisk(() => {
  // `this` est toujours le même. Avec `function() { ... }`, vous n'auriez pas cette garantie
  this.saving = false;
});
```

Dans les classes d'ECMAScript 2015, les méthodes préservent aussi la valeur de `this`.

[En savoir plus au sujet des lambdas et de `this`](http://www.typescriptlang.org/Handbook#functions-lambdas-and-using-39this39).

## Itérer sur les tableaux

Une autre difficulté de longue date en JavaScript : les itérations sur les tableaux.

```
let myArray = [ 100, 10, 1 ];

// Avec le nouveau mot-clé `of` de ECMAScript 2015, c'est facile.
for (let value of myArray) console.log(value);

// Précédement, nous aurions dû écrire :
// for (var i = 0; i < myArray.length; i++) console.log(myArray[i]);
```

## En apprendre plus

  * [Les cours JavaScript de Codecademy](http://www.codecademy.com/en/tracks/javascript)
  * [Apprendre ES6](https://github.com/ericdouglas/ES6-Learning)
  * [es6-features.org](http://es6-features.org/)
  * [TypeScript Handbook](http://www.typescriptlang.org/Handbook)

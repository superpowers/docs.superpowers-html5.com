# Votre premier jeu

<div class="action">
<p>**Créez un Sprite**, appelé le `Leonard`, ouvrez-le en double-cliquant dessus et uploadez une petite image.  
</div>

Soyez sur de correctement définir la taille de la grille, pour que l'image soit entiérement visible dans le panneau de prévisualisation (en bas).

<div class="action">
<p>**Créez un script 'Typescript'** appelez le `Game` et ouvrez-le.
</div>

Les scripts sont utilisés pour indiquer le comportement des ressources a Superpowers. Quand vous lancez votre jeu, **Superpowers lit chaque script du haut vers le bas** et exécute les instructions situées a l'intérieur. Superpowers utilise <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a> comme language de script.

Métaphoriquement, votre jeu est comme un film dont vous êtes le directeur. Avec les scripts vous définissez les roles des acteurs et choisissez leurs costumes. Si vous n'avez pas de script, personne ne se montrera et l'écran restera noir.  

<div class="action">
<p>Dans l'éditeur de script, supprimez le texte par défaut et tapez le code suivant (ou copier/coller), mais vous allez apprendre plus vite si vous le faites vous même :
</div>

```
// Ajout de notre premier acteur, il sera le personnage principal
let mainCharacterActor = new Sup.Actor("Main Character");
// Disons à notre acteur de mettre le costume "Leonard" (sprite)
new Sup.SpriteRenderer(mainCharacterActor, Sup.get("Leonard", Sup.Sprite));

// Ajout du second personnage dans la scène, il sera la caméra
let cameraManActor = new Sup.Actor("Camera Man");
// Donner la caméra
new Sup.Camera(cameraManActor);

// Placez vos acteurs. Le personnage principal est au centre de la scène
mainCharacterActor.setPosition(new Sup.Math.Vector3(0,0,0));

// Le caméraman va regarder vers l'acteur principal avec une certaine distance
cameraManActor.setPosition(new Sup.Math.Vector3(0,0,5));
```

<p>Les lignes commençant par // sont des commentaires. Superpowers ne fait pas attention à ces lignes, Je les met seulement pour expliquer comment cela fonctionne.</p>

<div class="note">
  <p><b>IMPORTANT:</b> Soyez sur d'appuyer sur `Ctrl+S` pour appliquer les changements fait dans vos scripts. Vous pouvez remarquer que l'indicateur `draft` dans l'arbre de ressources va disparaître quand votre script sera sauvegardé.</p>
</div>

<p>Superpowers peut détecter certaines erreurs de script (erreur de syntaxe, référence ou de type) a la volée, donc si vous voyez des mots en rouges quand vous avez finit, vous savez que vous devez vérifier ces lignes et les lignes autours d'elle. Les messages d'érreurs détaillés sont affichés en bas de l'éditeur.</p>

<p>Quand vous avez finit, lancez votre jeu avec le bouton `Run game` et vous devriez voir votre acteur apparaître!</p>

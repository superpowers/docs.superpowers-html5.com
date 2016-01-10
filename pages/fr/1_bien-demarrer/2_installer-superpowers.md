# Installer Superpowers

<div class="action">
  <p>Télécharger le ZIP pour votre plateforme depuis <a href="https://sparklinlabs.com/account" target="_blank">votre compte</a>.  
  Décompressez-le et double-cliquez sur `Superpowers`.  
  Cliquez n'importe où pour passer l'écran de démarrage.
</div>

Vous devriez voir une liste de serveurs et votre serveur local se lancera automatiquement.

<div class="note">
  <p>**Superpowers utilise les ports TCP 4237 (pour servir le client) et 4238 (pour servir chaque version de vos jeux)** par défaut, car le port 80 a besoin de privilèges speciaux sur Linux &amp; OS X. En plus, certains programmes comme Skype écoutent déjà sur ce port. Vous pouvez changer les ports utilisés par Superpowers dans les paramètres du lanceur.

  <p>Si vous le faites, pensez à changer l'adresse de votre serveur ("My Server") dans la liste des serveurs pour utiliser le bon port (La syntaxe est `ip:port`).
</div>

Double-cliquez sur "My Server" et une fenêtre va s'ouvrir. Vous serez invité à saisir un nom d'utilisateur.  
Celui-ci n'est pas encore lié à votre compte Superpowers mais vous voudrez probablement utiliser le même quand même.

## Où se trouve mes données ?

Par défaut, la configuration de votre serveur et vos projets sont stockés aux endroits suivants, en fonction du système d'exploitation que vous utilisez :

  * Sous Windows : `%APPDATA%\Superpowers`
  * Sous OS X : `~/Library/Superpowers` (Utiliser l'option "Aller au dossier" du Finder)
  * Sous Linux : `~/.local/share/Superpowers`

Pour rendre Superpowers transportable (par exemple sur une clé USB), vous pouvez déplacer le fichier `config.json` et le dossier `projects` dans le dossier `app` de Superpowers et ils seront automatiquement utilisés à la place. Faites attention quand vous mettez à jour, il faudra alors déplacer ces fichiers de l'ancienne version à la nouvelle manuellement.

## Inviter d'autres utilisateurs sur mon serveur

Par défaut, votre serveur n'accepte que les connexions venant de votre ordinateur.

<div class="action">
  <p>Pour ouvrir votre serveur aux autres, définissez un mot de passe dans les paramètres puis relancez le serveur.
</div>

<div class="note">
  <p>**Vous aurez probablement besoin de <a href="https://www.google.com/search?q=configurer%20la%20redirection%20de%20port" target="_blank">configurer votre box</a>** et/ou pare-feu
  pour autoriser (ou faire suivre) les connexions TCP sur les numéros de port utilisés par votre serveur (4237 et 4238 par défaut).
</div>

Une fois que votre serveur est ouvert, <a href="https://www.google.fr/search?q=mon%20ip" target="_blank">récuperez votre adresse IP publique</a> et vous pourrez envoyer un lien sous la forme : `ip:port` aux personnes qui veulent travailler avec vous (par exemple `1.2.3.4:4237`). Ils peuvent coller le lien dans la barre d'adresse de leur navigateur pour vous rejoindre sans rien installer ou ils peuvent l'ajouter à leur liste de serveurs dans le lanceur.

<div class="note">
  <p>**Assurez-vous d'envoyer votre adresse IP publique** à vos collaborateurs. `127.0.0.1` est une adresse spéciale qui pointe toujours vers l'ordinateur sur lequel elle est utilisée, donc les autres ne pourront pas se connecter à votre serveur avec cette adresse.

  <p>Le moyen le plus simple de récupérer votre adresse IP publique est de <a href="https://www.google.fr/search?q=mon%20ip" target="_blank">demander à Google</a>.
</div>

## Lancer un serveur Superpowers en ligne de commande

Il peut être utile de lancer Superpowers sur un serveur sans interface graphique pour ne pas avoir besoin de garder allumé votre ordinateur de bureau tout le temps.  
Les instructions suivantes devraient fonctionner avec la plupart des serveurs Linux, y compris sur un Raspberry Pi.

  * Installez <a href="https://nodejs.org/" target="_blank">node.js v4.x</a>.
  * Téléchargez la dernière version de Superpowers pour Linux et décompressez-la avec `unzip`. Vous pouvez supprimer tous les fichiers à la racine du dossier à l'exception du dossier `app`.
  * Utilisez `cd` pour naviguer à la racine du dossier Superpowers.
  * Lancez `node app/server`.

Par défaut, Superpowers stocke les fichiers de configuration et de projets dans `$XDG_DATA_HOME/Superpowers` (ou `~/.local/share/Superpowers` si `$XGD_DATA_HOME` n'est pas défini). Vous pouvez utiliser l'option `--data-path=` pour changer cet emplacement.

<div class="note">
  **En attendant que Superpowers intègre un système d'authentification**, après avoir lancé le serveur pour la première fois,
  vous devrez l'arrêter (avec `Ctrl+C`) et éditer le fichier généré nommé `config.json` pour y mettre un mot de passe, puis relancer le serveur.
  Vous pouvez aussi configurer les ports sur lesquels le serveur écoute.
</div>

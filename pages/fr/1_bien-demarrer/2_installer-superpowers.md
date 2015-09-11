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

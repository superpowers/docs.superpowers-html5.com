# Collaboration en temps réel

Par défaut, votre serveur ne va accepter que les connexions de votre ordinateur.

<div class="action">
  <p>Pour ouvrir votre serveur aux autres, il faut mettre un mot de passe dans les paramètres et relancer le serveur.
</div>

<div class="note">
  <p>**Vous aurez probablement besoin de <a href="https://www.google.com/search?q=setting%20up%20port%20forwarding" target="_blank">configurer votre box</a>** et/ou le parefeu pour autoriser (ou rediriger) les connexions TCP sur le port qui est ecouté par le serveur (4237 et 4238 par défaut).
</div>

Une fois que votre serveur est ouvert, <a href="https://www.google.com/search?q=my%20ip" target="_blank">récuperer votre adresse IP publique</a> et vous pourrez envoyer un lien sous forme : `ip:port` aux personnes qui veulent travailler avec vous (e.g.&nbsp;`1.2.3.4:4237`). Ils peuvent coller le lien dans la barre d'adresse de leurs navigateur pour vous rejoindre sans rien installer ou ils peuvent l'ajouter a leurs liste de serveur sur le lanceur.

<div class="note">
  <p>**Soyez sur de partager votre adresse IP publique** avec ceux avec qui vous voulez collaborer. `127.0.0.1` est une adresse spécial qui redirige tous le temps vers votre ordinateur, donc les autres ne pourront pas se connecter au serveur avec cette adresse.

  <p>Le moyen le plus simple de recupérer votre adresse IP publique est de <a href="https://www.google.com/search?q=my%20ip" target="_blank">demander à Google</a>.
</div>

## Lancer un serveur Superpowers en ligne de commande

Il peut être utile de lancer Superpowers sur un serveur sans affichage pour ne pas avoir besoin de garder allumé votre ordinateur de bureau tout le temps.
Cela doit fonctionner avec tous les serveurs linux, y compris sur un Raspberry Pi.

  * Installer <a href="https://github.com/joyent/node/wiki/installing-node.js-via-package-manager" target="_blank">node.js v0.12.x</a> ou <a href="https://iojs.org/" target="_blank">io.js v1.x</a>.
  * Télecharger la dernière version de Superpowers pour Linux et l'extraire.
	Vous pouvez vous débarasser de tous les fichiers a la racine du dossier a l'exception du dossier `app`.
  * Utiliser `cd` pour naviguer a la racine du dossier Superpowers
  * Lancer `node app/server`.

Par défaut, Superpowers va stocker les fichiers de configuration et de projets dans `$XDG_DATA_HOME/Superpowers` (ou `~/.local/share/Superpowers` si `$XGD_DATA_HOME` n'est pas définit). A partir de la v0.3, vous pouvez utiliser l'option `--data-path=` pour changer l'emplacement.

<div class="note">**Jusqu'a ce que Superpowers est l'autentification integré**, après avoir lancer le serveur pour la première fois, vous aurez besoin d'arrêter le serveur (avec Ctrl+C) et aller editer le fichier géneré `config.json` pour mettre un mot de passe, et vous pourrez relancer le serveur. Vous pouvez aussi configurer le port sur lequel le serveur écoute.</div>

# Collaboration en temps réel

Par défaut, votre serveur n'accepte que les connexions venant de votre ordinateur.

<div class="action">
  <p>Pour ouvrir votre serveur aux autres, définissez un mot de passe dans les paramètres et relancez le serveur.
</div>

<div class="note">
  <p>**Vous aurez probablement besoin de <a href="https://www.google.com/search?q=configurer%20la%20redirection%20de%20port" target="_blank">configurer votre box</a>** et/ou pare-feu pour autoriser (ou faire suivre) les connexions TCP sur les numéros de port utilisés par votre serveur (4237 et 4238 par défaut).
</div>

Une fois que votre serveur est ouvert, <a href="https://www.google.fr/search?q=mon%20ip" target="_blank">récuperez votre adresse IP publique</a> et vous pourrez envoyer un lien sous la forme : `ip:port` aux personnes qui veulent travailler avec vous (par exemple `1.2.3.4:4237`). Ils peuvent coller le lien dans la barre d'adresse de leur navigateur pour vous rejoindre sans rien installer ou ils peuvent l'ajouter à leur liste de serveurs dans le lanceur.

<div class="note">
  <p>**Assurez-vous d'envoyer votre adresse IP publique** à vos collaborateurs. `127.0.0.1` est une adresse spéciale qui pointe toujours vers l'ordinateur sur lequel elle est utilisée, donc les autres ne pourront pas se connecter à votre serveur avec cette adresse.

  <p>Le moyen le plus simple de récupérer votre adresse IP publique est de <a href="https://www.google.fr/search?q=mon%20ip" target="_blank">demander à Google</a>.
</div>

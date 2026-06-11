
Installation
 Cloner le dépôt :
  git clone <URL_DE_VOTRE_DEPOT>

Installer les dépendances :
  cd CliniquePlusApi

npm install

Initialiser la base de données :
  npm run init-db

Lancer le serveur :
  npm start
Le serveur sera disponible à l'adresse : http://localhost:3000

Routes de l'API
  Authentification
    POST /login : Connexion utilisateur.

Patients
GET /patients : Liste tous les patients.
GET /patients/:id : Détail d'un patient.
POST /patients : Ajouter un patient.
DELETE /patients/:id : Supprimer un patient.

## Installation
 Cloner le dépôt :
git clone https://github.com/Svetlanna/clinique-plus.git

## Installer les dépendances :
cd CliniquePlusApi
npm install

## Initialiser la base de données :
npm run init-db

## Lancer le serveur :
npm start
Le serveur sera disponible à l'adresse : http://localhost:3000

## Routes de l'API
  Authentification
    POST /login : Connexion utilisateur.

## Patients
GET /patients : Liste tous les patients.
GET /patients/:id : Détail d'un patient.
POST /patients : Ajouter un patient.
DELETE /patients/:id : Supprimer un patient.

## Médecins
GET / medecins : Liste de tous les médecins
GET / medecins/:id : Détail d'un patient
POST / medecins : Ajouter un médecin
DELETE / medecins /:id :Supprimer un médecin

## Rendez-vous
GET /appointements : Liste de tous les RDV
GET / appointements/:id : Détail d'un RDV
POST/ appointements /:id : Ajouter un RDV 
PUT / appointements /:id : Modifier un RDV

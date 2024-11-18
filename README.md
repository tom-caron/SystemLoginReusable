# Système de Login Réutilisable (API)

Ce projet est un système de login réutilisable construit avec Node.js, Express.js, MongoDB et JWT pour l'authentification. Il permet une intégration facile dans d'autres projets en offrant des endpoints pour l'enregistrement, la connexion et l'accès sécurisé à des routes protégées.

---

## **Fonctionnalités**
- Enregistrement d'utilisateurs avec des mots de passe hachés.
- Connexion sécurisée avec authentification basée sur JWT.
- Middleware pour protéger les routes avec des tokens JWT.
- Facilement intégrable dans d'autres projets via des requêtes HTTP.

---

## **Technologies utilisées**
- **Node.js** : Environnement d'exécution JavaScript.
- **Express.js** : Framework pour construire des APIs RESTful.
- **MongoDB** : Base de données NoSQL pour stocker les données des utilisateurs.
- **JWT (JSON Web Tokens)** : Pour l'authentification sécurisée.
- **bcrypt** : Pour hacher les mots de passe.

---

## **Structure du projet**
   ```
   .
   ├── models
   │   └── User.js          # Schéma Mongoose pour les utilisateurs
   ├── routes
   │   └── auth.js          # Routes d'authentification
   ├── middleware
   │   └── authMiddleware.js # Middleware pour l'authentification JWT
   ├── index.js            # Point d'entrée de l'application
   ├── .env                 # Variables d'environnement
   ├── package.json         # Métadonnées et dépendances du projet
   └── README.md            # Documentation
   ```
---

## **Démarrage**

### **1. Prérequis**
Assurez-vous d'avoir installé :
- **Node.js** (v16 ou plus récent)
- **MongoDB** (en local ou instance cloud)

---

### **2. Installation**
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/tom-caron/SystemLoginReusable.git
   cd systeme-login-reutilisable

2. Installez les dépendances :
    ```bash
    npm install

3. Créer un fichier .env dans le répertoire à la racine et ajouter les lignes suivantes :
   ```bash
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/loginSystem
    JWT_SECRET=secret_pour_votre_jwt

---

### **3. Lancement du projet**
   ```bash
    npm start
   ```

---

## **Endpoints de l'API**

### **1. Enregistrement de l'utilisateur**
    URL : /api/auth/register
    Méthode : POST
    Description : Permet d'enregistrer un nouvel utilisateur.

   ```bash
    **Corps de la requête (JSON)**
    {
    "username": "testuser",
    "email": "test@example.com",
    "password": "securepassword"
    }
   ```

### **2. Connexion d'utilisateur**
    URL : /api/auth/login
    Méthode : POST
    Description : Authentifie un utilisateur et renvoie un token JWT.

      ```bash
    **Corps de la requête (JSON)**
    {
    "email": "test@example.com",
    "password": "securepassword"
    }
       ```

### **3. Route protégée**
    URL : /api/auth/profile
    Méthode : GET
    Description : Accède à une ressource protégée avec un JWT valide.

   ```bash
    **Headers**
    {
    "Authorization": "Bearer <votre_token>"
    }
   ```

## **Exemple d'intégration avec l'utilisation de axios**
   ```bash
    const axios = require('axios');

    const API_URL = 'http://localhost:5000/api/auth';

    async function login(email, password) {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            console.log('Token :', response.data.token);
        } catch (error) {
            console.error('Erreur lors de la connexion :', error.response.data);
        }
    }

    login('test@example.com', 'securepassword');

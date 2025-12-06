// sign up function

// Importation de bcrypt pour hasher les mots de passe
const bcrypt = require('bcrypt');

// Pour créer des tokens d'authentification
const jwt = require('jsonwebtoken');          

// Importation du modèle User pour enregistrer un nouvel utilisateur
const User = require('../models/user.js');


// Contrôleur pour l'inscription (signup)
exports.signup = (req, res, next) => {

  // log pour debug
  console.log(" Signup request received !");
  console.log(" Body reçu :", req.body);

  // On hash le mot de passe envoyé par l'utilisateur
  // 10 = le "salt" = complexité du hash
  bcrypt.hash(req.body.password, 10)

    .then(hash => {
      // On crée un nouvel utilisateur avec :
      // - email : ce que l'utilisateur a saisi
      // - password : le mot de passe hashé
      const user = new User({
        email: req.body.email,
        password: hash
      });

      // On enregistre l'utilisateur dans la base de données
      user.save()
        .then(() => 
          res.status(201).json({ message: 'Utilisateur créé !' })
        )
        .catch(error => 
          res.status(400).json({ error })
        );
    })

    // Erreur serveur (ex: problème avec bcrypt)
    .catch(error => 
      res.status(500).json({ error })
    );
};

//login function

// Contrôleur pour la connexion (login)
exports.login = (req, res, next) => {

  // verifier si l'email existe dans la base de donnees
  User.findOne({ email: req.body.email })
    .then(user => {

      // Si aucun utilisateur trouvé → erreur 401
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

      // On compare le mot de passe envoyé avec le mot de passe hashé enregistré
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          
          // Si le mot de passe est incorrect → erreur 401
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }

          // Si tout est correct → on renvoie un token JWT
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },     // données dans le token
              'RANDOM_SECRET_KEY',      // clé secrète (on mettra dans .env après)
              { expiresIn: '24h' }      // durée de validité du token
            )
          });
        })

        // Erreur bcrypt → erreur serveur
        .catch(error => res.status(500).json({ error }));
    })

    // Erreur MongoDB → erreur serveur
    .catch(error => res.status(500).json({ error }));
};

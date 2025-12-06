// importation du package jsonwebtoken pour gerer les tokens
const jwt = require('jsonwebtoken');

// Middleware d'authentification
module.exports = (req, res, next) => {

  try {

    // Récupère le token envoyé par le frontend dans le header Authorization
    // Format attendu : "Bearer TOKEN"
    const token = req.headers.authorization.split(' ')[1];

    // Vérifie et décode le token avec la clé secrète
    const decodedToken = jwt.verify(token, 'RANDOM_SECRET_KEY');

    // Récupère l'userId contenu dans le token
    const userId = decodedToken.userId;

    // Ajoute l'userId au request pour l'utiliser dans les routes protégées
    req.auth = { userId };

    next(); // Passe au middleware ou contrôleur suivant

  } catch (error) {
    res.status(401).json({ message: "Requête non authentifiée !" });
  }
};

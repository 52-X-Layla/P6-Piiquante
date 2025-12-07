const jwt = require('jsonwebtoken');

// Middleware d'authentification
module.exports = (req, res, next) => {

  try {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_SECRET_KEY');
    const userId = decodedToken.userId;
    
    req.auth = { userId };

    next(); 

  } catch (error) {
    res.status(401).json({ message: "Requête non authentifiée !" });
  }
};

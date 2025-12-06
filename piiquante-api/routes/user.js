// Importation d'Express
const express = require('express');
const router = express.Router();

// Importation du controller user
const userCtrl = require('../controllers/user');

// Routes pour inscription et connexion
router.post('/signup', userCtrl.signup);   // Route inscription
router.post('/login', userCtrl.login);     // Route connexion

// Exportation du router
module.exports = router;

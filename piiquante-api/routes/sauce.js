// routes/sauce.js

// Importation d'Express
const express = require('express');
const router = express.Router();

// Importation du middleware multer (pour gérer les images)
const multer = require('../config/multer');

// Importation du middleware d'authentification
const auth = require('../middlewares/auth');

// Importation des fonctions contrôleurs
const sauceCtrl = require('../controllers/sauce');

// --------------------------
// ROUTES CRUD POUR LES SAUCES
// --------------------------

// CREATE : créer une nouvelle sauce (avec image)
router.post('/', auth, multer, sauceCtrl.createSauce);

// READ ONE : récupérer une sauce par son ID
router.get('/:id', auth, sauceCtrl.getOneSauce);

// READ ALL : récupérer toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

// UPDATE : modifier une sauce (image possible)
router.put('/:id', auth, multer, sauceCtrl.updateSauce);

// DELETE : supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// LIKE / DISLIKE : aimer ou ne pas aimer une sauce
router.post('/:id/like', auth, sauceCtrl.likeSauce);


// Exportation du router
module.exports = router;

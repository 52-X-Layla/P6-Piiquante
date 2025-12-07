const express = require('express');
const router = express.Router();

const multer = require('../config/multer');
const auth = require('../middlewares/auth');
const sauceCtrl = require('../controllers/sauce');

// ROUTES CRUD POUR LES SAUCES

router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);



module.exports = router;

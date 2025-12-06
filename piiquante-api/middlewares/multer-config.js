// importation du package multer pour la gestion des fichiers
const multer = require('multer');

// Dictionnaire des types MIME acceptés pour les images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration du stockage des fichiers
const storage = multer.diskStorage({

  // Dossier où les images seront enregistrées
  destination: (req, file, callback) => {
    callback(null, 'images');
  },

  // Nom du fichier (unique pour éviter les conflits)
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // remplacer espaces par _
    const extension = MIME_TYPES[file.mimetype];
    const finalName = Date.now() + '_' + name + '.' + extension;  // CORRECT FORMAT
    callback(null, finalName);
  }
});

// Export du middleware multer configuré pour gérer un fichier image
module.exports = multer({ storage }).single('image');

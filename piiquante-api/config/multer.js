// =======================
// Multer middleware
// Sert à gérer l'upload des images
// =======================

const multer = require('multer');

// Types MIME acceptés et leur extension associée
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration du stockage sur le disque
const storage = multer.diskStorage({
  // Dossier où les images seront enregistrées
  destination: (req, file, callback) => {
    // le dossier "images" se trouve à la racine du backend
    callback(null, 'images');
  },

  // Nom du fichier enregistré
  filename: (req, file, callback) => {
    // on enlève l'extension et on remplace les espaces par des "_"
    const name = file.originalname.split(' ').join('_').split('.')[0];

    // on choisit l'extension en fonction du type MIME
    const extension = MIME_TYPES[file.mimetype];

    // Exemple final : "motivation_6_1700000000000.jpg"
    callback(null, name + '_' + Date.now() + '.' + extension);
  }
});

// Export du middleware multer configuré pour un seul fichier image
module.exports = multer({ storage }).single('image');

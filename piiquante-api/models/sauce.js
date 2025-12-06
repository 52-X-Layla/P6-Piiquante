const mongoose = require('mongoose');

// Schéma d'une Sauce : définit toutes les infos qu'une sauce doit contenir
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },        // ID de l'utilisateur qui a créé la sauce
  name: { type: String, required: true },          // Nom de la sauce
  manufacturer: { type: String, required: true },  // Fabricant
  description: { type: String, required: true },   // Description
  mainPepper: { type: String, required: true },    // Ingrédient principal (piment)
  imageUrl: { type: String, required: true },      // URL de l'image générée par multer
  heat: { type: Number, required: true },          // Niveau de piquant (1–10)
  likes: { type: Number, default: 0 },             // Nombre de likes
  dislikes: { type: Number, default: 0 },          // Nombre de dislikes
  usersLiked: { type: [String], default: [] },     // Liste d'IDs utilisateurs ayant liké
  usersDisliked: { type: [String], default: [] }   // Liste d'IDs utilisateurs ayant disliké
});

// Export du modèle
module.exports = mongoose.model('Sauce', sauceSchema);

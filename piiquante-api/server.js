
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// importation des routes utilisateurs
const userRoutes = require('./routes/user');

// importation des routes sauces
const sauceRoutes = require('./routes/sauce');

// importation de helmet pour securite
const helmet = require('helmet');

const path = require('path'); 

// creation de l'application express
const app = express();

// ======== MONGODB CONNECTION ======== //
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://user1:pass12345@cluster0.vydnst8.mongodb.net/piiquante?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));
// ======================================= //

// Middleware pour lire JSON dans les requetes
app.use(express.json());

// CORS Middleware (required for Angular frontend)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});


// Middleware pour logger les requetes entrantes
app.use((req, res, next) => {
  console.log("📩 Incoming request:", req.method, req.url);
  next();
});

// Active les protections http
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);





// Middleware pour servire les images statiques
app.use('/images', express.static(path.join(__dirname, 'images')));


// routes pour utilisateurs
app.use('/api/auth', userRoutes);

// routes pour sauces
app.use('/api/sauces', sauceRoutes);



app.get('/', (req, res) => {
  res.send('Server running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// importation de helmet pour securite
const helmet = require('helmet');

const path = require('path'); 

const app = express();

// Connexion a MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));

app.use(express.json());

// CORS Middleware 
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

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);

app.use('/api/sauces', sauceRoutes);

app.get('/', (req, res) => {
  res.send('Server running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;

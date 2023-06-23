const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')
const routes = require('./routes/route');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");





const app = express();
const port = 3000;
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Clé secrète :', secretKey);

app.use(express.json());
app.use(cors());
app.set('secretKey', secretKey);

// Défini le chemin statique pour fournir les images
app.use('/uploads', express.static('public/uploads'));


mongoose.connect(process.env.MONGODBURL , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion réussie à la base de données MongoDB'))
.catch((err) => console.error('Erreur lors de la connexion à la base de données', err));



app.use('/', routes);


app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));
module.exports = {port};



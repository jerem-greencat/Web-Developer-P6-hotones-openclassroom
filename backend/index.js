const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const http = require('http');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', function(req, res) {
    res.json({message : "hello world"});
});



mongoose.connect("mongodb+srv://jmusedev32:ewilan650@hotonesdatabase.r9sudol.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion réussie à la base de données MongoDB'))
.catch((err) => console.error('Erreur lors de la connexion à la base de données', err));

app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));


// Modifications de bdd


mongoose.connection.close();


//orm

//construire modele client et modele source (avec mongoose)
// https://blog.appsignal.com/2022/08/17/build-a-crud-app-with-nodejs-and-mongodb.html
// https://www.bezkoder.com/node-express-mongodb-crud-rest-api/

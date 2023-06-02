const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const routes = require('./routes/route');
// const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://jmusedev32:ewilan650@hotonesdatabase.r9sudol.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion réussie à la base de données MongoDB'))
.catch((err) => console.error('Erreur lors de la connexion à la base de données', err));



app.use('/', routes);


app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));




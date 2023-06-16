const Sauce = require("../models/sauce");

exports.getAllSauces = async (req, res) => {
    try {
        const sauces = await Sauce.find();
        res.json(sauces);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSauceById = async (req, res) => {
    try {
        const sauce = await Sauce.findById(req.params.id);
        if (!sauce) {
            return res.status(404).json({ error: "Sauce not found" });
        }
        res.json(sauce);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createSauce = async (req, res) => {
    try {
        const { sauce } = req.body;
        const { filename } = req.file;
        
        // Analyse la sauce transformée en chaîne de caractères et l'enregistre dans la bdd
        // configure correctement l'imageUrl, les likes, les dislikes, les usersLiked et les usersDisliked
        // Utilise les données du fichier téléchargé via req.file (nom du fichier : filename)
        
        res.json({ message: "Sauce enregistrée avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const Sauce = require("../models/sauce");
const port = require("../index");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

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
        const sauce  = JSON.parse(req.body.sauce);
        const filename  = req.file.filename;
        const userId = req.user.userId; // Récupérer l'userId à partir de req.user


        // La ligne 37 correspond à l'ancienne variable qui donnée une valeur éronnée en cas de mise en prod
        // const baseUrl = `${req.protocol}://${req.hostname}:${process.env.port}`;
        
    
        // Les lignes 45 & 46 définissent dynamiquement le nouvel url d'enregistrement des fichiers images. En local l'url s'enregistre dans la bdd toujours en tant que http://mon_localhost:mon_port tandis qu'en mise en prod celà s'enregistrera sous le nom de domaine qui nous intéresse.
        const domain = req.get('host');
        process.env.UPLOAD_DIR = `${req.protocol}://${domain}/uploads/`;
        
        // Utilisez l'userId récupéré dans la création de la sauce
        const newSauce = await Sauce.create({
            userId: userId, // Utilise l'userId récupéré
            name: sauce.name,
            manufacturer: sauce.manufacturer,
            description: sauce.description,
            mainPepper: sauce.mainPepper,

            // Définis l'url enregistré dans la bdd selon les variables définies lignes 45 & 46
            imageUrl:  process.env.UPLOAD_DIR + filename,
            // imageUrl:  `${baseUrl}/uploads/${filename}`,
            heat: sauce.heat,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
        });
        
        res.json({ message: "Sauce enregistrée avec succès", newSauce});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSauce = async (req, res) => {
    try {
        const sauceId = req.params.id;
        const sauceData = req.body;
        console.log("user = " + req.user._id);
        let imageUrl = "";
        
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const decodedToken = jwt.decode(token);
        
        console.log("decode = " + decodedToken.userId);
        console.log("body UserId = " + req.body.userId);
        
        if (decodedToken.userId != req.body.userId) {
            return res.status(404).json({ error: "id incorrect" });
        }
        
        // Vérifie si une nouvelle image est téléchargée
        if (req.file) {
            // Mets à jour l'URL de l'image avec le nouveau fichier téléchargé
            imageUrl = req.file.path.replace(/\\/g, '/'); // Remplace les anti-slashs pour avoir un chemin valide
        } else {
            imageUrl = sauceData.imageUrl; // Utilise l'URL de l'image existante
        }
        
        // Mets à jour les informations de la sauce
        const updatedSauce = await Sauce.findByIdAndUpdate(
            sauceId,
            {
                ...sauceData,
                imageUrl: imageUrl
            },
            { new: true } // Renvoie la sauce mise à jour plutôt que l'ancienne
            );
            
            res.json({ message: 'Sauce mise à jour avec succès', data: updatedSauce });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    
    exports.deleteSauce = async (req, res) => {
        try {
            const sauceId = req.params.id;
            const token = req.header('Authorization')?.replace('Bearer ', '');
            const decodedToken = jwt.decode(token);
            
            const sauceChosen = await Sauce.findById(sauceId);
            
            if (decodedToken.userId == sauceChosen.userId) {
                await Sauce.findByIdAndRemove(sauceId);
                res.json({ message: 'Sauce supprimée avec succès' });
            } else {
                res.status(500).json({ error: "vous n'êtes pas authorisé a délete" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    
    exports.likeSauce = async (req, res) => {
        try {
            const sauceId = req.params.id;
            const { userId, like } = req.body;
            
            const sauce = await Sauce.findById(sauceId);
            
            if (!sauce) {
                return res.status(404).json({ error: 'Sauce non trouvée' });
            }
            
            // Gére les likes et dislikes de la sauce en fonction de l'userId fourni
            if (like === 1) {
                // L'utilisateur aime la sauce
                sauce.likes++;
                sauce.usersLiked.push(userId);
            } else if (like === 0) {
                // L'utilisateur annule son like ou son dislike
                if (sauce.usersLiked.includes(userId)) {
                    sauce.likes--;
                    sauce.usersLiked.pull(userId);
                } else if (sauce.usersDisliked.includes(userId)) {
                    sauce.dislikes--;
                    sauce.usersDisliked.pull(userId);
                }
            } else if (like === -1) {
                // L'utilisateur n'aime pas la sauce
                sauce.dislikes++;
                sauce.usersDisliked.push(userId);
            } else {
                return res.status(400).json({ error: 'Valeur de like invalide' });
            }
            
            await sauce.save();
            
            res.json({ message: 'Statut de like mis à jour avec succès' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
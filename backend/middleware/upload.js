const multer = require('multer');

// Définir les options de configuration pour Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Dossier de destination pour les fichiers téléchargés
    },
    filename: function (req, file, cb) {
        // Génére un nom de fichier unique
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

// Crée l'instance Multer avec les options de configuration
const upload = multer({ storage: storage });

module.exports = upload;
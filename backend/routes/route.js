const express = require ('express');
const router = express.Router();
const userController = require('../controllers/userController');
const sauceController = require('../controllers/sauceController');
const authenticateToken = require("../middleware/authenticateToken");
const upload = require('../middleware/upload');


// Routes user
router.post('/api/auth/signup', userController.createUser);
router.post('/api/auth/login', userController.loginUser);


// Routes pour les sauces
router.get('/api/sauces', sauceController.getAllSauces);
router.get('/api/sauces/:id', sauceController.getSauceById);

// Route pour la création d'une sauce
router.post('/api/sauces', authenticateToken, upload.single('image'), sauceController.createSauce);

// Route pour la mise à jour d'une sauce
router.put('/api/sauces/:id', authenticateToken, upload.single('image'), sauceController.updateSauce);

// Route pour la suppression d'une sauce
router.delete('/api/sauces/:id', authenticateToken, sauceController.deleteSauce);

// Route pour gérer les likes et dislikes d'une sauce
router.post('/api/sauces/:id/like', authenticateToken, sauceController.likeSauce);






// A modifier selon route de dépot d'image
router.post('/api/images', authenticateToken, upload.single('image'), (req, res) => {
    // L'image téléchargée est accessible via req.file
    res.json({ message: 'Image téléchargée avec succès' });
});



module.exports = router;
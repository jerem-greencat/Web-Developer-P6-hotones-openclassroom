const express = require ('express');
const router = express.Router();
// const User = require('../models/user');
// const Sauce = require('../models/sauce');
const userController = require('../controllers/userController');
const sauceController = require('../controllers/sauceController');
const authenticateToken = require("../middleware/authenticateToken");
const upload = require('../middleware/upload');


// Routes user
router.post('/api/auth/signup', userController.createUser);
router.post('/api/auth/login', userController.loginUser);
router.get('/api/users', authenticateToken, userController.getAllUsers);


router.get('/api/users/:id', authenticateToken, userController.getUserById);
router.put('/api/users/:id', authenticateToken, userController.updateUser);
router.delete('/api/users/:id', authenticateToken, userController.deleteUser);

// Routes pour les sauces
router.get('/api/sauces', sauceController.getAllSauces);
router.get('/api/sauces/:id', sauceController.getSauceById);
router.post('/api/sauces', authenticateToken, upload.single('image'), sauceController.createSauce);



// A modifier selon route de dépot d'image
router.post('/api/images', authenticateToken, upload.single('image'), (req, res) => {
    // L'image téléchargée est accessible via req.file
    // Effectuez ici le traitement nécessaire avec l'image téléchargée
    res.json({ message: 'Image téléchargée avec succès' });
});



module.exports = router;
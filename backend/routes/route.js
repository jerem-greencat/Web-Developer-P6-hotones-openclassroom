const express = require ('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controllers/userController');
const authenticateToken = require("../middleware/authenticateToken");





// Routes user
router.post('/api/auth/signup', userController.createUser);
router.post('/api/auth/login', userController.loginUser);
router.get('/api/users', authenticateToken, userController.getAllUsers);
router.get('/api/users/:id', authenticateToken, userController.getUserById);
router.put('/api/users/:id', authenticateToken, userController.updateUser);
router.delete('/api/users/:id', authenticateToken, userController.deleteUser);



module.exports = router;
const express = require ('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controllers/userController');



// Routes user
router.post('/api/auth/signup', userController.createUser);

router.post('/api/auth/login', userController.loginUser);


module.exports = router;
const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require("email-validator");


exports.createUser = async (user) => {

        const cryptedPassword = await bcrypt.hash(user.password, 10);
        user.password = cryptedPassword;
        return await userModel.create(user);
};



exports.loginUser = async (user) => {
    const {email, password} = user;

    const existingUser = await userModel.findOne({ email});

    if (!existingUser) {
        throw new Error("Adresse e-mail non valide");
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
        throw new Error("Mot de passe incorrect");
    }

    const token = jwt.sign({userId: existingUser._id}, 'secretKey');
    return {token : token, userId : existingUser._id};
};


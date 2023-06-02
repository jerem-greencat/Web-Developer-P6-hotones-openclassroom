const userModel = require("../models/user");
const bcrypt = require('bcrypt');

 



exports.getAllUsers = async () => {
    return await userModel.find();
};

exports.createUser = async (user) => {



        const cryptedPassword = await bcrypt.hash(user.password, 10);
        user.password = cryptedPassword;
        return await userModel.create(user);
    

};

exports.getUserById = async (id) => {

    const cryptedPassword = await bcrypt.compare(password, user.password);

    return await userModel.findById(id);
};

exports.updateUser = async (id, user) => {
    return await userModel.findByIdAndUpdate(id, user);
};

exports.deleteUser = async (id) => {
    return await userModel.findByIdAndDelete(id);
};

exports.loginUser = async (user) => {
    const isValid = false;
    bcrypt.compare(user.password, hash, function(err, result) {
        if (result) {
            isValid = true;
        }
    });

    return await userModel.create(user);
};
// Vérification de l'email : plugin email validator
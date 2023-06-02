const userService = require("../services/userService");
const validator = require("email-validator");


exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({data: users, status: "success"});
    } catch (err) {
        res.status(500).json({ error : err.message});
    }
};

exports.createUser = async (req, res) => {
    try {
        
        
        if (validator.validate(req.body.email)) {
            const user = await userService.createUser(req.body);
            res.json({ data: user, status: "succes"});
        } else {

            res.status(400).json({ error: 'email deja pris'});
        }
        
    } catch (err) {        
        res.status(500).json({ error : err.message});

    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json({ data : user, status : "succes"});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json({ data : user, status : "succes"});
    } catch (err) {
        res.status(500).json({ error : err.message});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.json({ data: user, status: "success"});
    } catch (err) {
        res.status(500).json({error : err.message});
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await userService.loginUser(req.body.password);
        res.json({ data: user, status: "succes"});
        
    } catch (err) {        
        res.status(500).json({ error : err.message});

    }
};
const userService = require("../services/userService");
const validator = require("email-validator");



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


exports.loginUser = async (req, res) => {
    try {
        const token = await userService.loginUser(req.body);
        res.json(token);
        
    } catch (err) {        
        res.status(401).json({ error : err.message});

    }
};
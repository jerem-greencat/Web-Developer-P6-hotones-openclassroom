const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Token d\'authentification manquant' });
    }
    
    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: err });
        }
        req.user = decoded;
        console.log(req.user);
        console.log(req.body);
        next();
    });
};

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ error: 'Token d\'authentification manquant' });
    }
    
    jwt.verify(token, req.app.get('secretKey'), (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token d\'authentification invalide' });
        }
        
        req.user = decoded;
        next();
    });
};
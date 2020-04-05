const jwt = require('jsonwebtoken');
const aut = require('../auth/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ error: 'No tokken provided.'});

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).json({ error: 'Tokken missing information.'});

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ error: 'Tokken format error.'});

    jwt.verify(token, aut.secret, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Tokken invalid.'});
        req.ongId = decoded.id;
        return next();
    } )
}
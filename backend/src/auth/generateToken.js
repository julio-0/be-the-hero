const jwt = require('jsonwebtoken');
const auth = require('../auth/auth.json');

module.exports = function generateToken(params = {}){
    return jwt.sign(params, auth.secret, {expiresIn: 86400});
}
const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id}, 'anykey', {expiresIn : '10h'});
} 

module.exports = {
    generateToken
}
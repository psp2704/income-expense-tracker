const jwt = require('jsonwebtoken');

const verifyToken = (token) =>{
    return jwt.verify(token, 'anykey', (err, decoded)=>{
        if(err) {
            return 'Not a Valid Token';
        }else{
            return decoded;
        }
    });
} 

module.exports = {
    verifyToken
}

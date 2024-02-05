const { appErr } = require("../utils/appErr");
const { getTokenFromHeader } = require("../utils/getTokenFromHeader");
const { verifyToken } = require("../utils/verifyToken");


const isLogin = (req, res, next) =>{

    const token = getTokenFromHeader(req);
    console.log(token)
    const decoded = verifyToken(token);
    console.log(decoded)
    req.user = decoded.id;
    if(!decoded) {
        return next ( appErr('token expired, login again' , 401))
    }

    next();
}


module.exports = {
    isLogin
}
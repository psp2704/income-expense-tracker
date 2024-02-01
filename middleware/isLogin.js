const { appErr } = require("../utils/appErr");
const { getTokenFromHeader } = require("../utils/getTokenFromHeader");
const { verifyToken } = require("../utils/verifyToken");


const isLogin = (req, res, next) =>{

    const token = getTokenFromHeader(req);

    const decoded = verifyToken(token);

    req.user = decoded.id;
    if(!decoded) {
        return next (new appErr('token expired, login again' , 401))
    }

    next();
}


module.exports = {
    isLogin
}
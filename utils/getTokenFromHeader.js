

const getTokenFromHeader = (req) =>{
    console.log(req.headers['authorization'])
    const token = req.headers['authorization'].split(' ')[1];
    if(token !== undefined) {
        return token;
    }else {
        return 'There is any Token in Header'
    }
}

module.exports = {
    getTokenFromHeader
}


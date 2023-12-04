const mongoose = require('mongoose');

const dbConnect = async () =>{
    try {
        await mongoose.connect();
        console.log('DB connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect;
const mongoose = require('mongoose');

const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.Mongo_Url);
        console.log('DB connected')
    } catch (error) {
        console.log(`conection failed ${error.message}`);
        process.exit(1);
    }
}

dbConnect();